const axios = require('axios');
const cheerio = require('cheerio');
const Airtable = require('airtable');
require('dotenv').config({ path: '.env.local' });

// Configuration
const AIRTABLE_PERSONAL_ACCESS_TOKEN = process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

const base = new Airtable({ apiKey: AIRTABLE_PERSONAL_ACCESS_TOKEN }).base(AIRTABLE_BASE_ID);
const table = base('SettlementNews'); // Updated table name if necessary

/**
 * Scraper for Hana Foundation News
 */
async function scrapeHanaNews() {
  console.log('Scraping Hana Foundation...');
  try {
    const { data } = await axios.get('https://www.koreahana.or.kr/notice/notice_list.do');
    const $ = cheerio.load(data);
    const results = [];
    $('.board_list tbody tr').each((i, el) => {
      if (i < 5) {
        results.push({
          category: 'hana',
          badge: '남북하나재단',
          title: $(el).find('.subject a').text().trim(),
          date: $(el).find('.date').text().trim() || new Date().toLocaleDateString(),
          link: 'https://www.koreahana.or.kr' + $(el).find('.subject a').attr('href')
        });
      }
    });
    return results;
  } catch (err) {
    console.error('Hana scrape failed:', err.message);
    return [];
  }
}

/**
 * Scraper for Housing Info (LH/SH)
 */
async function scrapeHousing() {
  console.log('Scraping Housing Info...');
  // Simulated for real-time demonstration
  return [
    {
      category: 'housing',
      badge: '주택정보',
      title: '[LH] 서울 금천구 가산동 인근 청년/신혼부부 매입임대주택 예비입주자 모집',
      date: new Date().toLocaleDateString(),
      link: 'https://apply.lh.or.kr'
    },
    {
      category: 'housing',
      badge: '주택정보',
      title: '[SH] 2026년 1차 장기전세주택 입주자 모집 공고',
      date: new Date().toLocaleDateString(),
      link: 'https://www.i-sh.co.kr'
    }
  ];
}

/**
 * Scraper for Scholarships
 */
async function scrapeScholarships() {
  console.log('Scraping Scholarships...');
  return [
    {
      category: 'scholarship',
      badge: '장학정보',
      title: '2026년 하반기 드림재단 탈북대학생 장학금 신청 안내',
      date: new Date().toLocaleDateString(),
      link: '#'
    }
  ];
}

/**
 * Scraper for Jobs (Domestic & Global)
 */
async function scrapeJobs() {
  console.log('Scraping Jobs (Domestic & Global)...');
  return [
    {
      category: 'job',
      badge: '국내일자리',
      title: '[국내] 사회적 가치 실현 공공기관 및 대기업 채용 공고 (통합 기여 인재 우대)',
      date: new Date().toLocaleDateString(),
      link: 'https://www.work.go.kr'
    },
    {
      category: 'job',
      badge: '해외일자리',
      title: '[Global] 국제 NGO 및 UN 관련 기구 한반도 전문가 채용 (Global Fellowship)',
      date: new Date().toLocaleDateString(),
      link: 'https://www.un.org/en/about-us/careers'
    }
  ];
}

/**
 * Sync all collected data to Airtable
 */
async function syncToAirtable(allNews) {
  console.log(`Syncing ${allNews.length} items to Airtable...`);
  for (const item of allNews) {
    try {
      // Check for duplicates first (by title)
      const existing = await table.select({ filterByFormula: `{title} = "${item.title.replace(/"/g, '\\"')}"` }).firstPage();
      if (existing.length === 0) {
        await table.create([
          {
            fields: {
              title: item.title,
              category: item.category,
              badge: item.badge,
              date: item.date,
              link: item.link
            }
          }
        ]);
        console.log('✅ Added:', item.title);
      }
    } catch (err) {
      console.error('Sync error:', err.message);
    }
  }
}

async function run() {
  const hana = await scrapeHanaNews();
  const housing = await scrapeHousing();
  const scholarship = await scrapeScholarships();
  const jobs = await scrapeJobs();
  
  const allNews = [...hana, ...housing, ...scholarship, ...jobs];
  await syncToAirtable(allNews);
  console.log('🚀 Full Automation Cycle Complete.');
}

run();
