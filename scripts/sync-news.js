const axios = require('axios');
const cheerio = require('cheerio');
const Airtable = require('airtable');
const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

// Configuration
const AIRTABLE_API_KEY = process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN || process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const TABLE_NAME = "SettlementNews";
const BACKUP_PATH = path.join(__dirname, '../public/data/news.json');

const base = AIRTABLE_API_KEY && AIRTABLE_BASE_ID ? new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID) : null;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function axiosGet(url, options = {}) {
  try {
    return await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' },
      timeout: 10000,
      ...options
    });
  } catch (err) {
    throw err;
  }
}

// 1. Scrape Hana Foundation (HTML) - Increase limit to 20
async function scrapeHana() {
  console.log('[Source] Fetching Hana Foundation (HTML)...');
  const items = [];
  try {
    const { data } = await axiosGet('https://www.koreahana.or.kr/home/kor/board.do?menuPos=52');
    const $ = cheerio.load(data);
    $('table tbody tr').each((i, el) => {
      if (i < 20) {
        const titleEl = $(el).find('a').first();
        const title = titleEl.text().trim();
        const date = $(el).find('td').last().prev().text().trim().replace(/-/g, '.');
        let onclick = titleEl.attr('onclick') || '';
        let href = 'https://www.koreahana.or.kr/home/kor/board.do?menuPos=52'; 
        const params = onclick.match(/'([^']+)'/g);
        if (params && params.length >= 2) {
           const idx = params[1].replace(/'/g, "");
           href = `https://www.koreahana.or.kr/home/kor/board.do?menuPos=52&act=detail&idx=${idx}`;
        }
        if (title && !title.includes('데이터가 없습니다')) {
          items.push({ title, date, url: href, source: '남북하나재단' });
        }
      }
    });
  } catch (e) { console.error('  ! Hana Foundation failed:', e.message); }
  return items;
}

// 2. Fetch LH RSS - Increase limit to 10
async function fetchLH() {
  console.log('[Source] Fetching LH Housing (RSS)...');
  const items = [];
  try {
    const { data } = await axiosGet('https://apply.lh.or.kr/rss/rss.do?boardId=62');
    const $ = cheerio.load(data, { xmlMode: true });
    $('item').each((i, el) => {
      if (i < 10) {
        const title = $(el).find('title').text().trim();
        const link = $(el).find('link').text().trim();
        const date = new Date().toLocaleDateString('ko-KR').replace(/\s/g, '').slice(0, -1);
        if (title) items.push({ title, date, url: link, source: 'LH공사' });
      }
    });
  } catch (e) { console.error('  ! LH failed:', e.message); }
  return items;
}

// 3. Fetch Naver News - Increase limit and keywords
async function fetchNaverNews() {
  console.log('[Source] Fetching Naver News (RSS)...');
  const items = [];
  const keywords = ['탈북민 지원', '북한이탈주민', '남북청년', '정착지원금', '하나원', '남북교류', '북한인권'];
  try {
    for (const keyword of keywords) {
      const { data } = await axiosGet(`https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(keyword)}&sm=tab_srt&sort=1`);
      const $ = cheerio.load(data);
      $('.news_area').each((i, el) => {
        if (i < 5) {
          const titleEl = $(el).find('.news_tit');
          const title = titleEl.text().trim();
          const link = titleEl.attr('href');
          const date = $(el).find('.info_group span').first().text().trim() || '최신';
          if (title) items.push({ title, date, url: link, source: '네이버 뉴스' });
        }
      });
    }
  } catch (e) { console.error('  ! Naver News failed:', e.message); }
  return items;
}

// 4. AI Verification - Relaxed Filtering
async function verify(rawItems) {
  console.log(`[AI] Verifying ${rawItems.length} items with relaxed rules...`);
  const verified = [];
  const uniqueItems = Array.from(new Map(rawItems.map(item => [item.url, item])).values());

  for (const item of uniqueItems) {
    try {
      const prompt = `탈북민, 북한, 남북관계 관련 소식인지 판단하라. 
조금이라도 관련이 있다면 valid: true로 하라.
형식: {valid: bool, title: string, excerpt: string (친절한 한국어 요약, 2줄), category: "scholarship"|"housing"|"job"|"welfare"|"university"|"culture", badge: string}. 
제목: ${item.title}, 출처: ${item.source}`;
      
      const res = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'system', content: '너는 탈북민 소식 큐레이터이다. 웬만하면 모든 소식을 긍정적으로 검토하여 포함시켜라.' }, { role: 'user', content: prompt }],
        response_format: { type: 'json_object' }
      });
      const data = JSON.parse(res.choices[0].message.content);
      if (data.valid) {
        verified.push({
          id: Buffer.from(item.url).toString('base64').substring(0, 16),
          ...data,
          date: item.date,
          url: item.url,
          tag: item.source === '네이버 뉴스' ? '언론보도' : '기관공고'
        });
      }
    } catch (e) { console.error('  ! AI error:', e.message); }
  }
  return verified;
}

async function run() {
  const raw = [...await scrapeHana(), ...await fetchLH(), ...await fetchNaverNews()];
  const verified = await verify(raw);
  
  if (!fs.existsSync(path.dirname(BACKUP_PATH))) fs.mkdirSync(path.dirname(BACKUP_PATH), { recursive: true });
  fs.writeFileSync(BACKUP_PATH, JSON.stringify(verified, null, 2));
  console.log(`[Local] Saved ${verified.length} items to ${BACKUP_PATH}`);

  if (base) {
    console.log('[Airtable] Syncing...');
    for (const item of verified) {
      try {
        const existing = await base(TABLE_NAME).select({ filterByFormula: `{url} = '${item.url}'` }).firstPage();
        if (existing.length === 0) {
          await base(TABLE_NAME).create([{ fields: { title: item.title, date: item.date, url: item.url, category: item.category, badge: item.badge, excerpt: item.excerpt, tag: item.tag } }]);
          console.log(`  + Added: ${item.title}`);
        }
      } catch (e) { console.error(`  ! Airtable Error:`, e.message); }
    }
  }
}

run();
