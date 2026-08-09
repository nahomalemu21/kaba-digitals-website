import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight, ArrowRight, BarChart3, Brain, CalendarCheck, Camera, CheckCircle2,
  ChevronRight, Globe2, Layers3, LineChart, Megaphone, Menu, MessageCircle, Radio,
  Rocket, ShieldCheck, Target, TrendingUp, X, Zap
} from 'lucide-react';

/* ════════════════════════════════════════════════════════════════
   DATA
   ════════════════════════════════════════════════════════════════ */

const services = [
  {
    icon: Brain, num: '01', title: 'Business Diagnosis & Strategy',
    body: 'We start by understanding the business, the customer, the offer, and the sales process. Then we identify the real bottleneck and decide what deserves your time and budget first.',
    tags: ['Business audit', 'Offer strategy', 'Positioning', 'Priority plan'],
  },
  {
    icon: Camera, num: '02', title: 'Video Production',
    body: 'We create videos, photos, and campaign visuals only when they serve a clear business objective. Every piece is built to earn attention, answer doubts, and move customers toward action.',
    tags: ['Sales content', 'Video & reels', 'Product shoots', 'Campaign creative'],
  },
  {
    icon: Megaphone, num: '03', title: 'Performance Marketing',
    body: 'We plan, launch, test, and improve paid campaigns around the right offer and creative. The goal is qualified leads, orders, and bookings — not boosted posts or empty reach.',
    tags: ['Meta Ads', 'TikTok Ads', 'Creative testing', 'Retargeting'],
  },
  {
    icon: Globe2, num: '04', title: 'Websites & Conversion Pages',
    body: 'We build the digital destination your campaigns need: a clear offer, strong proof, focused calls to action, and a simple path from interest to inquiry or purchase.',
    tags: ['Business websites', 'Landing pages', 'Lead forms', 'WhatsApp flows'],
  },
  {
    icon: Layers3, num: '05', title: 'CRM & Follow-Up',
    body: 'Marketing fails when interested customers disappear. We organize lead tracking, follow-up, sales handoff, and automation so opportunities are not lost after the first message.',
    tags: ['Lead tracking', 'Automation', 'Sales process', 'Follow-up systems'],
  },
  {
    icon: BarChart3, num: '06', title: 'Measurement & Growth Direction',
    body: 'We review what is working, what is wasting money, and what should happen next. Kaba stays accountable after launch and keeps improving the system around real business results.',
    tags: ['Reporting', 'Optimization', 'Growth roadmap', 'Next priorities'],
  },
];

const steps = [
  { icon: Radio,     num: '01', title: 'Listen',     body: 'We learn how your business makes money, where customers come from, and what has already been tried.' },
  { icon: Brain,     num: '02', title: 'Diagnose',   body: 'We find the real bottleneck across your offer, message, content, advertising, website, and sales process.' },
  { icon: Target,    num: '03', title: 'Prioritize', body: 'We decide what will create the greatest impact first — before asking you to spend on deliverables.' },
  { icon: Camera,    num: '04', title: 'Build',      body: 'Our team creates the strategy, content, campaigns, pages, and systems the plan actually requires.' },
  { icon: Rocket,    num: '05', title: 'Execute',    body: 'Kaba launches and manages the work as one accountable team instead of handing you disconnected files.' },
  { icon: LineChart, num: '06', title: 'Improve',    body: 'We track business results, learn from the market, and keep improving what matters.' },
];

const problems = [
  ['People do not know us', 'Visibility is the first battlefield. We build content and campaigns that make the market see you repeatedly.'],
  ['We do not look professional', 'Trust is leaking. We rebuild your visual presence so customers feel you are serious.'],
  ['We post but do not get sales', 'Content is not the real problem. The offer, targeting, and conversion path are broken — we fix the path.'],
  ['Our ads do not work', 'The campaign is pushing weak creative or a weak offer. We fix both before spending another birr.'],
  ['We do not have enough leads', 'You need a lead engine: clear offer, sharp targeting, landing flow, and follow-up system.'],
  ['We have no clear system', 'Growth depends on luck. We build the machine behind attention, sales, and reporting.'],
];

const industries = [
  ['Restaurants & Cafés', 'Craving-led content → visits'],
  ['Gyms & Fitness', 'Authority content → memberships'],
  ['Hotels & Guest Houses', 'Experience content → bookings'],
  ['Furniture Stores', 'Design visuals → showroom visits'],
  ['Clinics & Wellness', 'Trust content → appointments'],
  ['Beauty Salons & Spas', 'Transformations → bookings'],
  ['Real Estate', 'Property content → qualified buyers'],
  ['Fashion Brands', 'Style content → sales traffic'],
  ['E-commerce Stores', 'Product creatives → orders'],
  ['Schools & Training', 'Authority content → enrollments'],
  ['Car Dealerships', 'Showcase content → inquiries'],
  ['Interior Design', 'Portfolio content → leads'],
];

const plans = [
  ['01', 'Business Growth Diagnosis', 'A focused audit of your offer, audience, marketing, website, and sales process — followed by a clear priority plan for what should happen next.'],
  ['02', 'Monthly Growth Partnership', 'Kaba becomes your outsourced growth team: diagnosing, planning, creating, launching, and improving the work your business actually needs each month.'],
  ['03', 'Digital Build Project', 'A focused website, landing-page, CRM, automation, or campaign-infrastructure project built around a defined business objective.'],
];

const marqueeItems = [
  'Business Diagnosis', 'Growth Strategy', 'Sales-Driven Content',
  'Performance Marketing', 'Websites & CRM', 'Measurement & Improvement',
];

const WHATSAPP = 'https://wa.me/251913864659';

