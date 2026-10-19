/* ---------- replica screens (native pixel sizes, from the real app) ---------- */
const glass = 'background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.22);';
const sunsetImg = '<div style="position:absolute;inset:0;background:linear-gradient(180deg,#5b4a9a 0%,#e0735a 55%,#f2a95a 70%,#2a1a3a 71%,#1a1030 100%)"></div>';
const hdr = (title,sub,w,btnL)=>`
  <div style="position:absolute;left:0;top:0;width:${w}px;height:72px;background:rgba(14,8,48,.65);border-bottom:1px solid rgba(255,255,255,.12)"></div>
  <div style="position:absolute;right:${w>700?118:112}px;top:12px;font-size:24px;font-weight:800">${title}</div>
  <div style="position:absolute;right:${w>700?118:112}px;top:44px;font-size:13px;color:#cfc9ee">${sub}</div>
  <div style="position:absolute;right:${w>700?72:62}px;top:12px;width:44px;height:44px;border-radius:14px;background:#8e7cf5;display:grid;place-items:center;font-size:18px">⇌</div>
  <div style="position:absolute;right:${w>700?14:8}px;top:10px;width:46px;height:46px;border-radius:14px;${glass}display:grid;place-items:center;font-size:20px">›</div>
  ${btnL?`<div style="position:absolute;left:82px;top:12px;width:46px;height:46px;border-radius:14px;background:#f4786a;display:grid;place-items:center;font-size:30px;font-weight:300">+</div>`:''}`;

function replicaHome(){
  const chips=['כל הטיול','1 בנקוק','2 קראבי','3 קאו לאק','4 פוקט','5 צ׳אנג מאי'];
  return `
  <div style="position:absolute;left:0;top:0;width:665px;height:590px;border-radius:0 0 54px 54px;overflow:hidden;background:linear-gradient(180deg,#8d8fd8 0%,#7a86c4 12%,#2f5a2c 28%,#1d4a22 52%,#0f5d63 66%,#0c3d52 100%)">
    <svg width="665" height="590" style="position:absolute;inset:0">
      <path d="M0 0H190L150 200L190 330L110 430L0 450Z" fill="#183a1a"/>
      <path d="M0 40 L170 0 L220 70 L330 280 L250 430 L0 460Z" fill="#2c6b27" opacity=".9"/>
      <path d="M290 150 L390 85 L520 95 L610 200 L600 430 L290 430Z" fill="#27591f"/>
      <path d="M300 210 L420 110 L560 130 L600 300 L460 420 L300 430Z" fill="#3a8a2e" opacity=".85"/>
      <path d="M560 140 L665 110 L665 430 L600 430Z" fill="#1c3b1c"/>
      <rect y="430" width="665" height="160" fill="#106372"/>
      <ellipse cx="190" cy="475" rx="22" ry="8" fill="#2b2216"/>
    </svg>
    <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(14,8,48,0) 40%,rgba(14,8,48,.78) 100%)"></div>
    <div style="position:absolute;left:80px;top:12px;width:46px;height:46px;border-radius:14px;${glass}display:grid;place-items:center;font-size:22px">⚙</div>
    <div style="position:absolute;right:8px;top:28px;padding:8px 18px;${glass}font-weight:800;font-size:17px;background:rgba(30,20,90,.5)">עוד <span id="cnt">49</span> ימים</div>
    <div style="position:absolute;right:10px;top:296px;font-size:15px;font-weight:700">הבא: בנקוק</div>
    <div style="position:absolute;right:10px;top:318px;font:800 118px/1 Impact,'Arial Narrow',sans-serif;letter-spacing:2px">הטיול שלנו</div>
    <div style="position:absolute;right:10px;top:442px;display:flex;gap:12px;direction:rtl">
      <span style="padding:8px 18px;border-radius:999px;background:rgba(30,20,90,.7);border:1px solid rgba(255,255,255,.25);font-weight:700;font-size:15px;direction:ltr">07.12 – 04.03</span>
      <span style="padding:8px 18px;border-radius:999px;background:rgba(30,20,90,.7);border:1px solid rgba(255,255,255,.25);font-weight:700;font-size:15px">3 לילות</span></div>
    <div style="position:absolute;right:8px;top:520px;display:flex;gap:12px;direction:rtl;width:2000px">
      ${chips.map(c=>`<span class="chip" style="flex:none;padding:0 22px;height:48px;display:flex;align-items:center;border-radius:999px;font-weight:800;font-size:17px;background:rgba(80,70,150,.7);border:1px solid rgba(255,255,255,.25)">${c}</span>`).join('')}</div>
  </div>
  <div style="position:absolute;left:23px;top:612px;width:623px;height:195px;border-radius:32px;${glass}background:rgba(90,70,190,.55)">
    <div style="position:absolute;right:26px;top:22px;font-size:25px;font-weight:800">היום</div>
    <div style="position:absolute;left:18px;top:30px;font-size:14px;font-weight:700">יום שני, 19.10</div>
    <div style="position:absolute;left:0;right:0;top:86px;text-align:center;font-size:15px;color:#d8d3f5">אין עדיין תוכנית להיום.</div>
    <div id="s1btn" style="position:absolute;left:18px;right:18px;top:145px;height:48px;border-radius:24px;background:#f4786a;color:#1b1040;display:grid;place-items:center;font-weight:800;font-size:16px">הוסיפו פעילות להיום</div>
  </div>`;
}

