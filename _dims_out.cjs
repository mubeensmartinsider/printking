/* One-shot: read real pixel dimensions of every photo in public/assets */
const fs = require("fs");
const path = require("path");

const dir = "c:/projects/printking/printking/frontend/public/assets/";

function jpegSize(buf) {
  let i = 2;
  while (i < buf.length - 9) {
    if (buf[i] !== 0xff) { i++; continue; }
    const marker = buf[i + 1];
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) { i += 2; continue; }
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7) };
    }
    const len = buf.readUInt16BE(i + 2);
    i += 2 + len;
  }
  return null;
}

function pngSize(buf) {
  if (buf.slice(0, 8).toString("hex") !== "89504e470d0a1a0a") return null;
  return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
}

let out = "";
for (const f of fs.readdirSync(dir)) {
  if (!/\.(jpe?g|png)$/i.test(f)) continue;
  const buf = fs.readFileSync(path.join(dir, f));
  const d = /\.png$/i.test(f) ? pngSize(buf) : jpegSize(buf);
  out += d
    ? `${f}  ${d.w}x${d.h}  ratio=${(d.w / d.h).toFixed(3)}  ${Math.round(buf.length / 1024)}KB\n`
    : `${f}  unknown  ${Math.round(buf.length / 1024)}KB\n`;
}
fs.writeFileSync("c:/projects/printking/printking/_dims_out.txt", out);
console.log(out);
