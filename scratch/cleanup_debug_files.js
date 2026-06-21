const fs = require('fs');
const path = require('path');

const publicDir = 'c:/Users/thero/Desktop/theround-web-next/public/assets';

try {
  const files = fs.readdirSync(publicDir);
  let count = 0;
  
  for (const file of files) {
    // 우리가 디버깅을 위해 만든 임시 파일들 매칭
    if (
      file.startsWith('media_orig_') || 
      file.startsWith('debug_grid_') || 
      (file.startsWith('debug_') && file.endsWith('.jpg'))
    ) {
      fs.unlinkSync(path.join(publicDir, file));
      console.log(`Deleted temp file: ${file}`);
      count++;
    }
  }
  
  console.log(`Cleanup completed! Total ${count} temporary debugging files deleted.`);
} catch (err) {
  console.error('Cleanup failed:', err.message);
}
