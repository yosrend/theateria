(function(){
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (s,r=document)=>r.querySelector(s), $$ = (s,r=document)=>[...r.querySelectorAll(s)];
const NS='http://www.w3.org/2000/svg';
const gbp = n => '£' + n.toLocaleString('en-GB');

/* ---------- data ---------- */
const SHOWS = [
  {id:'sym', img:'/img/hero-m-k1.jpg', pos:'50% 50%', kind:'Orchestra', title:'Evening Symphony', date:'Sat 7 Nov', time:'19:30', hall:'Main Hall', icon:'<path d="M4 9h28M4 15h28M4 21h28M4 27h28"/><circle cx="14" cy="21" r="3"/><path d="M17 21V8"/>'},
  {id:'opr', img:'/img/hero-m-k2.jpg', pos:'50% 30%', kind:'Opera', title:'Tales from Venice', date:'Fri 13 Nov', time:'19:00', hall:'Main Hall', icon:'<path d="M6 6h24M6 6v24M30 6v24M6 6Q18 20 30 6"/>'},
  {id:'bal', img:'/img/hero-m-k3.jpg', pos:'50% 60%', kind:'Ballet', title:'The Swan Suite', date:'Sun 15 Nov', time:'16:00', hall:'Main Hall', icon:'<path d="M8 28Q8 10 22 8M22 8Q26 8 26 12"/><circle cx="26" cy="12" r="1.5"/><path d="M8 28H28"/>'},
  {id:'chm', img:'/img/gal-3.jpg', pos:'25% 50%', kind:'Chamber music', title:'Twilight Quartet', date:'Thu 19 Nov', time:'20:00', hall:'Chamber Room', icon:'<circle cx="11" cy="18" r="5"/><circle cx="25" cy="18" r="5"/><circle cx="18" cy="9" r="5"/>'},
  {id:'drm', img:'/img/about.jpg', pos:'50% 40%', kind:'Drama', title:'Monologues of a Rainy City', date:'Sat 21 Nov', time:'19:30', hall:'Studio Stage', icon:'<path d="M5 8h14v10Q12 26 5 18ZM17 16h14v10Q24 34 17 26Z"/>'},
  {id:'jzz', img:'/img/hero-m-k4.jpg', pos:'50% 40%', kind:'Jazz', title:'Midnight Session', date:'Fri 27 Nov', time:'21:00', hall:'Rooftop Terrace', icon:'<path d="M3 18Q9 6 14 18T25 18T33 18"/>'}
];
const ROOMS = [
  {name:'Main Hall', img:'/img/hero-k4.jpg', alt:'The Main Hall from the balcony, full of people before the show', pos:'50% 50%', seats:'100 seats', best:'Symphony, opera, ballet', from:'£40', art:'<rect x="70" y="8" width="60" height="14" rx="2"/><path d="M40 40Q100 100 160 40M30 56Q100 118 170 56M20 72Q100 136 180 72"/>'},
  {name:'Chamber Room', img:'/img/gal-3.jpg', alt:'Musicians and the conductor in the pit under the gold balconies', pos:'50% 45%', seats:'48 seats', best:'Quartets, recitals', from:'£30', art:'<rect x="60" y="10" width="80" height="34" rx="3"/><ellipse cx="100" cy="27" rx="16" ry="9"/><g class="d"><circle cx="60" cy="64" r="4"/><circle cx="80" cy="64" r="4"/><circle cx="100" cy="64" r="4"/><circle cx="120" cy="64" r="4"/><circle cx="140" cy="64" r="4"/><circle cx="70" cy="84" r="4"/><circle cx="90" cy="84" r="4"/><circle cx="110" cy="84" r="4"/><circle cx="130" cy="84" r="4"/></g>'},
  {name:'Studio Stage', img:'/img/hero-k1.jpg', alt:'The conductor in front of the closed red velvet curtain', pos:'50% 50%', seats:'60 seats', best:'Drama, new work', from:'£25', art:'<rect x="30" y="10" width="140" height="100" rx="2"/><rect x="60" y="22" width="80" height="40" rx="2"/><g class="d"><circle cx="50" cy="86" r="4"/><circle cx="75" cy="86" r="4"/><circle cx="100" cy="86" r="4"/><circle cx="125" cy="86" r="4"/><circle cx="150" cy="86" r="4"/></g>'},
  {name:'Rooftop Terrace', img:'/img/hero-k2.jpg', alt:'A stagehand at the curtain while the orchestra waits', pos:'50% 50%', seats:'80 places', best:'Jazz, open air nights', from:'£35', art:'<g><circle cx="45" cy="35" r="14"/><circle cx="100" cy="30" r="14"/><circle cx="155" cy="35" r="14"/><circle cx="70" cy="80" r="14"/><circle cx="130" cy="80" r="14"/></g><path d="M10 108Q40 98 70 108T130 108T190 108"/>'},
  {name:'Rehearsal Salon', img:'/img/event-2.jpg', alt:'A soprano waiting in the wings among costumes and stage ropes', pos:'50% 40%', seats:'24 seats', best:'Masterclasses, talks', from:'£15', art:'<circle cx="100" cy="60" r="26"/><g class="d"><circle cx="100" cy="20" r="6"/><circle cx="135" cy="40" r="6"/><circle cx="135" cy="80" r="6"/><circle cx="100" cy="100" r="6"/><circle cx="65" cy="80" r="6"/><circle cx="65" cy="40" r="6"/></g>'}
];
const EVENTS = [
  {date:'Fri 6 Nov, 18:30', title:'Season opening gala', img:'/img/hero-k4.jpg', alt:'The full house seen from the balcony before the opening night', text:'Opening night with the Theateria Orchestra, followed by a reception on the stage itself.', price:'£95', bg:'#FAF9F8', art:'<g fill="none" stroke="#A27E2A" stroke-width="2"><path d="M60 40L100 150H20ZM240 40L280 150H200Z" opacity=".7"/><path d="M60 40V10M240 40V10"/><circle cx="150" cy="70" r="36"/><path d="M130 70h40M150 50v40"/></g>'},
  {date:'Sun 8 Nov, 10:00 and 14:00', title:'Backstage tour', img:'/img/event-2.jpg', alt:'A soprano in a cream period gown waits in the wings, with costumes, masks and stage ropes around her', text:'Walk through the fly loft, the wardrobe and the orchestra pit with a stage manager.', price:'£12', bg:'#D3CAC3', art:'<g fill="none" stroke="#A27E2A" stroke-width="2"><path d="M40 150V50M260 150V50"/><circle cx="40" cy="46" r="7"/><circle cx="260" cy="46" r="7"/><path d="M40 70Q150 120 260 70" stroke="#A3352B" stroke-width="5"/><rect x="110" y="96" width="80" height="54" rx="3"/></g>'},
  {date:'Wed 18 Nov, 11:00', title:'Student matinee', img:'/img/about.jpg', alt:'The auditorium from the side of the stage while the orchestra sets up', text:'A discounted afternoon concert for school groups, with a short talk before the first piece.', price:'£5 per student', bg:'#252525',dark:true, art:'<g fill="none" stroke="#A27E2A" stroke-width="2"><path d="M40 60h220v26a14 14 0 0 0 0 28v26H40v-26a14 14 0 0 0 0-28Z"/><path d="M200 60v80" stroke-dasharray="5 6"/><path d="M80 90h70M80 110h50"/></g>'},
  {date:'Sat 28 Nov, 13:00', title:'Conductor masterclass', img:'/img/hero-k1.jpg', alt:'The conductor mid beat in front of the closed red curtain', text:'Four young conductors, one orchestra, open for you to watch in the Rehearsal Salon.', price:'£20', bg:'#FAF9F8', art:'<g fill="none" stroke="#A27E2A" stroke-width="2"><path d="M20 60h260M20 76h260M20 92h260M20 108h260M20 124h260"/><circle cx="90" cy="108" r="8" fill="#A27E2A"/><circle cx="160" cy="84" r="8" fill="#A27E2A"/><circle cx="220" cy="100" r="8" fill="#A27E2A"/><path d="M98 108V50M168 84V30M228 100V44"/></g>'}
];

/* ---------- smooth scroll ---------- */
let lenis = null;
if(false && !RM && window.Lenis){
  lenis = new Lenis({lerp:.1, smoothWheel:true});
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(t=>lenis.raf(t*1000));
  gsap.ticker.lagSmoothing(0);
}
gsap.registerPlugin(ScrollTrigger);
function go(hash){
  const el = hash==='#top' ? document.body : $(hash);
  if(!el) return;
  if(hash==='#top'){ lenis ? lenis.scrollTo(0) : scrollTo({top:0,behavior:RM?'auto':'smooth'}); return; }
  const off = 0; lenis ? lenis.scrollTo(el,{offset:off}) : scrollTo({top:el.getBoundingClientRect().top+scrollY+off,behavior:RM?'auto':'smooth'});
}
document.addEventListener('click',e=>{ const a=e.target.closest('a[data-go]'); if(!a) return; e.preventDefault(); go(a.getAttribute('href')); });
ScrollTrigger.create({start:40, onToggle:s=>$('#topbar').classList.toggle('is-solid', s.isActive)});

/* ---------- hero scroll (video frame sequence) ---------- */
const HERO_N=96, heroFrames=new Array(HERO_N);
const heroCv=$('#heroCv'), hctx=heroCv.getContext('2d');
let heroCur=0, heroDrawn=-1;
function heroSize(){ const dpr=Math.min(devicePixelRatio||1,2); const w=heroCv.clientWidth, h=heroCv.clientHeight; heroCv.width=Math.round(w*dpr); heroCv.height=Math.round(h*dpr); heroDrawn=-1; heroDraw(heroCur); }
function heroDraw(i){
  i=Math.max(0,Math.min(HERO_N-1,Math.round(i)));
  let img=heroFrames[i];
  if(!img||!img.complete||!img.naturalWidth){ for(let k=i;k>=0;k--){ if(heroFrames[k]&&heroFrames[k].complete&&heroFrames[k].naturalWidth){ img=heroFrames[k]; break; } } }
  if(!img||!img.naturalWidth) return;
  if(i===heroDrawn && img===heroFrames[i]) return;
  heroDrawn=i; heroCur=i;
  const cw=heroCv.width, ch=heroCv.height, iw=img.naturalWidth, ih=img.naturalHeight;
  const sc=Math.max(cw/iw,ch/ih), dw=iw*sc, dh=ih*sc;
  hctx.drawImage(img,(cw-dw)/2,(ch-dh)/2,dw,dh);
}
(function(){
  const load=i=>{ const im=new Image(); im.decoding='async'; im.onload=()=>{ if(i===0||Math.abs(i-heroCur)<2) heroDraw(heroCur); }; im.src='/frames/f'+String(i+1).padStart(3,'0')+'.webp'; heroFrames[i]=im; };
  load(0);
  let k=1; const pump=()=>{ for(let n=0;n<6&&k<HERO_N;n++,k++) load(k); if(k<HERO_N) setTimeout(pump,40); };
  setTimeout(pump,50);
  heroSize(); addEventListener('resize',heroSize);
})();
const mm = gsap.matchMedia();
mm.add({mob:'(max-width: 820px)', desk:'(min-width: 821px)', rm:'(prefers-reduced-motion: reduce)'}, ctx=>{
  const {mob, rm} = ctx.conditions;
  if(rm){ heroCur=HERO_N-1; setTimeout(()=>heroDraw(HERO_N-1),400); $('#hint').style.display='none'; return; }
  const st={f:0};
  const tl = gsap.timeline({defaults:{ease:'none'}, scrollTrigger:{refreshPriority:3,trigger:'.hero',start:'top top',end: mob?'+=220%':'+=300%',pin:true,scrub:.6,anticipatePin:1}});
  tl.to(st,{f:HERO_N-1,duration:1,onUpdate:()=>heroDraw(st.f)},0)
    .to('#hint',{autoAlpha:0,duration:.05},0)
    ;
});

/* ---------- intro loader ---------- */
function typeHero(){
  const live=$('#twLive'), copy=$('#heroCopy'), full=$('.tw__ghost').textContent.trim();
  if(RM){ live.textContent=full; copy.classList.add('is-typed'); return; }
  let i=0; const step=()=>{ i++; live.textContent=full.slice(0,i); if(i>=full.length*.7) copy.classList.add('is-typed'); if(i<full.length) setTimeout(step,20+Math.random()*28); else setTimeout(()=>copy.classList.add('is-typed'),250); };
  setTimeout(step,250);
}
(function(){
  const root=document.documentElement, intro=$('#intro'), brand=$('#topbar .brand');
  let lastIn=0; const bump=()=>{ lastIn=performance.now(); };
  addEventListener('wheel',bump,{passive:true}); addEventListener('touchmove',bump,{passive:true});
  const finish=()=>{
    if(intro) intro.remove(); if(brand) brand.classList.remove('is-hidden');
    const t1=performance.now();
    const unlock=()=>{
      const now=performance.now();
      if(!RM && now-lastIn<220 && now-t1<2500){ setTimeout(unlock,60); return; }
      scrollTo(0,0); root.classList.remove('intro-lock','intro-nav'); ScrollTrigger.refresh(); typeHero();
    };
    unlock();
  };
  if(!intro||!brand||RM){ finish(); return; }
  const fontReady=Promise.race([ (document.fonts&&document.fonts.load)?document.fonts.load('400 21px "Faculty Glyphic"'):Promise.resolve(), new Promise(r=>setTimeout(r,1500)) ]);
  fontReady.then(()=>{
    const mark=$('#introMark'), card=$('#introCard'), cue=$('#introCue'), cueTxt=$('#introCueTxt'), bar=$('#introBar');
    brand.classList.add('is-hidden');
    const mob=innerWidth<=820, K=mob?1.6:1;
    const P=[['a01',5,9,11],['a02',27,4,9],['a03',68,6,10],['a04',87,15,8],['a05',3,40,9],['a06',86,45,9],['a07',11,68,8],['a08',25,63,11],['a09',62,64,10],['a10',84,66,8],['a11',44,72,9]];
    const ts=P.map((q,i)=>{ const d=document.createElement('div'); d.className='intro__t'; d.style.width=(q[3]*K)+'vw'; const im=new Image(); im.src='/img/t/'+q[0]+'.jpg'; im.alt=''; im.style.setProperty('--d',(-i*.7)+'s'); d.appendChild(im); intro.insertBefore(d,card); return d; });
    const place=(x,y,sc)=>{ mark.style.transform='translate('+x+'px,'+y+'px) scale('+sc+')'; };
    const mw=mark.offsetWidth, mh=mark.offsetHeight;
    const S=()=>Math.min(6,(innerWidth*(innerWidth<=820?.78:.4))/mw);
    const cx=()=>innerWidth/2-(mw*S())/2, cy=()=>innerHeight/2-(mh*S())/2;
    mark.style.transition='none'; place(cx(),cy(),S()); mark.getBoundingClientRect(); mark.style.transition='';
    requestAnimationFrame(()=>mark.classList.add('is-in'));
    const brandCol=getComputedStyle(brand).color;
    /* polar start of each photo (ellipse-normalised around the centre) */
    const pol=P.map((q,i)=>{ const w=q[3]*K; const x=q[1]+w/2, y=q[2]+w*1/innerHeight*innerWidth/2; const nx=(x-50)/50, ny=(y-50)/50; return {a:Math.atan2(ny,nx), r:Math.min(1.05,Math.hypot(nx,ny)), sp:.82+((i*37)%5)*.1, w:q[3]*K}; });
    const t0=performance.now(), NEED=24; let loaded=false, started=false, tgt=0, cur=0, ty=null, done=false;
    const ready=()=>{ let c=0; for(let i=0;i<NEED;i++){ const im=heroFrames[i]; if(im&&im.complete&&im.naturalWidth) c++; } return c/NEED; };
    const ez=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
    const cl=(v,a,b)=>Math.max(a,Math.min(b,v));
    const lerp=(a,b,t)=>a+(b-a)*t;
    const render=()=>{
      const W=innerWidth, H=innerHeight, p=cur;
      const rot=-p*Math.PI*1.35;                 /* counter-clockwise orbit around the centre axis */
      const cv=ez(cl((p-.72)/.2,0,1));           /* converge into the centre */
      pol.forEach((o,i)=>{
        const a=o.a+rot*o.sp, r=o.r*(1-cv*.98);
        const x=W/2+Math.cos(a)*r*W/2*.98, y=H/2+Math.sin(a)*r*H/2*.98;
        const d=ts[i]; d.style.transform='translate('+(x-d.offsetWidth/2)+'px,'+(y-d.offsetHeight/2)+'px) scale('+(1-cv*.8)+')';
        d.style.opacity=loaded?(1-cl((p-.8)/.12,0,1)):'';
      });
      bar.style.transform='scaleX('+p+')';
      const m=ez(cl((p-.62)/.3,0,1));
      const r=brand.getBoundingClientRect(), px=parseFloat(getComputedStyle(brand).paddingLeft)||0;
      mark.style.color=m>.5?brandCol:'';
      place(lerp(cx(),r.left+px,m), lerp(cy(),r.top+(r.height-mh)/2,m), lerp(S(),1,m));
      const q=ez(cl((p-.78)/.22,0,1));
      card.style.opacity=q>0?1:0;
      card.style.clipPath='inset('+lerp(36,0,q)+'% '+lerp(40,0,q)+'% '+lerp(36,0,q)+'% '+lerp(40,0,q)+'% round '+lerp(12,0,q)+'px)';
      if(p>.88) root.classList.add('intro-nav'); else root.classList.remove('intro-nav');
      intro.classList.toggle('intro--go',p>.86);
    };
    const end=()=>{ if(done) return; done=true; detach(); brand.classList.remove('is-hidden'); mark.style.opacity=0; setTimeout(finish,350); };
    const add=d=>{ if(!loaded||done) return; tgt=cl(tgt+d,0,1); };
    const onWheel=e=>{ e.preventDefault(); add(e.deltaY/(innerHeight*2)); };
    const onKey=e=>{ const k=e.key; if(['ArrowDown','PageDown',' ','Enter','End'].includes(k)){ e.preventDefault(); add(k==='ArrowDown'?.06:.2); } else if(k==='ArrowUp'||k==='PageUp'){ e.preventDefault(); add(k==='ArrowUp'?-.06:-.2); } };
    const onTS=e=>{ ty=e.touches[0].clientY; };
    const onTM=e=>{ if(ty===null) return; const y=e.touches[0].clientY; add((ty-y)/(innerHeight*1.6)); ty=y; };
    function attach(){ addEventListener('wheel',onWheel,{passive:false}); addEventListener('keydown',onKey); addEventListener('touchstart',onTS,{passive:true}); addEventListener('touchmove',onTM,{passive:true}); cue.addEventListener('click',()=>{ tgt=Math.min(1,tgt+.25); }); }
    function detach(){ removeEventListener('wheel',onWheel); removeEventListener('keydown',onKey); removeEventListener('touchstart',onTS); removeEventListener('touchmove',onTM); }
    let loadP=0, lastT=performance.now();
    $('#introSkip').addEventListener('click',()=>{ tgt=1; });
    const loop=()=>{
      if(done) return;
      if(!loaded) lastT=performance.now();
      if(!loaded){
        const el=performance.now()-t0, r=ready();
        loadP=Math.max(loadP,Math.min(r,el/1400));
        bar.style.transform='scaleX('+loadP+')';
        const want=Math.min(ts.length,Math.floor(loadP*ts.length)+(el>250?1:0));
        ts.forEach((d,i)=>{ if(i<want) d.classList.add('is-in'); });
        if((loadP>=1&&el>1400)||el>6000){ loaded=true; ts.forEach(d=>d.classList.add('is-in')); cueTxt.textContent='SCROLL TO EXPLORE'; cue.classList.add('is-ready'); bar.style.transition='none'; bar.style.transform='scaleX(0)'; attach(); render(); }
      } else {
        const nw=performance.now(), dt=Math.min(.05,(nw-lastT)/1000); lastT=nw; cur+=(tgt-cur)*(1-Math.exp(-dt*9)); if(Math.abs(tgt-cur)<.0005) cur=tgt;
        render();
        if(cur>=.9995 && tgt>=1){ cur=1; render(); end(); return; }
      }
      requestAnimationFrame(loop);
    };
    /* initial scatter */
    ts.forEach(d=>d.style.transition='opacity .9s var(--ease)');
    render();
    addEventListener('resize',()=>{ if(!done) render(); });
    requestAnimationFrame(loop);
  });
})();

/* ---------- reveal (once) ---------- */
if(!RM) $$('[data-reveal]').forEach(el=>gsap.from(el,{autoAlpha:0,y:24,duration:.8,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%',once:true}}));

/* ---------- rooms ---------- */
(function(){
  const track=$('#track');
  track.innerHTML = ROOMS.map((r,i)=>`<article class="room" data-i="${i}"><img class="room__bg" src="${r.img}" alt="${r.alt}" loading="lazy" decoding="async" style="object-position:${r.pos}"><h3>${r.name}</h3><a class="room__go" href="#seats" data-go aria-label="See seats in ${r.name}"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6"/></svg></a></article>`).join('');
  $$('.room__art svg .d').forEach(g=>g.setAttribute('fill','#B08A2E'));
  const mm2=gsap.matchMedia();
  mm2.add('(min-width: 821px) and (prefers-reduced-motion: no-preference)',()=>{
    const pin=$('#roomsPin'), line=$('#roomsLine');
    const start=()=>innerWidth*.5, dist=()=>Math.max(0,track.scrollWidth-innerWidth)+start();
    gsap.set(track,{x:start});
    gsap.timeline({defaults:{ease:'none'},scrollTrigger:{refreshPriority:1,trigger:pin,start:'top top',end:()=>'+='+dist(),pin:true,scrub:.5,invalidateOnRefresh:true,anticipatePin:1}})
      .fromTo(track,{x:start},{x:()=>-(dist()-start()),duration:1},0)
      .fromTo(line,{scaleX:0},{scaleX:1,duration:1},0);
    ScrollTrigger.create({trigger:pin,start:'top top',end:()=>'+='+dist(),onUpdate:self=>{ const n=Math.min(ROOMS.length,Math.floor(self.progress*ROOMS.length)+1); $('#roomsCount').textContent='0'+n+' / 0'+ROOMS.length; }});
    return ()=>{ gsap.set(track,{clearProps:'transform'}); };
  });
})();

/* ---------- seats ---------- */
(function(){
  const svg=$('#seatmap'), frame=$('#mapframe'), home=$('#mapHome');
  const VW=1200, VH=730, CX=600, MINW=320;
  const L='ABCDEFGHIJ';
  const TIERS={vvip:{name:'VVIP',price:120},vip:{name:'VIP',price:75},reg:{name:'Regular',price:40}};
  const tierKey=l=> l<='B'?'vvip':(l<='E'?'vip':'reg');
  const YS={A:150,B:202,C:292,D:344,E:396,F:486,G:538,H:590,I:642,J:694};
  const rows=[], byId={};
  function el(n,a,p){const e=document.createElementNS(NS,n);for(const k in a)e.setAttribute(k,a[k]);(p||svg).appendChild(e);return e}
  el('path',{class:'stagefloor',d:'M330 8H870V50Q600 88 330 50Z'});
  el('path',{class:'stageline',pathLength:1,d:'M330 8V50Q600 88 870 50V8'});
  el('text',{x:600,y:36,'text-anchor':'middle',class:'maptext sec'}).textContent='Stage';
  [[112,'VVIP, £120'],[254,'VIP, £75'],[448,'Regular, £40']].forEach(([y,s])=>el('text',{x:600,y,'text-anchor':'middle',class:'maptext sec'}).textContent=s);
  const palette=['#6d231d','#7a2a22','#5e1d18','#842f26'];
  const mk=a=>()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
  const rnd0=mk(7);
  for(let r=0;r<10;r++){
    const l=L[r], y=YS[l], row={letter:l,tier:tierKey(l),seats:[]};
    el('text',{x:96,y:y+1,'text-anchor':'middle',class:'maptext'}).textContent=l;
    el('text',{x:1104,y:y+1,'text-anchor':'middle',class:'maptext'}).textContent=l;
    for(let i=0;i<10;i++){
      const x=CX+(i-4.5)*86+(i<5?-30:30);
      const g=el('g',{class:'seat tier-'+row.tier,transform:`translate(${x.toFixed(1)} ${y})`,tabindex:-1,role:'checkbox','aria-checked':'false'});
      g.style.setProperty('--c',palette[Math.floor(rnd0()*palette.length)]);
      el('rect',{class:'ph',x:-28,y:-20,width:56,height:32,rx:9},g); el('rect',{class:'ph',x:-31,y:13,width:62,height:9,rx:4.5},g);
      el('rect',{class:'ol',pathLength:1,x:-28,y:-20,width:56,height:32,rx:9},g); el('rect',{class:'ol',pathLength:1,x:-31,y:13,width:62,height:9,rx:4.5},g);
      el('text',{class:'seatnum',x:0,y:-3},g).textContent=i+1;
      el('rect',{class:'hit',x:-40,y:-25,width:80,height:50},g);
      const s={id:l+(i+1),g,n:i+1,state:'free',x,y,row}; row.seats.push(s); byId[s.id]=s;
    }
    rows.push(row);
  }
  const price=s=>TIERS[s.row.tier].price;
  const all=rows.flatMap(r=>r.seats), sel=new Set();
  let mine=false, holdEnd=0, extended=false, holdTimer=null, inModal=false;

  /* view: zoom and pan through the viewBox */
  const view={x:0,y:0,w:VW,h:VH};
  const zoomed=()=>view.w<VW-1;
  function clampView(){ view.w=Math.min(VW,Math.max(MINW,view.w)); view.h=view.w*VH/VW; view.x=Math.min(VW-view.w,Math.max(0,view.x)); view.y=Math.min(VH-view.h,Math.max(0,view.y)); }
  function applyView(){ svg.setAttribute('viewBox',`${view.x.toFixed(1)} ${view.y.toFixed(1)} ${view.w.toFixed(1)} ${view.h.toFixed(1)}`); svg.style.touchAction=(zoomed()||inModal)?'none':'pan-y'; frame.classList.toggle('is-zoomed',zoomed()); }
  function zoomTo(f,cx,cy){ if(cx==null){cx=view.x+view.w/2;cy=view.y+view.h/2;} const nw=Math.min(VW,Math.max(MINW,view.w*f)), k=nw/view.w; view.x=cx-(cx-view.x)*k; view.y=cy-(cy-view.y)*k; view.w=nw; clampView(); applyView(); }
  function resetView(){ view.x=0;view.y=0;view.w=VW;view.h=VH; applyView(); }
  function userPt(e){ const m=svg.getScreenCTM(); if(!m) return {x:view.x+view.w/2,y:view.y+view.h/2}; const p=svg.createSVGPoint(); p.x=e.clientX; p.y=e.clientY; const q=p.matrixTransform(m.inverse()); return {x:q.x,y:q.y}; }
  let drag=null, moved=false;
  svg.addEventListener('pointerdown',e=>{ if(e.button!==0) return; drag={x:e.clientX,y:e.clientY,vx:view.x,vy:view.y}; moved=false; });
  addEventListener('pointermove',e=>{ if(!drag) return; const dx=e.clientX-drag.x, dy=e.clientY-drag.y; if(!moved&&Math.hypot(dx,dy)<6) return; if(!zoomed()) return; moved=true; const s=1/Math.min(svg.clientWidth/view.w,svg.clientHeight/view.h); view.x=drag.vx-dx*s; view.y=drag.vy-dy*s; clampView(); applyView(); });
  addEventListener('pointerup',()=>{ drag=null; setTimeout(()=>{moved=false},0); });
  svg.addEventListener('wheel',e=>{ if(!(e.ctrlKey||e.metaKey||inModal)) return; e.preventDefault(); const p=userPt(e); zoomTo(e.deltaY>0?1.14:.88,p.x,p.y); },{passive:false});
  $('#zin').onclick=()=>zoomTo(.7); $('#zout').onclick=()=>zoomTo(1.43); $('#zreset').onclick=resetView;

  /* modal */
  const modal=$('#modal'), mslot=$('#modalMap');
  let lastFocus=null;
  function openModal(seat){
    if(inModal) return;
    lastFocus=document.activeElement; inModal=true;
    mslot.appendChild(frame); frame.classList.add('in-modal'); modal.hidden=false;
    document.body.style.overflow='hidden'; if(lenis) lenis.stop();
    if(seat){ view.w=330; view.h=view.w*VH/VW; view.x=seat.x-view.w/2; view.y=seat.y-view.h/2; clampView(); } else { resetView(); }
    applyView(); $('#modalClose').focus();
  }
  function closeModal(){
    if(!inModal) return; inModal=false;
    modal.hidden=true; home.appendChild(frame); frame.classList.remove('in-modal');
    document.body.style.overflow=''; if(lenis) lenis.start();
    resetView(); if(lastFocus&&lastFocus.focus) lastFocus.focus();
  }
  $('#modalClose').onclick=closeModal; $('#modalDone').onclick=closeModal;
  modal.addEventListener('pointerdown',e=>{ if(e.target===modal) closeModal(); });
  document.addEventListener('keydown',e=>{
    if(!inModal||v3Open) return;
    if(e.key==='Escape'){ closeModal(); return; }
    if(e.key==='Tab'){ const f=[...modal.querySelectorAll('button,[tabindex="0"]')].filter(x=>!x.disabled&&x.offsetParent!==null); if(!f.length) return; const a=f[0], b=f[f.length-1]; if(e.shiftKey&&document.activeElement===a){e.preventDefault();b.focus();} else if(!e.shiftKey&&document.activeElement===b){e.preventDefault();a.focus();} }
  });

  /* state */
  const sSel=$('#showSel');
  sSel.innerHTML=SHOWS.map((s,i)=>`<option value="${i}">${s.title}, ${s.date} ${s.time}</option>`).join('');
  function seedShow(i){
    const rr=mk(101+i*977);
    all.forEach(s=>{ const p=rr(); const lim=s.row.letter<='B'?.4:(s.row.letter<='E'?.35:.3); s.state=p<lim?'sold':(p<lim+.07?'held':'free'); });
  }
  function findOrphan(set){ let o=null;
    rows.forEach(r=>r.seats.forEach((s,i)=>{
      if(o||s.state!=='free'||set.has(s.id)) return;
      const a=i===5?null:r.seats[i-1], b=i===4?null:r.seats[i+1];
      const cA=!a||a.state!=='free'||set.has(a.id), cB=!b||b.state!=='free'||set.has(b.id);
      if(cA&&cB&&((a&&set.has(a.id))||(b&&set.has(b.id)))) o=s.id;
    }));
    return o; }
  function render(){ setTimeout(syncBar,0);
    all.forEach(s=>{
      const c=s.g.classList, isSel=sel.has(s.id);
      c.toggle('is-sold',s.state==='sold'); c.toggle('is-held',s.state==='held');
      c.toggle('is-sel',isSel&&!mine); c.toggle('is-mine',isSel&&mine);
      s.g.setAttribute('aria-checked',String(isSel));
      s.g.setAttribute('aria-label',`Row ${s.row.letter}, seat ${s.n}, ${TIERS[s.row.tier].name}, ${gbp(price(s))}, ${s.state==='free'?(isSel?'chosen':'available'):(s.state==='sold'?'sold':'held by someone')}`);
    });
    const list=[...sel].map(id=>byId[id]);
    const chips=list.length? list.map(s=>`<span class="chip">${s.id}</span>`).join('') : '<span class="empty">No seats chosen yet.</span>';
    const tot=gbp(list.reduce((a,s)=>a+price(s),0));
    $('#chips').innerHTML=chips; $('#mchips').innerHTML=chips; $('#total').textContent=tot; $('#mtotal').textContent=tot;
    const orphan=mine?null:findOrphan(sel);
    const mv=$('#mview'); if(mv&&cur) mv.textContent='View from seat '+cur.id;
    const msg=$('#msg'), box=$('#holdBox');
    if(mine){
      msg.textContent='';
      box.innerHTML=`<div class="timer" id="timer" aria-live="off">5:00</div><div class="holdbtns"><button class="btn" id="pay">Continue to payment</button><button class="btn btn--ghost" id="release">Release</button></div>`;
      $('#release').onclick=()=>release(); $('#pay').onclick=openCheckout;
      tick();
    } else {
      const holding=holdEnd>Date.now();
      msg.textContent = orphan? `This leaves a single empty seat at ${orphan}. Move one seat to keep the row easy to sell.` : (list.length>8?'You can choose up to 8 seats.':(holding?'Your seats are still on hold. Add or remove seats, then review your order.':''));
      const lab=list.length? (holding?'Review '+list.length+(list.length===1?' seat':' seats'):'Reserve '+list.length+(list.length===1?' seat':' seats')) : 'Choose a seat';
      box.innerHTML=(holding?'<div class="timer" id="timer" aria-live="off">5:00</div>':'')+`<div class="holdbtns"><button class="btn" id="hold" ${list.length&&!orphan&&list.length<=8?'':'disabled'}>${lab}</button>${holding?'<button class="btn btn--ghost" id="release">Release seats</button>':''}</div>`;
      if(holding){ $('#release').onclick=()=>release(); tick(); }
      $('#hold').onclick=hold;
    }
  }
  (function(){ const pn=$('.panel'), sec=$('#seats'); if(!pn||!sec) return; const upd=()=>{ const r=sec.getBoundingClientRect(); pn.classList.toggle('is-float', r.top<innerHeight*.55 && r.bottom>innerHeight*.35); }; addEventListener('scroll',upd,{passive:true}); addEventListener('resize',upd); setTimeout(upd,300); })();
  let panelVisible=false;
  function syncBar(){ const b=$('#sbar'); if(!b) return; const n=sel.size; b.classList.toggle('is-on',n>0&&!panelVisible); $('#sbarTxt').textContent=n+(n===1?' seat, ':' seats, ')+gbp([...sel].reduce((a,id)=>a+price(byId[id]),0)); $('#sbarGo').textContent=mine?'Continue':'Review seats'; }
  if('IntersectionObserver' in window) new IntersectionObserver(es=>{ panelVisible=es[0].isIntersecting; syncBar(); }).observe($('.panel'));
  $('#sbarGo').addEventListener('click',()=>{ $('.panel').scrollIntoView({behavior:RM?'auto':'smooth',block:'center'}); });
  function hold(){ mine=true; if(holdEnd<=Date.now()){ holdEnd=Date.now()+5*60*1000; extended=false; } clearInterval(holdTimer); holdTimer=setInterval(tick,500); render(); openCheckout(); }
  function tick(){ if(!holdEnd) return; const ms=holdEnd-Date.now(); if(ms<=0){ release(true); return; } const s=Math.ceil(ms/1000), tx=Math.floor(s/60)+':'+String(s%60).padStart(2,'0'); const t=$('#timer'); if(t) t.textContent=tx; const ct=$('#cTimer'); if(ct) ct.textContent=tx; }
  function release(expired){ clearInterval(holdTimer); holdEnd=0; extended=false; mine=false; sel.clear(); render(); if(expired===true&&coOpen&&stage!=='done'){ stage='expired'; renderCo(true); } if(expired===true) $('#msg').textContent='The hold ran out and the seats were released.'; }
  function toggle(s){
    if(mine||s.state!=='free') return;
    if(sel.has(s.id)){ sel.delete(s.id); if(!sel.size&&holdEnd){ release(); return; } } else { if(sel.size>=8){ $('#msg').textContent='You can choose up to 8 seats.'; return; } sel.add(s.id); }
    render();
  }
  svg.addEventListener('click',e=>{
    if(moved) return;
    const g=e.target.closest('.seat'); if(!g) return;
    const s=all.find(x=>x.g===g); if(!s) return;
    setFocus(s);
    toggle(s);
  });
  let cur=all[0]; cur.g.tabIndex=0;
  function setFocus(s){ cur.g.tabIndex=-1; cur=s; cur.g.tabIndex=0; }
  svg.addEventListener('keydown',e=>{
    const g=e.target.closest('.seat'); if(!g) return;
    const r=cur.row, i=r.seats.indexOf(cur), ri=rows.indexOf(r); let t=null;
    if(e.key==='ArrowRight') t=r.seats[i+1]; else if(e.key==='ArrowLeft') t=r.seats[i-1];
    else if(e.key==='ArrowDown'||e.key==='ArrowUp'){ const nr=rows[ri+(e.key==='ArrowDown'?1:-1)]; if(nr) t=nr.seats[i]; }
    else if(e.key===' '||e.key==='Enter'){ e.preventDefault(); toggle(cur); return; }
    if(t){ e.preventDefault(); setFocus(t); t.g.focus(); }
  });
  sSel.addEventListener('change',()=>{ sel.clear(); mine=false; holdEnd=0; extended=false; clearInterval(holdTimer); seedShow(+sSel.value); render(); });
  /* checkout */
  const co=$('#co'), coMain=$('#coMain'), coSum=$('#coSum'), coSteps=$('#coSteps');
  const FEE=2;
  let coOpen=false, stage='review', order=[], buyer={name:'',email:'',phone:''}, payPick='card', ref='', coMsg='', coErr={}, busy=false, guests={}, promo=null, promoIn='', needs={step:false,loop:false}, note='', paidWith='';
  const PROMOS={OPENING10:10};
  const money=n=>'£'+(Number.isInteger(n)?n.toLocaleString('en-GB'):n.toFixed(2));
  const PAYN={card:'card',apple:'Apple Pay or Google Pay',paypal:'PayPal',bank:'bank transfer'};
  const esc=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const totals=()=>{ const sub=order.reduce((a,s)=>a+price(s),0), fee=order.length*FEE, disc=promo?Math.round(sub*promo.pct)/100:0; return {sub,fee,disc,total:sub+fee-disc}; };
  const showNow=()=>SHOWS[+sSel.value];
  const seatName=s=>`Row ${s.row.letter}, seat ${s.n}`;
  function openCheckout(){
    order=[...sel].map(id=>byId[id]); if(!order.length) return;
    stage='review'; coErr={}; coMsg=''; busy=false; coOpen=true; co.hidden=false;
    document.body.style.overflow='hidden'; if(lenis) lenis.stop(); co.scrollTop=0; renderCo(true);
  }
  function closeCheckout(){
    if(!coOpen) return; coOpen=false; co.hidden=true;
    if(stage==='done'){ guests={}; promo=null; promoIn=''; needs={step:false,loop:false}; note=''; order=[]; }
    if(!inModal){ document.body.style.overflow=''; if(lenis) lenis.start(); }
    render(); const b=$('#pay')||$('#hold'); if(b&&!b.disabled) b.focus();
  }
  function makeQR(seed){
    let h=7; for(const c of seed) h=(h*31+c.charCodeAt(0))>>>0;
    const r=mk(h), N=25, u=4; let d='';
    const inF=(x,y)=>(x<8&&y<8)||(x>N-9&&y<8)||(x<8&&y>N-9);
    for(let y=0;y<N;y++) for(let x=0;x<N;x++) if(!inF(x,y)&&r()>.5) d+=`M${x*u} ${y*u}h${u}v${u}h-${u}z`;
    const f=(x,y)=>`<rect x="${x*u+.5}" y="${y*u+.5}" width="${u*7-1}" height="${u*7-1}" fill="none" stroke="#1D1D1D" stroke-width="${u}"/><rect x="${(x+2)*u}" y="${(y+2)*u}" width="${u*3}" height="${u*3}" fill="#1D1D1D"/>`;
    return `<svg viewBox="0 0 ${N*u} ${N*u}" role="img" aria-label="Sample entry code, not scannable"><path d="${d}" fill="#1D1D1D"/>${f(0,0)}${f(N-7,0)}${f(0,N-7)}</svg>`;
  }
  function icsHref(){
    const sh=showNow(), day=String(parseInt(sh.date.split(' ')[1],10)).padStart(2,'0'), [hh,mm]=sh.time.split(':'), end=String((+hh+2)%24).padStart(2,'0');
    const ics=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Theateria//Concept//EN','BEGIN:VEVENT','UID:'+ref+'@theateria.example','DTSTAMP:20261026T000000Z',`DTSTART:202611${day}T${hh}${mm}00`,`DTEND:202611${day}T${end}${mm}00`,'SUMMARY:'+sh.title+' at Theateria','LOCATION:Theateria, '+sh.hall,'DESCRIPTION:Seats '+order.map(s=>s.id).join(', ')+'. Booking '+ref,'END:VEVENT','END:VCALENDAR'].join('\r\n');
    return 'data:text/calendar;charset=utf-8,'+encodeURIComponent(ics);
  }
  function toast(t){ const d=document.createElement('div'); d.className='toast'; d.setAttribute('role','status'); d.textContent=t; document.body.appendChild(d); setTimeout(()=>d.classList.add('is-in'),20); setTimeout(()=>{d.classList.remove('is-in'); setTimeout(()=>d.remove(),500);},4600); }
  const guestOf=s=>(guests[s.id]||'').trim()||buyer.name;
  const needsTxt=()=>[needs.step?'Step-free access':'',needs.loop?'Hearing loop seat':''].filter(Boolean).join(', ');
  const neighbours=()=>{ const out=[]; if(order.length>=8) return out; order.forEach(s=>{ const r=s.row, i=r.seats.indexOf(s); [i===5?null:r.seats[i-1], i===4?null:r.seats[i+1]].forEach(n=>{ if(n&&n.state==='free'&&!sel.has(n.id)&&!out.includes(n)&&!findOrphan(new Set([...sel,n.id]))) out.push(n); }); }); return out.slice(0,6); };
  function renderCo(focus){
    const sh=showNow(), t=totals(), idx={review:0,details:1,pay:2,taken:2,expired:2,sending:3,done:3}[stage];
    coSteps.innerHTML=['Review','Your details','Payment','Confirmation'].map((n,i)=>`<li class="${i===idx?'on':(i<idx?'ok':'')}"${i===idx?' aria-current="step"':''}>${i+1}. ${n}</li>`).join('');
    const live=stage==='review'||stage==='details'||stage==='pay';
    const by={}; order.forEach(s=>{ (by[s.row.tier]=by[s.row.tier]||[]).push(s); });
    coSum.innerHTML=`<h3>Your order</h3><div><b>${esc(sh.title)}</b><div class="meta">${sh.date}, ${sh.time}, ${sh.hall}</div></div>`
      +`<div class="meta">${order.length} ${order.length===1?'seat':'seats'}: ${order.map(s=>s.id).join(', ')}</div>`
      +Object.keys(by).map(k=>{ const a=by[k], sum=a.reduce((x,s)=>x+price(s),0); return `<div class="sumrow"><span>${TIERS[k].name}<small>${a.length} x ${money(price(a[0]))}</small></span><span>${money(sum)}</span></div>`; }).join('')
      +`<div class="sumrow"><span>Booking fee<small>${money(FEE)} per seat</small></span><span>${money(t.fee)}</span></div>`
      +(promo?`<div class="sumrow disc"><span>Promo ${promo.code}<small>${promo.pct}% off tickets</small></span><span>−${money(t.disc)}</span></div>`:'')
      +`<div class="sumrow tot"><span>Total</span><span>${money(t.total)}</span></div>`
      +(live?`<div class="hold"><span>Seats held for</span><b id="cTimer">5:00</b></div>`+(extended?'':`<button class="btn btn--ghost sm" type="button" data-act="extend">Need more time? Add 2 minutes</button>`):'');
    let h='';
    if(stage==='review'){
      const nb=neighbours();
      h=`<h2 id="coTitle" tabindex="-1">Review your seats</h2><p class="lede">Check your order before you pay. You can name each guest, remove a seat or add more. Your seats stay held while you decide.</p>
      ${coMsg?`<div class="banner" role="alert">${coMsg}</div>`:''}
      <div class="rv" role="list">${order.map(s=>`<div class="rv__seat" role="listitem"><div class="rv__main"><b>${seatName(s)}</b><span>${TIERS[s.row.tier].name}, ${money(price(s))}</span></div><div class="rv__guest"><label class="sr" for="g-${s.id}">Guest name for ${seatName(s)}</label><input id="g-${s.id}" data-guest="${s.id}" placeholder="Guest name (optional)" autocomplete="off" maxlength="40" value="${esc(guests[s.id]||'')}"></div><button class="rv__x" type="button" data-act="remove" data-id="${s.id}" aria-label="Remove ${seatName(s)}">Remove</button></div>`).join('')}</div>
      <section class="rv__add" aria-labelledby="rvAdd"><h3 id="rvAdd">Add more seats <small>${order.length} of 8</small></h3>
        ${nb.length?`<p>Seats next to yours that are still free:</p><div class="rv__chips">${nb.map(n=>`<button class="chipbtn" type="button" data-act="quick" data-id="${n.id}">+ ${seatName(n)}<small>${money(price(n))}</small></button>`).join('')}</div>`:(order.length>=8?'<p>You have reached the limit of 8 seats for one booking.</p>':'<p>No free seats next to yours. Pick others on the seat map.</p>')}
        ${order.length<8?'<button class="btn btn--ghost" type="button" data-act="more">Choose on the seat map</button>':''}
      </section>
      <div class="field"><label for="cPromo">Promo code <span style="color:var(--dim)">(optional)</span></label>
        ${promo?`<div class="rv__ok"><b>${promo.code}</b> applied, ${promo.pct}% off tickets <button class="linkbtn" type="button" data-act="unpromo">Remove</button></div>`:`<div class="rv__row"><input id="cPromo" autocomplete="off" value="${esc(promoIn)}" placeholder="Enter code"><button class="btn btn--ghost" type="button" data-act="promo">Apply</button></div><small style="color:var(--dim)">Concept build, try OPENING10.</small>`}</div>
      <fieldset class="rv__needs"><legend>Access and notes</legend>
        <label class="chk"><input type="checkbox" data-need="step" ${needs.step?'checked':''}><span>I need step-free access</span></label>
        <label class="chk"><input type="checkbox" data-need="loop" ${needs.loop?'checked':''}><span>I would like a hearing loop seat</span></label>
        <div class="field" style="margin-top:14px"><label for="cNote">Note to the box office <span style="color:var(--dim)">(optional)</span></label><textarea id="cNote" rows="3" maxlength="200" placeholder="For example, a birthday or a seating request">${esc(note)}</textarea></div>
      </fieldset>
      <div class="co__actions"><button class="btn" type="button" data-act="todetails">Continue to details</button><button class="btn btn--ghost" type="button" data-act="back">Back to seats</button></div>`;
    } else if(stage==='details'){
      h=`<h2 id="coTitle" tabindex="-1">Who is booking?</h2><p class="lede">Tell us who the booking is for. We email the invitation and tickets to the address below, and each ticket has its own entry code.</p>
      <form id="coForm" novalidate>
        <div class="field"><label for="cName">Full name</label><input id="cName" autocomplete="name" value="${esc(buyer.name)}" ${coErr.name?'aria-invalid="true" aria-describedby="eName"':''}>${coErr.name?`<span class="err" id="eName">${coErr.name}</span>`:''}</div>
        <div class="field"><label for="cMail">Email</label><input id="cMail" type="email" autocomplete="email" value="${esc(buyer.email)}" ${coErr.email?'aria-invalid="true" aria-describedby="eMail"':''}>${coErr.email?`<span class="err" id="eMail">${coErr.email}</span>`:''}</div>
        <div class="field"><label for="cPhone">Phone <span style="color:var(--dim)">(optional, only for changes on the night)</span></label><input id="cPhone" type="tel" autocomplete="tel" value="${esc(buyer.phone)}"></div>
        <div class="co__actions"><button class="btn" type="submit">Continue to payment</button><button class="btn btn--ghost" type="button" data-act="review">Back to review</button></div>
      </form>`;
    } else if(stage==='pay'){
      const o=(v,b,d)=>`<label class="opt"><input type="radio" name="demo" value="${v}" ${payPick===v?'checked':''}><div><b>${b}</b><span>${d}</span></div></label>`;
      h=`<h2 id="coTitle" tabindex="-1">How would you like to pay?</h2><p class="lede">Booking for ${esc(buyer.name)}. Choose a payment method. This is a concept build, so no real payment is taken and no card details are asked for.</p>
      ${coMsg?`<div class="banner" role="alert">${coMsg}</div>`:''}
      <fieldset style="border:0;padding:0;margin:0"><legend class="sr">Payment method</legend>
      ${o('card','Credit or debit card','Visa, Mastercard and American Express.')}
      ${o('apple','Apple Pay or Google Pay','Pay with the wallet on your phone.')}
      ${o('paypal','PayPal','Pay with your PayPal balance or linked bank.')}
      ${o('bank','Bank transfer','Faster Payments. Your seats stay held while the transfer arrives.')}
      </fieldset>
      <p class="rv__terms">Free cancellation up to 48 hours before the show. After that, tickets can be moved to another date but not refunded.</p>
      <div class="co__actions"><button class="btn" id="coPay" type="button" data-act="pay" ${busy?'disabled':''}>${busy?'Processing payment':'Pay '+money(t.total)+' by '+PAYN[payPick]}</button><button class="btn btn--ghost" type="button" data-act="edit" ${busy?'disabled':''}>Edit details</button></div>`;
    } else if(stage==='sending'){
      h=`<h2 id="coTitle" tabindex="-1">Payment received</h2><p class="lede">Thank you, ${esc(buyer.name)}. We are sending your invitation to ${esc(buyer.email)}.</p><div class="sending" role="status"><i></i><span>Sending email</span></div>`;
    } else if(stage==='expired'){
      h=`<h2 id="coTitle" tabindex="-1">Your hold ran out</h2><p class="lede">The hold ended, so these seats went back on sale. You have not been charged. Pick your seats again and the map will show what is still free.</p>
      <div class="co__actions"><button class="btn" type="button" data-act="back">Back to the seat map</button></div>`;
    } else if(stage==='taken'){
      h=`<h2 id="coTitle" tabindex="-1">A seat was just taken</h2><p class="lede">${seatName(order[0])} sold to someone else a moment before your payment finished. You have not been charged and we released the rest of your seats. Pick another seat and try again.</p>
      <div class="co__actions"><button class="btn" type="button" data-act="back">Back to the seat map</button></div>`;
    } else {
      const nd=needsTxt();
      h=`<h2 id="coTitle" tabindex="-1">You are invited</h2><p class="lede">Booking ${ref}. Show the code at the door, each one works once.</p>
      <div class="sent" role="status"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12l5 5L20 6"/></svg><div><b>Email sent to ${esc(buyer.email)}</b><span>Subject: Your invitation to ${esc(sh.title)}, booking ${ref}. Check your spam folder if it does not arrive in a few minutes.</span></div></div>
      <div class="tix">${order.map(s=>`<article class="tix__card inv"><div><small class="inv__k">Admit one</small><h3>${esc(sh.title)}</h3><dl><dt>When</dt><dd>${sh.date}, ${sh.time}</dd><dt>Where</dt><dd>${sh.hall}</dd><dt>Seat</dt><dd>${seatName(s)}</dd><dt>Tier</dt><dd>${TIERS[s.row.tier].name}</dd><dt>Guest</dt><dd>${esc(guestOf(s))}</dd></dl></div>${makeQR(ref+s.id)}</article>`).join('')}</div>
      <section class="rcpt" aria-labelledby="rcptT"><h3 id="rcptT">Receipt</h3><dl>
        <dt>Booking</dt><dd>${ref}</dd><dt>Booked by</dt><dd>${esc(buyer.name)}</dd><dt>Paid with</dt><dd>${PAYN[paidWith]||'card'}</dd>
        <dt>Seats</dt><dd>${order.map(s=>s.id).join(', ')}</dd><dt>Tickets</dt><dd>${money(t.sub)}</dd><dt>Booking fee</dt><dd>${money(t.fee)}</dd>
        ${promo?`<dt>Promo ${promo.code}</dt><dd>−${money(t.disc)}</dd>`:''}<dt>Total paid</dt><dd><b>${money(t.total)}</b></dd>
        ${nd?`<dt>Access</dt><dd>${nd}</dd>`:''}${note.trim()?`<dt>Note</dt><dd>${esc(note.trim())}</dd>`:''}
      </dl></section>
      <div class="co__actions"><a class="btn" href="${icsHref()}" download="theateria-${ref}.ics">Add to calendar</a><button class="btn btn--ghost" type="button" onclick="window.print()">Print tickets</button><button class="btn btn--ghost" type="button" data-act="back">Done</button></div>`;
    }
    coMain.innerHTML=h; if(live) tick();
    if(focus||stage==='done'||stage==='expired'||stage==='taken'){ const f=$('#coTitle'); if(f) f.focus({preventScroll:true}); }
  }
  coMain.addEventListener('submit',e=>{
    e.preventDefault(); if(stage!=='details') return;
    buyer.name=$('#cName').value.trim(); buyer.email=$('#cMail').value.trim(); buyer.phone=($('#cPhone')||{value:''}).value.trim(); coErr={};
    if(buyer.name.length<2) coErr.name='Enter the name for the booking.';
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(buyer.email)) coErr.email='Enter an email like name@example.com.';
    if(coErr.name||coErr.email){ renderCo(); const b=$(coErr.name?'#cName':'#cMail'); if(b) b.focus(); return; }
    stage='pay'; coMsg=''; renderCo(true);
  });
  coMain.addEventListener('input',e=>{ const t=e.target; if(t.dataset&&t.dataset.guest) guests[t.dataset.guest]=t.value; else if(t.id==='cNote') note=t.value; else if(t.id==='cPromo') promoIn=t.value; });
  coMain.addEventListener('change',e=>{ const t=e.target; if(t.name==='demo') payPick=t.value; else if(t.dataset&&t.dataset.need) needs[t.dataset.need]=t.checked; });
  function applyPromo(){ const c=promoIn.trim().toUpperCase(); if(!c){ coMsg='Enter a promo code first.'; promo=null; } else if(PROMOS[c]){ promo={code:c,pct:PROMOS[c]}; coMsg=''; } else { promo=null; coMsg='That code is not valid for this show.'; } renderCo(); if(!promo){ const i=$('#cPromo'); if(i) i.focus(); } }
  coMain.addEventListener('keydown',e=>{ if(e.key!=='Enter') return; if(e.target.id==='cPromo'){ e.preventDefault(); applyPromo(); } else if(e.target.dataset&&e.target.dataset.guest) e.preventDefault(); });
  function removeSeat(id){
    if(order.length<=1){ coMsg='A booking needs at least one seat. Go back to the seat map to release your seats.'; renderCo(); return; }
    const next=new Set(sel); next.delete(id); const o=findOrphan(next);
    if(o){ coMsg=`Removing ${seatName(byId[id])} would leave a single empty seat at ${o}. Remove a seat from the end of your group instead.`; renderCo(); return; }
    sel.delete(id); order=order.filter(s=>s.id!==id); delete guests[id]; coMsg=''; render(); renderCo();
    const b=$('#coTitle'); if(b) b.focus({preventScroll:true});
  }
  function quickAdd(id){
    if(order.length>=8){ coMsg='You can choose up to 8 seats.'; renderCo(); return; }
    const next=new Set(sel); next.add(id); const o=findOrphan(next);
    if(o){ coMsg=`Adding ${seatName(byId[id])} would leave a single empty seat at ${o}. Choose a different seat.`; renderCo(); return; }
    sel.add(id); order.push(byId[id]); coMsg=''; render(); renderCo();
  }
  function onAct(e){
    const a=e.target.closest('[data-act]'); if(!a) return; const act=a.dataset.act;
    if(act==='back') closeCheckout();
    else if(act==='review'){ stage='review'; coMsg=''; renderCo(true); }
    else if(act==='todetails'){ stage='details'; coMsg=''; renderCo(true); }
    else if(act==='edit'){ stage='details'; coMsg=''; renderCo(true); }
    else if(act==='remove') removeSeat(a.dataset.id);
    else if(act==='quick') quickAdd(a.dataset.id);
    else if(act==='promo') applyPromo();
    else if(act==='unpromo'){ promo=null; promoIn=''; coMsg=''; renderCo(); }
    else if(act==='extend'){ if(!extended&&holdEnd>Date.now()){ holdEnd+=2*60*1000; extended=true; renderCo(); toast('Two minutes added to your hold'); } }
    else if(act==='more'){
      closeCheckout(); mine=false; render();
      const m=$('#msg'); if(m) m.textContent='Choose more seats, then review your order again. Your hold keeps running.';
      const sec=$('#seats'); if(sec) sec.scrollIntoView({behavior:RM?'auto':'smooth',block:'start'});
    }
    else if(act==='pay'){
      busy=true; coMsg=''; renderCo();
      setTimeout(()=>{
        busy=false; if(!coOpen||stage!=='pay') return;
        ref='TH-'+Math.random().toString(36).slice(2,8).toUpperCase(); paidWith=payPick;
        order.forEach(s=>s.state='sold'); clearInterval(holdTimer); holdEnd=0; extended=false; mine=false; sel.clear(); stage='sending'; render(); renderCo(true);
        setTimeout(()=>{ if(!coOpen||stage!=='sending') return; stage='done'; renderCo(true); toast('Invitation sent to '+buyer.email); },1600);
      },1300);
    }
  }
  coMain.addEventListener('click',onAct); coSum.addEventListener('click',onAct);
  $('#coClose').onclick=closeCheckout;
  document.addEventListener('keydown',e=>{
    if(!coOpen||v3Open) return;
    if(e.key==='Escape'){ closeCheckout(); return; }
    if(e.key==='Tab'){ const f=[...co.querySelectorAll('button,a[href],input,[tabindex="0"]')].filter(x=>!x.disabled&&x.offsetParent!==null); if(!f.length) return; const a=f[0], b=f[f.length-1]; if(e.shiftKey&&document.activeElement===a){e.preventDefault();b.focus();} else if(!e.shiftKey&&document.activeElement===b){e.preventDefault();a.focus();} }
  });

  /* 3D view from seat */
  let v3Open=false, V=null, v3Last=null, v3Seat=null;
  const v3=$('#v3'), v3c=$('#v3c');
  const loadThree=()=>window.THREE?Promise.resolve():new Promise((ok,no)=>{ const sc=document.createElement('script'); sc.src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'; sc.onload=ok; sc.onerror=no; document.head.appendChild(sc); });
  const GAPZ=0.9;
  const gapBefore=ri=>(ri===2||ri===5)?GAPZ:0;
  function seatXYZ(s){
    const ri=rows.indexOf(s.row), i=s.n-1;
    let z=2.4+ri*1.0; for(let k=0;k<=ri;k++) z+=gapBefore(k);
    return {x:(i-4.5)*0.62+(i<5?-0.32:0.32), y:ri*0.22, z};
  }
  function buildScene(){
    const T=THREE, scene=new T.Scene(); scene.background=new T.Color(0x15110F); scene.fog=new T.Fog(0x15110F,16,40);
    const M=(c,o)=>new T.MeshStandardMaterial(Object.assign({color:c,roughness:.85,metalness:0},o||{}));
    const B=(w,h,d)=>new T.BoxGeometry(w,h,d);
    const add=(g,m,x,y,z)=>{ const o=new T.Mesh(g,m); o.position.set(x,y,z); scene.add(o); return o; };
    const GOLD=M(0xC9A24B,{roughness:.4,metalness:.6,emissive:0x2a1d05}), RED=M(0x8E2A20), WOOD=M(0x6B4A2E,{roughness:.6}), DARK=M(0x2B1C16);
    scene.add(new T.HemisphereLight(0xffe2b8,0x1a0f0b,.32));
    const spot=new T.SpotLight(0xffd9a0,1.5,32,.5,.6,1); spot.position.set(0,9,3); spot.target.position.set(0,1.2,-2.2); scene.add(spot,spot.target);
    const l1=new T.PointLight(0xffc27a,.28,34); l1.position.set(0,7.5,7); scene.add(l1);
    const l2=new T.PointLight(0xffc27a,.5,26); l2.position.set(0,6,-1.5); scene.add(l2);
    /* risers and aisle */
    rows.forEach((r,ri)=>{ const p=seatXYZ(r.seats[0]), extra=gapBefore(ri), h=p.y+.06, d=1.0+extra;
      add(B(14,h,d),DARK,0,h/2,p.z-extra/2); add(B(.9,.03,d),M(0x5a1a14),0,h+.015,p.z-extra/2); });
    add(B(14,.1,6),DARK,0,-.05,-1.2);
    /* room */
    add(B(.3,10,24),M(0x241711),-7.2,5,3); add(B(.3,10,24),M(0x241711),7.2,5,3);
    add(B(15,10,.3),M(0x241711),0,5,14.6); add(B(15,.3,26),M(0x1a110d),0,9.6,2);
    for(let i=0;i<7;i++){ [-1,1].forEach(sd=>{ add(B(.12,6.4,.2),GOLD,sd*7.0,4,-1+i*2.8); add(B(.22,.3,.22),new T.MeshBasicMaterial({color:0xffd9a0}),sd*6.9,3.4,.3+i*2.8); }); }
    add(B(15,.45,4),DARK,0,4.6,12.4); add(B(15,.14,.14),GOLD,0,5.5,10.4); add(B(15,.5,.2),RED,0,4.9,10.4);
    /* stage and proscenium */
    add(B(10,1.0,5.5),WOOD,0,.5,-3.2); add(B(10.4,.16,.12),GOLD,0,1.0,-.42);
    add(B(11.8,.9,.6),GOLD,0,6.4,-.6); [-1,1].forEach(sd=>add(B(.7,6.8,.6),GOLD,sd*5.6,3.4,-.6));
    add(B(10.5,.9,.5),RED,0,5.5,-.5); add(B(10.5,.07,.52),GOLD,0,5.02,-.5);
    for(let i=0;i<7;i++){ [-1,1].forEach(sd=>add(new T.CylinderGeometry(.19,.19,4.9,10),M(i%2?0x8E2A20:0x742018),sd*(4.1+i*.2),3.45,-.8)); }
    for(let i=0;i<29;i++) add(new T.CylinderGeometry(.2,.2,5.6,10),M(i%2?0x7A2219:0x92291F),-5.6+i*.4,3.8,-5.8);
    add(B(.9,.25,.9),WOOD,0,1.12,-1.7); add(new T.CylinderGeometry(.2,.26,1.0,12),M(0x0d0b0a),0,1.75,-1.7); add(new T.SphereGeometry(.16,14,12),M(0x0d0b0a),0,2.38,-1.7);
    /* seats */
    const all3=rows.flatMap(r=>r.seats), n=all3.length, dm=new T.Object3D();
    const cush=new T.InstancedMesh(B(.52,.14,.5),M(0xffffff),n), back=new T.InstancedMesh(B(.52,.62,.09),M(0xffffff),n);
    all3.forEach((s,i)=>{ const p=seatXYZ(s); dm.rotation.set(0,0,0); dm.position.set(p.x,p.y+.38,p.z); dm.updateMatrix(); cush.setMatrixAt(i,dm.matrix); dm.position.set(p.x,p.y+.72,p.z+.22); dm.updateMatrix(); back.setMatrixAt(i,dm.matrix); });
    scene.add(cush,back);
    const cT={vvip:0xA8331F,vip:0x8E2A20,reg:0x6F2219}, col=new T.Color();
    function paint(){ all3.forEach((s,i)=>{ col.setHex(sel.has(s.id)?0xE0452F:cT[s.row.tier]); cush.setColorAt(i,col); back.setColorAt(i,col); }); cush.instanceColor.needsUpdate=true; back.instanceColor.needsUpdate=true; }
    let people=null;
    function rebuildPeople(){
      if(people){ scene.remove(people.bd,people.hd); people.bd.dispose(); people.hd.dispose(); }
      const sold=all3.filter(s=>s.state==='sold'), bd=new T.InstancedMesh(B(.38,.5,.26),M(0x241c19),sold.length), hd=new T.InstancedMesh(new T.SphereGeometry(.12,10,8),M(0x2f2420),sold.length);
      sold.forEach((s,i)=>{ const p=seatXYZ(s), j=((i*37)%7-3)*.012; dm.position.set(p.x+j,p.y+.76,p.z+.08); dm.updateMatrix(); bd.setMatrixAt(i,dm.matrix); dm.position.set(p.x+j,p.y+1.12,p.z+.08); dm.updateMatrix(); hd.setMatrixAt(i,dm.matrix); });
      scene.add(bd,hd); people={bd,hd};
    }
    const renderer=new T.WebGLRenderer({canvas:v3c,antialias:true}); renderer.setPixelRatio(Math.min(devicePixelRatio||1,2)); renderer.outputEncoding=T.sRGBEncoding; renderer.toneMapping=T.ACESFilmicToneMapping; renderer.toneMappingExposure=.95; renderer.xr.enabled=true; renderer.xr.setReferenceSpaceType('local');
    const camera=new T.PerspectiveCamera(72,1,.05,80), rig=new T.Group(); rig.add(camera); scene.add(rig); camera.rotation.order='YXZ';
    const sphere=new T.Mesh(new T.SphereGeometry(40,64,40).scale(-1,1,1),new T.MeshBasicMaterial({color:0xffffff,fog:false,toneMapped:false})); sphere.rotation.y=-Math.PI/2; sphere.userData.pano=true; sphere.visible=false; scene.add(sphere);
    function setPano(on){ scene.children.forEach(c=>{ if(c.isMesh&&!c.userData.pano) c.visible=!on; }); sphere.visible=on; }
    return {T,scene,renderer,camera,rig,paint,rebuildPeople,sphere,setPano};
  }
  const look={yaw:0,pitch:0,yawT:0,pitchT:0,fov:72,target:null,hlim:null,vlim:null};
  function fit(){ if(!V) return; const w=v3.clientWidth||innerWidth, h=v3.clientHeight||innerHeight; V.renderer.setSize(w,h,false); V.camera.aspect=w/h; V.camera.updateProjectionMatrix(); }
  function v3frame(){
    const V0=V; if(!V0) return;
    const p=V0.rig.position, t=look.target; if(t){ p.lerp(t,.14); }
    V0.sphere.position.copy(p);
    look.yaw+=(look.yawT-look.yaw)*.14; look.pitch+=(look.pitchT-look.pitch)*.14;
    if(look.hlim){ const vf=V0.camera.fov*Math.PI/180, hf=2*Math.atan(Math.tan(vf/2)*V0.camera.aspect), ym=Math.max(0,(look.hlim-hf)/2), pm=Math.max(0,(look.vlim-vf)/2), cl=(v,m)=>Math.max(-m,Math.min(m,v)); look.yawT=cl(look.yawT,ym); look.yaw=cl(look.yaw,ym); look.pitchT=cl(look.pitchT,pm); look.pitch=cl(look.pitch,pm); }
    V0.camera.rotation.set(look.pitch,look.yaw,0,'YXZ');
    if(Math.abs(V0.camera.fov-look.fov)>.1){ V0.camera.fov+=(look.fov-V0.camera.fov)*.2; V0.camera.updateProjectionMatrix(); }
    V0.renderer.render(V0.scene,V0.camera);
  }
  function nbr(s,dr,di){ const ri=rows.indexOf(s.row)+dr, r=rows[ri]; if(!r) return null; const i=s.n-1+di; return r.seats[i]||null; }
  const panoKey=s=>(s.row.letter<='B'?'front':(s.row.letter<='E'?'mid':'back'))+'-'+(s.n<=3?'L':(s.n>=8?'R':'C'));
  function panoRef(key){ const [g,sd]=key.split('-'), ri={front:1,mid:3,back:7}[g], base=seatXYZ(rows[ri].seats[4]); return {x:sd==='C'?0:seatXYZ(rows[ri].seats[sd==='L'?1:8]).x, y:base.y, z:base.z}; }
  const panoTex={}; let panoCur=null;
  function loadPano(url){ return new Promise((ok,no)=>{ if(panoTex[url]) return ok(panoTex[url]); new V.T.TextureLoader().load(url,t=>{ t.encoding=V.T.sRGBEncoding; t.minFilter=V.T.LinearFilter; t.generateMipmaps=false; panoTex[url]=t; ok(t); },undefined,no); }); }
  function aim(p,ey,instant){
    const dz=2.5+p.z, dist=Math.hypot(p.x,dz);
    look.yawT=Math.atan2(p.x,dz); look.pitchT=Math.atan2(1.8-ey,dist)*.9; if(instant){ look.yaw=look.yawT; look.pitch=look.pitchT; }
  }
  function useRoom(s,instant){
    look.hlim=null; V.setPano(false); panoCur=null; const p=seatXYZ(s), ey=p.y+1.2;
    look.target=new V.T.Vector3(p.x,ey,p.z+.05); if(instant||!look.target) V.rig.position.copy(look.target);
    aim(p,ey,instant);
  }
  const VIEWS=window.THEATERIA_VIEWS||{center:{url:'/views/center.jpg',h:170,v:95},side:{url:'/views/side.jpg',h:200,v:100},top:{url:'/views/top.jpg',h:170,v:95}};
  let vmode='front';
  const viewFor=s=>vmode==='top'?{k:'top',mirror:false}:(vmode==='side'?{k:'side',mirror:s.n>5}:{k:'center',mirror:false});
  function usePano(s,instant){
    const vw=viewFor(s), cfg=VIEWS[vw.k];
    if(!cfg||!cfg.url){ look.hlim=null; useRoom(s,instant); return; }
    loadPano(cfg.url).then(t=>{
      if(v3Seat!==s||!v3Open) return;
      const T=V.T, H=cfg.h*Math.PI/180, VV=cfg.v*Math.PI/180;
      V.sphere.geometry.dispose(); V.sphere.geometry=new T.SphereGeometry(40,64,40,1.5*Math.PI-H/2,H,Math.PI/2-VV/2,VV).scale(-1,1,1);
      t.wrapS=T.RepeatWrapping; t.repeat.x=vw.mirror?-1:1; t.offset.x=vw.mirror?1:0;
      V.sphere.material.map=t; V.sphere.material.needsUpdate=true; V.sphere.rotation.y=0; V.setPano(true);
      const p=seatXYZ(s); look.target=new T.Vector3(p.x,p.y+1.2,p.z+.05); V.rig.position.copy(look.target);
      const key=vw.k+(vw.mirror?'m':''); if(key!==panoCur||instant){ look.yawT=look.yaw=0; look.pitchT=look.pitch=0; } panoCur=key;
      look.hlim=H; look.vlim=VV;
      $('#v3Sub').textContent+=vmode==='top'?'. View from the top.':(vmode==='side'?'. View from the side.':'. View from the front.');
    }).catch(()=>{ look.hlim=null; useRoom(s,instant); });
  }
  function setSeat(s,instant){
    v3Seat=s; setFocus(s); const p=seatXYZ(s);
    $('#v3Title').textContent=`Row ${s.row.letter}, seat ${s.n}`;
    $('#v3Sub').textContent=`${TIERS[s.row.tier].name}, ${gbp(price(s))}, about ${Math.max(1,Math.round(Math.hypot(p.x,p.z+.45)))} m from the stage`;
    syncPick(); usePano(s,instant);
  }
  function syncPick(){
    const s=v3Seat, b=$('#v3pick'); if(!s) return; V.paint();
    if(s.state==='sold'){ b.disabled=true; b.textContent='Sold'; }
    else if(s.state==='held'){ b.disabled=true; b.textContent='Held by someone'; }
    else if(mine){ b.disabled=true; b.textContent='Your seats are on hold'; }
    else { b.disabled=false; b.textContent=sel.has(s.id)?'Remove this seat':'Choose this seat'; }
  }
  async function openV3(s){
    if(v3Open) return; v3Open=true; vmode='front'; $$('.vbtn').forEach(b=>b.classList.toggle('is-on',b.dataset.v==='front')); v3Last=document.activeElement; v3.hidden=false; $('#v3load').hidden=false; $('#v3load').textContent='Loading the theatre'; $('#v3msg').textContent='';
    document.body.style.overflow='hidden'; if(lenis) lenis.stop();
    try{ await loadThree(); }catch(e){ $('#v3load').textContent='The 3D view could not load. Close this and try again.'; $('#v3Close').focus(); return; }
    if(!v3Open) return;
    try{ if(!V) V=buildScene(); }catch(e){ $('#v3load').textContent='Your browser could not start 3D graphics.'; $('#v3Close').focus(); return; }
    V.rebuildPeople(); fit(); setSeat(s,true); look.fov=72; V.camera.fov=72; V.camera.updateProjectionMatrix();
    $('#v3load').hidden=true; V.renderer.setAnimationLoop(v3frame); $('#v3Close').focus();
    if(navigator.xr&&navigator.xr.isSessionSupported) navigator.xr.isSessionSupported('immersive-vr').then(ok=>{ $('#v3vr').hidden=!ok; }).catch(()=>{});
  }
  function closeV3(){
    if(!v3Open) return; v3Open=false; v3.hidden=true;
    if(V){ V.renderer.setAnimationLoop(null); const ss=V.renderer.xr.getSession&&V.renderer.xr.getSession(); if(ss) ss.end().catch(()=>{}); }
    if(!inModal&&!coOpen){ document.body.style.overflow=''; if(lenis) lenis.start(); }
    render(); if(v3Last&&v3Last.focus) v3Last.focus();
  }
  $('#v3Close').onclick=closeV3;
  $$('.vbtn').forEach(b=>b.addEventListener('click',()=>{ vmode=b.dataset.v; $$('.vbtn').forEach(x=>x.classList.toggle('is-on',x===b)); setSeat(v3Seat,true); }));
  $('#v3pick').onclick=()=>{ toggle(v3Seat); $('#v3msg').textContent=$('#msg').textContent||''; syncPick(); };
  $('#v3vr').onclick=()=>{ navigator.xr.requestSession('immersive-vr').then(ss=>V.renderer.xr.setSession(ss)).catch(()=>{ $('#v3msg').textContent='VR could not start on this device.'; }); };
  let d3=null;
  v3c.addEventListener('pointerdown',e=>{ d3={x:e.clientX,y:e.clientY}; v3c.setPointerCapture(e.pointerId); });
  v3c.addEventListener('pointermove',e=>{ if(!d3) return; const dx=e.clientX-d3.x, dy=e.clientY-d3.y; d3={x:e.clientX,y:e.clientY}; const k=look.fov/72*.0048; look.yawT-=dx*k; look.pitchT=Math.max(-.95,Math.min(.75,look.pitchT-dy*k)); look.yaw=look.yawT; look.pitch=look.pitchT; });
  v3c.addEventListener('pointerup',()=>{ d3=null; }); v3c.addEventListener('pointercancel',()=>{ d3=null; });
  v3c.addEventListener('wheel',e=>{ e.preventDefault(); look.fov=Math.max(35,Math.min(95,look.fov+e.deltaY*.04)); },{passive:false});
  addEventListener('resize',()=>{ if(v3Open) fit(); });
  document.addEventListener('keydown',e=>{
    if(!v3Open) return;
    if(e.key==='Escape'){ e.stopPropagation(); closeV3(); return; }
    const k={ArrowLeft:[-.1,0],ArrowRight:[.1,0],ArrowUp:[0,.08],ArrowDown:[0,-.08]}[e.key];
    if(k&&!/^(BUTTON)$/.test(document.activeElement.tagName)){ e.preventDefault(); look.yawT+=k[0]; look.pitchT=Math.max(-.95,Math.min(.75,look.pitchT+k[1])); return; }
    if(e.key==='Tab'){ const f=[...v3.querySelectorAll('button')].filter(x=>!x.disabled&&x.offsetParent!==null); if(!f.length) return; const a=f[0], b=f[f.length-1]; if(e.shiftKey&&document.activeElement===a){e.preventDefault();b.focus();} else if(!e.shiftKey&&document.activeElement===b){e.preventDefault();a.focus();} }
  },true);
  $('#see3d').onclick=()=>openV3(cur); $('#mview').onclick=()=>openV3(cur);

  /* guide renders: equirectangular images from the 3D room, used as reference for the 360 photos */
  window.__v3pano=async(key,w)=>{
    await loadThree(); if(!V) V=buildScene(); V.rebuildPeople(); V.paint(); V.setPano(false);
    const T=THREE, W=w||4096, H=W/2, S=1024, r=panoRef(key), eye=new T.Vector3(r.x,r.y+1.2,r.z);
    const rend=new T.WebGLRenderer({antialias:true,preserveDrawingBuffer:true}); rend.setSize(S,S); rend.outputEncoding=T.sRGBEncoding; rend.toneMapping=T.ACESFilmicToneMapping; rend.toneMappingExposure=.95;
    const cam=new T.PerspectiveCamera(90,1,.05,80); cam.position.copy(eye);
    const cv=document.createElement('canvas'); cv.width=cv.height=S; const cx=cv.getContext('2d',{willReadFrequently:true});
    const defs=[[0,0,-1,0,1,0],[1,0,0,0,1,0],[0,0,1,0,1,0],[-1,0,0,0,1,0],[0,1,0,0,0,1],[0,-1,0,0,0,-1]], faces=[];
    defs.forEach(d=>{ const f=new T.Vector3(d[0],d[1],d[2]), u=new T.Vector3(d[3],d[4],d[5]); cam.up.copy(u); cam.lookAt(eye.clone().add(f)); cam.updateMatrixWorld(); rend.render(V.scene,cam); cx.clearRect(0,0,S,S); cx.drawImage(rend.domElement,0,0); faces.push({f,u,rt:new T.Vector3().crossVectors(f,u),px:cx.getImageData(0,0,S,S).data}); });
    const out=document.createElement('canvas'); out.width=W; out.height=H; const oc=out.getContext('2d'), img=oc.createImageData(W,H), od=img.data, d=new T.Vector3();
    for(let y=0;y<H;y++){ const lat=(.5-(y+.5)/H)*Math.PI, cl=Math.cos(lat), sl=Math.sin(lat);
      for(let x=0;x<W;x++){ const lon=((x+.5)/W-.5)*2*Math.PI; d.set(Math.sin(lon)*cl,sl,-Math.cos(lon)*cl);
        let bf=faces[0],bd=-9; for(const fc of faces){ const t=fc.f.dot(d); if(t>bd){bd=t;bf=fc;} }
        const fx=bf.rt.dot(d)/bd, fy=bf.u.dot(d)/bd; let px=Math.min(S-1,Math.max(0,Math.floor((fx+1)/2*S))), py=Math.min(S-1,Math.max(0,Math.floor((1-fy)/2*S)));
        const si=(py*S+px)*4, di=(y*W+x)*4; od[di]=bf.px[si]; od[di+1]=bf.px[si+1]; od[di+2]=bf.px[si+2]; od[di+3]=255; } }
    oc.putImageData(img,0,0); rend.dispose(); return out.toDataURL('image/jpeg',.92);
  };

  seedShow(0); render(); applyView();
  window.__pickShow=i=>{ sSel.value=String(i); sSel.dispatchEvent(new Event('change')); };

  /* stand-in photo turns into outline as you scroll */
  if(!RM){
    svg.style.setProperty('--draw',0); svg.style.setProperty('--photo',1);
    ScrollTrigger.create({trigger:'#mapHome',start:'top 88%',end:'top 30%',scrub:true,onUpdate:s=>{ svg.style.setProperty('--draw',s.progress.toFixed(3)); svg.style.setProperty('--photo',(1-s.progress*.92).toFixed(3)); }});
  } else { svg.style.setProperty('--photo',.1); }
})();

/* ---------- schedule ring ---------- */
(function(){
  const ring=$('#ring');
  ring.innerHTML=SHOWS.map((s,i)=>`<article class="pcard" style="--i:${i}"><img class="pcard__img" src="${s.img}" alt="" loading="lazy" decoding="async" style="object-position:${s.pos}"><svg viewBox="0 0 36 36" aria-hidden="true">${s.icon}</svg><small>${s.kind}</small><h3>${s.title}</h3><div class="when">${s.date}, ${s.time}</div><div class="where">${s.hall}</div></article>`).join('');
  const st={base:0,manual:0,t:0};
  let front=0;
  function apply(){
    const a=st.base+st.manual+st.t;
    gsap.set(ring,{rotationY:-a});
    const idx=((Math.round(a/60)%6)+6)%6;
    if(idx!==front||!$('#now').innerHTML){ front=idx; const s=SHOWS[idx]; $('#now').innerHTML=`<b>${s.title}</b><span>${s.kind}, ${s.date} at ${s.time}, ${s.hall}</span>`; }
  }
  apply();
  ScrollTrigger.create({trigger:'#schedule',start:'top bottom',end:'bottom top',scrub:true,onUpdate:s=>{ st.base=s.progress*360; apply(); }});
  const move=d=>gsap.to(st,{manual:'+='+d,duration:.9,ease:'power3.out',onUpdate:apply});
  $('#prev').onclick=()=>move(-60); $('#next').onclick=()=>move(60);
  $('#nowBook').onclick=()=>{ window.__pickShow(front); go('#seats'); };
  if(!RM){
    const spin=gsap.to('#coin',{rotationY:360,duration:14,ease:'none',repeat:-1});
    // drag to rotate
    const box=$('#ring3d'); let dx=null;
    box.addEventListener('pointerdown',e=>{dx=e.clientX;});
    addEventListener('pointerup',e=>{ if(dx===null) return; const d=e.clientX-dx; dx=null; if(Math.abs(d)>40) move(d<0?60:-60); });
  } else { gsap.set('#coin',{rotationY:20}); }
})();

/* ---------- gallery ---------- */
(function(){
  const seatsRow=(y,n,x0,dx,fill)=>Array.from({length:n},(_,i)=>`<rect x="${x0+i*dx}" y="${y}" width="${dx-10}" height="30" rx="9" fill="${fill}"/>`).join('');
  const T=[
    {c:7,r:5,t:'Curtain up',img:'/img/hero-k3.jpg',pos:'50% 50%',alt:'The red velvet curtain opens on dancers while the conductor leads the orchestra',bg:'#E3D9CB',art:`<path d="M100 210V84Q100 36 200 36Q300 36 300 84V210Z" fill="#2A211C"/><path d="M120 210V90Q120 54 200 54Q280 54 280 90V210Z" fill="#A3352B"/><path d="M200 54V210" stroke="#7a2a22" stroke-width="3"/><path d="M70 214H330" stroke="#A27E2A" stroke-width="4"/><path d="M130 214L170 130H230L270 214Z" fill="#C9A24B" opacity=".35"/>${seatsRow(238,8,16,48,'#2A211C')}${seatsRow(272,8,40,48,'#3a2d26')}`},
    {c:5,r:3,t:'From the wings',img:'/img/about.jpg',pos:'50% 38%',alt:'The auditorium seen from the side of the stage, with ushers and the orchestra getting ready',bg:'#DCCBC4',art:`<path d="M200 0V34" stroke="#2A211C" stroke-width="3"/><circle cx="200" cy="58" r="24" fill="none" stroke="#A27E2A" stroke-width="3"/><path d="M176 58h48M200 34v48" stroke="#A27E2A" stroke-width="2"/><rect x="50" y="250" width="300" height="30" fill="#2A211C"/><rect x="90" y="220" width="260" height="30" fill="#3a2d26"/><rect x="130" y="190" width="220" height="30" fill="#2A211C"/><rect x="170" y="160" width="180" height="30" fill="#3a2d26"/><path d="M50 250H350M90 220H350M130 190H350M170 160H350" stroke="#C9A24B" stroke-width="2"/>`},
    {c:5,r:2,t:'The orchestra pit',img:'/img/gal-3.jpg',pos:'50% 38%',alt:'A violinist in the foreground, the conductor at the centre and the gold balconies behind',bg:'#D3D6CF',art:`<ellipse cx="200" cy="190" rx="170" ry="60" fill="#2A211C"/>${Array.from({length:9},(_,i)=>`<circle cx="${70+i*32}" cy="${170+(i%2)*22}" r="10" fill="#D3D6CF" opacity=".85"/><path d="M${80+i*32} ${150+(i%2)*22}v-26" stroke="#C9A24B" stroke-width="2"/>`).join('')}`},
    {c:4,r:3,t:'The wardrobe',img:'/img/event-2.jpg',pos:'50% 40%',alt:'A soprano in a cream period gown waits among costumes, masks and stage ropes',bg:'#E0D4BE',art:`<path d="M30 70H370" stroke="#2A211C" stroke-width="4"/>${[['#A3352B',60],['#2A211C',130],['#8A6A1E',200],['#A3352B',270],['#3a2d26',335]].map(([f,x])=>`<path d="M${x} 70v14M${x-24} 250Q${x} 90 ${x+24} 250Z" fill="${f}"/>`).join('')}`},
    {c:4,r:3,t:'The conductor',img:'/img/hero-m-k1.jpg',pos:'50% 55%',alt:'The conductor mid beat in front of the closed curtain',bg:'#D9D3CA',art:`<rect x="70" y="40" width="260" height="170" fill="#2A211C"/><path d="M110 210V110Q110 78 200 78Q290 78 290 110V210Z" fill="#E9E3D9"/><rect x="60" y="210" width="280" height="22" fill="#A3352B"/><rect x="170" y="150" width="70" height="30" rx="4" fill="#C9A24B"/><path d="M205 150v30" stroke="#2A211C" stroke-dasharray="4 4"/>`},
    {c:4,r:3,t:'In the wings',img:'/img/hero-m-k3.jpg',pos:'50% 62%',alt:'Dancers seen through the open curtain behind the conductor',bg:'#CDBFB3',art:`<g fill="#2A211C"><rect x="0" y="170" width="60" height="130"/><rect x="60" y="130" width="50" height="170"/><rect x="110" y="190" width="70" height="110"/><rect x="180" y="110" width="44" height="190"/><rect x="224" y="160" width="70" height="140"/><rect x="294" y="140" width="52" height="160"/><rect x="346" y="190" width="54" height="110"/></g><path d="M0 60Q100 110 200 60T400 60" fill="none" stroke="#2A211C" stroke-width="2"/>${Array.from({length:9},(_,i)=>`<circle cx="${22+i*44}" cy="${(i%2?86:78)}" r="6" fill="#C9A24B"/>`).join('')}`}
  ];
  $('#gal').innerHTML=T.map(x=>`<figure class="tile${x.c/x.r>2?' tile--wide':''}" style="--c:${x.c};--r:${x.r};--tb:${x.bg}"><img src="${x.img}" alt="${x.alt}" loading="lazy" decoding="async" style="object-position:${x.pos}"></figure>`).join('');
})();

/* ---------- events ---------- */
(function(){
  const stack=$('#stack');
  stack.innerHTML=EVENTS.map((e,i)=>`<article class="ev" style="--i:${i}"><img class="ev__bg" src="${e.img}" alt="${e.alt}" loading="lazy" decoding="async"><div class="ev__glass"><span class="ev__date">${e.date}</span><h3>${e.title}</h3><p>${e.text}</p><div class="ev__foot"><b>${e.price}</b><a class="btn btn--ghost" href="#seats" data-go>Reserve a place</a></div></div></article>`).join('');
})();

/* ---------- section animations ---------- */
(function(){
  if(RM) return;
  const once=(trigger,start)=>({trigger,start:start||'top 85%',once:true});
  (function(){
    const big=$('#aboutBig'); if(!big) return;
    const txt=big.textContent; big.setAttribute('aria-label',txt);
    big.innerHTML=txt.split(' ').map(w=>'<span class="w" aria-hidden="true">'+w+' </span>').join('');
    if(RM) return;
    const ws=$$('.w',big);
    gsap.fromTo(ws,{autoAlpha:0,filter:'blur(14px)',y:34},{autoAlpha:1,filter:'blur(0px)',y:0,ease:'none',stagger:.12,scrollTrigger:{trigger:big,start:'top 82%',end:'bottom 48%',scrub:.5}});
    gsap.to(ws,{autoAlpha:.12,filter:'blur(9px)',y:-40,ease:'none',stagger:.05,scrollTrigger:{trigger:'.about__art',start:'top 40%',end:'bottom top',scrub:.5,immediateRender:false}});
    gsap.from('.about__text > *',{y:30,autoAlpha:0,duration:.9,ease:'power3.out',stagger:.12,scrollTrigger:once('.about__text','top 85%')});
    gsap.fromTo('.about__art',{autoAlpha:0,y:60,filter:'blur(6px)'},{autoAlpha:1,y:0,filter:'blur(0px)',ease:'none',scrollTrigger:{trigger:'.about__art',start:'top 95%',end:'top 65%',scrub:.5}});
  })();
  $$('.facts b').forEach(b=>{ const m=b.textContent.match(/^(\d+)(.*)$/); if(!m) return; const n=+m[1], suf=m[2], o={v:0}; b.textContent='0'+suf;
    ScrollTrigger.create({trigger:b,start:'top 92%',once:true,onEnter:()=>gsap.to(o,{v:n,duration:1.4,ease:'power2.out',onUpdate:()=>{b.textContent=Math.round(o.v)+suf;}})}); });
  gsap.from('.seats .mapframe',{y:50,autoAlpha:0,duration:1,ease:'power3.out',clearProps:'transform,opacity,visibility',scrollTrigger:once('.seats','top 65%')});
  $$('.tile').forEach((t,i)=>{ const st=once(t,'top 92%'), img=$('img,svg',t);
    gsap.fromTo(t,{clipPath:'inset(100% 0 0 0)'},{clipPath:'inset(0% 0 0 0)',duration:1.1,ease:'power4.out',delay:(i%3)*.08,scrollTrigger:st});
    gsap.fromTo(img,{scale:1.25},{scale:1,duration:1.6,ease:'power3.out',delay:(i%3)*.08,clearProps:'transform',scrollTrigger:st}); });
  gsap.from('.ring3d',{y:90,scale:.82,autoAlpha:0,duration:1.2,ease:'power3.out',clearProps:'transform,opacity,visibility',scrollTrigger:once('#ring3d','top 85%')});
  gsap.from('.events__head > *',{y:30,autoAlpha:0,duration:.8,ease:'power3.out',stagger:.1,scrollTrigger:once('.events__head','top 85%')});
  gsap.from('.ev',{y:60,autoAlpha:0,duration:.9,ease:'power3.out',stagger:.12,scrollTrigger:once('#stack','top 85%')});
  gsap.from('.faq details',{y:30,autoAlpha:0,duration:.7,ease:'power3.out',stagger:.08,scrollTrigger:once('.faq__grid','top 75%')});
  gsap.from('.mark',{yPercent:35,autoAlpha:0,duration:1.2,ease:'power4.out',scrollTrigger:once('footer','top 85%')});
})();
/* nav state */
['rooms','seats','gallery','schedule','events','faq'].forEach(id=>{ const a=document.querySelector('.nav a[href="#'+id+'"]'); if(!a||!$('#'+id)) return; ScrollTrigger.create({trigger:'#'+id,start:'top 50%',end:'bottom 50%',onToggle:s=>{ if(s.isActive) a.setAttribute('aria-current','true'); else a.removeAttribute('aria-current'); }}); });

/* ---------- menu (simple) ---------- */
(function(){
  const b=$('#menuBtn'), nav=$('#nav'); if(!b||!nav) return;
  const set=o=>{ nav.classList.toggle('is-open',o); b.classList.toggle('is-open',o); b.setAttribute('aria-expanded',String(o)); $('#menuTxt').textContent=o?'Close':'Menu'; };
  b.addEventListener('click',e=>{ e.stopPropagation(); set(!nav.classList.contains('is-open')); });
  document.addEventListener('click',e=>{ if(nav.classList.contains('is-open')&&!nav.contains(e.target)) set(false); });
  nav.addEventListener('click',e=>{ if(e.target.closest('a')) set(false); });
  addEventListener('keydown',e=>{ if(e.key==='Escape') set(false); });
})();

/* ---------- stats: horizontal scroll with counters ---------- */
(function(){
  const pin=$('#statsPin'), track=$('#statsTrack'), line=$('#statsLine'); if(!pin||!track) return;
  const nums=$$('.stat b'), setN=(b,t)=>{ b.textContent=Math.round(+b.dataset.n*t)+b.dataset.suf; };
  if(RM) return;
  nums.forEach(b=>setN(b,0));
  const done=[]; const count=i=>{ if(done[i]) return; done[i]=1; const o={t:0}; gsap.to(o,{t:1,duration:1.4,ease:'power2.out',onUpdate:()=>setN(nums[i],o.t)}); };
  const m=gsap.matchMedia();
  m.add('(min-width: 821px)',()=>{
    const dist=()=>Math.max(0,track.scrollWidth-innerWidth);
    gsap.timeline({defaults:{ease:'none'},scrollTrigger:{refreshPriority:2,trigger:pin,start:'top top',end:()=>'+='+(dist()+innerHeight*.5),pin:true,scrub:.5,invalidateOnRefresh:true,anticipatePin:1,
      onEnter:()=>count(0),onUpdate:self=>{ const p=self.progress; nums.forEach((b,i)=>{ if(Math.abs(p*(nums.length-1)-i)<.3) count(i); }); }}})
      .fromTo(track,{x:0},{x:()=>-dist(),duration:1},0)
      .fromTo(line,{scaleX:0},{scaleX:1,duration:1},0);
    return ()=>{ gsap.set(track,{clearProps:'transform'}); };
  });
  m.add('(max-width: 820px)',()=>{ $$('.stat').forEach((s,i)=>ScrollTrigger.create({trigger:s,start:'top 85%',once:true,onEnter:()=>count(i)})); });
})();
})();
