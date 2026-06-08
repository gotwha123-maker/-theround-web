const OpenAI = require('openai');
require('dotenv').config({ path: '.env.local' });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function run() {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'user', content: '공공기관에서 배포한 "2026년 탈북청년 기술 교육 모집"이라는 공고가 사실인지 여부와 탈북민 정착 지원 정보로 유효한지 검증하는 프롬프트를 테스트합니다. "이 정보는 유효합니다"라고 짤막하게 한글로 응답해주세요.' }
      ],
      max_tokens: 50
    });
    console.log('AI Response:', response.choices[0].message.content.trim());
  } catch (err) {
    console.error('OpenAI Error:', err.message);
  }
}

run();
