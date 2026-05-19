/* KABA LABS — main.js ultimate */
(function(){
'use strict';

// ══════════════════════════════════
// TRANSLATIONS
// ══════════════════════════════════
const i18n = {
  en: {
    nav0:'Problem', nav1:'System', nav2:'Work', nav3:'Packages', nav4:'Contact', navCta:'Start Now',
    heroEyebrow:'Addis Ababa, Ethiopia — Est. 2024',
    heroLine1:'We Don\'t', heroLine2:'Make Content.', heroLine3:'We Build Empires.',
    heroSub:'KABA LABS is Ethiopia\'s most advanced digital marketing agency. Video. Ads. Systems. We help businesses look trusted online and get more customers every single month.',
    heroPrimary:'See The Problem', heroSecondary:'See Packages',
    proofTitle:'Proven Results', stat1:'Clients Served', stat2:'Dental Clinics', stat3:'Service Tiers', stat4:'Years Active',
    industriesTitle:'Industries We Serve',
    ind1:'Dental & Medical', ind2:'Real Estate', ind3:'Automotive', ind4:'Hospitality', ind5:'Beauty & Spa', ind6:'Education',
    consultTitle:'Free consultation', consultSub:'20 minutes. No commitment.', consultBtn:'Talk to Us',
    scroll:'Scroll',
    problemEyebrow:'The Reality',
    problemTitle:'Your Competitors Are Already', problemTitleEm:'Winning Online.',
    p1h:'They found you on Google — and chose someone else.',
    p1p:'Every day, customers in Addis search for exactly what you offer. If your business doesn\'t look trusted online, they call your competitor instead.',
    p2h:'Walk-ins and word of mouth aren\'t enough anymore.',
    p2p:'The businesses growing fastest in Ethiopia are investing in consistent content and targeted ads. The ones relying on the old way are falling behind — quietly.',
    p3h:'You tried marketing before and it didn\'t work.',
    p3p:'Boosting posts is not advertising. A random video is not a strategy. Most agencies take your money and give you activity, not results. We\'re built differently.',
    problemCta:'See How We Fix This',
    roadmapEyebrow:'The Growth System',
    roadmapTitle:'Your Brand Needs a System.', roadmapTitleEm:'Not Random Content.',
    roadmapSub:'Scroll and watch how KABA LABS turns an invisible business into a brand that attracts, builds trust, and converts.',
    growth:'Growth progress',
    step0:'Unknown Business', step1:'Diagnose', step2:'Strategy', step3:'Content', step4:'Ads Live', step5:'Trust Builds', step6:'Leads Flow', step7:'Market Control',
    vis:'Visibility', tru:'Trust', lea:'Leads',
    marketControl:'This is not marketing. This is market control.',
    chip1:'Strategy locked', chip2:'Content engine live', chip3:'Leads moving', chip4:'Scale mode',
    aboutEyebrow:'Who We Are', aboutTitle:'Built for Ethiopia.', aboutTitleEm:'Built to Win.',
    about1:'KABA LABS was built because Ethiopian businesses deserved better. We combine professional video production, data-driven advertising, and modern technology — all under one roof, tailored for the Ethiopian market.',
    about2:'We know how Ethiopian customers decide to buy. We know what makes a clinic owner in Addis trust a brand. We know what makes a car dealer\'s phone ring. We\'ve proven it with 60+ clients.',
    astat1:'Businesses transformed', astat2:'Dental clinics as active clients', astat3:'Tiers built for every budget',
    quote:'"This is not marketing. This is market control."',
    workEyebrow:'What We Do', workTitle:'We Handle', workTitleEm:'Everything.',
    c1tag:'Dental & Medical', c1title:'10+ Clinic Clients in Addis Ababa',
    c2tag:'Performance Advertising', c2title:'Meta · TikTok · Google Ads',
    c3tag:'Video Production', c3title:'Phone · Camera · Cinematic',
    c4tag:'Brand & Growth Systems', c4title:'Systems That Scale Forever',
    c5title:'The Level No One Can Touch',
    solverEyebrow:'Problem Solver',
    solverTitle:'What Is Slowing Your Business', solverTitleEm:'Down?',
    solverSub:'Pick your real problem. We don\'t sell random content — we fix the path from attention to conversion.',
    prob0:'No one knows we exist', prob1:'We post but get no results', prob2:'We tried ads and lost money', prob3:'Our content looks unprofessional', prob4:'We don\'t know where to start',
    kabaAnswer:'THE KABA ANSWER', solverCta:'Fix This With Us →',
    compareEyebrow:'The Difference',
    compareTitle:'Most Agencies Sell Content.', compareTitleEm:'We Build the Machine Behind It.',
    col1h:'Normal Agencies', col2h:'KABA LABS',
    o1:'Post and disappear', o2:'Focus on likes and views', o3:'Random designs, no direction', o4:'No tracking or reporting', o5:'One-size-fits-all packages', o6:'Content only, no strategy',
    k1:'Strategy before execution', k2:'Leads, trust, and actual sales', k3:'Brand direction and consistency', k4:'Monthly performance reports', k5:'Built around your business model', k6:'Content + ads + website + sales flow',
    processEyebrow:'How It Works', processTitle:'Simple Process.', processTitleEm:'Real Results.', processSub:'We handle everything. You focus on your business.',
    ps1h:'Free Consultation', ps1p:'20 minutes. We understand your business and tell you exactly what we\'d recommend. No commitment, no cost.',
    ps2h:'We Build Your System', ps2p:'Right package, shoot content, set up ads, build presence. You approve everything before we go live.',
    ps3h:'You Get Customers', ps3p:'Ads run, content goes out, phone rings. Every month a full performance report and optimization.',
    pkgTitle:'Choose Your', pkgTitleEm:'Level.', pkgSub:'Three tiers. Nine packages. All built for businesses that refuse to be invisible.',
    pkg1badge:'Tier 01 — Phone Production', pkg1target:'Salons · Restaurants · Boutiques · Retailers',
    pkg1f1:'10–20 videos per month', pkg1f2:'2–6 graphics per month', pkg1f3:'Full social media management', pkg1f4:'Meta ads management', pkg1f5:'Monthly content calendar',
    pkg1ideal:'Businesses getting serious about their online presence for the first time',
    pkg2badge:'★ Tier 02 — Camera Production', pkg2target:'Clinics · Schools · Hotels · Real Estate',
    pkg2f1:'14–28 videos per month', pkg2f2:'4–8 graphics per month', pkg2f3:'Full social media management', pkg2f4:'Meta + TikTok ads management', pkg2f5:'Monthly performance report', pkg2f6:'Professional camera production',
    pkg2ideal:'Growing businesses ready to run serious content and lead generation',
    pkg3badge:'Tier 03 — Cinematic Production', pkg3target:'Corporates · Car Dealers · Large Clinics',
    pkg3f1:'24–40 videos per month', pkg3f2:'6–12 graphics per month', pkg3f3:'Full social media management', pkg3f4:'Meta + TikTok + Google ads', pkg3f5:'Influencer model included', pkg3f6:'CRM & automation setup', pkg3f7:'Dedicated account manager',
    pkg3ideal:'Brands that want full market domination — strategy, content, ads, and systems',
    idealFor:'Ideal for', getQuote:'Get a Custom Quote',
    pkgNote:'Pricing is customized to your business, industry, and goals. Contact us for a free consultation.',
    bookConsult:'Book Free Consultation',
    ctaEyebrow:'Ready to Start?', ctaTitle:'One Conversation', ctaTitleEm:'Changes Everything.',
    ctaSub:'Book a free 20-minute consultation. We\'ll tell you exactly which package fits your business. No fluff. No commitment.',
    callNow:'Call Now', sendEmail:'Send Email',
  },
  am: {
    nav0:'ችግሩ', nav1:'ስርዓቱ', nav2:'ስራ', nav3:'ፕላኖች', nav4:'ያግኙን', navCta:'አሁን ጀምር',
    heroEyebrow:'አዲስ አበባ, ኢትዮጵያ — ከ2024 ጀምሮ',
    heroLine1:'ኮንተንት', heroLine2:'አንሠራም።', heroLine3:'ኢምፓየር እንገነባለን።',
    heroSub:'KABA LABS የኢትዮጵያ ምርጥ ዲጂታል ማርኬቲንግ ኤጀንሲ ነው። ቪዲዮ። ማስታወቂያ። ስርዓት። ቢዝነሶች እንዲታመኑ እና ደንበኞች እንዲያገኙ እናግዛቸዋለን።',
    heroPrimary:'ችግሩን ይመልከቱ', heroSecondary:'ፕላኖቹን ይመልከቱ',
    proofTitle:'ያረጋገጥናቸው ውጤቶች', stat1:'ደንበኞች', stat2:'የጥርስ ሐኪም ቤቶች', stat3:'የአገልግሎት ደረጃዎች', stat4:'ዓመታት',
    industriesTitle:'የምናገለግላቸው ዘርፎች',
    ind1:'ጥርስ እና ህክምና', ind2:'ሪል ስቴት', ind3:'መኪና', ind4:'ሆቴልና ምግብ ቤት', ind5:'ቤውቲ', ind6:'ትምህርት',
    consultTitle:'ነጻ ምክክር', consultSub:'20 ደቂቃ። ምንም ቁርጠኝነት የለም።', consultBtn:'ያነጋግሩን',
    scroll:'ወደ ታች ይሸብልሉ',
    problemEyebrow:'እውነታው',
    problemTitle:'ተወዳዳሪዎችዎ አስቀድሞ', problemTitleEm:'በኦንላይን እያሸነፉ ነው።',
    p1h:'በጉግል አገኙዎትና — ሌላ ሰው መረጡ።',
    p1p:'በየቀኑ ደንበኞች በአዲስ አበባ ትክክለኛ ፍለጋ ያደርጋሉ። ቢዝነሶ በኦንላይን አስተማማኝ ካልሆነ ተወዳዳሪዎን ይደውሉለታል።',
    p2h:'ወደ ውስጥ መምጣት እና ተሰምቶ መሰራጨት አሁን አይበቃም።',
    p2p:'ፈጣን እያደጉ ያሉ ቢዝነሶች ወጥ ኮንተንት እና የታለሙ ማስታወቂያዎች ላይ እየኢንቨስት ናቸው።',
    p3h:'ከዚህ ቀደም ማርኬቲንግ ሞክርዎ ውጤት አልሰጠዎትም።',
    p3p:'ፖስት ማስተዋወቅ ማስታወቂያ አይደለም። ድንገተኛ ቪዲዮ ስትራቴጂ አይደለም። አብዛኞቹ ኤጀንሲዎች ገንዘቦን ወስደው ጥቅም ያሳጡዎታል።',
    problemCta:'እንዴት እናስተካክለዋለን ይመልከቱ',
    roadmapEyebrow:'የእድገት ስርዓቱ',
    roadmapTitle:'ብራንድዎ ስርዓት ያስፈልገዋል።', roadmapTitleEm:'ተራ ኮንተንት አይደለም።',
    roadmapSub:'KABA LABS የማይታይ ቢዝነስን ወደ ሚታይ፣ ሚታመን እና ሚሸጥ ብራንድ እንዴት እንደሚቀይር ይመልከቱ።',
    growth:'የእድገት ሂደት',
    step0:'ያልታወቀ ቢዝነስ', step1:'ምርመራ', step2:'ስትራቴጂ', step3:'ኮንተንት', step4:'ማስታወቂያ', step5:'እምነት', step6:'ደንበኞች', step7:'ቁጥጥር',
    vis:'ታይነት', tru:'እምነት', lea:'ደንበኞች',
    marketControl:'ይህ ማርኬቲንግ ብቻ አይደለም። የገበያ ቁጥጥር ነው።',
    chip1:'ስትራቴጂ ተዘጋጅቷል', chip2:'ኮንተንት እየሮጠ ነው', chip3:'ደንበኞች እየፈሰሱ ናቸው', chip4:'ሚዛን ሁናቴ',
    aboutEyebrow:'እነማን ነን', aboutTitle:'ለኢትዮጵያ ተገንብቷል።', aboutTitleEm:'ለማሸነፍ ተሠርቷል።',
    about1:'KABA LABS የኢትዮጵያ ቢዝነሶች የተሻለ ነገር ስለሚገባቸው ተገነባ። ሙያዊ ቪዲዮ ፕሮዳክሽን፣ ዳታ-ተኮር ማስታወቂያ እና ዘመናዊ ቴክኖሎጂ — ሁሉም በአንድ ስር።',
    about2:'የኢትዮጵያ ደንበኞች እንዴት እንደሚወስኑ እናውቃለን። 60+ ደንበኞች ይህን አረጋግጠዋል።',
    astat1:'የተቀየሩ ቢዝነሶች', astat2:'ናቸው ሐኪም ቤቶቻችን', astat3:'ደረጃዎቻችን',
    quote:'"ይህ ማርኬቲንግ ብቻ አይደለም። የገበያ ቁጥጥር ነው።"',
    workEyebrow:'ምን እናደርጋለን', workTitle:'ሁሉንም', workTitleEm:'እናስተናግዳለን።',
    c1tag:'ጥርስ እና ህክምና', c1title:'10+ ክሊኒኮች በአዲስ አበባ',
    c2tag:'ዓሳባ ማስታወቂያ', c2title:'Meta · TikTok · Google',
    c3tag:'ቪዲዮ ፕሮዳክሽን', c3title:'ስልክ · ካሜራ · ሲኒማ',
    c4tag:'ብራንድ እና እድገት', c4title:'ዘለቄታዊ ስርዓቶች',
    c5title:'ማንም ሊደርስበት የማይችለው ደረጃ',
    solverEyebrow:'ችግር ፈቺ',
    solverTitle:'ቢዝነስዎን ምን', solverTitleEm:'እያዘገየው ነው?',
    solverSub:'ትክክለኛ ችግሮን ይምረጡ። ተራ ፖስት አንሸጥም — ከትኩረት እስከ ሽያጭ መንገዱን እናስተካክላለን።',
    prob0:'ማንም አያውቀንም', prob1:'እናትም ውጤት አናገኝም', prob2:'ማስታወቂያ ሞከርን ገንዘብ አጣን', prob3:'ኮንተንቱ ሙያዊ አይደለም', prob4:'ከየት ልጀምር አናውቅም',
    kabaAnswer:'የKABA መልስ', solverCta:'አብረን እናስተካክለው →',
    compareEyebrow:'ልዩነቱ',
    compareTitle:'አብዛኛዎቹ ኤጀንሲዎች ኮንተንት ይሸጣሉ።', compareTitleEm:'እኛ ማሽኑን እንገነባለን።',
    col1h:'ተራ ኤጀንሲዎች', col2h:'KABA LABS',
    o1:'ፖስት አድርገው ይጠፋሉ', o2:'ላይኮች ላይ ያተኮራሉ', o3:'ተራ ዲዛይን ምንም አቅጣጫ የለም', o4:'ምንም ዘገባ የለም', o5:'ለሁሉም አንድ አይነት', o6:'ኮንተንት ብቻ',
    k1:'ስትራቴጂ ቀድሞ ይሄዳል', k2:'ሊድ እምነት እና ሽያጭ', k3:'የብራንድ አቅጣጫ', k4:'ወርሃዊ ዘገባ', k5:'ለቢዝነሶ ተበጀ', k6:'ኮንተንት + ማስታወቂያ + ድረ-ገጽ',
    processEyebrow:'እንዴት ይሰራል', processTitle:'ቀላል ሂደት።', processTitleEm:'ትክክለኛ ውጤቶች።', processSub:'ሁሉንም እናስተናግዳለን። ቢዝነሶ ላይ ያተኩሩ።',
    ps1h:'ነጻ ምክክር', ps1p:'20 ደቂቃ። ቢዝነሶን ተረድተን ምን እንመክር ብለን ንነግሮ። ምንም ቁርጠኝነት የለም።',
    ps2h:'ስርዓቱን እንገነባለን', ps2p:'ትክክለኛ ፕላን፣ ኮንተንት ቀረጻ፣ ማስታወቂያ ሴት አፕ። ሲጀምር ሁሉ ያጸድቃሉ።',
    ps3h:'ደንበኞች ያገኛሉ', ps3p:'ማስታወቂያ ይሮጣል፣ ኮንተንት ይወጣል፣ ስልክ ይደወላል። ወርሃዊ ዘገባ እና ማሻሻያ።',
    pkgTitle:'ደረጃዎን', pkgTitleEm:'ይምረጡ።', pkgSub:'ሶስት ደረጃዎች። ዘጠኝ ፕሮፓል ፓኬጆች።',
    pkg1badge:'ደረጃ 01 — ስልክ ፕሮዳክሽን', pkg1target:'ሳሎን · ምግብ ቤት · ቡቲክ',
    pkg1f1:'10–20 ቪዲዮ በወር', pkg1f2:'2–6 ግራፊክ በወር', pkg1f3:'ሙሉ ሶሻል ሚዲያ', pkg1f4:'Meta ማስታወቂያ', pkg1f5:'ወርሃዊ ኮንተንት',
    pkg1ideal:'ለመጀመሪያ ጊዜ ኦንላይን ቦታ ሊያሳዩ የሚፈልጉ ቢዝነሶች',
    pkg2badge:'★ ደረጃ 02 — ካሜራ ፕሮዳክሽን', pkg2target:'ሐኪም ቤቶች · ትምህርት ቤቶች · ሆቴሎች',
    pkg2f1:'14–28 ቪዲዮ በወር', pkg2f2:'4–8 ግራፊክ በወር', pkg2f3:'ሙሉ ሶሻል ሚዲያ', pkg2f4:'Meta + TikTok', pkg2f5:'ወርሃዊ ዘገባ', pkg2f6:'ሙያዊ ካሜራ',
    pkg2ideal:'ሊድ ጀነሬሽን ለመጀመር ዝግጁ የሆኑ ቢዝነሶች',
    pkg3badge:'ደረጃ 03 — ሲኒማ ፕሮዳክሽን', pkg3target:'ኮርፖሬቶች · መኪና ድሎቶች',
    pkg3f1:'24–40 ቪዲዮ በወር', pkg3f2:'6–12 ግራፊክ በወር', pkg3f3:'ሙሉ ሶሻል ሚዲያ', pkg3f4:'Meta + TikTok + Google', pkg3f5:'ኢንፍሉዌንሰር ሞዴል', pkg3f6:'CRM እና አውቶሜሽን', pkg3f7:'ልዩ አካውንት ማናጀር',
    pkg3ideal:'ሙሉ ቁጥጥር የሚፈልጉ ብራንዶች',
    idealFor:'ተስማሚ ለ', getQuote:'ብጁ ዋጋ ያግኙ',
    pkgNote:'ዋጋ ለቢዝነሶ ኢንዱስትሪ እና ዓላማ ተበጅቷል። ነጻ ምክክር ያዝዙ።',
    bookConsult:'ነጻ ምክክር ያዝዙ',
    ctaEyebrow:'ለመጀመር ዝግጁ ነዎት?', ctaTitle:'አንድ ውይይት', ctaTitleEm:'ሁሉን ይቀይራል።',
    ctaSub:'ነጻ 20 ደቂቃ ምክክር ያዝዙ። ቢዝነሶ ምን ያስፈልጋል ብለን ንነግሮ። ምንም ቁርጠኝነት የለም።',
    callNow:'አሁን ይደውሉ', sendEmail:'ኢሜይል ይላኩ',
  },
  fr: {
    nav0:'Problème', nav1:'Système', nav2:'Travaux', nav3:'Forfaits', nav4:'Contact', navCta:'Commencer',
    heroEyebrow:'Addis-Abeba, Éthiopie — Depuis 2024',
    heroLine1:'Nous ne', heroLine2:'créons pas du contenu.', heroLine3:'Nous bâtissons des empires.',
    heroSub:'KABA LABS est l\'agence de marketing digital la plus avancée d\'Éthiopie. Vidéo. Publicités. Systèmes. Nous aidons les entreprises à paraître crédibles et à attirer plus de clients.',
    heroPrimary:'Voir le problème', heroSecondary:'Voir les forfaits',
    proofTitle:'Résultats prouvés', stat1:'Clients servis', stat2:'Cliniques dentaires', stat3:'Niveaux de service', stat4:'Années d\'activité',
    industriesTitle:'Secteurs que nous servons',
    ind1:'Médical & Dentaire', ind2:'Immobilier', ind3:'Automobile', ind4:'Hôtellerie', ind5:'Beauté & Spa', ind6:'Éducation',
    consultTitle:'Consultation gratuite', consultSub:'20 minutes. Sans engagement.', consultBtn:'Nous contacter',
    scroll:'Défiler',
    problemEyebrow:'La réalité',
    problemTitle:'Vos concurrents gagnent déjà', problemTitleEm:'en ligne.',
    p1h:'Ils vous ont trouvé sur Google — et ont choisi quelqu\'un d\'autre.',
    p1p:'Chaque jour, des clients à Addis cherchent exactement ce que vous proposez. Si votre entreprise n\'est pas crédible en ligne, ils appellent votre concurrent.',
    p2h:'Les clients spontanés et le bouche-à-oreille ne suffisent plus.',
    p2p:'Les entreprises qui croissent le plus vite en Éthiopie investissent dans du contenu régulier et des publicités ciblées.',
    p3h:'Vous avez essayé le marketing avant — sans résultat.',
    p3p:'Booster des publications n\'est pas de la publicité. Une vidéo aléatoire n\'est pas une stratégie. La plupart des agences prennent votre argent et vous donnent de l\'activité, pas des résultats.',
    problemCta:'Voir comment nous réglons ça',
    roadmapEyebrow:'Le système de croissance',
    roadmapTitle:'Votre marque a besoin d\'un système.', roadmapTitleEm:'Pas de contenu au hasard.',
    roadmapSub:'Faites défiler et regardez comment KABA LABS transforme une entreprise invisible en marque qui attire, inspire confiance et vend.',
    growth:'Progression de la croissance',
    step0:'Entreprise inconnue', step1:'Diagnostic', step2:'Stratégie', step3:'Contenu', step4:'Publicités', step5:'Confiance', step6:'Prospects', step7:'Contrôle',
    vis:'Visibilité', tru:'Confiance', lea:'Prospects',
    marketControl:'Ce n\'est pas du marketing. C\'est le contrôle du marché.',
    chip1:'Stratégie verrouillée', chip2:'Machine à contenu active', chip3:'Prospects en mouvement', chip4:'Mode croissance',
    aboutEyebrow:'Qui nous sommes', aboutTitle:'Conçu pour l\'Éthiopie.', aboutTitleEm:'Construit pour gagner.',
    about1:'KABA LABS a été créé parce que les entreprises éthiopiennes méritaient mieux. Nous combinons production vidéo professionnelle, publicité basée sur les données et technologie moderne.',
    about2:'Nous savons comment les clients éthiopiens décident d\'acheter. Nous l\'avons prouvé avec 60+ clients.',
    astat1:'Entreprises transformées', astat2:'Cliniques dentaires actives', astat3:'Niveaux pour chaque budget',
    quote:'"Ce n\'est pas du marketing. C\'est le contrôle du marché."',
    workEyebrow:'Ce que nous faisons', workTitle:'Nous gérons', workTitleEm:'tout.',
    c1tag:'Médical & Dentaire', c1title:'10+ cliniques à Addis-Abeba',
    c2tag:'Publicité performante', c2title:'Meta · TikTok · Google Ads',
    c3tag:'Production vidéo', c3title:'Téléphone · Caméra · Cinéma',
    c4tag:'Systèmes de marque', c4title:'Systèmes qui évoluent',
    c5title:'Le niveau que personne ne peut atteindre',
    solverEyebrow:'Résolveur de problèmes',
    solverTitle:'Qu\'est-ce qui ralentit', solverTitleEm:'votre business ?',
    solverSub:'Choisissez votre vrai problème. Nous ne vendons pas du contenu aléatoire — nous réparons le chemin de l\'attention à la conversion.',
    prob0:'Personne ne nous connaît', prob1:'Nous publions mais sans résultats', prob2:'Nous avons essayé les pubs et perdu', prob3:'Notre contenu n\'est pas professionnel', prob4:'Nous ne savons pas par où commencer',
    kabaAnswer:'LA RÉPONSE KABA', solverCta:'Réglons ça ensemble →',
    compareEyebrow:'La différence',
    compareTitle:'La plupart vendent du contenu.', compareTitleEm:'Nous construisons la machine.',
    col1h:'Agences classiques', col2h:'KABA LABS',
    o1:'Publient et disparaissent', o2:'Focalisés sur les likes', o3:'Designs aléatoires', o4:'Pas de suivi', o5:'Forfaits universels', o6:'Contenu seulement',
    k1:'Stratégie avant exécution', k2:'Prospects, confiance, ventes', k3:'Direction de marque', k4:'Rapports mensuels', k5:'Adapté à votre modèle', k6:'Contenu + pubs + site + ventes',
    processEyebrow:'Comment ça marche', processTitle:'Processus simple.', processTitleEm:'Résultats réels.', processSub:'Nous gérons tout. Vous vous concentrez sur votre business.',
    ps1h:'Consultation gratuite', ps1p:'20 minutes. Nous comprenons votre business et vous disons exactement ce que nous recommandons. Sans engagement.',
    ps2h:'Nous construisons votre système', ps2p:'Bon forfait, tournage, mise en place des pubs. Vous approuvez tout avant le lancement.',
    ps3h:'Vous obtenez des clients', ps3p:'Pubs actives, contenu publié, téléphone qui sonne. Rapport mensuel et optimisation.',
    pkgTitle:'Choisissez votre', pkgTitleEm:'niveau.', pkgSub:'Trois niveaux. Neuf forfaits. Pour les entreprises qui refusent d\'être invisibles.',
    pkg1badge:'Niveau 01 — Production mobile', pkg1target:'Salons · Restaurants · Boutiques',
    pkg1f1:'10–20 vidéos par mois', pkg1f2:'2–6 visuels par mois', pkg1f3:'Gestion réseaux sociaux', pkg1f4:'Gestion des pubs Meta', pkg1f5:'Calendrier de contenu',
    pkg1ideal:'Entreprises qui veulent établir leur présence en ligne pour la première fois',
    pkg2badge:'★ Niveau 02 — Production caméra', pkg2target:'Cliniques · Écoles · Immobilier',
    pkg2f1:'14–28 vidéos par mois', pkg2f2:'4–8 visuels par mois', pkg2f3:'Gestion réseaux sociaux', pkg2f4:'Pubs Meta + TikTok', pkg2f5:'Rapport mensuel', pkg2f6:'Production caméra pro',
    pkg2ideal:'Entreprises prêtes pour la génération de leads sérieuse',
    pkg3badge:'Niveau 03 — Production cinématique', pkg3target:'Corporates · Concessionnaires',
    pkg3f1:'24–40 vidéos par mois', pkg3f2:'6–12 visuels par mois', pkg3f3:'Gestion réseaux sociaux', pkg3f4:'Meta + TikTok + Google', pkg3f5:'Modèle influenceur', pkg3f6:'CRM & automatisation', pkg3f7:'Gestionnaire dédié',
    pkg3ideal:'Marques qui veulent la domination totale du marché',
    idealFor:'Idéal pour', getQuote:'Obtenir un devis',
    pkgNote:'Les tarifs sont personnalisés selon votre business. Contactez-nous pour une consultation gratuite.',
    bookConsult:'Consultation gratuite',
    ctaEyebrow:'Prêt à commencer ?', ctaTitle:'Une conversation', ctaTitleEm:'change tout.',
    ctaSub:'Réservez une consultation gratuite de 20 minutes. Nous vous dirons exactement quel forfait convient. Sans engagement.',
    callNow:'Appeler maintenant', sendEmail:'Envoyer un email',
  }
};

// Problem solver answers
const solverAnswers = {
  en: [
    { title:'Visibility System', text:'We build your entire digital presence — professional profiles, optimized content, and targeted ads that put you in front of the right people in Addis every single day.' },
    { title:'Content Strategy', text:'Random posts don\'t work. We build a content system — consistent videos, graphics, and copy designed to educate your audience and make them choose you over competitors.' },
    { title:'Ad Management', text:'We don\'t just run ads — we build the full funnel. The right creative, the right audience, the right budget allocation. No more wasted money on campaigns that don\'t convert.' },
    { title:'Professional Production', text:'Phone footage is fine for some content. But your brand identity needs cinematic production. We shoot, edit, and produce content that makes your business look like the premium option.' },
    { title:'Free Strategy Session', text:'Start with a free 20-minute call. We\'ll assess your current situation, show you exactly what your competitors are doing, and recommend the right path for your business.' },
  ],
  am: [
    { title:'ታይነት ስርዓት', text:'ሙሉ ዲጂታል ቦታዎን እንገነባለን — ሙያዊ ፕሮፋይሎች፣ ተስተካክሎ ኮንተንት እና ታለሙ ማስታወቂያዎች።' },
    { title:'ኮንተንት ስትራቴጂ', text:'ድንገተኛ ፖስቶች አይሰሩም። ወጥ ቪዲዮዎች፣ ግራፊኮች እና ኮፒ ያካተተ የኮንተንት ስርዓት እንገነባለን።' },
    { title:'ማስታወቂያ አስተዳደር', text:'ማስታወቂያ ብቻ አናሮጥም — ሙሉ ፈናል እንሰራለን። ትክክለኛ ሳቢ፣ ትክክለኛ ታዳሚ፣ ትክክለኛ በጀት።' },
    { title:'ሙያዊ ፕሮዳክሽን', text:'ብራንድዎ ሲኒማ ፕሮዳክሽን ያስፈልገዋል። እናቀርባለን፣ እናርትዕ እና ቢዝነሶ ምርጥ ምርጫ እንዲሆን እናደርጋለን።' },
    { title:'ነጻ ስትራቴጂ ክፍለ ጊዜ', text:'ነጻ 20 ደቂቃ ጠርዞ ይጀምሩ። ሁናቴዎን እናቀምስ፣ ተወዳዳሪዎ ምን እያደረጉ ናቸው ይሳዩናቸው።' },
  ],
  fr: [
    { title:'Système de visibilité', text:'Nous construisons toute votre présence digitale — profils professionnels, contenu optimisé et publicités ciblées pour vous mettre devant les bonnes personnes.' },
    { title:'Stratégie de contenu', text:'Les publications aléatoires ne fonctionnent pas. Nous construisons un système — vidéos cohérentes, visuels et textes conçus pour éduquer et convaincre.' },
    { title:'Gestion des publicités', text:'Nous ne gérons pas que les pubs — nous construisons le tunnel complet. Le bon créatif, la bonne audience, la bonne allocation de budget.' },
    { title:'Production professionnelle', text:'Votre identité de marque nécessite une production cinématique. Nous filmons, montrons et produisons du contenu qui fait de votre entreprise l\'option premium.' },
    { title:'Session stratégique gratuite', text:'Commencez par un appel gratuit de 20 minutes. Nous évaluerons votre situation et recommanderons le bon chemin pour votre business.' },
  ]
};

// Roadmap steps data
const roadmapSteps = {
  en: [
    { num:'01', title:'Unknown Business', text:'Weak signal. Low trust. No clear reason for the market to care.', metric:'0 → 1' },
    { num:'02', title:'Diagnose', text:'We scan your offer, audience, competitors, content, and sales flow.', metric:'CLARITY' },
    { num:'03', title:'Strategy', text:'A custom growth plan built around your market, budget, and goals.', metric:'DIRECTION' },
    { num:'04', title:'Content', text:'Professional videos and graphics produced and published consistently.', metric:'VISIBILITY' },
    { num:'05', title:'Ads Live', text:'Targeted campaigns running on Meta, TikTok, or Google — reaching your exact customer.', metric:'REACH' },
    { num:'06', title:'Trust Builds', text:'Your brand becomes the trusted choice. Customers recognize and prefer you.', metric:'AUTHORITY' },
    { num:'07', title:'Leads Flow', text:'Consistent inquiries, calls, and bookings coming in from digital channels.', metric:'LEADS' },
    { num:'08', title:'Market Control', text:'You dominate your category in Addis. The market knows your name.', metric:'CONTROL' },
  ],
  am: [
    { num:'01', title:'ያልታወቀ ቢዝነስ', text:'ዝቅተኛ ምልክት። ዝቅተኛ እምነት። ገበያው ለምን ያስፈልጋል።', metric:'0 → 1' },
    { num:'02', title:'ምርመራ', text:'አቅርቦትዎን፣ ታዳሚዎን፣ ተወዳዳሪዎን እናቀምሳለን።', metric:'ግልጽነት' },
    { num:'03', title:'ስትራቴጂ', text:'ለገበያዎ፣ በጀቶ እና ዓላማዎ የተዘጋጀ ብጁ የእድገት ዕቅድ።', metric:'አቅጣጫ' },
    { num:'04', title:'ኮንተንት', text:'ሙያዊ ቪዲዮዎች እና ግራፊኮች በተከታታይ ይቀርባሉ።', metric:'ታይነት' },
    { num:'05', title:'ማስታወቂያ', text:'Meta TikTok ወይም Google ላይ ትክክለኛ ደንበኞ ላይ ዘምቻ።', metric:'ደርሶሽ' },
    { num:'06', title:'እምነት', text:'ብራንድዎ ታማኝ ምርጫ ይሆናል። ደንበኞ ያስታውሱዎ።', metric:'ሥልጣን' },
    { num:'07', title:'ደንበኞች', text:'ከዲጂታል ቻናሎች ወጥ ጥያቄዎች ይመጣሉ።', metric:'ሊድ' },
    { num:'08', title:'ቁጥጥር', text:'በአዲስ አበባ ምድብዎን ይቆጣጠራሉ። ገበያው ስምዎን ያውቃል።', metric:'ቁጥጥር' },
  ],
  fr: [
    { num:'01', title:'Entreprise inconnue', text:'Signal faible. Confiance basse. Aucune raison claire pour le marché de s\'intéresser.', metric:'0 → 1' },
    { num:'02', title:'Diagnostic', text:'Nous analysons votre offre, audience, concurrents, contenu et flux de ventes.', metric:'CLARTÉ' },
    { num:'03', title:'Stratégie', text:'Un plan de croissance sur mesure construit autour de votre marché et vos objectifs.', metric:'DIRECTION' },
    { num:'04', title:'Contenu', text:'Vidéos et visuels professionnels produits et publiés régulièrement.', metric:'VISIBILITÉ' },
    { num:'05', title:'Publicités', text:'Campagnes ciblées sur Meta, TikTok ou Google — atteignant votre client exact.', metric:'PORTÉE' },
    { num:'06', title:'Confiance', text:'Votre marque devient le choix de confiance. Les clients vous reconnaissent.', metric:'AUTORITÉ' },
    { num:'07', title:'Prospects', text:'Des demandes, appels et réservations cohérents arrivent des canaux digitaux.', metric:'PROSPECTS' },
    { num:'08', title:'Contrôle', text:'Vous dominez votre catégorie à Addis. Le marché connaît votre nom.', metric:'CONTRÔLE' },
  ]
};

// ══════════════════════════════════
// STATE
// ══════════════════════════════════
let lang = 'en';
let activeProblem = 0;

// ══════════════════════════════════
// CURSOR
// ══════════════════════════════════
const cur=document.getElementById('cursor'),ring=document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;if(cur){cur.style.left=mx+'px';cur.style.top=my+'px'}});
(function l(){rx+=(mx-rx)*.09;ry+=(my-ry)*.09;if(ring){ring.style.left=rx+'px';ring.style.top=ry+'px'}requestAnimationFrame(l)})();
document.querySelectorAll('a,button,.wcard,.wr-item,.pkg-card,.proof-tag,.fi-contact,.proof-stat,.solver-problem,.process-step,.compare-col li,.rm-step-item').forEach(el=>{
  el.addEventListener('mouseenter',()=>{document.body.classList.add('ch');if(ring){ring.style.width='52px';ring.style.height='52px';ring.style.borderColor='rgba(201,148,10,.7)'}});
  el.addEventListener('mouseleave',()=>{document.body.classList.remove('ch');if(ring){ring.style.width='36px';ring.style.height='36px';ring.style.borderColor='rgba(201,148,10,.35)'}});
});

