const axios = require('axios');

const urls = [
  'https://www.korea.kr/rss/dept_unikorea.xml',
  'https://www.korea.kr/rss/local.xml',
  'https://apply.lh.or.kr/rss/rss.do?boardId=62',
  'https://www.nkrf.or.kr/main/rss.do'
];

async function testUrls() {
  for (const url of urls) {
    try {
      console.log(`Testing ${url}...`);
      const res = await axios.get(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' },
        timeout: 10000
      });
      console.log(`  Success! Status: ${res.status}`);
    } catch (err) {
      console.error(`  Failed: ${err.message}`);
    }
  }
}

testUrls();
