"const { Jimp } = require('jimp');
const path = require('path');

// 개별 얼굴 매핑 데이터 (rx, ry, radius는 이미지 가로/세로 비례값)
const imageTargets = [
  {
    fileName: 'media__1782039657444.jpg', // 식당 단체사진
    masks: [
      { rx: 0.04, ry: 0.46, radius: 0.038 }, // 왼쪽 여학생 1 (하트)
      { rx: 0.16, ry: 0.46, radius: 0.038 }, // 왼쪽 여학생 2 (하트)
      { rx: 0.24, ry: 0.45, radius: 0.032 },  // 왼쪽 뒤 여학생
      { rx: 0.33, ry: 0.40, radius: 0.032 },  // 식탁 뒤 남학생 1
      { rx: 0.38, ry: 0.39, radius: 0.032 },  // 식탁 뒤 남학생 2
      { rx: 0.42, ry: 0.39, radius: 0.032 },  // 식탁 뒤 여학생
      { rx: 0.76, ry: 0.42, radius: 0.042 },  // 오른쪽 남학생
      { rx: 0.85, ry: 0.54, radius: 0.048 }  // 오른쪽 여학생
    ]
  },
  {
    fileName: 'media__1782039657474.jpg', // 세미나실 이상하 강연
    masks: [
      { rx: 0.16, ry: 0.43, radius: 0.032 },
      { rx: 0.27, ry: 0.41, radius: 0.032 },
      { rx: 0.32, ry: 0.44, radius: 0.032 },
      { rx: 0.39, ry: 0.48, radius: 0.038 },
      { rx: 0.52, ry: 0.44, radius: 0.032 },
      { rx: 0.57, ry: 0.46, radius: 0.032 },
      { rx: 0.86, ry: 0.50, radius: 0.038 }
    ]
  },
  {
    fileName: 'media__1782039657482.jpg', // 세미나실 최규복 강연
    masks: [
      { rx: 0.12, ry: 0.62, radius: 0.038 },
      { rx: 0.32, ry: 0.57, radius: 0.032 },
      { rx: 0.39, ry: 0.64, radius: 0.038 },
      { rx: 0.57, ry: 0.62, radius: 0.038 },
      { rx: 0.77, ry: 0.59, radius: 0.032 },
      { rx: 0.81, ry: 0.66, radius: 0.038 }
    ]
  },
  {
    fileName: 'media__1782039657658.jpg', // 실내 단체 파이팅
    masks: [
      { rx: 0.28, ry: 0.61, radius: 0.032 },
      { rx: 0.43, ry: 0.61, radius: 0.032 },
      { rx: 0.57, ry: 0.62, radius: 0.032 },
      { rx: 0.21, ry: 0.40, radius: 0.032 },
      { rx: 0.32, ry: 0.51, radius: 0.032 },
      { rx: 0.65, ry: 0.52, radius: 0.032 },
      { rx
<truncated 7572 bytes>