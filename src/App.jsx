import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, BarChart3, Brain, Camera, Check, ChevronRight, Globe2, Layers3, LineChart, Megaphone, MousePointer2, Play, Radio, Rocket, ShieldCheck, Sparkles, Target, Users, Wand2, Zap } from 'lucide-react';

const slides = [
  { kicker:'LOOK TRUSTED', title:'STOP LOOKING SMALL\nONLINE', side:'Look Trusted', body:'Before customers call, book, or buy, they judge how serious your business looks. Kaba makes your brand feel modern, trusted, and worth choosing.', tags:['Brand trust','Visual identity','Social proof','Premium presence'], metric:'Weak presence → trusted brand' },
  { kicker:'WEBSITES THAT SELL', title:'YOUR WEBSITE SHOULD\nWORK LIKE SALES STAFF', side:'Build Website', body:'A website should not just exist. We build websites that explain your offer, show proof, collect leads, connect WhatsApp, and push visitors to take action.', tags:['Business websites','Landing pages','Lead forms','WhatsApp CTA'], metric:'Visitor → trust → lead' },
  { kicker:'CONTENT THAT CONVERTS', title:'CONTENT SHOULD BRING\nCUSTOMERS, NOT JUST VIEWS', side:'Content Converts', body:'Nice videos are not enough. Kaba creates content that explains the business, builds desire, answers doubts, and gives customers a reason to act.', tags:['Video production','Hooks','Reels','Campaign visuals'], metric:'Attention → trust → action' },
  { kicker:'ADS THAT BRING LEADS', title:'STOP WASTING MONEY\nBOOSTING RANDOM POSTS', side:'Generate Leads', body:'We build proper campaign angles, targeting, creative testing, retargeting, and lead flows so ad spend has a real business purpose.', tags:['Meta Ads','TikTok Ads','Retargeting','Lead funnels'], metric:'Budget → leads → sales' },
  { kicker:'GROWTH MACHINE', title:'CONNECT THE WHOLE\nCUSTOMER JOURNEY', side:'Scale Harder', body:'The real cash cow is the full system: website, content, ads, CRM, follow-up, and reporting. Kaba connects every piece so interested customers do not disappear.', tags:['CRM','Follow-up','Reporting','Scale system'], metric:'Chaos → growth machine' }
];

const roadmap = [
  { icon: Radio, title:'Unknown Business', text:'Weak signal. Low trust. No clear reason for the market to care.', metric:'0→1', scale:.72 },
  { icon: Brain, title:'Diagnose', text:'We scan the offer, audience, competitors, content, sales flow, and bottlenecks.', metric:'CLARITY', scale:.9 },
  { icon: Target, title:'Position', text:'We shape the message so people understand what you sell and why it matters.', metric:'TRUST', scale:1.05 },
  { icon: Camera, title:'Create', text:'Video, photo, graphics, hooks, landing pages, and campaigns built to convert.', metric:'ASSETS', scale:1.2 },
  { icon: Rocket, title:'Launch', text:'Campaigns go live. Traffic, messages, leads, calls, and sales start moving.', metric:'+LEADS', scale:1.42 },
  { icon: LineChart, title:'Scale', text:'We double down on what works and build repeatable growth systems.', metric:'DOMINATE', scale:1.75 }
];

const stack = [
  ['Websites That Sell','Fast, premium websites that explain your offer, build trust, collect leads, and connect customers to WhatsApp or booking.',Globe2],
  ['Video Production','Videos, reels, hooks, graphics, product shoots, and campaigns that make the business look trusted.',Camera],
  ['Paid Ads','Meta, TikTok, retargeting, lead funnels, and campaign systems built for calls, messages, bookings, and sales.',Megaphone],
  ['Brand Strategy','Offer, message, audience, positioning, and creative direction before money is wasted.',Brain],
  ['CRM & Follow-Up','Lead tracking, follow-up structure, sales process setup, and reporting so interested customers do not disappear.',Layers3],
  ['Growth Consulting','Clear diagnosis, growth direction, priorities, and execution plans for businesses that want to scale seriously.',BarChart3]
];

const problems = [
  ['People do not know us','Visibility is the first battlefield. We build content and campaigns that make the market see you repeatedly.'],
  ['We do not look professional','Trust is leaking. We rebuild your visual presence so customers feel you are serious.'],
  ['We post but do not get sales','Content is not the real problem. The offer, targeting, and conversion path are broken.'],
  ['Our ads do not work','The campaign is probably pushing weak creative or a weak offer. We fix both.'],
  ['We do not have enough leads','You need a lead engine: clear offer, sharp targeting, landing flow, and follow-up system.'],
  ['We have no clear system','Growth depends on luck. We build the machine behind attention, sales, and reporting.']
];

const industries = ['Restaurants & Cafes','Gyms & Fitness Centers','Hotels & Guest Houses','Furniture Stores','Clinics & Wellness','Beauty Salons & Spas','Real Estate','Fashion Brands','E-commerce Stores','Schools & Training','Car Dealerships','Interior Design'];

