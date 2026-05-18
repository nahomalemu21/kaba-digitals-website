/* KABA LABS — main.js */
(function(){
'use strict';

// ── CURSOR ──
const cur = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;

document.addEventListener('mousemove',e=>{
  mx=e.clientX;my=e.clientY;
  if(cur){cur.style.left=mx+'px';cur.style.top=my+'px'}
});
(function loop(){
  rx+=(mx-rx)*.09;ry+=(my-ry)*.09;
  if(ring){ring.style.left=rx+'px';ring.style.top=ry+'px'}
  requestAnimationFrame(loop);
})();

document.querySelectorAll('a,button,.wcard,.wr-item,.pkg-card,.proof-tag,.fi-contact,.proof-stat').forEach(el=>{
  el.addEventListener('mouseenter',()=>{
    document.body.classList.add('cursor-hover');
    if(ring){ring.style.width='54px';ring.style.height='54px';ring.style.borderColor='rgba(245,197,24,.7)'}
  });
  el.addEventListener('mouseleave',()=>{
    document.body.classList.remove('cursor-hover');
    if(ring){ring.style.width='36px';ring.style.height='36px';ring.style.borderColor='rgba(245,197,24,.35)'}
  });
});

// ── INTRO SEQUENCE ──
const intro       = document.getElementById('intro');
const site        = document.getElementById('site');
const logoFull    = document.getElementById('logo-full');
const lettersWrap = document.getElementById('letters-wrap');
const assembled   = document.getElementById('assembled');
const assembledLogo= document.getElementById('assembled-logo');
const assembledTag = document.getElementById('assembled-tagline');
const enterBtn    = document.getElementById('enter-btn');
const sLetters    = [
  document.getElementById('sl-k'),
  document.getElementById('sl-a1'),
  document.getElementById('sl-b'),
  document.getElementById('sl-a2'),
];

function runIntro(){
  if(!logoFull)return;

  // Step 1 — logo reveals from top (fade + slide down)
  setTimeout(()=>{ logoFull.classList.add('reveal'); }, 300);

  // Step 2 — logo glitches top to bottom after showing
  setTimeout(()=>{
    logoFull.classList.remove('reveal');
    logoFull.classList.add('glitch');
  }, 1400);

  // Step 3 — individual letters emerge from the breakdown
  setTimeout(()=>{
    logoFull.style.display='none';
    lettersWrap.classList.add('show');
    sLetters.forEach((l,i)=>{
      if(l) setTimeout(()=>l.classList.add('drop'), i*220);
    });
  }, 2100);

  // Step 4 — letters fade out, assembled logo forms
  const assembleAt = 2100 + sLetters.length*220 + 500;
  setTimeout(()=>{
    lettersWrap.style.transition='opacity .4s';
    lettersWrap.style.opacity='0';
    setTimeout(()=>{
      lettersWrap.style.display='none';
      assembled.style.opacity='1';
      assembledLogo.classList.add('show');
      setTimeout(()=>assembledTag.classList.add('show'), 400);
      setTimeout(()=>enterBtn.classList.add('show'), 800);
    },420);
  }, assembleAt);
}

// Enter site
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
setTimeout(runIntro,400);

// ── NAV ──
const nav    = document.getElementById('nav');
const burger = document.getElementById('burger');
const mobileNav = document.getElementById('mobile-nav');

window.addEventListener('scroll',()=>{
  if(nav) nav.classList.toggle('scrolled', window.scrollY>60);
}, {passive:true});

if(burger){
  burger.addEventListener('click',()=>{
    burger.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });
}
document.querySelectorAll('.mnl').forEach(el=>{
  el.addEventListener('click',()=>{
    if(burger) burger.classList.remove('open');
    if(mobileNav) mobileNav.classList.remove('open');
  });
});

// ── SCROLL CARDS ──
const cards   = document.querySelectorAll('.wcard');
const wrItems = document.querySelectorAll('.wr-item');
const TOTAL   = cards.length;
let current   = -1;

const labels = ['Dental & Medical','Performance Ads','Video Production','Brand Systems','KABA ELITE'];
const glows  = [
  'radial-gradient(ellipse 70% 60% at 42% 50%,rgba(100,20,200,.18) 0%,transparent 65%)',
  'radial-gradient(ellipse 70% 60% at 42% 50%,rgba(10,90,220,.16) 0%,transparent 65%)',
  'radial-gradient(ellipse 70% 60% at 42% 50%,rgba(200,50,20,.16) 0%,transparent 65%)',
  'radial-gradient(ellipse 70% 60% at 42% 50%,rgba(10,160,60,.14) 0%,transparent 65%)',
  'radial-gradient(ellipse 70% 60% at 42% 50%,rgba(200,160,0,.16) 0%,transparent 65%)',
];

function showCard(idx){
  if(idx===current)return;
  const prev=current; current=idx;

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

  const wrNum   = document.getElementById('wr-num');
  const wrLabel = document.getElementById('wr-label');
  if(wrNum){
    wrNum.textContent=String(idx+1).padStart(2,'0');
    wrNum.classList.add('lit');
    setTimeout(()=>wrNum.classList.remove('lit'),600);
  }
  if(wrLabel) wrLabel.textContent=labels[idx];
  wrItems.forEach((it,i)=>it.classList.toggle('active',i===idx));

  const glow=document.getElementById('work-glow');
  if(glow) glow.style.background=glows[idx];

  if(idx>0){const sc=document.getElementById('scue');if(sc)sc.style.opacity='0'}
}

window.addEventListener('scroll',()=>{
  const stage=document.getElementById('work');
  if(!stage)return;
  const scrolled=window.scrollY-stage.offsetTop;
  const total=stage.offsetHeight-window.innerHeight;
  const prog=Math.max(0,Math.min(1,scrolled/total));
  const idx=Math.min(TOTAL-1,Math.floor(prog*TOTAL));
  if(scrolled>-window.innerHeight/2) showCard(idx);
},{passive:true});

wrItems.forEach((it,i)=>{
  it.addEventListener('click',()=>{
    const stage=document.getElementById('work');
    if(!stage)return;
    const total=stage.offsetHeight-window.innerHeight;
    window.scrollTo({top:stage.offsetTop+(i/TOTAL)*total+10,behavior:'smooth'});
  });
});

// Card parallax
const workLeft=document.querySelector('.work-left');
if(workLeft){
  workLeft.addEventListener('mousemove',e=>{
    if(current<0)return;
    const r=workLeft.getBoundingClientRect();
    const cx=(e.clientX-r.left)/r.width-.5;
    const cy=(e.clientY-r.top)/r.height-.5;
    const c=cards[current];
    if(c&&c.classList.contains('active')){
      c.style.marginLeft=`${cx*14}px`;
      c.style.marginTop=`${cy*10}px`;
      c.style.transform=`rotateY(${cx*5}deg) rotateX(${-cy*3}deg)`;
    }
  });
  workLeft.addEventListener('mouseleave',()=>{
    if(current>=0){
      const c=cards[current];
      if(c){c.style.marginLeft='0';c.style.marginTop='0';c.style.transform=''}
    }
  });
}

// ── SERVICES ACCORDION ──
document.querySelectorAll('.fi-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const id=btn.dataset.p;
    const panel=document.getElementById(id);
    const isOpen=panel.classList.contains('open');
    document.querySelectorAll('.fi-panel').forEach(p=>p.classList.remove('open'));
    document.querySelectorAll('.fi-btn').forEach(b=>b.classList.remove('open'));
    if(!isOpen){panel.classList.add('open');btn.classList.add('open')}
  });
});

