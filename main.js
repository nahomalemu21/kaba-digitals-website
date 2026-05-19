/* KABA LABS — main.js v4 */
(function(){
'use strict';

// ── CURSOR ──
const cur=document.getElementById('cursor'),ring=document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;if(cur){cur.style.left=mx+'px';cur.style.top=my+'px'}});
(function l(){rx+=(mx-rx)*.09;ry+=(my-ry)*.09;if(ring){ring.style.left=rx+'px';ring.style.top=ry+'px'}requestAnimationFrame(l)})();
document.querySelectorAll('a,button,.wcard,.wr-item,.pkg-card,.proof-tag,.fi-contact,.proof-stat').forEach(el=>{
  el.addEventListener('mouseenter',()=>{document.body.classList.add('ch');if(ring){ring.style.width='52px';ring.style.height='52px';ring.style.borderColor='rgba(201,148,10,.7)'}});
  el.addEventListener('mouseleave',()=>{document.body.classList.remove('ch');if(ring){ring.style.width='36px';ring.style.height='36px';ring.style.borderColor='rgba(201,148,10,.4)'}});
});

// ── INTRO ──
const intro=document.getElementById('intro');
const site=document.getElementById('site');
const sLetters=[
  document.getElementById('sl-k'),
  document.getElementById('sl-a1'),
  document.getElementById('sl-b'),
  document.getElementById('sl-a2'),
];
const stacked=document.getElementById('stacked');
const horizontal=document.getElementById('horizontal');
const hWord=document.getElementById('h-word');
const hLine=document.getElementById('h-line');
const hLabs=document.getElementById('h-labs');
const hTag=document.getElementById('h-tag');
const enterBtn=document.getElementById('enter-btn');

function runIntro(){
  // Step 1 — letters drop in one by one, same size
  sLetters.forEach((l,i)=>{
    if(l) setTimeout(()=>l.classList.add('drop'), 300 + i*280);
  });

  // Step 2 — after all letters shown, collapse to horizontal KABA LABS
  const collapseAt = 300 + sLetters.length*280 + 500;

  setTimeout(()=>{
    // Fade out stacked
    stacked.style.transition='opacity .35s, transform .35s';
    stacked.style.opacity='0';
    stacked.style.transform='scale(.97)';

    setTimeout(()=>{
      stacked.style.display='none';
      horizontal.style.opacity='1';

      // KABA word assembles
      setTimeout(()=>hWord.classList.add('show'), 50);
      // Line expands
      setTimeout(()=>hLine.classList.add('expand'), 350);
      // LABS
      setTimeout(()=>hLabs.classList.add('show'), 550);
      // Tagline
      setTimeout(()=>hTag.classList.add('show'), 800);
      // Enter button
      setTimeout(()=>enterBtn.classList.add('show'), 1100);
    },380);

  }, collapseAt);
}

if(enterBtn){
  enterBtn.addEventListener('click',()=>{
    intro.classList.add('exit');
    site.classList.add('visible');
    document.body.style.overflow='auto';
    setTimeout(()=>{
      intro.style.display='none';
      showCard(0);
    },900);
  });
}

document.body.style.overflow='hidden';
setTimeout(runIntro,300);

// ── NAV ──
const nav=document.getElementById('nav');
const burger=document.getElementById('burger');
const mobileNav=document.getElementById('mobile-nav');
window.addEventListener('scroll',()=>{if(nav)nav.classList.toggle('scrolled',window.scrollY>60)},{passive:true});
if(burger){burger.addEventListener('click',()=>{burger.classList.toggle('open');mobileNav.classList.toggle('open')})}
document.querySelectorAll('.mnl').forEach(el=>el.addEventListener('click',()=>{if(burger)burger.classList.remove('open');if(mobileNav)mobileNav.classList.remove('open')}));

// ── SCROLL CARDS ──
const cards=document.querySelectorAll('.wcard');
const wrItems=document.querySelectorAll('.wr-item');
const TOTAL=cards.length;
let current=-1;
const labels=['Dental & Medical','Performance Ads','Video Production','Brand Systems','KABA ELITE'];
const glows=[
  'radial-gradient(ellipse 70% 60% at 42% 50%,rgba(100,20,200,.18) 0%,transparent 65%)',
  'radial-gradient(ellipse 70% 60% at 42% 50%,rgba(10,90,220,.16) 0%,transparent 65%)',
  'radial-gradient(ellipse 70% 60% at 42% 50%,rgba(200,50,20,.16) 0%,transparent 65%)',
  'radial-gradient(ellipse 70% 60% at 42% 50%,rgba(10,160,60,.14) 0%,transparent 65%)',
  'radial-gradient(ellipse 70% 60% at 42% 50%,rgba(200,160,0,.16) 0%,transparent 65%)',
];