/* ── Translations ── */
const t = {
  en: {
    heroStatic: 'You run the business.',
    heroRotating: ['We diagnose the problem.', 'We build the right plan.', 'We execute the work.', 'We stay accountable.'],
    heroSub: 'Kaba Labs identifies what is holding your business back, decides what will make the biggest difference, and executes the right mix of strategy, content, advertising, websites, and follow-up systems.',
    heroCta: 'Book a business diagnosis',
    heroCtaSecondary: 'See how Kaba works',
    realityKicker: 'The Real Problem',
    realityTitle: 'Eight videos cannot fix the wrong problem.',
    reality: [
      ['You were sold deliverables before anyone understood the business.', 'Paying per video or post feels productive, but content without diagnosis, positioning, distribution, and follow-up rarely changes the business.'],
      ['The visible problem is not always the real bottleneck.', 'More content will not fix a weak offer, poor targeting, a confusing website, or a sales team that does not follow up.'],
      ['No one took responsibility for the complete result.', 'Freelancers delivered files. Boosters spent the budget. Kaba connects the work, measures what happens, and owns the next decision with you.'],
    ],
    servicesTitle: 'One accountable partner.',
    servicesTitleAccent: 'The right work for your business.',
    servicesSub: 'You do not need to guess which service to buy. We diagnose the bottleneck, choose the right tools, and bring the specialists needed to get the job done.',
    processTitle: 'We diagnose first.',
    processTitleAccent: 'Then we execute.',
    processSub: 'Every engagement follows one disciplined process so the work serves the business — not the other way around.',
    contactTitle: 'Where is your growth stuck?',
    contactLead: 'You do not need to choose a package of videos. Tell us what is happening in the business. We will diagnose the bottleneck and explain the right next move.',
    consultBtn: 'Book a business diagnosis',
  },
  am: {
    heroStatic: 'ቢዝነስዎን እርስዎ ያስኬዳሉ።',
    heroRotating: ['ችግሩን እንመረምራለን።', 'ትክክለኛውን እቅድ እንገነባለን።', 'ስራውን እንፈጽማለን።', 'ለውጤቱ ኃላፊ እንሆናለን።'],
    heroSub: 'KABA LABS የቢዝነስዎን እድገት የሚያግደውን ችግር ይለያል፣ ከፍተኛውን ውጤት የሚያመጣውን ቅድሚያ ይወስናል፣ ከዚያም ስትራቴጂ፣ ኮንተንት፣ ማስታወቂያ፣ ድረ-ገጽ እና የክትትል ስርዓትን እንፈጽማለን።',
    heroCta: 'የቢዝነስ ምርመራ ይያዙ',
    heroCtaSecondary: 'KABA እንዴት እንደሚሰራ',
    realityKicker: 'ዋናው ችግር',
    realityTitle: 'ስምንት ቪዲዮዎች የተሳሳተውን ችግር አይፈቱም።',
    reality: [
      ['ቢዝነስዎ ሳይገባ ምን እንዲሰራ ተሽጦልዎታል።', 'በቪዲዮ ወይም በፖስት ቁጥር መክፈል ስራ የተሰራ ያስመስላል፤ ግን ያለ ምርመራ፣ አቀማመጥ፣ ስርጭት እና ክትትል ኮንተንት ብቻውን ቢዝነስን አያሳድግም።'],
      ['የሚታየው ችግር ሁልጊዜ ዋናው ችግር አይደለም።', 'ደካማ አቅርቦትን፣ የተሳሳተ ዒላማን፣ ግራ የሚያጋባ ድረ-ገጽን ወይም ደካማ የሽያጭ ክትትልን ተጨማሪ ኮንተንት አይፈታውም።'],
      ['ለሙሉ ውጤቱ ኃላፊነት የወሰደ አልነበረም።', 'ፍሪላንሰሮች ፋይሎችን አስረከቡ፣ ቡስተሮች በጀት አወጡ። KABA ስራዎቹን ያገናኛል፣ ውጤቱን ይለካል እና ቀጣዩን ውሳኔ ከእርስዎ ጋር ይወስዳል።'],
    ],
    servicesTitle: 'አንድ ኃላፊነት የሚወስድ አጋር።',
    servicesTitleAccent: 'ለቢዝነስዎ ትክክለኛው ስራ።',
    servicesSub: 'የትኛውን አገልግሎት መግዛት እንዳለብዎ መገመት አያስፈልግዎትም። ችግሩን እንመረምራለን፣ ትክክለኛውን መሳሪያ እንመርጣለን እና ስራውን የሚፈጽም ቡድን እናመጣለን።',
    processTitle: 'መጀመሪያ እንመረምራለን።',
    processTitleAccent: 'ከዚያ እንፈጽማለን።',
    processSub: 'ስራው ቢዝነሱን እንዲያገለግል እያንዳንዱ ፕሮጀክት ግልጽ ሂደት ይከተላል።',
    contactTitle: 'የቢዝነስዎ እድገት የት ቆሟል?',
    contactLead: 'የቪዲዮ ፓኬጅ መምረጥ አያስፈልግዎትም። በቢዝነስዎ ውስጥ ምን እየሆነ እንደሆነ ይንገሩን፤ ችግሩን መርምረን ትክክለኛውን ቀጣይ እርምጃ እናቀርባለን።',
    consultBtn: 'የቢዝነስ ምርመራ ይያዙ',
  },
  fr: {
    heroStatic: 'Vous dirigez l’entreprise.',
    heroRotating: ['Nous diagnostiquons.', 'Nous bâtissons le bon plan.', 'Nous exécutons.', 'Nous restons responsables.'],
    heroSub: 'Kaba Labs identifie ce qui freine votre entreprise, choisit les priorités qui auront le plus d’impact et exécute la bonne combinaison de stratégie, contenu, publicité, sites web et systèmes de suivi.',
    heroCta: 'Réserver un diagnostic',
    heroCtaSecondary: 'Voir notre méthode',
    realityKicker: 'Le vrai problème',
    realityTitle: 'Huit vidéos ne corrigent pas le mauvais problème.',
    reality: [
      ['On vous a vendu des livrables avant de comprendre votre entreprise.', 'Payer par vidéo ou publication semble productif, mais le contenu sans diagnostic, positionnement, distribution et suivi change rarement les résultats.'],
      ['Le problème visible n’est pas toujours le vrai blocage.', 'Plus de contenu ne corrigera pas une offre faible, un mauvais ciblage, un site confus ou une équipe commerciale qui ne relance pas.'],
      ['Personne n’était responsable du résultat complet.', 'Les freelances ont livré des fichiers. Les boosters ont dépensé le budget. Kaba relie le travail, mesure les résultats et décide de la suite avec vous.'],
    ],
    servicesTitle: 'Un seul partenaire responsable.',
    servicesTitleAccent: 'Le bon travail pour votre entreprise.',
    servicesSub: 'Vous n’avez pas à deviner quel service acheter. Nous diagnostiquons le blocage, choisissons les bons outils et réunissons les spécialistes nécessaires pour faire le travail.',
    processTitle: 'Nous diagnostiquons d’abord.',
    processTitleAccent: 'Puis nous exécutons.',
    processSub: 'Chaque mission suit une méthode rigoureuse afin que le travail serve l’entreprise — et non l’inverse.',
    contactTitle: 'Où votre croissance bloque-t-elle ?',
    contactLead: 'Vous n’avez pas besoin de choisir un forfait de vidéos. Expliquez-nous ce qui se passe dans l’entreprise. Nous identifierons le blocage et recommanderons la bonne prochaine étape.',
    consultBtn: 'Réserver un diagnostic',
  },
};

/* ════════════════════════════════════════════════════════════════
   STYLES
   ════════════════════════════════════════════════════════════════ */

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Montserrat:wght@400;500;600;700;800&display=swap');

:root{
  --paper:#FCFAF6;
  --ink:#0B0A07;
  --gold:#C9A227;
  --bronze:#8C6F1C;
  --stone:rgba(11,10,7,.55);
  --faint:rgba(11,10,7,.38);
  --hair:rgba(11,10,7,.10);
  --cream:#F5F0E6;
  --serif:'Cormorant',Georgia,serif;
  --sans:'Montserrat',system-ui,sans-serif;
}

*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
html,body{max-width:100%;overflow-x:hidden}
body{background:var(--paper)}
img,svg{display:block;max-width:100%}
a{-webkit-tap-highlight-color:transparent}
button{-webkit-tap-highlight-color:transparent}

.app{min-height:100vh;background:var(--paper);color:var(--ink);
  font-family:var(--sans);overflow-x:clip;position:relative}