function replicaDash(){
  const acts=[['יומן','📅'],['לפני הטיול','🧳'],['מספרים','📞'],['אטרקציות','☆'],['הטיולים שלי','💼']];
  return `
  <div style="position:absolute;left:22px;top:8px;width:640px;height:300px;border-radius:40px;${glass}background:rgba(80,60,170,.45)">
    <div style="position:absolute;right:22px;top:22px;font-size:15px;font-weight:700">הוצאות עד כה</div>
    <div id="curTog" style="position:absolute;left:22px;top:26px;width:148px;height:44px;border-radius:22px;background:rgba(14,8,48,.45);display:flex;direction:rtl;padding:4px;gap:4px">
      ${['₪','฿','$'].map(c=>`<span class="cur" style="flex:1;border-radius:18px;display:grid;place-items:center;font-weight:800;font-size:17px">${c}</span>`).join('')}</div>
    <div style="position:absolute;right:22px;top:50px;font:800 64px/1 Impact,'Arial Narrow',sans-serif;direction:ltr"><span id="curSym">₪</span>0</div>
    <div style="position:absolute;right:22px;top:122px;font-size:14px;font-weight:700">גררו על הגרף לפי יום</div>
    <div id="chart" style="position:absolute;left:18px;top:146px;width:600px;height:124px;overflow:hidden">
      <div id="chartclip" style="position:absolute;left:0;top:0;height:130px;width:100%;overflow:hidden">
        <div style="position:absolute;left:0;top:62px;width:600px;height:60px;background:linear-gradient(180deg,#e0689a 0%,#8a4fc0 45%,#2f2a7a 100%);opacity:.9"></div>
        <div style="position:absolute;left:0;top:60px;width:600px;height:5px;border-radius:3px;background:#fff;box-shadow:0 0 18px #fff"></div>
      </div>
      <div style="position:absolute;right:0;top:0;height:130px;border-right:3px dotted rgba(255,255,255,.7)"></div>
      <div style="position:absolute;right:-9px;top:52px;width:22px;height:18px;border-radius:50%;background:#fff"></div>
    </div>
    <div style="position:absolute;left:20px;top:268px;font-size:13px;font-weight:800">06.12</div>
    <div style="position:absolute;right:20px;top:268px;font-size:13px;font-weight:800">06.12</div>
  </div>
  <div style="position:absolute;left:22px;top:322px;width:640px;height:376px;border-radius:36px;${glass}background:rgba(80,60,170,.42)">
    <div style="position:absolute;right:22px;top:16px;font-size:24px;font-weight:800">המסלול</div>
    <div style="position:absolute;left:20px;top:24px;font-size:14px;font-weight:700;color:#cfc3ff">למפה המלאה ‹</div>
    <div style="position:absolute;left:20px;top:56px;width:600px;height:300px;border-radius:26px;overflow:hidden;background:#232326;border:1px solid rgba(255,255,255,.25)">
      <svg width="600" height="300" style="position:absolute;inset:0">
        <path d="M0 0H150C170 40 150 90 190 120 230 160 250 200 300 230 340 250 380 270 420 300H0Z" fill="#2c2c2f"/>
        <path d="M150 0H600V300H420C400 250 350 230 300 200 270 150 230 90 190 50Z" fill="#3d3d40"/>
        <path d="M300 0 L330 80 L420 120 L480 60 L520 0" stroke="#585858" stroke-width="1.5" fill="none"/>
        <line id="dashLine" x1="105" y1="92" x2="492" y2="172" stroke="#f4786a" stroke-width="6" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/>
      </svg>
      <div class="map-lbl" style="left:380px;top:196px;letter-spacing:2px">TRANG</div>
      <div class="map-lbl" style="left:526px;top:180px;letter-spacing:2px">PHATTHAL</div>
      <div class="mpin" id="dpin2" style="left:87px;top:56px">2</div>
      <div class="mpin" id="dpin3" style="left:475px;top:136px">3</div>
      <div class="map-lbl" style="left:52px;top:124px;color:#fff;font-weight:800;font-size:13px;text-shadow:0 0 4px #000">קראבי</div>
      <div class="map-lbl" style="left:426px;top:204px;color:#fff;font-weight:800;font-size:13px;text-shadow:0 0 4px #000">קאו לאק</div>
    </div>
  </div>
  <div style="position:absolute;left:14px;top:714px;width:680px;display:flex;gap:10px;direction:rtl">
    ${acts.map(a=>`<span style="flex:none;height:48px;padding:0 20px;border-radius:999px;display:flex;align-items:center;gap:8px;${glass}background:rgba(120,90,200,.45);font-weight:800;font-size:15px">${a[1]} ${a[0]}</span>`).join('')}</div>
  <div id="addBtn" style="position:absolute;left:22px;top:780px;width:640px;height:66px;border-radius:33px;background:#f4786a;color:#1b1040;display:grid;place-items:center;font-weight:800;font-size:20px;box-shadow:0 12px 30px rgba(0,0,0,.3)">מה מוסיפים לטיול? &nbsp;＋</div>`;
}

