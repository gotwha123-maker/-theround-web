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
    if (line.includes('censor_activity_images.js') && (line.includes('write_to_file') || line.includes('replace_file_content'))) {
      try {
        const obj = JSON.parse(line);
        if (obj.tool_calls) {
          for (const tc of obj.tool_calls) {
            const content = tc.args.CodeContent || tc.args.ReplacementContent;
            if (content) {
              console.log(`Line ${lineCount}: Action = ${tc.name}, Length = ${content.length}`);
            }
          }
        }
      } catch (e) {}
    }
  }
}

search();
