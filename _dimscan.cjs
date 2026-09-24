const fs = require('fs');
const path = require('path');

const dir = 'c:/projects/printking/printking/frontend/public/assets/';
const out = [];

function jpegSize(buf) {
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xff) { i++; continue; }
    const marker = buf[i + 1];
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7) };
    }
    const len = buf.readUInt16BE(i + 2);
    i += 2 + len;
  }
  return null;
}

function pngSize(buf) {
  return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
}

let files = [];
try { files = fs.readdirSync(dir).filter(f => /\.(jpe?g|png)$/i.test(f)); } catch (e) { out.push('ERR readdir: ' + e.message); }

files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
for (const f of files) {
  const buf = fs.readFileSync(path.join(dir, f));
  let s = null;
  if (/\.jpe?g$/i.test(f)) s = jpegSize(buf);
  else s = pngSize(buf);
  if (s) {
    out.push(`${f} ${s.w}x${s.h} ratio=${(s.w / s.h).toFixed(3)} ${s.w > s.h ? 'landscape' : s.w < s.h ? 'portrait' : 'square'}`);
  } else {
    out.push(`${f} UNKNOWN`);
  }
}

fs.writeFileSync('c:/projects/printking/printking/_dimscan.txt', out.join('\r\n') + '\r\n');
out.forEach(l => console.log(l));