function replicaRoute(){
  const cards=[
    {y:78,h:189,n:'קראבי',s:'דרום, תאילנד',d:'11 בדצמבר – 18 בדצמבר',l:'7 לילות',b:'כל מה שיש בקראבי'},
    {y:280,h:217,n:'קאו לאק',s:'דרום, תאילנד',d:'18 בדצמבר – 23 בדצמבר',l:'5 לילות',b:'כל מה שיש בקאו לאק',hotel:'Avani resort'},
    {y:510,h:188,n:'פוקט',s:'דרום, תאילנד',d:'23 בדצמבר – 28 בדצמבר',l:'5 לילות',b:'כל מה שיש בפוקט'},
    {y:712,h:190,n:'צ׳אנג מאי',s:'צפון, תאילנד',d:'28 בדצמבר – 2 בינואר',l:'66 לילות',b:'כל מה שיש בצ׳אנג מאי'}];
  return hdr('מסלול הטיול','6 יעדים · 103 לילות',679,true)+`
  <div style="position:absolute;right:11px;top:75px;bottom:0;width:0;border-right:2px dashed rgba(255,255,255,.3)"></div>
  ${cards.map(c=>`
   <div class="tcard" style="position:absolute;left:28px;top:${c.y}px;width:602px;height:${c.h}px;border-radius:30px;${glass}background:rgba(60,45,150,.5)">
     <div style="position:absolute;right:16px;top:16px;width:56px;height:56px;border-radius:14px;overflow:hidden;border:1px solid #fff">${sunsetImg}</div>
     <div style="position:absolute;right:82px;top:18px;font-size:19px;font-weight:800">${c.n}</div>
     <div style="position:absolute;right:82px;top:44px;font-size:13px;color:#c5bfe8">${c.s}</div>
     <div style="position:absolute;left:24px;top:22px;width:16px;height:16px"><svg viewBox="0 0 24 24" width="16" height="16" style="stroke:#cfc7ff;fill:none;stroke-width:2">${ICON.pencil}</svg></div>
     <div style="position:absolute;right:16px;top:82px;display:flex;gap:10px;direction:rtl">
       <span style="padding:0 14px;height:30px;display:flex;align-items:center;border-radius:10px;background:#1f1648;font-weight:700;font-size:13px">📅 ${c.d}</span>
       <span style="padding:0 14px;height:30px;display:flex;align-items:center;border-radius:10px;background:#2c2162;font-weight:700;font-size:13px">${c.l}</span></div>
     ${c.hotel?`<div style="position:absolute;right:16px;top:124px;font-size:12px;color:#aeb4ff;direction:ltr">✈ ${c.hotel}</div>`:''}
     <div style="position:absolute;left:16px;right:16px;top:${c.h-64}px;height:46px;border-radius:14px;background:#f4786a;color:#1b1040;display:grid;place-items:center;font-weight:800;font-size:15px">☆ ${c.b}</div>
   </div>
   <div style="position:absolute;left:652px;top:${c.y+22}px;width:20px;height:20px;border-radius:50%;background:#f4786a;border:4px solid #1a1040;box-sizing:content-box;margin:-4px"></div>`).join('')}`;
}

