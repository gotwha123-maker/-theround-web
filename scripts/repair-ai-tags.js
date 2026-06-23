const Airtable = require('airtable');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const AIRTABLE_API_KEY = process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN || process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const TABLE_NAME = 'SettlementNews';
const BACKUP_PATH = path.join(__dirname, '../public/data/news.json');

const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);

function getCorrectTag(title, category) {
  const t = title || "";
  const c = category || "";

  if (t.includes('창업') || t.includes('경영개선') || t.includes('스타트업')) {
    return '창업지원';
  }
  if (t.includes('일자리') || t.includes('취업') || t.includes('채용') || t.includes('고용')) {
    return '취업지원';
  }
  if (t.includes('장학') || c === 'scholarship') {
    return '장학지원';
  }
  if (t.includes('임대주택') || t.includes('행복주택') || c === 'housing') {
    return '주거지원';
  }
  if (t.includes('교육') || t.includes('학습') || t.includes('대학') || t.includes('입시') || c === 'university') {
    return '교육지원';
  }
  if (t.includes('치유') || t.includes('발표대회') || t.includes('건강') || c === 'welfare') {
    return '복지지원';
  }
  return '공공기관';
}

async function repair() {
  console.log('--- [REPAIR AI TAGS] Airtable에서 AI검증완료 태그 레코드 수정 시작 ---');
  try {
    const records = await base(TABLE_NAME).select({
      filterByFormula: "{tag} = 'AI검증완료'"
    }).all();

    console.log(`수정 대상 레코드 수: ${records.length}개`);

    for (const record of records) {
      const title = record.fields.title;
      const category = record.fields.category;
      const originalTag = record.fields.tag;
      const newTag = getCorrectTag(title, category);

      console.log(`수정 중: "${title}" (${category})`);
      console.log(`  -> 태그 변경: [${originalTag}] => [${newTag}]`);

      await base(TABLE_NAME).update(record.id, {
        tag: newTag
      });
    }

    console.log('Airtable 레코드 수정 완료! 로컬 JSON 파일을 동기화합니다...');
    
    // 동기화 실행
    const allRecords = await base(TABLE_NAME).select({
      sort: [{ field: 'date', direction: 'desc' }]
    }).all();
    
    const formatted = allRecords.map(r => ({
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
    
    if (!fs.existsSync(path.dirname(BACKUP_PATH))) {
      fs.mkdirSync(path.dirname(BACKUP_PATH), { recursive: true });
    }
    fs.writeFileSync(BACKUP_PATH, JSON.stringify(formatted, null, 2));
    console.log(`로컬 JSON 동기화 완료! (${formatted.length}개 항목)`);

  } catch (e) {
    console.error('오류 발생:', e.message);
  }
}

repair();
