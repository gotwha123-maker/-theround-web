"const fs = require('fs');
const readline = require('readline');
const path = require('path');

const logPath = 'C:/Users/thero/.gemini/antigravity-ide/brain/d43c73ac-49ae-4184-aea3-3c9a672f81f5/.system_generated/logs/transcript.jsonl';
const outDir = path.join(__dirname, 'changes_fixed');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir);
}

// 이스케이프된 문자열을 풀어서 멀티라인 문자열로 만드는 헬퍼
function unescapeString(str) {
  try {
    // 만약 이미 따옴표로 묶인 json 문자열 형태라면
    if (str.startsWith('"') && str.endsWith('"')) {
      return JSON.parse(str);
    }
    // 그렇지 않다면 강제로 JSON 스트링화한 후 파싱
    return JSON.parse('"' + str.replace(/"/g, '\\"') + '"');
  } catch (e) {
    // 수동 치환 fallback
    return str
      .replace(/\\
/g, '\
')
      .replace(/\\/g, '\')
      .replace(/\\	/g, '\	')
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\');
  }
}

async function search() {
  const fileStream = fs.createReadStream(logPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let lineCount = 0;
  for await (const line of rl) {
    lineCount++;
    if (line.includes('censor_activity_images.js') && (line.includes('write_to_file') || line.includes('replace_file_content'))) {
      try {
        const obj = JSON.parse(line);
        if (obj.tool_calls) {
          for (let tcIdx = 0; tcIdx < obj.tool_calls.length; tcIdx++) {
            const tc = obj.tool_calls[tcIdx];
            let content = '';
            if (tc.name === 'write_to_file' && tc.args.CodeContent) {
              content = tc.args.CodeContent;
            } else if (tc.name === 'replace_file_content' && tc.args.ReplacementContent) {
              content = tc.args.ReplacementContent;
            }

            if (content) {
              const unescaped = unescapeString(content);
              const outPath = 
<truncated 390 bytes>