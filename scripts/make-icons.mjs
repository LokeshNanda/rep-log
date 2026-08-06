// Dev-only: renders icons/icon.svg to the PNG sizes the manifest needs.
// Run once after changing the SVG: node scripts/make-icons.mjs
// Requires playwright-core (npm i playwright-core) and system Edge.
import { chromium } from 'playwright-core';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const svg = readFileSync(join(root, 'icons', 'icon.svg'), 'utf8');

const browser = await chromium.launch({ channel: 'msedge', headless: true });
for (const size of [192, 512]) {
  const page = await browser.newPage({ viewport: { width: size, height: size } });
  await page.setContent(
    `<body style="margin:0">${svg.replace('<svg ', `<svg width="${size}" height="${size}" `)}</body>`
  );
  await page.screenshot({ path: join(root, 'icons', `icon-${size}.png`) });
  console.log(`icons/icon-${size}.png written`);
  await page.close();
}
await browser.close();
