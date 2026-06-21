### 1. 멘토 대표님 제외 전원 아웃포커싱(시네마틱 블러) 가공
- **스크립트 구현**: [censor_activity_images.js](file:///c:/Users/thero/Desktop/theround-web-next/scratch/censor_activity_images.js)를 전면 개편하여, 개별 참가자 얼굴을 조각조각 가리던 투박한 방식 대신 **이미지 전체를 아주 깊게 블러 처리(Radius 22)하여 아웃포커싱(배경 흐림)** 시켰습니다.
- **포커싱 합성 알고리즘**: 오직 멘토 대표님(들)의 얼굴 좌표 영역만 선명한 원본 이미지에서 둥글게 추출하고 가장자리를 부드럽게 페더 마스킹하여 흐려진 이미지 위에 얹었습니다.
- **효과**: 이로 인해 멘토 대표님을 제외한 현장의 모든 청년, 참가자, 복잡한 실내/식탁 사물들은 자연스럽게 배경 속에 아웃포커스되어 신원이 완벽히 비공개 처리되는 동시에, 멘토 대표님들만 영화 속 스틸컷처럼 선명하게 부각되는 최고 수준의 프리미엄(Wow factor) 시각 효과를 완성했습니다.
- **이미지 생성**: `node scratch/censor_activity_images.js` 명령을 재실행해 15장의 고해상도 가공본 스냅사진(`activity_censored_1.jpg` ~ `activity_censored_15.jpg`)을 `public/assets/`에 성공적으로 최종 저장 완료했습니다.