function replicaMap(){
  const chips=[['לינות',1,'#2fa58c'],['אטרקציות',0,'#f08a5d'],['אוכל',0,'#e26a9a'],['רפואה',0,'#d93a3a'],['תחבורה',0,'#7e86f0'],['יעדים',0,'#8b5cf6']];
  return hdr('המפה','3 מקומות מסומנים',766,false)+`
  <div style="position:absolute;left:0;top:85px;width:900px;display:flex;gap:12px;direction:rtl;padding-right:66px">
   ${chips.map(c=>`<span style="flex:none;height:36px;padding:0 16px;display:flex;align-items:center;gap:8px;border-radius:999px;background:${c[2]};font-weight:800;font-size:14px"><i style="font-style:normal;background:rgba(0,0,0,.25);border-radius:999px;padding:1px 8px;font-size:12px">${c[1]}</i>${c[0]}</span>`).join('')}</div>
  <div style="position:absolute;left:60px;top:137px;width:640px;height:678px;border-radius:30px;overflow:hidden;background:#232326;border:1px solid rgba(255,255,255,.25)">
    <svg width="640" height="678" viewBox="0 0 640 678" style="position:absolute;inset:0">
      <path d="M200 0H330C340 60 360 100 330 150 340 190 330 230 350 270 350 330 360 370 380 400 390 450 330 480 300 520 280 570 250 640 220 678H0V0Z" fill="#2a2a2d"/>
      <path d="M330 0H640V420L560 380 520 300 470 190 410 130 380 90Z" fill="#37373a"/>
      <path d="M300 560 L330 520 L390 470 L470 500 L480 560 L560 620 L640 640 L640 678 L360 678 L290 640Z" fill="#37373a"/>
      <path d="M340 170 C400 120 470 130 520 150" stroke="#555" stroke-width="2" fill="none"/>
    </svg>
    <div class="map-lbl" style="left:372px;top:6px;letter-spacing:3px;font-size:13px">THAILAND</div>
    <div class="map-lbl" style="left:480px;top:156px;letter-spacing:2px;font-size:12px">CAMBODIA</div>
    <div class="map-lbl" style="left:80px;top:226px;font-style:italic">Andaman Sea</div>
    <div class="map-lbl" style="left:385px;top:296px;font-style:italic;text-align:center">Gulf of<br>Thailand</div>
    <div class="map-lbl" style="left:420px;top:560px;letter-spacing:2px;font-size:12px">MALAYSIA</div>
    <svg width="640" height="678" style="position:absolute;inset:0;overflow:visible"><line id="mapLine" x1="272" y1="378" x2="316" y2="388" stroke="#f4786a" stroke-width="4" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/></svg>
    <div class="mpin" id="pin1" style="left:345px;top:70px;background:#2fa58c">🛏</div>
    <div class="mpin" id="pin2" style="left:248px;top:352px">2</div>
    <div class="mpin" id="pin3" style="left:296px;top:362px">3</div>
    <div class="map-lbl" id="lb2" style="left:218px;top:408px;color:#fff;font-weight:800;font-size:13px;text-shadow:0 0 4px #000">קראבי</div>
    <div class="map-lbl" id="lb3" style="left:255px;top:424px;color:#fff;font-weight:800;font-size:13px;text-shadow:0 0 4px #000">קאו לאק</div>
  </div>`;
}

