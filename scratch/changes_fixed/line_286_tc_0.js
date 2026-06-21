"const fs = require('fs');
const readline = require('readline');
const path = require('path');

const logPath = 'C:/Users/thero/.gemini/antigravity-ide/brain/d43c73ac-49ae-4184-aea3-3c9a672f81f5/.system_generated/logs/transcript.jsonl';
const outDir = path.join(__dirname, 'changes');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir);
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
    if (line.includes('censor_activity_images.js') && (line.includes('write_to_file') || line.includes('replace_file_content') || line.includes('ReplacementChunks'))) {
      try {
        const obj = JSON.parse(line);
        if (obj.tool_calls) {
          for (let tcIdx = 0; tcIdx < obj.tool_calls.length; tcIdx++) {
            const tc = obj.tool_calls[tcIdx];
            let content = '';
            if (tc.args.CodeContent) {
              content = tc.args.CodeContent;
            } else if (tc.args.ReplacementContent) {
              content = tc.args.ReplacementContent;
            } else if (tc.args.ReplacementChunks) {
              content = JSON.stringify(tc.args.ReplacementChunks, null, 2);
            }

            if (content) {
              let cleanContent = content;
              if (typeof content === 'string' && content.startsWith('"') && content.endsWith('"')) {
                try {
                  cleanContent = JSON.parse(content);
                } catch (e) {
                  cleanContent = content.substring(1, content.length - 1).replace(/\\
/g, '\
').replace(/\\"/g, '"');
                }
              }
              const outPath = path.join(outDir, `line_${lineCount}_tc_${tcIdx}.js`);
              fs.writeFileSync(outPath, cleanContent);
              console.log(`Saved line ${lineCount} tool call ${tcIdx} to ${outPath} (Length: ${cleanContent.le
<truncated 139 bytes>