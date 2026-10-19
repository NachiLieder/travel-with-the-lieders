import puppeteer from 'puppeteer-core';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const FFMPEG = path.join(root, 'promo/node_modules/@remotion/compositor-win32-x64-msvc/ffmpeg.exe');
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const page_url = pathToFileURL(path.join(root, 'demo/index.html')).href + '?capture=1';
const out = process.env.OUT || path.join(root, 'demo/lieder-trips-promo-1080p.mp4');
const START = process.env.START ? parseInt(process.env.START, 10) : 0;
const music = path.join(root, 'demo/music.mp3');
const FPS = 60;
const LIMIT = process.env.FRAMES ? parseInt(process.env.FRAMES, 10) : 0;

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--hide-scrollbars', '--force-device-scale-factor=1'] });
const page = await browser.newPage();
await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
await page.goto(page_url, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 800));
const DUR = await page.evaluate(() => DUR);
const total = LIMIT || Math.ceil(DUR * FPS);
console.log('duration', DUR.toFixed(2), 's, frames', total);

const fadeOutStart = (DUR - 5).toFixed(2);
const args = ['-y', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', 'pipe:0',
  '-i', music,
  '-filter_complex', `[1:a]atrim=0:${DUR.toFixed(2)},volume='0.6*min(1,t/3)*min(1,max(0,(${DUR.toFixed(2)}-t)/5))':eval=frame[a]`,
  '-map', '0:v', '-map', '[a]', '-c:v', 'libx264', '-preset', 'medium', '-crf', '16', '-pix_fmt', 'yuv420p',
  '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', out];
const ff = spawn(FFMPEG, args, { stdio: ['pipe', 'inherit', 'inherit'] });
const done = new Promise((res, rej) => { ff.on('close', c => c === 0 ? res() : rej(new Error('ffmpeg exit ' + c))); });

const t0 = Date.now();
for (let i = 0; i < total; i++) {
  await page.evaluate(sec => window.renderAt(sec), (START + i) / FPS);
  const buf = await page.screenshot({ type: 'jpeg', quality: 94 });
  if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
  if (i % 150 === 0) console.log(`frame ${i}/${total}  ${((Date.now() - t0) / 1000).toFixed(0)}s`);
}
ff.stdin.end();
await done;
await browser.close();
console.log('done', out, ((Date.now() - t0) / 1000).toFixed(0) + 's');