// ══════════════════════════════════
// INTRO
// ══════════════════════════════════
const intro=document.getElementById('intro');
const site=document.getElementById('site');
const sLetters=[document.getElementById('sl-k'),document.getElementById('sl-a1'),document.getElementById('sl-b'),document.getElementById('sl-a2')];
const stacked=document.getElementById('stacked');
const horizontal=document.getElementById('horizontal');
const hWord=document.getElementById('h-word');
const hLine=document.getElementById('h-line');
const hLabs=document.getElementById('h-labs');
const hTag=document.getElementById('h-tag');
const enterBtn=document.getElementById('enter-btn');

function runIntro(){
  sLetters.forEach((l,i)=>{ if(l) setTimeout(()=>l.classList.add('drop'),300+i*280) });
  const collapseAt=300+sLetters.length*280+500;
  setTimeout(()=>{
    stacked.style.transition='opacity .35s,transform .35s';
    stacked.style.opacity='0';stacked.style.transform='scale(.97)';
    setTimeout(()=>{
      stacked.style.display='none';
      horizontal.style.opacity='1';
      setTimeout(()=>hWord.classList.add('show'),50);
      setTimeout(()=>hLine.classList.add('expand'),350);
      setTimeout(()=>hLabs.classList.add('show'),550);
      setTimeout(()=>hTag.classList.add('show'),800);
      setTimeout(()=>enterBtn.classList.add('show'),1100);
    },380);
  },collapseAt);
}

