const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../app/globals.css');
const content = fs.readFileSync(cssPath, 'utf8');

const lines = content.split('\n');
console.log('--- Searching for grid/flex/columns in globals.css ---');
lines.forEach((line, index) => {
  if (line.includes('grid') || line.includes('display: flex') || line.includes('display: grid')) {
    if (line.includes('.') || line.includes('#') || lines[index - 1]?.includes('.') || lines[index - 2]?.includes('.')) {
      console.log(`Line ${index + 1}: ${line.trim()}`);
    }
  }
});
