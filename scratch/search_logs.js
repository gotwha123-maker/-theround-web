const fs = require('fs');
const path = require('path');

const changesDir = 'C:/Users/thero/Desktop/theround-web-next/scratch/changes_fixed';
const files = fs.readdirSync(changesDir);

for (const file of files) {
  const content = fs.readFileSync(path.join(changesDir, file), 'utf8');
  if (content.includes('media__1782039707380.jpg') || content.includes('uploaded_media_1_1782039707668.jpg')) {
    console.log(`\n======================================`);
    console.log(`FOUND IN FILE: ${file}`);
    console.log(content.substring(0, 1500)); // 앞부분 1500자 출력
    console.log(`======================================`);
  }
}
