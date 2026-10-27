(function(){
  var S=window.__SHOWS, sec=document.getElementById('schedule');
  if(!S||!sec||!window.gsap||!window.ScrollTrigger) return;
  var RM=matchMedia('(prefers-reduced-motion: reduce)').matches, fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
  try{
    ScrollTrigger.getAll().forEach(function(t){ var el=t.trigger; if((el===sec&&t.vars&&t.vars.scrub===true)||(el&&el.id==='ring3d')||(el===sec&&t.pin)) t.kill(true); });
    gsap.killTweensOf('#coin');
  }catch(e){}
  var css=document.createElement('style');
  css.textContent='#schedule.sched{padding:clamp(72px,9vw,140px) 0;overflow:visible;background:var(--dark);color:#fff;height:auto;min-height:0}'
  +'.cp__head{display:grid;gap:12px;margin-bottom:clamp(28px,4vw,56px)}'
  +'.cp__head h2{font-family:var(--display);font-weight:600;font-size:clamp(30px,3.6vw,54px);line-height:1.05;margin:0;text-align:left;color:#fff}'
  +'.cp__head p{margin:0;max-width:46ch;color:rgba(255,255,255,.7);font-size:clamp(15px,1.2vw,18px)}'
  +'.cp__list{list-style:none;margin:0;padding:0;border-top:1px solid rgba(255,255,255,.18)}'
  +'.cp__list li{border-bottom:1px solid rgba(255,255,255,.18)}'
  +'.cp__row{display:grid;grid-template-columns:minmax(0,2.4fr) minmax(0,1fr) minmax(0,1fr) 84px;align-items:center;gap:8px clamp(16px,3vw,48px);width:100%;padding:clamp(18px,2.6vw,34px) 0;background:none;border:0;color:#fff;font:inherit;text-align:left;cursor:pointer;transition:opacity .35s}'
  +'.cp__t{font-family:var(--display);font-weight:600;font-size:clamp(26px,3.4vw,54px);line-height:1.05}'
  +'.cp__m{font-size:clamp(14px,1.2vw,18px);color:rgba(255,255,255,.7)}'
  +'.cp__go{font-size:15px;color:var(--gold-br);opacity:0;transform:translateX(-8px);transition:opacity .3s,transform .3s}'
  +'.cp__th{display:none}'
  +'.cp__list:hover .cp__row{opacity:.35}.cp__list .cp__row:hover,.cp__list .cp__row:focus-visible{opacity:1}'
  +'.cp__row:hover .cp__go,.cp__row:focus-visible .cp__go{opacity:1;transform:none}'
  +'.cp__row:focus-visible{outline:2px solid var(--gold-br);outline-offset:4px}'
  +'.cp__pv{position:fixed;left:0;top:0;z-index:30;width:clamp(220px,22vw,340px);aspect-ratio:1/1;pointer-events:none;opacity:0;visibility:hidden;overflow:hidden;background:#000;box-shadow:0 24px 60px rgba(0,0,0,.45)}'
  +'.cp__pv img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0}'
  +'@media (hover:none),(max-width:820px){.cp__pv{display:none}.cp__list:hover .cp__row{opacity:1}.cp__row{grid-template-columns:72px minmax(0,1fr);grid-template-areas:"th t" "th m";gap:2px 16px;padding:16px 0}.cp__th{display:block;grid-area:th;width:72px;height:72px;object-fit:cover}.cp__t{grid-area:t;font-size:clamp(22px,6vw,30px)}.cp__m{grid-area:m;font-size:14px}.cp__m+.cp__m{display:none}.cp__go{display:none}}';
  document.head.appendChild(css);
  sec.setAttribute('aria-label','Schedule');
  sec.innerHTML='<div class="wrap"><div class="cp__head"><h2>Six programs this month</h2><p>Move over a program to preview it. Select one to pick seats for that show.</p></div><ul class="cp__list">'
  +S.map(function(s,i){return '<li><button type="button" class="cp__row" data-i="'+i+'"><img class="cp__th" src="'+s.img+'" alt="" loading="lazy" decoding="async" style="object-position:'+s.pos+'"><span class="cp__t">'+s.title+'</span><span class="cp__m">'+s.kind+', '+s.hall+'</span><span class="cp__m">'+s.date+' at '+s.time+'</span><span class="cp__go">Pick seats</span></button></li>';}).join('')
  +'</ul></div>';
  var pv=document.createElement('div'); pv.className='cp__pv'; pv.setAttribute('aria-hidden','true');
  pv.innerHTML=S.map(function(s){return '<img src="'+s.img+'" alt="" decoding="async" style="object-position:'+s.pos+'">';}).join('');
  document.body.appendChild(pv);
  var imgs=[].slice.call(pv.children), rows=[].slice.call(sec.querySelectorAll('.cp__row')), list=sec.querySelector('.cp__list'), cur=-1, shown=false;
  var W=function(){return pv.offsetWidth||280;};
  var qx=gsap.quickTo(pv,'x',{duration:.7,ease:'power3.out'}), qy=gsap.quickTo(pv,'y',{duration:.7,ease:'power3.out'}), qr=gsap.quickTo(pv,'rotation',{duration:.6,ease:'power3.out'});
  var lastX=0;
  function move(x,y){ qx(x-W()/2+W()*.05); qy(y-W()/2); qr(Math.max(-8,Math.min(8,(x-lastX)*.25))); lastX=x; }
  function show(i){
    if(i===cur) return; cur=i;
    imgs.forEach(function(im,k){ gsap.to(im,{opacity:k===i?1:0,duration:RM?0:.35,overwrite:true}); });
    if(!shown){ shown=true; gsap.to(pv,{autoAlpha:1,scale:1,duration:RM?0:.35,ease:'power3.out',overwrite:'auto'}); }
  }
  function hide(){ shown=false; cur=-1; gsap.to(pv,{autoAlpha:0,scale:.85,duration:RM?0:.25,ease:'power2.in',overwrite:'auto'}); }
  gsap.set(pv,{scale:.85,xPercent:0,yPercent:0});
  if(fine){
    list.addEventListener('pointermove',function(e){ if(!shown) { gsap.set(pv,{x:e.clientX-W()/2,y:e.clientY-W()/2}); lastX=e.clientX; } move(e.clientX,e.clientY); });
    rows.forEach(function(r,i){ r.addEventListener('pointerenter',function(){ show(i); }); r.addEventListener('focus',function(){ var b=r.getBoundingClientRect(); move(b.left+b.width*.75,b.top+b.height/2); show(i); }); r.addEventListener('blur',hide); });
    list.addEventListener('pointerleave',hide);
    addEventListener('scroll',function(){ if(shown){ var h=document.querySelector('.cp__row:hover'); if(!h) hide(); } },{passive:true});
  }
  rows.forEach(function(r,i){ r.addEventListener('click',function(){ if(window.__pickShow) window.__pickShow(i); hide(); var t=document.getElementById('seats'); if(t) t.scrollIntoView({behavior:RM?'auto':'smooth',block:'start'}); }); });
  if(!RM){ gsap.set(rows,{autoAlpha:0,y:40}); ScrollTrigger.batch(rows,{start:'top 92%',once:true,onEnter:function(b){ gsap.to(b,{autoAlpha:1,y:0,duration:.8,ease:'power3.out',stagger:.1,overwrite:true,clearProps:'transform,opacity,visibility'}); }}); }
  setTimeout(function(){ ScrollTrigger.refresh(); },300);
})();
;(function(){var s=document.createElement('script');s.src='/media.js';document.body.appendChild(s)})();
