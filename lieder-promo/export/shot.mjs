import puppeteer from 'puppeteer-core';
import path from 'node:path'; import { fileURLToPath, pathToFileURL } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const b = await puppeteer.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:'new' });
const pg = await b.newPage(); await pg.setViewport({width:1920,height:1080});
await pg.goto(pathToFileURL(path.join(root,'demo/index.html')).href+'?capture=1'); await new Promise(r=>setTimeout(r,800));
const spec = process.argv.slice(2);
const info = await pg.evaluate(()=>({DUR, content:S_.content.a*K, exp:S_.exp.a*K, form:S_.form.a*K, zoom:ZOOM0*K}));
console.log(JSON.stringify(info));
for (const a of spec){ let sec=a.includes('c+')? info.content+parseFloat(a.split('+')[1])*2 : a.includes('e+')? info.exp+parseFloat(a.split('+')[1])*2 : parseFloat(a);
  await pg.evaluate(s=>window.renderAt(s), sec); await pg.screenshot({path:path.join(root,'shots',`s_${a.replace('+','p')}.png`)}); }
await b.close();
