const axios = require('axios');
const cheerio = require('cheerio');
const Airtable = require('airtable');
const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

// Configuration Backup Path
const BACKUP_PATH = path.join(__dirname, '../public/data/news.json');

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
        const date = $(el).find('td').last().text().trim().replace(/-/g, '.');
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
  for (const city of CITIES) {
    const query = `${city.name} 북한이탈주민 지원 사업 공고`;
    const searchUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
    try {
      const { data } = await axiosGet(searchUrl);
      const $ = cheerio.load(data);
      $('.result__body').each((i, el) => {
        if (i < 3) { // Check top 3 results per city
          const a = $(el).find('.result__title a');
          const title = a.text().trim();
          const link = a.attr('href') || '';
          const decodedLink = decodeURIComponent(link);
          
          if (title && link && decodedLink.includes(city.domain)) {
            // Extract the real URL from DuckDuckGo redirection link
            const urlMatch = decodedLink.match(/uddg=([^&]+)/);
            const realUrl = urlMatch ? decodeURIComponent(urlMatch[1]) : link;
            
            items.push({ 
              title, 
              date: new Date().toLocaleDateString('ko-KR').replace(/\s/g, '').slice(0, -1), 
              source: city.name, 
              url: realUrl 
            });
          }
        }
      });
      console.log(`  - ${city.name} 검색 완료 (공식 사이트 정보 필터 적용)`);
      await new Promise(r => setTimeout(r, 1000));
    } catch (e) { console.error(`  ! ${city.name} 검색 실패:`, e.message); }
  }
  return items;
}

/**
 * 4. AI CROSS-CHECK & FILTERING
 */
