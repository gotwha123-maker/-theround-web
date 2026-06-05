const axios = require('axios');

async function findLinks() {
  try {
    const baseUrl = 'https://www.koreahana.or.kr';
    const { data } = await axios.get(baseUrl + '/welcome.do', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' }
    });
    const regex = /href="([^"]*)"/g;
    let match;
    const links = new Set();
    console.log('Total HTML length:', data.length);
    while ((match = regex.exec(data)) !== null) {
      const link = match[1];
      links.add(link);
    }
    console.log('Total links found:', links.size);
    const filtered = Array.from(links).filter(l => l.includes('notice') || l.includes('list') || l.includes('board'));
    console.log('Filtered links:\n', filtered.join('\n'));
  } catch (err) {
    console.error(err.message);
  }
}

findLinks();