if(enterBtn){
  enterBtn.addEventListener('click',()=>{
    intro.classList.add('exit');
    site.classList.add('visible');
    document.body.style.overflow='auto';
    setTimeout(()=>{intro.style.display='none';showCard(0);initRoadmap()},900);
  });
}
document.body.style.overflow='hidden';
setTimeout(runIntro,300);

// ══════════════════════════════════
// I18N
// ══════════════════════════════════
function applyLang(l){
  lang=l;
  const t=i18n[l];
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key=el.dataset.i18n;
    if(t[key]!==undefined) el.textContent=t[key];
  });
  // Update solver answer
  updateSolverAnswer(activeProblem);
  // Update roadmap steps
  updateRoadmapStep(currentRmStep);
  // Update lang buttons
  document.querySelectorAll('.lang-btn').forEach(b=>{
    b.classList.toggle('active',b.dataset.lang===l);
  });
}

document.querySelectorAll('.lang-btn').forEach(btn=>{
  btn.addEventListener('click',()=>applyLang(btn.dataset.lang));
});

// ══════════════════════════════════
// NAV
// ══════════════════════════════════
const nav=document.getElementById('nav');
const burger=document.getElementById('burger');
const mobileNav=document.getElementById('mobile-nav');
window.addEventListener('scroll',()=>{if(nav)nav.classList.toggle('scrolled',window.scrollY>60)},{passive:true});
if(burger){burger.addEventListener('click',()=>{burger.classList.toggle('open');mobileNav.classList.toggle('open')})}
document.querySelectorAll('.mnl').forEach(el=>el.addEventListener('click',()=>{if(burger)burger.classList.remove('open');if(mobileNav)mobileNav.classList.remove('open')}));