::selection{background:var(--gold);color:var(--ink)}
::-webkit-scrollbar{width:4px}
::-webkit-scrollbar-track{background:#f0ede6}
::-webkit-scrollbar-thumb{background:var(--gold);border-radius:2px}

:focus-visible{outline:2px solid var(--gold);outline-offset:3px}

/* ── REVEAL ── */
.reveal{opacity:0;transform:translateY(28px);
  transition:opacity .8s cubic-bezier(.2,.65,.3,1),transform .8s cubic-bezier(.2,.65,.3,1)}
.reveal.in{opacity:1;transform:none}
.reveal.d1{transition-delay:.08s}
.reveal.d2{transition-delay:.16s}
.reveal.d3{transition-delay:.24s}

/* ── PRELOADER ── */
.loader{position:fixed;inset:0;z-index:999;background:var(--ink);
  display:grid;place-items:center;
  animation:loaderExit .7s cubic-bezier(.7,0,.3,1) 2.1s forwards;pointer-events:none}
.loader-inner{text-align:center}
.loader-mark{font-family:var(--serif);font-size:clamp(56px,12vw,130px);font-weight:600;
  letter-spacing:.05em;color:var(--cream);line-height:1;overflow:hidden}
.loader-mark span{display:inline-block;animation:loaderRise .9s cubic-bezier(.2,.8,.2,1) .15s both}
.loader-mark em{color:var(--gold);font-style:italic}
.loader-rule{width:0;height:1px;background:var(--gold);margin:18px auto 14px;
  animation:loaderRule .7s cubic-bezier(.2,.8,.2,1) .7s forwards}
.loader-sub{font-size:10px;letter-spacing:.42em;font-weight:700;text-transform:uppercase;
  color:rgba(245,240,230,.45);animation:loaderFade .6s ease 1s both;padding-left:.42em}
@keyframes loaderRise{from{transform:translateY(110%)}to{transform:translateY(0)}}
@keyframes loaderRule{to{width:72px}}
@keyframes loaderFade{from{opacity:0}to{opacity:1}}
@keyframes loaderExit{to{opacity:0;visibility:hidden}}

/* ── NAV ── */
.nav{position:fixed;top:0;left:0;right:0;z-index:90;
  display:flex;align-items:center;justify-content:space-between;
  padding:16px clamp(20px,4vw,48px);
  background:rgba(252,250,246,.85);backdrop-filter:blur(18px);
  -webkit-backdrop-filter:blur(18px);
  border-bottom:1px solid var(--hair);transition:padding .3s ease}
.brand{font-family:var(--serif);font-size:21px;font-weight:700;
  letter-spacing:.1em;color:var(--ink);text-decoration:none;white-space:nowrap}
.brand em{color:var(--gold);font-style:italic}
.nav-links{display:flex;gap:30px}
.nav-links a{color:var(--faint);text-decoration:none;font-size:11px;
  font-weight:700;letter-spacing:.14em;text-transform:uppercase;transition:color .2s}
.nav-links a:hover{color:var(--ink)}
.nav-right{display:flex;align-items:center;gap:14px}
.lang{display:flex;gap:2px}
.lang button{border:1px solid transparent;background:transparent;color:var(--faint);
  padding:6px 8px;font-weight:700;font-size:10px;cursor:pointer;
  letter-spacing:.1em;transition:.2s;font-family:var(--sans);border-radius:2px}
.lang button:hover{color:var(--ink)}
.lang .on{border-color:rgba(201,162,39,.45);background:rgba(201,162,39,.08);color:var(--ink)}
.nav-book{display:inline-flex;align-items:center;gap:8px;padding:11px 18px;
  background:var(--ink);color:var(--cream);text-decoration:none;
  font-weight:700;font-size:10px;letter-spacing:.14em;text-transform:uppercase;
  transition:background .25s,color .25s}
.nav-book:hover{background:var(--gold);color:var(--ink)}
.nav-burger{display:none;border:1px solid var(--hair);background:transparent;
  color:var(--ink);width:42px;height:42px;cursor:pointer;
  align-items:center;justify-content:center;border-radius:2px}
.nav.dark{background:rgba(11,10,7,.45);border-bottom-color:rgba(245,240,230,.08)}
.nav.dark .brand{color:var(--cream)}
.nav.dark .nav-links a{color:rgba(245,240,230,.5)}
.nav.dark .nav-links a:hover{color:var(--cream)}
.nav.dark .lang button{color:rgba(245,240,230,.5)}
.nav.dark .lang button:hover{color:var(--cream)}
.nav.dark .lang .on{border-color:rgba(201,162,39,.55);background:rgba(201,162,39,.12);color:var(--gold)}
.nav.dark .nav-book{background:var(--gold);color:var(--ink)}
.nav.dark .nav-book:hover{background:#E3BC32}
.nav.dark .nav-burger{color:var(--cream);border-color:rgba(245,240,230,.25)}

/* ── MOBILE DRAWER ── */
.drawer{position:fixed;inset:0;z-index:95;background:var(--ink);color:var(--cream);
  display:flex;flex-direction:column;padding:20px clamp(20px,6vw,40px) 40px;
  transform:translateY(-100%);transition:transform .5s cubic-bezier(.7,0,.3,1);
  visibility:hidden}
.drawer.open{transform:translateY(0);visibility:visible}
.drawer-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:8vh}
.drawer-close{border:1px solid rgba(245,240,230,.2);background:transparent;color:var(--cream);
  width:42px;height:42px;cursor:pointer;display:flex;align-items:center;justify-content:center;border-radius:2px}
.drawer-links{display:flex;flex-direction:column;gap:4px}
.drawer-links a{font-family:var(--serif);font-size:clamp(34px,9vw,52px);font-weight:600;
  color:var(--cream);text-decoration:none;padding:10px 0;line-height:1.1;
  border-bottom:1px solid rgba(245,240,230,.08);display:flex;
  justify-content:space-between;align-items:center;transition:color .2s,padding-left .25s}
.drawer-links a:hover{color:var(--gold);padding-left:8px}
.drawer-links a svg{color:var(--gold);opacity:.7}
.drawer-cta{margin-top:auto;display:inline-flex;align-items:center;justify-content:center;gap:10px;
  background:var(--gold);color:var(--ink);text-decoration:none;
  padding:18px 24px;font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase}
.drawer-lang{display:flex;gap:8px;margin-top:18px;justify-content:center}
.drawer-lang button{border:1px solid rgba(245,240,230,.2);background:transparent;color:rgba(245,240,230,.6);
  padding:9px 16px;font-weight:700;font-size:11px;cursor:pointer;letter-spacing:.1em;font-family:var(--sans)}
.drawer-lang .on{border-color:var(--gold);color:var(--gold)}

/* ── LAYOUT ── */
.section{width:min(1200px,calc(100% - 40px));margin:0 auto;
  padding:clamp(72px,11vw,130px) 0;position:relative}
.eyebrow{display:flex;align-items:center;gap:12px;color:var(--gold);
  font-size:10px;letter-spacing:.3em;font-weight:800;text-transform:uppercase;margin-bottom:22px}
.eyebrow-rule{width:34px;height:1px;background:var(--gold);flex-shrink:0}
.section-title{font-family:var(--serif);font-size:clamp(36px,5.4vw,64px);
  line-height:1.04;letter-spacing:-.01em;font-weight:600;color:var(--ink);max-width:820px}
.section-title em{color:var(--gold);font-style:italic;font-weight:500}
.section-sub{margin-top:18px;font-size:15px;line-height:1.85;color:var(--stone);max-width:560px}

/* ── HERO ── */
.hero{position:relative;background:var(--ink);color:var(--cream);overflow:hidden}
.hero-glow{position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(ellipse 55% 48% at 76% 32%,rgba(201,162,39,.16),transparent 62%),
    radial-gradient(ellipse 42% 36% at 12% 88%,rgba(201,162,39,.07),transparent 60%)}
.hero-gridlines{position:absolute;inset:0;pointer-events:none;opacity:.6;
  background-image:linear-gradient(rgba(245,240,230,.045) 1px,transparent 1px),
    linear-gradient(90deg,rgba(245,240,230,.045) 1px,transparent 1px);
  background-size:76px 76px;
  -webkit-mask-image:radial-gradient(ellipse 85% 75% at 60% 40%,#000 28%,transparent 78%);
  mask-image:radial-gradient(ellipse 85% 75% at 60% 40%,#000 28%,transparent 78%)}
.hero-inner{width:min(1240px,calc(100% - 40px));margin:0 auto;position:relative;z-index:2;
  min-height:100svh;display:grid;grid-template-columns:1.02fr .98fr;
  align-items:center;gap:clamp(30px,5vw,70px);padding:128px 0 96px}
.hero-copy>*{animation:heroIn .9s cubic-bezier(.2,.65,.3,1) both}
.hero-copy>*:nth-child(1){animation-delay:2.25s}
.hero-copy>*:nth-child(2){animation-delay:2.38s}
.hero-copy>*:nth-child(3){animation-delay:2.52s}
.hero-copy>*:nth-child(4){animation-delay:2.66s}
.hero-copy>*:nth-child(5){animation-delay:2.8s}
@keyframes heroIn{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:none}}
.hero-kicker{display:flex;align-items:center;gap:14px;color:var(--gold);
  font-size:10px;letter-spacing:.32em;font-weight:800;text-transform:uppercase;margin-bottom:32px}
.hero-kicker .dot{width:7px;height:7px;border-radius:50%;background:var(--gold);
  box-shadow:0 0 0 4px rgba(201,162,39,.15);animation:pulse 2.4s ease-in-out infinite}
@keyframes pulse{0%,100%{box-shadow:0 0 0 3px rgba(201,162,39,.18)}50%{box-shadow:0 0 0 9px rgba(201,162,39,0)}}
.hero-title{font-family:var(--serif);font-weight:600;color:var(--cream);
  font-size:clamp(42px,6.6vw,92px);line-height:1.02;letter-spacing:-.015em;margin-bottom:8px}
.hero-rotator{display:block;min-height:1.15em;position:relative}
.hero-rotator span{display:inline-block;color:var(--gold);font-style:italic;font-weight:500;
  text-shadow:0 0 50px rgba(201,162,39,.3);
  transition:opacity .45s ease,transform .45s cubic-bezier(.2,.8,.2,1)}
.hero-rotator span.out{opacity:0;transform:translateY(14px)}
.hero-body{font-size:clamp(14px,1.55vw,16.5px);color:rgba(245,240,230,.55);line-height:1.85;
  max-width:540px;margin:28px 0 36px}
.hero-actions{display:flex;gap:14px;flex-wrap:wrap;align-items:center}
.btn-primary{display:inline-flex;align-items:center;gap:10px;padding:17px 26px;
  background:var(--gold);color:var(--ink);text-decoration:none;
  font-weight:800;font-size:12px;letter-spacing:.1em;text-transform:uppercase;
  box-shadow:0 10px 40px rgba(201,162,39,.25);
  transition:background .25s,transform .25s,box-shadow .25s}
.btn-primary:hover{background:#E3BC32;transform:translateY(-2px);box-shadow:0 16px 50px rgba(201,162,39,.35)}
.btn-ghost{display:inline-flex;align-items:center;gap:10px;padding:17px 26px;
  border:1px solid rgba(245,240,230,.28);color:var(--cream);text-decoration:none;
  font-weight:600;font-size:12px;letter-spacing:.1em;text-transform:uppercase;
  transition:border-color .25s,transform .25s,background .25s}
.btn-ghost:hover{border-color:var(--gold);transform:translateY(-2px);background:rgba(201,162,39,.06)}
.hero-proof{display:flex;gap:22px;flex-wrap:wrap;margin-top:42px}
.hero-proof span{display:flex;gap:9px;align-items:center;color:rgba(245,240,230,.42);
  font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
.hero-proof svg{color:var(--gold);width:14px;height:14px;flex-shrink:0}
.hero-scroll{position:absolute;bottom:24px;left:50%;transform:translateX(-50%);z-index:3;
  display:flex;align-items:center;gap:12px;
  color:rgba(245,240,230,.35);font-size:9px;letter-spacing:.3em;font-weight:800;text-transform:uppercase}
.hero-scroll i{display:block;width:1px;height:38px;background:rgba(245,240,230,.12);position:relative;overflow:hidden}
.hero-scroll i::after{content:'';position:absolute;left:0;top:-40%;width:100%;height:40%;
  background:var(--gold);animation:scrollLine 1.8s cubic-bezier(.65,0,.35,1) infinite}
@keyframes scrollLine{to{top:110%}}

/* ── HERO VISUAL (floating command center) ── */
.hero-visual{position:relative;min-height:580px;display:grid;place-items:center;
  perspective:1300px;animation:heroIn 1s cubic-bezier(.2,.65,.3,1) 2.55s both}
.hero-orbit{position:absolute;width:min(580px,108%);aspect-ratio:1;
  border:1px dashed rgba(201,162,39,.2);border-radius:50%;
  animation:spin 46s linear infinite;pointer-events:none}
.hero-orbit i{position:absolute;top:-4px;left:50%;width:8px;height:8px;border-radius:50%;
  background:var(--gold);box-shadow:0 0 16px rgba(201,162,39,.9)}
.hero-orbit.small{width:min(420px,84%);border-color:rgba(201,162,39,.1);
  animation-direction:reverse;animation-duration:32s}
@keyframes spin{to{transform:rotate(360deg)}}
.dash-card{width:min(430px,100%);background:linear-gradient(160deg,rgba(252,250,246,.05),rgba(252,250,246,.015));
  border:1px solid rgba(245,240,230,.14);backdrop-filter:blur(10px);
  -webkit-backdrop-filter:blur(10px);border-radius:8px;
  box-shadow:0 40px 90px rgba(0,0,0,.55),0 0 70px rgba(201,162,39,.07),inset 0 1px 0 rgba(245,240,230,.08);
  padding:28px;position:relative;z-index:2;overflow:hidden;
  transform-style:preserve-3d;transition:transform .18s ease-out;will-change:transform}
.dash-card::before{content:'';position:absolute;inset:0;pointer-events:none;
  background:linear-gradient(105deg,transparent 30%,rgba(201,162,39,.07) 50%,transparent 70%);
  animation:sweep 5s ease-in-out infinite}
@keyframes sweep{0%{transform:translateX(-100%)}55%,100%{transform:translateX(100%)}}
.dash-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:24px}
.dash-dots{display:flex;gap:6px}
.dash-dots span{width:8px;height:8px;border-radius:50%}
.dash-dots span:nth-child(1){background:var(--gold)}
.dash-dots span:nth-child(2){background:rgba(245,240,230,.3)}
.dash-dots span:nth-child(3){background:rgba(245,240,230,.12)}
.dash-badge{display:flex;align-items:center;gap:8px;font-size:9px;font-weight:800;
  letter-spacing:.18em;text-transform:uppercase;color:var(--gold);
  border:1px solid rgba(201,162,39,.4);padding:6px 11px;border-radius:2px}
.dash-badge i{width:6px;height:6px;border-radius:50%;background:var(--gold);
  animation:pulse 1.8s ease-in-out infinite}
.dash-label{font-size:10px;font-weight:800;letter-spacing:.24em;text-transform:uppercase;
  color:rgba(245,240,230,.4);margin-bottom:6px}
.dash-metric{font-family:var(--serif);font-size:clamp(64px,6vw,86px);color:var(--gold);
  font-weight:700;line-height:1;letter-spacing:-.02em;
  text-shadow:0 0 40px rgba(201,162,39,.35);font-variant-numeric:tabular-nums}
.dash-sub{font-size:10px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;
  color:rgba(245,240,230,.32);margin:8px 0 26px}
.dash-bars{display:flex;gap:7px;align-items:flex-end;height:104px;
  border-bottom:1px solid rgba(245,240,230,.1);margin-bottom:18px}
.dash-bars i{flex:1;border-radius:2px 2px 0 0;background:rgba(245,240,230,.14);
  transform-origin:bottom;animation:grow 2.8s ease-in-out infinite alternate}
.dash-bars i:nth-child(1){height:26%}.dash-bars i:nth-child(2){height:44%;animation-delay:.2s}
.dash-bars i:nth-child(3){height:36%;animation-delay:.4s}.dash-bars i:nth-child(4){height:58%;animation-delay:.6s}
.dash-bars i:nth-child(5){height:50%;animation-delay:.8s}.dash-bars i:nth-child(6){height:78%;animation-delay:1s}
.dash-bars i:last-child{height:100%;background:var(--gold);animation-delay:1.2s;
  box-shadow:0 0 24px rgba(201,162,39,.45)}
@keyframes grow{from{transform:scaleY(.78)}to{transform:scaleY(1)}}
.dash-row{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.dash-row div{border:1px solid rgba(245,240,230,.1);padding:12px 8px;text-align:center;
  border-radius:4px;background:rgba(11,10,7,.3)}
.dash-row strong{display:block;font-family:var(--serif);font-size:22px;
  color:var(--cream);font-weight:600;line-height:1.1}
.dash-row span{font-size:8.5px;font-weight:800;letter-spacing:.14em;
  text-transform:uppercase;color:rgba(245,240,230,.35)}
.chip{position:absolute;z-index:3;display:flex;gap:11px;align-items:center;
  background:rgba(11,10,7,.88);border:1px solid rgba(201,162,39,.4);
  backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);
  padding:12px 16px;border-radius:6px;
  box-shadow:0 18px 50px rgba(0,0,0,.5),0 0 26px rgba(201,162,39,.08);
  animation:chipFloat 6s ease-in-out infinite}
.chip-icon{width:30px;height:30px;border-radius:50%;background:rgba(201,162,39,.16);
  display:grid;place-items:center;color:var(--gold);flex-shrink:0}
.chip-icon svg{width:14px;height:14px}
.chip strong{display:block;font-size:12px;color:var(--cream);font-weight:700;letter-spacing:.01em}
.chip span{display:block;font-size:9.5px;color:rgba(245,240,230,.45);
  font-weight:600;letter-spacing:.05em;margin-top:2px}
.chip-1{top:5%;left:-3%;animation-delay:0s}
.chip-2{top:30%;right:-6%;animation-delay:1.6s}
.chip-3{bottom:30%;left:-8%;animation-delay:3.1s}
.chip-4{bottom:-3%;right:3%;animation-delay:2.2s}
@keyframes chipFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}

/* ── MARQUEE ── */
.marquee{border-top:1px solid var(--hair);border-bottom:1px solid var(--hair);
  padding:22px 0;overflow:hidden;position:relative;background:var(--paper)}
.marquee-track{display:flex;gap:0;width:max-content;animation:marquee 36s linear infinite}
.marquee:hover .marquee-track{animation-play-state:paused}
.marquee-item{display:flex;align-items:center;gap:28px;padding:0 14px;white-space:nowrap;
  font-family:var(--serif);font-size:clamp(20px,2.6vw,30px);font-weight:500;
  font-style:italic;color:var(--ink)}
.marquee-item svg{color:var(--gold);width:13px;height:13px;flex-shrink:0}
@keyframes marquee{to{transform:translateX(-50%)}}

/* ── REALITY ── */
.reality-list{margin-top:46px;border-top:1px solid var(--hair)}
.reality-row{display:grid;grid-template-columns:90px 1.1fr 1fr;gap:clamp(18px,4vw,56px);
  align-items:start;padding:38px 0;border-bottom:1px solid var(--hair)}
.reality-num{font-family:var(--serif);font-size:clamp(28px,3vw,40px);font-style:italic;
  font-weight:500;color:rgba(201,162,39,.55);line-height:1}
.reality-row h3{font-family:var(--serif);font-size:clamp(23px,2.8vw,33px);font-weight:600;
  line-height:1.18;letter-spacing:-.01em;color:var(--ink)}
.reality-row p{color:var(--stone);font-size:14px;line-height:1.85;padding-top:6px}

/* ── SERVICES (sticky stack) ── */
.stack-wrap{margin-top:54px;display:flex;flex-direction:column;gap:22px}
.stack-card{position:sticky;background:#fff;border:1px solid var(--hair);
  box-shadow:0 1px 2px rgba(11,10,7,.03),0 -18px 40px -22px rgba(11,10,7,.12);
  padding:clamp(28px,4.5vw,52px);display:grid;
  grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr);gap:clamp(22px,4vw,60px);
  align-items:center;border-radius:3px}
.stack-num{font-family:var(--serif);font-style:italic;font-weight:500;
  font-size:13px;letter-spacing:.2em;color:var(--bronze);margin-bottom:16px;display:flex;align-items:center;gap:12px}
.stack-num::after{content:'';height:1px;width:38px;background:rgba(201,162,39,.4)}
.stack-card h3{font-family:var(--serif);font-size:clamp(30px,4vw,48px);font-weight:600;
  letter-spacing:-.01em;line-height:1.05;color:var(--ink);margin-bottom:16px}
.stack-card p{color:var(--stone);font-size:14.5px;line-height:1.85;max-width:520px}
.stack-side{display:flex;flex-direction:column;gap:18px;align-items:flex-start;
  border-left:1px solid var(--hair);padding-left:clamp(20px,3vw,44px);align-self:stretch;justify-content:center}
.stack-icon{width:52px;height:52px;border:1px solid rgba(201,162,39,.4);border-radius:50%;
  display:grid;place-items:center;color:var(--gold)}
.stack-icon svg{width:22px;height:22px}
.stack-tags{display:flex;flex-wrap:wrap;gap:8px}
.stack-tags span{border:1px solid var(--hair);padding:8px 13px;font-size:10.5px;
  font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--stone);
  background:var(--paper)}
.stack-link{display:inline-flex;align-items:center;gap:8px;color:var(--ink);
  font-size:11px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;
  text-decoration:none;border-bottom:1px solid var(--gold);padding-bottom:5px;transition:gap .25s,color .25s}
.stack-link:hover{gap:14px;color:var(--bronze)}

/* ── PROCESS ── */
.process{background:var(--ink);color:var(--cream);position:relative;overflow:hidden}
.process::before{content:'';position:absolute;inset:0;opacity:.5;
  background-image:linear-gradient(rgba(245,240,230,.035) 1px,transparent 1px),
    linear-gradient(90deg,rgba(245,240,230,.035) 1px,transparent 1px);
  background-size:72px 72px;pointer-events:none}
.process-inner{width:min(1200px,calc(100% - 40px));margin:0 auto;
  padding:clamp(80px,11vw,140px) 0;position:relative;z-index:1}
.process .section-title{color:var(--cream)}
.process .section-sub{color:rgba(245,240,230,.5)}
.process-grid{display:grid;grid-template-columns:repeat(3,1fr);margin-top:56px;
  border:1px solid rgba(245,240,230,.12)}
.step{padding:clamp(26px,3vw,38px);border-right:1px solid rgba(245,240,230,.12);
  border-bottom:1px solid rgba(245,240,230,.12);position:relative;
  transition:background .3s}
.step:nth-child(3n){border-right:0}
.step:nth-child(n+4){border-bottom:0}
.step:hover{background:rgba(201,162,39,.05)}
.step-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:26px}
.step-top svg{color:var(--gold);width:20px;height:20px}
.step-num{font-family:var(--serif);font-style:italic;font-size:15px;color:rgba(201,162,39,.7)}
.step h3{font-family:var(--serif);font-size:clamp(24px,2.6vw,32px);font-weight:600;
  letter-spacing:-.01em;margin-bottom:12px;color:var(--cream)}
