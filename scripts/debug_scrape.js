const axios = require('axios');
const cheerio = require('cheerio');

async function testScrape() {
  console.log('Testing HTML Scraping for Hana Foundation...');
  const baseUrl = 'https://www.koreahana.or.kr';
  const targetUrl = baseUrl + '/home/kor/board.do?menuPos=52'; 
  try {
    const { data } = await axios.get(targetUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' },
      timeout: 15000
    });
    const $ = cheerio.load(data);
    const rows = $('table tbody tr');
    console.log(`Found ${rows.length} rows in the table.`);
    
    rows.each((i, el) => {
      if (i < 3) {
        const titleEl = $(el).find('a').first();
        const title = titleEl.text().trim();
        console.log(`[Item #${i+1}] Title: ${title}`);
      }
    });
  } catch (error) {
    console.error('Scraping failed:', error.message);
  }
}

testScrape();