// ══════════════════════════════════
// SCROLL CARDS
// ══════════════════════════════════
const cards=document.querySelectorAll('.wcard');
const wrItems=document.querySelectorAll('.wr-item');
const TOTAL=cards.length;
let current=-1,isTransitioning=false;
const cardLabels=['Dental & Medical','Performance Ads','Video Production','Brand Systems','KABA ELITE'];
const glows=[
  'radial-gradient(ellipse 70% 60% at 42% 50%,rgba(100,20,200,.18) 0%,transparent 65%)',
  'radial-gradient(ellipse 70% 60% at 42% 50%,rgba(10,90,220,.16) 0%,transparent 65%)',
  'radial-gradient(ellipse 70% 60% at 42% 50%,rgba(200,50,20,.16) 0%,transparent 65%)',
  'radial-gradient(ellipse 70% 60% at 42% 50%,rgba(10,160,60,.14) 0%,transparent 65%)',
  'radial-gradient(ellipse 70% 60% at 42% 50%,rgba(200,160,0,.16) 0%,transparent 65%)',
];

function showCard(idx){
  if(idx===current||isTransitioning)return;
  isTransitioning=true;
  const prev=current;current=idx;
  if(prev>=0){const c=cards[prev];c.classList.remove('active','entering');c.style.animation='';c.classList.add('leaving');setTimeout(()=>{c.classList.remove('leaving');c.style.cssText=''},700)}
  const nc=cards[idx];nc.classList.remove('prev','next','leaving');nc.style.cssText='';nc.classList.add('entering');
  setTimeout(()=>{nc.classList.add('active');nc.classList.remove('entering');isTransitioning=false},860);
  const wn=document.getElementById('wr-num'),wl=document.getElementById('wr-label');
  if(wn){wn.textContent=String(idx+1).padStart(2,'0');wn.classList.add('lit');setTimeout(()=>wn.classList.remove('lit'),600)}
  if(wl)wl.textContent=cardLabels[idx];
  wrItems.forEach((it,i)=>it.classList.toggle('active',i===idx));
  const g=document.getElementById('work-glow');if(g)g.style.background=glows[idx];
  if(idx>0){const sc=document.getElementById('scue');if(sc)sc.style.opacity='0'}
  const pb=document.getElementById('card-prev'),nb=document.getElementById('card-next');
  if(pb)pb.style.opacity=idx===0?'0.3':'1';
  if(nb)nb.style.opacity=idx===TOTAL-1?'0.3':'1';
}

