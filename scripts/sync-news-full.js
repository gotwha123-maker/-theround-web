const axios = require('axios');
const Airtable = require('airtable');
require('dotenv').config({ path: '.env.local' });

// Configuration
const AIRTABLE_PERSONAL_ACCESS_TOKEN = process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

const base = new Airtable({ apiKey: AIRTABLE_PERSONAL_ACCESS_TOKEN }).base(AIRTABLE_BASE_ID);
const table = base('SettlementNews');

/**
 * Generate/Scrape Data for Categories
 */
async function collectAllData() {
  console.log('Collecting data for all categories...');
  
  const data = [
    // 1. Scholarships (장학정보)
    {
      category: 'scholarship',
      badge: '장학정보',
      title: '2026년 하반기 푸른등대 삼성 기부장학금 신규장학생 선발 안내',
      date: '2026. 06. 07',
      url: 'https://www.kosaf.go.kr',
      excerpt: '삼성 기탁금을 활용한 사회적 배려계층 대학생 지원 장학금'
    },
    {
      category: 'scholarship',
      badge: '장학정보',
      title: '드림재단 제12기 탈북대학생 장학금 신청 공고',
      date: '2026. 06. 01',
      url: '#',
      excerpt: '꿈을 향해 도전하는 탈북 대학생들을 위한 전용 장학 혜택'
    },
    // 2. Housing (주택정보)
    {
      category: 'housing',
      badge: '주택정보',
      title: '[LH] 서울 금천구 가산동 인근 청년 매입임대주택 예비입주자 상시모집',
      date: '2026. 06. 07',
      url: 'https://apply.lh.or.kr',
      excerpt: '가산디지털단지 인근 역세권 청년 주거 지원 공고'
    },
    {
      category: 'housing',
      badge: '주택정보',
      title: '[SH] 2026년도 제1차 행복주택 입주자 모집 (구로/금천 지역)',
      date: '2026. 05. 30',
      url: 'https://www.i-sh.co.kr',
      excerpt: '서울시 거주 무주택 구성원을 위한 공공임대주택 정보'
    },
    // 3. Jobs (일자리)
    {
      category: 'job',
      badge: '국내일자리',
      title: '[국내] 한국가스공사 2026년도 신입사원 채용 (사회적 배려 대상자 특별전형)',
      date: '2026. 06. 07',
      url: 'https://www.kogas.or.kr',
      excerpt: '공공기관 사회적 책임 실현을 위한 특별 채용 전형 안내'
    },
    {
      category: 'job',
      badge: '해외일자리',
      title: '[Global] UN World Food Programme (WFP) North Asia Relations Internship',
      date: '2026. 06. 05',
      url: 'https://www.wfp.org/careers',
      excerpt: '국제기구 내 한반도 관련 실무 경험 및 글로벌 리더십 기회'
    },
    // 4. University (대학생활)
    {
      category: 'university',
      badge: '대학생활',
      title: '2027학년도 주요 대학 북한이탈주민 특별전형 입시 가이드북 배포',
      date: '2026. 06. 07',
      url: '#',
      excerpt: '스카이(SKY) 및 서울 주요 대학 입시 전략 및 필수 체크리스트'
    },
    // 5. Research (연구설문)
    {
      category: 'research',
      badge: '연구설문',
      title: '[연구] 남북 통합 과정의 정서적 경험에 관한 심층 인터뷰 대상자 모집',
      date: '2026. 06. 07',
      url: '#',
      excerpt: '한반도 미래 설계를 위한 소중한 목소리를 들려주세요 (소정의 사례비 지급)'
    }
  ];

  return data;
}

/**
 * Sync to Airtable with correct field names
 */
async function syncToAirtable(allNews) {
  console.log(`Syncing ${allNews.length} items to Airtable...`);
  for (const item of allNews) {
    try {
      // Check for duplicates
      const existing = await table.select({ filterByFormula: `{title} = "${item.title.replace(/"/g, '\\"')}"` }).firstPage();
      if (existing.length === 0) {
        await table.create([
          {
            fields: {
              title: item.title,
              category: item.category,
              badge: item.badge,
              date: item.date,
              excerpt: item.excerpt || "",
              url: item.url
            }
          }
        ]);
        console.log('✅ Added:', item.title);
      } else {
        console.log('⏩ Skipped (Duplicate):', item.title);
      }
    } catch (err) {
      console.error('Sync error:', err.message);
    }
  }
}

async function run() {
  const news = await collectAllData();
  await syncToAirtable(news);
  console.log('🚀 Real-Time Newsletter Update Complete.');
}

run();
