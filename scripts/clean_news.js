const axios = require('axios');
const Airtable = require('airtable');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

// Configuration
const AIRTABLE_API_KEY = process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN || process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const TABLE_NAME = 'SettlementNews';
const BACKUP_PATH = path.join(__dirname, '../public/data/news.json');

const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);

// URL 유효성 체크 함수
async function checkUrlValidity(url) {
  if (!url || url === '#' || !url.startsWith('http')) {
    return { valid: false, reason: 'Invalid URL format or placeholder' };
  }

  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      timeout: 6000,
      validateStatus: (status) => true // 어떤 Status 코드가 와도 연결 성공이면 일단 통과 (403, 401도 서버는 열려있으므로 유효 링크로 간주)
    });
    
    // 404나 특정 연결 실패 상태의 경우만 제거
    if (response.status === 404) {
      return { valid: false, reason: '404 Not Found' };
    }
    
    return { valid: true };
  } catch (err) {
    // DNS 에러, Connection Refused, Timeout 등 접속 불가능한 경우
    const isNetworkError = !err.response || err.code === 'ENOTFOUND' || err.code === 'ECONNREFUSED' || err.code === 'ETIMEDOUT';
    if (isNetworkError) {
      return { valid: false, reason: `Network error or timeout: ${err.message}` };
    }
    
    // 단순 403 Forbidden 등은 사이트 차단일 수 있으므로 유지
    if (err.response && err.response.status === 404) {
      return { valid: false, reason: '404 Not Found' };
    }
    
    return { valid: true }; // 안전하게 유지
  }
}

async function cleanNews() {
  console.log('--- 에어테이블 뉴스 중복 및 끊긴 링크 정리 작업 시작 ---');
  
  try {
    const records = await base(TABLE_NAME).select().all();
    console.log(`총 ${records.length}개의 레코드를 로드했습니다.`);
    
    const recordsToDelete = [];
    const seenTitles = new Set();
    const seenUrls = new Set();

    for (const record of records) {
      const id = record.id;
      const title = (record.fields.title || '').trim();
      const url = (record.fields.url || '').trim();
      
      // 1. 중복 검사
      if (!title || !url) {
        recordsToDelete.push({ id, title, url, reason: 'Empty title or URL' });
        continue;
      }
      
      if (seenTitles.has(title)) {
        recordsToDelete.push({ id, title, url, reason: 'Duplicate Title' });
        continue;
      }
      if (seenUrls.has(url)) {
        recordsToDelete.push({ id, title, url, reason: 'Duplicate URL' });
        continue;
      }
      
      seenTitles.add(title);
      seenUrls.add(url);
      
      // 2. 링크 유효성 검사
      const linkCheck = await checkUrlValidity(url);
      if (!linkCheck.valid) {
        recordsToDelete.push({ id, title, url, reason: linkCheck.reason });
      }
    }
    
    console.log(`삭제할 대상 레코드 개수: ${recordsToDelete.length}개`);
    
    // 레코드 삭제 실행 (최대 10개씩)
    if (recordsToDelete.length > 0) {
      for (let i = 0; i < recordsToDelete.length; i += 10) {
        const chunk = recordsToDelete.slice(i, i + 10);
        const idsToDestroy = chunk.map(item => item.id);
        
        console.log(`[Delete] 삭제 중... (${i + 1} ~ ${Math.min(i + 10, recordsToDelete.length)})`);
        chunk.forEach(item => console.log(`  - [${item.reason}] ${item.title} (${item.url})`));
        
        await base(TABLE_NAME).destroy(idsToDestroy);
      }
      console.log('에어테이블에서 문제 레코드 삭제를 완료했습니다.');
    } else {
      console.log('삭제할 문제 레코드가 없습니다.');
    }
    
    // 3. 로컬 캐시 news.json 업데이트
    console.log('[Sync] 로컬 news.json 동기화 중...');
    const updatedRecords = await base(TABLE_NAME).select({
      sort: [{ field: 'date', direction: 'desc' }]
    }).all();
    
    const formatted = updatedRecords.map(r => ({
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
    
    console.log(`[Sync] 로컬 ${BACKUP_PATH} 동기화 완료: 총 ${formatted.length}개 보존.`);
    
  } catch (err) {
    console.error('정리 작업 중 오류 발생:', err.message);
  }
}

cleanNews();