window.addEventListener('scroll',()=>{
  const s=document.getElementById('work');if(!s)return;
  const scrolled=window.scrollY-s.offsetTop;
  const total=s.offsetHeight-window.innerHeight;
  const prog=Math.max(0,Math.min(1,scrolled/total));
  const idx=Math.min(TOTAL-1,Math.floor(prog*TOTAL));
  if(scrolled>-window.innerHeight/2)showCard(idx);
},{passive:true});

wrItems.forEach((it,i)=>it.addEventListener('click',()=>showCard(i)));
document.getElementById('card-prev')?.addEventListener('click',()=>{if(current>0)showCard(current-1)});
document.getElementById('card-next')?.addEventListener('click',()=>{if(current<TOTAL-1)showCard(current+1)});

const wl2=document.querySelector('.work-left');
if(wl2){
  wl2.addEventListener('mousemove',e=>{
    if(current<0)return;
    const r=wl2.getBoundingClientRect();
    const cx=(e.clientX-r.left)/r.width-.5,cy=(e.clientY-r.top)/r.height-.5;
    const c=cards[current];
    if(c&&c.classList.contains('active')){c.style.marginLeft=`${cx*14}px`;c.style.marginTop=`${cy*10}px`;c.style.transform=`rotateY(${cx*5}deg) rotateX(${-cy*3}deg)`}
  });
  wl2.addEventListener('mouseleave',()=>{if(current>=0){const c=cards[current];if(c){c.style.marginLeft='0';c.style.marginTop='0';c.style.transform=''}}});
}

