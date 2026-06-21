const { Jimp } = require('jimp');
const path = require('path');

const brainDir = 'C:/Users/thero/.gemini/antigravity-ide/brain/d43c73ac-49ae-4184-aea3-3c9a672f81f5';
const files = [
  'media__1782039657444.jpg', // 1
  'media__1782039707380.jpg', // 11
  'uploaded_media_1_1782039707668.jpg' // 14
];

async function main() {
  for (const file of files) {
    const img = await Jimp.read(path.join(brainDir, file));
    console.log(`${file}: w=${img.width}, h=${img.height}`);
  }
}

main();
