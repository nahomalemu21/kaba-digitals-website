import React, { useState } from "react";

const services = [
  {
    icon: "🎥",
    title: "Video Production",
    subtitle: "Your business, shown professionally.",
    description: "Business videos, product videos, reels, testimonials, event coverage, and edited content that helps customers understand and trust your business.",
    items: ["Business promo videos", "Product videos", "Social media reels", "Video editing", "Content planning"],
  },
  {
    icon: "📣",
    title: "Online Advertising",
    subtitle: "Reach more customers online.",
    description: "We set up and manage ads that put your business in front of people who are more likely to call, message, visit, or buy.",
    items: ["Meta Ads", "Google Ads", "SMS campaigns", "Campaign setup", "Performance tracking"],
  },
  {
    icon: "🌐",
    title: "Websites & Landing Pages",
    subtitle: "Look trusted before customers contact you.",
    description: "Clean, mobile-friendly websites and landing pages that explain what you do, show your work, and make it easy for customers to reach you.",
    items: ["Website design", "Landing pages", "Basic SEO", "WhatsApp buttons", "Lead forms"],
  },
  {
    icon: "📊",
    title: "Monthly Growth Management",
    subtitle: "Consistent marketing, not random posting.",
    description: "Ongoing content, ads, reports, and monthly improvements so your digital presence keeps moving.",
    items: ["Ads + content", "Social media management", "Monthly reports", "Strategy improvement", "Growth planning"],
  },
];

const steps = [
  ["Understand", "We learn your business, customers, offer, location, and current problems."],
  ["Plan", "We choose the right content, website, ads, and monthly plan for your goal."],
  ["Create", "We shoot, design, build, edit, write, and prepare everything professionally."],
  ["Launch", "We publish the website, content, campaigns, and tracking properly."],
  ["Improve", "We review results and improve the weak points every month."],
];

const industries = [
  "Restaurants & Cafes",
  "Clinics & Health Services",
  "Real Estate",
  "Fashion & Retail",
  "Schools & Training Centers",
  "Gyms & Fitness",
  "Hotels & Hospitality",
  "E-commerce Brands",
  "Professional Services",
  "Events & Entertainment",
];

const packages = [
  {
    name: "Presence",
    label: "For businesses starting online",
    points: ["Simple website or landing page", "Basic brand presentation", "Contact and WhatsApp setup", "One-time launch support"],
  },
  {
    name: "Content + Ads",
    label: "For businesses that need customers now",
    points: ["Video/photo content", "Meta or Google ad setup", "Campaign management", "Performance report"],
    featured: true,
  },
  {
    name: "Monthly Growth",
    label: "For businesses that want ongoing management",
    points: ["Content planning", "Social media management", "Ads management", "Monthly reporting and improvement"],
  },
];

function Check() {
  return <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-yellow-300 text-xs font-black text-black">✓</span>;
}

function LogoMark() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-11 w-11 overflow-hidden rounded-xl bg-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.35)]">
        <div className="absolute inset-x-2 bottom-2 h-7 bg-black [clip-path:polygon(50%_0%,100%_100%,0%_100%)]" />
        <div className="absolute left-[17px] top-[18px] h-7 w-2 rotate-[-22deg] bg-yellow-400" />
        <div className="absolute left-3 right-3 top-[19px] h-[2px] bg-yellow-400" />
        <div className="absolute left-[10px] right-[10px] top-[25px] h-[2px] bg-yellow-400" />
        <div className="absolute left-[7px] right-[7px] top-[31px] h-[2px] bg-yellow-400" />
      </div>
      <div className="leading-none">
        <div className="text-xl font-black tracking-tight text-white">KABA</div>
        <div className="text-[10px] font-semibold uppercase tracking-[0.32em] text-yellow-300">Digitals</div>
      </div>
    </div>
  );
}