// ══════════════════════════════════
// ROADMAP ANIMATION
// ══════════════════════════════════
let currentRmStep = 0;
let rmInitialized = false;

// Road path points for traveler position (percentage along path)
const pathPoints = [
  {x:6,y:84},{x:20,y:60},{x:34,y:54},{x:48,y:37},
  {x:60,y:54},{x:72,y:37},{x:82,y:24},{x:93,y:15}
];

function updateRoadmapStep(idx){
  currentRmStep = idx;
  const steps = roadmapSteps[lang] || roadmapSteps.en;
  const step = steps[idx] || steps[0];

  const numEl=document.getElementById('rm-step-num');
  const titleEl=document.getElementById('rm-step-title');
  const textEl=document.getElementById('rm-step-text');
  const metricEl=document.getElementById('rm-step-metric');
  const labelEl=document.getElementById('rm-progress-label');

  if(numEl) numEl.textContent=step.num;
  if(titleEl) titleEl.textContent=step.title;
  if(textEl) textEl.textContent=step.text;
  if(metricEl) metricEl.textContent=step.metric;
  if(labelEl) labelEl.textContent=Math.round((idx/7)*100)+'%';

  // Update step list
  document.querySelectorAll('.rm-step-item').forEach((item,i)=>{
    item.classList.toggle('active',i===idx);
    item.classList.toggle('done',i<idx);
  });

  // Update nodes
  document.querySelectorAll('.rm-node').forEach((node,i)=>{
    node.classList.toggle('active',i<=idx);
  });

  // Move traveler
  const traveler=document.getElementById('rm-traveler');
  const wrap=document.querySelector('.rm-road-wrap');
  if(traveler&&wrap){
    const pt=pathPoints[idx];
    traveler.style.left=pt.x+'%';
    traveler.style.top=pt.y+'%';
  }

  // Update road progress
  const progressPath=document.getElementById('road-progress-path');
  if(progressPath){
    const total=2000;
    const filled=total*(idx/7);
    progressPath.style.strokeDashoffset=String(total-filled);
  }

  // Float stats
  document.getElementById('fs1')?.classList.toggle('show',idx>=3);
  document.getElementById('fs2')?.classList.toggle('show',idx>=5);
  document.getElementById('fs3')?.classList.toggle('show',idx>=6);
}

