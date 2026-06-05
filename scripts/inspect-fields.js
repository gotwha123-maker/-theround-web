const Airtable = require('airtable');
require('dotenv').config({ path: '.env.local' });

const apiKey = process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN || process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;
const base = new Airtable({ apiKey: apiKey }).base(baseId);

async function inspectFields() {
  try {
    const records = await base('Designers').select({ maxRecords: 1 }).firstPage();
    if (records.length > 0) {
      console.log('FIELDS FOUND IN AIRTABLE:', Object.keys(records[0].fields).join(', '));
      console.log('FULL DATA:', JSON.stringify(records[0].fields, null, 2));
    } else {
      console.log('No records found in Designers table.');
    }
  } catch (err) {
    console.error('Inspection failed:', err.message);
  }
}

inspectFields();
