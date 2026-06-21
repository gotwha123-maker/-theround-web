          // 2. 얼굴 전체 영역을 균일하게 가려주는 원형 블러 알파 마스크 처리
          region.scan((px, py, index) => {
            const dx = px - radius;
            const dy = py - radius;
            const dist = Math.sqrt(dx * dx + dy * dy);

            let alpha = 255;
            if (dist > radius) {
              alpha = 0; // 원의 바깥 영역은 투명화
            } else {
              alpha = 255; // 원의 안쪽 영역(얼굴 전체)은 균일하게 100% 불투명 블러 유지
            }

            // 알파 채널 바이트 수정
            region.bitmap.data[index + 3] = alpha;
          });