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
        const date = $(el).find('td').last().text().trim().replace(/-/g, '.');
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
          const link = titleEl.attr('href') || '';
          const date = $(el).find('.info_group span').first().text().trim() || '최신';
          
          // 출처 불명확 도메인 배제 필터 (개인 블로그, 카페, 사설 사이트 등)
          const excludeDomains = ['blog.naver.com', 'blog.me', 'tistory.com', 'cafe.naver.com', 'cafe.daum.net', 'modoo.at', 'namu.wiki', 'kin.naver.com'];
          const isInvalidDomain = excludeDomains.some(domain => link.includes(domain));
          
          if (title && link && !isInvalidDomain) {
            // 실제 언론사 명칭을 파싱하여 소스로 지정
            const pressName = $(el).find('.info.press').text().trim() || '언론보도';
            items.push({ title, date, url: link, source: pressName });
          }
        }
      });
    }
  } catch (e) { console.error('  ! Naver News failed:', e.message); }
  return items;
}

// 4. AI Verification - Relaxed Filtering
async function verify(rawItems) {
  console.log(`[AI] Verifying ${rawItems.length} items with strict verification rules...`);
  const verified = [];
  const uniqueItems = Array.from(new Map(rawItems.map(item => [item.url, item])).values());

  for (const item of uniqueItems) {
    try {
      const prompt = `당신은 북한이탈주민(탈북민)을 위한 신뢰성 높은 뉴스 및 공고를 정제하는 AI 검증 전문가입니다.
아래 뉴스/공고 정보가 사실 확인이 되었으며, 공식적인 정부 기관, 지자체, 공기업 및 지정 공공 재단 등 신뢰할 수 있는 단체에서 공식적으로 배포한 유효한 정보인지 판별하십시오.

[분석 정보]
- 출처: ${item.source}
- 제목: ${item.title}
- 링크: ${item.url}

[검증 기준]
1. 공식 정부부처(통일부 등), 지자체(서울시, 경기도 등), 공기업(LH, SH 등), 신뢰성 높은 기관(남북하나재단 등)에서 공식 발표하거나 사실이 확인된 정착 지원(장학, 주택, 채용, 복지 등) 소식인가?
2. 출처가 불분명한 뜬소문, 단순 개인 의견이나 칼럼, 홍보/광고성 글, 혹은 사실 확인이 되지 않은 단순 추측성 기사 등은 철저히 배제(valid: false)하십시오.
3. 중복이나 노이즈가 없는 단정하고 깨끗한 제목으로 정제하십시오.
4. 요약(excerpt)은 탈북 청년들에게 도움이 되는 어조로 친절하게 핵심 사실에 기반한 2줄 요약을 생성하십시오.
5. 'badge'는 정보를 배포한 핵심 공공 기관이나 언론사의 이름을 정확하게 기록하십시오 (예: '남북하나재단', 'LH공사', '서울시' 등).

반드시 아래 JSON 형식으로만 답변하십시오:
{
  "valid": true/false,
  "title": "정제된 제목",
  "excerpt": "핵심 사실에 기반한 친절한 2줄 요약",
  "category": "scholarship" | "housing" | "job" | "welfare" | "university" | "culture",
  "badge": "기관/출처명"
}`;

      const res = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: '너는 탈북민 소식 정제 전문가이다. 사실로 확인되고 공식 발표된 신뢰성 높은 소식만 엄격하게 검토하여 포함시켜라. 불확실하거나 사설적인 소식은 철저히 제외하라.' },
          { role: 'user', content: prompt }
        ],
        response_format: { type: 'json_object' },
        temperature: 0
      });
      
      const data = JSON.parse(res.choices[0].message.content);
      if (data.valid) {
        verified.push({
          id: Buffer.from(item.url).toString('base64'),
          ...data,
          date: item.date,
          url: item.url,
          tag: item.source === '네이버 뉴스' ? '언론보도' : '기관공고'
        });
        console.log(`  [OK - STRICT] ${data.title}`);
      } else {
        console.log(`  [SKIP - STRICT] ${item.title} (사실 확인/신뢰성 기준 미달)`);
      }
    } catch (e) { console.error('  ! AI error:', e.message); }
  }
  return verified;
}

async function syncAirtableToLocalJSON() {
  if (!base) return;
  console.log('[Sync] Fetching all records from Airtable to update local JSON...');
  try {
    const records = await base(TABLE_NAME).select({
      sort: [{ field: 'date', direction: 'desc' }]
    }).all();
    
    const formatted = records.map(r => ({
      id: Buffer.from(r.fields.url || '').toString('base64'),
      valid: true,
      title: r.fields.title,
      excerpt: r.fields.excerpt,
      category: r.fields.category,
      badge: r.fields.badge,
      date: r.fields.date,
      url: r.fields.url,
      tag: r.fields.tag
    }));
    
    if (!fs.existsSync(path.dirname(BACKUP_PATH))) fs.mkdirSync(path.dirname(BACKUP_PATH), { recursive: true });
    fs.writeFileSync(BACKUP_PATH, JSON.stringify(formatted, null, 2));
    console.log(`[Sync] Successfully updated ${BACKUP_PATH} with ${formatted.length} accumulated items from Airtable.`);
  } catch (e) {
    console.error('[Sync] Failed to sync Airtable to Local JSON:', e.message);
  }
}

async function run() {
  const raw = [...await scrapeHana(), ...await fetchLH(), ...await fetchNaverNews()];
  const verified = await verify(raw);

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

  // Update local JSON with all accumulated items from Airtable
  await syncAirtableToLocalJSON();
}

run();
