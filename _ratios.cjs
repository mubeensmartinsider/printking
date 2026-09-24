// One-shot: report real pixel dimensions + aspect ratio of the machinery photos.
const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "frontend", "public", "assets");

function jpegSize(buf) {
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xff) { i++; continue; }
    const marker = buf[i + 1];
    // SOF0..SOF15, excluding DHT (C4), JPG (C8), DAC (CC)
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7) };
    }
    if (marker === 0xd8 || (marker >= 0xd0 && marker <= 0xd9)) { i += 2; continue; }
    i += 2 + buf.readUInt16BE(i + 2);
  }
  return null;
}

function pngSize(buf) {
  return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
}

const lines = [];
for (const f of fs.readdirSync(dir)) {
  const buf = fs.readFileSync(path.join(dir, f));
  let dims = null;
  if (f.toLowerCase().endsWith(".png")) dims = pngSize(buf);
  else dims = jpegSize(buf);
  if (!dims) { lines.push(`${f}: unknown`); continue; }
  lines.push(`${f}: ${dims.w}x${dims.h}  ratio=${(dims.w / dims.h).toFixed(3)}`);
}
fs.writeFileSync(path.join(__dirname, "_RATIOS.txt"), lines.join("\n") + "\n");
console.log(lines.join("\n"));
