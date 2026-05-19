import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, BarChart3, Brain, Camera, Check, ChevronRight, Globe2, Layers3, LineChart, Megaphone, MousePointer2, Play, Radio, Rocket, ShieldCheck, Sparkles, Target, Users, Wand2, Zap } from 'lucide-react';

const copy = {
  en: {
    nav: ['System', 'Stack', 'Proof', 'Plans'],
    heroEyebrow: 'KABA LABS / GROWTH COMMAND CENTER',
    heroTitle: 'Less Effort. More Growth.',
    heroSub: 'We build the strategy, content, ads, websites, and sales systems that turn businesses into brands people notice, trust, and buy from.',
    primary: 'Start Your Growth System',
    secondary: 'See How It Works',
    proof: ['60+ Clients Worked With', '2+ Years in the Market', 'Content • Ads • Branding • Growth Systems'],
    systemTitle: 'Your Brand Does Not Need Random Content. It Needs a Growth System.',
    systemSub: 'Scroll and watch how Kaba turns an invisible business into a brand with attention, trust, leads, and sales.',
    finalSystem: 'This is not marketing. This is market control.',
    problemTitle: 'What Is Slowing Your Business Down?',
    problemSub: 'Pick the real problem. Kaba does not sell random posts. We fix the path from attention to conversion.',
    stackTitle: 'The Kaba Growth Stack',
    compareTitle: 'Most Agencies Sell Content. We Build the Machine Behind It.',
    industriesTitle: 'Built for Businesses Ready to Be Seen',
    plansTitle: 'Choose the Level of Growth You Want',
    ctaTitle: 'If Your Brand Looks Average, The Market Will Treat It Average.',
    ctaSub: 'Kaba Labs helps you build the presence, content, campaigns, and systems needed to compete at a higher level.',
    ctaBtn: 'Build My Growth System'
  },
  am: {
    nav: ['ስርዓት', 'አገልግሎት', 'ማረጋገጫ', 'ፕላን'],
    heroEyebrow: 'KABA LABS / የእድገት መቆጣጠሪያ',
    heroTitle: 'ትንሽ ድካም። ትልቅ እድገት።',
    heroSub: 'ቢዝነሶች እንዲታዩ፣ እንዲታመኑ እና እንዲሸጡ ስትራቴጂ፣ ኮንተንት፣ ማስታወቂያ፣ ድረገፅ እና የሽያጭ ስርዓት እንገነባለን።',
    primary: 'የእድገት ስርዓት ጀምር',
    secondary: 'እንዴት እንደሚሰራ',
    proof: ['60+ ደንበኞች', '2+ ዓመት በገበያ', 'ኮንተንት • ማስታወቂያ • ብራንዲንግ • እድገት'],
    systemTitle: 'ብራንድዎ የሚፈልገው ተራ ፖስት አይደለም። የእድገት ስርዓት ነው።',
    systemSub: 'Scroll ያድርጉ፤ Kaba የማይታይ ቢዝነስን ወደ የሚታይ፣ የሚታመን እና የሚሸጥ ብራንድ እንዴት እንደሚያሳድግ ይመልከቱ።',
    finalSystem: 'ይህ ማርኬቲንግ ብቻ አይደለም። የገበያ ቁጥጥር ነው።',
    problemTitle: 'ቢዝነስዎን የሚያዘገየው ምንድነው?',
    problemSub: 'ትክክለኛውን ችግኝ ይምረጡ። Kaba ተራ ፖስት አይሸጥም፤ ከትኩረት እስከ ሽያጭ ያለውን መንገድ ያስተካክላል።',
    stackTitle: 'የKaba የእድገት መሳሪያዎች',
    compareTitle: 'ብዙ ኤጀንሲዎች ኮንተንት ይሸጣሉ። እኛ የሚያሳድግ ማሽን እንገነባለን።',
    industriesTitle: 'ለመታየት የተዘጋጁ ቢዝነሶች',
    plansTitle: 'የሚፈልጉትን የእድገት ደረጃ ይምረጡ',
    ctaTitle: 'ብራንድዎ ተራ ከታየ፣ ገበያውም ተራ ይመለከተዋል።',
    ctaSub: 'Kaba Labs ከፍ ባለ ደረጃ እንዲወዳደሩ መታየት፣ ኮንተንት፣ ካምፔን እና ስርዓት ይገነባል።',
    ctaBtn: 'የእድገት ስርዓቴን ገንባ'
  },
  fr: {
    nav: ['Système', 'Stack', 'Preuve', 'Plans'],
    heroEyebrow: 'KABA LABS / CENTRE DE CROISSANCE',
    heroTitle: 'Moins d’effort. Plus de croissance.',
    heroSub: 'Nous construisons la stratégie, le contenu, les publicités, les sites web et les systèmes de vente qui transforment les entreprises en marques visibles, crédibles et choisies.',
    primary: 'Lancer le système',
    secondary: 'Voir le processus',
    proof: ['60+ Clients', '2+ Ans sur le marché', 'Contenu • Ads • Branding • Systèmes'],
    systemTitle: 'Votre marque n’a pas besoin de contenu au hasard. Elle a besoin d’un système de croissance.',
    systemSub: 'Scrollez et regardez comment Kaba transforme une entreprise invisible en marque qui attire, inspire confiance et vend.',
    finalSystem: 'Ce n’est pas du marketing. C’est le contrôle du marché.',
    problemTitle: 'Qu’est-ce qui ralentit votre business ?',
    problemSub: 'Choisissez le vrai problème. Kaba ne vend pas des posts au hasard. Nous réparons le chemin de l’attention à la conversion.',
    stackTitle: 'Le Kaba Growth Stack',
    compareTitle: 'La plupart des agences vendent du contenu. Nous construisons la machine derrière.',
    industriesTitle: 'Pour les entreprises prêtes à être vues',
    plansTitle: 'Choisissez votre niveau de croissance',
    ctaTitle: 'Si votre marque a l’air moyenne, le marché la traitera comme moyenne.',
    ctaSub: 'Kaba Labs construit la présence, les contenus, les campagnes et les systèmes pour jouer à un niveau supérieur.',
    ctaBtn: 'Construire mon système'
  }
};

