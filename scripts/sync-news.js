const axios = require('axios');
const cheerio = require('cheerio');
const Airtable = require('airtable');
const OpenAI = require('openai');
require('dotenv').config({ path: '.env.local' });

// Configuration
const AIRTABLE_API_KEY = process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN || process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const TABLE_NAME = 'SettlementNews';

const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Helper to retry HTTP requests in case of network instability
async function axiosGetWithRetry(url, options = {}, retries = 3, delay = 2000) {
  for (let i = 0; i < retries; i++) {
    try {
      return await axios.get(url, options);
    } catch (err) {
      if (i === retries - 1) throw err;
      console.warn(`  [Retry Alert] Failed fetching ${url} (Attempt ${i + 1}/${retries}): ${err.message}. Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// 1. Scrape from Korea Hana Foundation Board (남북하나재단)
async function scrapeHanaNews() {
  console.log('[1/4] Fetching news from Hana Foundation HTML Board...');
  const newsItems = [];
  try {
    const baseUrl = 'https://www.koreahana.or.kr';
    const targetUrl = baseUrl + '/home/kor/board.do?menuPos=52'; 
    const { data } = await axiosGetWithRetry(targetUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' },
      timeout: 10000
    });
    const $ = cheerio.load(data);
    const rows = $('table tbody tr');
    
    rows.each((i, el) => {
      if (newsItems.length < 10) { 
        const titleEl = $(el).find('a').first();
        const title = titleEl.text().trim();
        
        let date = '';
        $(el).find('td').each((j, td) => {
          const text = $(td).text().trim();
          if (/\d{4}[.-]\d{2}[.-]\d{2}/.test(text)) {
            date = text;
          }
        });
        
        if (!date) {
           date = $(el).find('td').last().prev().text().trim();
        }

        let href = titleEl.attr('href') || '';
        let onclick = titleEl.attr('onclick') || '';
        
        if (!href.includes('board.do') && (onclick.includes('goDetail') || onclick.includes('fn_edit'))) {
          const params = onclick.match(/'([^']+)'/g);
          if (params && params.length >= 2) {
             const idx = params[1].replace(/'/g, "");
             href = `/home/kor/board.do?menuPos=52&act=detail&idx=${idx}`;
          }
        }
        
        if (href && !href.startsWith('http')) {
           href = baseUrl + (href.startsWith('/') ? '' : '/home/kor/') + href;
        }

        if (title && href && href.startsWith('http')) {
          newsItems.push({
            title,
            date: date.replace(/-/g, '.'),
            url: href,
            source: '남북하나재단'
          });
        }
      }
    });
    console.log(`- Found ${newsItems.length} items from Hana Foundation.`);
  } catch (error) {
    console.error('- Hana Foundation scraping failed:', error.message);
  }
  return newsItems;
}

// 2. Fetch from Ministry of Unification RSS (통일부)
async function fetchUnikoreaNews() {
  console.log('[2/4] Fetching news from Ministry of Unification (통일부) RSS...');
  const newsItems = [];
  try {
    const url = 'https://www.korea.kr/rss/dept_unikorea.xml';
    const { data } = await axiosGetWithRetry(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' },
      timeout: 10000
    });
    const $ = cheerio.load(data, { xmlMode: true });
    
    $('item').each((i, el) => {
      if (i < 10) {
        const title = $(el).find('title').text().trim();
        const link = $(el).find('link').text().trim();
        let pubDateText = $(el).find('pubDate').text().trim();
        
        // Parse date (standard RSS pubDate format to YYYY.MM.DD)
        let dateFormatted = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\s/g, '');
        if (pubDateText) {
          try {
            const d = new Date(pubDateText);
            if (!isNaN(d.getTime())) {
              dateFormatted = d.getFullYear() + '.' + String(d.getMonth() + 1).padStart(2, '0') + '.' + String(d.getDate()).padStart(2, '0');
            }
          } catch(e) {}
        }
        
        if (title && link) {
          newsItems.push({
            title,
            date: dateFormatted,
            url: link,
            source: '통일부'
          });
        }
      }
    });
    console.log(`- Found ${newsItems.length} items from Ministry of Unification RSS.`);
  } catch (error) {
    console.error('- Ministry of Unification RSS fetch failed:', error.message);
  }
  return newsItems;
}

// 3. AI-Powered Verification & Cross-Checking Agent
async function verifyAndFilterNews(rawItems) {
  console.log(`[3/4] Running AI-powered fact-checking & cross-checking on ${rawItems.length} raw items...`);
  const verifiedItems = [];

  for (const item of rawItems) {
    try {
      const prompt = `
너는 대한민국 공공기관 및 민간단체의 공고를 분석하여, "북한이탈주민(탈북민/새터민)"의 남한 사회 정착 지원 및 상호교류와 직결된 신뢰도 높은 유효 정보인지 검증하는 AI 팩트체커 전문가이다.

아래 수집된 정보를 정밀하게 분석하여 검증해주기 바란다.

[수집된 정보]
- 출처: ${item.source}
- 제목: ${item.title}
- 날짜: ${item.date}

[검증 기준]
1. 이 정보가 북한이탈주민(탈북민)의 남한 정착(교육, 장학, 취업, 주거, 복지, 의료, 법률 상담 등)이나 정착 관련 정보 제공과 직접적 관련이 있는 정보인가?
2. 신뢰할 수 있는 기관(정부부처, 공공기관, 지자체, 신뢰도 높은 사회복지법인/민간단체)에서 공식 발표한 사실 정보가 맞는가? (개인 블로그 뜬소문, 정치적 편향 글, 단순 칼럼/의견/사설 기사 등은 '허위/부적합'으로 분류)
3. 현재 또는 최근(2025~2026년)에 유효한 유효 공고/소식인가?

[출력 형식]
반드시 아래 키들을 포함한 순수 JSON 객체 하나만을 출력하라 (마크다운 백틱 없이 JSON 텍스트만 출력).
{
  "verified": true 또는 false (검증 기준을 모두 충족하면 true, 무관하거나 사설/칼럼/불확실하면 false),
  "title": "공고 제목을 탈북 청년들이 이해하기 쉽고 명확하게 정제한 한글 제목 (불필요한 한자나 시스템 접두어 제거)",
  "excerpt": "공고 내용을 바탕으로 탈북민들에게 어떻게 도움이 되는지 친절하게 설명하는 2줄 요약 설명 (한글)",
  "category": "welfare" (복지/주택/생필품 지원 등), "education" (교육/장학/멘토링 등), "jobs" (취업/창업/직무훈련 등), "health" (의료/치과/법률상담/심리치료 등) 중 반드시 하나를 선택,
  "badge": "기관명 또는 핵심 요약 명칭 (예: '하나재단', '통일부공고', '지자체지원', '주거지원' 등 5자 내외)"
}
`;

      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.1,
        max_tokens: 300
      });

      const jsonText = response.choices[0].message.content.trim().replace(/```json/g, '').replace(/```/g, '').trim();
      const analysis = JSON.parse(jsonText);

      if (analysis.verified === true) {
        console.log(`  [✓ VERIFIED] ${item.title} -> ${analysis.title} (${analysis.category})`);
        verifiedItems.push({
          fields: {
            title: analysis.title,
            date: item.date,
            url: item.url,
            category: analysis.category,
            badge: analysis.badge,
            tag: '검증완료'
          }
        });
      } else {
        console.log(`  [✗ REJECTED] ${item.title} (Reason: Failed AI cross-check criteria)`);
      }
    } catch (err) {
      console.error(`  [! ERROR] Failed verifying item "${item.title}":`, err.message);
    }
  }
  return verifiedItems;
}

// 4. Sync to Airtable
async function syncToAirtable(records) {
  if (records.length === 0) {
    console.log('[4/4] No newly verified records to sync.');
    return;
  }
  
  console.log(`[4/4] Syncing ${records.length} AI-verified records to Airtable...`);
  
  for (const record of records) {
    try {
      const existing = await base(TABLE_NAME).select({
        filterByFormula: `{title} = '${record.fields.title.replace(/'/g, "\\'")}'`
      }).firstPage();
      
      if (existing.length === 0) {
        await base(TABLE_NAME).create([record]);
        console.log(`  + Airtable Added: ${record.fields.title}`);
      } else {
        console.log(`  - Airtable Skipped (already exists): ${record.fields.title}`);
      }
    } catch (err) {
      console.error(`  ! Airtable Error for "${record.fields.title}":`, err.message);
    }
  }
}

async function run() {
  console.log('=== Starting Daily News Scraping & AI Cross-Checking Automation ===');
  
  const hanaNews = await scrapeHanaNews();
  const unikoreaNews = await fetchUnikoreaNews();
  
  // Combine raw list
  const rawItems = [...hanaNews, ...unikoreaNews];
  
  if (rawItems.length === 0) {
    console.log('No raw items crawled from any source.');
    return;
  }
  
  const verifiedNews = await verifyAndFilterNews(rawItems);
  await syncToAirtable(verifiedNews);
  
  console.log('=== Daily News Automation Complete ===');
}

run();