function initRoadmap(){
  if(rmInitialized)return;
  rmInitialized=true;
  updateRoadmapStep(0);
}

// Scroll drives roadmap
window.addEventListener('scroll',()=>{
  const stage=document.getElementById('roadmap-stage');
  if(!stage||!rmInitialized)return;
  const scrolled=window.scrollY-stage.offsetTop;
  const total=stage.offsetHeight-window.innerHeight;
  const prog=Math.max(0,Math.min(1,scrolled/total));
  const idx=Math.min(7,Math.floor(prog*8));
  if(idx!==currentRmStep) updateRoadmapStep(idx);
},{passive:true});

// Init roadmap when it comes into view
const rmObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)initRoadmap()});
},{threshold:.1});
const rmStage=document.getElementById('roadmap-stage');
if(rmStage)rmObs.observe(rmStage);

// Step list click
document.querySelectorAll('.rm-step-item').forEach((item,i)=>{
  item.addEventListener('click',()=>{
    const stage=document.getElementById('roadmap-stage');
    if(!stage)return;
    const total=stage.offsetHeight-window.innerHeight;
    window.scrollTo({top:stage.offsetTop+(i/8)*total+10,behavior:'smooth'});
  });
});

// ══════════════════════════════════
// PROBLEM SOLVER
// ══════════════════════════════════
function updateSolverAnswer(idx){
  activeProblem=idx;
  const answers=solverAnswers[lang]||solverAnswers.en;
  const answer=answers[idx]||answers[0];
  const titleEl=document.getElementById('solver-answer-title');
  const textEl=document.getElementById('solver-answer-text');
  if(titleEl) titleEl.textContent=answer.title;
  if(textEl) textEl.textContent=answer.text;
  document.querySelectorAll('.solver-problem').forEach((btn,i)=>btn.classList.toggle('active',i===idx));
}