async function verifyWithAI(rawList) {
  console.log(`[AI] ${rawList.length}개의 항목에 대해 AI 정밀 사실 검증 및 크로스체크 시작...`);
  const verified = [];
  
  for (const item of rawList) {
    try {
      const prompt = `
당신은 대한민국 거주 북한이탈주민(탈북민)의 성공적인 정착을 돕는 '더라운드'의 AI 검증 전문가입니다.
아래 정보를 정밀 분석하여 사실 확인(크로스체크)이 완료되고, 공식적인 공공 기관, 지자체, 공공 단체 등에서 공식 배포한 유효한 정보인지 판별하십시오.

[분석 정보]
- 출처: ${item.source}
- Title: ${item.title}
- Link: ${item.url}

[검증 및 정제 규칙]
1. 신뢰할 수 있는 공식 공공기관(정부부처, 지자체, 공기업 등)이 직접 배포한 공식 공고 또는 언론을 통해 사실이 검증된 확실한 뉴스입니까?
2. 정착 지원(장학금, 공공주택, 채용, 의료복지, 대학생활 등)과 직접적인 관련이 있고 실질적 혜택이 되는 정보입니까?
3. 개인 블로그, 불분명한 풍문, 광고성 정보, 단순 개인 사설이나 칼럼 등 사실성 및 공신력이 떨어지는 글은 철저히 제외(is_valid: false)하십시오.
4. 중복이나 노이즈가 없는 단정하고 깨끗한 제목으로 정제하십시오 (불필요한 한자나 대괄호, 시스템 기호 제거).
5. 탈북 청년들이 혜택을 한눈에 파악할 수 있도록 사실에 근거한 친절한 2줄 요약을 생성하십시오.
6. 'badge'는 해당 정보를 제공하는 기관의 공식 명칭을 정확히 입력하십시오 (예: '남북하나재단', '서울시', '경기도', '통일부' 등).
7. 'tag'는 해당 공고의 상세 분류를 한국어로 입력하십시오 (예: '공공기관', '창업지원', '취업지원', '장학지원', '교육지원', '주거지원', '복지지원', '기타' 중 가장 알맞은 단어 선택).

반드시 아래 JSON 형식으로만 답변하십시오:
{
  "is_valid": true/false,
  "title": "정제된 제목",
  "excerpt": "사실에 입각한 친절한 2줄 요약",
  "category": "scholarship" | "housing" | "job" | "welfare" | "university",
  "badge": "기관명",
  "tag": "분류태그"
}
`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "당신은 탈북 청년용 정보 서비스의 신뢰성을 지키는 사실 검증 요원입니다. 오직 공신력 있는 공식 정보 및 사실 확인이 완료된 정보만 유효하다고 판정하십시오." },
          { role: "user", content: prompt }
        ],
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
            tag: res.tag || "공공기관"
          }
        });
        console.log(`  [OK] ${res.title}`);
      } else {
        console.log(`  [SKIP] ${item.title} (무관한 정보/사실확인 미달)`);
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
  const added = [];
  for (const record of records) {
    try {
      // Duplication check by title
      const existing = await base(TABLE_NAME).select({
        filterByFormula: `{title} = '${record.fields.title.replace(/'/g, "\\'")}'`
      }).firstPage();

      if (existing.length === 0) {
        await base(TABLE_NAME).create([record]);
        console.log(`  + 추가됨: ${record.fields.title}`);
        added.push(record.fields);
      } else {
        console.log(`  - 중복 건너뜀: ${record.fields.title}`);
      }
    } catch (err) {
      console.error(`  ! 동기화 오류:`, err.message);
    }
  }
  return added;
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

async function triggerTelegramReport(addedItems) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.log('[Telegram] Credentials missing. Skipping Telegram report.');
    return;
  }

  if (addedItems.length === 0) {
    console.log('[Telegram] No new items added today. Telegram report skipped.');
    return;
  }

  console.log(`[Telegram] Sending notification for ${addedItems.length} new items...`);
  
  let message = `📢 *[더라운드 최신 정착 소식 알림]* 📢\n\n`;
  message += `오늘 총 *${addedItems.length}건*의 검증된 새로운 혜택 정보가 수집되었습니다.\n\n`;

  addedItems.forEach((item, idx) => {
    let categoryEmoji = '🎁';
    if (item.category === 'scholarship') categoryEmoji = '🎓';
    else if (item.category === 'housing') categoryEmoji = '🏠';
    else if (item.category === 'job') categoryEmoji = '💼';
    else if (item.category === 'university') categoryEmoji = '🏫';

    message += `*${idx + 1}. [${item.badge}] ${item.title}*\n`;
    message += `${categoryEmoji} 구분: ${item.category === 'scholarship' ? '장학금' : item.category === 'housing' ? '주거지원' : item.category === 'job' ? '취업/일자리' : item.category === 'university' ? '대학생 지원' : '일반지원'}\n`;
    message += `📝 내용: ${item.excerpt}\n`;
    message += `🔗 [공식 링크 바로가기](${item.url})\n\n`;
  });

  message += `#더라운드 #정착지원 #새터민 #탈북민`;

  try {
    await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      chat_id: chatId,
      text: message,
      parse_mode: 'Markdown',
      disable_web_page_preview: true
    });
    console.log('[Telegram] Report sent successfully!');
  } catch (err) {
    console.error('[Telegram] Failed to send report:', err.response ? err.response.data : err.message);
  }
}

const { execSync } = require('child_process');

async function triggerVercelDeploy() {
  console.log('[Deploy] Triggering Vercel production deployment to publish updated news...');
  try {
    const runVercelPath = path.join(__dirname, '../run_vercel.js');
    const output = execSync(`node "${runVercelPath}" --prod`, { encoding: 'utf-8' });
    console.log('[Deploy] Vercel Deploy Success:\n', output);
  } catch (err) {
    console.error('[Deploy] Vercel Deploy Failed:', err.message);
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
  const added = await syncToAirtable(verified);
  
  // Update local JSON with all accumulated items from Airtable
  await syncAirtableToLocalJSON();
  
  // Send telegram report for newly added items
  await triggerTelegramReport(added);
  
  // Automatically trigger Vercel deployment with the new news data
  await triggerVercelDeploy();
  
  console.log('--- [MEGA SYNC] 모든 자동화 작업이 성공적으로 완료되었습니다. ---');
}

run();
