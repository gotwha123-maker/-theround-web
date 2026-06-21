const { Jimp } = require('jimp');
const path = require('path');

async function main() {
  try {
    const srcPath = path.join(__dirname, '../public/assets/academy_brochure_1.jpg');
    const image = await Jimp.read(srcPath);
    
    const w = image.width;
    const h = image.height;

    // 멘토 크롭 영역 미세 조정
    const mentorSpecs = [
      // 1. 이상하
      { name: 'mentor_1', x: w * 0.11, y: h * 0.125, size: w * 0.15 },
      // 2. 최규복
      { name: 'mentor_2', x: w * 0.425, y: h * 0.125, size: w * 0.15 },
      // 3. 이광성
      { name: 'mentor_3', x: w * 0.725, y: h * 0.125, size: w * 0.15 },
      
      // 4. 임정택
      { name: 'mentor_4', x: w * 0.045, y: h * 0.640, size: w * 0.14 },
      // 5. 박한울
      { name: 'mentor_5', x: w * 0.298, y: h * 0.640, size: w * 0.14 },
      // 6. 김승환
      { name: 'mentor_6', x: w * 0.567, y: h * 0.640, size: w * 0.14 },
      // 7. 최성우
      { name: 'mentor_7', x: w * 0.832, y: h * 0.640, size: w * 0.14 }
    ];

    for (const spec of mentorSpecs) {
      const clone = image.clone();
      clone.crop({
        x: Math.round(spec.x),
        y: Math.round(spec.y),
        w: Math.round(spec.size),
        h: Math.round(spec.size)
      });
      
      const destPath = path.join(__dirname, `../public/assets/${spec.name}.jpg`);
      await clone.write(destPath);
      console.log(`Updated Spec Saved: ${destPath}`);
    }

    console.log('Mentor images re-cropped and tuned successfully!');
  } catch (err) {
    console.error('Error cropping images:', err);
  }
}

main();
