const Airtable = require('airtable');
require('dotenv').config({ path: '.env.local' });

const apiKey = process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN || process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;

const base = new Airtable({ apiKey: apiKey }).base(baseId);

async function checkDesigners() {
  try {
    const records = await base('Designers').select({}).all();
    console.log(`Found ${records.length} designers.`);
    records.forEach((r, i) => {
      console.log(`--- Record ${i} (${r.fields.name}) ---`);
      console.log(JSON.stringify(r.fields, null, 2));
    });
  } catch (err) {
    console.error('Error fetching designers:', err.message);
  }
}

checkDesigners();