.step p{color:rgba(245,240,230,.48);font-size:13px;line-height:1.8}
.process-tail{margin-top:54px;display:flex;justify-content:space-between;
  align-items:flex-end;gap:26px;flex-wrap:wrap}
.process-quote{font-family:var(--serif);font-size:clamp(26px,3.6vw,46px);font-weight:500;
  line-height:1.1;letter-spacing:-.01em;color:var(--cream);max-width:620px}
.process-quote em{color:var(--gold);font-style:italic}

/* ── PROBLEM SOLVER ── */
.split{display:grid;grid-template-columns:1fr .94fr;gap:clamp(28px,5vw,64px);align-items:start}
.problem-list{display:grid;gap:8px;margin-top:30px}
.problem-btn{display:flex;justify-content:space-between;align-items:center;gap:12px;
  text-align:left;border:1px solid var(--hair);background:#fff;
  color:var(--ink);padding:17px 19px;font-weight:600;
  cursor:pointer;font-size:13px;font-family:var(--sans);
  letter-spacing:.02em;transition:border-color .2s,background .2s,color .2s}
.problem-btn:hover{border-color:rgba(11,10,7,.3)}
.problem-btn.on{background:var(--ink);border-color:var(--ink);color:var(--cream)}
.problem-btn.on svg{color:var(--gold)}
.problem-btn svg{color:rgba(11,10,7,.25);flex-shrink:0;transition:color .2s}
.solution-panel{border:1px solid var(--hair);padding:clamp(26px,3.4vw,42px);
  background:#fff;position:sticky;top:104px;border-radius:3px;
  box-shadow:0 1px 2px rgba(11,10,7,.03)}
