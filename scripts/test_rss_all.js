const axios = require('axios');
const cheerio = require('cheerio');

const feeds = [
  { name: '남북하나재단', url: 'https://www.koreahana.or.kr/main/rss.do' },
  { name: '통일부', url: 'https://www.korea.kr/rss/dept_unikorea.xml' },
  { name: '북한인권증진재단', url: 'https://www.nkrf.or.kr/main/rss.do' }
];

async function run() {
  for (const feed of feeds) {
    console.log(`\n--- Fetching ${feed.name} RSS ---`);
    try {
      const { data } = await axios.get(feed.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        },
        timeout: 10000
      });
      const $ = cheerio.load(data, { xmlMode: true });
      const items = [];
      $('item').each((i, el) => {
        if (i < 3) {
          const title = $(el).find('title').text().trim();
          const link = $(el).find('link').text().trim();
          const pubDate = $(el).find('pubDate').text().trim();
          const description = $(el).find('description').text().trim();
          items.push({ title, link, pubDate, description });
        }
      });
      console.log(`Successfully parsed ${items.length} items from ${feed.name}:`);
      items.forEach((item, idx) => {
        console.log(`  [Item #${idx+1}] Title: ${item.title}`);
        console.log(`  Link: ${item.link}`);
      });
    } catch (err) {
      console.error(`Failed to fetch ${feed.name} RSS:`, err.message);
    }
  }
}

run();
