(function(){
  var css=document.createElement('style');
  css.textContent='.sp__right{align-items:center;justify-content:center}'
  +'.sp__media{flex:none;height:auto;aspect-ratio:1/1;width:min(100%,calc(100svh - 250px))}'
  +'.sp__foot{width:min(100%,calc(100svh - 250px))}'
  +'@media (max-width:820px){.sp__media{width:min(100%,calc(100svh - 330px))}.sp__foot{width:min(100%,calc(100svh - 330px))}}'
  +'.gal{grid-template-columns:repeat(4,minmax(0,1fr))!important;grid-auto-rows:auto!important;grid-auto-flow:row!important}'
  +'.gal .tile{grid-column:span 1!important;grid-row:span 1!important;aspect-ratio:1/1;height:auto}'
  +'.gal .tile--cta{display:flex;flex-direction:column;justify-content:flex-end;gap:14px;padding:clamp(16px,2vw,32px);background:var(--dark);color:#fff;text-decoration:none}'
  +'.gal .tile--cta b{font-family:var(--display);font-weight:600;font-size:clamp(20px,2.4vw,36px);line-height:1.1}'
  +'.gal .tile--cta span{color:var(--gold-br);font-size:15px}'
  +'.gal .tile:not(.tile--cta){cursor:zoom-in}.gal .tile:focus-visible{outline:3px solid var(--gold-br);outline-offset:-3px}'
  +'.lb{position:fixed;inset:0;z-index:1000;display:flex;align-items:center;justify-content:center;background:rgba(10,8,7,.92);padding:16px}.lb[hidden]{display:none}'
  +'.lb__f{margin:0;max-width:min(92vw,78vh);display:flex;flex-direction:column;gap:12px}.lb__f img{width:100%;aspect-ratio:1/1;object-fit:cover;display:block;background:#000}'
  +'.lb__f figcaption{color:rgba(255,255,255,.75);font-size:15px;line-height:1.4}'
  +'.lb button{position:absolute;display:grid;place-items:center;width:48px;height:48px;border-radius:50%;border:0;background:rgba(255,255,255,.14);color:#fff;font-size:30px;line-height:1;cursor:pointer}.lb button:hover{background:rgba(255,255,255,.28)}.lb button:focus-visible{outline:2px solid #fff;outline-offset:2px}'
  +'.lb__x{top:16px;right:16px}.lb__p{left:16px;top:50%;transform:translateY(-50%)}.lb__n{right:16px;top:50%;transform:translateY(-50%)}'
  +'@media (max-width:760px){.lb__p,.lb__n{top:auto;bottom:20px;transform:none}.lb__p{left:calc(50% - 60px)}.lb__n{right:calc(50% - 60px)}.lb__f{max-width:92vw;margin-bottom:60px}}'
  +'@media (max-width:760px){.gal{grid-template-columns:repeat(2,minmax(0,1fr))!important}}';
  document.head.appendChild(css);
  var g=document.getElementById('gal');
  if(g){
    var alts=['A conductor and violinists, painted in warm oils','The painted ceiling and gold balconies of an opera house','Silver carnival masks on red velvet','A hand in a red glove raising a glass of champagne','Brass players mid performance, in black and white','A tuba player behind his instrument, in black and white','Guests in evening wear moving past red curtains','A violinist in a green gown on a stage with red curtains','A quartet playing among hundreds of candles','A full orchestra on stage in a red and gold concert hall','An illustration of musicians playing together in gold and brown','Actors on a stage lit in orange behind sheer curtains, framed by heavy red velvet drapes'];
    var h='';
    for(var i=1;i<=11;i++){var n=('0'+i).slice(-2); h+='<figure class="tile"><img src="/img/t/a'+n+'.jpg" alt="'+alts[i-1]+'" loading="lazy" decoding="async" width="480" height="480"></figure>';}
    h+='<figure class="tile"><img src="/img/gal12.jpg" alt="'+alts[11]+'" loading="lazy" decoding="async" width="480" height="480" onerror="this.parentNode.remove()"></figure>';
    g.innerHTML=h;
    var RMq=matchMedia('(prefers-reduced-motion: reduce)').matches, tiles=[].slice.call(g.querySelectorAll('figure.tile'));
    tiles.forEach(function(t,i){ t.tabIndex=0; t.setAttribute('role','button'); t.setAttribute('aria-label','Open photo '+(i+1)+' of '+tiles.length+': '+t.firstChild.alt); });
    if(window.gsap&&window.ScrollTrigger&&!RMq){
      gsap.set(g.children,{autoAlpha:0,y:60,scale:.94,clipPath:'inset(100% 0 0 0)'});
      ScrollTrigger.batch(g.children,{start:'top 92%',once:true,onEnter:function(b){ gsap.to(b,{autoAlpha:1,y:0,scale:1,clipPath:'inset(0% 0 0 0)',duration:1.1,ease:'power4.out',stagger:.12,overwrite:true,onComplete:function(){ gsap.set(b,{clearProps:'clipPath'}); }}); }});
    }
    var lb=document.createElement('div'); lb.className='lb'; lb.hidden=true; lb.setAttribute('role','dialog'); lb.setAttribute('aria-modal','true'); lb.setAttribute('aria-label','Photo viewer');
    lb.innerHTML='<button class="lb__x" type="button" aria-label="Close">&times;</button><button class="lb__p" type="button" aria-label="Previous photo">&#8249;</button><figure class="lb__f"><img alt=""><figcaption></figcaption></figure><button class="lb__n" type="button" aria-label="Next photo">&#8250;</button>';
    document.body.appendChild(lb);
    var li=lb.querySelector('img'), lc=lb.querySelector('figcaption'), cur=0, from=null;
    function show(i){ cur=(i+tiles.length)%tiles.length; var im=tiles[cur].firstChild; li.src=im.src; li.alt=im.alt; lc.textContent=(cur+1)+' / '+tiles.length+'  '+im.alt; }
    function open(i){ from=document.activeElement; show(i); lb.hidden=false; document.documentElement.style.overflow='hidden'; if(window.gsap&&!RMq){ gsap.fromTo(lb,{autoAlpha:0},{autoAlpha:1,duration:.3}); gsap.fromTo(lb.querySelector('.lb__f'),{scale:.9,y:20},{scale:1,y:0,duration:.45,ease:'power3.out'}); } lb.querySelector('.lb__x').focus(); }
    function close(){ lb.hidden=true; document.documentElement.style.overflow=''; if(from&&from.focus) from.focus(); }
    tiles.forEach(function(t,i){ t.addEventListener('click',function(){ open(i); }); t.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); open(i); } }); });
    lb.querySelector('.lb__x').onclick=close; lb.querySelector('.lb__p').onclick=function(){ show(cur-1); }; lb.querySelector('.lb__n').onclick=function(){ show(cur+1); };
    lb.addEventListener('click',function(e){ if(e.target===lb) close(); });
    document.addEventListener('keydown',function(e){ if(lb.hidden) return; if(e.key==='Escape') close(); else if(e.key==='ArrowLeft') show(cur-1); else if(e.key==='ArrowRight') show(cur+1); else if(e.key==='Tab'){ var f=[].slice.call(lb.querySelectorAll('button')); var k=f.indexOf(document.activeElement); e.preventDefault(); f[(k+(e.shiftKey?-1:1)+f.length)%f.length].focus(); } });
    var sx=null; lb.addEventListener('touchstart',function(e){ sx=e.touches[0].clientX; },{passive:true}); lb.addEventListener('touchend',function(e){ if(sx===null) return; var d=e.changedTouches[0].clientX-sx; sx=null; if(Math.abs(d)>50) show(cur+(d<0?1:-1)); });
  }
  var E=[['/img/ev1.jpg','The grand auditorium with gold balconies and a painted ceiling, seen from the stalls'],['/img/ev2.jpg','Audience seated on the curved red balconies of a historic theatre'],['/img/ev3.jpg','Performers on stage raising their hands together while the crowd films and applauds'],['/img/ev4.jpg','Two people leaning together in red theatre seats']];
  [].slice.call(document.querySelectorAll('.ev__bg')).forEach(function(im,i){ if(E[i]){ var t=new Image(); t.onload=function(){ im.src=E[i][0]; im.alt=E[i][1]; }; t.src=E[i][0]; } });
  var a=document.createElement('script'); a.src='/animation.js'; document.body.appendChild(a);
  setTimeout(function(){ if(window.ScrollTrigger) ScrollTrigger.refresh(); },400);
})();
