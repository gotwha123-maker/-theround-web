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

const digits = {
  '0': [[1,1,1],[1,0,1],[1,0,1],[1,0,1],[1,1,1]],
  '1': [[0,1,0],[0,1,0],[0,1,0],[0,1,0],[0,1,0]],
  '2': [[1,1,1],[0,0,1],[1,1,1],[1,0,0],[1,1,1]],
  '3': [[1,1,1],[0,0,1],[1,1,1],[0,0,1],[1,1,1]],
  '4': [[1,0,1],[1,0,1],[1,1,1],[0,0,1],[0,0,1]],
  '5': [[1,1,1],[1,0,0],[1,1,1],[0,0,1],[1,1,1]],
  '6': [[1,1,1],[1,0,0],[1,1,1],[1,0,1],[1,1,1]],
  '7': [[1,1,1],[0,0,1],[0,0,1],[0,0,1],[0,0,1]],
  '8': [[1,1,1],[1,0,1],[1,1,1],[1,0,1],[1,1,1]],
  '9': [[1,1,1],[1,0,1],[1,1,1],[0,0,1],[1,1,1]]
};

function drawNumber(image, num, x, y, scale = 2) {
  const numStr = num.toString();
  let currentX = x;
  const imgW = image.width;
  const imgH = image.height;
  
  for (const char of numStr) {
    const pattern = digits[char] || digits['0'];
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 3; col++) {
        if (pattern[row][col] === 1) {
          for (let sx = 0; sx < scale; sx++) {
            for (let sy = 0; sy < scale; sy++) {
              const px = currentX + col * scale + sx;
              const py = y + row * scale + sy;
              if (px >= 0 && px < imgW && py >= 0 && py < imgH) {
                const idx = (py * imgW + px) * 4;
                image.bitmap.data[idx] = 255;
                image.bitmap.data[idx+1] = 0;
                image.bitmap.data[idx+2] = 0;
                image.bitmap.data[idx+3] = 255;
              }
            }
          }
        }
      }
    }
    currentX += 4 * scale;
  }
}

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

function drawRect(image, x, y, w, h) {
  const imgW = image.width;
  const imgH = image.height;
  
  for (let px = x; px < x + w; px++) {
    if (px >= 0 && px < imgW) {
      if (y >= 0 && y < imgH) {
        const idx = (y * imgW + px) * 4;
        image.bitmap.data[idx] = 255;
        image.bitmap.data[idx+1] = 0;
        image.bitmap.data[idx+2] = 0;
        image.bitmap.data[idx+3] = 255;
      }
      const y2 = y + h - 1;
      if (y2 >= 0 && y2 < imgH) {
        const idx = (y2 * imgW + px) * 4;
        image.bitmap.data[idx] = 255;
        image.bitmap.data[idx+1] = 0;
        image.bitmap.data[idx+2] = 0;
        image.bitmap.data[idx+3] = 255;
      }
    }
  }
  for (let py = y; py < y + h; py++) {
    if (py >= 0 && py < imgH) {
      if (x >= 0 && x < imgW) {
        const idx = (py * imgW + x) * 4;
        image.bitmap.data[idx] = 255;
        image.bitmap.data[idx+1] = 0;
        image.bitmap.data[idx+2] = 0;
        image.bitmap.data[idx+3] = 255;
      }
      const x2 = x + w - 1;
      if (x2 >= 0 && x2 < imgW) {
        const idx = (py * imgW + x2) * 4;
        image.bitmap.data[idx] = 255;
        image.bitmap.data[idx+1] = 0;
        image.bitmap.data[idx+2] = 0;
        image.bitmap.data[idx+3] = 255;
      }
    }
  }
}

async function drawGrid() {
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
    
    console.log(`\nDrawing grid for Image ${t.idx}...`);
    
    let count = 0;
    for (const det of detections) {
      const [r, c, s, q] = det;
      if (q < 0.8) continue;
      
      const radius = s / 2;
      const x = Math.max(0, Math.round(c - radius));
      const y = Math.max(0, Math.round(r - radius));
      const cropW = Math.min(w - x, Math.round(s));
      const cropH = Math.min(h - y, Math.round(s));
      
      drawRect(image, x, y, cropW, cropH);
      
      // 도트 넘버 헬퍼 호출 (크기 2로 스케일링)
      const numY = Math.max(0, y - 14);
      drawNumber(image, count, x + 2, numY, 2);
      
      console.log(`  [Face ${count}] cx:${Math.round(c)}, cy:${Math.round(r)}, size:${Math.round(s)}, q:${q.toFixed(1)}`);
      count++;
    }
    
    const outPath = path.join(outputDir, `debug_grid_${t.idx}.jpg`);
    await image.write(outPath);
    console.log(`Saved debug grid to: ${outPath}`);
  }
}

drawGrid();
