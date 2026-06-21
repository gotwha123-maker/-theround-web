const { Jimp } = require('jimp');
const path = require('path');

async function main() {
  try {
    const topPath = path.join(__dirname, '../public/assets/mentor_brochure_top.png');
    const bottomPath = path.join(__dirname, '../public/assets/mentor_brochure_bottom.png');
    
    const topImg = await Jimp.read(topPath);
    const bottomImg = await Jimp.read(bottomPath);

    const tw = topImg.width;
    const th = topImg.height;
    
    const bw = bottomImg.width;
    const bh = bottomImg.height;

    // 상단 3인 초정밀 좌표 (W=1024, H=567)
    const topSpecs = [
      { name: 'mentor_1', x: 180, y: 195, size: 88 },
      { name: 'mentor_2', x: 464, y: 195, size: 88 },
      { name: 'mentor_3', x: 750, y: 195, size: 88 }
    ];

    // 하단 4인 초정밀 좌표 (W=1024, H=577)
    // 링 테두리가 비대칭으로 치우치지 않게 가로 좌표(x) 미세 튜닝
    const bottomSpecs = [
      { name: 'mentor_4', x: bw * 0.100, y: 220, size: 85 }, // 임정택
      { name: 'mentor_5', x: bw * 0.346, y: 220, size: 85 }, // 박한울
      { name: 'mentor_6', x: bw * 0.603, y: 220, size: 85 }, // 김승환
      { name: 'mentor_7', x: bw * 0.852, y: 220, size: 85 }  // 최성우
    ];

    // 상단 3인 크롭
    for (const spec of topSpecs) {
      const clone = topImg.clone();
      clone.crop({
        x: spec.x,
        y: spec.y,
        w: spec.size,
        h: spec.size
      });
      const dest = path.join(__dirname, `../public/assets/${spec.name}.jpg`);
      await clone.write(dest);
      console.log(`Saved Spec: ${dest}`);
    }

    // 하단 4인 크롭
    for (const spec of bottomSpecs) {
      const clone = bottomImg.clone();
      clone.crop({
        x: Math.round(spec.x),
        y: spec.y,
        w: spec.size,
        h: spec.size
      });
      const dest = path.join(__dirname, `../public/assets/${spec.name}.jpg`);
      await clone.write(dest);
      console.log(`Saved Spec: ${dest}`);
    }

    console.log('TIGHT FACE CROP TUNED COMPLETED!');
  } catch (err) {
    console.error('Error final cropping:', err);
  }
}

main();
