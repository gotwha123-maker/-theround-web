"const { Jimp } = require('jimp');
const path = require('path');

// 가공할 이미지 리스트 및 마스킹 비율 좌표 정의
// x, y, w, h는 이미지의 width, height 대비 비율(0 ~ 1)입니다.
const imageTargets = [
  {
    fileName: 'media__1782039657444.jpg', // 식당 단체사진
    masks: [
      { rx: 0.0, ry: 0.25, rw: 0.35, rh: 0.7 }, // 왼쪽 테이블 학생들
      { rx: 0.65, ry: 0.25, rw: 0.35, rh: 0.7 }, // 오른쪽 테이블 학생들
      { rx: 0.35, ry: 0.4, rw: 0.3, rh: 0.6 } // 중앙 테이블 학생들
    ]
  },
  {
    fileName: 'media__1782039657474.jpg', // 세미나실 이상하 강연
    masks: [
      { rx: 0.05, ry: 0.35, rw: 0.65, rh: 0.55 } // 경청하는 학생들 전체
    ]
  },
  {
    fileName: 'media__1782039657482.jpg', // 세미나실 최규복 강연
    masks: [
      { rx: 0.05, ry: 0.35, rw: 0.6, rh: 0.6 } // 좌측에 앉아 있는 학생들
    ]
  },
  {
    fileName: 'media__1782039657658.jpg', // 실내 단체 파이팅
    masks: [
      { rx: 0.08, ry: 0.45, rw: 0.84, rh: 0.45 }, // 앞줄 청년들
      { rx: 0.15, ry: 0.28, rw: 0.25, rh: 0.22 }, // 뒷줄 왼쪽 청년들
      { rx: 0.55, ry: 0.28, rw: 0.3, rh: 0.22 } // 뒷줄 오른쪽 청년들 (중앙의 이광성 멘토 등 제외)
    ]
  },
  {
    fileName: 'media__1782039657681.jpg', // 세미나 최성우 강연
    masks: [
      { rx: 0.3, ry: 0.35, rw: 0.7, rh: 0.55 } // 우측 청년들 좌석
    ]
  },
  {
    fileName: 'media__1782039685616.jpg', // 세미나 3인 샷
    masks: [
      { rx: 0.33, ry: 0.25, rw: 0.3, rh: 0.5 }, // 가운데 남학생
      { rx: 0.65, ry: 0.25, rw: 0.33, rh: 0.55 } // 우측 여학생
    ]
  },
  {
    fileName: 'media__1782039685691.jpg', // 강의실 강사 원거리
    masks: [
      { rx: 0.22, ry: 0.35, rw: 0.78, rh: 0.55 } // 강연장의 청년들 전체
    ]
  },
  {
    fileName: 'media__1782039685727.jpg', // 단체사진 현수막 2
    masks: [
      { rx: 0.15, ry: 
<truncated 3463 bytes>