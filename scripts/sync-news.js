const axios = require('axios');
const cheerio = require('cheerio');
const Airtable = require('airtable');
require('dotenv').config({ path: '.env.local' });

// Configuration
const AIRTABLE_API_KEY = process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN || process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const TABLE_NAME = 'SettlementNews'; // Assuming this table exists or needs to be matched

const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);

async function scrapeHanaNews() {
  console.log('Fetching news from Hana Foundation...');
  try {
    const baseUrl = 'https://www.koreahana.or.kr';
    const targetUrl = baseUrl + '/home/kor/board.do?menuPos=52'; 
    const { data } = await axios.get(targetUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' }
    });
    const $ = cheerio.load(data);
    
    const newsItems = [];
    
    // Updated selector based on typical Korean board structures
    console.log('Searching for board rows...');
    const rows = $('table tbody tr');
    console.log(`Found ${rows.length} rows in the table.`);
    
    rows.each((i, el) => {
      if (newsItems.length < 5) { 
        const titleEl = $(el).find('a').first();
        const title = titleEl.text().trim();
        
        // Find the date: look for a column that looks like a date (e.g., 2026.05.20)
        let date = '';
        $(el).find('td').each((j, td) => {
          const text = $(td).text().trim();
          if (/\d{4}[.-]\d{2}[.-]\d{2}/.test(text)) {
            date = text;
          }
        });
        
        if (!date) {
           // Fallback: second to last column
           date = $(el).find('td').last().prev().text().trim();
        }

        let href = titleEl.attr('href') || '';
        let onclick = titleEl.attr('onclick') || '';
        
        console.log(`Row ${i}: Title="${title}", Date="${date}", Href="${href}", Onclick="${onclick}"`);
        
        // Handle onclick for JS links
        if (!href.includes('board.do') && (onclick.includes('goDetail') || onclick.includes('fn_edit'))) {
          const params = onclick.match(/'([^']+)'/g);
          if (params && params.length >= 2) {
             const idx = params[1].replace(/'/g, "");
             href = `/home/kor/board.do?menuPos=52&act=detail&idx=${idx}`;
          }
        }
        
        // Convert relative URLs to absolute URLs
        if (href && !href.startsWith('http')) {
           href = baseUrl + (href.startsWith('/') ? '' : '/home/kor/') + href;
        }

        // Auto-categorize based on keywords in title
        let category = 'welfare';
        const tLower = title.toLowerCase();
        if (tLower.includes('장학') || tLower.includes('교육') || tLower.includes('보육') || tLower.includes('학교') || tLower.includes('대학') || tLower.includes('학자금') || tLower.includes('스쿨') || tLower.includes('아카데미')) {
          category = 'education';
        } else if (tLower.includes('일자리') || tLower.includes('취업') || tLower.includes('직업') || tLower.includes('창업') || tLower.includes('훈련') || tLower.includes('경영개선') || tLower.includes('사회적기업') || tLower.includes('기업 지정') || tLower.includes('구직') || tLower.includes('자활')) {
          category = 'jobs';
        } else if (tLower.includes('의료') || tLower.includes('치과') || tLower.includes('건강검진') || tLower.includes('병원') || tLower.includes('법률') || tLower.includes('변호사') || tLower.includes('의료비') || tLower.includes('검진') || tLower.includes('상담')) {
          category = 'health';
        }

        // Strict cross-check: Only add if there is a valid, clear source URL
        if (title && href && href.startsWith('http')) {
          newsItems.push({
            fields: {
              title: title,
              date: date.replace(/-/g, '.'),
              url: href,
              category: category,
              tag: '공지사항'
            }
          });
        } else if (title) {
            console.log(`[REJECTED] Missing clear source URL for: ${title}`);
        }
      }
    });
    
    if (newsItems.length === 0) {
      console.log('No valid, cross-checked news items found.');
    } else {
      console.log(`[VERIFIED] Successfully scraped and cross-checked ${newsItems.length} news items.`);
    }
    
    if (newsItems.length === 0) {
      console.log('No news items found. Selector might need adjustment.');
      // Debug: print some HTML
      console.log('HTML snippet:', data.substring(0, 500));
    }
    
    return newsItems;
  } catch (error) {
    console.error('Scraping failed:', error.message);
    return [];
  }
}

async function syncToAirtable(records) {
  if (records.length === 0) return;
  
  console.log(`Syncing ${records.length} records to Airtable...`);
  
  for (const record of records) {
    try {
      // Check if already exists to avoid duplicates (simplified)
      const existing = await base(TABLE_NAME).select({
        filterByFormula: `{title} = '${record.fields.title.replace(/'/g, "\\'")}'`
      }).firstPage();
      
      if (existing.length === 0) {
        await base(TABLE_NAME).create([record]);
        console.log(`Added: ${record.fields.title}`);
      } else {
        console.log(`Skipped (exists): ${record.fields.title}`);
      }
    } catch (err) {
      console.error('Error syncing record:', err.message);
    }
  }
}

async function run() {
  const news = await scrapeHanaNews();
  await syncToAirtable(news);
  console.log('Automation complete.');
}

run();
