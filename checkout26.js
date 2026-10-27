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

