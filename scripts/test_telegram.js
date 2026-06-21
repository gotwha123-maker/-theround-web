const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

async function testTelegram() {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  console.log('Bot Token:', botToken ? botToken.substring(0, 10) + '...' : 'Missing');
  console.log('Chat ID:', chatId || 'Missing');

  if (!botToken || !chatId) {
    console.error('Credentials missing in .env.local');
    return;
  }

  const message = `🔔 *[더라운드 알림 봇 연동 테스트]* 🔔\n\n안녕하세요! 더라운드 뉴스 자동화 알림 봇 연동이 성공적으로 완료되었습니다.\n\n매일 오전 10시에 새롭게 수집된 정책 뉴스 및 혜택 정보가 이곳으로 요약 보고됩니다.`;

  try {
    const res = await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      chat_id: chatId,
      text: message,
      parse_mode: 'Markdown'
    });
    console.log('Telegram API Response Status:', res.status);
    console.log('Success! Test message sent to Telegram.');
  } catch (err) {
    console.error('Telegram test failed:', err.response ? err.response.data : err.message);
  }
}

testTelegram();
