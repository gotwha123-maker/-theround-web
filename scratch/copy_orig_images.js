const fs = require('fs');
const path = require('path');

const brainDir = 'C:/Users/thero/.gemini/antigravity-ide/brain/d43c73ac-49ae-4184-aea3-3c9a672f81f5';
const publicDir = 'c:/Users/thero/Desktop/theround-web-next/public/assets';

const copyList = [
  { src: 'media__1782039657444.jpg', dest: 'media_orig_1.jpg' },
  { src: 'media__1782039707380.jpg', dest: 'media_orig_11.jpg' },
  { src: 'uploaded_media_1_1782039707668.jpg', dest: 'media_orig_14.jpg' }
];

for (const item of copyList) {
  const srcPath = path.join(brainDir, item.src);
  const destPath = path.join(publicDir, item.dest);
  try {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied: ${item.src} -> ${item.dest}`);
  } catch (err) {
    console.error(`Failed to copy ${item.src}:`, err.message);
  }
}
