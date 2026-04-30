/**
 * Generates public/favicon.svg by extracting the 'm' glyph from Gasoek One
 * and converting it to an SVG path. Run once with: node scripts/gen-favicon.mjs
 */
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import opentype from 'opentype.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

function download(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function getFontUrl() {
  // Ask Google Fonts CSS API for the TTF-compatible URL
  return new Promise((resolve, reject) => {
    const req = https.get(
      'https://fonts.googleapis.com/css2?family=Gasoek+One',
      { headers: { 'User-Agent': 'Mozilla/5.0' } },
      (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => {
          const match = data.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.ttf)\)/);
          if (match) return resolve(match[1]);
          // fallback: woff2 — opentype.js needs TTF/OTF, try alternate UA
          reject(new Error('Could not find TTF URL in Google Fonts response:\n' + data.slice(0, 500)));
        });
      }
    );
    req.on('error', reject);
  });
}

async function main() {
  console.log('Fetching Gasoek One font URL…');
  const fontUrl = await getFontUrl().catch(() => null);

  let fontBuffer;
  if (fontUrl) {
    console.log('Downloading font from', fontUrl);
    fontBuffer = await download(fontUrl);
  } else {
    // Google Fonts CSS API returned woff2 for this UA — use the static gstatic URL format
    const staticUrl = 'https://fonts.gstatic.com/s/gasoekone/v14/8Xr-KJixZDZdvs7hYA7RUgAAAA.ttf';
    console.log('Falling back to static URL:', staticUrl);
    fontBuffer = await download(staticUrl);
  }

  const font = opentype.parse(fontBuffer.buffer);
  const GLYPH = 'm';
  const FONT_SIZE = 1000; // large size for precision
  const PAD = 0;          // no padding — fill fully

  // First pass: measure tight bounding box
  const measured = font.getPath(GLYPH, 0, 0, FONT_SIZE);
  const bb = measured.getBoundingBox();
  const glyphW = bb.x2 - bb.x1;
  const glyphH = bb.y2 - bb.y1;

  // Render so top-left of glyph is at (PAD, PAD)
  // opentype y arg is the baseline, so baseline = PAD + glyphH - bb.y1 offset
  const renderX = PAD - bb.x1;
  const renderY = PAD + glyphH + (-bb.y1 - glyphH); // = PAD - bb.y1 ... wait:
  // bb.y1 is the topmost y (most negative in opentype coords where y grows down for glyphs above baseline)
  // After rendering with y=0, glyph top is at bb.y1, bottom at bb.y2
  // We want glyph top at PAD → shift by (PAD - bb.y1)
  // opentype getPath(glyph, x, y) sets baseline y; glyph coords are relative to baseline
  // So to shift glyph up/down by delta: new_y = 0 + delta = PAD - bb.y1
  const finalPath = font.getPath(GLYPH, renderX, PAD - bb.y1, FONT_SIZE);
  const d = finalPath.toPathData(2);

  const vbW = (glyphW + PAD * 2).toFixed(2);
  const vbH = (glyphH + PAD * 2).toFixed(2);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vbW} ${vbH}">
  <style>
    path { fill: #393939; }
    @media (prefers-color-scheme: dark) {
      path { fill: #93a1a1; }
    }
  </style>
  <path d="${d}"/>
</svg>`;

  const out = path.join(ROOT, 'public', 'favicon.svg');
  fs.writeFileSync(out, svg, 'utf8');
  console.log('Written to', out);
}

main().catch((e) => { console.error(e); process.exit(1); });
