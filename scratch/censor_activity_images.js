const { Jimp } = require('jimp');
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
    fileName: 'media__1782039657444.jpg', // 식당 단체사진 (1번)
    mentors: [
      { rx: 0.55, ry: 0.38, radius: 0.02 }, // 최성우 고문님 (반경 0.035 -> 0.02로 타이트하게 좁힘)
      { rx: 0.65, ry: 0.39, radius: 0.02 }  // 이광성 회장님 (반경 0.035 -> 0.02로 타이트하게 좁힘)
    ],
    // 왼쪽 여자 얼굴들과 19번, 4번 얼굴을 포함한 참가자 수동 매핑 추가
    manualFaces: [
      { rx: 0.04, ry: 0.46, radius: 0.04 }, // 왼쪽 여학생 1
      { rx: 0.16, ry: 0.46, radius: 0.04 }, // 왼쪽 여학생 2
      { rx: 0.24, ry: 0.45, radius: 0.035 }, // 왼쪽 뒤 여학생
      { rx: 0.33, ry: 0.42, radius: 0.032 }, // 식탁 뒤 여학생 2
      { rx: 0.38, ry: 0.40, radius: 0.032 }, // 식탁 뒤 남학생 1
      { rx: 0.42, ry: 0.39, radius: 0.032 }, // 식탁 뒤 남학생 2
      { rx: 0.44, ry: 0.42, radius: 0.032 }, // 식탁 뒤 여학생 3
      { rx: 0.51, ry: 0.39, radius: 0.032 }, // 식탁 뒤 남학생 4
      { rx: 0.53, ry: 0.40, radius: 0.032 }, // 식탁 뒤 남학생 5
      { rx: 0.76, ry: 0.42, radius: 0.045 }, // 오른쪽 남학생
      { rx: 0.85, ry: 0.54, radius: 0.05 },  // 오른쪽 여학생
      { rx: 0.587, ry: 0.414, radius: 0.025 }, // Face 19 (식탁 중앙 참가자) 강제 블러 추가
      { rx: 0.606, ry: 0.424, radius: 0.025 }  // Face 4 (식탁 중앙 우측 참가자) 강제 블러 추가
    ]
  },
  {
    fileName: 'media__1782039657681.jpg', // 세미나실 이상하 강연 (새 이미지)
    mentors: [
      { rx: 0.063, ry: 0.33, radius: 0.04 }  // 이상하 회장님 (좌측 서 계신 분)
    ],
    ignoreDetectionIds: [7, 20], // 7, 20은 이상하 회장님 보존
    manualFaces: [
      { rx: 0.370, ry: 0.585, radius: 0.055 } // 13번 인물 (사용자 피드백으로 확실히 가려지도록 넓은 블러 추가)
    ]
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
    disableCensor: true, // 단체사진이므로 블러 처리 해제 (원본 노출)
    mentors: [],
    manualFaces: []
  },
  {
    fileName: 'media__1782050476575.jpg', // 세미나 최성우 강연 (새 이미지)
    mentors: [
      { rx: 0.626, ry: 0.307, radius: 0.038 }   // 최성우 고문님
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
    fileName: 'media__1782039685691.jpg', // 강의실 강사 원거리
    mentors: [
      { rx: 0.07, ry: 0.32, radius: 0.038 }  // 최성우 고문님
    ],
    manualFaces: []
  },
  {
    fileName: 'media__1782039685727.jpg', // 단체사진 현수막 2
    mentors: [
      { rx: 0.06, ry: 0.47, radius: 0.038 }, // 최성우 CHRO님
      { rx: 0.43, ry: 0.50, radius: 0.038 }, // 이광성 회장님
      { rx: 0.72, ry: 0.52, radius: 0.038 }  // 박한울 본부장님
    ],
    manualFaces: []
  },
  {
    fileName: 'media__1782039685740.jpg', // 단체사진 현수막 3
    mentors: [
      { rx: 0.06, ry: 0.47, radius: 0.038 }, // 최성우 CHRO님
      { rx: 0.43, ry: 0.50, radius: 0.038 }, // 이광성 회장님
      { rx: 0.72, ry: 0.52, radius: 0.038 }  // 박한울 본부장님
    ],
    manualFaces: []
  },
  {
    fileName: 'media__1782039686159.jpg', // 박수치는 단체
    mentors: [],
    manualFaces: []
  },
  {
    fileName: 'media__1782039707380.jpg', // 야외 단체 투어 (11번)
    mentors: [
      { rx: 0.301, ry: 0.616, radius: 0.035 }, // 최성우 고문님 (Face 17 위치로 미세 조정)
      { rx: 0.53, ry: 0.48, radius: 0.035 }  // 김승환 사장님 (Face 5 위치)
    ],
    // 사용자 지정 9번 얼굴 (Face 9: rx=0.191, ry=0.550) 강제 블러 영역 추가
    manualFaces: [
      { rx: 0.191, ry: 0.550, radius: 0.06 }
    ]
  },
  {
    fileName: 'media__1782039707410.jpg', // 야외/사옥 강연실 김승환 강연
    mentors: [
      { rx: 0.93, ry: 0.42, radius: 0.038 }  // 김승환 사장님
    ],
    manualFaces: []
  },
  {
    fileName: 'uploaded_media_0_1782039707668.jpg', // 야외 단체 투어 2
    mentors: [
      { rx: 0.30, ry: 0.48, radius: 0.035 },
      { rx: 0.53, ry: 0.48, radius: 0.035 }
    ],
    manualFaces: []
  },
  {
    fileName: 'uploaded_media_1_1782039707668.jpg', // 사옥 강연실 경청 2 (14번)
    mentors: [
      { rx: 0.938, ry: 0.923, radius: 0.038 } // 김승환 사장님 (우측 하단 단상 Face 11 위치로 미세 조정)
    ],
    manualFaces: []
  },
  {
    fileName: 'uploaded_media_2_1782039707668.jpg', // 사옥 강연실 경청 3
    mentors: [
      { rx: 0.93, ry: 0.42, radius: 0.038 }
    ],
    manualFaces: []
  }
];