function replicaForm(){
  const lab=(y,t)=>`<div style="position:absolute;right:24px;top:${y}px;font-size:15px;font-weight:800">${t}</div>`;
  const inp=(y,h,txt,r,w,id)=>`<div style="position:absolute;right:${r}px;top:${y}px;width:${w}px;height:${h}px;border-radius:18px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.22);padding:0 18px;display:flex;align-items:center;font-size:16px;color:#8d87b8">${txt}</div>`;
  const sel=(y,r,w,txt,col='#fff')=>`<div style="position:absolute;right:${r}px;top:${y}px;width:${w}px;height:50px;border-radius:18px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.22);display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;color:${col}">${txt}<span style="position:absolute;left:14px;font-size:11px;color:#cfc9ee">⌄</span></div>`;
  const hint=(y,t)=>`<div style="position:absolute;right:24px;top:${y}px;font-size:11px;color:#a9a3d0">${t}</div>`;
  const tog=(y,t,id,on)=>`<div style="position:absolute;right:24px;top:${y}px;width:479px;height:50px;border-radius:16px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.2);display:flex;align-items:center;padding:0 18px;font-weight:700;font-size:16px">${t}
    <div id="${id}" class="tgl" style="position:absolute;left:14px;top:9px;width:48px;height:30px;border-radius:15px;background:${on?'#9a82ff':'#4a3d8f'}"><i style="position:absolute;top:3px;${on?'left:3px':'left:21px'};width:24px;height:24px;border-radius:50%;background:#fff"></i></div></div>`;
  return `
  <div id="fscroll" style="position:absolute;left:0;top:70px;width:527px;height:1590px">
    ${lab(14,'שם המקום *')}
    <div style="position:absolute;right:24px;top:40px;width:479px;height:50px;border-radius:18px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.22);padding:0 18px;display:flex;align-items:center;font-size:17px"><span id="ftype" style="color:#8d87b8">למשל: מפלי ארסה</span><span id="fcaret" style="width:2px;height:22px;background:#fff;margin-right:2px"></span></div>
    ${lab(118,'סוג')}<div style="position:absolute;right:270px;top:118px;font-size:15px;font-weight:800">סטטוס</div>
    ${sel(146,24,225,'🌟 אטרקציות')}${sel(146,263,240,'רעיון')}
    ${lab(222,'משויך ליעד')}${sel(250,24,479,'— ללא שיוך —','#d7d2f2')}${hint(306,'המקום יופיע בדף היעד הזה, יחד עם הלינה והפעילויות.')}
    ${lab(336,'קטגוריה')}${sel(364,24,479,'— בחרו קטגוריה —','#d7d2f2')}${hint(420,'בוחרים מהרשימה כדי שאפשר יהיה לסנן אחר כך. «אחר» פותח שדה חופשי.')}
    ${lab(454,'תיאור קצר')}${inp(482,88,'',24,479)}
    ${lab(590,'מיקום על המפה')}
    <div style="position:absolute;right:24px;top:618px;width:380px;height:50px;border-radius:18px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.22);padding:0 18px;display:flex;align-items:center;font-size:15px;color:#8d87b8">חיפוש כתובת או שם מקום…</div>
    <div style="position:absolute;left:22px;top:612px;width:52px;height:52px;border-radius:16px;background:#f4786a;display:grid;place-items:center;font-size:20px;color:#1b1040">🔍</div>
    <div style="position:absolute;right:24px;top:678px;display:flex;gap:10px;direction:rtl">
      <span style="height:36px;padding:0 16px;display:flex;align-items:center;border-radius:12px;background:rgba(50,40,130,.8);border:1px solid rgba(255,255,255,.3);font-weight:800;font-size:13px">🗺 סימון על המפה</span>
      <span style="height:36px;padding:0 16px;display:flex;align-items:center;border-radius:12px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.2);font-weight:700;font-size:13px;color:#cfc9ee">➤ טרם נקבע מיקום</span></div>
    ${inp(726,50,'כתובת (טקסט חופשי)',24,479)}
    ${lab(806,'מחיר משוער')}<div style="position:absolute;right:372px;top:806px;font-size:15px;font-weight:800">מטבע</div>
    ${inp(834,50,'0',24,330)}${sel(834,364,139,'THB')}
    ${lab(912,'משך הביקור (דקות)')}<div style="position:absolute;right:270px;top:912px;font-size:15px;font-weight:800">גילאים מתאימים</div>
    ${inp(940,50,'0',263,240).replace('right:263px','right:24px').replace('width:240px','width:225px')}<div style="position:absolute;right:263px;top:940px;width:240px;height:50px;border-radius:18px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.18);display:flex;align-items:center;justify-content:flex-start;padding:0 18px;font-size:15px;color:#8d87b8;direction:ltr">+3</div>
    ${tog(1018,'מתאים לילדים','tg1',true)}${tog(1078,'מתאים לתינוק','tg2',false)}${tog(1138,'נדרש רכב כדי להגיע','tg3',false)}
    ${lab(1216,'קישור ראשי')}${inp(1242,50,'',24,479)}${hint(1298,'האתר הרשמי או דף המידע העיקרי.')}
    ${lab(1328,'קישורים נוספים')}
    <div style="position:absolute;right:24px;top:1354px;width:479px;height:50px;border-radius:18px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.22);display:grid;place-items:center;font-weight:800;font-size:16px">הוספת קישור &nbsp;＋</div>
    ${lab(1434,'תמונות')}
    <div style="position:absolute;right:24px;top:1462px;width:96px;height:96px;border:2px dashed #9a82ff;border-radius:20px;display:grid;place-items:center;font-size:30px;color:#cfc3ff">＋</div>
  </div>
  <div style="position:absolute;left:0;top:0;width:527px;height:70px;background:#150b42;border-bottom:1px solid rgba(255,255,255,.12);z-index:2"></div>
  <div style="position:absolute;right:26px;top:20px;font-size:22px;font-weight:800;z-index:3">מקום חדש</div>
  <div style="position:absolute;left:26px;top:16px;font-size:26px;color:#cfc3ff;z-index:3">✕</div>
  <div style="position:absolute;left:0;top:781px;width:527px;height:62px;background:#150b42;border-top:1px solid rgba(255,255,255,.14);z-index:2"></div>
  <div id="fsave" style="position:absolute;left:14px;top:790px;width:499px;height:46px;border-radius:23px;background:rgba(244,120,106,.5);display:grid;place-items:center;font-weight:800;font-size:17px;color:#2b1a3a;z-index:3">שמירה</div>`;
}

