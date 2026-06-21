const fs = require('fs');
const readline = require('readline');
const path = require('path');

const logPath = 'C:/Users/thero/.gemini/antigravity-ide/brain/d43c73ac-49ae-4184-aea3-3c9a672f81f5/.system_generated/logs/transcript.jsonl';

async function search() {
  const fileStream = fs.createReadStream(logPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let lineCount = 0;
  for await (const line of rl) {
    lineCount++;
    // censor_activity_images.js 를 생성하거나 썼던 기록을 조회
    if (line.includes('censor_activity_images.js') && (line.includes('write_to_file') || line.includes('replace_file_content') || line.includes('imageTargets'))) {
      try {
        const obj = JSON.parse(line);
        if (obj.tool_calls) {
          for (const tc of obj.tool_calls) {
            if (tc.name === 'write_to_file' || tc.name === 'replace_file_content') {
              console.log(`Line ${lineCount}: Found script modification`);
              const content = tc.args.CodeContent || tc.args.ReplacementContent;
              if (content) {
                // imageTargets 가 포함되어 있으면 그 근처 1500자 출력
                const idx = content.indexOf('imageTargets');
                if (idx !== -1) {
                  console.log('--- FOUND IMAGETARGETS IN CODE ---');
                  console.log(content.substring(idx, idx + 2500));
                  console.log('----------------------------------');
                }
              }
            }
          }
        }
      } catch (e) {
        // console.log(e);
      }
    }
  }
}

search();
