const fs=require('fs');
const sharp=require(process.env.SHARP_PATH||'sharp');
Promise.all([192,512].map(size=>sharp(fs.readFileSync('public/icon.svg')).resize(size,size).png().toFile(`public/icon-${size}.png`))).catch(e=>{console.error(e);process.exit(1)});