// RGBA 버퍼를 8비트 그레이스케일 버퍼로 변환하는 함수
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

// 감지된 얼굴이 멘토 영역과 겹치는지 판단하는 함수
function isMentorOverlap(faceX, faceY, faceSize, mentors, w, h) {
  return mentors.some(m => {
    const mentorX = m.rx * w;
    const mentorY = m.ry * h;
    const baseSize = Math.max(w, h);
    const mentorRadius = m.radius * baseSize;

    // 두 중심 간의 유클리드 거리 계산
    const dist = Math.sqrt((faceX - mentorX) ** 2 + (faceY - mentorY) ** 2);
    // 멘토 영역 반경의 1.1배 이내에 들어와야 멘토로 판단 (주변 참가자 오판 간섭 차단)
    return dist < mentorRadius * 1.1;
  });
}

// 둥글고 부드러운 경계의 블러를 개별 얼굴 영역에 적용하는 함수
function applyFaceBlur(image, cx, cy, size, blurRadius = 14) {
  const w = image.width;
  const h = image.height;
  const radius = size / 2;

  // 얼굴 영역 좌표 계산 (바운딩 박스)
  const x = Math.max(0, Math.round(cx - radius));
  const y = Math.max(0, Math.round(cy - radius));
  const cropW = Math.min(w - x, Math.round(size));
  const cropH = Math.min(h - y, Math.round(size));

  if (cropW <= 4 || cropH <= 4) return;

  try {
    // 1. 해당 영역 크롭 및 블러 처리
    const faceCrop = image.clone().crop({ x, y, w: cropW, h: cropH });
    faceCrop.blur(blurRadius);

    // 2. 원형 그라데이션 페더 마스킹 (경계 부드럽게)
    faceCrop.scan((px, py, index) => {
      const dx = px - radius;
      const dy = py - radius;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let alpha = 255;
      if (dist > radius) {
        alpha = 0; // 원 밖은 투명
      } else if (dist > radius * 0.6) {
        // 외곽 40% 영역에 걸쳐 투명도 페더링
        const ratio = (dist - radius * 0.6) / (radius * 0.4);
        alpha = Math.round(255 * (1 - ratio));
      }
      faceCrop.bitmap.data[index + 3] = alpha;
    });

    // 3. 원본 이미지에 덮어쓰기
    image.composite(faceCrop, x, y);
  } catch (err) {
    console.error(`Error applying face blur at (${cx}, ${cy}, size: ${size}):`, err);
  }
}

