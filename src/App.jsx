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
  { icon: Radio, title:'Invisible', text:'Weak signal. Low trust. No clear reason for the market to care about you.', metric:'0→1', scale:.72 },
  { icon: Brain, title:'Diagnose', text:'We scan your offer, audience, competitors, content, and sales bottlenecks.', metric:'CLARITY', scale:.9 },
  { icon: Target, title:'Position', text:'We shape the message so people immediately understand what you sell and why it matters.', metric:'TRUST', scale:1.05 },
  { icon: Camera, title:'Create', text:'Video, photo, graphics, hooks, landing pages, and campaigns built to convert.', metric:'ASSETS', scale:1.2 },
  { icon: Rocket, title:'Launch', text:'Campaigns go live. Traffic, messages, leads, calls, and sales start moving.', metric:'+LEADS', scale:1.42 },
  { icon: LineChart, title:'Dominate', text:'We double down on what works and build repeatable growth systems.', metric:'DOMINATE', scale:1.75 }
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
  ['Restaurants & Cafes','Craving-led content → local offers → visits'],
  ['Gyms & Fitness','Authority content → challenges → memberships'],
  ['Hotels & Guest Houses','Experience content → trust campaigns → bookings'],
  ['Furniture Stores','Design visuals → product campaigns → showroom visits'],
  ['Clinics & Wellness','Trust content → education → appointments'],
  ['Beauty Salons & Spas','Transformation content → local campaigns → bookings'],
  ['Real Estate','Property content → lead campaigns → qualified buyers'],
  ['Fashion Brands','Style content → product campaigns → sales traffic'],
  ['E-commerce Stores','Product creatives → conversion campaigns → orders'],
  ['Schools & Training','Authority content → enrollment campaigns → signups'],
  ['Car Dealerships','Showcase content → demand campaigns → inquiries'],
  ['Interior Design','Portfolio content → authority positioning → leads'],
];

const t = {
  en: {
    heroTitle:"We Don't Make Content.",
    heroTitleAccent:"We Build Empires.",
    heroSub:"Kaba Labs combines video production, ads, websites, CRM, and growth systems to help Ethiopian businesses look trusted online and get more customers every month.",
    heroCta:"Book 20-Min Consultation",
    heroCtaSecondary:"See The Systems",
    realityTitle:"Your Competitors Are Already Winning Online.",
    r1h:"They found you first on Google — and chose someone else.",
    r1p:"If your business does not look trusted online, customers call your competitor instead.",
    r2h:"Walk-ins and word of mouth are not enough anymore.",
    r2p:"The fastest-growing businesses in Ethiopia are using consistent content, targeted ads, and follow-up.",
    r3h:"You tried marketing before and it did not work.",
    r3p:"Boosting posts is not advertising. Random videos are not strategy. Kaba builds the full system.",
    showcaseTitle:"Choose the system your business needs to grow.",
    showcaseSub:"Websites, content, ads, and follow-up should work together.",
    roadTitle:"Your Brand Does Not Need Random Content.",
    roadTitleAccent:"It Needs a Growth System.",
    roadSub:"Scroll and watch how Kaba turns an invisible business into a brand with attention, trust, leads, and sales.",
    marketControl:"This is not marketing.",
    marketControlAccent:"This is market control.",
    contactTitle:"What Are You Looking For?",
    contactLead:"Every business is different. Book a 20-minute consultation and tell us exactly what you need.",
    consultBtn:"Book a 20-Minute Consultation",
  },
  am: {
    heroTitle:"ኮንተንት አንሠራም።",
    heroTitleAccent:"ኢምፓየር እንገነባለን።",
    heroSub:"KABA LABS ቪዲዮ፣ ማስታወቂያ፣ ድረ-ገጽ፣ CRM እና የእድገት ስርዓቶችን በማጣመር የኢትዮጵያ ቢዝነሶች ታማኝ ሆነው እንዲታዩ እና ደንበኞች እንዲያገኙ ያግዛሉ።",
    heroCta:"20 ደቂቃ ምክክር ያዝዙ",
    heroCtaSecondary:"ስርዓቶቹን ይመልከቱ",
    realityTitle:"ተወዳዳሪዎችዎ አስቀድሞ በኦንላይን እያሸነፉ ነው።",
    r1h:"በጉግል ካርታ አገኙዎትና — ሌላ ሰው መረጡ።",
    r1p:"ቢዝነሶ በኦንላይን አስተማማኝ ካልሆነ ደንበኞ ተወዳዳሪዎን ይደውሉለታል።",
    r2h:"ወደ ውስጥ መምጣት እና ተሰምቶ መሰራጨት አሁን አይበቃም።",
    r2p:"ፈጣን እያደጉ ያሉ ቢዝነሶች ወጥ ኮንተንት እና የታለሙ ማስታወቂያዎች ላይ እየኢንቨስት ናቸው።",
    r3h:"ከዚህ ቀደም ማርኬቲንግ ሞክርዎ ውጤት አልሰጠዎትም።",
    r3p:"ፖስት ማስተዋወቅ ማስታወቂያ አይደለም። KABA ሙሉ ስርዓቱን ይገነባል።",
    showcaseTitle:"ቢዝነሶ ለማደግ የሚፈልጉትን ስርዓት ይምረጡ።",
    showcaseSub:"ድረ-ገጽ፣ ኮንተንት፣ ማስታወቂያ እና ክትትል አብረው መስራት አለባቸው።",
    roadTitle:"ብራንድዎ ተራ ኮንተንት አይደለም የሚፈልገው።",
    roadTitleAccent:"የእድገት ስርዓት ያስፈልገዋል።",
    roadSub:"ስክሮል አድርገው KABA ያልታወቀ ቢዝነስን ወደ ሚታይ ብራንድ እንዴት እንደሚቀይር ይመልከቱ።",
    marketControl:"ይህ ማርኬቲንግ ብቻ አይደለም።",
    marketControlAccent:"የገበያ ቁጥጥር ነው።",
    contactTitle:"ምን እየፈለጉ ነው?",
    contactLead:"እያንዳንዱ ቢዝነስ የተለየ ነው። 20 ደቂቃ ምክክር ያዝዙ።",
    consultBtn:"20 ደቂቃ ምክክር ያዝዙ",
  },
  fr: {
    heroTitle:"Nous ne créons pas du contenu.",
    heroTitleAccent:"Nous bâtissons des empires.",
    heroSub:"Kaba Labs combine production vidéo, publicités, sites web, CRM et systèmes de croissance pour aider les entreprises éthiopiennes à paraître crédibles et attirer plus de clients chaque mois.",
    heroCta:"Réserver 20 min de consultation",
    heroCtaSecondary:"Voir les systèmes",
    realityTitle:"Vos concurrents gagnent déjà en ligne.",
    r1h:"Ils vous ont trouvé sur Google — et ont choisi quelqu'un d'autre.",
    r1p:"Si votre entreprise n'est pas crédible en ligne, les clients appellent votre concurrent.",
    r2h:"Les clients spontanés et le bouche-à-oreille ne suffisent plus.",
    r2p:"Les entreprises qui croissent le plus vite investissent dans du contenu régulier et des publicités ciblées.",
    r3h:"Vous avez essayé le marketing avant — sans résultat.",
    r3p:"Booster des publications n'est pas de la publicité. Kaba construit le système complet derrière la croissance.",
    showcaseTitle:"Choisissez le système dont votre entreprise a besoin pour croître.",
    showcaseSub:"Sites web, contenu, publicités et suivi doivent fonctionner ensemble.",
    roadTitle:"Votre marque n'a pas besoin de contenu aléatoire.",
    roadTitleAccent:"Elle a besoin d'un système de croissance.",
    roadSub:"Faites défiler et regardez comment Kaba transforme une entreprise invisible en marque qui attire et vend.",
    marketControl:"Ce n'est pas du marketing.",
    marketControlAccent:"C'est le contrôle du marché.",
    contactTitle:"Que cherchez-vous ?",
    contactLead:"Chaque entreprise est différente. Réservez 20 minutes de consultation.",
    consultBtn:"Réserver 20 min de consultation",
  }
};

