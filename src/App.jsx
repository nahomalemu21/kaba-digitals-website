import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, BarChart3, Brain, Camera, Check, ChevronRight, Globe2, Layers3, LineChart, Megaphone, MousePointer2, Play, Radio, Rocket, ShieldCheck, Sparkles, Target, Users, Wand2, Zap } from 'lucide-react';

/* ─── DATA ─────────────────────────────────────────────────────── */
const slides = [
  { kicker:'LOOK TRUSTED', title:'STOP LOOKING\nSMALL ONLINE', side:'Build Trust', body:'Before customers call, book, or buy — they judge how serious your business looks. Kaba makes your brand feel modern, trusted, and worth choosing.', tags:['Brand trust','Visual identity','Social proof','Premium presence'], metric:'Weak presence → trusted brand' },
  { kicker:'WEBSITES THAT SELL', title:'YOUR WEBSITE\nSHOULD WORK', side:'Build Website', body:'A website should not just exist. We build websites that explain your offer, show proof, collect leads, connect WhatsApp, and push visitors to act.', tags:['Business websites','Landing pages','Lead forms','WhatsApp CTA'], metric:'Visitor → trust → lead' },
  { kicker:'CONTENT THAT CONVERTS', title:'CONTENT SHOULD\nBRING CUSTOMERS', side:'Content That Converts', body:'Nice videos are not enough. Kaba creates content that explains the business, builds desire, answers doubts, and gives customers a reason to act now.', tags:['Video production','Hooks','Reels','Campaign visuals'], metric:'Attention → trust → action' },
  { kicker:'ADS THAT BRING LEADS', title:'STOP WASTING\nMONEY BOOSTING', side:'Generate Leads', body:'We build campaign angles, targeting, creative testing, retargeting, and lead flows so ad spend has a real business purpose behind it.', tags:['Meta Ads','TikTok Ads','Retargeting','Lead funnels'], metric:'Budget → leads → sales' },
  { kicker:'GROWTH MACHINE', title:'CONNECT THE\nWHOLE JOURNEY', side:'Scale the System', body:'The real cash cow is the full system: website, content, ads, CRM, follow-up, and reporting. Kaba connects every piece so leads never disappear.', tags:['CRM','Follow-up','Reporting','Scale system'], metric:'Chaos → growth machine' }
];

const roadmap = [
  { icon: Radio, title:'Invisible', text:'Weak signal. Low trust. No clear reason for the market to care about you.', metric:'0→1' },
  { icon: Brain, title:'Diagnose', text:'We scan your offer, audience, competitors, content, and sales bottlenecks.', metric:'CLARITY' },
  { icon: Target, title:'Position', text:'We shape the message so people immediately understand what you sell and why it matters.', metric:'TRUST' },
  { icon: Camera, title:'Create', text:'Video, photo, graphics, hooks, landing pages, and campaigns built to convert.', metric:'ASSETS' },
  { icon: Rocket, title:'Launch', text:'Campaigns go live. Traffic, messages, leads, calls, and sales start moving.', metric:'+LEADS' },
  { icon: LineChart, title:'Dominate', text:'We double down on what works and build repeatable growth systems.', metric:'DOMINATE' }
];

const stack = [
  ['Websites That Sell','Fast, premium websites that explain your offer, build trust, collect leads, and connect customers to WhatsApp or booking.',Globe2],
  ['Video Production','Videos, reels, hooks, graphics, product shoots, and campaigns that make the business look trusted and credible.',Camera],
  ['Paid Ads','Meta, TikTok, retargeting, lead funnels, and campaign systems built for calls, messages, bookings, and sales.',Megaphone],
  ['Brand Strategy','Offer, message, audience, positioning, and creative direction — before money is wasted on execution.',Brain],
  ['CRM & Follow-Up','Lead tracking, follow-up structure, sales process setup, and reporting so interested customers do not disappear.',Layers3],
  ['Growth Consulting','Clear diagnosis, growth direction, priorities, and execution plans for businesses that want to scale seriously.',BarChart3]
];

const problems = [
  ['People do not know us','Visibility is the first battlefield. We build content and campaigns that make the market see you repeatedly.'],
  ['We do not look professional','Trust is leaking. We rebuild your visual presence so customers feel you are serious.'],
  ['We post but do not get sales','Content is not the real problem. The offer, targeting, and conversion path are broken.'],
  ['Our ads do not work','The campaign is pushing weak creative or a weak offer. We fix both before spending another birr.'],
  ['We do not have enough leads','You need a lead engine: clear offer, sharp targeting, landing flow, and follow-up system.'],
  ['We have no clear system','Growth depends on luck. We build the machine behind attention, sales, and reporting.']
];

const industries = [
  ['Restaurants & Cafes', 'Craving-led content → local offers → visits'],
  ['Gyms & Fitness', 'Authority content → challenges → memberships'],
  ['Hotels & Guest Houses', 'Experience content → trust campaigns → bookings'],
  ['Furniture Stores', 'Design visuals → product campaigns → showroom visits'],
  ['Clinics & Wellness', 'Trust content → education → appointments'],
  ['Beauty Salons & Spas', 'Transformation content → local campaigns → bookings'],
  ['Real Estate', 'Property content → lead campaigns → qualified buyers'],
  ['Fashion Brands', 'Style content → product campaigns → sales traffic'],
  ['E-commerce Stores', 'Product creatives → conversion campaigns → orders'],
  ['Schools & Training', 'Authority content → enrollment campaigns → signups'],
  ['Car Dealerships', 'Showcase content → demand campaigns → inquiries'],
  ['Interior Design', 'Portfolio content → authority positioning → leads'],
];

const t = {
  en: {
    heroTitle: "We Don't Make Content. We Build Empires.",
    heroSub: "Kaba Digitals combines video production, ads, websites, CRM, and growth systems to help Ethiopian businesses look trusted online and get more customers every month.",
    heroCta: "Book 20-Min Consultation",
    heroCtaSecondary: "See The Systems",
    realityTitle: "Your Competitors Are Already Winning Online.",
    r1h: "They found you first on Google — and chose someone else.",
    r1p: "If your business does not look trusted online, customers call your competitor instead.",
    r2h: "Walk-ins and word of mouth are not enough anymore.",
    r2p: "The fastest-growing businesses in Ethiopia are using consistent content, targeted ads, and follow-up.",
    r3h: "You tried marketing before and it did not work.",
    r3p: "Boosting posts is not advertising. Random videos are not strategy. Kaba builds the full system.",
    showcaseTitle: "Choose the system your business needs to grow.",
    showcaseSub: "Websites, content, ads, and follow-up should work together.",
    roadTitle: "Your Brand Does Not Need Random Content. It Needs a Growth System.",
    roadSub: "Scroll and watch how Kaba turns an invisible business into a brand with attention, trust, leads, and sales.",
    marketControl: "This is not marketing. This is market control.",
    contactTitle: "WHAT ARE YOU LOOKING FOR?",
    contactLead: "Every business is different. Book a 20-minute consultation and tell us exactly what you need.",
    consultBtn: "Book a 20-Minute Consultation",
  },
  am: {
    heroTitle: "ኮንተንት አንሠራም። ኢምፓየር እንገነባለን።",
    heroSub: "KABA DIGITALS ቪዲዮ፣ ማስታወቂያ፣ ድረ-ገጽ፣ CRM እና የእድገት ስርዓቶችን በማጣመር የኢትዮጵያ ቢዝነሶች ታማኝ ሆነው እንዲታዩ እና ደንበኞች እንዲያገኙ ያግዛሉ።",
    heroCta: "20 ደቂቃ ምክክር ያዝዙ",
    heroCtaSecondary: "ስርዓቶቹን ይመልከቱ",
    realityTitle: "ተወዳዳሪዎችዎ አስቀድሞ በኦንላይን እያሸነፉ ነው።",
    r1h: "በጉግል ካርታ አገኙዎትና — ሌላ ሰው መረጡ።",
    r1p: "ቢዝነሶ በኦንላይን አስተማማኝ ካልሆነ ደንበኞ ተወዳዳሪዎን ይደውሉለታል።",
    r2h: "ወደ ውስጥ መምጣት እና ተሰምቶ መሰራጨት አሁን አይበቃም።",
    r2p: "ፈጣን እያደጉ ያሉ ቢዝነሶች ወጥ ኮንተንት እና የታለሙ ማስታወቂያዎች ላይ እየኢንቨስት ናቸው።",
    r3h: "ከዚህ ቀደም ማርኬቲንግ ሞክርዎ ውጤት አልሰጠዎትም።",
    r3p: "ፖስት ማስተዋወቅ ማስታወቂያ አይደለም። KABA ሙሉ ስርዓቱን ይገነባል።",
    showcaseTitle: "ቢዝነሶ ለማደግ የሚፈልጉትን ስርዓት ይምረጡ።",
    showcaseSub: "ድረ-ገጽ፣ ኮንተንት፣ ማስታወቂያ እና ክትትል አብረው መስራት አለባቸው።",
    roadTitle: "ብራንድዎ ተራ ኮንተንት አይደለም የሚፈልገው። የእድገት ስርዓት ያስፈልገዋል።",
    roadSub: "ስክሮል አድርገው KABA ያልታወቀ ቢዝነስን ወደ ሚታይ ብራንድ እንዴት እንደሚቀይር ይመልከቱ።",
    marketControl: "ይህ ማርኬቲንግ ብቻ አይደለም። የገበያ ቁጥጥር ነው።",
    contactTitle: "ምን እየፈለጉ ነው?",
    contactLead: "እያንዳንዱ ቢዝነስ የተለየ ነው። 20 ደቂቃ ምክክር ያዝዙ።",
    consultBtn: "20 ደቂቃ ምክክር ያዝዙ",
  },
  fr: {
    heroTitle: "Nous ne créons pas du contenu. Nous bâtissons des empires.",
    heroSub: "Kaba Digitals combine production vidéo, publicités, sites web, CRM et systèmes de croissance pour aider les entreprises éthiopiennes à paraître crédibles et attirer plus de clients chaque mois.",
    heroCta: "Réserver 20 min de consultation",
    heroCtaSecondary: "Voir les systèmes",
    realityTitle: "Vos concurrents gagnent déjà en ligne.",
    r1h: "Ils vous ont trouvé sur Google — et ont choisi quelqu'un d'autre.",
    r1p: "Si votre entreprise n'est pas crédible en ligne, les clients appellent votre concurrent.",
    r2h: "Les clients spontanés et le bouche-à-oreille ne suffisent plus.",
    r2p: "Les entreprises qui croissent le plus vite investissent dans du contenu régulier et des publicités ciblées.",
    r3h: "Vous avez essayé le marketing avant — sans résultat.",
    r3p: "Booster des publications n'est pas de la publicité. Kaba construit le système complet derrière la croissance.",
    showcaseTitle: "Choisissez le système dont votre entreprise a besoin pour croître.",
    showcaseSub: "Sites web, contenu, publicités et suivi doivent fonctionner ensemble.",
    roadTitle: "Votre marque n'a pas besoin de contenu aléatoire. Elle a besoin d'un système de croissance.",
    roadSub: "Faites défiler et regardez comment Kaba transforme une entreprise invisible en marque qui attire et vend.",
    marketControl: "Ce n'est pas du marketing. C'est le contrôle du marché.",
    contactTitle: "QUE CHERCHEZ-VOUS ?",
    contactLead: "Chaque entreprise est différente. Réservez 20 minutes de consultation.",
    consultBtn: "Réserver 20 min de consultation",
  }
};