function SectionHeader({ eyebrow, title, text }) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <div className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-yellow-300">{eyebrow}</div>
      <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">{title}</h2>
      {text && <p className="mt-5 text-base leading-8 text-zinc-300 md:text-lg">{text}</p>}
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-96 w-96 rounded-full bg-yellow-400/10 blur-3xl" />
        <div className="absolute bottom-[10%] right-[-8%] h-[28rem] w-[28rem] rounded-full bg-yellow-300/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:34px_34px] opacity-20" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/75 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#top" aria-label="Kaba Digitals home"><LogoMark /></a>
          <div className="hidden items-center gap-8 text-sm font-semibold text-zinc-300 lg:flex">
            <a className="transition hover:text-yellow-300" href="#services">Services</a>
            <a className="transition hover:text-yellow-300" href="#method">Method</a>
            <a className="transition hover:text-yellow-300" href="#work">Work</a>
            <a className="transition hover:text-yellow-300" href="#packages">Packages</a>
            <a className="transition hover:text-yellow-300" href="#contact">Contact</a>
          </div>
          <a href="#contact" className="hidden rounded-full bg-yellow-400 px-5 py-3 text-sm font-black text-black transition hover:bg-yellow-300 lg:inline-flex">Start a Project</a>
          <button onClick={() => setMenuOpen(!menuOpen)} className="rounded-xl border border-white/10 p-2 text-white lg:hidden">{menuOpen ? "✕" : "☰"}</button>
        </nav>
        {menuOpen && (
          <div className="border-t border-white/10 bg-zinc-950 px-5 py-5 lg:hidden">
            <div className="grid gap-4 text-sm font-semibold text-zinc-200">
              {["Services", "Method", "Work", "Packages", "Contact"].map((item) => (
                <a key={item} onClick={() => setMenuOpen(false)} href={`#${item.toLowerCase()}`}>{item}</a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main id="top" className="relative z-10">
        <section className="mx-auto grid min-h-[88vh] max-w-7xl items-center gap-12 px-5 py-20 md:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:py-28">
          <div className="animate-[fadeUp_.7s_ease-out]">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-300/30 bg-yellow-300/10 px-4 py-2 text-sm font-bold text-yellow-200">✦ Video. Websites. Ads. Growth.</div>
            <h1 className="max-w-5xl text-5xl font-black leading-[0.95] tracking-[-0.06em] text-white md:text-7xl lg:text-8xl">Make your business look trusted online.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-300 md:text-xl">Kaba Digitals helps Ethiopian businesses grow with professional videos, modern websites, online ads, and monthly digital management.</p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a href="#contact" className="group inline-flex items-center justify-center gap-3 rounded-full bg-yellow-400 px-7 py-4 text-base font-black text-black transition hover:bg-yellow-300">Start Your Project <span className="inline-block transition group-hover:translate-x-1">→</span></a>
              <a href="#services" className="inline-flex items-center justify-center gap-3 rounded-full border border-white/15 bg-white/5 px-7 py-4 text-base font-bold text-white transition hover:border-yellow-300/50 hover:bg-yellow-300/10">See Services</a>
            </div>
            <div className="mt-12 grid max-w-2xl grid-cols-3 gap-3 border-t border-white/10 pt-6">
              <div><div className="text-2xl font-black text-white">01</div><div className="mt-1 text-sm text-zinc-400">Clear offer</div></div>
              <div><div className="text-2xl font-black text-white">02</div><div className="mt-1 text-sm text-zinc-400">Strong content</div></div>
              <div><div className="text-2xl font-black text-white">03</div><div className="mt-1 text-sm text-zinc-400">More leads</div></div>
            </div>
          </div>

          <div className="relative animate-[fadeIn_.8s_ease-out]">
            <div className="absolute -inset-6 rounded-[2rem] bg-yellow-400/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 shadow-2xl">
              <div className="border-b border-white/10 bg-white/[0.03] px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                  <span className="ml-3 text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">Kaba Growth Board</span>
                </div>
              </div>
              <div className="p-5 md:p-7">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                    <div className="mb-8 text-3xl text-yellow-300">▶</div>
                    <div className="text-sm text-zinc-400">Content ready</div>
                    <div className="mt-1 text-3xl font-black">Video Campaign</div>
                  </div>
                  <div className="rounded-3xl border border-yellow-300/20 bg-yellow-300 p-5 text-black">
                    <div className="mb-8 text-3xl">↗</div>
                    <div className="text-sm font-bold text-black/60">Goal</div>
                    <div className="mt-1 text-3xl font-black">More Customers</div>
                  </div>
                </div>
                <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <div className="text-sm text-zinc-400">Simple customer journey</div>
                      <div className="text-xl font-black">See → Trust → Contact → Buy</div>
                    </div>
                    <div className="text-2xl text-yellow-300">✓</div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-4">
                    {["Video", "Website", "Ads", "Report"].map((item, i) => (
                      <div key={item} className="rounded-2xl bg-black/60 p-4 text-center">
                        <div className="mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-yellow-300 text-sm font-black text-black">{i + 1}</div>
                        <div className="text-sm font-bold">{item}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
                  <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                    <div className="mb-4 flex items-center gap-3 text-sm font-bold text-zinc-300"><span className="text-yellow-300">◉</span> Lead Actions</div>
                    <div className="space-y-3">
                      {["WhatsApp message", "Phone call", "Form request"].map((item) => (
                        <div key={item} className="flex items-center justify-between rounded-2xl bg-black/50 px-4 py-3 text-sm"><span>{item}</span><span className="text-yellow-300">✓</span></div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                    <div className="mb-6 text-2xl text-yellow-300">◆</div>
                    <div className="text-sm text-zinc-400">Brand meaning</div>
                    <div className="mt-1 text-2xl font-black">Raw stone into strong brand.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-yellow-400 py-5 text-black">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 text-sm font-black uppercase tracking-[0.18em] md:px-8">
            <span>Video Production</span><span>•</span><span>Websites</span><span>•</span><span>Meta Ads</span><span>•</span><span>Google Ads</span><span>•</span><span>Monthly Growth</span>
          </div>
        </section>

        <section id="services" className="px-5 py-24 md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader eyebrow="What We Do" title="Simple services. Serious execution." text="Your customers should understand your business quickly. We help you present it clearly, promote it properly, and turn attention into real inquiries." />
            <div className="grid gap-5 lg:grid-cols-4">
              {services.map((service) => (
                <div key={service.title} className="group rounded-[2rem] border border-white/10 bg-zinc-950 p-6 transition hover:-translate-y-1 hover:border-yellow-300/40 hover:bg-zinc-900">
                  <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-300 text-2xl text-black transition group-hover:scale-105">{service.icon}</div>
                  <h3 className="text-2xl font-black tracking-tight text-white">{service.title}</h3>
                  <p className="mt-2 font-bold text-yellow-300">{service.subtitle}</p>
                  <p className="mt-4 leading-7 text-zinc-400">{service.description}</p>
                  <ul className="mt-6 space-y-3">{service.items.map((item) => <li key={item} className="flex items-center gap-3 text-sm text-zinc-300"><Check /> {item}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 pb-24 md:px-8">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.2rem] border border-white/10 bg-zinc-950">
            <div className="grid lg:grid-cols-2">
              <div className="p-8 md:p-12">
                <div className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-yellow-300">Why Kaba</div>
                <h2 className="text-3xl font-black tracking-tight md:text-5xl">We do not just make things look nice.</h2>
                <p className="mt-6 text-lg leading-8 text-zinc-300">A video, website, or ad is only useful when customers understand your offer and know how to contact you. Kaba focuses on clear presentation, strong trust, and real customer action.</p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {[["Easy to understand", "No confusing agency language."], ["Built for Ethiopia", "Made for how local customers actually behave."], ["Business-first", "We think about sales, not only design."], ["Monthly improvement", "We keep improving what works."]].map(([title, text]) => (
                    <div key={title} className="rounded-3xl border border-white/10 bg-black/40 p-5"><div className="font-black text-white">{title}</div><div className="mt-2 text-sm leading-6 text-zinc-400">{text}</div></div>
                  ))}
                </div>
              </div>
              <div className="relative min-h-[380px] bg-yellow-300 p-8 text-black md:p-12">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,0,0,0.15)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.15)_50%,rgba(0,0,0,0.15)_75%,transparent_75%,transparent)] [background-size:32px_32px] opacity-20" />
                <div className="relative flex h-full flex-col justify-between">
                  <div><div className="text-sm font-black uppercase tracking-[0.24em]">Brand Meaning</div><h3 className="mt-5 text-5xl font-black leading-none tracking-[-0.05em] md:text-7xl">Raw stone. Strong brand.</h3></div>
                  <p className="mt-12 max-w-lg text-xl font-bold leading-8">Kaba means raw stone in Amharic. We take raw business potential and shape it into a stronger digital presence customers can trust.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="method" className="border-y border-white/10 bg-zinc-950 px-5 py-24 md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader eyebrow="Our Method" title="A clear process from idea to launch." text="Clients should never feel lost. We guide the work step by step, from the first conversation to the final result." />
            <div className="grid gap-4 md:grid-cols-5">
              {steps.map(([title, text], index) => (
                <div key={title} className="relative rounded-[1.7rem] border border-white/10 bg-black p-6">
                  <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-300 text-lg font-black text-black">{index + 1}</div>
                  <h3 className="text-xl font-black">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="px-5 py-24 md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader eyebrow="Work & Proof" title="Built to show what your business does." text="As your portfolio grows, this section becomes your strongest sales tool. Start with clean examples, behind-the-scenes content, and business results." />
            <div className="grid gap-5 lg:grid-cols-3">
              {[
                ["Business Promo Video", "Video Production", "A clear promotional video that explains the business, shows the location, and gives customers a reason to contact.", "▶"],
                ["Lead Landing Page", "Website & Ads", "A mobile-first page with services, trust points, WhatsApp CTA, and inquiry form for better lead conversion.", "🌐"],
                ["Monthly Growth Campaign", "Ads + Content", "A simple monthly plan with content, ad campaigns, and reporting so the business keeps showing up consistently.", "📣"],
              ].map(([title, type, text, icon]) => (
                <div key={title} className="overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950">
                  <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-yellow-300 to-yellow-500 text-black"><div className="rounded-full bg-black/90 p-5 text-3xl text-yellow-300">{icon}</div></div>
                  <div className="p-6"><div className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-300">{type}</div><h3 className="mt-3 text-2xl font-black">{title}</h3><p className="mt-3 leading-7 text-zinc-400">{text}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 pb-24 md:px-8">
          <div className="mx-auto max-w-7xl rounded-[2.2rem] border border-white/10 bg-zinc-950 p-8 md:p-12">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <div className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-yellow-300">Who We Help</div>
                <h2 className="text-3xl font-black tracking-tight md:text-5xl">For businesses that need customers to trust them faster.</h2>
                <p className="mt-5 text-lg leading-8 text-zinc-300">Whether you are a restaurant, clinic, shop, school, real estate company, or service provider — your online presence should make people confident enough to call you.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {industries.map((industry) => <div key={industry} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-sm font-bold text-zinc-200"><Check /> {industry}</div>)}
              </div>
            </div>
          </div>
        </section>

        <section id="packages" className="border-y border-white/10 bg-zinc-950 px-5 py-24 md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader eyebrow="Packages" title="Choose the level your business needs." text="Keep pricing flexible. Show the package direction, then quote based on the real work required." />
            <div className="grid gap-5 lg:grid-cols-3">
              {packages.map((pack) => (
                <div key={pack.name} className={`rounded-[2rem] border p-7 ${pack.featured ? "border-yellow-300 bg-yellow-300 text-black shadow-[0_0_50px_rgba(250,204,21,0.18)]" : "border-white/10 bg-black text-white"}`}>
                  {pack.featured && <div className="mb-5 inline-flex rounded-full bg-black px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-yellow-300">Most useful</div>}
                  <h3 className="text-3xl font-black tracking-tight">{pack.name}</h3>
                  <p className={`mt-3 leading-7 ${pack.featured ? "text-black/70" : "text-zinc-400"}`}>{pack.label}</p>
                  <ul className="mt-8 space-y-4">{pack.points.map((point) => <li key={point} className="flex gap-3 text-sm font-bold"><Check /> {point}</li>)}</ul>
                  <a href="#contact" className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-5 py-4 text-sm font-black transition ${pack.featured ? "bg-black text-white hover:bg-zinc-900" : "bg-white text-black hover:bg-yellow-300"}`}>Ask for Quote</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-24 md:px-8">
          <div className="mx-auto max-w-7xl"><SectionHeader eyebrow="FAQ" title="Clear answers for serious clients." />
            <div className="mx-auto grid max-w-4xl gap-4">
              {[
                ["Do you only make videos?", "No. Video is one of our main services, but we also build websites, landing pages, ads, social media management, and monthly digital growth plans."],
                ["Can you manage our social media every month?", "Yes. We can plan content, create posts, manage ads, and send monthly reports depending on the package."],
                ["Do you work with small businesses?", "Yes, but the business must be serious about improving its online presence. We can start simple and grow step by step."],
                ["How do we start?", "Send us your business name, what you sell, your goal, and what service you need. We will review and recommend the right plan."]
              ].map(([q, a]) => (
                <div key={q} className="rounded-3xl border border-white/10 bg-zinc-950 p-6"><h3 className="text-lg font-black text-white">{q}</h3><p className="mt-3 leading-7 text-zinc-400">{a}</p></div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="px-5 pb-24 md:px-8">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.4rem] border border-yellow-300/20 bg-yellow-300 text-black">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              <div className="p-8 md:p-12">
                <div className="mb-4 text-sm font-black uppercase tracking-[0.25em]">Start Here</div>
                <h2 className="text-4xl font-black leading-none tracking-[-0.05em] md:text-6xl">Ready to make your business look trusted online?</h2>
                <p className="mt-6 max-w-xl text-lg font-bold leading-8 text-black/70">Tell us what you need: video, website, ads, social media, or monthly management. We will help you choose the right next step.</p>
                <div className="mt-10 space-y-4 font-bold"><div>☎ +251 XXX XXX XXX</div><div>💬 WhatsApp / Telegram available</div><div>✉ hello@kabadigitals.com</div><div>📍 Addis Ababa, Ethiopia</div></div>
              </div>
              <div className="bg-black p-8 text-white md:p-12">
                <form className="grid gap-4">
                  <div><label className="mb-2 block text-sm font-bold text-zinc-300">Name</label><input className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 outline-none transition placeholder:text-zinc-600 focus:border-yellow-300" placeholder="Your name" /></div>
                  <div><label className="mb-2 block text-sm font-bold text-zinc-300">Business Name</label><input className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 outline-none transition placeholder:text-zinc-600 focus:border-yellow-300" placeholder="Your business name" /></div>
                  <div><label className="mb-2 block text-sm font-bold text-zinc-300">What do you need?</label><select className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 outline-none transition focus:border-yellow-300"><option>Video Production</option><option>Website / Landing Page</option><option>Online Advertising</option><option>Social Media Management</option><option>Monthly Growth Management</option><option>Not sure yet</option></select></div>
                  <div><label className="mb-2 block text-sm font-bold text-zinc-300">Message</label><textarea className="min-h-32 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 outline-none transition placeholder:text-zinc-600 focus:border-yellow-300" placeholder="Tell us about your business and goal" /></div>
                  <button type="button" className="mt-2 inline-flex items-center justify-center gap-3 rounded-full bg-yellow-300 px-6 py-4 font-black text-black transition hover:bg-yellow-200">Send Project Request →</button>
                  <p className="text-center text-xs leading-6 text-zinc-500">This form is a design preview. Connect it to WhatsApp, email, or a CRM before launch.</p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10 bg-black px-5 py-10 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <LogoMark />
          <div className="text-sm text-zinc-500">© 2026 Kaba Digitals. Videos, websites, and ads built to grow your business.</div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; transform: scale(.96); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
}
