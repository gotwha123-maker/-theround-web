require('dotenv').config({ path: '.env.local' });
const Airtable = require('airtable');

const token = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID; // appG3mE1NuXLHp4tp
const tableName = "SettlementNews";

const base = new Airtable({ apiKey: token }).base(baseId);

async function testWrite() {
  console.log(`Testing write to Base: ${baseId}, Table: ${tableName}`);
  try {
    const record = await base(tableName).create([
      {
        fields: {
          title: "🔑 API 연결 테스트",
          date: new Date().toISOString().split('T')[0],
          tag: "테스트"
        }
      }
    ]);
    console.log('Successfully created record!', record[0].id);
  } catch (err) {
    console.error('Write failed:', err.message);
    if (err.statusCode === 403) {
      console.log('Error 403: This usually means the token has "read" but not "write" scope, or doesn\'t have access to this specific base.');
    }
  }
}

testWrite();