document.querySelectorAll('.solver-problem').forEach((btn,i)=>{
  btn.addEventListener('click',()=>updateSolverAnswer(i));
});

// ══════════════════════════════════
// ACCORDION
// ══════════════════════════════════
document.querySelectorAll('.fi-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const id=btn.dataset.p,panel=document.getElementById(id),isOpen=panel.classList.contains('open');
    document.querySelectorAll('.fi-panel').forEach(p=>p.classList.remove('open'));
    document.querySelectorAll('.fi-btn').forEach(b=>b.classList.remove('open'));
    if(!isOpen){panel.classList.add('open');btn.classList.add('open')}
  });
});

// ══════════════════════════════════
// SCROLL REVEAL
// ══════════════════════════════════
const rvObs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')})},{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>rvObs.observe(el));

const fiObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      document.getElementById('fi-left')?.classList.add('visible');
      document.getElementById('fi-right')?.classList.add('visible');
    }
  });
},{threshold:.06});
const svc=document.getElementById('services');if(svc)fiObs.observe(svc);

// ══════════════════════════════════
// STAT COUNTERS
// ══════════════════════════════════
function animateCount(el,target,sfx){
  let start=null;const dur=1400;
  const step=ts=>{if(!start)start=ts;const p=Math.min((ts-start)/dur,1);const ease=1-Math.pow(1-p,3);el.textContent=Math.floor(ease*target)+sfx;if(p<1)requestAnimationFrame(step)};
  requestAnimationFrame(step);
}
const statObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('.proof-stat-num[data-count]').forEach(el=>{
        const t=parseInt(el.dataset.count);animateCount(el,t,t>=60?'+':t>=10?'+':'');
      });
      statObs.unobserve(e.target);
    }
  });
},{threshold:.3});
const pp=document.querySelector('.proof-panel');if(pp)statObs.observe(pp);

// ══════════════════════════════════
// HERO PARALLAX
// ══════════════════════════════════
window.addEventListener('scroll',()=>{
  const hero=document.getElementById('hero');
  if(hero&&window.scrollY<window.innerHeight)hero.style.transform=`translateY(${window.scrollY*.22}px)`;
},{passive:true});

})();