const roadmap = [
  { icon: Radio, title: 'Unknown Business', text: 'Weak signal. Low trust. No clear reason for the market to care.', metric: '0→1', scale: 0.72 },
  { icon: Brain, title: 'Diagnose', text: 'We scan the offer, audience, competitors, content, sales flow, and bottlenecks.', metric: 'CLARITY', scale: 0.9 },
  { icon: Target, title: 'Position', text: 'We shape the message so people understand what you sell and why it matters.', metric: 'TRUST', scale: 1.05 },
  { icon: Camera, title: 'Create', text: 'Video, photo, graphics, hooks, landing pages, and campaigns built to convert.', metric: 'ASSETS', scale: 1.2 },
  { icon: Rocket, title: 'Launch', text: 'Campaigns go live. Traffic, messages, leads, calls, and sales start moving.', metric: '+LEADS', scale: 1.42 },
  { icon: LineChart, title: 'Scale', text: 'We double down on what works and build repeatable growth systems.', metric: 'DOMINATE', scale: 1.75 }
];

const stack = [
  ['Brand Strategy', 'Offer, message, audience, positioning, and direction before money is wasted.', Brain],
  ['Content Production', 'Videos, photos, scripts, hooks, graphics, campaigns, and creative direction.', Camera],
  ['Paid Ads', 'Meta, TikTok, and campaign systems for leads, traffic, and measurable growth.', Megaphone],
  ['Websites & Landing Pages', 'Pages built to make people understand, trust, and take action.', Globe2],
  ['Sales Systems', 'Lead tracking, follow-up structure, CRM setup, and conversion workflows.', Layers3],
  ['Growth Consulting', 'Know what to fix, where to push, and how to grow without guessing.', BarChart3]
];

const problems = [
  ['People do not know us', 'Then visibility is the first battlefield. We build content and campaigns that make the market see you repeatedly.'],
  ['We do not look professional', 'Then trust is leaking. We rebuild your visual presence so customers feel you are serious.'],
  ['We post but do not get sales', 'Then content is not the real problem. The offer, targeting, and conversion path are broken.'],
  ['Our ads do not work', 'Then the campaign is probably pushing weak creative or a weak offer. We fix both.'],
  ['We do not have enough leads', 'Then you need a lead engine: clear offer, sharp targeting, landing flow, and follow-up system.'],
  ['We have no clear system', 'Then growth depends on luck. We build the machine behind attention, sales, and reporting.']
];

