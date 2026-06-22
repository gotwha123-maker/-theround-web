const { Jimp, loadFont } = require('jimp');
const { SANS_32_BLACK } = require('@jimp/plugin-print/fonts');
const path = require('path');

const brainDir = 'C:/Users/thero/.gemini/antigravity-ide/brain/d43c73ac-49ae-4184-aea3-3c9a672f81f5';
const srcPath = path.join(brainDir, 'media__1782039657681.jpg');
const destPath = path.join(brainDir, 'activity_2_numbered.jpg');
const publicDestPath = path.join(__dirname, '../public/assets/activity_2_numbered.jpg');

const detections = [
  { id: 0, x: 372, y: 360, size: 26 },
  { id: 1, x: 866, y: 369, size: 31 },
  { id: 2, x: 753, y: 332, size: 23 },
  { id: 3, x: 896, y: 407, size: 39 },
  { id: 4, x: 723, y: 367, size: 23 },
  { id: 5, x: 929, y: 349, size: 22 },
  { id: 6, x: 952, y: 368, size: 35 },
  { id: 7, x: 65, y: 371, size: 114 },
  { id: 8, x: 844, y: 337, size: 23 },
  { id: 9, x: 451, y: 340, size: 90 },
  { id: 10, x: 878, y: 340, size: 87 },
  { id: 11, x: 702, y: 636, size: 131 },
  { id: 12, x: 311, y: 565, size: 31 },
  { id: 13, x: 379, y: 449, size: 45 },
  { id: 14, x: 704, y: 352, size: 333 },
  { id: 15, x: 831, y: 423, size: 84 },
  { id: 16, x: 925, y: 461, size: 50 },
  { id: 17, x: 332, y: 346, size: 159 },
  { id: 18, x: 537, y: 345, size: 125 },
  { id: 19, x: 549, y: 276, size: 44 },
  { id: 20, x: 77, y: 265, size: 50 }
];

function drawRect(image, x, y, w, h, color, thick = 3) {
  // top, bottom
  for (let i = 0; i < w; i++) {
    for (let t = 0; t < thick; t++) {
      const px = Math.round(x + i);
      if (px >= 0 && px < image.width) {
        const pyTop = Math.round(y + t);
        const pyBot = Math.round(y + h - 1 - t);
        if (pyTop >= 0 && pyTop < image.height) image.setPixelColor(color, px, pyTop);
        if (pyBot >= 0 && pyBot < image.height) image.setPixelColor(color, px, pyBot);
      }
    }
  }
  // left, right
  for (let i = 0; i < h; i++) {
    for (let t = 0; t < thick; t++) {
      const py = Math.round(y + i);
      if (py >= 0 && py < image.height) {
        const pxLeft = Math.round(x + t);
        const pxRight = Math.round(x + w - 1 - t);
        if (pxLeft >= 0 && pxLeft < image.width) image.setPixelColor(color, pxLeft, py);
        if (pxRight >= 0 && pxRight < image.width) image.setPixelColor(color, pxRight, py);
      }
    }
  }
}

function fillRect(image, x, y, w, h, color) {
  for (let dy = 0; dy < h; dy++) {
    for (let dx = 0; dx < w; dx++) {
      const px = Math.round(x + dx);
      const py = Math.round(y + dy);
      if (px >= 0 && px < image.width && py >= 0 && py < image.height) {
        image.setPixelColor(color, px, py);
      }
    }
  }
}

async function run() {
  try {
    const image = await Jimp.read(srcPath);
    const font = await loadFont(SANS_32_BLACK);
    
    // 빨간색 테두리 색상: 0xFF0000FF (RGBA)
    const redColor = 0xFF0000FF;
    // 번호 배경 노란색: 0xFFFF00FF
    const yellowBgColor = 0xFFFF00FF;

    for (const det of detections) {
      const r = det.size / 2;
      const x = det.x - r;
      const y = det.y - r;
      const w = det.size;
      const h = det.size;

      // 1. 얼굴 영역 테두리 그리기
      drawRect(image, x, y, w, h, redColor, 3);

      // 2. 텍스트용 작은 배경 사각형 그리기 (가시성 향상)
      // 크기는 글자 수에 맞게 조절
      const bgW = det.id >= 10 ? 55 : 35;
      const bgH = 38;
      // 사각형 좌하단 또는 우하단에 배치
      const bgX = Math.max(0, x);
      const bgY = Math.max(0, y - bgH - 2);
      fillRect(image, bgX, bgY, bgW, bgH, yellowBgColor);

      // 3. 텍스트 인쇄
      image.print({
        font: font,
        x: bgX + 4,
        y: bgY + 1,
        text: String(det.id)
      });
    }

    // 파일 저장
    await image.write(destPath);
    await image.write(publicDestPath);
    console.log("Numbered image successfully created at:");
    console.log("Brain artifacts dir:", destPath);
    console.log("Public assets dir:", publicDestPath);
  } catch (err) {
    console.error("Error creating numbered image:", err);
  }
}

run();