/* ─── STYLES ──────────────────────────────────────────────────── */
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;500;600;700;800&display=swap');

*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:#080808;overflow-x:hidden}

/* ── BASE ── */
.app{min-height:100vh;background:#080808;color:#f2ece0;font-family:'Syne',system-ui,sans-serif;overflow-x:hidden}

/* ── NOISE OVERLAY ── */
.noise{position:fixed;inset:0;pointer-events:none;z-index:50;opacity:.045;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size:128px}

/* ── GRID OVERLAY ── */
.grid-bg{position:fixed;inset:0;pointer-events:none;z-index:0;
  background-image:linear-gradient(rgba(255,255,255,.028) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.028) 1px,transparent 1px);
  background-size:80px 80px}

/* ── SCROLLBAR ── */
::-webkit-scrollbar{width:4px}
::-webkit-scrollbar-track{background:#080808}
::-webkit-scrollbar-thumb{background:#d4a847;border-radius:2px}

/* ── NAV ── */
.nav{position:fixed;top:20px;left:50%;transform:translateX(-50%);z-index:90;
  width:min(1240px,calc(100% - 32px));display:flex;align-items:center;justify-content:space-between;
  padding:14px 20px;border:1px solid rgba(212,168,71,.18);border-radius:4px;
  background:rgba(8,8,8,.85);backdrop-filter:blur(20px);
  box-shadow:0 0 0 1px rgba(212,168,71,.04),0 40px 80px rgba(0,0,0,.5)}

.brand{font-family:'Bebas Neue',cursive;font-size:22px;letter-spacing:.12em;color:#d4a847;
  display:flex;align-items:center;gap:10px}
.brand-dot{width:6px;height:6px;background:#d4a847;border-radius:50%;animation:pulse 2s ease-in-out infinite}

.nav-links{display:flex;gap:28px}
.nav-links a{color:rgba(242,236,224,.45);text-decoration:none;font-size:13px;font-weight:600;
  letter-spacing:.1em;text-transform:uppercase;transition:.2s;position:relative}
.nav-links a:hover{color:#f2ece0}
.nav-links a::after{content:'';position:absolute;bottom:-4px;left:0;width:0;height:1px;
  background:#d4a847;transition:.3s}
.nav-links a:hover::after{width:100%}

.lang{display:flex;gap:3px;background:rgba(255,255,255,.04);border-radius:3px;padding:3px;
  border:1px solid rgba(255,255,255,.06)}
.lang button{border:0;background:transparent;color:rgba(242,236,224,.45);
  padding:6px 10px;border-radius:2px;font-weight:700;font-size:12px;cursor:pointer;
  letter-spacing:.06em;transition:.2s}
.lang .on{background:#d4a847;color:#080808}

/* ── NAV CTA ── */
.nav-cta{display:flex;align-items:center;gap:10px}
.nav-book{display:inline-flex;align-items:center;gap:8px;padding:9px 16px;
  background:linear-gradient(135deg,#d4a847,#f0c85a);color:#080808;text-decoration:none;
  border-radius:3px;font-weight:800;font-size:12px;letter-spacing:.08em;text-transform:uppercase;
  transition:.2s}
.nav-book:hover{opacity:.88;transform:translateY(-1px)}

/* ── SECTION SKELETON ── */
.section{width:min(1240px,calc(100% - 32px));margin:0 auto;padding:130px 0;position:relative;z-index:1}

.eyebrow{display:flex;align-items:center;gap:10px;color:#d4a847;font-size:11px;
  letter-spacing:.28em;font-weight:700;text-transform:uppercase;margin-bottom:20px}
.eyebrow-line{width:28px;height:1px;background:#d4a847}

/* ── INTRO SCREEN ── */
.intro-screen{position:fixed;inset:0;z-index:999;background:#080808;
  display:grid;place-items:center;overflow:hidden;
  animation:introExit .7s ease 3.2s forwards;pointer-events:none}
.intro-noise{position:absolute;inset:0;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size:128px;opacity:.05}
.intro-glow{position:absolute;width:600px;height:600px;left:50%;top:50%;
  transform:translate(-50%,-50%);
  background:radial-gradient(circle,rgba(212,168,71,.2),transparent 65%);
  animation:glowPulse 2.5s ease-in-out infinite}
.intro-content{position:relative;text-align:center}
.intro-wordmark{font-family:'Bebas Neue',cursive;font-size:clamp(88px,18vw,200px);
  line-height:.85;letter-spacing:.04em;color:#f2ece0;
  animation:wordmarkReveal .9s cubic-bezier(.2,.8,.2,1) .2s both}
.intro-sub{color:#d4a847;font-size:13px;letter-spacing:.42em;font-weight:600;text-transform:uppercase;
  margin-top:16px;animation:fadeUp .7s ease .9s both}
.intro-tagline{color:rgba(242,236,224,.45);font-size:15px;font-weight:500;
  margin-top:8px;animation:fadeUp .7s ease 1.1s both}
.intro-enter{margin-top:28px;animation:fadeUp .7s ease 1.3s both}
.intro-enter button{border:1px solid rgba(212,168,71,.35);background:transparent;
  color:#d4a847;border-radius:3px;padding:12px 22px;font-weight:700;font-size:13px;
  letter-spacing:.12em;text-transform:uppercase;cursor:pointer;transition:.2s;
  display:inline-flex;align-items:center;gap:10px}
.intro-enter button:hover{background:rgba(212,168,71,.08)}

/* ── HERO ── */
.hero{min-height:100vh;display:grid;grid-template-columns:1.1fr .9fr;
  align-items:center;gap:64px;padding-top:100px}
.hero-headline{font-family:'Bebas Neue',cursive;font-size:clamp(64px,9.5vw,140px);
  line-height:.87;letter-spacing:.02em;color:#f2ece0;margin:0 0 28px}
.hero-headline em{color:#d4a847;font-style:normal}
.hero-body{font-size:clamp(17px,1.8vw,22px);color:rgba(242,236,224,.6);
  line-height:1.65;max-width:580px;margin-bottom:36px;font-weight:500}
.hero-actions{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:40px}
.btn-primary{display:inline-flex;align-items:center;gap:10px;padding:17px 24px;
  background:linear-gradient(135deg,#d4a847,#f0c85a);color:#080808;text-decoration:none;
  border-radius:3px;font-weight:800;font-size:14px;letter-spacing:.06em;text-transform:uppercase;
  transition:.2s;box-shadow:0 16px 48px rgba(212,168,71,.25)}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 24px 64px rgba(212,168,71,.35)}
.btn-ghost{display:inline-flex;align-items:center;gap:10px;padding:17px 24px;
  border:1px solid rgba(255,255,255,.14);color:#f2ece0;text-decoration:none;
  border-radius:3px;font-weight:700;font-size:14px;letter-spacing:.06em;text-transform:uppercase;
  transition:.2s}
.btn-ghost:hover{border-color:rgba(212,168,71,.4);color:#d4a847}
.proof-strip{display:flex;gap:10px;flex-wrap:wrap}
.proof-pill{display:flex;gap:8px;align-items:center;color:rgba(242,236,224,.55);
  border:1px solid rgba(255,255,255,.08);padding:10px 14px;border-radius:999px;
  background:rgba(255,255,255,.025);font-size:13px;font-weight:600}
.proof-pill svg{color:#d4a847}

/* ── HERO VISUAL ── */
.hero-visual{position:relative;min-height:560px;display:grid;place-items:center}
.dash-card{width:min(480px,100%);border:1px solid rgba(212,168,71,.15);border-radius:4px;
  background:linear-gradient(180deg,rgba(255,255,255,.055),rgba(255,255,255,.02));
  box-shadow:0 60px 120px rgba(0,0,0,.6),inset 0 1px 0 rgba(212,168,71,.08);
  padding:24px;overflow:hidden;position:relative}
.dash-card::before{content:'';position:absolute;inset:0;
  background:linear-gradient(90deg,transparent,rgba(212,168,71,.06),transparent);
  animation:sweep 4s infinite}
.dash-dots{display:flex;gap:7px;margin-bottom:20px}
.dash-dots span{width:9px;height:9px;border-radius:50%}
.dash-dots span:nth-child(1){background:#d4a847}
.dash-dots span:nth-child(2){background:rgba(212,168,71,.4)}
.dash-dots span:nth-child(3){background:rgba(212,168,71,.18)}
.dash-label{font-size:11px;letter-spacing:.22em;color:rgba(242,236,224,.35);
  font-weight:700;text-transform:uppercase;margin-bottom:8px}
.dash-metric{font-family:'Bebas Neue',cursive;font-size:72px;color:#d4a847;
  letter-spacing:.04em;line-height:1}
.dash-sub{font-size:12px;color:rgba(242,236,224,.35);font-weight:600;letter-spacing:.12em;
  text-transform:uppercase;margin-bottom:24px}
.dash-bars{display:flex;gap:10px;align-items:end;height:130px;margin:20px 0}
.dash-bars i{flex:1;border-radius:2px 2px 0 0;
  background:linear-gradient(180deg,#f0c85a,#d4a847);
  animation:grow 2.4s ease-in-out infinite alternate}
.dash-bars i:nth-child(1){height:30%}.dash-bars i:nth-child(2){height:54%;animation-delay:.18s}
.dash-bars i:nth-child(3){height:40%;animation-delay:.36s}.dash-bars i:nth-child(4){height:76%;animation-delay:.54s}
.dash-bars i:nth-child(5){height:100%;animation-delay:.72s}
.dash-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
.dash-grid b{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);
  border-radius:3px;padding:10px 8px;text-align:center;font-size:11px;
  font-weight:600;letter-spacing:.06em;color:rgba(242,236,224,.6)}
.dash-float{position:absolute;top:-24px;right:-24px;width:160px;padding:14px;
  background:rgba(8,8,8,.9);border:1px solid rgba(212,168,71,.2);border-radius:4px;
  backdrop-filter:blur(12px)}
.dash-float strong{display:block;font-family:'Bebas Neue',cursive;font-size:32px;color:#d4a847}
.dash-float span{font-size:11px;letter-spacing:.14em;color:rgba(242,236,224,.4);font-weight:600}

/* ── REALITY ── */
.reality-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;
  background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.07);
  border-radius:4px;overflow:hidden}
.reality-card{background:#0d0d0d;padding:36px;transition:.25s}
.reality-card:hover{background:#111}
.reality-num{font-family:'Bebas Neue',cursive;font-size:64px;color:rgba(212,168,71,.18);
  line-height:1;margin-bottom:20px;letter-spacing:.04em}
.reality-card h3{font-size:20px;font-weight:700;line-height:1.3;margin-bottom:12px;color:#f2ece0}
.reality-card p{color:rgba(242,236,224,.45);line-height:1.7;font-size:15px;font-weight:500}

/* ── SECTION HEADING ── */
.section-title{font-family:'Bebas Neue',cursive;font-size:clamp(44px,6vw,86px);
  line-height:.9;letter-spacing:.02em;color:#f2ece0;max-width:980px;margin-bottom:16px}
.section-title em{color:#d4a847;font-style:normal}
.section-body{font-size:18px;color:rgba(242,236,224,.45);line-height:1.7;
  max-width:680px;font-weight:500}

/* ── SHOWCASE ── */
.showcase{position:relative;background:radial-gradient(circle at 15% 25%,rgba(80,55,180,.3),transparent 32%),
  radial-gradient(circle at 82% 15%,rgba(60,180,160,.14),transparent 36%),
  linear-gradient(180deg,#06070d,#080808);overflow:clip}
.showcase-sticky{position:sticky;top:0;height:100dvh;width:100%;overflow:hidden;flex-shrink:0}
.showcase-sticky::before{content:'';position:absolute;inset:0;
  background-image:radial-gradient(rgba(100,56,210,.28) 1px,transparent 1px),
    radial-gradient(rgba(212,168,71,.2) 1px,transparent 1px);
  background-size:22px 22px,38px 38px;
  mask-image:radial-gradient(circle at 50% 50%,black,transparent 72%);
  opacity:.5;animation:particleDrift 8s ease-in-out infinite alternate}
.showcase-head{position:absolute;left:5vw;top:8vh;z-index:8;max-width:720px}
.showcase-head .section-title{font-size:clamp(36px,5vw,72px)}
.showcase-head p:not(.eyebrow){color:rgba(242,236,224,.45);font-size:17px;line-height:1.6;max-width:560px}
.showcase-cta{display:inline-flex;align-items:center;gap:10px;margin-top:20px;
  background:linear-gradient(135deg,#d4a847,#f0c85a);color:#080808;text-decoration:none;
  border-radius:3px;padding:14px 20px;font-weight:800;font-size:13px;
  letter-spacing:.08em;text-transform:uppercase;
  box-shadow:0 16px 48px rgba(212,168,71,.2);transition:.2s}
.showcase-cta:hover{transform:translateY(-2px)}

/* SHOWCASE WIRE */
.showcase-cord{position:absolute;width:80vw;height:40vh;left:10vw;top:34vh;
  z-index:1;opacity:.7}
.showcase-cord path{fill:none;stroke:#d4a847;stroke-width:6;stroke-linecap:round;
  stroke-dasharray:140 40;filter:drop-shadow(0 0 18px rgba(212,168,71,.45));
  animation:cordMove 2.5s linear infinite}

/* CARDS STAGE */
.showcase-stage{position:absolute;inset:0;z-index:3;display:grid;place-items:center;perspective:1600px}
.showcase-card{position:absolute;width:min(600px,43vw);height:350px;border-radius:4px;
  border:1px solid rgba(255,255,255,.16);
  padding:200px 32px 32px;
  background:linear-gradient(135deg,rgba(80,60,200,.65),rgba(58,186,176,.18) 32%,rgba(220,75,145,.18) 60%,rgba(0,0,0,.78));
  box-shadow:0 60px 140px rgba(0,0,0,.6),inset 0 1px 0 rgba(255,255,255,.12);
  backdrop-filter:blur(18px);overflow:hidden;
  transition:transform .44s cubic-bezier(.2,.8,.2,1),opacity .36s ease,filter .36s ease}
.showcase-card.active{box-shadow:0 80px 170px rgba(0,0,0,.72),
  0 0 100px rgba(212,168,71,.22),0 0 120px rgba(120,68,200,.2);z-index:6}
.showcase-card::before{content:'';position:absolute;inset:0;
  background:linear-gradient(120deg,transparent,rgba(255,255,255,.1),transparent);
  animation:sweep 3.2s infinite}
.showcase-card::after{content:'';position:absolute;inset:0;
  background:radial-gradient(circle at 48% 22%,rgba(255,255,255,.12),transparent 30%),
    repeating-linear-gradient(0deg,rgba(255,255,255,.028) 0 1px,transparent 1px 5px);
  opacity:.42}
.showcase-card>*{position:relative;z-index:2}
.showcase-card .card-kicker{color:#d4a847;font-size:10px;font-weight:700;
  letter-spacing:.3em;text-transform:uppercase;margin:0 0 10px}
.showcase-card h2{font-family:'Bebas Neue',cursive;font-size:clamp(28px,3vw,44px);
  line-height:.9;letter-spacing:.03em;text-transform:uppercase;margin:0}
.card-num{position:absolute;right:22px;top:16px;color:rgba(240,200,90,.38);
  font-size:11px;font-weight:700;letter-spacing:.18em;font-family:'Syne',sans-serif}
.card-progress-line{position:absolute;left:0;bottom:0;height:3px;
  background:linear-gradient(90deg,#d4a847,#f0c85a);
  box-shadow:0 0 20px rgba(212,168,71,.7)}

/* SHOWCASE EXPLAIN PANEL */
.showcase-explain{position:absolute;right:6vw;top:50%;transform:translateY(-50%);
  width:min(400px,29vw);z-index:10;
  border:1px solid rgba(255,255,255,.1);border-radius:4px;padding:28px;
  background:rgba(8,8,8,.72);backdrop-filter:blur(20px);
  box-shadow:0 30px 80px rgba(0,0,0,.4)}
.explain-count{color:#d4a847;font-size:11px;font-weight:700;letter-spacing:.22em;
  text-transform:uppercase;margin-bottom:12px}
.explain-title{font-family:'Bebas Neue',cursive;font-size:40px;line-height:.95;
  letter-spacing:.03em;margin-bottom:12px;color:#f2ece0}
.explain-body{color:rgba(242,236,224,.6);line-height:1.65;font-size:14px;
  font-weight:500;margin-bottom:16px}
.tag-row{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:16px}
.tag-pill{font-size:11px;border:1px solid rgba(212,168,71,.2);
  background:rgba(212,168,71,.06);border-radius:2px;
  padding:7px 10px;color:#f2ece0;font-weight:600;letter-spacing:.04em}
.explain-metric{display:block;font-style:normal;color:#080808;
  background:linear-gradient(135deg,#d4a847,#f0c85a);
  border-radius:3px;padding:12px 14px;font-weight:800;font-size:13px;
  letter-spacing:.06em;text-transform:uppercase}

/* SHOWCASE SIDEBAR NAV */
.showcase-progress{position:absolute;right:38px;top:50%;transform:translateY(-50%);
  z-index:12;display:grid;gap:5px;width:200px}
.showcase-progress button{text-align:left;border:0;
  border-left:1px solid rgba(255,255,255,.08);background:transparent;
  color:rgba(242,236,224,.3);padding:12px 16px;font-weight:700;font-size:12px;
  text-transform:uppercase;letter-spacing:.06em;cursor:pointer;transition:.25s;
  font-family:'Syne',sans-serif}
.showcase-progress button small{margin-right:10px;color:rgba(212,168,71,.32);
  font-size:10px;letter-spacing:.2em}
.showcase-progress button.on{background:rgba(212,168,71,.08);color:#f2ece0;
  border-left-color:#d4a847;transform:translateX(-8px)}
.showcase-progress button.on small{color:#d4a847}

/* MOB NAV */
.mob-card-nav{display:none}

/* ── GROWTH ROADMAP ── */
.growth-section{position:relative;padding:0;margin:0;overflow:hidden}
.sticky-growth{display:flex;flex-direction:column;
  width:min(1240px,calc(100% - 32px));margin:0 auto;
  overflow:visible;padding:80px 0;gap:28px}
.section-intro{padding-top:80px}
.section-intro .section-title{max-width:860px}
.section-intro .section-body{max-width:680px}
.road-stage{display:grid;grid-template-columns:360px 1fr;gap:24px;
  align-items:stretch;margin-top:20px;min-height:480px}
.stage-panel{display:grid;gap:14px;align-content:start}
.progress-chip{display:flex;justify-content:space-between;align-items:center;
  border:1px solid rgba(255,255,255,.08);border-radius:4px;padding:16px 20px;
  background:rgba(255,255,255,.03)}
.progress-chip span{font-size:11px;text-transform:uppercase;letter-spacing:.18em;
  color:rgba(242,236,224,.4);font-weight:700}
.progress-chip strong{font-family:'Bebas Neue',cursive;font-size:28px;color:#d4a847;letter-spacing:.04em}
.stage-card{padding:24px;border:1px solid rgba(255,255,255,.1);border-radius:4px;
  background:rgba(10,10,10,.9);backdrop-filter:blur(20px)}
.stage-num{color:#d4a847;font-weight:700;font-size:12px;letter-spacing:.2em;
  text-transform:uppercase;margin-bottom:8px}
.stage-card h3{font-family:'Bebas Neue',cursive;font-size:38px;letter-spacing:.03em;
  margin:0 0 10px;line-height:.95}
.stage-card p{color:rgba(242,236,224,.5);line-height:1.65;font-size:14px;font-weight:500;margin-bottom:14px}
.stage-metric{display:inline-flex;color:#080808;background:linear-gradient(135deg,#d4a847,#f0c85a);
  border-radius:3px;padding:8px 12px;font-weight:800;font-size:12px;
  letter-spacing:.1em;text-transform:uppercase}
.stage-list{display:grid;gap:8px}
.mini-stage{display:flex;align-items:center;gap:10px;padding:11px 14px;
  border:1px solid rgba(255,255,255,.06);border-radius:4px;
  background:rgba(255,255,255,.02);color:rgba(242,236,224,.35);
  font-size:13px;font-weight:600;transition:.3s}
.mini-stage.current,.mini-stage.done{border-color:rgba(212,168,71,.28);
  background:rgba(212,168,71,.07);color:#f2ece0}
.mini-stage svg{color:#d4a847;flex-shrink:0}

/* ROAD MAP VISUAL */
.road-wrap{position:relative;height:480px;
  border:1px solid rgba(255,255,255,.07);
  background:radial-gradient(circle at 10% 20%,rgba(212,168,71,.1),transparent 32%),
    linear-gradient(180deg,rgba(255,255,255,.045),rgba(255,255,255,.015));
  border-radius:4px;overflow:hidden}
.road-bg-grid{position:absolute;inset:0;
  background-image:linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),
    linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px);
  background-size:40px 40px}
.road{position:absolute;inset:0;width:100%;height:100%;z-index:2}
.road-shadow,.road-surface,.road-centerline,.road-progress-line{fill:none;stroke-linecap:round;stroke-linejoin:round}
.road-shadow{stroke:rgba(0,0,0,.4);stroke-width:80;filter:blur(16px)}
.road-surface{stroke:#111;stroke-width:72}
.road-centerline{stroke:#f2ece0;stroke-width:4;stroke-dasharray:10 16;opacity:.6;animation:dashmove 1.2s linear infinite}
.road-progress-line{stroke:url(#roadGrad);stroke-width:5;stroke-dasharray:1500;
  stroke-dashoffset:calc(1500 - (1500 * var(--progress) / 100));
  filter:drop-shadow(0 0 10px rgba(212,168,71,.85)) drop-shadow(0 0 24px rgba(212,168,71,.45));
  transition:stroke-dashoffset .55s cubic-bezier(.2,.8,.2,1)}
.road-node{position:absolute;transform:translate(-50%,-50%);
  display:flex;align-items:center;gap:7px;padding:9px 13px;border-radius:999px;
  background:#0d0d0d;border:1px solid rgba(255,255,255,.08);
  color:rgba(255,255,255,.28);z-index:5;transition:.5s cubic-bezier(.2,.8,.2,1);
  font-size:12px;font-weight:700;letter-spacing:.06em;
  box-shadow:0 4px 18px rgba(0,0,0,.45);font-family:'Syne',sans-serif}
.road-node.active{color:#080808;background:linear-gradient(135deg,#f0c85a,#d4a847);
  border-color:#d4a847;box-shadow:0 0 36px rgba(212,168,71,.5),0 4px 18px rgba(0,0,0,.4);
  transform:translate(-50%,-50%) scale(1.12)}
.road-node.done{color:#d4a847;border-color:rgba(212,168,71,.35);background:rgba(212,168,71,.07)}
.node-0{left:7%;top:82%}.node-1{left:24%;top:57%}.node-2{left:39%;top:72%}
.node-3{left:56%;top:40%}.node-4{left:73%;top:47%}.node-5{left:92%;top:18%}
.traveler{position:absolute;z-index:6;width:68px;height:38px;pointer-events:none;
  transition:left .55s cubic-bezier(.2,.8,.2,1),top .55s cubic-bezier(.2,.8,.2,1)}
.traveler-body{position:absolute;inset:0;border-radius:999px;
  background:linear-gradient(135deg,#f0c85a,#d4a847);
  display:grid;place-items:center;color:#080808;font-weight:900;
  box-shadow:0 0 28px rgba(212,168,71,.6),0 0 56px rgba(212,168,71,.28);
  animation:travelerPulse 2s ease-in-out infinite;font-family:'Syne',sans-serif}
.traveler-label{font-size:11px;letter-spacing:.16em;font-weight:800}
.brand-core{position:absolute;left:51%;top:53%;width:140px;height:140px;
  border-radius:50%;display:grid;place-items:center;
  background:radial-gradient(circle,#f0c85a,#d4a847);color:#080808;
  box-shadow:0 0 60px rgba(212,168,71,.45);z-index:4;
  transition:transform .55s cubic-bezier(.2,.8,.2,1);font-family:'Bebas Neue',cursive}
.brand-core span{font-size:28px;letter-spacing:.08em}
.brand-core small{position:absolute;bottom:34px;font-size:9px;letter-spacing:.2em;
  font-family:'Syne',sans-serif;font-weight:700;text-transform:uppercase}
.float-stat{position:absolute;z-index:4;padding:11px 14px;border-radius:4px;
  background:rgba(10,10,10,.8);border:1px solid rgba(255,255,255,.1)}
.float-stat span{display:block;color:rgba(242,236,224,.4);font-size:11px;margin-top:4px;font-weight:600}
.float-stat strong{font-size:14px;font-weight:800}
.stat-1{left:16%;top:16%}.stat-2{right:18%;top:16%}.stat-3{right:12%;bottom:14%}
.finish-glow{position:absolute;right:32px;bottom:28px;z-index:4;
  border:1px solid rgba(212,168,71,.28);background:rgba(212,168,71,.08);
  border-radius:3px;padding:12px 16px;color:#d4a847;font-weight:800;
  font-size:11px;letter-spacing:.2em;text-transform:uppercase}
.market-footer{display:grid;grid-template-columns:1fr 360px;gap:24px;align-items:end;margin-top:20px}
.market-control{font-family:'Bebas Neue',cursive;font-size:clamp(32px,5.5vw,72px)!important;
  max-width:720px;color:#f2ece0;letter-spacing:.02em;line-height:.9}
.market-control em{color:#d4a847;font-style:normal}
.control-chips{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.control-chips span{border:1px solid rgba(212,168,71,.18);background:rgba(212,168,71,.06);
  border-radius:3px;padding:14px;font-size:12px;font-weight:700;text-align:center;
  letter-spacing:.08em;text-transform:uppercase}

/* ── STACK ── */
.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;
  background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.06);
  border-radius:4px;overflow:hidden}
.card{background:#0d0d0d;padding:32px;transition:.25s;position:relative}
.card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:transparent;transition:.3s}
.card:hover{background:#111}
.card:hover::before{background:linear-gradient(90deg,#d4a847,transparent)}
.card svg{color:#d4a847;width:28px;height:28px;margin-bottom:16px}
.card h3{font-size:18px;font-weight:800;margin:0 0 10px;letter-spacing:.02em}
.card p{color:rgba(242,236,224,.45);line-height:1.65;font-size:14px;font-weight:500}

/* ── PROBLEM SOLVER ── */
.split{display:grid;grid-template-columns:1fr .9fr;gap:48px;align-items:center}
.split h2.section-title{font-size:clamp(40px,5.5vw,76px)}
.problem-list{display:grid;gap:8px;margin-top:28px}
.problem-btn{display:flex;justify-content:space-between;align-items:center;
  text-align:left;border:1px solid rgba(255,255,255,.08);background:#0d0d0d;
  color:#f2ece0;border-radius:4px;padding:16px 18px;font-weight:700;
  cursor:pointer;font-size:14px;font-family:'Syne',sans-serif;
  letter-spacing:.02em;transition:.25s}
.problem-btn:hover{border-color:rgba(212,168,71,.25);background:#111}
.problem-btn.on{background:rgba(212,168,71,.1);border-color:#d4a847;color:#f2ece0}
.problem-btn svg{color:rgba(242,236,224,.3);flex-shrink:0;transition:.25s}
.problem-btn.on svg{color:#d4a847;transform:rotate(90deg)}
.solution-panel{border:1px solid rgba(255,255,255,.08);border-radius:4px;
  padding:32px;background:#0d0d0d;position:sticky;top:120px}
.solution-label{color:#d4a847;font-weight:700;letter-spacing:.2em;font-size:11px;
  text-transform:uppercase;margin-bottom:14px;display:block}
.solution-panel h3{font-family:'Bebas Neue',cursive;font-size:36px;letter-spacing:.03em;
  margin:0 0 14px;line-height:.95}
.solution-panel p{color:rgba(242,236,224,.55);line-height:1.7;font-size:15px;font-weight:500}

/* ── COMPARE ── */
.compare{position:relative}
.compare .section-title{max-width:900px}
.compare-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:36px}
.compare-col{border:1px solid rgba(255,255,255,.07);border-radius:4px;overflow:hidden}
.compare-col-head{padding:20px 24px;border-bottom:1px solid rgba(255,255,255,.07)}
.compare-col-head h3{font-size:16px;font-weight:800;letter-spacing:.04em;text-transform:uppercase}
.compare-col:first-child .compare-col-head h3{color:rgba(242,236,224,.35)}
.compare-col:last-child{border-color:rgba(212,168,71,.2)}
.compare-col:last-child .compare-col-head{background:rgba(212,168,71,.06);border-bottom-color:rgba(212,168,71,.2)}
.compare-col:last-child .compare-col-head h3{color:#d4a847}
.compare-item{padding:14px 24px;border-bottom:1px solid rgba(255,255,255,.04);
  display:flex;align-items:center;gap:10px;font-size:14px;font-weight:600}
.compare-col:first-child .compare-item{color:rgba(242,236,224,.35)}
.compare-col:last-child .compare-item{color:#f2ece0}
.compare-col:last-child .compare-item svg{color:#d4a847;flex-shrink:0}
.compare-item:last-child{border-bottom:0}

/* ── INDUSTRIES ── */
.industries{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;
  background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.06);
  border-radius:4px;overflow:hidden}
.industry-card{background:#0d0d0d;padding:22px;transition:.2s;cursor:default}
.industry-card:hover{background:#111}
.industry-card strong{display:block;font-size:14px;font-weight:800;margin-bottom:8px;letter-spacing:.02em}
.industry-card span{display:block;color:rgba(242,236,224,.4);font-size:12px;
  line-height:1.5;font-weight:500}

/* ── PLANS ── */
.plans{display:grid;gap:1px;background:rgba(255,255,255,.06);
  border:1px solid rgba(255,255,255,.06);border-radius:4px;overflow:hidden}
.plan{display:flex;justify-content:space-between;gap:24px;align-items:center;
  background:#0d0d0d;padding:32px;transition:.25s}
.plan:hover{background:#111}
.plan-left{flex:1}
.plan-num{font-family:'Bebas Neue',cursive;font-size:18px;color:rgba(212,168,71,.4);
  letter-spacing:.1em;margin-bottom:8px;display:block}
.plan h3{font-family:'Bebas Neue',cursive;font-size:36px;letter-spacing:.03em;margin:0 0 10px;line-height:.95}
.plan p{color:rgba(242,236,224,.45);line-height:1.65;font-size:14px;font-weight:500;max-width:640px}
.plan-cta{white-space:nowrap;display:inline-flex;align-items:center;gap:8px;
  color:#d4a847;font-weight:800;text-decoration:none;
  border:1px solid rgba(212,168,71,.2);border-radius:3px;padding:14px 20px;
  font-size:13px;letter-spacing:.06em;text-transform:uppercase;transition:.2s;flex-shrink:0}
.plan-cta:hover{background:rgba(212,168,71,.1);border-color:#d4a847}

/* ── CONTACT ── */
.contact-section{background:#f0e8d4;color:#161616;position:relative;overflow:hidden;padding:120px 0}
.contact-section::before{content:'';position:absolute;inset:0;
  background-image:linear-gradient(rgba(22,22,22,.045) 1px,transparent 1px),
    linear-gradient(90deg,rgba(22,22,22,.045) 1px,transparent 1px);
  background-size:100px 100px}
.contact-inner{position:relative;z-index:1;
  width:min(1240px,calc(100% - 32px));margin:0 auto}
.contact-kicker{display:flex;align-items:center;gap:20px;color:#b8870a;
  font-size:12px;letter-spacing:.36em;font-weight:700;text-transform:uppercase;
  margin:0 0 28px}
.contact-kicker-line{width:64px;height:1px;background:#b8870a;display:inline-block}
.contact-title{font-family:'Bebas Neue',cursive;
  font-size:clamp(60px,11vw,152px);line-height:.87;letter-spacing:.02em;
  margin:0 0 32px;color:#171717}
.contact-title em{color:#b8870a;font-style:normal}
.contact-lead{font-size:clamp(18px,2vw,26px);line-height:1.65;color:#4a4a4a;
  max-width:820px;margin:0 0 32px;font-weight:500}
.consult-btn{display:inline-flex;align-items:center;gap:12px;
  background:#161616;color:#f0e8d4;text-decoration:none;
  border-radius:3px;padding:18px 26px;font-size:16px;font-weight:800;
  margin:0 0 60px;box-shadow:0 20px 50px rgba(0,0,0,.15);
  letter-spacing:.06em;text-transform:uppercase;transition:.2s}
.consult-btn:hover{transform:translateY(-2px);box-shadow:0 28px 64px rgba(0,0,0,.22)}
.contact-list{max-width:960px;border-top:1px solid rgba(22,22,22,.14)}
.contact-row{display:grid;grid-template-columns:10px 180px 1fr;gap:22px;
  align-items:center;min-height:88px;border-bottom:1px solid rgba(22,22,22,.12);
  color:#171717;text-decoration:none}
.contact-dot{width:8px;height:8px;background:#b8870a;border-radius:50%;flex-shrink:0}
.contact-row-label{font-family:monospace;letter-spacing:.26em;color:#888076;font-size:15px;font-weight:600}
.contact-row-value{font-size:clamp(18px,2.2vw,28px);font-weight:800;letter-spacing:-.02em;color:#171717}

footer{text-align:center;color:rgba(242,236,224,.25);padding:32px;
  font-size:12px;letter-spacing:.14em;text-transform:uppercase;font-weight:600;
  border-top:1px solid rgba(255,255,255,.04)}

/* ── KEYFRAMES ── */
@keyframes wordmarkReveal{from{opacity:0;transform:translateY(50px);filter:blur(12px)}to{opacity:1;transform:translateY(0);filter:blur(0)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
@keyframes introExit{to{opacity:0;visibility:hidden;pointer-events:none}}
@keyframes sweep{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}
@keyframes grow{to{transform:scaleY(.65);opacity:.7}}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.8)}}
@keyframes particleDrift{from{transform:translate3d(-22px,20px,0) scale(1);opacity:.45}to{transform:translate3d(38px,-24px,0) scale(1.06);opacity:.8}}
@keyframes cordMove{to{stroke-dashoffset:-180}}
@keyframes travelerPulse{0%,100%{box-shadow:0 0 28px rgba(212,168,71,.6),0 0 56px rgba(212,168,71,.28)}50%{box-shadow:0 0 48px rgba(212,168,71,.9),0 0 96px rgba(212,168,71,.5)}}
@keyframes dashmove{to{stroke-dashoffset:-50}}
@keyframes glowPulse{0%,100%{opacity:.8;transform:translate(-50%,-50%) scale(1)}50%{opacity:1;transform:translate(-50%,-50%) scale(1.1)}}

/* ── RESPONSIVE 900px ── */
@media(max-width:900px){
  .nav-links{display:none}
  .hero{grid-template-columns:1fr;min-height:auto;padding:100px 0 60px}
  .hero-visual{display:none}
  .hero-headline{font-size:clamp(52px,13vw,88px)}
  .split,.compare-grid{grid-template-columns:1fr}
  .cards{grid-template-columns:1fr 1fr}
  .reality-grid{grid-template-columns:1fr}
  .industries{grid-template-columns:1fr 1fr}
  .section{padding:70px 20px}
  .showcase{height:auto!important}
  .showcase-sticky{height:100svh!important;position:relative!important;overflow:hidden}
  .showcase-head{left:20px;right:20px;top:70px;max-width:100%}
  .showcase-head .section-title{font-size:clamp(28px,7.5vw,46px);margin:8px 0 6px}
  .showcase-head p:not(.eyebrow){font-size:13px;display:none}
  .showcase-cta{padding:11px 15px;font-size:11px;margin-top:12px}
  .showcase-cord{display:none}
  .showcase-card{width:86vw;height:56vw;min-height:220px;max-height:290px;
    padding:0 20px 20px;display:flex;flex-direction:column;justify-content:flex-end;border-radius:4px}
  .showcase-card h2{font-size:clamp(20px,5.5vw,32px)}
  .showcase-card .card-kicker{font-size:9px;letter-spacing:.2em;margin-bottom:5px}
  .card-num{font-size:10px;top:12px;right:12px}
  .showcase-explain{position:fixed;left:12px;right:12px;bottom:20px;top:auto;
    transform:none;width:auto;padding:14px 16px;border-radius:4px;z-index:20}
  .explain-title{font-size:24px;margin:6px 0}
  .explain-body{font-size:11px;line-height:1.55;margin-bottom:8px}
  .tag-row{gap:4px;margin-bottom:8px}
  .tag-pill{font-size:9px;padding:4px 7px}
  .explain-metric{padding:8px 12px;font-size:11px}
  .showcase-progress{display:none}
  .mob-card-nav{position:absolute;bottom:22px;left:50%;transform:translateX(-50%);
    z-index:30;display:flex;align-items:center;gap:14px;
    background:rgba(8,8,8,.8);border:1px solid rgba(255,255,255,.12);
    border-radius:999px;padding:8px 20px;backdrop-filter:blur(14px)}
  .mob-card-nav button{background:none;border:none;color:#d4a847;font-size:18px;
    cursor:pointer;padding:4px 8px;font-weight:900;opacity:.9;font-family:'Syne',sans-serif}
  .mob-card-nav button:disabled{opacity:.25;cursor:default}
  .mob-card-nav span{color:#f2ece0;font-size:12px;letter-spacing:.12em;font-weight:700;
    min-width:38px;text-align:center}
  .growth-section{height:auto!important;padding:60px 20px 40px}
  .sticky-growth{position:relative!important;height:auto!important;padding:60px 0}
  .road-stage{grid-template-columns:1fr;gap:14px;min-height:auto;margin-top:14px}
  .road-wrap{height:280px;border-radius:4px}
  .brand-core{width:76px;height:76px}
  .brand-core span{font-size:17px}
  .brand-core small{font-size:8px;bottom:20px}
  .traveler{width:48px;height:28px}
  .float-stat{display:none}
  .finish-glow{display:none}
  .market-footer{grid-template-columns:1fr;margin-top:24px;gap:16px}
  .market-control{font-size:clamp(30px,8vw,48px)!important}
  .control-chips{grid-template-columns:1fr 1fr;gap:8px}
  .control-chips span{padding:12px 10px;font-size:11px}
  .contact-section{padding:70px 0}
  .contact-title{font-size:clamp(52px,12vw,88px)}
  .consult-btn{font-size:13px;padding:15px 20px;margin-bottom:36px}
  .contact-row{grid-template-columns:8px 1fr;gap:12px;min-height:64px}
  .contact-row-label{display:none}
  .contact-row-value{font-size:clamp(14px,4vw,22px)}
  .plan{flex-direction:column;align-items:flex-start;gap:14px;padding:24px}
  .plan h3{font-size:30px}
}
@media(max-width:500px){
  .cards{grid-template-columns:1fr}
  .industries{grid-template-columns:1fr 1fr}
  .compare-grid{grid-template-columns:1fr}
  .showcase-card{height:64vw}
  .hero-headline{font-size:clamp(46px,14vw,76px)}
}
`;

/* ─── COMPONENT ──────────────────────────────────────────────── */
export default function App() {
  const [lang, setLang] = useState('en');
  const [showIntro, setShowIntro] = useState(true);
  const [activeProblem, setActiveProblem] = useState(0);
  const [showcaseProgress, setShowcaseProgress] = useState(0);
  const [mobileCardIndex, setMobileCardIndex] = useState(0);
  const showcaseProgressRef = useRef(0);
  const showcaseStepRef = useRef(0);
  const wheelBufferRef = useRef(0);
  const wheelCooldownRef = useRef(false);
  const [roadProgress, setRoadProgress] = useState(0);
  const roadProgressRef = useRef(0);
  const pathRef = useRef(null);
  const [traveler, setTraveler] = useState({ x: 40, y: 380, angle: -18 });

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 3400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const setLockedShowcaseStep = (step) => {
      const max = slides.length - 1;
      const nextStep = Math.min(max, Math.max(0, step));
      showcaseStepRef.current = nextStep;
      const nextProgress = nextStep / max;
      showcaseProgressRef.current = nextProgress;
      setShowcaseProgress(nextProgress);
    };
    const onWheel = (e) => {
      if (window.innerWidth <= 900) return;
      const show = document.getElementById('kaba-showcase');
      if (show) {
        const rect = show.getBoundingClientRect();
        const startLocked = rect.top <= 8 && rect.bottom >= window.innerHeight * 0.15;
        if (startLocked) {
          const currentStep = showcaseStepRef.current;
          const maxStep = slides.length - 1;
          e.preventDefault();
          window.scrollTo({ top: show.offsetTop, behavior: 'auto' });
          wheelBufferRef.current += e.deltaY;
          if (wheelCooldownRef.current || Math.abs(wheelBufferRef.current) < 500) return;
          if (e.deltaY > 0 && currentStep >= maxStep) {
            window.scrollTo({ top: show.offsetTop + show.offsetHeight + 2, behavior: 'auto' }); return;
          }
          if (e.deltaY <= 0 && currentStep <= 0) {
            window.scrollTo({ top: show.offsetTop - window.innerHeight * 0.85, behavior: 'auto' }); return;
          }
          wheelCooldownRef.current = true;
          wheelBufferRef.current = 0;
          setLockedShowcaseStep(currentStep + (e.deltaY > 0 ? 1 : -1));
          setTimeout(() => { wheelCooldownRef.current = false; }, 650);
        }
      }
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, []);

  useEffect(() => {
    const updateRoad = (ratio) => {
      const path = pathRef.current;
      if (!path || typeof path.getTotalLength !== 'function') return;
      const len = path.getTotalLength();
      const current = path.getPointAtLength(len * ratio);
      const next = path.getPointAtLength(Math.min(len, len * ratio + 1));
      const angle = Math.atan2(next.y - current.y, next.x - current.x) * (180 / Math.PI);
      setTraveler({ x: current.x, y: current.y, angle });
    };
    const onScroll = () => {
      const show = document.getElementById('kaba-showcase');
      if (show) {
        const rect = show.getBoundingClientRect();
        if (rect.top > window.innerHeight * 0.7) {
          showcaseStepRef.current = 0; showcaseProgressRef.current = 0; setShowcaseProgress(0);
        }
      }
      const road = document.getElementById('growth-system');
      if (road) {
        const rect = road.getBoundingClientRect();
        const total = Math.max(1, road.offsetHeight - window.innerHeight);
        const passed = Math.min(Math.max(-rect.top, 0), total);
        const ratio = Math.min(1, Math.max(0, passed / total));
        roadProgressRef.current = ratio;
        setRoadProgress(ratio);
        updateRoad(ratio);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const activeIndex = Math.min(roadmap.length - 1, Math.floor(roadProgress * (roadmap.length - 0.001)));
  const active = roadmap[activeIndex];
  const rawShowcase = showcaseProgress * (slides.length - 1);
  const showcaseIndex = Math.min(slides.length - 1, Math.max(0, Math.round(rawShowcase)));
  const activeSlide = slides[showcaseIndex];
  const slideMotion = rawShowcase - Math.floor(rawShowcase);
  const roadStyle = { '--progress': `${Math.max(roadProgress * 100, 5)}%` };

  const jumpShowcase = (i) => {
    const el = document.getElementById('kaba-showcase');
    if (!el) return;
    showcaseStepRef.current = i;
    showcaseProgressRef.current = i / (slides.length - 1);
    setShowcaseProgress(i / (slides.length - 1));
    window.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
  };

  const langLabel = (l) => l === 'am' ? 'አማ' : l.toUpperCase();

  return (
    <main className="app">
      <style>{styles}</style>
      <div className="noise" />
      <div className="grid-bg" />

      {/* ── INTRO ── */}
      {showIntro && (
        <div className="intro-screen">
          <div className="intro-noise" />
          <div className="intro-glow" />
          <div className="intro-content">
            <div className="intro-wordmark">KABA</div>
            <div className="intro-sub">DIGITALS</div>
            <div className="intro-tagline">Growth Systems for Ethiopian Businesses</div>
            <div className="intro-enter">
              <button onClick={() => setShowIntro(false)}>Enter the Lab <ArrowUpRight size={16}/></button>
            </div>
          </div>
        </div>
      )}

      {/* ── NAV ── */}
      <header className="nav">
        <div className="brand">
          <span className="brand-dot"/>
          KABA DIGITALS
        </div>
        <nav className="nav-links">
          <a href="#kaba-showcase">Systems</a>
          <a href="#growth-system">Growth</a>
          <a href="#stack">Services</a>
          <a href="#plans">Packages</a>
        </nav>
        <div className="nav-cta">
          <div className="lang">
            {['en','am','fr'].map(l => (
              <button key={l} onClick={() => setLang(l)} className={lang === l ? 'on' : ''}>{langLabel(l)}</button>
            ))}
          </div>
          <a className="nav-book" href="https://wa.me/251913864659" target="_blank" rel="noreferrer">Book Call <ArrowUpRight size={13}/></a>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="hero section">
        <div>
          <p className="eyebrow"><span className="eyebrow-line"/><Sparkles size={13}/>KABA DIGITALS / GROWTH COMMAND CENTER</p>
          <h1 className="hero-headline">{t[lang].heroTitle.split('. ').map((part, i, arr) => (
            <React.Fragment key={i}>
              {i === arr.length - 1 ? <em>{part}.</em> : <>{part}.<br/></>}
            </React.Fragment>
          ))}</h1>
          <p className="hero-body">{t[lang].heroSub}</p>
          <div className="hero-actions">
            <a className="btn-primary" href="https://wa.me/251913864659" target="_blank" rel="noreferrer">
              {t[lang].heroCta} <ArrowUpRight size={17}/>
            </a>
            <a className="btn-ghost" href="#kaba-showcase">
              <Play size={15}/>{t[lang].heroCtaSecondary}
            </a>
          </div>
          <div className="proof-strip">
            <span className="proof-pill"><Check size={14}/>60+ Clients Served</span>
            <span className="proof-pill"><Check size={14}/>10+ Medical & Dental</span>
            <span className="proof-pill"><Check size={14}/>Websites · Ads · CRM</span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="dash-card">
            <div className="dash-dots"><span/><span/><span/></div>
            <div className="dash-label">Market Signal</div>
            <div className="dash-metric">+284%</div>
            <div className="dash-sub">Lead Growth — Last 90 Days</div>
            <div className="dash-bars"><i/><i/><i/><i/><i/></div>
            <div className="dash-grid">
              <b>Video</b><b>Ads</b><b>Systems</b><b>CRM</b>
            </div>
            <div className="dash-float">
              <strong>47</strong>
              <span>New Leads Today</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── REALITY ── */}
      <section className="section">
        <p className="eyebrow"><span className="eyebrow-line"/><Zap size={13}/>THE REALITY</p>
        <h2 className="section-title">{t[lang].realityTitle}</h2>
        <div className="reality-grid">
          <article className="reality-card">
            <div className="reality-num">01</div>
            <h3>{t[lang].r1h}</h3>
            <p>{t[lang].r1p}</p>
          </article>
          <article className="reality-card">
            <div className="reality-num">02</div>
            <h3>{t[lang].r2h}</h3>
            <p>{t[lang].r2p}</p>
          </article>
          <article className="reality-card">
            <div className="reality-num">03</div>
            <h3>{t[lang].r3h}</h3>
            <p>{t[lang].r3p}</p>
          </article>
        </div>
      </section>

      {/* ── SHOWCASE ── */}
      <section id="kaba-showcase" className="showcase" style={{height:'400vh'}}>
        <div className="showcase-sticky">
          <div className="showcase-head">
            <p className="eyebrow"><Sparkles size={13}/>GROWTH SYSTEMS</p>
            <h2 className="section-title">{t[lang].showcaseTitle}</h2>
            <p>{t[lang].showcaseSub}</p>
            <a className="showcase-cta" href="https://wa.me/251913864659" target="_blank" rel="noreferrer">
              Book 20-Min Consultation <ArrowUpRight size={16}/>
            </a>
          </div>
          <svg className="showcase-cord" viewBox="0 0 1200 460" preserveAspectRatio="none">
            <path d="M20 250 C210 40 360 420 560 210 C740 20 880 390 1180 120" />
          </svg>
          <div className="showcase-stage">
            {slides.map((item, i) => {
              const offset = i - rawShowcase;
              const isActive = Math.abs(offset) < .55;
              const cardStyle = {
                transform:`translate3d(${offset*56}vw,${Math.abs(offset)*32}px,0) rotateY(${offset*-17}deg) rotateZ(${offset*2.4}deg) scale(${isActive?1:.82})`,
                opacity:Math.abs(offset)>2.2?0:isActive?1:.36,
                filter:isActive?'blur(0px)':'blur(1px)'
              };
              return (
                <article key={item.side} className={`showcase-card ${isActive?'active':''}`} style={cardStyle}>
                  <span className="card-num">0{i+1} / 05</span>
                  <p className="card-kicker">{item.kicker}</p>
                  <h2>{item.title.split('\n').map((line,j)=><React.Fragment key={j}>{line}<br/></React.Fragment>)}</h2>
                  <div className="card-progress-line" style={{width:isActive?`${32+slideMotion*52}%`:'18%'}}/>
                </article>
              );
            })}
          </div>
          <aside className="showcase-explain">
            <div className="explain-count">0{showcaseIndex+1} / 05</div>
            <h3 className="explain-title">{activeSlide.side}</h3>
            <p className="explain-body">{activeSlide.body}</p>
            <div className="tag-row">{activeSlide.tags.map(tag=><span key={tag} className="tag-pill">{tag}</span>)}</div>
            <em className="explain-metric">{activeSlide.metric}</em>
          </aside>
          <div className="showcase-progress">
            {slides.map((item,i)=>(
              <button key={item.side} onClick={()=>jumpShowcase(i)} className={i===showcaseIndex?'on':''}>
                <small>0{i+1}</small>{item.side}
              </button>
            ))}
          </div>
          <div className="mob-card-nav">
            <button onClick={()=>jumpShowcase(Math.max(0,showcaseIndex-1))} disabled={showcaseIndex===0}>←</button>
            <span>{showcaseIndex+1} / {slides.length}</span>
            <button onClick={()=>jumpShowcase(Math.min(slides.length-1,showcaseIndex+1))} disabled={showcaseIndex===slides.length-1}>→</button>
          </div>
        </div>
      </section>

      {/* ── GROWTH ROADMAP ── */}
      <section id="growth-system" className="growth-section">
        <div className="sticky-growth">
          <div className="section-intro">
            <p className="eyebrow"><span className="eyebrow-line"/><MousePointer2 size={13}/>SCROLL TO GROW</p>
            <h2 className="section-title">{t[lang].roadTitle}</h2>
            <p className="section-body">{t[lang].roadSub}</p>
          </div>
          <div className="road-stage">
            <aside className="stage-panel">
              <div className="progress-chip">
                <span>Growth progress</span>
                <strong>{Math.round(roadProgress*100)}%</strong>
              </div>
              <div className="stage-card">
                <div className="stage-num">0{activeIndex+1}</div>
                <h3>{active.title}</h3>
                <p>{active.text}</p>
                <span className="stage-metric">{active.metric}</span>
              </div>
              <div className="stage-list">
                {roadmap.map((step,i)=>{
                  const Icon=step.icon;
                  return(
                    <div key={step.title} className={`mini-stage ${i<=activeIndex?'done':''} ${i===activeIndex?'current':''}`}>
                      <Icon size={15}/><span>{step.title}</span>
                    </div>
                  );
                })}
              </div>
            </aside>
            <div className="road-wrap" style={roadStyle}>
              <div className="road-bg-grid"/>
              <svg className="road" viewBox="0 0 1100 460" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="roadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#d4a847"/>
                    <stop offset="100%" stopColor="#f0c85a"/>
                  </linearGradient>
                </defs>
                <path className="road-shadow" d="M40 380 C220 250 280 420 430 290 C570 168 660 290 770 185 C870 90 980 125 1060 70"/>
                <path className="road-surface" d="M40 380 C220 250 280 420 430 290 C570 168 660 290 770 185 C870 90 980 125 1060 70"/>
                <path ref={pathRef} className="road-centerline" d="M40 380 C220 250 280 420 430 290 C570 168 660 290 770 185 C870 90 980 125 1060 70"/>
                <path className="road-progress-line" d="M40 380 C220 250 280 420 430 290 C570 168 660 290 770 185 C870 90 980 125 1060 70"/>
              </svg>
              {roadmap.map((step,i)=>{
                const Icon=step.icon;
                return(
                  <div key={step.title} className={`road-node node-${i} ${i===activeIndex?'active':i<activeIndex?'done':''}`}>
                    <Icon size={15}/><span>{step.title}</span>
                  </div>
                );
              })}
              <div className="traveler" style={{left:`${traveler.x}px`,top:`${traveler.y}px`,transform:`translate(-50%,-50%) rotate(${traveler.angle}deg)`}}>
                <div className="traveler-body"><span className="traveler-label">KABA</span></div>
              </div>
              <div className="brand-core" style={{transform:`translate(-50%,-50%) scale(${active.scale||1})`}}>
                <span>KABA</span><small>{active.metric}</small>
              </div>
              <div className="finish-glow">MARKET CONTROL</div>
              <div className="float-stat stat-1"><strong>Visibility</strong><span>→ On</span></div>
              <div className="float-stat stat-2"><strong>Trust</strong><span>+ Brand Lift</span></div>
              <div className="float-stat stat-3"><strong>Leads</strong><span>Flow Activated</span></div>
            </div>
          </div>
          <div className="market-footer">
            <h2 className="market-control">{t[lang].marketControl.split('. ').map((part,i,arr)=>(
              <React.Fragment key={i}>
                {i===arr.length-1?<em>{part}.</em>:<>{part}.<br/></>}
              </React.Fragment>
            ))}</h2>
            <div className="control-chips">
              <span>Strategy locked</span>
              <span>Content engine live</span>
              <span>Leads moving</span>
              <span>Scale mode</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── STACK / SERVICES ── */}
      <section id="stack" className="section">
        <p className="eyebrow"><span className="eyebrow-line"/><Zap size={13}/>WHAT KABA SELLS</p>
        <h2 className="section-title">Websites, Content, Ads, and Systems Built to Bring Customers.</h2>
        <div className="cards" style={{marginTop:36}}>
          {stack.map(([title,text,Icon])=>(
            <article className="card" key={title}>
              <Icon/><h3>{title}</h3><p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── PROBLEM SOLVER ── */}
      <section className="section split">
        <div>
          <p className="eyebrow"><span className="eyebrow-line"/><Wand2 size={13}/>PROBLEM SOLVER</p>
          <h2 className="section-title">What Is Slowing Your Business Down?</h2>
          <p className="section-body" style={{marginBottom:0}}>Pick the real problem. Kaba does not sell random posts. We fix the path from attention to conversion.</p>
          <div className="problem-list">
            {problems.map((p,i)=>(
              <button onClick={()=>setActiveProblem(i)} className={`problem-btn ${activeProblem===i?'on':''}`} key={p[0]}>
                {p[0]}<ChevronRight size={16}/>
              </button>
            ))}
          </div>
        </div>
        <div className="solution-panel">
          <span className="solution-label">THE KABA ANSWER</span>
          <h3>{problems[activeProblem][0]}</h3>
          <p>{problems[activeProblem][1]}</p>
        </div>
      </section>

      {/* ── COMPARE ── */}
      <section className="section compare">
        <p className="eyebrow"><span className="eyebrow-line"/><ShieldCheck size={13}/>WHY KABA</p>
        <h2 className="section-title">Most Agencies Sell Content. We Build the Machine Behind It.</h2>
        <div className="compare-grid">
          <div className="compare-col">
            <div className="compare-col-head"><h3>Normal Agencies</h3></div>
            {['Post and disappear','Focus on likes','Random designs','No tracking','One-size-fits-all','Content only'].map(x=>(
              <div key={x} className="compare-item">{x}</div>
            ))}
          </div>
          <div className="compare-col">
            <div className="compare-col-head"><h3>Kaba Digitals</h3></div>
            {['Strategy before execution','Leads, trust, and sales','Brand direction and consistency','Lead and campaign systems','Built around your model','Content + ads + website + sales flow'].map(x=>(
              <div key={x} className="compare-item"><ShieldCheck size={15}/>{x}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="section">
        <p className="eyebrow"><span className="eyebrow-line"/><Users size={13}/>INDUSTRIES</p>
        <h2 className="section-title">Built for Businesses Ready to Be Seen.</h2>
        <div className="industries" style={{marginTop:36}}>
          {industries.map(([name,desc])=>(
            <div className="industry-card" key={name}>
              <strong>{name}</strong><span>{desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── PLANS ── */}
      <section id="plans" className="section">
        <p className="eyebrow"><span className="eyebrow-line"/><Layers3 size={13}/>PACKAGES</p>
        <h2 className="section-title">Choose the Package That Fits Your Growth Stage.</h2>
        <div className="plans" style={{marginTop:36}}>
          {[
            ['Website Launch','For businesses that need a serious website, clear offer, lead form, WhatsApp flow, and professional online presence.'],
            ['Monthly Growth System','For businesses ready for monthly content, ads, website improvements, CRM, and lead follow-up structure.'],
            ['Kaba Elite Domination','For serious brands that want full strategy, video production, campaigns, landing pages, CRM, reporting, and scale direction.']
          ].map(([title,desc],i)=>(
            <article className="plan" key={title}>
              <div className="plan-left">
                <span className="plan-num">0{i+1}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
              <a href="#contact" className="plan-cta">Apply for This Plan <ArrowUpRight size={16}/></a>
            </article>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="contact-section">
        <div className="contact-inner">
          <p className="contact-kicker"><span className="contact-kicker-line"/>WE LISTEN FIRST</p>
          <h2 className="contact-title">{t[lang].contactTitle.split('?')[0]}<em>?</em></h2>
          <p className="contact-lead">{t[lang].contactLead}</p>
          <a className="consult-btn" href="https://wa.me/251913864659" target="_blank" rel="noreferrer">
            {t[lang].consultBtn} <ArrowUpRight size={20}/>
          </a>
          <div className="contact-list">
            <a href="tel:+251913864659" className="contact-row">
              <span className="contact-dot"/>
              <span className="contact-row-label">PHONE</span>
              <b className="contact-row-value">+251 913 864 659</b>
            </a>
            <a href="mailto:kabadigitals@gmail.com" className="contact-row">
              <span className="contact-dot"/>
              <span className="contact-row-label">EMAIL</span>
              <b className="contact-row-value">kabadigitals@gmail.com</b>
            </a>
            <a href="https://instagram.com/kaba_digital_marketing" target="_blank" rel="noreferrer" className="contact-row">
              <span className="contact-dot"/>
              <span className="contact-row-label">INSTAGRAM</span>
              <b className="contact-row-value">@kaba_digital_marketing</b>
            </a>
            <div className="contact-row">
              <span className="contact-dot"/>
              <span className="contact-row-label">LOCATION</span>
              <b className="contact-row-value">Addis Ababa, Ethiopia</b>
            </div>
          </div>
        </div>
      </section>

      <footer>Kaba Digitals — Less Effort. More Growth.</footer>
    </main>
  );
}