function showCard(idx){
  if(idx===current)return;
  const prev=current;current=idx;
  if(prev>=0){
    const c=cards[prev];
    c.classList.remove('active','entering');
    c.style.animation='';
    c.classList.add('leaving');
    setTimeout(()=>{c.classList.remove('leaving');c.style.cssText=''},700);
  }
  const nc=cards[idx];
  nc.classList.remove('prev','next','leaving');
  nc.style.cssText='';
  nc.classList.add('entering');
  setTimeout(()=>{nc.classList.add('active');nc.classList.remove('entering')},860);
  const wn=document.getElementById('wr-num'),wl=document.getElementById('wr-label');
  if(wn){wn.textContent=String(idx+1).padStart(2,'0');wn.classList.add('lit');setTimeout(()=>wn.classList.remove('lit'),600)}
  if(wl)wl.textContent=labels[idx];
  wrItems.forEach((it,i)=>it.classList.toggle('active',i===idx));
  const g=document.getElementById('work-glow');if(g)g.style.background=glows[idx];
  if(idx>0){const sc=document.getElementById('scue');if(sc)sc.style.opacity='0'}
}

window.addEventListener('scroll',()=>{
  const s=document.getElementById('work');if(!s)return;
  const scrolled=window.scrollY-s.offsetTop;
  const total=s.offsetHeight-window.innerHeight;
  const prog=Math.max(0,Math.min(1,scrolled/total));
  const idx=Math.min(TOTAL-1,Math.floor(prog*TOTAL));
  if(scrolled>-window.innerHeight/2)showCard(idx);
},{passive:true});

wrItems.forEach((it,i)=>{
  it.addEventListener('click',()=>{
    const s=document.getElementById('work');if(!s)return;
    const total=s.offsetHeight-window.innerHeight;
    window.scrollTo({top:s.offsetTop+(i/TOTAL)*total+10,behavior:'smooth'});
  });
});

// Card parallax
const wl2=document.querySelector('.work-left');
if(wl2){
  wl2.addEventListener('mousemove',e=>{
    if(current<0)return;
    const r=wl2.getBoundingClientRect();
    const cx=(e.clientX-r.left)/r.width-.5,cy=(e.clientY-r.top)/r.height-.5;
    const c=cards[current];
    if(c&&c.classList.contains('active')){c.style.marginLeft=`${cx*14}px`;c.style.marginTop=`${cy*10}px`;c.style.transform=`rotateY(${cx*5}deg) rotateX(${-cy*3}deg)`}
  });
  wl2.addEventListener('mouseleave',()=>{
    if(current>=0){const c=cards[current];if(c){c.style.marginLeft='0';c.style.marginTop='0';c.style.transform=''}}
  });
}

// ── ACCORDION ──
document.querySelectorAll('.fi-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const id=btn.dataset.p,panel=document.getElementById(id),isOpen=panel.classList.contains('open');
    document.querySelectorAll('.fi-panel').forEach(p=>p.classList.remove('open'));
    document.querySelectorAll('.fi-btn').forEach(b=>b.classList.remove('open'));
    if(!isOpen){panel.classList.add('open');btn.classList.add('open')}
  });
});

// ── REVEAL ──
const rvObs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')})},{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>rvObs.observe(el));

// Services reveal
const fiObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const fl=document.getElementById('fi-left'),fr=document.getElementById('fi-right');
      if(fl)fl.classList.add('visible');if(fr)fr.classList.add('visible');
    }
  });
},{threshold:.06});
const svc=document.getElementById('services');if(svc)fiObs.observe(svc);

// ── STAT COUNTERS ──
function animateCount(el,target,sfx){
  let start=null;const dur=1400;
  const step=ts=>{if(!start)start=ts;const p=Math.min((ts-start)/dur,1);const ease=1-Math.pow(1-p,3);el.textContent=Math.floor(ease*target)+sfx;if(p<1)requestAnimationFrame(step)};
  requestAnimationFrame(step);
}
const statObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('.proof-stat-num[data-count]').forEach(el=>{
        const t=parseInt(el.dataset.count);
        animateCount(el,t,t>=60?'+':t>=10?'+':'');
      });
      statObs.unobserve(e.target);
    }
  });
},{threshold:.3});
const pp=document.querySelector('.proof-panel');if(pp)statObs.observe(pp);

// ── HERO PARALLAX ──
window.addEventListener('scroll',()=>{
  const hero=document.getElementById('hero');
  if(hero&&window.scrollY<window.innerHeight)hero.style.transform=`translateY(${window.scrollY*.22}px)`;
},{passive:true});

})();