/* ─── STYLES ──────────────────────────────────────────────────── */
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Montserrat:wght@300;400;500;600;700;800&display=swap');

*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:#fff;overflow-x:hidden}

/* ── BASE ── */
.app{min-height:100vh;background:#fff;color:#0f0f0f;font-family:'Montserrat',system-ui,sans-serif;overflow-x:hidden}

/* ── SCROLLBAR ── */
::-webkit-scrollbar{width:3px}
::-webkit-scrollbar-track{background:#f5f5f5}
::-webkit-scrollbar-thumb{background:#c9a227;border-radius:2px}

/* ── NAV ── */
.nav{position:fixed;top:0;left:0;right:0;z-index:90;
  display:flex;align-items:center;justify-content:space-between;
  padding:18px 48px;background:rgba(255,255,255,.94);
  backdrop-filter:blur(16px);border-bottom:1px solid rgba(0,0,0,.06)}

.brand{font-family:'Cormorant',serif;font-size:22px;font-weight:700;
  letter-spacing:.08em;color:#0f0f0f;display:flex;align-items:center;gap:10px}
.brand em{color:#c9a227;font-style:normal}

.nav-links{display:flex;gap:32px}
.nav-links a{color:rgba(15,15,15,.45);text-decoration:none;font-size:12px;
  font-weight:600;letter-spacing:.12em;text-transform:uppercase;transition:.2s}
.nav-links a:hover{color:#0f0f0f}

.nav-right{display:flex;align-items:center;gap:16px}
.lang{display:flex;gap:2px}
.lang button{border:1px solid transparent;background:transparent;color:rgba(15,15,15,.4);
  padding:6px 9px;font-weight:700;font-size:11px;cursor:pointer;
  letter-spacing:.08em;transition:.2s;font-family:'Montserrat',sans-serif;border-radius:2px}
.lang button:hover{color:#0f0f0f}
.lang .on{border-color:rgba(201,162,39,.4);background:rgba(201,162,39,.08);color:#0f0f0f}
.nav-book{display:inline-flex;align-items:center;gap:8px;padding:10px 18px;
  background:#0f0f0f;color:#fff;text-decoration:none;
  font-weight:700;font-size:11px;letter-spacing:.12em;text-transform:uppercase;transition:.2s}
.nav-book:hover{background:#c9a227}

/* ── SECTION ── */
.section{width:min(1200px,calc(100% - 48px));margin:0 auto;padding:120px 0;position:relative}

.eyebrow{display:flex;align-items:center;gap:12px;color:#c9a227;font-size:11px;
  letter-spacing:.26em;font-weight:700;text-transform:uppercase;margin-bottom:24px}
.eyebrow-rule{width:32px;height:1px;background:#c9a227;flex-shrink:0}

/* ── INTRO ── */
.intro-screen{position:fixed;inset:0;z-index:999;background:#fff;
  display:grid;place-items:center;overflow:hidden;
  animation:introExit .6s ease 3.0s forwards;pointer-events:none}
.intro-content{text-align:center;position:relative}
.intro-wordmark{font-family:'Cormorant',serif;font-size:clamp(80px,16vw,180px);
  font-weight:600;letter-spacing:.06em;color:#0f0f0f;line-height:.9;
  animation:wordmarkReveal .8s cubic-bezier(.2,.8,.2,1) .2s both}
.intro-wordmark em{color:#c9a227;font-style:normal}
.intro-rule{width:80px;height:1px;background:#c9a227;margin:20px auto;
  animation:ruleExpand .6s ease .8s both}
.intro-sub{font-size:11px;letter-spacing:.38em;font-weight:700;text-transform:uppercase;
  color:rgba(15,15,15,.4);animation:fadeUp .6s ease 1.0s both}
.intro-tagline{font-family:'Cormorant',serif;font-size:18px;font-weight:400;font-style:italic;
  color:rgba(15,15,15,.5);margin-top:10px;animation:fadeUp .6s ease 1.2s both}
.intro-enter{margin-top:28px;animation:fadeUp .6s ease 1.4s both}
.intro-enter button{border:1px solid #0f0f0f;background:transparent;
  color:#0f0f0f;padding:12px 24px;font-weight:700;font-size:11px;
  letter-spacing:.14em;text-transform:uppercase;cursor:pointer;transition:.2s;
  display:inline-flex;align-items:center;gap:10px;font-family:'Montserrat',sans-serif}
.intro-enter button:hover{background:#0f0f0f;color:#fff}

/* ── HERO ── */
.hero{min-height:100vh;display:grid;grid-template-columns:1.05fr .95fr;
  align-items:center;gap:80px;padding-top:80px}
.hero-title{font-family:'Cormorant',serif;font-size:clamp(52px,7.5vw,112px);
  line-height:1;letter-spacing:-.01em;color:#0f0f0f;font-weight:600;margin-bottom:6px}
.hero-title-accent{font-family:'Cormorant',serif;font-size:clamp(52px,7.5vw,112px);
  line-height:1;letter-spacing:-.01em;color:#c9a227;font-weight:600;
  font-style:italic;margin-bottom:32px;display:block}
.hero-body{font-size:16px;color:rgba(15,15,15,.55);line-height:1.8;
  max-width:520px;margin-bottom:40px;font-weight:400}
.hero-actions{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:44px}
.btn-primary{display:inline-flex;align-items:center;gap:10px;padding:16px 24px;
  background:#0f0f0f;color:#fff;text-decoration:none;
  font-weight:700;font-size:12px;letter-spacing:.1em;text-transform:uppercase;transition:.2s}
.btn-primary:hover{background:#c9a227}
.btn-ghost{display:inline-flex;align-items:center;gap:10px;padding:16px 24px;
  border:1px solid rgba(0,0,0,.2);color:#0f0f0f;text-decoration:none;
  font-weight:600;font-size:12px;letter-spacing:.1em;text-transform:uppercase;transition:.2s}
.btn-ghost:hover{border-color:#0f0f0f}
.proof-strip{display:flex;gap:10px;flex-wrap:wrap}
.proof-pill{display:flex;gap:8px;align-items:center;color:rgba(15,15,15,.5);
  font-size:12px;font-weight:600;letter-spacing:.04em}
.proof-pill svg{color:#c9a227;width:14px;height:14px}
.proof-sep{width:1px;height:14px;background:rgba(0,0,0,.12);margin:0 2px}

/* ── HERO VISUAL ── */
.hero-visual{position:relative;min-height:520px;display:grid;place-items:center}
.dash-card{width:min(460px,100%);border:1px solid rgba(0,0,0,.08);
  background:#fff;box-shadow:0 4px 6px rgba(0,0,0,.04),0 24px 64px rgba(0,0,0,.06);
  padding:28px;overflow:hidden;position:relative}
.dash-card::before{content:'';position:absolute;inset:0;
  background:linear-gradient(90deg,transparent,rgba(201,162,39,.04),transparent);
  animation:sweep 4.5s infinite}
.dash-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:28px}
.dash-dots{display:flex;gap:6px}
.dash-dots span{width:8px;height:8px;border-radius:50%}
.dash-dots span:nth-child(1){background:#0f0f0f}
.dash-dots span:nth-child(2){background:rgba(0,0,0,.2)}
.dash-dots span:nth-child(3){background:rgba(0,0,0,.08)}
.dash-badge{font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;
  color:#c9a227;border:1px solid rgba(201,162,39,.3);padding:5px 10px}
.dash-label{font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;
  color:rgba(15,15,15,.35);margin-bottom:6px}
.dash-metric{font-family:'Cormorant',serif;font-size:80px;color:#c9a227;
  font-weight:700;line-height:1;letter-spacing:-.02em}
.dash-sub{font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;
  color:rgba(15,15,15,.3);margin-bottom:28px;margin-top:4px}
.dash-bars{display:flex;gap:8px;align-items:end;height:120px;
  margin-bottom:20px;border-bottom:1px solid rgba(0,0,0,.06);padding-bottom:0}
.dash-bars i{flex:1;border-radius:1px 1px 0 0;background:#0f0f0f;
  animation:grow 2.6s ease-in-out infinite alternate}
.dash-bars i:nth-child(1){height:28%;opacity:.15}.dash-bars i:nth-child(2){height:52%;animation-delay:.2s;opacity:.3}
.dash-bars i:nth-child(3){height:38%;animation-delay:.4s;opacity:.2}.dash-bars i:nth-child(4){height:74%;animation-delay:.6s;opacity:.5}
.dash-bars i:last-child{background:#c9a227;height:100%;animation-delay:.8s;opacity:1}
.dash-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:16px}
.dash-grid b{border:1px solid rgba(0,0,0,.07);padding:10px 6px;text-align:center;
  font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:rgba(15,15,15,.45)}
.dash-float{position:absolute;top:-20px;right:-20px;width:148px;padding:16px;
  background:#0f0f0f;color:#fff;box-shadow:0 12px 40px rgba(0,0,0,.18)}
.dash-float strong{display:block;font-family:'Cormorant',serif;font-size:40px;
  font-weight:700;color:#c9a227;line-height:1}
.dash-float span{font-size:10px;font-weight:600;letter-spacing:.1em;
  text-transform:uppercase;color:rgba(255,255,255,.45);margin-top:4px;display:block}

/* ── DIVIDER ── */
.divider{width:min(1200px,calc(100% - 48px));margin:0 auto;
  display:flex;align-items:center;gap:24px}
.divider-line{flex:1;height:1px;background:rgba(0,0,0,.08)}
.divider-mark{font-family:'Cormorant',serif;font-size:15px;font-style:italic;
  color:rgba(15,15,15,.3);letter-spacing:.06em}

/* ── REALITY ── */
.reality-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0;
  border:1px solid rgba(0,0,0,.08);margin-top:40px}
.reality-card{padding:40px;border-right:1px solid rgba(0,0,0,.08);transition:.2s}
.reality-card:last-child{border-right:0}
.reality-card:hover{background:#fafaf8}
.reality-num{font-family:'Cormorant',serif;font-size:72px;font-weight:400;
  color:rgba(201,162,39,.65);line-height:1;margin-bottom:20px;letter-spacing:-.02em}
.reality-card h3{font-family:'Cormorant',serif;font-size:22px;font-weight:600;
  line-height:1.3;margin-bottom:12px;color:#0f0f0f;letter-spacing:-.01em}
.reality-card p{color:rgba(15,15,15,.45);line-height:1.75;font-size:14px;font-weight:400}

/* ── SECTION HEADINGS ── */
.section-title{font-family:'Cormorant',serif;font-size:clamp(40px,5.5vw,80px);
  line-height:1.0;letter-spacing:-.01em;color:#0f0f0f;font-weight:600;margin-bottom:16px}
.section-title em{color:#c9a227;font-style:italic}
.section-title-accent{font-family:'Cormorant',serif;font-size:clamp(40px,5.5vw,80px);
  line-height:1.0;letter-spacing:-.01em;color:#c9a227;font-style:italic;
  font-weight:600;display:block;margin-bottom:20px}
.section-body{font-size:16px;color:rgba(15,15,15,.45);line-height:1.8;
  max-width:620px;font-weight:400}

/* ── SHOWCASE ── */
.showcase{position:relative;background:#0f0f0f;overflow:clip}
.showcase-sticky{position:sticky;top:0;height:100dvh;width:100%;overflow:hidden;flex-shrink:0}
.showcase-sticky::before{content:'';position:absolute;inset:0;
  background-image:radial-gradient(rgba(201,162,39,.15) 1px,transparent 1px),
    radial-gradient(rgba(255,255,255,.04) 1px,transparent 1px);
  background-size:22px 22px,38px 38px;
  mask-image:radial-gradient(circle at 50% 50%,black,transparent 70%);
  opacity:.6;animation:particleDrift 8s ease-in-out infinite alternate}
.showcase-head{position:absolute;left:5vw;top:8vh;z-index:8;max-width:680px}
.showcase-head .section-title{color:#fff;font-size:clamp(34px,4.5vw,64px);margin-bottom:10px}
.showcase-head .section-title em{color:#c9a227}
.showcase-head p:not(.eyebrow){color:rgba(255,255,255,.4);font-size:16px;line-height:1.7;max-width:520px}
.showcase-head .eyebrow{color:rgba(201,162,39,.8)}
.showcase-cta{display:inline-flex;align-items:center;gap:10px;margin-top:20px;
  background:#c9a227;color:#0f0f0f;text-decoration:none;
  padding:13px 20px;font-weight:700;font-size:12px;
  letter-spacing:.1em;text-transform:uppercase;transition:.2s}
.showcase-cta:hover{background:#e8b800}
.showcase-cord{position:absolute;width:80vw;height:40vh;left:10vw;top:34vh;
  z-index:1;opacity:.6}
.showcase-cord path{fill:none;stroke:#c9a227;stroke-width:5;stroke-linecap:round;
  stroke-dasharray:130 45;filter:drop-shadow(0 0 16px rgba(201,162,39,.4));
  animation:cordMove 2.5s linear infinite}
.showcase-stage{position:absolute;inset:0;z-index:3;display:grid;place-items:center;perspective:1600px}
.showcase-card{position:absolute;width:min(580px,42vw);height:340px;
  border:1px solid rgba(255,255,255,.12);
  padding:190px 32px 30px;
  background:linear-gradient(135deg,rgba(80,60,200,.55),rgba(58,186,176,.15) 32%,rgba(220,75,145,.15) 60%,rgba(0,0,0,.8));
  box-shadow:0 60px 140px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.1);
  backdrop-filter:blur(16px);overflow:hidden;
  transition:transform .44s cubic-bezier(.2,.8,.2,1),opacity .36s ease,filter .36s ease}
.showcase-card.active{box-shadow:0 80px 160px rgba(0,0,0,.6),
  0 0 80px rgba(201,162,39,.18);z-index:6}
.showcase-card::before{content:'';position:absolute;inset:0;
  background:linear-gradient(120deg,transparent,rgba(255,255,255,.08),transparent);
  animation:sweep 3.2s infinite}
.showcase-card>*{position:relative;z-index:2}
.showcase-card .card-kicker{color:#c9a227;font-size:10px;font-weight:700;
  letter-spacing:.28em;text-transform:uppercase;margin:0 0 10px}
.showcase-card h2{font-family:'Cormorant',serif;font-size:clamp(28px,3vw,46px);
  line-height:.95;letter-spacing:-.01em;text-transform:uppercase;margin:0;font-weight:700;color:#fff}
.card-num{position:absolute;right:22px;top:16px;color:rgba(201,162,39,.4);
  font-size:10px;font-weight:700;letter-spacing:.2em}
.card-progress-line{position:absolute;left:0;bottom:0;height:2px;
  background:linear-gradient(90deg,#c9a227,#f0d060);
  box-shadow:0 0 16px rgba(201,162,39,.6)}
.showcase-explain{position:absolute;right:5.5vw;top:50%;transform:translateY(-50%);
  width:min(380px,28vw);z-index:10;
  border:1px solid rgba(255,255,255,.1);padding:28px;
  background:rgba(15,15,15,.75);backdrop-filter:blur(20px)}
.explain-count{color:rgba(201,162,39,.7);font-size:10px;font-weight:700;
  letter-spacing:.24em;text-transform:uppercase;margin-bottom:12px}
.explain-title{font-family:'Cormorant',serif;font-size:38px;font-weight:700;
  line-height:.95;letter-spacing:-.01em;margin-bottom:12px;color:#fff}
.explain-body{color:rgba(255,255,255,.5);line-height:1.7;font-size:13px;
  font-weight:400;margin-bottom:16px}
.tag-row{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px}
.tag-pill{font-size:10px;border:1px solid rgba(201,162,39,.25);
  background:rgba(201,162,39,.07);
  padding:6px 10px;color:rgba(255,255,255,.7);font-weight:600;letter-spacing:.04em}
.explain-metric{display:block;font-style:normal;color:#0f0f0f;
  background:#c9a227;padding:12px 14px;font-weight:700;font-size:12px;
  letter-spacing:.1em;text-transform:uppercase}
.showcase-progress{position:absolute;right:34px;top:50%;transform:translateY(-50%);
  z-index:12;display:grid;gap:4px;width:190px}
.showcase-progress button{text-align:left;border:0;
  border-left:1px solid rgba(255,255,255,.08);background:transparent;
  color:rgba(255,255,255,.28);padding:11px 14px;font-weight:600;font-size:11px;
  text-transform:uppercase;letter-spacing:.06em;cursor:pointer;transition:.25s;
  font-family:'Montserrat',sans-serif}
.showcase-progress button small{margin-right:8px;color:rgba(201,162,39,.3);font-size:10px}
.showcase-progress button.on{background:rgba(201,162,39,.08);color:#fff;
  border-left-color:#c9a227;transform:translateX(-6px)}
.showcase-progress button.on small{color:#c9a227}
.mob-card-nav{display:none}

/* ── GROWTH ROADMAP ── */
.growth-section{position:relative;padding:0;overflow:hidden;background:#fafaf8}
.sticky-growth{display:flex;flex-direction:column;
  width:min(1200px,calc(100% - 48px));margin:0 auto;
  overflow:visible;padding:100px 0 80px;gap:28px}
.section-intro{padding-top:60px}
.road-stage{display:grid;grid-template-columns:340px 1fr;gap:24px;
  align-items:stretch;margin-top:24px;min-height:460px}
.stage-panel{display:grid;gap:12px;align-content:start}
.progress-chip{display:flex;justify-content:space-between;align-items:center;
  border:1px solid rgba(0,0,0,.08);padding:16px 20px;background:#fff}
.progress-chip span{font-size:10px;text-transform:uppercase;letter-spacing:.18em;
  color:rgba(15,15,15,.4);font-weight:700}
.progress-chip strong{font-family:'Cormorant',serif;font-size:32px;color:#c9a227;font-weight:700}
.stage-card{padding:24px;border:1px solid rgba(0,0,0,.08);background:#fff}
.stage-num{color:#c9a227;font-weight:700;font-size:10px;letter-spacing:.22em;
  text-transform:uppercase;margin-bottom:8px}
.stage-card h3{font-family:'Cormorant',serif;font-size:42px;font-weight:600;
  letter-spacing:-.01em;margin:0 0 10px;line-height:.95;color:#0f0f0f}
.stage-card p{color:rgba(15,15,15,.5);line-height:1.75;font-size:13px;font-weight:400;margin-bottom:16px}
.stage-metric{display:inline-flex;color:#0f0f0f;background:#c9a227;
  padding:8px 14px;font-weight:700;font-size:11px;
  letter-spacing:.12em;text-transform:uppercase}
.stage-list{display:grid;gap:6px}
.mini-stage{display:flex;align-items:center;gap:10px;padding:10px 14px;
  border:1px solid rgba(0,0,0,.06);background:#fff;
  color:rgba(15,15,15,.35);font-size:12px;font-weight:600;transition:.3s}
.mini-stage.current,.mini-stage.done{border-color:rgba(201,162,39,.3);
  background:rgba(201,162,39,.05);color:#0f0f0f}
.mini-stage svg{color:#c9a227;flex-shrink:0}
.road-wrap{position:relative;height:460px;
  border:1px solid rgba(0,0,0,.08);
  background:linear-gradient(180deg,#fff,#fafaf8);overflow:hidden}
.road-bg-grid{position:absolute;inset:0;
  background-image:linear-gradient(rgba(0,0,0,.04) 1px,transparent 1px),
    linear-gradient(90deg,rgba(0,0,0,.04) 1px,transparent 1px);
  background-size:40px 40px}
.road{position:absolute;inset:0;width:100%;height:100%;z-index:2}
.road-shadow,.road-surface,.road-centerline,.road-progress-line{fill:none;stroke-linecap:round;stroke-linejoin:round}
.road-shadow{stroke:rgba(0,0,0,.08);stroke-width:80;filter:blur(12px)}
.road-surface{stroke:#f0ede6;stroke-width:72}
.road-centerline{stroke:#fff;stroke-width:4;stroke-dasharray:10 16;opacity:.8;animation:dashmove 1.2s linear infinite}
.road-progress-line{stroke:url(#roadGrad);stroke-width:4;stroke-dasharray:1500;
  stroke-dashoffset:calc(1500 - (1500 * var(--progress) / 100));
  filter:drop-shadow(0 0 8px rgba(201,162,39,.7));
  transition:stroke-dashoffset .55s cubic-bezier(.2,.8,.2,1)}
.road-node{position:absolute;transform:translate(-50%,-50%);
  display:flex;align-items:center;gap:6px;padding:8px 12px;
  background:#fff;border:1px solid rgba(0,0,0,.1);
  color:rgba(15,15,15,.3);z-index:5;transition:.5s cubic-bezier(.2,.8,.2,1);
  font-size:11px;font-weight:700;letter-spacing:.06em;
  box-shadow:0 2px 12px rgba(0,0,0,.08)}
.road-node.active{color:#0f0f0f;background:#c9a227;
  border-color:#c9a227;box-shadow:0 0 28px rgba(201,162,39,.4),0 2px 12px rgba(0,0,0,.1);
  transform:translate(-50%,-50%) scale(1.1)}
.road-node.done{color:#c9a227;border-color:rgba(201,162,39,.4);background:rgba(201,162,39,.06)}
.node-0{left:7%;top:82%}.node-1{left:24%;top:57%}.node-2{left:39%;top:72%}
.node-3{left:56%;top:40%}.node-4{left:73%;top:47%}.node-5{left:92%;top:18%}
.traveler{position:absolute;z-index:6;width:64px;height:36px;pointer-events:none;
  transition:left .55s cubic-bezier(.2,.8,.2,1),top .55s cubic-bezier(.2,.8,.2,1)}
.traveler-body{position:absolute;inset:0;
  background:#0f0f0f;display:grid;place-items:center;color:#c9a227;font-weight:800;
  box-shadow:0 0 24px rgba(0,0,0,.2);animation:travelerPulse 2s ease-in-out infinite}
.traveler-label{font-size:10px;letter-spacing:.14em;font-weight:800}
.brand-core{position:absolute;left:51%;top:53%;width:130px;height:130px;
  border-radius:50%;display:grid;place-items:center;
  background:#c9a227;color:#0f0f0f;
  box-shadow:0 0 50px rgba(201,162,39,.35);z-index:4;
  transition:transform .55s cubic-bezier(.2,.8,.2,1)}
.brand-core span{font-family:'Cormorant',serif;font-size:26px;font-weight:700;letter-spacing:.04em}
.brand-core small{position:absolute;bottom:32px;font-size:8px;letter-spacing:.18em;
  font-weight:700;text-transform:uppercase}
.float-stat{position:absolute;z-index:4;padding:10px 14px;
  background:#fff;border:1px solid rgba(0,0,0,.08);box-shadow:0 4px 16px rgba(0,0,0,.06)}
.float-stat span{display:block;color:rgba(15,15,15,.4);font-size:10px;margin-top:3px;font-weight:600}
.float-stat strong{font-size:13px;font-weight:800;color:#0f0f0f}
.stat-1{left:16%;top:16%}.stat-2{right:18%;top:16%}.stat-3{right:12%;bottom:14%}
.finish-glow{position:absolute;right:28px;bottom:24px;z-index:4;
  border:1px solid rgba(201,162,39,.3);background:rgba(201,162,39,.06);
  padding:10px 16px;color:#c9a227;font-weight:700;font-size:10px;letter-spacing:.2em;text-transform:uppercase}
.market-footer{display:grid;grid-template-columns:1fr 340px;gap:24px;align-items:end;margin-top:24px}
.market-control{font-family:'Cormorant',serif;font-size:clamp(34px,5vw,68px)!important;
  font-weight:600;max-width:680px;color:#0f0f0f;letter-spacing:-.01em;line-height:1}
.market-control em{color:#c9a227;font-style:italic}
.control-chips{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.control-chips span{border:1px solid rgba(0,0,0,.08);background:#fff;
  padding:14px;font-size:11px;font-weight:700;text-align:center;
  letter-spacing:.08em;text-transform:uppercase;color:rgba(15,15,15,.6)}

/* ── STACK ── */
.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:0;
  border:1px solid rgba(0,0,0,.08);margin-top:40px}
.card{background:#fff;padding:36px;transition:.2s;position:relative;border-right:1px solid rgba(0,0,0,.08)}
.card:nth-child(3),.card:nth-child(6){border-right:0}
.card:nth-child(n+4){border-top:1px solid rgba(0,0,0,.08)}
.card:hover{background:#fafaf8}
.card svg{color:#c9a227;width:24px;height:24px;margin-bottom:20px}
.card h3{font-family:'Cormorant',serif;font-size:22px;font-weight:600;
  margin:0 0 10px;letter-spacing:-.01em;color:#0f0f0f}
.card p{color:rgba(15,15,15,.45);line-height:1.75;font-size:13px;font-weight:400}

/* ── PROBLEM SOLVER ── */
.split{display:grid;grid-template-columns:1fr .92fr;gap:60px;align-items:center}
.problem-list{display:grid;gap:6px;margin-top:28px}
.problem-btn{display:flex;justify-content:space-between;align-items:center;
  text-align:left;border:1px solid rgba(0,0,0,.08);background:#fff;
  color:#0f0f0f;padding:16px 18px;font-weight:600;
  cursor:pointer;font-size:13px;font-family:'Montserrat',sans-serif;
  letter-spacing:.02em;transition:.2s}
.problem-btn:hover{border-color:rgba(0,0,0,.16);background:#fafaf8}
.problem-btn.on{background:#0f0f0f;border-color:#0f0f0f;color:#fff}
.problem-btn.on svg{color:#c9a227}
.problem-btn svg{color:rgba(15,15,15,.25);flex-shrink:0;transition:.2s}
.solution-panel{border:1px solid rgba(0,0,0,.08);padding:36px;background:#fff;position:sticky;top:100px}
.solution-label{color:#c9a227;font-weight:700;letter-spacing:.2em;font-size:10px;
  text-transform:uppercase;margin-bottom:16px;display:block}
.solution-panel h3{font-family:'Cormorant',serif;font-size:34px;font-weight:600;
  letter-spacing:-.01em;margin:0 0 14px;line-height:1;color:#0f0f0f}
.solution-panel p{color:rgba(15,15,15,.5);line-height:1.8;font-size:14px;font-weight:400}

/* ── COMPARE ── */
.compare-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:40px}
.compare-col{border:1px solid rgba(0,0,0,.08)}
.compare-col-head{padding:20px 24px;border-bottom:1px solid rgba(0,0,0,.08)}
.compare-col-head h3{font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(15,15,15,.4)}
.compare-col:last-child{border-color:rgba(0,0,0,.12);background:#fafaf8}
.compare-col:last-child .compare-col-head{background:#0f0f0f;border-bottom-color:#0f0f0f}
.compare-col:last-child .compare-col-head h3{color:#c9a227}
.compare-item{padding:14px 24px;border-bottom:1px solid rgba(0,0,0,.06);
  display:flex;align-items:center;gap:10px;font-size:13px;font-weight:500}
.compare-col:first-child .compare-item{color:rgba(15,15,15,.4)}
.compare-col:last-child .compare-item{color:#0f0f0f;font-weight:600}
.compare-col:last-child .compare-item svg{color:#c9a227;flex-shrink:0;width:14px;height:14px}
.compare-item:last-child{border-bottom:0}

/* ── INDUSTRIES ── */
.industries{display:grid;grid-template-columns:repeat(4,1fr);gap:0;
  border:1px solid rgba(0,0,0,.08);margin-top:40px}
.industry-card{background:#fff;padding:24px;transition:.2s;
  border-right:1px solid rgba(0,0,0,.08);border-bottom:1px solid rgba(0,0,0,.08)}
.industry-card:hover{background:#fafaf8}
.industry-card strong{display:block;font-size:13px;font-weight:700;margin-bottom:8px;
  letter-spacing:.02em;color:#0f0f0f}
.industry-card span{display:block;color:rgba(15,15,15,.4);font-size:12px;
  line-height:1.55;font-weight:400}

/* ── PLANS ── */
.plans{display:grid;gap:0;border:1px solid rgba(0,0,0,.08);margin-top:40px}
.plan{display:flex;justify-content:space-between;gap:24px;align-items:center;
  background:#fff;padding:36px 40px;border-bottom:1px solid rgba(0,0,0,.08);transition:.2s}
.plan:last-child{border-bottom:0}
.plan:hover{background:#fafaf8}
.plan-num{font-family:'Cormorant',serif;font-size:20px;color:rgba(201,162,39,.4);
  font-weight:400;margin-bottom:8px;display:block;font-style:italic}
.plan h3{font-family:'Cormorant',serif;font-size:34px;font-weight:600;
  letter-spacing:-.01em;margin:0 0 10px;line-height:1;color:#0f0f0f}
.plan p{color:rgba(15,15,15,.45);line-height:1.75;font-size:13px;
  font-weight:400;max-width:600px}
.plan-cta{white-space:nowrap;display:inline-flex;align-items:center;gap:8px;
  color:#0f0f0f;font-weight:700;text-decoration:none;
  border:1px solid rgba(0,0,0,.15);padding:14px 20px;
  font-size:11px;letter-spacing:.1em;text-transform:uppercase;transition:.2s;flex-shrink:0}
.plan-cta:hover{background:#0f0f0f;color:#c9a227;border-color:#0f0f0f}

/* ── CONTACT ── */
.contact-section{background:#0f0f0f;color:#f5f0e8;position:relative;overflow:hidden;padding:130px 0}
.contact-section::before{content:'';position:absolute;inset:0;
  background-image:linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),
    linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px);
  background-size:80px 80px}
.contact-inner{position:relative;z-index:1;
  width:min(1200px,calc(100% - 48px));margin:0 auto}
.contact-kicker{display:flex;align-items:center;gap:20px;color:rgba(201,162,39,.7);
  font-size:10px;letter-spacing:.36em;font-weight:700;text-transform:uppercase;margin-bottom:32px}
.contact-kicker-line{width:60px;height:1px;background:rgba(201,162,39,.4)}
.contact-title{font-family:'Cormorant',serif;font-size:clamp(56px,10vw,140px);
  line-height:.9;letter-spacing:-.02em;margin:0 0 28px;font-weight:600;color:#f5f0e8}
.contact-title em{color:#c9a227;font-style:italic}
.contact-lead{font-size:18px;line-height:1.75;color:rgba(245,240,232,.45);
  max-width:760px;margin:0 0 36px;font-weight:400}
.consult-btn{display:inline-flex;align-items:center;gap:12px;
  background:#c9a227;color:#0f0f0f;text-decoration:none;
  padding:18px 28px;font-size:13px;font-weight:700;
  margin:0 0 64px;letter-spacing:.1em;text-transform:uppercase;transition:.2s}
.consult-btn:hover{background:#e8b800}
.contact-list{max-width:920px;border-top:1px solid rgba(255,255,255,.08)}
.contact-row{display:grid;grid-template-columns:10px 160px 1fr;gap:24px;
  align-items:center;min-height:84px;border-bottom:1px solid rgba(255,255,255,.06);
  color:#f5f0e8;text-decoration:none;transition:.2s}
.contact-row:hover{color:#c9a227}
.contact-dot{width:6px;height:6px;background:#c9a227;flex-shrink:0}
.contact-row-label{font-size:10px;letter-spacing:.28em;color:rgba(245,240,232,.3);
  font-weight:700;text-transform:uppercase}
.contact-row-value{font-family:'Cormorant',serif;font-size:clamp(20px,2.5vw,34px);
  font-weight:600;letter-spacing:-.01em}

footer{text-align:center;color:rgba(245,240,232,.2);padding:28px;
  font-size:10px;letter-spacing:.2em;text-transform:uppercase;font-weight:600;
  border-top:1px solid rgba(255,255,255,.04);background:#0f0f0f;
  font-family:'Montserrat',sans-serif}

/* ── KEYFRAMES ── */
@keyframes wordmarkReveal{from{opacity:0;transform:translateY(40px);filter:blur(8px)}to{opacity:1;transform:translateY(0);filter:blur(0)}}
@keyframes ruleExpand{from{width:0;opacity:0}to{width:80px;opacity:1}}
@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
@keyframes introExit{to{opacity:0;visibility:hidden;pointer-events:none}}
@keyframes sweep{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}
@keyframes grow{to{transform:scaleY(.55);opacity:.6}}
@keyframes particleDrift{from{transform:translate3d(-20px,18px,0);opacity:.4}to{transform:translate3d(36px,-22px,0);opacity:.75}}
@keyframes cordMove{to{stroke-dashoffset:-175}}
@keyframes travelerPulse{0%,100%{box-shadow:0 0 20px rgba(0,0,0,.18)}50%{box-shadow:0 0 36px rgba(0,0,0,.28)}}
@keyframes dashmove{to{stroke-dashoffset:-50}}

/* ── RESPONSIVE 900px ── */
@media(max-width:900px){
  .nav{padding:16px 20px}
  .nav-links{display:none}
  .hero{grid-template-columns:1fr;min-height:auto;padding:90px 0 60px}
  .hero-visual{display:none}
  .hero-title,.hero-title-accent{font-size:clamp(48px,12vw,80px)}
  .split,.compare-grid{grid-template-columns:1fr}
  .cards{grid-template-columns:1fr 1fr}
  .reality-grid{grid-template-columns:1fr}
  .reality-card{border-right:0;border-bottom:1px solid rgba(0,0,0,.08)}
  .industries{grid-template-columns:1fr 1fr}
  .section{padding:72px 0}
  .showcase{height:auto!important}
  .showcase-sticky{height:100svh!important;position:relative!important;overflow:hidden}
  .showcase-head{left:20px;right:20px;top:70px;max-width:100%}
  .showcase-head .section-title{font-size:clamp(26px,7vw,44px);margin:8px 0 6px}
  .showcase-head p:not(.eyebrow){display:none}
  .showcase-cta{padding:10px 14px;font-size:11px;margin-top:10px}
  .showcase-cord{display:none}
  .showcase-card{width:86vw;height:56vw;min-height:210px;max-height:280px;
    padding:0 20px 20px;display:flex;flex-direction:column;justify-content:flex-end}
  .showcase-card h2{font-size:clamp(20px,5.5vw,30px)}
  .showcase-explain{position:fixed;left:12px;right:12px;bottom:20px;top:auto;
    transform:none;width:auto;padding:14px 16px;z-index:20}
  .explain-title{font-size:24px;margin:6px 0}
  .explain-body{font-size:11px;margin-bottom:8px}
  .tag-row{gap:4px;margin-bottom:8px}
  .tag-pill{font-size:9px;padding:5px 8px}
  .explain-metric{padding:8px 12px;font-size:11px}
  .showcase-progress{display:none}
  .mob-card-nav{position:absolute;bottom:22px;left:50%;transform:translateX(-50%);
    z-index:30;display:flex;align-items:center;gap:14px;
    background:rgba(15,15,15,.85);border:1px solid rgba(255,255,255,.1);
    padding:8px 20px;backdrop-filter:blur(14px)}
  .mob-card-nav button{background:none;border:none;color:#c9a227;font-size:18px;
    cursor:pointer;padding:4px 8px;font-weight:900;opacity:.9;font-family:'Montserrat',sans-serif}
  .mob-card-nav button:disabled{opacity:.2;cursor:default}
  .mob-card-nav span{color:#fff;font-size:11px;letter-spacing:.12em;font-weight:700;min-width:36px;text-align:center}
  .growth-section{height:auto!important;padding:60px 20px 40px}
  .sticky-growth{padding:60px 0}
  .road-stage{grid-template-columns:1fr;gap:14px;min-height:auto;margin-top:14px}
  .road-wrap{height:260px}
  .brand-core{width:72px;height:72px}
  .brand-core span{font-size:15px}
  .brand-core small{font-size:7px;bottom:18px}
  .traveler{width:44px;height:26px}
  .float-stat{display:none}
  .finish-glow{display:none}
  .market-footer{grid-template-columns:1fr;margin-top:20px;gap:16px}
  .market-control{font-size:clamp(28px,8vw,46px)!important}
  .control-chips{grid-template-columns:1fr 1fr;gap:8px}
  .control-chips span{padding:12px 8px;font-size:10px}
  .contact-section{padding:80px 0}
  .contact-title{font-size:clamp(48px,12vw,80px)}
  .consult-btn{font-size:12px;padding:15px 20px;margin-bottom:36px}
  .contact-row{grid-template-columns:8px 1fr;gap:12px;min-height:64px}
  .contact-row-label{display:none}
  .contact-row-value{font-size:clamp(18px,4.5vw,28px)}
  .plan{flex-direction:column;align-items:flex-start;gap:14px;padding:24px}
  .plan h3{font-size:28px}
}
@media(max-width:500px){
  .cards{grid-template-columns:1fr}
  .industries{grid-template-columns:1fr 1fr}
  .compare-grid{grid-template-columns:1fr}
  .showcase-card{height:64vw}
  .hero-title,.hero-title-accent{font-size:clamp(42px,13vw,68px)}
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
    const timer = setTimeout(() => setShowIntro(false), 3200);
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
          if (e.deltaY > 0 && currentStep >= maxStep) { window.scrollTo({ top: show.offsetTop + show.offsetHeight + 2, behavior: 'auto' }); return; }
          if (e.deltaY <= 0 && currentStep <= 0) { window.scrollTo({ top: show.offsetTop - window.innerHeight * 0.85, behavior: 'auto' }); return; }
          wheelCooldownRef.current = true; wheelBufferRef.current = 0;
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
        if (rect.top > window.innerHeight * 0.7) { showcaseStepRef.current = 0; showcaseProgressRef.current = 0; setShowcaseProgress(0); }
      }
      const road = document.getElementById('growth-system');
      if (road) {
        const rect = road.getBoundingClientRect();
        const total = Math.max(1, road.offsetHeight - window.innerHeight);
        const passed = Math.min(Math.max(-rect.top, 0), total);
        const ratio = Math.min(1, Math.max(0, passed / total));
        roadProgressRef.current = ratio; setRoadProgress(ratio); updateRoad(ratio);
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
    showcaseStepRef.current = i; showcaseProgressRef.current = i / (slides.length - 1);
    setShowcaseProgress(i / (slides.length - 1));
    window.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
  };
  const langLabel = (l) => l === 'am' ? 'አማ' : l.toUpperCase();

  return (
    <main className="app">
      <style>{styles}</style>

      {/* INTRO */}
      {showIntro && (
        <div className="intro-screen">
          <div className="intro-content">
            <div className="intro-wordmark">KABA <em>LABS</em></div>
            <div className="intro-rule"/>
            <div className="intro-sub">Growth Systems</div>
            <div className="intro-tagline">for Ethiopian businesses</div>
            <div className="intro-enter">
              <button onClick={() => setShowIntro(false)}>Enter the Lab <ArrowUpRight size={14}/></button>
            </div>
          </div>
        </div>
      )}

      {/* NAV */}
      <header className="nav">
        <div className="brand">KABA <em>LABS</em></div>
        <nav className="nav-links">
          <a href="#kaba-showcase">Systems</a>
          <a href="#growth-system">Growth</a>
          <a href="#stack">Services</a>
          <a href="#plans">Packages</a>
        </nav>
        <div className="nav-right">
          <div className="lang">
            {['en','am','fr'].map(l => (
              <button key={l} onClick={() => setLang(l)} className={lang === l ? 'on' : ''}>{langLabel(l)}</button>
            ))}
          </div>
          <a className="nav-book" href="https://wa.me/251913864659" target="_blank" rel="noreferrer">Book Call <ArrowUpRight size={12}/></a>
        </div>
      </header>

      {/* HERO */}
      <section className="hero section">
        <div>
          <p className="eyebrow"><span className="eyebrow-rule"/><Sparkles size={12}/>Kaba Labs / Growth Command Center</p>
          <h1 className="hero-title">{t[lang].heroTitle}</h1>
          <span className="hero-title-accent">{t[lang].heroTitleAccent}</span>
          <p className="hero-body">{t[lang].heroSub}</p>
          <div className="hero-actions">
            <a className="btn-primary" href="https://wa.me/251913864659" target="_blank" rel="noreferrer">
              {t[lang].heroCta} <ArrowUpRight size={16}/>
            </a>
            <a className="btn-ghost" href="#kaba-showcase">
              <Play size={14}/>{t[lang].heroCtaSecondary}
            </a>
          </div>
          <div className="proof-strip">
            <span className="proof-pill"><Check size={13}/>60+ Clients Served</span>
            <span className="proof-sep"/>
            <span className="proof-pill"><Check size={13}/>10+ Medical & Dental</span>
            <span className="proof-sep"/>
            <span className="proof-pill"><Check size={13}/>Websites · Ads · CRM</span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="dash-card">
            <div className="dash-top">
              <div className="dash-dots"><span/><span/><span/></div>
              <div className="dash-badge">Live · 30 Days</div>
            </div>
            <div className="dash-label">Market Signal</div>
            <div className="dash-metric">+284%</div>
            <div className="dash-sub">Lead Growth</div>
            <div className="dash-bars"><i/><i/><i/><i/><i/></div>
            <div className="dash-grid"><b>Video</b><b>Ads</b><b>Systems</b><b>CRM</b></div>
            <div className="dash-float">
              <strong>47</strong>
              <span>Leads Today</span>
            </div>
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="divider">
        <div className="divider-line"/>
        <span className="divider-mark">The Reality</span>
        <div className="divider-line"/>
      </div>

      {/* REALITY */}
      <section className="section">
        <p className="eyebrow"><span className="eyebrow-rule"/><Zap size={12}/>The Reality</p>
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

      {/* SHOWCASE */}
      <section id="kaba-showcase" className="showcase" style={{height:'400vh'}}>
        <div className="showcase-sticky">
          <div className="showcase-head">
            <p className="eyebrow"><Sparkles size={12}/>Growth Systems</p>
            <h2 className="section-title">{t[lang].showcaseTitle}</h2>
            <p>{t[lang].showcaseSub}</p>
            <a className="showcase-cta" href="https://wa.me/251913864659" target="_blank" rel="noreferrer">
              Book 20-Min Consultation <ArrowUpRight size={14}/>
            </a>
          </div>
          <svg className="showcase-cord" viewBox="0 0 1200 460" preserveAspectRatio="none">
            <path d="M20 250 C210 40 360 420 560 210 C740 20 880 390 1180 120"/>
          </svg>
          <div className="showcase-stage">
            {slides.map((item, i) => {
              const offset = i - rawShowcase;
              const isActive = Math.abs(offset) < .55;
              const cardStyle = {
                transform:`translate3d(${offset*56}vw,${Math.abs(offset)*32}px,0) rotateY(${offset*-17}deg) rotateZ(${offset*2.4}deg) scale(${isActive?1:.82})`,
                opacity:Math.abs(offset)>2.2?0:isActive?1:.35,
                filter:isActive?'blur(0)':'blur(1px)'
              };
              return (
                <article key={item.side} className={`showcase-card ${isActive?'active':''}`} style={cardStyle}>
                  <span className="card-num">0{i+1} / 05</span>
                  <p className="card-kicker">{item.kicker}</p>
                  <h2>{item.title.split('\n').map((line,j)=><React.Fragment key={j}>{line}<br/></React.Fragment>)}</h2>
                  <div className="card-progress-line" style={{width:isActive?`${32+slideMotion*52}%`:'16%'}}/>
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

      {/* GROWTH ROADMAP */}
      <section id="growth-system" className="growth-section">
        <div className="sticky-growth">
          <div className="section-intro">
            <p className="eyebrow"><span className="eyebrow-rule"/><MousePointer2 size={12}/>Scroll to Grow</p>
            <h2 className="section-title">{t[lang].roadTitle}</h2>
            <span className="section-title-accent">{t[lang].roadTitleAccent}</span>
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
                {roadmap.map((step,i)=>{const Icon=step.icon;return(
                  <div key={step.title} className={`mini-stage ${i<=activeIndex?'done':''} ${i===activeIndex?'current':''}`}>
                    <Icon size={14}/><span>{step.title}</span>
                  </div>
                );})}
              </div>
            </aside>
            <div className="road-wrap" style={roadStyle}>
              <div className="road-bg-grid"/>
              <svg className="road" viewBox="0 0 1100 460" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="roadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#c9a227"/>
                    <stop offset="100%" stopColor="#f0d060"/>
                  </linearGradient>
                </defs>
                <path className="road-shadow" d="M40 380 C220 250 280 420 430 290 C570 168 660 290 770 185 C870 90 980 125 1060 70"/>
                <path className="road-surface" d="M40 380 C220 250 280 420 430 290 C570 168 660 290 770 185 C870 90 980 125 1060 70"/>
                <path ref={pathRef} className="road-centerline" d="M40 380 C220 250 280 420 430 290 C570 168 660 290 770 185 C870 90 980 125 1060 70"/>
                <path className="road-progress-line" d="M40 380 C220 250 280 420 430 290 C570 168 660 290 770 185 C870 90 980 125 1060 70"/>
              </svg>
              {roadmap.map((step,i)=>{const Icon=step.icon;return(
                <div key={step.title} className={`road-node node-${i} ${i===activeIndex?'active':i<activeIndex?'done':''}`}>
                  <Icon size={13}/><span>{step.title}</span>
                </div>
              );})}
              <div className="traveler" style={{left:`${traveler.x}px`,top:`${traveler.y}px`,transform:`translate(-50%,-50%) rotate(${traveler.angle}deg)`}}>
                <div className="traveler-body"><span className="traveler-label">KABA</span></div>
              </div>
              <div className="brand-core" style={{transform:`translate(-50%,-50%) scale(${active.scale||1})`}}>
                <span>KABA</span><small>{active.metric}</small>
              </div>
              <div className="finish-glow">Market Control</div>
              <div className="float-stat stat-1"><strong>Visibility</strong><span>→ On</span></div>
              <div className="float-stat stat-2"><strong>Trust</strong><span>+ Brand Lift</span></div>
              <div className="float-stat stat-3"><strong>Leads</strong><span>Flow Activated</span></div>
            </div>
          </div>
          <div className="market-footer">
            <h2 className="market-control">
              {t[lang].marketControl}<br/><em>{t[lang].marketControlAccent}</em>
            </h2>
            <div className="control-chips">
              <span>Strategy locked</span>
              <span>Content engine live</span>
              <span>Leads moving</span>
              <span>Scale mode</span>
            </div>
          </div>
        </div>
      </section>

      {/* STACK */}
      <section id="stack" className="section">
        <p className="eyebrow"><span className="eyebrow-rule"/><Zap size={12}/>What Kaba Sells</p>
        <h2 className="section-title">Websites, Content, Ads, and Systems <em>Built to Bring Customers.</em></h2>
        <div className="cards">
          {stack.map(([title,text,Icon])=>(
            <article className="card" key={title}><Icon/><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>

      {/* PROBLEM SOLVER */}
      <section className="section split">
        <div>
          <p className="eyebrow"><span className="eyebrow-rule"/><Wand2 size={12}/>Problem Solver</p>
          <h2 className="section-title">What Is Slowing Your Business Down?</h2>
          <p className="section-body">Pick the real problem. Kaba does not sell random posts. We fix the path from attention to conversion.</p>
          <div className="problem-list">
            {problems.map((p,i)=>(
              <button onClick={()=>setActiveProblem(i)} className={`problem-btn ${activeProblem===i?'on':''}`} key={p[0]}>
                {p[0]}<ChevronRight size={15}/>
              </button>
            ))}
          </div>
        </div>
        <div className="solution-panel">
          <span className="solution-label">The Kaba Answer</span>
          <h3>{problems[activeProblem][0]}</h3>
          <p>{problems[activeProblem][1]}</p>
        </div>
      </section>

      {/* COMPARE */}
      <section className="section">
        <p className="eyebrow"><span className="eyebrow-rule"/><ShieldCheck size={12}/>Why Kaba</p>
        <h2 className="section-title">Most Agencies Sell Content. <em>We Build the Machine Behind It.</em></h2>
        <div className="compare-grid">
          <div className="compare-col">
            <div className="compare-col-head"><h3>Normal Agencies</h3></div>
            {['Post and disappear','Focus on likes','Random designs','No tracking','One-size-fits-all','Content only'].map(x=>(
              <div key={x} className="compare-item">{x}</div>
            ))}
          </div>
          <div className="compare-col">
            <div className="compare-col-head"><h3>Kaba Labs</h3></div>
            {['Strategy before execution','Leads, trust, and sales','Brand direction and consistency','Lead and campaign systems','Built around your model','Content + ads + website + sales flow'].map(x=>(
              <div key={x} className="compare-item"><ShieldCheck size={13}/>{x}</div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="section">
        <p className="eyebrow"><span className="eyebrow-rule"/><Users size={12}/>Industries</p>
        <h2 className="section-title">Built for Businesses <em>Ready to Be Seen.</em></h2>
        <div className="industries">
          {industries.map(([name,desc])=>(
            <div className="industry-card" key={name}><strong>{name}</strong><span>{desc}</span></div>
          ))}
        </div>
      </section>

      {/* PLANS */}
      <section id="plans" className="section">
        <p className="eyebrow"><span className="eyebrow-rule"/><Layers3 size={12}/>Packages</p>
        <h2 className="section-title">Choose the Package That <em>Fits Your Growth Stage.</em></h2>
        <div className="plans">
          {[
            ['Website Launch','For businesses that need a serious website, clear offer, lead form, WhatsApp flow, and professional online presence.'],
            ['Monthly Growth System','For businesses ready for monthly content, ads, website improvements, CRM, and lead follow-up structure.'],
            ['Kaba Elite Domination','For serious brands that want full strategy, video production, campaigns, landing pages, CRM, reporting, and scale direction.']
          ].map(([title,desc],i)=>(
            <article className="plan" key={title}>
              <div>
                <span className="plan-num">0{i+1}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
              <a href="#contact" className="plan-cta">Apply for This Plan <ArrowUpRight size={14}/></a>
            </article>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact-section">
        <div className="contact-inner">
          <p className="contact-kicker"><span className="contact-kicker-line"/>We Listen First</p>
          <h2 className="contact-title">{t[lang].contactTitle.replace('?','')}<em>?</em></h2>
          <p className="contact-lead">{t[lang].contactLead}</p>
          <a className="consult-btn" href="https://wa.me/251913864659" target="_blank" rel="noreferrer">
            {t[lang].consultBtn} <ArrowUpRight size={18}/>
          </a>
          <div className="contact-list">
            <a href="tel:+251913864659" className="contact-row">
              <span className="contact-dot"/><span className="contact-row-label">Phone</span>
              <b className="contact-row-value">+251 913 864 659</b>
            </a>
            <a href="mailto:kabadigitals@gmail.com" className="contact-row">
              <span className="contact-dot"/><span className="contact-row-label">Email</span>
              <b className="contact-row-value">kabadigitals@gmail.com</b>
            </a>
            <a href="https://instagram.com/kaba_digital_marketing" target="_blank" rel="noreferrer" className="contact-row">
              <span className="contact-dot"/><span className="contact-row-label">Instagram</span>
              <b className="contact-row-value">@kaba_digital_marketing</b>
            </a>
            <div className="contact-row">
              <span className="contact-dot"/><span className="contact-row-label">Location</span>
              <b className="contact-row-value">Addis Ababa, Ethiopia</b>
            </div>
          </div>
        </div>
      </section>

      <footer>Kaba Labs — Less Effort. More Growth.</footer>
    </main>
  );
}
