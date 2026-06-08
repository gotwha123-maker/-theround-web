const axios = require('axios');
const cheerio = require('cheerio');
const Airtable = require('airtable');
const OpenAI = require('openai');
require('dotenv').config({ path: '.env.local' });

/**
 * CONFIGURATION
 */
const AIRTABLE_API_KEY = process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN || process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const TABLE_NAME = 'SettlementNews';

const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * TARGET REGIONS & KEYWORDS
 */
const CITIES = [
  { name: '서울', domain: 'seoul.go.kr' },
  { name: '경기', domain: 'gg.go.kr' },
  { name: '인천', domain: 'incheon.go.kr' },
  { name: '부산', domain: 'busan.go.kr' },
  { name: '대구', domain: 'daegu.go.kr' },
  { name: '광주', domain: 'gwangju.go.kr' },
  { name: '대전', domain: 'daejeon.go.kr' },
  { name: '울산', domain: 'ulsan.go.kr' }
];

const SEARCH_KEYWORDS = ['북한이탈주민 지원', '탈북민 장학금', '새터민 취업', '탈북민 주거지원'];

/**
 * UTILS
 */
async function axiosGet(url, options = {}, retries = 2) {
  for (let i = 0; i <= retries; i++) {
    try {
      return await axios.get(url, {
        ...options,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          ...options.headers
        },
        timeout: 10000
      });
    } catch (err) {
      if (i === retries) throw err;
      await new Promise(r => setTimeout(r, 2000));
    }
  }
}

/**
 * 1. FIXED SOURCE: HANA FOUNDATION (남북하나재단)
 */
async function scrapeHanaFoundation() {
  console.log('[Source] 남북하나재단 크롤링 중...');
  const items = [];
  try {
    const url = 'https://www.koreahana.or.kr/home/kor/board.do?menuPos=52';
    const { data } = await axiosGet(url);
    const $ = cheerio.load(data);
    $('table tbody tr').each((i, el) => {
      if (i < 8) {
        const a = $(el).find('a').first();
        const title = a.text().trim();
        const date = $(el).find('td').last().prev().text().trim().replace(/-/g, '.');
        if (title) items.push({ title, date, source: '하나재단', url: 'https://www.koreahana.or.kr/home/kor/board.do?menuPos=52' });
      }
    });
  } catch (e) { console.error('  ! 하나재단 실패:', e.message); }
  return items;
}

/**
 * 2. FIXED SOURCE: MINISTRY OF UNIFICATION (통일부 RSS)
 */
async function fetchUnikoreaRSS() {
  console.log('[Source] 통일부 RSS 수집 중...');
  const items = [];
  try {
    const url = 'https://www.korea.kr/rss/dept_unikorea.xml';
    const { data } = await axiosGet(url);
    const $ = cheerio.load(data, { xmlMode: true });
    $('item').each((i, el) => {
      if (i < 8) {
        const title = $(el).find('title').text().trim();
        const link = $(el).find('link').text().trim();
        const pubDate = new Date($(el).find('pubDate').text());
        const date = `${pubDate.getFullYear()}.${String(pubDate.getMonth() + 1).padStart(2, '0')}.${String(pubDate.getDate()).padStart(2, '0')}`;
        if (title) items.push({ title, date, source: '통일부', url: link });
      }
    });
  } catch (e) { console.error('  ! 통일부 실패:', e.message); }
  return items;
}

/**
 * 3. DYNAMIC SOURCE: CITY PORTALS VIA SEARCH (광역 지자체 검색 수집)
 */
async function searchCityNews() {
  console.log('[Source] 광역 지자체(서울, 경기, 부산 등) 최신 공고 검색 중...');
  const items = [];
  // Use DuckDuckGo HTML for simple scraping without API keys
  for (const city of CITIES) {
    const query = `${city.name} 북한이탈주민 지원 사업 공고`;
    const searchUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
    try {
      const { data } = await axiosGet(searchUrl);
      const $ = cheerio.load(data);
      $('.result__body').each((i, el) => {
        if (i < 2) { // Top 2 results per city to keep it fast
          const a = $(el).find('.result__title a');
          const title = a.text().trim();
          const link = a.attr('href');
          if (title && link) {
            items.push({ 
              title, 
              date: new Date().toLocaleDateString('ko-KR').replace(/\s/g, '').slice(0, -1), 
              source: city.name, 
              url: link 
            });
          }
        }
      });
      console.log(`  - ${city.name} 검색 완료`);
      await new Promise(r => setTimeout(r, 1000)); // Rate limiting
    } catch (e) { console.error(`  ! ${city.name} 검색 실패:`, e.message); }
  }
  return items;
}

