/* ═══════════════════════════════════════════
   KABA LABS — main.js
═══════════════════════════════════════════ */

(function(){
  'use strict';

  // ── CURSOR ──
  let mx = 0, my = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    document.body.style.setProperty('--cx', mx + 'px');
    document.body.style.setProperty('--cy', my + 'px');
  });

  // ── INTRO SEQUENCE ──
  const intro     = document.getElementById('intro');
  const site      = document.getElementById('site');
  const stacked   = document.getElementById('stacked');
  const horizontal= document.getElementById('horizontal');
  const sLetters  = document.querySelectorAll('.s-letter');
  const hLetters  = document.querySelectorAll('.h-letter');
  const hLabs     = document.getElementById('h-labs');
  const hLine     = document.getElementById('h-line');
  const hTagline  = document.getElementById('h-tagline');
  const enterBtn  = document.getElementById('enter-btn');

  function runIntro() {
    // Step 1 — letters drop in one by one
    sLetters.forEach((l, i) => {
      setTimeout(() => l.classList.add('show'), 400 + i * 300);
    });

    // Step 2 — collapse to horizontal
    const collapseAt = 400 + sLetters.length * 300 + 600;

    setTimeout(() => {
      // Fade out stacked
      stacked.style.transition = 'opacity .4s, transform .4s';
      stacked.style.opacity = '0';
      stacked.style.transform = 'scale(0.96)';

      setTimeout(() => {
        stacked.style.display = 'none';
        horizontal.style.opacity = '1';

        // Fly in horizontal letters
        hLetters.forEach((l, i) => {
          setTimeout(() => l.classList.add('appear'), i * 75);
        });

        // Line, LABS, tagline, button
        setTimeout(() => hLine.classList.add('expand'), 380);
        setTimeout(() => hLabs.classList.add('show'), 560);
        setTimeout(() => hTagline.classList.add('show'), 820);
        setTimeout(() => enterBtn.classList.add('show'), 1100);
      }, 420);

    }, collapseAt);
  }

  // Enter site
  enterBtn.addEventListener('click', () => {
    intro.classList.add('exit');
    site.classList.add('visible');
    document.body.style.overflow = 'auto';
    setTimeout(() => { intro.style.display = 'none'; }, 900);

    // Show first card after site reveals
    setTimeout(() => showCard(0), 200);
  });

  document.body.style.overflow = 'hidden';
  setTimeout(runIntro, 400);

  // ── NAV ──
  const nav    = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const mobileNav = document.getElementById('mobile-nav');

  site.addEventListener('scroll', () => {
    nav.classList.toggle('dark', site.scrollTop > 60);
  });

  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });

  document.querySelectorAll('.mn-link,.mn-cta').forEach(el => {
    el.addEventListener('click', () => {
      burger.classList.remove('open');
      mobileNav.classList.remove('open');
    });
  });

  // ── SCROLL CARDS ──
  const cards   = document.querySelectorAll('.s-card');
  const srItems = document.querySelectorAll('.sr-item');
  const TOTAL   = cards.length;
  let current   = -1;

  const labels = [
    'Dental & Medical',
    'Performance Ads',
    'Video Production',
    'Brand Systems',
    'KABA ELITE',
  ];

  const glows = [
    'radial-gradient(ellipse 70% 60% at 42% 50%,rgba(100,20,200,.2) 0%,transparent 65%)',
    'radial-gradient(ellipse 70% 60% at 42% 50%,rgba(10,90,220,.18) 0%,transparent 65%)',
    'radial-gradient(ellipse 70% 60% at 42% 50%,rgba(200,50,20,.18) 0%,transparent 65%)',
    'radial-gradient(ellipse 70% 60% at 42% 50%,rgba(10,160,60,.16) 0%,transparent 65%)',
    'radial-gradient(ellipse 70% 60% at 42% 50%,rgba(200,160,0,.18) 0%,transparent 65%)',
  ];

  function showCard(idx) {
    if (idx === current) return;
    const prev = current;
    current = idx;

    // Previous card leaves
    if (prev >= 0) {
      const c = cards[prev];
      c.classList.remove('active', 'entering');
      c.style.animation = '';
      c.classList.add('leaving');
      setTimeout(() => {
        c.classList.remove('leaving');
        c.style.cssText = '';
      }, 680);
    }

    // New card enters
    const nc = cards[idx];
    nc.classList.remove('prev', 'next', 'leaving');
    nc.style.cssText = '';
    nc.classList.add('entering');
    setTimeout(() => {
      nc.classList.add('active');
      nc.classList.remove('entering');
    }, 860);

    // Update right panel
    const srNum = document.getElementById('sr-num');
    const srLabel = document.getElementById('sr-label');
    if (srNum) {
      srNum.textContent = String(idx + 1).padStart(2, '0');
      srNum.classList.add('lit');
      setTimeout(() => srNum.classList.remove('lit'), 600);
    }
    if (srLabel) srLabel.textContent = labels[idx];

    srItems.forEach((it, i) => it.classList.toggle('active', i === idx));

    const glow = document.getElementById('stage-glow');
    if (glow) glow.style.background = glows[idx];

    // Hide scroll cue after first
    if (idx > 0) {
      const scue = document.getElementById('scue');
      if (scue) scue.style.opacity = '0';
    }
  }

  // Scroll drives card progression
  site.addEventListener('scroll', () => {
    const stage = document.getElementById('stage');
    if (!stage) return;
    const scrolled = site.scrollTop - stage.offsetTop;
    const total = stage.offsetHeight - window.innerHeight;
    const prog = Math.max(0, Math.min(1, scrolled / total));
    const idx = Math.min(TOTAL - 1, Math.floor(prog * TOTAL));
    if (scrolled > -window.innerHeight / 2) showCard(idx);
  }, { passive: true });

  // Right panel click navigation
  srItems.forEach((it, i) => {
    it.addEventListener('click', () => {
      const stage = document.getElementById('stage');
      if (!stage) return;
      const total = stage.offsetHeight - window.innerHeight;
      site.scrollTo({ top: stage.offsetTop + (i / TOTAL) * total + 10, behavior: 'smooth' });
    });
    it.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') it.click();
    });
  });

  // Card mouse parallax
  const stageLeft = document.querySelector('.stage-left');
  if (stageLeft) {
    stageLeft.addEventListener('mousemove', e => {
      if (current < 0) return;
      const r = stageLeft.getBoundingClientRect();
      const cx = (e.clientX - r.left) / r.width - 0.5;
      const cy = (e.clientY - r.top) / r.height - 0.5;
      const c = cards[current];
      if (c && c.classList.contains('active')) {
        c.style.marginLeft = `${cx * 16}px`;
        c.style.marginTop = `${cy * 10}px`;
        c.style.transform = `rotateY(${cx * 5}deg) rotateX(${-cy * 3}deg)`;
      }
    });
    stageLeft.addEventListener('mouseleave', () => {
      if (current >= 0) {
        const c = cards[current];
        if (c) {
          c.style.marginLeft = '0';
          c.style.marginTop = '0';
          c.style.transform = '';
        }
      }
    });
  }

  // ── FINDER ACCORDION ──
  document.querySelectorAll('.fi-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.panel;
      const panel = document.getElementById(id);
      const isOpen = panel.classList.contains('open');

      document.querySelectorAll('.fi-panel').forEach(p => p.classList.remove('open'));
      document.querySelectorAll('.fi-btn').forEach(b => {
        b.classList.remove('open');
        b.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        panel.classList.add('open');
        btn.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ── SCROLL REVEAL (IntersectionObserver) ──
  const rvObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.08, root: site });

  document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => {
    rvObs.observe(el);
  });

  // Finder section reveal
  const finderObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        document.getElementById('fi-left').classList.add('visible');
        document.getElementById('fi-right').classList.add('visible');
      }
    });
  }, { threshold: 0.06, root: site });

  const finderEl = document.getElementById('services');
  if (finderEl) finderObs.observe(finderEl);

  // ── HERO PARALLAX ──
  site.addEventListener('scroll', () => {
    const hero = document.getElementById('hero');
    if (hero && site.scrollTop < window.innerHeight) {
      hero.style.transform = `translateY(${site.scrollTop * 0.25}px)`;
    }
  }, { passive: true });

})();