async function runCensor() {
  const brainDir = 'C:/Users/thero/.gemini/antigravity-ide/brain/d43c73ac-49ae-4184-aea3-3c9a672f81f5';
  const outputDir = path.join(__dirname, '../public/assets');

  console.log('Starting AI-based Face Detection & Individual Blurring (Option 2)...');

  for (let idx = 0; idx < imageTargets.length; idx++) {
    const target = imageTargets[idx];
    const srcPath = path.join(brainDir, target.fileName);
    const destName = `activity_censored_${idx + 1}.jpg`;
    const destPath = path.join(outputDir, destName);

    try {
      console.log(`\n======================================`);
      console.log(`Processing: ${target.fileName} -> ${destName}`);
      const image = await Jimp.read(srcPath);
      
      if (target.disableCensor) {
        console.log(`  [CENSOR DISABLED] Copying original image without any blur.`);
        await image.write(destPath);
        continue;
      }

      const w = image.width;
      const h = image.height;

      // pico.js에 전달하기 위한 8비트 그레이스케일 버퍼 변환
      const grayBuffer = rgbaToGrayscale(image.bitmap.data, w, h);

      const imageObj = {
        pixels: grayBuffer,
        nrows: h,
        ncols: w,
        ldim: w
      };

      // 얼굴 인식 매개변수 설정
      // minsize를 12px로 낮추어 원거리 청년 얼굴도 탐지하고, shiftfactor/scalefactor를 촘촘히 조절
      const baseDim = Math.max(w, h);
      const params = {
        shiftfactor: 0.05, // 0.1 -> 0.05 (더 촘촘한 윈도우 슬라이딩)
        minsize: 12,       // baseDim 비율 대신 절대크기 12px로 고정하여 아주 작은 얼굴도 검출
        maxsize: Math.round(baseDim * 0.4),
        scalefactor: 1.05  // 1.1 -> 1.05 (더 정밀한 스케일링)
      };

      // 1. 얼굴 감지 실행
      let detections = pico.run_cascade(imageObj, classify_region, params);
      
      // 2. 검출된 영역 클러스터링 (중복 감지 억제)
      detections = pico.cluster_detections(detections, 0.2); // IoU threshold 0.2

      console.log(`Total raw detections: ${detections.length}`);

      // 3. 점수 필터링 및 멘토 제외 처리
      // 옆모습이나 흐린 얼굴도 누락 없이 잡기 위해 임계값을 1.0으로 대폭 완화
      const qThreshold = 1.0; 
      const finalFacesToBlur = [];


      for (let i = 0; i < detections.length; i++) {
        const det = detections[i];
        const [r, c, s, q] = det; // r=y, c=x, s=size, q=score
        if (q < qThreshold) continue;

        // 사용자가 명시적으로 블러 제외를 요청한 감지 ID 목록 처리
        if (target.ignoreDetectionIds && target.ignoreDetectionIds.includes(i)) {
          console.log(`  [IGNORE ID] Ignored face at index ${i} (${Math.round(c)}, ${Math.round(r)}) by user request.`);
          continue;
        }

        // 멘토 대표님 얼굴 좌표와 겹치는지 체크
        if (isMentorOverlap(c, r, s, target.mentors, w, h)) {
          console.log(`  [MENTOR MATCH] Ignored face at (${Math.round(c)}, ${Math.round(r)}), size: ${Math.round(s)}, q: ${q.toFixed(2)}`);
          continue;
        }

        console.log(`  [TARGET FACE] Detected participant at (${Math.round(c)}, ${Math.round(r)}), size: ${Math.round(s)}, q: ${q.toFixed(2)}`);
        finalFacesToBlur.push({ x: c, y: r, size: s });
      }

      // 4. 수동 지정된 일반 청년 얼굴 보정 좌표가 있을 시 결합
      if (target.manualFaces && target.manualFaces.length > 0) {
        for (const mf of target.manualFaces) {
          const mx = mf.rx * w;
          const my = mf.ry * h;
          const baseSize = Math.max(w, h);
          const ms = mf.radius * baseSize * 2; // radius to size
          console.log(`  [MANUAL FACE] Added manual blur zone at (${Math.round(mx)}, ${Math.round(my)}), size: ${Math.round(ms)}`);
          finalFacesToBlur.push({ x: mx, y: my, size: ms });
        }
      }

      // 5. 대상 얼굴들만 부드러운 원형 블러 처리
      console.log(`Blurring ${finalFacesToBlur.length} participant faces...`);
      for (const face of finalFacesToBlur) {
        // 얼굴 영역 크기 대비 더욱 확실한 신원 보호를 위해 블러 반경을 24로 상향
        // 너무 작은 얼굴은 페더링 마스크 때문에 블러가 약해지므로 최소 크기를 55px로 강제 보정하여 확실히 뭉갭니다.
        applyFaceBlur(image, face.x, face.y, Math.max(55, face.size), 24);
      }

      // 6. 결과 저장
      await image.write(destPath);
      console.log(`Successfully saved: ${destName}`);

    } catch (err) {
      console.error(`Failed to process ${target.fileName}:`, err);
    }
  }

  console.log('\nAI face blurring processing finished!');
}

runCensor();

