const Airtable = require('airtable');
require('dotenv').config({ path: '.env.local' });

const apiKey = process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN || process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;
const base = new Airtable({ apiKey: apiKey }).base(baseId);

async function enforceCredibility() {
  try {
    const records = await base('SettlementNews').select({}).all();
    console.log(`Checking ${records.length} records for clear sources...`);

    let deletedCount = 0;
    for (const record of records) {
      const url = record.fields.url;
      // If URL is just "#" or missing, it's considered unverified/fallback data
      if (!url || url === "#" || url.includes("javascript:void")) {
        console.log(`Deleting unverified record: "${record.fields.title}"`);
        await base('SettlementNews').destroy(record.id);
        deletedCount++;
      }
    }
    console.log(`Credibility check complete. Removed ${deletedCount} unverified records.`);
  } catch (err) {
    console.error('Check failed:', err.message);
  }
}

enforceCredibility();
