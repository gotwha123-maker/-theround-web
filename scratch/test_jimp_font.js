const { loadFont } = require('jimp');
const { SANS_32_BLACK } = require('@jimp/plugin-print/fonts');

async function run() {
  try {
    console.log("SANS_32_BLACK type:", typeof SANS_32_BLACK);
    console.log("SANS_32_BLACK value:", SANS_32_BLACK);
    const font = await loadFont(SANS_32_BLACK);
    console.log("Font loaded successfully!", typeof font);
  } catch (err) {
    console.error("Font load failed:", err);
  }
}
run();