const t = {
  en: {
    heroTitle: "We Don't Make Content. We Build Empires.",
    heroSub: "Kaba Labs combines video production, ads, websites, CRM, and growth systems to help Ethiopian businesses look trusted online and get more customers every month.",
    heroCta: "Book 20-Min Consultation",
    heroCtaSecondary: "See The Systems",
    realityTitle: "Your Competitors Are Already Winning Online.",
    r1h: "They found you first on Google Maps — and chose someone else.",
    r1p: "If your business does not look trusted online, customers call your competitor instead.",
    r2h: "Walk-ins and word of mouth are not enough anymore.",
    r2p: "The fastest-growing businesses in Ethiopia are using consistent content, targeted ads, and better follow-up.",
    r3h: "You tried marketing before and it did not work.",
    r3p: "Boosting posts is not advertising. Random videos are not strategy. Kaba builds the full system behind growth.",
    showcaseTitle: "Choose the system your business needs to grow.",
    showcaseSub: "Websites, content, ads, and follow-up should work together.",
    roadTitle: "Your Brand Does Not Need Random Content. It Needs a Growth System.",
    roadSub: "Scroll and watch how Kaba turns an invisible business into a brand with attention, trust, leads, and sales.",
    marketControl: "This is not marketing. This is market control.",
    contactTitle: "WHAT ARE YOU LOOKING FOR?",
    contactLead: "Every business is different. Book a 20-minute consultation and tell us what you need.",
    consultBtn: "Book a 20-Minute Consultation",
  },
  am: {
    heroTitle: "ኮንተንት አንሠራም። ኢምፓየር እንገነባለን።",
    heroSub: "KABA LABS ቪዲዮ፣ ማስታወቂያ፣ ድረ-ገጽ፣ CRM እና የእድገት ስርዓቶችን በማጣመር የኢትዮጵያ ቢዝነሶች ታማኝ ሆነው እንዲታዩ እና ደንበኞች እንዲያገኙ ያግዛሉ።",
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
    heroSub: "Kaba Labs combine production vidéo, publicités, sites web, CRM et systèmes de croissance pour aider les entreprises éthiopiennes à paraître crédibles et attirer plus de clients.",
    heroCta: "Réserver 20 min de consultation",
    heroCtaSecondary: "Voir les systèmes",
    realityTitle: "Vos concurrents gagnent déjà en ligne.",
    r1h: "Ils vous ont trouvé sur Google Maps — et ont choisi quelqu'un d'autre.",
    r1p: "Si votre entreprise n'est pas crédible en ligne, les clients appellent votre concurrent.",
    r2h: "Les clients spontanés et le bouche-à-oreille ne suffisent plus.",
    r2p: "Les entreprises qui croissent le plus vite investissent dans du contenu régulier et des publicités ciblées.",
    r3h: "Vous avez essayé le marketing avant — sans résultat.",
    r3p: "Booster des publications n'est pas de la publicité. Kaba construit le système complet derrière la croissance.",
    showcaseTitle: "Choisissez le système dont votre entreprise a besoin pour croître.",
    showcaseSub: "Sites web, contenu, publicités et suivi doivent fonctionner ensemble.",
    roadTitle: "Votre marque n'a pas besoin de contenu aléatoire. Elle a besoin d'un système de croissance.",
    roadSub: "Faites défiler et regardez comment Kaba transforme une entreprise invisible en marque qui attire, inspire confiance et vend.",
    marketControl: "Ce n'est pas du marketing. C'est le contrôle du marché.",
    contactTitle: "QUE CHERCHEZ-VOUS ?",
    contactLead: "Chaque entreprise est différente. Réservez 20 minutes de consultation.",
    consultBtn: "Réserver 20 min de consultation",
  }
};