.solution-label{color:var(--gold);font-weight:800;letter-spacing:.24em;font-size:10px;
  text-transform:uppercase;margin-bottom:18px;display:flex;align-items:center;gap:12px}
.solution-label::before{content:'';width:26px;height:1px;background:var(--gold)}
.solution-panel h3{font-family:var(--serif);font-size:clamp(26px,3vw,38px);font-weight:600;
  letter-spacing:-.01em;margin-bottom:14px;line-height:1.08;color:var(--ink)}
.solution-panel p{color:var(--stone);line-height:1.85;font-size:14px;margin-bottom:26px}
.solution-cta{display:inline-flex;align-items:center;gap:9px;color:var(--ink);
  font-size:11px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;
  text-decoration:none;border-bottom:1px solid var(--gold);padding-bottom:5px;transition:gap .25s}
.solution-cta:hover{gap:15px}

/* ── COMPARE ── */
.compare-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:46px}
.compare-col{border:1px solid var(--hair);background:#fff}
.compare-head{padding:20px 26px;border-bottom:1px solid var(--hair)}
.compare-head h3{font-size:11px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:var(--faint)}
.compare-col.kaba{border-color:rgba(11,10,7,.25)}
.compare-col.kaba .compare-head{background:var(--ink);border-bottom-color:var(--ink)}
.compare-col.kaba .compare-head h3{color:var(--gold)}
.compare-item{padding:15px 26px;border-bottom:1px solid rgba(11,10,7,.06);
  display:flex;align-items:center;gap:11px;font-size:13px;font-weight:500}
.compare-item:last-child{border-bottom:0}
.compare-col:not(.kaba) .compare-item{color:var(--faint);text-decoration:line-through;
  text-decoration-color:rgba(11,10,7,.18);text-decoration-thickness:1px}
.compare-col.kaba .compare-item{color:var(--ink);font-weight:600}
.compare-col.kaba .compare-item svg{color:var(--gold);flex-shrink:0;width:14px;height:14px}

/* ── INDUSTRIES ── */
.industries-section{padding:clamp(72px,11vw,130px) 0;overflow:hidden}
.industries-head{width:min(1200px,calc(100% - 40px));margin:0 auto 48px}
.ind-marquee{overflow:hidden;padding:8px 0}
.ind-track{display:flex;gap:14px;width:max-content;animation:marquee 44s linear infinite;padding:4px 0}
.ind-track.rev{animation:marqueeRev 50s linear infinite}
.ind-marquee:hover .ind-track{animation-play-state:paused}
@keyframes marqueeRev{from{transform:translateX(-50%)}to{transform:translateX(0)}}
.ind-chip{border:1px solid var(--hair);background:#fff;padding:16px 22px;
  white-space:nowrap;display:flex;flex-direction:column;gap:5px;border-radius:3px;
  transition:border-color .25s,transform .25s}
.ind-chip:hover{border-color:rgba(201,162,39,.6);transform:translateY(-2px)}
.ind-chip strong{font-size:13px;font-weight:700;letter-spacing:.02em;color:var(--ink)}
.ind-chip span{font-size:11px;color:var(--faint);font-weight:500;letter-spacing:.02em}

/* ── PLANS ── */
.plans{display:grid;gap:0;border:1px solid var(--hair);margin-top:48px;background:#fff}
.plan{display:flex;justify-content:space-between;gap:26px;align-items:center;
  padding:clamp(26px,3.6vw,44px);border-bottom:1px solid var(--hair);
  transition:background .25s;position:relative}
.plan:last-child{border-bottom:0}
.plan:hover{background:#FBF8F1}
.plan-num{font-family:var(--serif);font-size:17px;color:rgba(201,162,39,.6);
  font-weight:500;margin-bottom:10px;display:block;font-style:italic}
.plan h3{font-family:var(--serif);font-size:clamp(26px,3.4vw,40px);font-weight:600;
  letter-spacing:-.01em;margin-bottom:10px;line-height:1.05;color:var(--ink)}
.plan p{color:var(--stone);line-height:1.8;font-size:13.5px;max-width:580px}
.plan-cta{white-space:nowrap;display:inline-flex;align-items:center;gap:8px;
  color:var(--ink);font-weight:700;text-decoration:none;
  border:1px solid rgba(11,10,7,.18);padding:15px 21px;
  font-size:11px;letter-spacing:.12em;text-transform:uppercase;
  transition:background .25s,color .25s,border-color .25s;flex-shrink:0}
.plan-cta:hover{background:var(--ink);color:var(--gold);border-color:var(--ink)}

/* ── CONTACT ── */
.contact-section{background:var(--ink);color:var(--cream);position:relative;
  overflow:hidden;padding:clamp(84px,12vw,150px) 0 clamp(60px,8vw,90px)}
.contact-section::before{content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 60% 50% at 70% 10%,rgba(201,162,39,.09),transparent 65%);
  pointer-events:none}
.contact-inner{position:relative;z-index:1;width:min(1200px,calc(100% - 40px));margin:0 auto}
.contact-kicker{display:flex;align-items:center;gap:18px;color:rgba(201,162,39,.8);
  font-size:10px;letter-spacing:.38em;font-weight:800;text-transform:uppercase;margin-bottom:30px}
.contact-kicker i{width:54px;height:1px;background:rgba(201,162,39,.45)}
.contact-title{font-family:var(--serif);font-size:clamp(46px,9.4vw,128px);
  line-height:.96;letter-spacing:-.02em;margin-bottom:26px;font-weight:600;color:var(--cream)}
.contact-title em{color:var(--gold);font-style:italic;font-weight:500}
.contact-lead{font-size:clamp(14px,1.8vw,18px);line-height:1.8;color:rgba(245,240,230,.5);
  max-width:680px;margin-bottom:38px}
.consult-btn{display:inline-flex;align-items:center;gap:12px;
  background:var(--gold);color:var(--ink);text-decoration:none;
  padding:19px 30px;font-size:12px;font-weight:800;
  margin-bottom:clamp(48px,7vw,76px);letter-spacing:.12em;text-transform:uppercase;
  transition:background .25s,transform .25s}
.consult-btn:hover{background:#E3BC32;transform:translateY(-2px)}
.contact-list{max-width:940px;border-top:1px solid rgba(245,240,230,.1)}
.contact-row{display:grid;grid-template-columns:150px 1fr auto;gap:20px;
  align-items:center;min-height:80px;border-bottom:1px solid rgba(245,240,230,.08);
  color:var(--cream);text-decoration:none;transition:padding-left .25s;padding:14px 0}
a.contact-row:hover{padding-left:12px}
a.contact-row:hover .contact-val{color:var(--gold)}
.contact-label{font-size:10px;font-weight:800;letter-spacing:.22em;
  text-transform:uppercase;color:rgba(245,240,230,.35)}
.contact-val{font-family:var(--serif);font-size:clamp(20px,3vw,32px);font-weight:500;
  letter-spacing:0;transition:color .25s;word-break:break-word}
.contact-row svg{color:rgba(201,162,39,.6);width:18px;height:18px}
.footer{display:flex;justify-content:space-between;align-items:center;gap:16px;
  flex-wrap:wrap;margin-top:clamp(48px,7vw,80px);padding-top:26px;
  border-top:1px solid rgba(245,240,230,.08)}
.footer .brand{color:var(--cream);font-size:18px}
.footer p{font-size:11px;letter-spacing:.14em;font-weight:600;
  text-transform:uppercase;color:rgba(245,240,230,.32)}

/* ── REDUCED MOTION ── */
@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;
    transition-duration:.01ms!important;scroll-behavior:auto!important}
  .reveal{opacity:1;transform:none}
  .marquee-track,.ind-track{animation:none;flex-wrap:wrap;width:auto}
}

/* ── TABLET ── */
@media(max-width:1024px){
  .nav-links{display:none}
  .process-grid{grid-template-columns:1fr 1fr}
  .step:nth-child(3n){border-right:1px solid rgba(245,240,230,.12)}
  .step:nth-child(2n){border-right:0}
  .step:nth-child(n+4){border-bottom:1px solid rgba(245,240,230,.12)}
  .step:nth-child(n+5){border-bottom:0}
}

/* ── MOBILE ── */
@media(max-width:820px){
  .nav{padding:14px 20px}
  .nav-right .lang,.nav-right .nav-book{display:none}
  .nav-burger{display:flex}
  .hero-inner{grid-template-columns:1fr;min-height:auto;padding:106px 0 86px;gap:30px}
  .hero-kicker{margin-bottom:22px}
  .hero-body{margin:22px 0 28px}
  .hero-actions{flex-direction:column;align-items:stretch}
  .btn-primary,.btn-ghost{justify-content:center;width:100%}
  .hero-proof{gap:14px;margin-top:30px}
  .hero-scroll{display:none}
  .hero-visual{min-height:0;padding:44px 0 30px;animation-delay:2.7s}
  .hero-orbit{display:none}
  .dash-card{width:min(380px,100%);padding:22px}
  .dash-metric{font-size:58px}
  .dash-bars{height:84px}
  .dash-row strong{font-size:18px}
  .chip{padding:9px 12px;animation-duration:5s}
  .chip-icon{width:24px;height:24px}
  .chip-icon svg{width:12px;height:12px}
  .chip strong{font-size:10.5px}
  .chip span{font-size:8.5px;margin-top:1px}
  .chip-1{top:1%;left:0}
  .chip-2{top:22%;right:0}
  .chip-3{bottom:34%;left:0}
  .chip-4{bottom:-1%;right:0}
  .reality-row{grid-template-columns:1fr;gap:10px;padding:30px 0}
  .reality-num{font-size:22px}
  .reality-row p{padding-top:0}
  .stack-card{grid-template-columns:1fr;gap:24px;position:static}
  .stack-side{border-left:0;border-top:1px solid var(--hair);padding-left:0;padding-top:22px}
  .split{grid-template-columns:1fr}
  .solution-panel{position:static}
  .compare-grid{grid-template-columns:1fr}
  .process-grid{grid-template-columns:1fr}
  .step{border-right:0!important;border-bottom:1px solid rgba(245,240,230,.12)!important}
  .step:last-child{border-bottom:0!important}
  .plan{flex-direction:column;align-items:flex-start;gap:18px}
  .plan-cta{width:100%;justify-content:center}
  .contact-row{grid-template-columns:1fr auto;row-gap:2px}
  .contact-label{grid-column:1/-1}
}

@media(max-width:480px){
  .section{width:calc(100% - 32px)}
  .hero-inner,.process-inner,.contact-inner,.industries-head{width:calc(100% - 32px)}
  .hero-title{font-size:clamp(36px,10.5vw,48px)}
  .contact-val{font-size:clamp(17px,5vw,22px)}
}
`;

/* ════════════════════════════════════════════════════════════════
   HOOKS & PARTS
   ════════════════════════════════════════════════════════════════ */

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function CountUp({ end, duration = 1900, prefix = '', delay = 2400 }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now() + delay;
    const tick = (now) => {
      const p = Math.min(1, Math.max(0, (now - start) / duration));
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(end * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, duration, delay]);
  return <>{prefix}{val}</>;
}

function RotatingWord({ words }) {
  const [index, setIndex] = useState(0);
  const [out, setOut] = useState(false);
  useEffect(() => {
    setIndex(0);
    const cycle = setInterval(() => {
      setOut(true);
      setTimeout(() => {
        setIndex((i) => (i + 1) % words.length);
        setOut(false);
      }, 460);
    }, 3400);
    return () => clearInterval(cycle);
  }, [words]);
  return (
    <span className="hero-rotator" aria-live="polite">
      <span className={out ? 'out' : ''}>{words[index]}</span>
    </span>
  );
}

const MarqueeRow = () => (
  <>
    {marqueeItems.map((item) => (
      <div className="marquee-item" key={item}><Zap aria-hidden="true" />{item}</div>
    ))}
  </>
);

/* ════════════════════════════════════════════════════════════════
   APP
   ════════════════════════════════════════════════════════════════ */

export default function App() {
  const [lang, setLang] = useState('en');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProblem, setActiveProblem] = useState(0);
  const [pastHero, setPastHero] = useState(false);
  const cardRef = useRef(null);
  const tx = t[lang];

  useReveal();

  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector('.hero');
      const h = hero ? hero.offsetHeight : window.innerHeight;
      setPastHero(window.scrollY > h - 90);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onTilt = (e) => {
    const el = cardRef.current;
    if (!el || window.matchMedia('(pointer:coarse)').matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateY(${(x * 10).toFixed(2)}deg) rotateX(${(-y * 10).toFixed(2)}deg)`;
  };
  const onTiltEnd = () => {
    if (cardRef.current) cardRef.current.style.transform = 'rotateY(0deg) rotateX(0deg)';
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navTo = () => setMenuOpen(false);

  return (
    <main className="app">
      <style>{styles}</style>

      {/* PRELOADER */}
      <div className="loader" aria-hidden="true">
        <div className="loader-inner">
          <div className="loader-mark"><span>KABA <em>LABS</em></span></div>
          <div className="loader-rule" />
          <div className="loader-sub">Less Effort · More Growth</div>
        </div>
      </div>

      {/* NAV */}
      <nav className={`nav ${pastHero ? '' : 'dark'}`}>
        <a href="#top" className="brand">KABA <em>LABS</em></a>
        <div className="nav-links">
          <a href="#services">Services</a>
          <a href="#process">Process</a>
          <a href="#problems">Diagnosis</a>
          <a href="#packages">Work With Us</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="nav-right">
          <div className="lang">
            {['en', 'am', 'fr'].map((l) => (
              <button key={l} className={lang === l ? 'on' : ''} onClick={() => setLang(l)}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <a className="nav-book" href={WHATSAPP} target="_blank" rel="noreferrer">
            Book Call <ArrowUpRight size={12} />
          </a>
          <button className="nav-burger" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <div className={`drawer ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <div className="drawer-top">
          <span className="brand" style={{ color: '#F5F0E6' }}>KABA <em>LABS</em></span>
          <button className="drawer-close" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
            <X size={20} />
          </button>
        </div>
        <div className="drawer-links">
          {[['Services', '#services'], ['Process', '#process'], ['Diagnosis', '#problems'], ['Work With Us', '#packages'], ['Contact', '#contact']].map(([label, href]) => (
            <a key={href} href={href} onClick={navTo}>{label}<ArrowUpRight size={26} /></a>
          ))}
        </div>
        <a className="drawer-cta" href={WHATSAPP} target="_blank" rel="noreferrer" onClick={navTo}>
          {tx.heroCta} <ArrowUpRight size={16} />
        </a>
        <div className="drawer-lang">
          {['en', 'am', 'fr'].map((l) => (
            <button key={l} className={lang === l ? 'on' : ''} onClick={() => setLang(l)}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* HERO */}
      <header className="hero" id="top">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-gridlines" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="hero-kicker"><span className="dot" />Your Outsourced Growth Team — Addis Ababa</p>
            <h1 className="hero-title">
              {tx.heroStatic}
              <RotatingWord words={tx.heroRotating} />
            </h1>
            <p className="hero-body">{tx.heroSub}</p>
            <div className="hero-actions">
              <a className="btn-primary" href={WHATSAPP} target="_blank" rel="noreferrer">
                {tx.heroCta} <ArrowUpRight size={15} />
              </a>
              <a className="btn-ghost" href="#process">
                {tx.heroCtaSecondary} <ArrowRight size={15} />
              </a>
            </div>
            <div className="hero-proof">
              <span><ShieldCheck />Diagnosis before deliverables</span>
              <span><Zap />One accountable team</span>
              <span><Target />Measured by business results</span>
            </div>
          </div>
          <div className="hero-visual" onMouseMove={onTilt} onMouseLeave={onTiltEnd}>
            <div className="hero-orbit" aria-hidden="true"><i /></div>
            <div className="hero-orbit small" aria-hidden="true" />
            <div className="dash-card" ref={cardRef}>
              <div className="dash-top">
                <div className="dash-dots"><span /><span /><span /></div>
                <span className="dash-badge"><i />Kaba Growth Partnership</span>
              </div>
              <p className="dash-label">One team owns the work</p>
              <div className="dash-metric">One Team</div>
              <p className="dash-sub">Diagnose → Prioritize → Execute</p>
              <div className="dash-bars" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></div>
              <div className="dash-row">
                <div><strong>01</strong><span>Diagnose</span></div>
                <div><strong>02</strong><span>Build</span></div>
                <div><strong>03</strong><span>Improve</span></div>
              </div>
            </div>
            <div className="chip chip-1">
              <span className="chip-icon"><MessageCircle /></span>
              <div><strong>Bottleneck identified</strong><span>Diagnosis complete</span></div>
            </div>
            <div className="chip chip-2">
              <span className="chip-icon"><TrendingUp /></span>
              <div><strong>Priority decided</strong><span>Budget has a purpose</span></div>
            </div>
            <div className="chip chip-3">
              <span className="chip-icon"><CheckCircle2 /></span>
              <div><strong>Execution moving</strong><span>One accountable team</span></div>
            </div>
            <div className="chip chip-4">
              <span className="chip-icon"><CalendarCheck /></span>
              <div><strong>Results reviewed</strong><span>Next move is clear</span></div>
            </div>
          </div>
        </div>
        <div className="hero-scroll">Scroll<i /></div>
      </header>

      {/* MARQUEE */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track"><MarqueeRow /><MarqueeRow /></div>
      </div>

      {/* REALITY */}
      <section className="section">
        <p className="eyebrow reveal"><span className="eyebrow-rule" />{tx.realityKicker}</p>
        <h2 className="section-title reveal d1">{tx.realityTitle}</h2>
        <div className="reality-list">
          {tx.reality.map(([h, p], i) => (
            <div className="reality-row reveal" key={h}>
              <span className="reality-num">0{i + 1}</span>
              <h3>{h}</h3>
              <p>{p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES — sticky stack */}
      <section id="services" className="section">
        <p className="eyebrow reveal"><span className="eyebrow-rule" />Your Growth Team</p>
        <h2 className="section-title reveal d1">{tx.servicesTitle} <em>{tx.servicesTitleAccent}</em></h2>
        <p className="section-sub reveal d2">{tx.servicesSub}</p>
        <div className="stack-wrap">
          {services.map(({ icon: Icon, num, title, body, tags }, i) => (
            <article className="stack-card" key={title} style={{ top: `${96 + i * 14}px` }}>
              <div>
                <p className="stack-num">{num} / 06</p>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
              <div className="stack-side">
                <div className="stack-icon"><Icon aria-hidden="true" /></div>
                <div className="stack-tags">
                  {tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <a className="stack-link" href={WHATSAPP} target="_blank" rel="noreferrer">
                  Start here <ArrowUpRight size={13} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="process">
        <div className="process-inner">
          <p className="eyebrow reveal"><span className="eyebrow-rule" />The Kaba Method</p>
          <h2 className="section-title reveal d1">{tx.processTitle} <em>{tx.processTitleAccent}</em></h2>
          <p className="section-sub reveal d2">{tx.processSub}</p>
          <div className="process-grid reveal">
            {steps.map(({ icon: Icon, num, title, body }) => (
              <div className="step" key={title}>
                <div className="step-top"><Icon aria-hidden="true" /><span className="step-num">{num}</span></div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
          <div className="process-tail reveal">
            <p className="process-quote">The right work, in the right order. <em>One accountable team.</em></p>
            <a className="consult-btn" style={{ margin: 0 }} href={WHATSAPP} target="_blank" rel="noreferrer">
              {tx.heroCta} <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* PROBLEM SOLVER */}
      <section id="problems" className="section split">
        <div>
          <p className="eyebrow reveal"><span className="eyebrow-rule" />Start With the Problem</p>
          <h2 className="section-title reveal d1">You do not need to know which service to buy.</h2>
          <p className="section-sub reveal d2">Tell us what is not working. Kaba diagnoses the real cause and recommends the work that deserves your budget.</p>
          <div className="problem-list reveal d2">
            {problems.map((p, i) => (
              <button
                onClick={() => setActiveProblem(i)}
                className={`problem-btn ${activeProblem === i ? 'on' : ''}`}
                key={p[0]}
              >
                {p[0]}<ChevronRight size={15} />
              </button>
            ))}
          </div>
        </div>
        <div className="solution-panel reveal d2">
          <span className="solution-label">Our Diagnosis</span>
          <h3>{problems[activeProblem][0]}</h3>
          <p>{problems[activeProblem][1]}</p>
          <a className="solution-cta" href={WHATSAPP} target="_blank" rel="noreferrer">
            Diagnose this with Kaba <ArrowUpRight size={13} />
          </a>
        </div>
      </section>

      {/* COMPARE */}
      <section className="section">
        <p className="eyebrow reveal"><span className="eyebrow-rule" />Why Kaba</p>
        <h2 className="section-title reveal d1">Some agencies sell deliverables. <em>Kaba takes responsibility for the growth work.</em></h2>
        <div className="compare-grid reveal d2">
          <div className="compare-col">
            <div className="compare-head"><h3>Deliverable Sellers</h3></div>
            {['Ask how many videos you want', 'Charge per post or file', 'Use the same package for everyone', 'Deliver and disappear', 'Separate content from sales', 'Leave you to connect the pieces'].map((x) => (
              <div key={x} className="compare-item">{x}</div>
            ))}
          </div>
          <div className="compare-col kaba">
            <div className="compare-head"><h3>Kaba Labs</h3></div>
            {['Diagnose before proposing', 'Prioritize the highest-impact work', 'Build around your business model', 'Connect strategy, content, ads, and sales', 'Measure what happens after launch', 'Stay accountable for the next decision'].map((x) => (
              <div key={x} className="compare-item"><ShieldCheck aria-hidden="true" />{x}</div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="industries-section">
        <div className="industries-head">
          <p className="eyebrow reveal"><span className="eyebrow-rule" />Industries</p>
          <h2 className="section-title reveal d1">Built for businesses <em>ready to grow with intention.</em></h2>
        </div>
        <div className="ind-marquee" aria-hidden="true">
          <div className="ind-track">
            {[...industries.slice(0, 6), ...industries.slice(0, 6)].map(([name, desc], i) => (
              <div className="ind-chip" key={`${name}-${i}`}><strong>{name}</strong><span>{desc}</span></div>
            ))}
          </div>
        </div>
        <div className="ind-marquee" aria-hidden="true">
          <div className="ind-track rev">
            {[...industries.slice(6), ...industries.slice(6)].map(([name, desc], i) => (
              <div className="ind-chip" key={`${name}-${i}`}><strong>{name}</strong><span>{desc}</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section id="packages" className="section" style={{ paddingTop: 0 }}>
        <p className="eyebrow reveal"><span className="eyebrow-rule" />Ways to Work With Kaba</p>
        <h2 className="section-title reveal d1">Start with the level of support <em>your business needs.</em></h2>
        <div className="plans reveal d2">
          {plans.map(([num, title, desc]) => (
            <article className="plan" key={title}>
              <div>
                <span className="plan-num">{num}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
              <a href="#contact" className="plan-cta">Discuss this engagement <ArrowUpRight size={14} /></a>
            </article>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact-section">
        <div className="contact-inner">
          <p className="contact-kicker"><i />Diagnosis Before Deliverables</p>
          <h2 className="contact-title reveal">{tx.contactTitle.replace('?', '').replace(' ?', '')}<em>?</em></h2>
          <p className="contact-lead reveal d1">{tx.contactLead}</p>
          <a className="consult-btn reveal d2" href={WHATSAPP} target="_blank" rel="noreferrer">
            {tx.consultBtn} <ArrowUpRight size={16} />
          </a>
          <div className="contact-list reveal">
            <a href="tel:+251913864659" className="contact-row">
              <span className="contact-label">Phone</span>
              <span className="contact-val">+251 913 864 659</span>
              <ArrowUpRight aria-hidden="true" />
            </a>
            <a href="mailto:kabadigitals@gmail.com" className="contact-row">
              <span className="contact-label">Email</span>
              <span className="contact-val">kabadigitals@gmail.com</span>
              <ArrowUpRight aria-hidden="true" />
            </a>
            <a href="https://instagram.com/kabalabs" target="_blank" rel="noreferrer" className="contact-row">
              <span className="contact-label">Instagram</span>
              <span className="contact-val">@kabalabs</span>
              <ArrowUpRight aria-hidden="true" />
            </a>
            <div className="contact-row">
              <span className="contact-label">Location</span>
              <span className="contact-val">Addis Ababa, Ethiopia</span>
            </div>
          </div>
          <footer className="footer">
            <span className="brand">KABA <em>LABS</em></span>
            <p>Diagnose · Prioritize · Execute</p>
          </footer>
        </div>
      </section>
    </main>
  );
}
