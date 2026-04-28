// node generate-icons.js
// CIPHER icon: dark noir background with cyan "C" letter
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function crc32(buf) {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
  }
  return (c ^ 0xFFFFFFFF) >>> 0;
}

function u32(n) {
  const b = Buffer.alloc(4);
  b.writeUInt32BE(n >>> 0, 0);
  return b;
}

function chunk(type, data) {
  const t = Buffer.from(type, 'ascii');
  const d = Buffer.isBuffer(data) ? data : Buffer.from(data);
  const crc = crc32(Buffer.concat([t, d]));
  return Buffer.concat([u32(d.length), t, d, u32(crc)]);
}

// CIPHER "C" shape — open ring, gap on the right
function isInC(lx, ly, rOuter, rInner, gapAngle) {
  const dist = Math.sqrt(lx*lx + ly*ly);
  if (dist < rInner || dist > rOuter) return false;
  // angle from -PI..PI; right side is angle near 0
  const a = Math.atan2(ly, lx);
  // gap on right (open C): gap = ±gapAngle around 0
  if (Math.abs(a) < gapAngle) return false;
  return true;
}

function makePNG(size) {
  const sig = Buffer.from([137,80,78,71,13,10,26,10]);

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;
  ihdr[9] = 2;
  ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;

  const cx = size / 2, cy = size / 2;
  const bgRadius = size * 0.50; // full square — maskable safe zone is inner 80%
  const ringOuter = size * 0.36;
  const ringInner = size * 0.24;
  const gapAngle = Math.PI * 0.18; // ~32° opening on right

  const rows = [];
  for (let y = 0; y < size; y++) {
    const row = Buffer.alloc(1 + size * 3);
    row[0] = 0;
    for (let x = 0; x < size; x++) {
      const dx = x - cx, dy = y - cy;
      const dist = Math.sqrt(dx*dx + dy*dy);

      // Default: dark noir background (full square for maskable)
      let R = 8, G = 8, B = 18;

      // Subtle radial gradient on background
      const t = Math.min(1, dist / (size * 0.6));
      R = Math.round(8 + t * 4);
      G = Math.round(8 + t * 6);
      B = Math.round(18 + t * 12);

      // Cyan "C" ring
      if (isInC(dx, dy, ringOuter, ringInner, gapAngle)) {
        // Cyan glow with depth
        const ringT = (dist - ringInner) / (ringOuter - ringInner);
        R = Math.round(0 + ringT * 40);
        G = Math.round(212 - ringT * 60);
        B = Math.round(255 - ringT * 30);
      }

      // Tiny inner cyan dot — "the cipher seed"
      if (dist < size * 0.04) {
        R = 0; G = 212; B = 255;
      }

      row[1 + x*3]     = R;
      row[1 + x*3 + 1] = G;
      row[1 + x*3 + 2] = B;
    }
    rows.push(row);
  }

  const raw = Buffer.concat(rows);
  const deflated = zlib.deflateSync(raw, { level: 6 });

  const idat = chunk('IDAT', deflated);
  const iend = chunk('IEND', Buffer.alloc(0));

  return Buffer.concat([sig, chunk('IHDR', ihdr), idat, iend]);
}

const pub = path.join(__dirname, 'public');
fs.writeFileSync(path.join(pub, 'icon-192.png'), makePNG(192));
fs.writeFileSync(path.join(pub, 'icon-512.png'), makePNG(512));
console.log('✓ CIPHER icons generated (192, 512)');
