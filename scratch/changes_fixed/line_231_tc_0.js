"const { Jimp } = require('jimp');
const path = require('path');
const fs = require('fs');
const pico = require('./pico.js');

// pico.js의 facefinder 가중치 파일 로드
const cascadeBuffer = fs.readFileSync(path.join(__dirname, 'facefinder'));
const classify_region = pico.unpack_cascade(new Uint8Array(cascadeBuffer));

// 이미지별로 포커싱을 유지할 멘토 대표님들의 얼굴 좌표 정의
// rx, ry, radius는 이미지 가로/세로 대비 비율
const imageTargets = [
  {
    fileName: 'media__1782039657444.jpg', // 식당 단체사진
    mentors: [
      { rx: 0.55, ry: 0.38, radius: 0.035 }, // 최성우 고문님
      { rx: 0.65, ry: 0.39, radius: 0.035 }  // 이광성 회장님
    ],
    // AI가 놓칠 수 있거나 더 보정이 필요한 일반 참가자 얼굴 보완 (필요시 추가)
    manualFaces: []
  },
  {
    fileName: 'media__1782039657474.jpg', // 세미나실 이상하 강연
    mentors: [
      { rx: 0.70, ry: 0.37, radius: 0.038 }  // 이상하 회장님
    ],
    manualFaces: []
  },
  {
    fileName: 'media__1782039657482.jpg', // 세미나실 최규복 강연
    mentors: [
      { rx: 0.65, ry: 0.53, radius: 0.045 }  // 최규복 회장님
    ],
    manualFaces: []
  },
  {
    fileName: 'media__1782039657658.jpg', // 실내 단체 파이팅
    mentors: [
      { rx: 0.06, ry: 0.47, radius: 0.038 }, // 최성우 CHRO님
      { rx: 0.43, ry: 0.50, radius: 0.038 }, // 이광성 회장님
      { rx: 0.72, ry: 0.52, radius: 0.038 }  // 박한울 본부장님
    ],
    manualFaces: []
  },
  {
    fileName: 'media__1782039657681.jpg', // 세미나 최성우 강연
    mentors: [
      { rx: 0.07, ry: 0.32, radius: 0.04 }   // 최성우 고문님
    ],
    manualFaces: []
  },
  {
    fileName: 'media__1782039685616.jpg', // 세미나 3인 샷
    mentors: [
      { rx: 0.16, ry: 0.45, radius: 0.055 }  // 최성우 고문님
    ],
    manualFaces: []
  },
  {
    fileName: 'media__1782039685691.jpg', 
<truncated 8727 bytes>