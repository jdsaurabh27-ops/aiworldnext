import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { render } from '../.prerender/entry-server.js';

const path = 'dist/index.html';
const template = readFileSync(path, 'utf8');
const root = '<div id="root"></div>';
if (!template.includes(root)) throw new Error('Expected one empty homepage root');
const html = await render();
for (const required of ['<h1', '/guides/', '/tools/', 'id="news"', 'id="community"', 'id="newsletter"']) {
  if (!html.includes(required)) throw new Error('Incomplete homepage prerender: ' + required);
}
writeFileSync(path, template.replace(root, () => `<div id="root">${html}</div>`));
rmSync('.prerender', { recursive: true, force: true });
console.log('Prerendered homepage with full content and crawlable links.');