function replicaExp(){
  return hdr('הוצאות','1 רשומות · סה״כ ₪<span id="tot2">14,714.14</span>',705,true)+`
  <div style="position:absolute;left:30px;top:88px;width:640px;height:57px;border-radius:16px;${glass}background:rgba(20,12,70,.7);display:flex;direction:rtl;padding:5px;gap:6px">
    <span style="flex:1;border-radius:12px;background:#9a82ff;display:grid;place-items:center;font-weight:800;font-size:15px">הכל</span>
    <span style="flex:1;display:grid;place-items:center;font-weight:800;font-size:15px;color:#cfc9ee">חודש אחרון</span>
    <span style="flex:1;display:grid;place-items:center;font-weight:800;font-size:15px;color:#cfc9ee">שבוע אחרון</span></div>
  <div id="conv" style="position:absolute;left:30px;top:153px;width:640px;height:47px;border-radius:16px;background:#8e7cf5;display:grid;place-items:center;font-weight:800;font-size:16px">ממיר מטבעות ⇄</div>
  <div style="position:absolute;left:30px;top:217px;width:645px;height:160px;border-radius:22px;${glass}background:rgba(50,40,140,.55)">
    <div style="position:absolute;right:16px;top:14px;font-size:21px;font-weight:800">סיכום לפי קטגוריה</div>
    <div style="position:absolute;left:16px;top:14px;font-size:21px;font-weight:800;color:#c9bcff">₪<span id="tot">14,714.14</span></div>
    <div style="position:absolute;left:16px;right:16px;top:58px;height:12px;border-radius:6px;background:rgba(255,255,255,.18);overflow:hidden"><div id="bar" style="height:100%;width:100%;background:#4a90c8;margin-left:auto"></div></div>
    <div style="position:absolute;right:16px;top:84px;font-size:13px;font-weight:700;display:flex;gap:8px;align-items:center">טיסות ✈ <i style="width:10px;height:10px;border-radius:50%;background:#4a90c8"></i></div>
    <div style="position:absolute;left:16px;top:84px;font-size:13px;font-weight:700">₪14,714.14 &nbsp;&nbsp;&nbsp;&nbsp;100%</div>
    <div style="position:absolute;right:16px;top:124px;font-size:11px;color:#cfc9ee">הסכומים מומרים למטבע הבית (ILS) לפי שערים מ-19.10.2026. עדכון שערים ⟳</div>
  </div>
  <div style="position:absolute;left:30px;top:386px;width:645px;height:100px;border-radius:22px;${glass}background:rgba(50,40,140,.55)">
    <div style="position:absolute;right:16px;top:14px;width:50px;height:50px;border-radius:14px;background:rgba(255,255,255,.12);display:grid;place-items:center;font-size:22px">✈</div>
    <div style="position:absolute;right:80px;top:12px;font-size:16px;font-weight:800;direction:rtl;white-space:nowrap">כרטיסי טיסה אמריקייטס — 5 נוספים (H7U4N6)</div>
    <div style="position:absolute;right:80px;top:38px;font-size:12px;color:#cfc9ee">7 בדצמבר · טיסות · בנקוק</div>
    <div style="position:absolute;right:80px;top:60px;font-size:11px;color:#cfc9ee;direction:rtl;width:420px">2 × 1,277.87 מבוגרים + 2 × 1,041.87 ילדים + 93 תינוק. שולם בכרטיס אשראי.</div>
    <div style="position:absolute;left:54px;top:20px;font-size:19px;font-weight:800;direction:ltr">$4,732.48</div>
    <div style="position:absolute;left:54px;top:50px;font-size:12px;color:#cfc9ee">₪14,714.14 ≈</div>
  </div>`;
}