const industries = ['Restaurants & Cafes','Gyms & Fitness Centers','Hotels & Guest Houses','Furniture Stores','Clinics & Wellness','Beauty Salons & Spas','Real Estate','Fashion Brands','E-commerce Stores','Schools & Training','Car Dealerships','Interior Design'];

export default function App() {
  const [lang, setLang] = useState('en');
  const [progress, setProgress] = useState(0);
  const [activeProblem, setActiveProblem] = useState(0);
  const [traveler, setTraveler] = useState({ x: 72, y: 364, angle: -18 });
  const pathRef = useRef(null);
  const t = copy[lang];
  const activeIndex = Math.min(roadmap.length - 1, Math.floor(progress * roadmap.length));
  const active = roadmap[activeIndex];
  const progressLabel = `${Math.round(progress * 100)}%`;

  useEffect(() => {
    const updateRoad = (ratio) => {
      const path = pathRef.current;
      if (!path || typeof path.getTotalLength !== 'function') return;
      const len = path.getTotalLength();
      const clamped = Math.min(Math.max(ratio, 0), 1);
      const current = path.getPointAtLength(len * clamped);
      const next = path.getPointAtLength(Math.min(len, len * clamped + 1));
      const angle = Math.atan2(next.y - current.y, next.x - current.x) * (180 / Math.PI);
      setTraveler({ x: current.x, y: current.y, angle });
    };
    const onScroll = () => {
      const el = document.getElementById('growth-system');
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const passed = Math.min(Math.max(-rect.top, 0), total);
      const ratio = total > 0 ? passed / total : 0;
      setProgress(ratio);
      updateRoad(ratio);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const pathStyle = useMemo(() => ({ '--progress': `${Math.max(progress * 100, 5)}%` }), [progress]);

  return <main className="min-h-screen bg-[#050505] text-[#f7f3e8] overflow-x-hidden font-[Inter,system-ui,sans-serif]">
    <style>{`
      html{scroll-behavior:smooth}.noise{position:fixed;inset:0;pointer-events:none;opacity:.13;z-index:10;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 220 220' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.45'/%3E%3C/svg%3E")}.nav{position:fixed;top:18px;left:50%;transform:translateX(-50%);z-index:20;width:min(1180px,calc(100% - 28px));display:flex;align-items:center;justify-content:space-between;padding:13px 16px;border:1px solid rgba(255,255,255,.1);border-radius:22px;background:rgba(5,5,5,.72);backdrop-filter:blur(18px)}.brand{display:flex;align-items:center;gap:9px;font-weight:900;letter-spacing:.05em}.brand small{color:#e5b957;letter-spacing:.22em}.mark{display:grid;place-items:center;width:30px;height:30px;background:linear-gradient(135deg,#e5b957,#fff0a8);color:#070707;border-radius:9px}.nav nav{display:flex;gap:22px;color:#a7a096;font-size:14px}.lang{display:flex;gap:4px;background:#111;border-radius:999px;padding:4px}.lang button{border:0;background:transparent;color:#a7a096;padding:7px 10px;border-radius:999px;font-weight:800;cursor:pointer}.lang .on{background:#e5b957;color:#000}.section{width:min(1180px,calc(100% - 32px));margin:0 auto;padding:120px 0}.hero{min-height:100vh;display:grid;grid-template-columns:1.08fr .92fr;align-items:center;gap:56px;padding-top:130px}.eyebrow{display:flex;align-items:center;gap:8px;color:#e5b957;font-size:12px;letter-spacing:.18em;font-weight:900;text-transform:uppercase}.hero h1,.section h2{font-size:clamp(48px,8vw,112px);line-height:.88;margin:20px 0 24px;letter-spacing:-.075em}.lead{font-size:clamp(18px,2vw,24px);color:#d5cec1;line-height:1.55;max-width:760px}.actions{display:flex;gap:14px;flex-wrap:wrap;margin-top:32px}.btn{display:inline-flex;align-items:center;gap:10px;padding:16px 20px;border-radius:999px;font-weight:900}.primary{background:linear-gradient(135deg,#e5b957,#fff0a8);color:#050505}.ghost{border:1px solid rgba(255,255,255,.16);color:#f7f3e8}.proofbar{display:flex;gap:12px;flex-wrap:wrap;margin-top:36px}.proofbar span{display:flex;gap:7px;align-items:center;color:#a7a096;border:1px solid rgba(255,255,255,.1);padding:10px 12px;border-radius:999px;background:rgba(255,255,255,.035)}.hero-visual{position:relative;min-height:530px;display:grid;place-items:center}.orb{position:absolute;border-radius:50%;filter:blur(18px);opacity:.75}.orb1{width:320px;height:320px;background:rgba(229,185,87,.28);right:50px;top:60px}.orb2{width:220px;height:220px;background:rgba(255,255,255,.08);left:35px;bottom:70px}.dashboard{position:relative;width:min(480px,100%);border:1px solid rgba(255,255,255,.13);border-radius:32px;background:linear-gradient(180deg,rgba(255,255,255,.09),rgba(255,255,255,.03));box-shadow:0 40px 100px rgba(0,0,0,.55);padding:22px;overflow:hidden}.dashboard:before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.08),transparent);animation:sweep 3.8s infinite}.dash-head{display:flex;gap:8px}.dash-head span{width:10px;height:10px;border-radius:50%;background:#e5b957}.signal{margin-top:70px;display:flex;justify-content:space-between;align-items:end}.signal span{color:#a7a096}.signal strong{font-size:66px;color:#e5b957;letter-spacing:-.07em}.bars{display:flex;gap:12px;align-items:end;height:160px;margin-top:30px}.bars i{flex:1;background:linear-gradient(#fff0a8,#e5b957);border-radius:12px 12px 0 0;animation:grow 2.2s ease-in-out infinite alternate}.bars i:nth-child(1){height:30%}.bars i:nth-child(2){height:55%;animation-delay:.2s}.bars i:nth-child(3){height:42%;animation-delay:.4s}.bars i:nth-child(4){height:75%;animation-delay:.6s}.bars i:nth-child(5){height:96%;animation-delay:.8s}.mini-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:16px}.mini-grid b{background:#111;border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:10px;text-align:center;font-size:12px}.growth-section{height:600vh;position:relative}.sticky-growth{position:sticky;top:0;height:100vh;display:flex;flex-direction:column;justify-content:center;width:min(1180px,calc(100% - 32px));margin:0 auto}.section-intro h2{font-size:clamp(34px,5.5vw,72px);line-height:.95;max-width:920px}.section-intro p:not(.eyebrow),.muted{color:#a7a096;font-size:18px;line-height:1.65;max-width:760px}.road-stage{display:grid;grid-template-columns:340px 1fr;gap:22px;align-items:stretch;margin-top:26px;min-height:460px}.stage-panel{display:grid;gap:14px;align-content:start}.progress-chip{display:flex;justify-content:space-between;align-items:center;border:1px solid rgba(255,255,255,.1);border-radius:18px;padding:16px 18px;background:linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.025))}.progress-chip span{font-size:12px;text-transform:uppercase;letter-spacing:.15em;color:#a7a096;font-weight:800}.progress-chip strong{font-size:24px;color:#e5b957;letter-spacing:-.04em}.stage-card{position:relative!important;right:auto!important;bottom:auto!important;width:100%!important;padding:24px;border:1px solid rgba(255,255,255,.12);border-radius:24px;background:rgba(8,8,8,.82);backdrop-filter:blur(20px)}.active-card .num{color:#e5b957;font-weight:900}.active-card h3{font-size:34px;margin:8px 0}.active-card p{color:#a7a096;line-height:1.6}.metric{display:inline-flex;color:#000;background:#e5b957;border-radius:999px;padding:8px 12px;font-weight:900}.stage-list{display:grid;gap:8px}.mini-stage{display:flex;align-items:center;gap:10px;padding:12px 14px;border:1px solid rgba(255,255,255,.08);border-radius:14px;background:rgba(255,255,255,.025);color:#a7a096;transition:.28s}.mini-stage.done{border-color:rgba(229,185,87,.35)}.mini-stage.current{background:rgba(229,185,87,.12);color:#f7f3e8;box-shadow:0 0 0 1px rgba(229,185,87,.2) inset}.mini-stage svg{color:#e5b957}.road-wrap{position:relative;height:460px;border:1px solid rgba(255,255,255,.09);background:radial-gradient(circle at 10% 20%,rgba(229,185,87,.13),transparent 30%),linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.02));border-radius:34px;overflow:hidden;isolation:isolate}.road-bg-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px);background-size:40px 40px;mask-image:linear-gradient(180deg,transparent,rgba(0,0,0,.9) 18%,rgba(0,0,0,.9) 82%,transparent)}.scene-fade{position:absolute;left:0;right:0;height:90px;z-index:1}.scene-fade.top{top:0;background:linear-gradient(180deg,#050505,transparent)}.scene-fade.bottom{bottom:0;background:linear-gradient(0deg,#050505,transparent)}.road{position:absolute;inset:0;width:100%;height:100%;z-index:2}.road-shadow,.road-surface,.road-centerline,.road-progress{fill:none;stroke-linecap:round;stroke-linejoin:round}.road-shadow{stroke:rgba(0,0,0,.35);stroke-width:84;filter:blur(18px)}.road-surface{stroke:#121212;stroke-width:76}.road-centerline{stroke:#f7f3e8;stroke-width:5;stroke-dasharray:12 18;opacity:.72;animation:dashmove 1.15s linear infinite}.road-progress{stroke:#e5b957;stroke-width:14;stroke-dasharray:1500;stroke-dashoffset:calc(1500 - (1500 * var(--progress) / 100));filter:drop-shadow(0 0 18px rgba(229,185,87,.7))}.road-node{position:absolute;transform:translate(-50%,-50%);display:flex;align-items:center;gap:8px;padding:10px 12px;border-radius:999px;background:#0b0b0b;border:1px solid rgba(255,255,255,.12);color:#a7a096;transition:.35s;z-index:5;box-shadow:0 10px 30px rgba(0,0,0,.35)}.road-node.active{color:#050505;background:#e5b957;box-shadow:0 0 34px rgba(229,185,87,.35)}.node-0{left:7%;top:81%}.node-1{left:24%;top:57%}.node-2{left:39%;top:71%}.node-3{left:56%;top:40%}.node-4{left:73%;top:46%}.node-5{left:92%;top:17%}.traveler{position:absolute;z-index:6;width:72px;height:40px;pointer-events:none}.traveler-glow{position:absolute;inset:-16px;filter:blur(18px);background:radial-gradient(circle,rgba(229,185,87,.55),transparent 70%)}.traveler-body{position:absolute;inset:0;border-radius:999px;background:linear-gradient(135deg,#fff0a8,#e5b957);display:grid;place-items:center;color:#050505;font-weight:900;box-shadow:0 14px 30px rgba(0,0,0,.36),0 0 24px rgba(229,185,87,.35)}.traveler-body:before,.traveler-body:after{content:"";position:absolute;bottom:-6px;width:14px;height:14px;border-radius:50%;background:#050505;box-shadow:0 0 0 3px #1a1a1a}.traveler-body:before{left:12px}.traveler-body:after{right:12px}.traveler-label{font-size:12px;letter-spacing:.16em}.brand-core{position:absolute;left:51%;top:53%;width:150px;height:150px;border-radius:50%;display:grid;place-items:center;background:radial-gradient(circle,#fff0a8,#e5b957);color:#050505;font-weight:950;box-shadow:0 0 70px rgba(229,185,87,.5);transition:transform .25s;z-index:4}.brand-core span{font-size:30px;letter-spacing:.03em}.brand-core small{position:absolute;bottom:33px;font-size:11px;letter-spacing:.18em}.float-stat{position:absolute;z-index:4;padding:12px 14px;border-radius:16px;background:rgba(8,8,8,.75);border:1px solid rgba(255,255,255,.12);backdrop-filter:blur(10px);box-shadow:0 18px 50px rgba(0,0,0,.28)}.float-stat strong{display:block;font-size:14px}.float-stat span{display:block;color:#a7a096;font-size:12px;margin-top:4px}.stat-1{left:16%;top:16%}.stat-2{right:18%;top:18%}.stat-3{right:12%;bottom:14%}.road-wrap:before{content:'MARKET CONTROL';position:absolute;right:28px;top:28px;z-index:3;color:rgba(255,240,168,.1);font-size:58px;font-weight:950;letter-spacing:-.06em}.road-wrap:after{content:'';position:absolute;left:-120px;bottom:-160px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(229,185,87,.22),transparent 65%);z-index:1}.market-footer{display:grid;grid-template-columns:1fr 380px;gap:22px;align-items:end;margin-top:22px}.market-control{margin:0;font-size:clamp(32px,6vw,74px)!important;max-width:760px}.control-chips{display:grid;grid-template-columns:1fr 1fr;gap:10px}.control-chips span{border:1px solid rgba(229,185,87,.24);background:rgba(229,185,87,.08);border-radius:999px;padding:12px 14px;color:#f7f3e8;font-size:13px;font-weight:800;text-align:center;box-shadow:0 0 30px rgba(229,185,87,.08)}.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.card,.solution,.plan,.compare-grid>div,.industries div{border:1px solid rgba(255,255,255,.1);background:linear-gradient(180deg,rgba(255,255,255,.055),rgba(255,255,255,.02));border-radius:26px;padding:24px}.card svg{color:#e5b957}.card h3,.solution h3{font-size:24px;margin:18px 0 10px}.card p,.solution p,.plan p{color:#a7a096;line-height:1.6}.split{display:grid;grid-template-columns:1fr .85fr;gap:40px;align-items:center}.problem-list{display:grid;gap:10px;margin-top:28px}.problem-list button{display:flex;justify-content:space-between;align-items:center;text-align:left;border:1px solid rgba(255,255,255,.1);background:#0b0b0b;color:#f7f3e8;border-radius:16px;padding:16px;font-weight:800;cursor:pointer}.problem-list .on{background:#e5b957;color:#000}.solution{position:sticky;top:120px}.solution span{color:#e5b957;font-weight:900;letter-spacing:.16em;font-size:12px}.compare h2{font-size:clamp(36px,6vw,78px);max-width:960px}.compare-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}.compare-grid p{padding:14px;border-radius:14px;background:rgba(255,255,255,.04);color:#a7a096;display:flex;gap:8px;align-items:center}.compare-grid div:nth-child(2) p{color:#f4ead6}.industries{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.industries div{transition:.25s}.industries div:hover{transform:translateY(-4px);border-color:#e5b957}.industries strong{display:block}.industries span{display:block;color:#a7a096;margin-top:10px;font-size:13px}.plans{display:grid;gap:14px}.plan{display:flex;justify-content:space-between;gap:20px;align-items:center}.plan span{color:#e5b957;font-weight:900}.plan h3{font-size:32px;margin:8px 0}.plan a{white-space:nowrap;color:#e5b957;font-weight:900;display:flex;gap:8px}.cta{text-align:center;border:1px solid rgba(255,255,255,.1);border-radius:36px;background:radial-gradient(circle at top,rgba(229,185,87,.22),rgba(255,255,255,.035) 45%,rgba(255,255,255,.01));margin-bottom:80px;padding:90px 24px}.cta h2{font-size:clamp(36px,6vw,82px);max-width:960px;margin-left:auto;margin-right:auto}.cta p{max-width:720px;color:#a7a096;line-height:1.7;margin:0 auto 30px}footer{text-align:center;color:#a7a096;padding:30px}@keyframes sweep{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}@keyframes grow{to{transform:scaleY(.72);opacity:.78}}@keyframes dashmove{to{stroke-dashoffset:-60}}@media(max-width:980px){.road-stage{grid-template-columns:1fr}.stage-list{grid-template-columns:repeat(2,1fr)}}@media(max-width:980px){.market-footer{grid-template-columns:1fr}.control-chips{grid-template-columns:1fr 1fr}}@media(max-width:860px){.nav nav{display:none}.hero,.split,.compare-grid{grid-template-columns:1fr}.hero{padding-top:120px}.hero-visual{min-height:360px}.cards,.industries,.stage-list{grid-template-columns:1fr}.section{padding:80px 0}.road-wrap{height:500px}.road-node{left:10%!important;right:auto;top:auto!important;transform:none}.node-0{bottom:420px}.node-1{bottom:350px}.node-2{bottom:280px}.node-3{bottom:210px}.node-4{bottom:140px}.node-5{bottom:70px}.brand-core{left:72%;top:44%;width:110px;height:110px}.traveler{display:none}.float-stat{display:none}.market-control{margin-top:14px}.growth-section{height:640vh}.sticky-growth{justify-content:flex-start;padding-top:100px}.plan{flex-direction:column;align-items:flex-start}.lang button{padding:6px 8px}.brand small{display:none}}
    `}</style>
    <div className="noise" />
    <header className="nav">
      <div className="brand"><span className="mark">K</span><span>KABA</span><small>LABS</small></div>
      <nav>{t.nav.map((n, i) => <a key={n} href={['#growth-system','#stack','#proof','#plans'][i]}>{n}</a>)}</nav>
      <div className="lang">{['en','am','fr'].map(l => <button key={l} onClick={() => setLang(l)} className={lang===l?'on':''}>{l.toUpperCase()}</button>)}</div>
    </header>

    <section className="hero section">
      <div className="hero-copy">
        <p className="eyebrow"><Sparkles size={16}/>{t.heroEyebrow}</p>
        <h1>{t.heroTitle}</h1>
        <p className="lead">{t.heroSub}</p>
        <div className="actions"><a className="btn primary" href="#contact">{t.primary}<ArrowUpRight size={18}/></a><a className="btn ghost" href="#growth-system"><Play size={17}/>{t.secondary}</a></div>
        <div className="proofbar">{t.proof.map(x => <span key={x}><Check size={15}/>{x}</span>)}</div>
      </div>
      <div className="hero-visual">
        <div className="orb orb1"/><div className="orb orb2"/>
        <div className="dashboard">
          <div className="dash-head"><span/><span/><span/></div>
          <div className="signal"><span>Market Signal</span><strong>+284%</strong></div>
          <div className="bars"><i/><i/><i/><i/><i/></div>
          <div className="mini-grid"><b>Strategy</b><b>Content</b><b>Ads</b><b>Sales</b></div>
        </div>
      </div>
    </section>

    <section id="growth-system" className="growth-section">
      <div className="sticky-growth">
        <div className="section-intro"><p className="eyebrow"><MousePointer2 size={16}/>SCROLL TO GROW</p><h2>{t.systemTitle}</h2><p>{t.systemSub}</p></div>
        <div className="road-stage">
          <aside className="stage-panel">
            <div className="progress-chip"><span>Growth progress</span><strong>{progressLabel}</strong></div>
            <div className="active-card stage-card"><div className="num">0{activeIndex+1}</div><h3>{active.title}</h3><p>{active.text}</p><span className="metric">{active.metric}</span></div>
            <div className="stage-list">{roadmap.map((step, i) => { const Icon = step.icon; return <div key={step.title} className={`mini-stage ${i<=activeIndex?'done':''} ${i===activeIndex?'current':''}`}><Icon size={16} /><span>{step.title}</span></div>; })}</div>
          </aside>
          <div className="road-wrap road-wrap-dynamic" style={pathStyle}>
            <div className="road-bg-grid" /><div className="scene-fade top" /><div className="scene-fade bottom" />
            <svg className="road" viewBox="0 0 1100 460" preserveAspectRatio="none">
              <path className="road-shadow" d="M40 380 C220 250 280 420 430 290 C570 168 660 290 770 185 C870 90 980 125 1060 70" />
              <path className="road-surface" d="M40 380 C220 250 280 420 430 290 C570 168 660 290 770 185 C870 90 980 125 1060 70" />
              <path ref={pathRef} className="road-centerline" d="M40 380 C220 250 280 420 430 290 C570 168 660 290 770 185 C870 90 980 125 1060 70" />
              <path className="road-progress" d="M40 380 C220 250 280 420 430 290 C570 168 660 290 770 185 C870 90 980 125 1060 70" />
            </svg>
            {roadmap.map((step, i) => { const Icon = step.icon; return <div key={step.title} className={`road-node node-${i} ${i<=activeIndex?'active':''}`}><Icon size={18}/><span>{step.title}</span></div> })}
            <div className="traveler" style={{ left: `${traveler.x}px`, top: `${traveler.y}px`, transform: `translate(-50%, -50%) rotate(${traveler.angle}deg)` }}><div className="traveler-glow" /><div className="traveler-body"><span className="traveler-label">KABA</span></div></div>
            <div className="brand-core" style={{ transform: `translate(-50%,-50%) scale(${active.scale})` }}><span>KABA</span><small>{active.metric}</small></div>
            <div className="float-stat stat-1"><strong>Visibility</strong><span>→ On</span></div><div className="float-stat stat-2"><strong>Trust</strong><span>+ Brand Lift</span></div><div className="float-stat stat-3"><strong>Leads</strong><span>Flow Activated</span></div>
          </div>
        </div>
        <div className="market-footer">
          <h2 className="market-control">{t.finalSystem}</h2>
          <div className="control-chips">
            <span>Strategy locked</span>
            <span>Content engine live</span>
            <span>Leads moving</span>
            <span>Scale mode</span>
          </div>
        </div>
      </div>
    </section>

    <section id="stack" className="section"><div className="section-intro"><p className="eyebrow"><Zap size={16}/>FULL STACK GROWTH</p><h2>{t.stackTitle}</h2></div><div className="cards">{stack.map(([title, text, Icon]) => <article className="card" key={title}><Icon/><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="section split"><div><p className="eyebrow"><Wand2 size={16}/>PROBLEM SOLVER</p><h2>{t.problemTitle}</h2><p className="muted">{t.problemSub}</p><div className="problem-list">{problems.map((p, i)=><button onClick={()=>setActiveProblem(i)} className={activeProblem===i?'on':''} key={p[0]}>{p[0]}<ChevronRight size={16}/></button>)}</div></div><div className="solution"><span>THE KABA ANSWER</span><h3>{problems[activeProblem][0]}</h3><p>{problems[activeProblem][1]}</p></div></section>
    <section id="proof" className="section compare"><h2>{t.compareTitle}</h2><div className="compare-grid"><div><h3>Normal Agencies</h3>{['Post and disappear','Focus on likes','Random designs','No tracking','One-size-fits-all','Content only'].map(x=><p key={x}>{x}</p>)}</div><div><h3>Kaba Labs</h3>{['Strategy before execution','Leads, trust, and sales','Brand direction and consistency','Lead and campaign systems','Built around your model','Content + ads + website + sales flow'].map(x=><p key={x}><ShieldCheck size={16}/>{x}</p>)}</div></div></section>
    <section className="section"><div className="section-intro"><p className="eyebrow"><Users size={16}/>INDUSTRIES</p><h2>{t.industriesTitle}</h2></div><div className="industries">{industries.map(x=><div key={x}><strong>{x}</strong><span>Content → Campaign → Leads → Sales</span></div>)}</div></section>
    <section id="plans" className="section plans"><div className="section-intro"><p className="eyebrow"><Layers3 size={16}/>PACKAGES</p><h2>{t.plansTitle}</h2></div>{['Growth Starter','Market Builder','Dominance System'].map((p,i)=><article className="plan" key={p}><div><span>0{i+1}</span><h3>{p}</h3><p>{['For businesses that need professional presence and structure.','For businesses ready to run content, ads, and lead generation seriously.','For brands that want full strategy, content, ads, landing pages, and growth systems.'][i]}</p></div><a href="#contact">Apply for This Plan <ArrowUpRight size={18}/></a></article>)}</section>
    <section id="contact" className="section cta"><h2>{t.ctaTitle}</h2><p>{t.ctaSub}</p><a className="btn primary" href="mailto:hello@kabalabs.com">{t.ctaBtn}<ArrowUpRight size={18}/></a></section>
    <footer>Kaba Labs — Less Effort. More Growth.</footer>
  </main>
}
