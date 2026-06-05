const Airtable = require('airtable');
require('dotenv').config({ path: '.env.local' });

const apiKey = process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN || process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;
const base = new Airtable({ apiKey: apiKey }).base(baseId);

const newTitle = '커뮤니티 정기 송년회: 따뜻한 환대 속에서 다지는 연대의 힘';

async function updateStory() {
  try {
    const records = await base('Stories').select({}).all();
    
    // Find the record to update
    const targetRecord = records.find(r => r.fields.title && r.fields.title.includes('정기 송년회'));
    
    if (targetRecord) {
      console.log(`Found record to update: ${targetRecord.fields.title}`);
      await base('Stories').update(targetRecord.id, {
        title: newTitle
      });
      console.log('Story successfully updated in Airtable!');
    } else {
      console.log('Record not found.');
    }
  } catch (err) {
    console.error('Update failed:', err.message);
  }
}

updateStory();
