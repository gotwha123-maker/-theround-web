const { Jimp } = require('jimp');
const path = require('path');
const fs = require('fs');
const pico = require('./pico.js');

const cascadeBuffer = fs.readFileSync(path.join(__dirname, 'facefinder'));
const classify_region = pico.unpack_cascade(new Uint8Array(cascadeBuffer));

const brainDir = 'C:/Users/thero/.gemini/antigravity-ide/brain/d43c73ac-49ae-4184-aea3-3c9a672f81f5';
const outputDir = path.join(__dirname, '../public/assets');

const targets = [
  { idx: 1, name: 'media__1782039657444.jpg' },
  { idx: 11, name: 'media__1782039707380.jpg' },
  { idx: 14, name: 'uploaded_media_1_1782039707668.jpg' }
];

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

async function debugFaces() {
  console.log('Generating crop debugging faces for 1, 11, 14...');
  
  for (const t of targets) {
    const imgPath = path.join(brainDir, t.name);
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
      minsize: 10,
      maxsize: Math.round(baseDim * 0.4),
      scalefactor: 1.05
    };
    
    let detections = pico.run_cascade(imageObj, classify_region, params);
    detections = pico.cluster_detections(detections, 0.2);
    
    console.log(`\nImage ${t.idx} (${t.name}) - Found ${detections.length} candidates:`);
    
    let count = 0;
    for (const det of detections) {
      const [r, c, s, q] = det;
      if (q < 0.5) continue; // 신뢰도 0.5 이상만 출력
      
      const rx = (c / w).toFixed(3);
      const ry = (r / h).toFixed(3);
      const rad = (s / 2 / baseDim).toFixed(4);
      
      const radius = s / 2;
      const x = Math.max(0, Math.round(c - radius));
      const y = Math.max(0, Math.round(r - radius));
      const cropW = Math.min(w - x, Math.round(s));
      const cropH = Math.min(h - y, Math.round(s));
      
      if (cropW > 4 && cropH > 4) {
        const faceCrop = image.clone().crop({ x, y, w: cropW, h: cropH });
        const outName = `debug_${t.idx}_face_${count}_rx${rx}_ry${ry}_rad${rad}_q${q.toFixed(1)}.jpg`;
        await faceCrop.write(path.join(outputDir, outName));
        console.log(`  Face ${count}: q=${q.toFixed(2)} -> rx=${rx}, ry=${ry}, rad=${rad} (Saved: ${outName})`);
        count++;
      }
    }
  }
  console.log('\nAll debugging face crops saved to public/assets!');
}

debugFaces();
