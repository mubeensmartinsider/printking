const fs = require("fs");
const path = require("path");
const dir = path.join(__dirname, "frontend", "public", "assets");

function jpegSize(buf) {
  let i = 2;
  while (i < buf.length - 8) {
    if (buf[i] !== 0xff) { i++; continue; }
    const marker = buf[i + 1];
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) { i += 2; continue; }
    const len = buf.readUInt16BE(i + 2);
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7) };
    }
    i += 2 + len;
  }
  return null;
}

function pngSize(buf) {
  return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
}

const lines = [];
const files = fs.readdirSync(dir).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort();
for (const f of files) {
  const buf = fs.readFileSync(path.join(dir, f));
  const size = /\.png$/i.test(f) ? pngSize(buf) : jpegSize(buf);
  if (!size) { lines.push(f + " -> UNREADABLE"); continue; }
  const r = size.w / size.h;
  lines.push(`${f} -> ${size.w}x${size.h}  ratio=${r.toFixed(3)}  (${size.w > size.h ? "landscape" : "portrait"})`);
}
fs.writeFileSync(path.join(__dirname, "_dimsZ.txt"), lines.join("\r\n") + "\r\n", "utf8");
console.log(lines.join("\n"));