/**
 * 4. AI CROSS-CHECK & FILTERING
 */
async function verifyWithAI(rawList) {
  console.log(`[AI] ${rawList.length}개의 항목에 대해 AI 정밀 검증 및 크로스체크 시작...`);
  const verified = [];
  
  for (const item of rawList) {
    try {
      const prompt = `
당신은 대한민국 거주 북한이탈주민(탈북민)의 성공적인 정착을 돕는 '더라운드'의 AI 검증 전문가입니다.
아래 정보를 분석하여 실제로 도움이 되는 유효한 정보인지 판별하고 정제하십시오.

[분석 정보]
- 출처: ${item.source}
- 제목: ${item.title}
- 링크: ${item.url}

[검증 및 정제 규칙]
1. 정착 지원(장학, 주택, 일자리, 복지, 의료 등)과 직접적인 관련이 있는 공고/뉴스인가? (개인 사설이나 무관한 뉴스는 제외)
2. 신뢰할 수 있는 공공기관이나 공식 단체의 정보인가?
3. 중복이나 노이즈가 없는 깨끗한 제목으로 정제 (불필요한 한자나 대괄호, 시스템 기호 제거)
4. 탈북 청년들이 혜택을 한눈에 알 수 있도록 따뜻하고 친절한 2줄 요약 생성.
5. 'badge'는 해당 정보를 제공하는 기관의 핵심 명칭을 정확하게 입력하십시오 (예: '남북하나재단', '서울시', '경기도', '통일부' 등). 줄이지 말고 정확한 명칭을 사용하십시오.

반드시 아래 JSON 형식으로만 답변하십시오:
{
  "is_valid": true/false,
  "title": "정제된 제목",
  "excerpt": "친절한 2줄 요약",
  "category": "scholarship" | "housing" | "job" | "welfare" | "university",
  "badge": "기관명"
}
`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0,
        response_format: { type: "json_object" }
      });

      const res = JSON.parse(completion.choices[0].message.content);
      if (res.is_valid) {
        verified.push({
          fields: {
            title: res.title,
            date: item.date,
            url: item.url,
            category: res.category,
            badge: res.badge,
            excerpt: res.excerpt,
            tag: "AI검증완료"
          }
        });
        console.log(`  [OK] ${res.title}`);
      } else {
        console.log(`  [SKIP] ${item.title} (무관한 정보)`);
      }
    } catch (err) {
      console.error(`  [ERR] AI 검증 오류:`, err.message);
    }
  }
  return verified;
}

/**
 * 5. SYNC TO AIRTABLE
 */
async function syncToAirtable(records) {
  console.log(`[Sync] ${records.length}개의 검증된 항목을 Airtable에 동기화 중...`);
  for (const record of records) {
    try {
      // Duplication check by title
      const existing = await base(TABLE_NAME).select({
        filterByFormula: `{title} = '${record.fields.title.replace(/'/g, "\\'")}'`
      }).firstPage();

      if (existing.length === 0) {
        await base(TABLE_NAME).create([record]);
        console.log(`  + 추가됨: ${record.fields.title}`);
      } else {
        console.log(`  - 중복 건너뜀: ${record.fields.title}`);
      }
    } catch (err) {
      console.error(`  ! 동기화 오류:`, err.message);
    }
  }
}

/**
 * MAIN RUNNER
 */
async function run() {
  console.log('--- [MEGA SYNC] 전국 광역 지자체 및 중앙기관 통합 뉴스 수집 시작 ---');
  
  const hana = await scrapeHanaFoundation();
  const unikorea = await fetchUnikoreaRSS();
  const cities = await searchCityNews();
  
  const totalRaw = [...hana, ...unikorea, ...cities];
  console.log(`--- 총 ${totalRaw.length}개의 원시 데이터 수집 완료. 검증 단계로 진입합니다. ---`);
  
  const verified = await verifyWithAI(totalRaw);
  await syncToAirtable(verified);
  
  console.log('--- [MEGA SYNC] 모든 자동화 작업이 성공적으로 완료되었습니다. ---');
}

run();
