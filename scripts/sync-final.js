const axios = require('axios');
const Airtable = require('airtable');
require('dotenv').config({ path: '.env.local' });

const AIRTABLE_PERSONAL_ACCESS_TOKEN = process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

const base = new Airtable({ apiKey: AIRTABLE_PERSONAL_ACCESS_TOKEN }).base(AIRTABLE_BASE_ID);
const table = base('SettlementNews');

async function syncLatestSearchData() {
  console.log('Syncing latest Google Search data to Airtable...');
  
  const data = [
    // 1. Scholarships
    {
      category: 'scholarship',
      badge: '한국장학재단',
      title: '2026학년도 2학기 국가장학금 1차 신청 공고 (~6/22 마감)',
      date: '2026. 06. 07',
      url: 'https://www.kosaf.go.kr',
      excerpt: '재학생, 신입생 포함 전 대학생 대상 등록금 지원 신청. 기초/차상위 전액 지원.'
    },
    {
      category: 'scholarship',
      badge: '주거안정',
      title: '2026학년도 2학기 주거안정장학금 신청 안내',
      date: '2026. 06. 07',
      url: 'https://www.kosaf.go.kr',
      excerpt: '기초생활수급자 및 차상위 계층 대학생 대상 주거비 지원.'
    },
    // 2. Housing
    {
      category: 'housing',
      badge: 'SH공사',
      title: '2026년 1차 행복주택 입주자 모집 공고 (서울 전역)',
      date: '2026. 06. 07',
      url: 'https://www.i-sh.co.kr',
      excerpt: '청년, 신혼부부 등을 위한 시세 대비 저렴한 공공임대주택 공급.'
    },
    {
      category: 'housing',
      badge: 'LH공사',
      title: '2026년 기존주택 전세임대 입주자 수시 모집',
      date: '2026. 06. 07',
      url: 'https://apply.lh.or.kr',
      excerpt: '직접 구한 집을 LH가 계약하여 저렴하게 재임대하는 주거 지원 사업.'
    },
    // 3. Jobs
    {
      category: 'job',
      badge: '국내채용',
      title: '[국내] 한국가스공사 2026년도 신입사원 사회적 배려 대상자 특별전형',
      date: '2026. 06. 07',
      url: 'https://www.kogas.or.kr',
      excerpt: '공공기관의 사회적 가치 실현을 위한 특별 채용 공고.'
    },
    {
      category: 'job',
      badge: 'Global',
      title: '[Global] UN World Food Programme (WFP) North Asia Relations Internship',
      date: '2026. 06. 07',
      url: 'https://www.wfp.org/careers',
      excerpt: '국제기구 내 한반도 관련 실무 경험 및 글로벌 리더십 기회.'
    }
  ];

  for (const item of data) {
    try {
      const existing = await table.select({ filterByFormula: `{title} = "${item.title.replace(/"/g, '\\"')}"` }).firstPage();
      if (existing.length === 0) {
        await table.create([{ fields: item }]);
        console.log('✅ Added:', item.title);
      } else {
        console.log('⏩ Already exists:', item.title);
      }
    } catch (err) {
      console.error('❌ Sync error:', err.message);
    }
  }
}

syncLatestSearchData().then(() => console.log('🚀 Final Data Sync Complete.'));
