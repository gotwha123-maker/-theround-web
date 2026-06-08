const Airtable = require('airtable');
require('dotenv').config({ path: '.env.local' });

const apiKey = process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN || process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;
const base = new Airtable({ apiKey: apiKey }).base(baseId);

async function searchPhrase() {
  try {
    const tables = ['SettlementNews', 'Designers', 'Stories'];
    for (const tableName of tables) {
      console.log(`Searching in table: ${tableName}...`);
      const records = await base(tableName).select().all();
      for (const record of records) {
        const fields = record.fields;
        for (const key in fields) {
          if (typeof fields[key] === 'string' && (fields[key].includes("구글") || fields[key].includes("크로스체크"))) {
            console.log(`FOUND in ${tableName} [${record.id}] field [${key}]: ${fields[key]}`);
          }
        }
      }
    }
    console.log('Search completed.');
  } catch (err) {
    console.error('Error during search:', err);
  }
}

searchPhrase();
