require('dotenv').config({ path: '.env.local' });
const axios = require('axios');

async function testToken() {
  const token = process.env.AIRTABLE_API_KEY;
  console.log('Testing Token:', token.substring(0, 10) + '...');
  
  try {
    const res = await axios.get('https://api.airtable.com/v0/meta/bases', {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Successfully fetched bases!');
    console.log('Available Bases:');
    res.data.bases.forEach(b => console.log(`- ${b.name} (${b.id})`));
  } catch (err) {
    console.error('Token test failed:', err.response ? err.response.data : err.message);
  }
}

testToken();
