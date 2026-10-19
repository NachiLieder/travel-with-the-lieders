import puppeteer from 'puppeteer-core';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const FFMPEG = path.join(root, 'promo/node_modules/@remotion/compositor-win32-x64-msvc/ffmpeg.exe');
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const url = pathToFileURL(path.join(root, 'demo/index.html')).href + '?capture=1';
const out = process.env.OUT || path.join(root, 'demo/lieder-trips-promo-1080p.mp4');
const music = path.join(root, 'demo/music.mp3');
const segDir = path.join(root, 'scratch_an/seg');
const FPS = 60, WORKERS = parseInt(process.env.WORKERS || '4', 10);
fs.rmSync(segDir, { recursive: true, force: true }); fs.mkdirSync(segDir, { recursive: true });

// find duration once
const b0 = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
const p0 = await b0.newPage(); await p0.setViewport({ width: 1920, height: 1080 });
await p0.goto(url); await new Promise(r => setTimeout(r, 600));
const DUR = await p0.evaluate(() => DUR); await b0.close();
const total = Math.ceil(DUR * FPS);
console.log('duration', DUR.toFixed(2), 'frames', total, 'workers', WORKERS);

let finished = 0;
async function chunk(k, start, count) {
  const seg = path.join(segDir, `seg_${String(k).padStart(2, '0')}.mp4`);
  await new Promise(r => setTimeout(r, k * 6000));
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', timeout: 180000, protocolTimeout: 600000, args: ['--hide-scrollbars', '--force-device-scale-factor=1'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 900));
  const ff = spawn(FFMPEG, ['-y', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', 'pipe:0',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '16', '-pix_fmt', 'yuv420p', '-g', '60', '-r', String(FPS), '-an', seg], { stdio: ['pipe', 'ignore', 'ignore'] });
  const done = new Promise((res, rej) => ff.on('close', c => c === 0 ? res() : rej(new Error('ffmpeg ' + c))));
  for (let i = 0; i < count; i++) {
    await page.evaluate(sec => window.renderAt(sec), (start + i) / FPS);
    const buf = await page.screenshot({ type: 'jpeg', quality: 95 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    finished++;
    if (finished % 300 === 0) console.log(`frames ${finished}/${total}`);
  }
  ff.stdin.end(); await done; await browser.close();
  return seg;
}

const per = Math.ceil(total / WORKERS);
const jobs = [];
for (let k = 0; k < WORKERS; k++) { const s = k * per, c = Math.min(per, total - s); if (c > 0) jobs.push(chunk(k, s, c)); }
const t0 = Date.now();
const segs = await Promise.all(jobs);
console.log('rendered segments in', ((Date.now() - t0) / 1000).toFixed(0) + 's');

const list = path.join(segDir, 'list.txt');
fs.writeFileSync(list, segs.map(s => `file '${s.replace(/\\/g, '/')}'`).join('\n'));
await new Promise((res, rej) => {
  const ff = spawn(FFMPEG, ['-y', '-f', 'concat', '-safe', '0', '-i', list, '-i', music,
    '-filter_complex', `[1:a]atrim=0:${DUR.toFixed(2)},volume='0.6*min(1,t/3)*min(1,max(0,(${DUR.toFixed(2)}-t)/5))':eval=frame[a]`,
    '-map', '0:v', '-map', '[a]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', out], { stdio: 'inherit' });
  ff.on('close', c => c === 0 ? res() : rej(new Error('mux ' + c)));
});
console.log('done', out);
