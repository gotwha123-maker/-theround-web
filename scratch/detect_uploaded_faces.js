const { Jimp } = require('jimp');
const path = require('path');
const fs = require('fs');
const pico = require('./pico.js'); // 로컬 scratch 폴더 내 pico.js 로드

const brainDir = 'C:/Users/thero/.gemini/antigravity-ide/brain/d43c73ac-49ae-4184-aea3-3c9a672f81f5';
const cascadeBuffer = fs.readFileSync(path.join(__dirname, 'facefinder'));
const classify_region = pico.unpack_cascade(new Uint8Array(cascadeBuffer));

function rgbaToGrayscale(rgbaBuffer, width, height) {
  const gray = new Uint8Array(width * height);
  for (let i = 0; i < width * height; i++) {
    const r = rgbaBuffer[i * 4];
    const g = rgbaBuffer[i * 4 + 1];
    const b = rgbaBuffer[i * 4 + 2];
    gray[i] = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
  }
  return gray;
}

async function main() {
  const file = 'media__1782039657681.jpg';
  const imgPath = path.join(brainDir, file);
  const image = await Jimp.read(imgPath);
  const w = image.width;
  const h = image.height;
  
  const grayBuffer = rgbaToGrayscale(image.bitmap.data, w, h);
  const imageObj = {
    pixels: grayBuffer,
    nrows: h,
    ncols: w,
    ldim: w
  };

  const baseDim = Math.max(w, h);
  const params = {
    shiftfactor: 0.05,
    minsize: 12,
    maxsize: Math.round(baseDim * 0.4),
    scalefactor: 1.05
  };

  let detections = pico.run_cascade(imageObj, classify_region, params);
  detections = pico.cluster_detections(detections, 0.2);

  console.log(`Detections in ${file}:`);
  for (let i = 0; i < detections.length; i++) {
    const [r, c, s, q] = detections[i]; // r=y, c=x, s=size, q=score
    if (q < 1.0) continue;
    const rx = c / w;
    const ry = r / h;
    const radius = (s / 2) / baseDim;
    console.log(`Face ${i}: rx=${rx.toFixed(3)}, ry=${ry.toFixed(3)}, radius=${radius.toFixed(3)}, x=${Math.round(c)}, y=${Math.round(r)}, size=${Math.round(s)}, q=${q.toFixed(2)}`);
  }
}

main();
