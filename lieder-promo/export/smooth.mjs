import puppeteer from 'puppeteer-core';
import path from 'node:path'; import { fileURLToPath, pathToFileURL } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const b = await puppeteer.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:'new' });
const pg = await b.newPage(); await pg.setViewport({width:1920,height:1080});
const errs=[]; pg.on('pageerror',e=>errs.push(String(e))); pg.on('console',m=>{ if(m.type()==='error') errs.push(m.text()); });
await pg.goto(pathToFileURL(path.join(root,'demo/index.html')).href+'?capture=1'); await new Promise(r=>setTimeout(r,600));
const r = await pg.evaluate(()=>{
  const fps=60, n=Math.floor(DUR*fps), tau=i=>i/fps/K;
  const sx=[],ss=[],sy=[];
  for(let i=0;i<n;i++){ const c=camAt(tau(i)); sx.push(c.x); ss.push(c.s); sy.push(c.y); }
  const jerk=a=>{ let m=0,at=0; for(let i=2;i<a.length;i++){ const v=Math.abs(a[i]-2*a[i-1]+a[i-2]); if(v>m){m=v;at=i;} } return [m,at/fps]; };
  const vel=a=>{ let m=0; for(let i=1;i<a.length;i++) m=Math.max(m,Math.abs(a[i]-a[i-1])); return m; };
  // 2nd-difference of velocity (jerk-ish) — spikes show velocity discontinuities
  const acc=a=>{ const o=[]; for(let i=2;i<a.length;i++) o.push(a[i]-2*a[i-1]+a[i-2]); return o; };
  const jumpiness=a=>{ const ac=acc(a); let m=0; for(let i=1;i<ac.length;i++) m=Math.max(m,Math.abs(ac[i]-ac[i-1])); return m; };
  return { DUR, frames:n, maxVelX:vel(sx), maxAccX:jerk(sx), maxJerkX:jumpiness(sx), maxAccS:jerk(ss), maxJerkS:jumpiness(ss), maxVelS:vel(ss) };
});
console.log(JSON.stringify(r)); console.log('errors:',errs.length?errs:'none'); await b.close();
