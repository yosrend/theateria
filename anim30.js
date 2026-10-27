(function(){
  if(!window.gsap||!window.ScrollTrigger||matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var css=document.createElement('style');
  css.textContent='.mw{display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:.12em;margin-bottom:-.12em}.mw>span{display:inline-block;will-change:transform}';
  document.head.appendChild(css);
  function words(h){
    if(h.dataset.split) return [];
    h.dataset.split='1'; var txt=h.textContent.trim(); h.setAttribute('aria-label',txt);
    h.innerHTML=txt.split(/\s+/).map(function(w){return '<span class="mw" aria-hidden="true"><span>'+w+'</span></span>';}).join(' ');
    return [].slice.call(h.querySelectorAll('.mw>span'));
  }
  function head(hSel,pSel){
    var h=document.querySelector(hSel); if(!h) return;
    var w=words(h), p=pSel?document.querySelector(pSel):null;
    gsap.set(w,{yPercent:115}); if(p) gsap.set(p,{autoAlpha:0,y:24});
    ScrollTrigger.create({trigger:h,start:'top 90%',once:true,onEnter:function(){
      gsap.to(w,{yPercent:0,duration:1,ease:'power4.out',stagger:.07});
      if(p) gsap.to(p,{autoAlpha:1,y:0,duration:.9,ease:'power3.out',delay:.35,clearProps:'transform'});
    }});
  }
  head('.seats__top h2','.seats__top .lede');
  head('.gallery__head h2','.gallery__head .lede');
  head('.cp__head h2','.cp__head p');
  head('.events__head h2','.events__head .lede');
  head('.faq h2','.faq .lede');
  var bg=[].slice.call(document.querySelectorAll('.ev__bg'));
  if(bg.length){
    gsap.set(bg,{scale:1.25,clipPath:'inset(0 0 100% 0)'});
    bg.forEach(function(im){ ScrollTrigger.create({trigger:im.parentNode,start:'top 85%',once:true,onEnter:function(){ gsap.to(im,{scale:1,clipPath:'inset(0 0 0% 0)',duration:1.4,ease:'power4.out'}); }}); });
  }
  setTimeout(function(){ ScrollTrigger.refresh(); },500);
})();
