require('dotenv').config({ path: '.env.local' });
const Airtable = require('airtable');

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const TABLE_NAME = "SettlementNews";

const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);

async function checkLatestRecords() {
  console.log('Checking latest records in Airtable...');
  try {
    const records = await base(TABLE_NAME).select({
      maxRecords: 5,
      sort: [{ field: 'date', direction: 'desc' }]
    }).firstPage();
    
    console.log(`Found ${records.length} records.`);
    records.forEach(record => {
      console.log(`- [${record.get('date')}] ${record.get('title')} (${record.get('tag')})`);
    });
  } catch (err) {
    console.error('Airtable check failed:', err.message);
  }
}

checkLatestRecords();
