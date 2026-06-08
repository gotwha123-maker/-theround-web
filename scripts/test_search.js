const axios = require('axios');
const cheerio = require('cheerio');

async function testSearch() {
  const query = '북한이탈주민 지원 사업 2026';
  const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    const $ = cheerio.load(data);
    const results = [];
    $('.result__body').each((i, el) => {
      const titleEl = $(el).find('.result__title a');
      const title = titleEl.text().trim();
      const link = titleEl.attr('href');
      const snippet = $(el).find('.result__snippet').text().trim();
      results.push({ title, link, snippet });
    });
    console.log(`Found ${results.length} search results:`);
    results.slice(0, 5).forEach((r, idx) => {
      console.log(`\n[Result #${idx+1}]`);
      console.log(`Title: ${r.title}`);
      console.log(`Link: r.link = ${r.link}`);
      console.log(`Snippet: ${r.snippet}`);
    });
  } catch (err) {
    console.error('Search failed:', err.message);
  }
}

testSearch();
