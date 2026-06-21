const fs = require('fs');
const readline = require('readline');
const path = require('path');

const logPath = 'C:/Users/thero/.gemini/antigravity-ide/brain/d43c73ac-49ae-4184-aea3-3c9a672f81f5/.system_generated/logs/transcript.jsonl';
const outPath = path.join(__dirname, 'extracted_masks_all.txt');

async function search() {
  const fileStream = fs.createReadStream(logPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let lineCount = 0;
  let output = '';
  for await (const line of rl) {
    lineCount++;
    if (line.includes('masks') || line.includes('manualFaces') || line.includes('imageTargets')) {
      // JSON 파싱
      try {
        const obj = JSON.parse(line);
        output += `\n\n======================================\n`;
        output += `Line ${lineCount}: Source = ${obj.source}, Type = ${obj.type}\n`;
        if (obj.content) {
          output += `Content:\n${obj.content}\n`;
        }
        if (obj.tool_calls) {
          output += `Tool Calls:\n${JSON.stringify(obj.tool_calls, null, 2)}\n`;
        }
      } catch (e) {
        output += `\nLine ${lineCount} (Parse Error):\n${line.substring(0, 1000)}\n`;
      }
    }
  }

  fs.writeFileSync(outPath, output);
  console.log(`Saved all matches to: ${outPath}`);
}

search();