const styles = `
html{scroll-behavior:smooth}*{box-sizing:border-box}body{margin:0;background:#050505}
.app{min-height:100vh;background:#050505;color:#f7f3e8;font-family:Inter,system-ui,sans-serif;overflow-x:hidden}
.noise{position:fixed;inset:0;pointer-events:none;z-index:50;opacity:.13;background-image:radial-gradient(rgba(255,255,255,.12) 1px,transparent 1px);background-size:3px 3px}
.nav{position:fixed;top:18px;left:50%;transform:translateX(-50%);z-index:90;width:min(1180px,calc(100% - 28px));display:flex;align-items:center;justify-content:space-between;padding:13px 16px;border:1px solid rgba(255,255,255,.1);border-radius:22px;background:rgba(5,5,5,.72);backdrop-filter:blur(18px)}
.brand{display:flex;align-items:center;min-width:190px;gap:8px;font-weight:900;letter-spacing:.05em;color:#e5b957}
.nav-links{display:flex;gap:22px;color:#a7a096;font-size:14px}
.nav-links a{color:#a7a096;text-decoration:none;font-size:14px}
.lang{display:flex;gap:4px;background:#111;border-radius:999px;padding:4px}
.lang button{border:0;background:transparent;color:#a7a096;padding:7px 10px;border-radius:999px;font-weight:800;cursor:pointer}
.lang .on{background:#e5b957;color:#000}
.section{width:min(1180px,calc(100% - 32px));margin:0 auto;padding:120px 0}
.eyebrow{display:flex;align-items:center;gap:8px;color:#e5b957;font-size:12px;letter-spacing:.18em;font-weight:950;text-transform:uppercase}
.hero{min-height:100vh;display:grid;grid-template-columns:1.08fr .92fr;align-items:center;gap:56px;padding-top:100px}
.hero h1,.section h2{font-size:clamp(48px,8vw,112px);line-height:.88;margin:20px 0 24px;letter-spacing:-.075em;color:#f7f3e8}
.lead{font-size:clamp(18px,2vw,24px);color:#d5cec1;line-height:1.55;max-width:760px}
.actions{display:flex;gap:14px;flex-wrap:wrap;margin-top:32px}
.btn{display:inline-flex;align-items:center;gap:10px;padding:16px 20px;border-radius:999px;font-weight:900;cursor:pointer;text-decoration:none}
.primary{background:linear-gradient(135deg,#e5b957,#fff0a8);color:#050505}
.ghost{border:1px solid rgba(255,255,255,.16);color:#f7f3e8}
.proofbar{display:flex;gap:12px;flex-wrap:wrap;margin-top:36px}
.proofbar span{display:flex;gap:7px;align-items:center;color:#a7a096;border:1px solid rgba(255,255,255,.1);padding:10px 12px;border-radius:999px;background:rgba(255,255,255,.035)}
.hero-visual{position:relative;min-height:530px;display:grid;place-items:center}
.dashboard{position:relative;width:min(480px,100%);border:1px solid rgba(255,255,255,.13);border-radius:32px;background:linear-gradient(180deg,rgba(255,255,255,.09),rgba(255,255,255,.03));box-shadow:0 40px 100px rgba(0,0,0,.55);padding:22px;overflow:hidden}
.dashboard:before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.08),transparent);animation:sweep 3.8s infinite}
.dash-head{display:flex;gap:8px}.dash-head span{width:10px;height:10px;border-radius:50%;background:#e5b957}
.signal{margin-top:70px;display:flex;justify-content:space-between;align-items:end}
.signal span{color:#a7a096}.signal strong{font-size:66px;color:#e5b957;letter-spacing:-.07em}
.bars{display:flex;gap:12px;align-items:end;height:160px;margin-top:30px}
.bars i{flex:1;background:linear-gradient(#fff0a8,#e5b957);border-radius:12px 12px 0 0;animation:grow 2.2s ease-in-out infinite alternate}
.bars i:nth-child(1){height:30%}.bars i:nth-child(2){height:55%;animation-delay:.2s}.bars i:nth-child(3){height:42%;animation-delay:.4s}.bars i:nth-child(4){height:75%;animation-delay:.6s}.bars i:nth-child(5){height:96%;animation-delay:.8s}
.mini-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:16px}
.mini-grid b{background:#111;border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:10px;text-align:center;font-size:12px}
.reality-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:28px}
.reality-grid article,.card,.solution,.plan,.compare-grid>div,.industry-card{border:1px solid rgba(255,255,255,.1);background:linear-gradient(180deg,rgba(255,255,255,.055),rgba(255,255,255,.02));border-radius:26px;padding:24px}
.reality-grid span{color:#e5b957;font-weight:950}.reality-grid h3{font-size:26px;line-height:1.12;margin:18px 0;color:#f7f3e8}
.reality-grid p,.who p,.muted{color:#a7a096;line-height:1.65}
.intro-screen{position:fixed;inset:0;z-index:999;background:#050505;display:grid;place-items:center;overflow:hidden;animation:introExit .6s ease 3.35s forwards;pointer-events:none}
.intro-grid{position:absolute;inset:0;background:radial-gradient(circle at 50% 30%,rgba(229,185,87,.18),transparent 28%),linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px);background-size:100% 100%,70px 70px,70px 70px;opacity:.75}
.intro-mark{position:relative;text-align:center}
.intro-letters{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-bottom:18px}
.intro-letters span{font-size:clamp(72px,12vw,180px);font-weight:950;line-height:.8;letter-spacing:-.08em;color:#f7f3e8;animation:letterDrop .8s cubic-bezier(.2,.8,.2,1) both}
.intro-letters span:nth-child(2){animation-delay:.15s}.intro-letters span:nth-child(3){animation-delay:.3s}.intro-letters span:nth-child(4){animation-delay:.45s}
.intro-mark strong{display:inline-block;color:#e5b957;letter-spacing:.42em;font-size:18px;margin-left:.42em;animation:fadeUp .7s ease .9s both}
.intro-mark p{color:#a7a096;font-weight:700;margin:18px 0 24px;animation:fadeUp .7s ease 1.15s both}
.intro-mark button{border:1px solid rgba(229,185,87,.35);background:linear-gradient(135deg,#e5b957,#fff0a8);color:#050505;border-radius:999px;padding:14px 18px;font-weight:900;display:inline-flex;align-items:center;gap:8px;cursor:pointer;animation:fadeUp .7s ease 1.35s both}
.showcase{position:relative;background:radial-gradient(circle at 18% 28%,rgba(105,75,210,.34),transparent 30%),radial-gradient(circle at 78% 18%,rgba(70,190,170,.18),transparent 34%),linear-gradient(90deg,#06070b,#080808);overflow:clip}
.showcase-sticky{position:sticky;top:0;height:100dvh;width:100%;overflow:hidden;flex-shrink:0}
.showcase-sticky:before{content:'';position:absolute;inset:0;background-image:radial-gradient(rgba(126,72,255,.35) 1px,transparent 1px),radial-gradient(rgba(229,185,87,.26) 1px,transparent 1px);background-size:18px 18px,31px 31px;mask-image:radial-gradient(circle at 50% 50%,black,transparent 70%);opacity:.55;animation:particleDrift 7s ease-in-out infinite alternate}
.showcase-head{position:absolute;left:5vw;top:7vh;z-index:8;max-width:760px}
.showcase-head h2{font-size:clamp(38px,5.5vw,82px);line-height:.88;letter-spacing:-.07em;margin:16px 0}
.showcase-head p:not(.eyebrow){color:#a7a096;font-size:18px;line-height:1.55;max-width:620px}
.showcase-cta{display:inline-flex;align-items:center;gap:10px;margin-top:22px;background:linear-gradient(135deg,#e5b957,#fff0a8);color:#050505;text-decoration:none;border-radius:999px;padding:15px 19px;font-weight:950;box-shadow:0 18px 60px rgba(229,185,87,.18)}
.showcase-cord{position:absolute;width:82vw;height:42vh;left:9vw;top:33vh;z-index:1;opacity:.8}
.showcase-cord path{fill:none;stroke:#e5b957;stroke-width:7;stroke-linecap:round;stroke-dasharray:150 35;filter:drop-shadow(0 0 22px rgba(229,185,87,.5));animation:cordMove 2.3s linear infinite}
.showcase-stage{position:absolute;inset:0;z-index:3;display:grid;place-items:center;perspective:1500px}
.showcase-card{position:absolute;width:min(620px,44vw);height:360px;border-radius:30px;border:1px solid rgba(255,255,255,.18);padding:220px 32px 30px;background:linear-gradient(135deg,rgba(83,64,210,.68),rgba(61,194,184,.2) 31%,rgba(229,78,148,.2) 58%,rgba(0,0,0,.76));box-shadow:0 60px 140px rgba(0,0,0,.6),inset 0 1px 0 rgba(255,255,255,.14);backdrop-filter:blur(18px);overflow:hidden;transition:transform .42s cubic-bezier(.2,.8,.2,1),opacity .34s ease,filter .34s ease}
.showcase-card.active{box-shadow:0 80px 170px rgba(0,0,0,.72),0 0 120px rgba(229,185,87,.25),0 0 130px rgba(126,72,255,.24);z-index:6}
.showcase-card:before{content:'';position:absolute;inset:0;background:linear-gradient(120deg,transparent,rgba(255,255,255,.13),transparent);animation:sweep 3s infinite}
.showcase-card:after{content:'';position:absolute;inset:0;background:radial-gradient(circle at 48% 22%,rgba(255,255,255,.15),transparent 28%),repeating-linear-gradient(0deg,rgba(255,255,255,.035) 0 1px,transparent 1px 4px);opacity:.46}
.showcase-card>*{position:relative;z-index:2}
.showcase-card p{color:#e5b957;font-size:11px;font-weight:950;letter-spacing:.24em;text-transform:uppercase;margin:0 0 10px}
.showcase-card h2{font-size:clamp(30px,3vw,46px);line-height:.92;letter-spacing:-.06em;text-transform:uppercase;margin:0}
.cinema-number{position:absolute;right:24px;top:18px;color:rgba(255,240,168,.45);font-size:12px;font-weight:950;letter-spacing:.16em}
.cinema-line{position:absolute;left:0;bottom:0;height:4px;background:#e5b957;box-shadow:0 0 24px rgba(229,185,87,.7)}
.showcase-explain{position:absolute;right:7vw;top:50%;transform:translateY(-50%);width:min(430px,30vw);z-index:10;border:1px solid rgba(255,255,255,.12);border-radius:30px;padding:28px;background:rgba(5,5,5,.66);backdrop-filter:blur(18px);box-shadow:0 30px 90px rgba(0,0,0,.35)}
.showcase-explain>span{color:#e5b957;font-size:12px;font-weight:950;letter-spacing:.18em}
.showcase-explain h3{font-size:42px;line-height:.95;margin:14px 0}
.showcase-explain p{color:#d5cec1;line-height:1.65}
.tag-row{display:flex;gap:8px;flex-wrap:wrap;margin:18px 0}
.tag-row b{font-size:12px;border:1px solid rgba(229,185,87,.22);background:rgba(229,185,87,.08);border-radius:999px;padding:8px 10px;color:#f7f3e8}
.showcase-explain em{display:block;font-style:normal;color:#050505;background:linear-gradient(135deg,#e5b957,#fff0a8);border-radius:16px;padding:14px;font-weight:950}
.mob-card-nav{display:none}.showcase-progress{position:absolute;right:42px;top:50%;transform:translateY(-50%);z-index:12;display:grid;gap:6px;width:230px}
.showcase-progress button{text-align:left;border:0;border-left:1px solid rgba(255,255,255,.1);background:transparent;color:rgba(247,243,232,.36);padding:14px 18px;font-weight:950;text-transform:uppercase;letter-spacing:.02em;cursor:pointer;transition:.25s}
.showcase-progress button small{margin-right:12px;color:rgba(229,185,87,.36)}
.showcase-progress button.on{background:rgba(229,185,87,.09);color:#f7f3e8;border-left-color:#e5b957;transform:translateX(-10px)}
.showcase-progress button.on small{color:#e5b957}
.growth-section{position:relative;padding:110px 0 0;margin:0;overflow:hidden}
.sticky-growth{position:sticky;top:0;height:100vh;display:flex;flex-direction:column;justify-content:center;width:min(1180px,calc(100% - 32px));margin:0 auto;overflow:hidden}
.section-intro h2{font-size:clamp(30px,4.7vw,62px);line-height:.95;max-width:920px;color:#f7f3e8}
.section-intro p:not(.eyebrow){color:#a7a096;font-size:18px;line-height:1.65;max-width:760px}
.road-stage{display:grid;grid-template-columns:340px 1fr;gap:22px;align-items:stretch;margin-top:18px;min-height:460px}
.stage-panel{display:grid;gap:14px;align-content:start}
.progress-chip{display:flex;justify-content:space-between;align-items:center;border:1px solid rgba(255,255,255,.1);border-radius:18px;padding:16px 18px;background:linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.025))}
.progress-chip span{font-size:12px;text-transform:uppercase;letter-spacing:.15em;color:#a7a096;font-weight:800}
.progress-chip strong{font-size:24px;color:#e5b957}
.stage-card{padding:24px;border:1px solid rgba(255,255,255,.12);border-radius:24px;background:rgba(8,8,8,.82);backdrop-filter:blur(20px)}
.active-card .num{color:#e5b957;font-weight:900}.active-card h3{font-size:34px;margin:8px 0}.active-card p{color:#a7a096;line-height:1.6}
.metric{display:inline-flex;color:#000;background:#e5b957;border-radius:999px;padding:8px 12px;font-weight:900}
.stage-list{display:grid;gap:8px}
.mini-stage{display:flex;align-items:center;gap:10px;padding:12px 14px;border:1px solid rgba(255,255,255,.08);border-radius:14px;background:rgba(255,255,255,.025);color:#a7a096}
.mini-stage.current,.mini-stage.done{border-color:rgba(229,185,87,.35);background:rgba(229,185,87,.1);color:#f7f3e8}
.mini-stage svg{color:#e5b957}
.road-wrap{position:relative;height:460px;border:1px solid rgba(255,255,255,.09);background:radial-gradient(circle at 10% 20%,rgba(229,185,87,.13),transparent 30%),linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.02));border-radius:34px;overflow:hidden}
.road-bg-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px);background-size:40px 40px}
.road{position:absolute;inset:0;width:100%;height:100%;z-index:2}
.road-shadow,.road-surface,.road-centerline,.road-progress{fill:none;stroke-linecap:round;stroke-linejoin:round}
.road-shadow{stroke:rgba(0,0,0,.35);stroke-width:84;filter:blur(18px)}
.road-surface{stroke:#121212;stroke-width:76}
.road-centerline{stroke:#f7f3e8;stroke-width:5;stroke-dasharray:12 18;opacity:.72;animation:dashmove 1.15s linear infinite}
.road-progress{stroke:url(#roadGrad);stroke-width:6;stroke-dasharray:1500;stroke-dashoffset:calc(1500 - (1500 * var(--progress) / 100));filter:drop-shadow(0 0 12px rgba(229,185,87,.9)) drop-shadow(0 0 28px rgba(229,185,87,.5));transition:stroke-dashoffset .55s cubic-bezier(.2,.8,.2,1)}
.road-node{position:absolute;transform:translate(-50%,-50%);display:flex;align-items:center;gap:8px;padding:10px 14px;border-radius:999px;background:#0b0b0b;border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.3);z-index:5;transition:.5s cubic-bezier(.2,.8,.2,1);font-size:13px;font-weight:700;letter-spacing:.04em;box-shadow:0 4px 20px rgba(0,0,0,.4)}
.road-node.active{color:#050505;background:linear-gradient(135deg,#fff0a8,#e5b957);border-color:#e5b957;box-shadow:0 0 40px rgba(229,185,87,.5),0 4px 20px rgba(0,0,0,.4);transform:translate(-50%,-50%) scale(1.12)}
.road-node.done{color:#e5b957;border-color:rgba(229,185,87,.4);background:rgba(229,185,87,.08)}
.node-0{left:7%;top:81%}.node-1{left:24%;top:57%}.node-2{left:39%;top:71%}.node-3{left:56%;top:40%}.node-4{left:73%;top:46%}.node-5{left:92%;top:17%}
.traveler{position:absolute;z-index:6;width:72px;height:40px;pointer-events:none;transition:left .55s cubic-bezier(.2,.8,.2,1),top .55s cubic-bezier(.2,.8,.2,1)}
.traveler-body{position:absolute;inset:0;border-radius:999px;background:linear-gradient(135deg,#fff0a8,#e5b957);display:grid;place-items:center;color:#050505;font-weight:950;box-shadow:0 0 30px rgba(229,185,87,.6),0 0 60px rgba(229,185,87,.3);animation:travelerPulse 2s ease-in-out infinite}
.traveler-label{font-size:12px;letter-spacing:.16em}
.brand-core{position:absolute;left:51%;top:53%;width:150px;height:150px;border-radius:50%;display:grid;place-items:center;background:radial-gradient(circle,#fff0a8,#e5b957);color:#050505;font-weight:950;box-shadow:0 0 70px rgba(229,185,87,.5);z-index:4;transition:transform .55s cubic-bezier(.2,.8,.2,1)}
.brand-core span{font-size:30px}.brand-core small{position:absolute;bottom:33px;font-size:11px;letter-spacing:.18em}
.float-stat{position:absolute;z-index:4;padding:12px 14px;border-radius:16px;background:rgba(8,8,8,.75);border:1px solid rgba(255,255,255,.12)}
.float-stat span{display:block;color:#a7a096;font-size:12px;margin-top:4px}
.stat-1{left:16%;top:16%}.stat-2{right:18%;top:18%}.stat-3{right:12%;bottom:14%}
.finish-glow{position:absolute;right:34px;bottom:30px;z-index:4;border:1px solid rgba(229,185,87,.35);background:rgba(229,185,87,.1);border-radius:999px;padding:13px 18px;color:#e5b957;font-weight:950;font-size:12px;letter-spacing:.18em}
.market-footer{display:grid;grid-template-columns:1fr 380px;gap:22px;align-items:end;margin-top:16px}
.market-control{margin:0;font-size:clamp(32px,6vw,74px)!important;max-width:760px;color:#f7f3e8}
.control-chips{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.control-chips span{border:1px solid rgba(229,185,87,.24);background:rgba(229,185,87,.08);border-radius:999px;padding:12px 14px;font-size:13px;font-weight:800;text-align:center}
.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.card svg{color:#e5b957}.card h3{font-size:24px;margin:18px 0 10px}.card p{color:#a7a096;line-height:1.6}
.split{display:grid;grid-template-columns:1fr .85fr;gap:40px;align-items:center}
.problem-list{display:grid;gap:10px;margin-top:28px}
.problem-list button{display:flex;justify-content:space-between;align-items:center;text-align:left;border:1px solid rgba(255,255,255,.1);background:#0b0b0b;color:#f7f3e8;border-radius:16px;padding:16px;font-weight:800;cursor:pointer}
.problem-list .on{background:#e5b957;color:#000}
.solution{position:sticky;top:120px}.solution span{color:#e5b957;font-weight:900;letter-spacing:.16em;font-size:12px}
.solution h3{font-size:24px;margin:18px 0 10px}.solution p{color:#a7a096;line-height:1.6}
.compare h2{font-size:clamp(36px,6vw,78px);max-width:960px}
.compare-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.compare-grid p{padding:14px;border-radius:14px;background:rgba(255,255,255,.04);color:#a7a096;display:flex;gap:8px;align-items:center}
.compare-grid div:nth-child(2) p{color:#f4ead6}
.industries{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.industry-card strong{display:block}.industry-card span{display:block;color:#a7a096;margin-top:10px;font-size:13px;line-height:1.45}
.plans{display:grid;gap:14px}
.plan{display:flex;justify-content:space-between;gap:20px;align-items:center}
.plan span{color:#e5b957;font-weight:900}.plan h3{font-size:32px;margin:8px 0}.plan p{color:#a7a096;line-height:1.6}
.plan a{white-space:nowrap;color:#e5b957;font-weight:900;display:flex;gap:8px;text-decoration:none}
.contact-section{background:#e9e2d4;color:#161616;position:relative;overflow:hidden;padding:110px 0}
.contact-section:before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(22,22,22,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(22,22,22,.055) 1px,transparent 1px);background-size:96px 96px}
.contact-section{padding-left:max(16px,env(safe-area-inset-left));padding-right:max(16px,env(safe-area-inset-right))}
.contact-inner{position:relative;z-index:1;width:min(1180px,calc(100% - 32px));margin:0 auto}
.contact-kicker{display:flex;align-items:center;gap:22px;color:#d19500;font-size:15px;letter-spacing:.32em;font-weight:900;margin:0 0 28px}
.contact-kicker span{width:76px;height:2px;background:#d19500;display:inline-block}
.contact-section h2{font-size:clamp(64px,11vw,156px);line-height:.88;letter-spacing:-.075em;margin:0 0 38px;font-weight:950;color:#171717}
.contact-section h2 strong{color:#d19500;font-weight:950}
.contact-lead{font-size:clamp(19px,2.2vw,30px);line-height:1.65;color:#4e4e4e;max-width:900px;margin:0 0 30px}
.consult-btn{display:inline-flex;align-items:center;gap:12px;background:#161616;color:#e9e2d4;text-decoration:none;border-radius:999px;padding:18px 24px;font-size:18px;font-weight:950;margin:0 0 58px;box-shadow:0 18px 50px rgba(0,0,0,.18)}
.contact-list{max-width:980px;border-top:1px solid rgba(22,22,22,.16)}
.contact-list a,.contact-list div{display:grid;grid-template-columns:16px 200px 1fr;gap:22px;align-items:center;min-height:92px;border-bottom:1px solid rgba(22,22,22,.16);color:#171717;text-decoration:none}
.contact-list i{width:9px;height:9px;background:#d19500;border-radius:50%;display:block}
.contact-list span{font-family:monospace;letter-spacing:.24em;color:#8b887f;font-size:17px}
.contact-list b{font-size:clamp(20px,2.5vw,32px);font-weight:850;letter-spacing:-.03em}
footer{text-align:center;color:#a7a096;padding:30px}
@keyframes letterDrop{from{opacity:0;transform:translateY(46px) scale(.9);filter:blur(10px)}to{opacity:1;transform:translateY(0) scale(1);filter:blur(0)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
@keyframes introExit{to{opacity:0;visibility:hidden;pointer-events:none;display:none}}
@keyframes sweep{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}
@keyframes grow{to{transform:scaleY(.72);opacity:.78}}
@keyframes particleDrift{from{transform:translate3d(-20px,18px,0) scale(1);opacity:.5}to{transform:translate3d(34px,-22px,0) scale(1.06);opacity:.85}}
@keyframes cordMove{to{stroke-dashoffset:-185}}
@keyframes travelerPulse{0%,100%{box-shadow:0 0 30px rgba(229,185,87,.6),0 0 60px rgba(229,185,87,.3)}50%{box-shadow:0 0 50px rgba(229,185,87,.9),0 0 100px rgba(229,185,87,.5)}}
@keyframes dashmove{to{stroke-dashoffset:-60}}
@media(max-width:900px){
  /* NAV */
  .nav-links{display:none}
  /* HERO */
  .hero{grid-template-columns:1fr;min-height:auto;padding:100px 0 60px}
  .hero-visual{display:none}
  .hero h1{font-size:clamp(48px,12vw,80px)}
  /* GRIDS */
  .split,.compare-grid{grid-template-columns:1fr}
  .cards,.reality-grid{grid-template-columns:1fr 1fr}
  .industries{grid-template-columns:1fr 1fr}
  /* SECTION */
  .section{padding:60px 20px}
  /* ── SHOWCASE CARDS ── */
  .showcase{height:auto!important}
  .showcase-sticky{height:100svh!important;position:relative!important;overflow:hidden}
  .showcase-head{left:20px;right:20px;top:72px;max-width:100%}
  .showcase-head h2{font-size:clamp(26px,7vw,38px);margin:8px 0 6px}
  .showcase-head p{font-size:13px;line-height:1.5;display:none}
  .showcase-cta{padding:11px 14px;font-size:12px;margin-top:12px}
  .showcase-cord{display:none}
  .showcase-card{width:86vw;height:56vw;min-height:220px;max-height:300px;padding:0 20px 22px;display:flex;flex-direction:column;justify-content:flex-end;border-radius:18px}
  .showcase-card h2{font-size:clamp(20px,5.5vw,30px);line-height:1}
  .showcase-card p{font-size:10px;letter-spacing:.18em;margin-bottom:6px}
  .cinema-number{font-size:10px;top:14px;right:14px}
  .showcase-explain{position:fixed;left:12px;right:12px;bottom:20px;top:auto;transform:none;width:auto;padding:14px 16px;border-radius:14px;z-index:20}
  .showcase-explain>span{font-size:10px}
  .showcase-explain h3{font-size:22px;margin:8px 0 6px}
  .showcase-explain p{font-size:11px;line-height:1.55;margin-bottom:8px}
  .tag-row{gap:4px;margin:8px 0}
  .tag-row b{font-size:9px;padding:4px 7px}
  .showcase-explain em{padding:8px 12px;font-size:12px}
  .showcase-progress{display:none}
  .mob-card-nav{position:absolute;bottom:20px;left:50%;transform:translateX(-50%);z-index:30;display:flex;align-items:center;gap:16px;background:rgba(5,5,5,.7);border:1px solid rgba(255,255,255,.15);border-radius:999px;padding:8px 20px;backdrop-filter:blur(12px)}
  .mob-card-nav button{background:none;border:none;color:#e5b957;font-size:20px;cursor:pointer;padding:4px 8px;font-weight:900;opacity:.9}
  .mob-card-nav button:disabled{opacity:.3;cursor:default}
  .mob-card-nav span{color:#f7f3e8;font-size:12px;letter-spacing:.1em;font-weight:700;min-width:40px;text-align:center}
  /* ── ROADMAP ── */
  .growth-section{height:auto!important;padding:60px 20px 40px}
  .sticky-growth{position:relative!important;height:auto!important;min-height:0!important;top:auto!important;overflow:visible!important}
  .road-stage{grid-template-columns:1fr;gap:14px;min-height:auto;margin-top:14px}
  .stage-panel{gap:8px}
  .progress-chip{padding:10px 14px}
  .stage-card{padding:16px}
  .active-card h3{font-size:22px;margin:4px 0}
  .active-card p{font-size:12px}
  .stage-list{grid-template-columns:1fr 1fr;gap:6px}
  .mini-stage{padding:8px 10px;font-size:11px}
  .mini-stage svg{width:13px;height:13px}
  .road-wrap{height:260px;border-radius:18px}
  .road-node{padding:5px 9px;font-size:10px;gap:3px}
  .road-node svg{width:11px;height:11px}
  .brand-core{width:70px;height:70px;left:50%;top:50%}
  .brand-core span{font-size:15px}
  .brand-core small{font-size:8px;bottom:18px}
  .traveler{width:44px;height:26px}
  .traveler-label{font-size:10px}
  .float-stat{display:none}
  .finish-glow{display:none}
  .market-footer{grid-template-columns:1fr;margin-top:20px;gap:14px;margin-bottom:0;padding-bottom:0}
  .market-control{font-size:clamp(28px,8vw,44px)!important;line-height:1}
  .control-chips{grid-template-columns:1fr 1fr;gap:6px}
  .control-chips span{padding:10px 8px;font-size:11px}
  /* ── CTA / CONTACT ── */
  .contact-section{padding:60px 20px 50px}
  .contact-inner{padding:0}
  .contact-section h2{font-size:clamp(42px,11vw,80px);line-height:.88;margin-bottom:24px}
  .contact-lead{font-size:clamp(15px,4vw,18px);margin-bottom:24px}
  .consult-btn{font-size:14px;padding:14px 18px;margin-bottom:32px;border-radius:14px}
  .contact-list a,.contact-list div{grid-template-columns:10px 1fr;gap:10px;min-height:60px;align-items:center}
  .contact-list span{display:none}
  .contact-list b{font-size:clamp(13px,4vw,18px);letter-spacing:-.01em}
  .contact-kicker{font-size:12px;letter-spacing:.2em;margin-bottom:16px}
  .contact-kicker span{width:40px}
  /* PLANS */
  .plans{gap:10px}
  .plan{flex-direction:column;align-items:flex-start;gap:12px;padding:20px}
  .plan h3{font-size:22px;margin:4px 0}
  .plan p{font-size:12px}
  .plan a{font-size:13px}
}
@media(max-width:500px){
  .cards,.reality-grid{grid-template-columns:1fr}
  .industries{grid-template-columns:1fr 1fr}
  .stage-list{grid-template-columns:1fr}
  .control-chips{grid-template-columns:1fr 1fr}
  .showcase-card{height:62vw}
  .hero h1{font-size:clamp(44px,13vw,72px)}
}
`;

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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 3600);
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
          if (wheelCooldownRef.current || Math.abs(wheelBufferRef.current) < 520) return;
          if (e.deltaY > 0 && currentStep >= maxStep) { window.scrollTo({ top: show.offsetTop + show.offsetHeight + 2, behavior: 'auto' }); return; }
          if (e.deltaY <= 0 && currentStep <= 0) { window.scrollTo({ top: show.offsetTop - window.innerHeight * 0.85, behavior: 'auto' }); return; }
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
        if (rect.top > window.innerHeight * 0.7) { showcaseStepRef.current = 0; showcaseProgressRef.current = 0; setShowcaseProgress(0); }
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

      {showIntro && (
        <div className="intro-screen" style={{position:'fixed',inset:0,zIndex:999,background:'#050505',display:'grid',placeItems:'center',overflow:'hidden'}}>
          <div className="intro-grid" />
          <div className="intro-mark">
            <div className="intro-letters">
              {['K','A','B','A'].map((l,i) => <span key={i}>{l}</span>)}
            </div>
            <strong>LABS</strong>
            <p>Growth Systems for Ethiopian Businesses</p>
            <button onClick={() => setShowIntro(false)}>Enter the Lab <ArrowUpRight size={18}/></button>
          </div>
        </div>
      )}

      <header className="nav">
        <div className="brand">KABA LABS</div>
        <nav className="nav-links">
          <a href="#kaba-showcase">Systems</a>
          <a href="#growth-system">Growth</a>
          <a href="#stack">Stack</a>
          <a href="#plans">Plans</a>
        </nav>
        <div className="lang">
          {['en','am','fr'].map(l => (
            <button key={l} onClick={() => setLang(l)} className={lang === l ? 'on' : ''}>{langLabel(l)}</button>
          ))}
        </div>
      </header>

      <section className="hero section">
        <div>
          <p className="eyebrow"><Sparkles size={16}/>KABA LABS / GROWTH COMMAND CENTER</p>
          <h1 style={{color:'#f7f3e8'}}>{t[lang].heroTitle}</h1>
          <p className="lead">{t[lang].heroSub}</p>
          <div className="actions">
            <a className="btn primary" href="https://wa.me/251913864659" target="_blank" rel="noreferrer">{t[lang].heroCta} <ArrowUpRight size={18}/></a>
            <a className="btn ghost" href="#kaba-showcase"><Play size={17}/>{t[lang].heroCtaSecondary}</a>
          </div>
          <div className="proofbar">
            <span><Check size={15}/>60+ Clients Served</span>
            <span><Check size={15}/>10+ Dental & Medical Clients</span>
            <span><Check size={15}/>Websites • Ads • CRM</span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="dashboard">
            <div className="dash-head"><span/><span/><span/></div>
            <div className="signal"><span>Market Signal</span><strong>+284%</strong></div>
            <div className="bars"><i/><i/><i/><i/><i/></div>
            <div className="mini-grid"><b>Video</b><b>Ads</b><b>Systems</b><b>CRM</b></div>
          </div>
        </div>
      </section>

      <section className="section">
        <p className="eyebrow"><Zap size={16}/>THE REALITY</p>
        <h2>{t[lang].realityTitle}</h2>
        <div className="reality-grid">
          <article><span>01</span><h3>{t[lang].r1h}</h3><p>{t[lang].r1p}</p></article>
          <article><span>02</span><h3>{t[lang].r2h}</h3><p>{t[lang].r2p}</p></article>
          <article><span>03</span><h3>{t[lang].r3h}</h3><p>{t[lang].r3p}</p></article>
        </div>
      </section>

      {/* SHOWCASE — SCROLL-LOCKED CARDS */}
      <section id="kaba-showcase" className="showcase" style={{height: isMobile ? 'auto' : '400vh'}}>
        <div className="showcase-sticky">
          <div className="showcase-head">
            <p className="eyebrow"><Sparkles size={16}/>GROWTH SYSTEMS</p>
            <h2>{t[lang].showcaseTitle}</h2>
            <p>{t[lang].showcaseSub}</p>
            <a className="showcase-cta" href="https://wa.me/251913864659" target="_blank" rel="noreferrer">Book 20-Min Consultation <ArrowUpRight size={18}/></a>
          </div>
          <svg className="showcase-cord" viewBox="0 0 1200 460" preserveAspectRatio="none">
            <path d="M20 250 C210 40 360 420 560 210 C740 20 880 390 1180 120" />
          </svg>
          <div className="showcase-stage">
            {slides.map((item, i) => {
              const offset = i - rawShowcase;
              const isActive = Math.abs(offset) < .55;
              const cardStyle = {
                transform: `translate3d(${offset * 58}vw,${Math.abs(offset)*34}px,0) rotateY(${offset*-18}deg) rotateZ(${offset*2.5}deg) scale(${isActive?1:.82})`,
                opacity: Math.abs(offset) > 2.2 ? 0 : isActive ? 1 : .38,
                filter: isActive ? 'blur(0px)' : 'blur(1px)'
              };
              return (
                <article key={item.side} className={`showcase-card ${isActive?'active':''}`} style={cardStyle}>
                  <span className="cinema-number">0{i+1} / 05</span>
                  <p>{item.kicker}</p>
                  <h2>{item.title.split('\n').map((line,j) => <React.Fragment key={j}>{line}<br/></React.Fragment>)}</h2>
                  <div className="cinema-line" style={{width:isActive?`${35+slideMotion*55}%`:'22%'}}/>
                </article>
              );
            })}
          </div>
          <aside className="showcase-explain">
            <span>0{showcaseIndex+1} / 05</span>
            <h3>{activeSlide.side}</h3>
            <p>{activeSlide.body}</p>
            <div className="tag-row">{activeSlide.tags.map(tag => <b key={tag}>{tag}</b>)}</div>
            <em>{activeSlide.metric}</em>
          </aside>
          <div className="showcase-progress">
            {slides.map((item,i) => (
              <button key={item.side} onClick={() => jumpShowcase(i)} className={i===showcaseIndex?'on':''}>
                <small>0{i+1}</small>{item.side}
              </button>
            ))}
          </div>
          {/* Mobile tap nav */}
          <div className="mob-card-nav">
            <button onClick={() => { const i = Math.max(0, showcaseIndex-1); jumpShowcase(i); }} disabled={showcaseIndex===0}>←</button>
            <span>{showcaseIndex+1} / {slides.length}</span>
            <button onClick={() => { const i = Math.min(slides.length-1, showcaseIndex+1); jumpShowcase(i); }} disabled={showcaseIndex===slides.length-1}>→</button>
          </div>
        </div>
      </section>

      {/* GROWTH ROADMAP */}
      <section id="growth-system" className="growth-section" style={{height: isMobile ? 'auto' : '500vh', paddingBottom: isMobile ? 0 : 0}}>
        <div className="sticky-growth" style={{position: isMobile ? 'relative' : 'sticky', top: isMobile ? 'unset' : 0, height: isMobile ? 'auto' : '100vh', minHeight: isMobile ? 0 : '100vh'}}>
          <div className="section-intro">
            <p className="eyebrow"><MousePointer2 size={16}/>SCROLL TO GROW</p>
            <h2>{t[lang].roadTitle}</h2>
            <p>{t[lang].roadSub}</p>
          </div>
          <div className="road-stage">
            <aside className="stage-panel">
              <div className="progress-chip"><span>Growth progress</span><strong>{Math.round(roadProgress*100)}%</strong></div>
              <div className="active-card stage-card"><div className="num">0{activeIndex+1}</div><h3>{active.title}</h3><p>{active.text}</p><span className="metric">{active.metric}</span></div>
              <div className="stage-list">{roadmap.map((step,i) => { const Icon=step.icon; return <div key={step.title} className={`mini-stage ${i<=activeIndex?'done':''} ${i===activeIndex?'current':''}`}><Icon size={16}/><span>{step.title}</span></div>; })}</div>
            </aside>
            <div className="road-wrap" style={roadStyle}>
              <div className="road-bg-grid"/>
              <svg className="road" viewBox="0 0 1100 460" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="roadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#e5b957"/>
                    <stop offset="100%" stopColor="#fff0a8"/>
                  </linearGradient>
                </defs>
                <path className="road-shadow" d="M40 380 C220 250 280 420 430 290 C570 168 660 290 770 185 C870 90 980 125 1060 70"/>
                <path className="road-surface" d="M40 380 C220 250 280 420 430 290 C570 168 660 290 770 185 C870 90 980 125 1060 70"/>
                <path ref={pathRef} className="road-centerline" d="M40 380 C220 250 280 420 430 290 C570 168 660 290 770 185 C870 90 980 125 1060 70"/>
                <path className="road-progress" d="M40 380 C220 250 280 420 430 290 C570 168 660 290 770 185 C870 90 980 125 1060 70"/>
              </svg>
              {roadmap.map((step,i) => { const Icon=step.icon; return <div key={step.title} className={`road-node node-${i} ${i===activeIndex?'active':i<activeIndex?'done':''}`}><Icon size={18}/><span>{step.title}</span></div>; })}
              <div className="traveler" style={{left:`${traveler.x}px`,top:`${traveler.y}px`,transform:`translate(-50%,-50%) rotate(${traveler.angle}deg)`}}>
                <div className="traveler-body"><span className="traveler-label">KABA</span></div>
              </div>
              <div className="brand-core" style={{transform:`translate(-50%,-50%) scale(${active.scale})`}}><span>KABA</span><small>{active.metric}</small></div>
              <div className="finish-glow">MARKET CONTROL</div>
              <div className="float-stat stat-1"><strong>Visibility</strong><span>→ On</span></div>
              <div className="float-stat stat-2"><strong>Trust</strong><span>+ Brand Lift</span></div>
              <div className="float-stat stat-3"><strong>Leads</strong><span>Flow Activated</span></div>
            </div>
          </div>
        </div>
        <div style={{width:'min(1180px,calc(100% - 32px))',margin:'0 auto',padding:'40px 0 80px',position:'relative',zIndex:10}}>
          <h2 className="market-control">{t[lang].marketControl}</h2>
          <div className="control-chips"><span>Strategy locked</span><span>Content engine live</span><span>Leads moving</span><span>Scale mode</span></div>
        </div>
      </section>

      <section id="stack" className="section">
        <div className="section-intro"><p className="eyebrow"><Zap size={16}/>WHAT KABA SELLS</p><h2>Websites, Content, Ads, and Systems Built to Bring Customers.</h2></div>
        <div className="cards">{stack.map(([title,text,Icon]) => <article className="card" key={title}><Icon/><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className="section split">
        <div>
          <p className="eyebrow"><Wand2 size={16}/>PROBLEM SOLVER</p>
          <h2>What Is Slowing Your Business Down?</h2>
          <p className="muted">Pick the real problem. Kaba does not sell random posts. We fix the path from attention to conversion.</p>
          <div className="problem-list">{problems.map((p,i) => <button onClick={() => setActiveProblem(i)} className={activeProblem===i?'on':''} key={p[0]}>{p[0]}<ChevronRight size={16}/></button>)}</div>
        </div>
        <div className="solution"><span>THE KABA ANSWER</span><h3>{problems[activeProblem][0]}</h3><p>{problems[activeProblem][1]}</p></div>
      </section>

      <section className="section compare">
        <h2>Most Agencies Sell Content. We Build the Machine Behind It.</h2>
        <div className="compare-grid">
          <div><h3>Normal Agencies</h3>{['Post and disappear','Focus on likes','Random designs','No tracking','One-size-fits-all','Content only'].map(x=><p key={x}>{x}</p>)}</div>
          <div><h3>Kaba Labs</h3>{['Strategy before execution','Leads, trust, and sales','Brand direction and consistency','Lead and campaign systems','Built around your model','Content + ads + website + sales flow'].map(x=><p key={x}><ShieldCheck size={16}/>{x}</p>)}</div>
        </div>
      </section>

      <section className="section">
        <div className="section-intro"><p className="eyebrow"><Users size={16}/>INDUSTRIES</p><h2>Built for Businesses Ready to Be Seen</h2></div>
        <div className="industries">{industries.map(x=><div className="industry-card" key={x}><strong>{x}</strong><span>Content → Campaign → Leads → Sales</span></div>)}</div>
      </section>

      <section id="plans" className="section plans">
        <div className="section-intro"><p className="eyebrow"><Layers3 size={16}/>PACKAGES</p><h2>Choose the Package That Fits Your Growth Stage.</h2></div>
        {['Website Launch','Monthly Growth System','Kaba Elite Domination'].map((p,i) => (
          <article className="plan" key={p}>
            <div><span>0{i+1}</span><h3>{p}</h3><p>{['For businesses that need a serious website, clear offer, lead form, WhatsApp flow, and professional online presence.','For businesses ready for monthly content, ads, website improvements, CRM, and lead follow-up structure.','For serious brands that want full strategy, video production, campaigns, landing pages, CRM, reporting, and scale direction.'][i]}</p></div>
            <a href="#contact">Apply for This Plan <ArrowUpRight size={18}/></a>
          </article>
        ))}
      </section>

      <section id="contact" className="contact-section">
        <div className="contact-inner">
          <p className="contact-kicker"><span></span>WE LISTEN FIRST</p>
          <h2>{t[lang].contactTitle}</h2>
          <p className="contact-lead">{t[lang].contactLead}</p>
          <a className="consult-btn" href="https://wa.me/251913864659" target="_blank" rel="noreferrer">{t[lang].consultBtn} <ArrowUpRight size={22}/></a>
          <div className="contact-list">
            <a href="tel:+251913864659"><i></i><span>PHONE</span><b>+251 913 864 659</b></a>
            <a href="mailto:kabadigitals@gmail.com"><i></i><span>EMAIL</span><b>kabadigitals@gmail.com</b></a>
            <a href="https://instagram.com/kaba_digital_marketing" target="_blank" rel="noreferrer"><i></i><span>INSTAGRAM</span><b>@kaba_digital_marketing</b></a>
            <div><i></i><span>LOCATION</span><b>Addis Ababa, Ethiopia</b></div>
          </div>
        </div>
      </section>

      <footer>Kaba Labs — Less Effort. More Growth.</footer>
    </main>
  );
}