// ── SCROLL REVEAL ──
const rvObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')});
},{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>rvObs.observe(el));

// Services section reveal
const fiObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const fl=document.getElementById('fi-left');
      const fr=document.getElementById('fi-right');
      if(fl)fl.classList.add('visible');
      if(fr)fr.classList.add('visible');
    }
  });
},{threshold:.06});
const svc=document.getElementById('services');
if(svc)fiObs.observe(svc);

// ── STAT COUNTERS ──
function animateCount(el,target,suffix=''){
  let start=null;
  const dur=1400;
  const step=ts=>{
    if(!start)start=ts;
    const p=Math.min((ts-start)/dur,1);
    const ease=1-Math.pow(1-p,3);
    el.textContent=Math.floor(ease*target)+suffix;
    if(p<1)requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
const statObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('.proof-stat-num[data-count]').forEach(el=>{
        const t=parseInt(el.dataset.count);
        const sfx=el.dataset.count>='60'?'+':el.dataset.count>='10'?'+':'';
        animateCount(el,t,sfx);
      });
      statObs.unobserve(e.target);
    }
  });
},{threshold:.3});
const pp=document.querySelector('.proof-panel');
if(pp)statObs.observe(pp);

// ── HERO PARALLAX ──
window.addEventListener('scroll',()=>{
  const hero=document.getElementById('hero');
  if(hero&&window.scrollY<window.innerHeight){
    hero.style.transform=`translateY(${window.scrollY*.22}px)`;
  }
},{passive:true});

})();
