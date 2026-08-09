import { useEffect, useState } from "react";
import "./Bounty.css";

const kabaLogo = "/bounty-assets/brand/KABA_LABS_clean_proper_vector_preview.png";

const fallbackCampaigns = [
  {
    id: "kaba-labs",
    slug: "kaba-labs",
    brand: "Kaba Labs",
    category: "Marketing",
    title: "Show what real business growth support looks like",
    description:
      "Create a clear, original video showing how Kaba Labs diagnoses business problems and builds the right growth system.",
    rate: 200,
    cap: 10000,
    slots: 8,
    window: 14,
    payoutDay: "Friday",
    accent: "kaba-labs",
    initials: "KL",
    featured: true,
    logo: kabaLogo,
    pdf: "/bounty-assets/briefs/kaba-labs-creator-brief.pdf",
    objective:
      "Help Ethiopian business owners understand that Kaba Labs is an accountable growth partner, not only a content-production agency.",
    audience: "Ethiopian founders, business owners, and managers who need stronger marketing and sales systems.",
    message: "Kaba Labs diagnoses the real bottleneck, prioritizes the right work, and stays accountable for execution.",
    angles: [
      "Explain why more content does not always fix a business.",
      "Show the difference between buying deliverables and hiring a growth partner.",
      "Break down one common business-growth bottleneck.",
    ],
    hooks: [
      "Eight videos cannot fix the wrong business problem.",
      "Your ads may not be the real reason sales are slow.",
      "This is what a real outsourced growth team should do.",
    ],
    must: [
      "Say Kaba Labs clearly.",
      "Explain diagnosis before deliverables.",
      "Use original examples and your own presentation style.",
    ],
    avoid: [
      "Guaranteed revenue claims.",
      "Invented client results.",
      "Purchased views, copied scripts, or paid boosting.",
    ],
  },
  {
    id: "akbari-planner",
    brand: "Akbari Planner",
    category: "Productivity",
    title: "Show how you plan a better week",
    description:
      "Create a native TikTok showing how Akbari helps students, founders, or busy professionals organize their week.",
    rate: 200,
    cap: 10000,
    slots: 8,
    accent: "akbari",
    initials: "AP",
    featured: false,
    pdf: "/bounty-assets/briefs/akbari-planner-creator-brief.pdf",
    objective:
      "Make Akbari feel like a practical tool that helps real people plan their week, protect their time, and follow through on priorities.",
    audience: "Students, founders, professionals, freelancers, and anyone who wants more structure.",
    message: "A better week starts when you can clearly see what matters and decide where your time goes.",
    angles: [
      "Plan a realistic week in under five minutes.",
      "Show the difference between a chaotic week and an organized one.",
      "Use Akbari for study planning, business goals, or personal habits.",
    ],
    hooks: [
      "If every Monday feels like starting from zero, try this.",
      "This is how I stopped forgetting the important parts of my week.",
      "I planned my whole week in five minutes using an Ethiopian planner.",
    ],
    must: [
      "Show or mention Akbari Planner in the first 8 seconds.",
      "Demonstrate one real use case instead of only listing features.",
      "Use your own voice, footage, and honest experience.",
    ],
    avoid: [
      "Guaranteeing success or productivity.",
      "Copying another creator's script or video.",
      "Paid boosting, purchased views, or engagement groups.",
    ],
  },
  {
    id: "gizet",
    brand: "Gizet",
    category: "Marketplace",
    title: "Introduce the marketplace Ethiopia deserves",
    description:
      "Make an original video about discovering useful products and local businesses through Gizet.",
    rate: 175,
    cap: 7500,
    slots: 10,
    accent: "gizet",
    initials: "GZ",
    featured: false,
    pdf: "/bounty-assets/briefs/gizet-creator-brief.pdf",
    objective:
      "Help Ethiopians understand that Gizet is a marketplace where customers discover useful products and local businesses reach more buyers.",
    audience: "Online shoppers, small-business owners, product lovers, and people looking for local options.",
    message: "Gizet brings products and Ethiopian businesses together in one marketplace where there is room for everyone.",
    angles: [
      "Find three useful or surprising products on Gizet.",
      "Explain why Ethiopia needs a stronger local marketplace.",
      "Speak to a small business owner who wants to sell online.",
    ],
    hooks: [
      "Why is finding a simple product online still this difficult in Ethiopia?",
      "I found an Ethiopian marketplace you should know about.",
      "If you own a business in Ethiopia, this could help people find you.",
    ],
    must: [
      "Say or show the name Gizet clearly.",
      "Show at least one real page, product, or marketplace interaction.",
      "Describe Gizet as a marketplace, not the seller of every product.",
    ],
    avoid: [
      "Unconfirmed delivery times, discounts, or guarantees.",
      "Misrepresenting a vendor's product or price.",
      "Copied footage, purchased views, or paid boosting.",
    ],
  },
  {
    id: "shaba-closet",
    brand: "Shaba Closet",
    category: "Fashion",
    title: "Style it your way",
    description:
      "Create a fashion-first video featuring a Shaba Closet look, styling idea, or honest product story.",
    rate: 150,
    cap: 7500,
    slots: 6,
    accent: "shaba",
    initials: "SC",
    featured: false,
    pdf: "/bounty-assets/briefs/shaba-closet-creator-brief.pdf",
    objective:
      "Create fashion content that makes Shaba Closet feel expressive and relevant to the creator's own style instead of looking like a standard advertisement.",
    audience: "Fashion-conscious Ethiopian shoppers looking for outfit inspiration and confident personal style.",
    message: "Style is personal. Shaba Closet gives you more ways to build a look that feels like you.",
    angles: [
      "Build one outfit around a Shaba Closet item.",
      "Show three ways to style one piece.",
      "Create a before-and-after outfit transformation.",
    ],
    hooks: [
      "One piece, three completely different looks.",
      "This outfit looked basic until I changed one thing.",
      "I tried styling this the way I would actually wear it in Addis.",
    ],
    must: [
      "Feature Shaba Closet or the approved item clearly.",
      "Show the complete look in good lighting.",
      "Be honest about fit and styling; do not invent details.",
    ],
    avoid: [
      "Unconfirmed claims about stock, delivery, or sizing.",
      "Heavily changing the product's color or appearance.",
      "Reused footage, purchased views, or engagement groups.",
    ],
  },
];

function formatBirr(amount) {
  return new Intl.NumberFormat("en-US").format(amount) + " ETB";
}

const campaignOrder = ["kaba-labs", "kaba-bounty", "akbari-planner", "gizet", "shaba-closet"];

function orderCampaigns(items) {
  return [...items].sort((left, right) => {
    const leftKey = left.slug || left.companySlug || left.id;
    const rightKey = right.slug || right.companySlug || right.id;
    const leftIndex = campaignOrder.indexOf(leftKey);
    const rightIndex = campaignOrder.indexOf(rightKey);
    return (leftIndex < 0 ? campaignOrder.length : leftIndex) - (rightIndex < 0 ? campaignOrder.length : rightIndex);
  });
}

function CampaignMark({ campaign }) {
  return (
    <span className={`campaign-logo ${campaign.accent || "default"}`}>
      {campaign.logo ? <img src={campaign.logo} alt="" /> : campaign.initials}
    </span>
  );
}

export default function BountyApp() {
  const [campaigns, setCampaigns] = useState(fallbackCampaigns);
  const [views, setViews] = useState(50000);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [modalStage, setModalStage] = useState("brief");
  const orderedCampaigns = orderCampaigns(campaigns);
  const averageRate = orderedCampaigns.length
    ? Math.round(orderedCampaigns.reduce((sum, campaign) => sum + Number(campaign.rate || 0), 0) / orderedCampaigns.length)
    : 175;
  const earnings = Math.round((views / 1000) * averageRate);
  const featuredCampaign = orderedCampaigns.find((campaign) => (campaign.slug || campaign.companySlug) === "kaba-labs")
    || orderedCampaigns.find((campaign) => campaign.featured)
    || orderedCampaigns[0]
    || fallbackCampaigns[0];

  useEffect(() => {
    let cancelled = false;
    fetch("/api/bounties")
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("Could not load bounties")))
      .then((payload) => {
        if (!cancelled && Array.isArray(payload.campaigns) && payload.campaigns.length) {
          setCampaigns(orderCampaigns(payload.campaigns));
        }
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedCampaign ? "hidden" : "";
    const closeOnEscape = (event) => {
      if (event.key === "Escape" && !submitting) setSelectedCampaign(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedCampaign, submitting]);

  function openCampaign(campaign) {
    setSelectedCampaign(campaign);
    setSubmitted(false);
    setFormError("");
    setModalStage("brief");
  }

  function closeCampaign() {
    if (!submitting) setSelectedCampaign(null);
  }

  function applyToCampaign(campaign) {
    openCampaign(campaign);
    setModalStage("apply");
  }

  async function submitApplication(event) {
    event.preventDefault();
    if (!selectedCampaign) return;

    setSubmitting(true);
    setFormError("");
    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/bounty-application", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          campaignId: selectedCampaign.id,
          campaignName: selectedCampaign.brand,
          fullName: form.get("fullName"),
          phone: form.get("phone"),
          platform: form.get("platform"),
          socialHandle: form.get("socialHandle"),
          contentStyle: form.get("contentStyle"),
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not submit your application.");
      setSubmitted(true);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="bounty-app">
      <header className="site-header">
        <a className="brand-lockup" href="#top" aria-label="Kaba Bounty home">
          <img className="kaba-logo" src={kabaLogo} width={92} height={40} alt="Kaba Labs" />
          <span className="product-name">
            <strong>Bounty</strong>
            <small>Creator network</small>
          </span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#campaigns">Open campaigns</a>
          <a href="#how-it-works">How it works</a>
          <a href="#brands">For businesses</a>
        </nav>
        <a className="header-cta" href="#campaigns">
          View campaigns <span aria-hidden="true">→</span>
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="featured-kicker">
            <span className="live-dot" />
            <strong>Featured bounty</strong>
            <span>Kaba Labs</span>
          </div>
          <p className="hero-category">Marketing · 8 creator slots</p>
          <h1>{featuredCampaign.title}</h1>
          <p className="hero-lede">
            {featuredCampaign.description}
          </p>
          <div className="hero-actions">
            <button className="button button-dark" type="button" onClick={() => openCampaign(featuredCampaign)}>
              View campaign brief <span aria-hidden="true">→</span>
            </button>
            <button className="text-link" type="button" onClick={() => applyToCampaign(featuredCampaign)}>Apply now</button>
          </div>
        </div>

        <aside className="featured-summary" aria-label="Kaba Labs bounty payment information">
          <div className="featured-brand">
            <CampaignMark campaign={featuredCampaign} />
            <div>
              <p>Campaign by</p>
              <h2>{featuredCampaign.brand}</h2>
            </div>
          </div>
          <div className="featured-metrics">
            <div><span>Creator rate</span><strong>{featuredCampaign.rate} ETB</strong><small>per 1,000 qualified views</small></div>
            <div><span>Maximum payout</span><strong>{formatBirr(featuredCampaign.cap)}</strong><small>per approved video</small></div>
            <div><span>View window</span><strong>{featuredCampaign.window || 14} days</strong><small>from publication</small></div>
            <div><span>Payout</span><strong>{featuredCampaign.payoutDay || "Friday"}</strong><small>after verification</small></div>
          </div>
          <p className="funding-note"><b>Funding:</b> This pilot bounty is paid directly by Kaba Labs.</p>
        </aside>
      </section>

      <section className="program-intro" aria-label="About Kaba Bounty">
        <p>Kaba Bounty</p>
        <h2>Open campaign briefs for Ethiopian creators.</h2>
        <p>Choose a campaign, apply with your creator profile, get approval before publishing, and earn from verified organic views.</p>
      </section>

      <section className="section how" id="how-it-works">
        <div className="section-heading">
          <p className="eyebrow"><span /> Process</p>
          <h2>How a bounty works</h2>
        </div>
        <div className="steps">
          <article>
            <span className="step-number">01</span>
            <h3>Choose a bounty</h3>
            <p>Pick a business and creative brief that fits your content and audience.</p>
          </article>
          <article>
            <span className="step-number">02</span>
            <h3>Apply and get approved</h3>
            <p>Send your creator profile. Kaba Labs confirms your slot and the final direction.</p>
          </article>
          <article>
            <span className="step-number">03</span>
            <h3>Create, publish and earn</h3>
            <p>Get the draft approved, publish it, and receive payment after your qualified views are verified.</p>
          </article>
        </div>
      </section>

      <section className="section campaigns-section" id="campaigns">
        <div className="campaigns-header">
          <div>
            <p className="eyebrow"><span /> Open now</p>
            <h2>Open campaigns</h2>
          </div>
          <p>Every campaign has its own rate, maximum payout and approval rules. Read the full brief before applying.</p>
        </div>

        <div className="campaign-grid">
          {orderedCampaigns.map((campaign) => (
            <article className={`campaign-card ${campaign.id === featuredCampaign.id ? "featured" : ""}`} key={campaign.id || campaign.brand}>
              <div className="campaign-card-head">
                <CampaignMark campaign={campaign} />
                <span className="category-pill">{campaign.category}</span>
              </div>
              <p className="brand-name">{campaign.brand}</p>
              <h3>{campaign.title}</h3>
              <p className="campaign-description">{campaign.description}</p>
              <div className="campaign-metrics">
                <div><span>Rate</span><strong>{campaign.rate} ETB</strong><small>per 1K views</small></div>
                <div><span>Max reward</span><strong>{formatBirr(campaign.cap)}</strong><small>per video</small></div>
              </div>
              <div className="campaign-card-footer">
                <span><i /> {campaign.slots} slots open</span>
                <button type="button" aria-label={`View ${campaign.brand} bounty`} onClick={() => openCampaign(campaign)}>View brief <b>→</b></button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="calculator-section">
        <div className="calculator-copy">
          <p className="eyebrow light"><span /> Estimate your reward</p>
          <h2>What could your next video earn?</h2>
          <p>Move the slider to estimate earnings at an average campaign rate of {averageRate} ETB per 1,000 qualified views.</p>
        </div>
        <div className="calculator-card">
          <div className="calculator-label"><span>Expected video views</span><strong>{views.toLocaleString()}</strong></div>
          <input
            aria-label="Expected video views"
            type="range"
            min="5000"
            max="100000"
            step="5000"
            value={views}
            onChange={(event) => setViews(Number(event.target.value))}
          />
          <div className="range-labels"><span>5K</span><span>100K</span></div>
          <div className="earning-result">
            <span>Estimated reward</span>
            <strong>{formatBirr(earnings)}</strong>
            <small>Final payout depends on each campaign&apos;s rate, cap, and verification.</small>
          </div>
        </div>
      </section>

      <section className="brand-cta" id="brands">
        <div>
          <p className="eyebrow"><span /> For businesses</p>
          <h2>Get talked about by creators people already trust.</h2>
        </div>
        <div>
          <p>Kaba Bounty turns a campaign budget into original creator content and measurable organic reach.</p>
          <a className="button button-dark" href="mailto:hello@kabalabs.et">Join the brand waitlist <span>→</span></a>
        </div>
      </section>

      <footer>
        <a className="brand-lockup" href="#top">
          <img className="kaba-logo" src={kabaLogo} width={92} height={40} alt="Kaba Labs" />
          <span className="product-name"><strong>Bounty</strong><small>Creator network</small></span>
        </a>
        <p>Built in Ethiopia for the next generation of creators.</p>
        <span>© 2026 Kaba Labs</span>
      </footer>

      {selectedCampaign && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeCampaign();
        }}>
          <section className="bounty-modal" role="dialog" aria-modal="true" aria-labelledby="bounty-title">
            <button className="modal-close" type="button" onClick={closeCampaign} aria-label="Close bounty details">×</button>

            {submitted ? (
              <div className="success-state">
                <span className="success-check">✓</span>
                <p className="eyebrow"><span /> Application received</p>
                <h2 id="bounty-title">You’re in the review queue.</h2>
                <p>Kaba Labs will check your creator profile and contact you with the next step for the {selectedCampaign.brand} bounty.</p>
                <button className="button button-dark" type="button" onClick={closeCampaign}>Explore other bounties <span>→</span></button>
              </div>
            ) : modalStage === "brief" ? (
              <>
                <aside className="brief-summary">
                  <div className="modal-brand-row">
                    <CampaignMark campaign={selectedCampaign} />
                    <div>
                      <p>{selectedCampaign.category}</p>
                      <strong>{selectedCampaign.brand}</strong>
                    </div>
                  </div>

                  <div>
                    <p className="eyebrow"><span /> Live creator bounty</p>
                    <h2 id="bounty-title">{selectedCampaign.title}</h2>
                    <p className="brief-summary-copy">{selectedCampaign.description}</p>
                  </div>

                  <div className="brief-quick-facts">
                    <div><span>Rate</span><strong>{selectedCampaign.rate} ETB</strong><small>per 1,000 qualified views</small></div>
                    <div><span>Maximum</span><strong>{formatBirr(selectedCampaign.cap)}</strong><small>per approved video</small></div>
                    <div><span>Window</span><strong>14 days</strong><small>views counted after posting</small></div>
                    <div><span>Payout</span><strong>Friday</strong><small>after verification</small></div>
                  </div>

                  <div className="brief-summary-actions">
                    <button className="button button-light" type="button" onClick={() => setModalStage("apply")}>Apply for this bounty <span>→</span></button>
                    {selectedCampaign.pdf && <a className="pdf-link-dark" href={selectedCampaign.pdf} target="_blank" rel="noreferrer">
                      <span className="pdf-icon">PDF</span>
                      <span><strong>Download full brief</strong><small>3 pages · campaign instructions</small></span>
                      <b>↓</b>
                    </a>}
                  </div>
                </aside>

                <div className="brief-detail">
                  <div className="brief-detail-heading">
                    <span>Campaign brief</span>
                    <h3>Everything you need before you create.</h3>
                    <p>Read the complete direction first. Your video should follow the rules while still sounding and looking like you.</p>
                  </div>

                  <section className="brief-block">
                    <span className="brief-number">01</span>
                    <div>
                      <p className="brief-label">Campaign objective</p>
                      <h4>What the content should achieve</h4>
                      <p>{selectedCampaign.objective}</p>
                      <div className="brief-message">
                        <span>Core message</span>
                        <strong>“{selectedCampaign.message}”</strong>
                      </div>
                      <p className="audience-line"><b>Target audience:</b> {selectedCampaign.audience}</p>
                    </div>
                  </section>

                  <section className="brief-block">
                    <span className="brief-number">02</span>
                    <div>
                      <p className="brief-label">Creative direction</p>
                      <h4>Choose an angle, then make it yours</h4>
                      <div className="brief-two-col">
                        <div>
                          <h5>Content angles</h5>
                          <ul>{selectedCampaign.angles.map((item) => <li key={item}>{item}</li>)}</ul>
                        </div>
                        <div>
                          <h5>Hook starters</h5>
                          <ul>{selectedCampaign.hooks.map((item) => <li key={item}>{item}</li>)}</ul>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="brief-block">
                    <span className="brief-number">03</span>
                    <div>
                      <p className="brief-label">Approval rules</p>
                      <h4>What gets approved and paid</h4>
                      <div className="compliance-grid">
                        <div className="include-box">
                          <h5>Must include</h5>
                          <ul>{selectedCampaign.must.map((item) => <li key={item}>{item}</li>)}</ul>
                        </div>
                        <div className="avoid-box">
                          <h5>Do not do</h5>
                          <ul>{selectedCampaign.avoid.map((item) => <li key={item}>{item}</li>)}</ul>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="brief-block brief-last">
                    <span className="brief-number">04</span>
                    <div>
                      <p className="brief-label">Submission</p>
                      <h4>Apply → approval → draft → publish → payout</h4>
                      <p>Submit your profile first. If selected, Kaba Labs confirms your slot and final CTA. Your idea or draft must be approved before publishing.</p>
                      <div className="format-strip"><b>Recommended:</b> 15–60 seconds · Vertical 9:16 · Clear voice · Strong first 3 seconds</div>
                    </div>
                  </section>

                  <div className="mobile-brief-actions">
                    <button className="button button-dark" type="button" onClick={() => setModalStage("apply")}>Apply for this bounty <span>→</span></button>
                    {selectedCampaign.pdf && <a href={selectedCampaign.pdf} target="_blank" rel="noreferrer">Download the full PDF brief ↓</a>}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="modal-intro">
                  <button className="back-to-brief" type="button" onClick={() => setModalStage("brief")}>← Back to brief</button>
                  <div className="modal-brand-row">
                    <CampaignMark campaign={selectedCampaign} />
                    <div><p>{selectedCampaign.category}</p><strong>{selectedCampaign.brand}</strong></div>
                  </div>
                  <p className="eyebrow"><span /> Creator application</p>
                  <h2 id="bounty-title">{selectedCampaign.title}</h2>
                  <p>{selectedCampaign.description}</p>
                  <div className="modal-reward-grid">
                    <div><span>Creator rate</span><strong>{selectedCampaign.rate} ETB</strong><small>per 1,000 qualified views</small></div>
                    <div><span>Maximum reward</span><strong>{formatBirr(selectedCampaign.cap)}</strong><small>per approved video</small></div>
                  </div>
                  {selectedCampaign.pdf && <a className="application-pdf-link" href={selectedCampaign.pdf} target="_blank" rel="noreferrer">Download campaign PDF ↓</a>}
                </div>

                <form className="application-form" onSubmit={submitApplication}>
                  <div className="form-heading">
                    <span>Creator application</span>
                    <h3>Apply for this bounty</h3>
                    <p>We’ll review your profile and contact you with the next step.</p>
                  </div>
                  <label>Full name<input name="fullName" placeholder="Your legal name" autoComplete="name" required /></label>
                  <label>Phone number<input name="phone" placeholder="09•• ••• •••" autoComplete="tel" inputMode="tel" required /></label>
                  <div className="field-row">
                    <label>Main platform<select name="platform" defaultValue="TikTok" required><option>TikTok</option><option>Instagram</option><option>Both</option></select></label>
                    <label>Username<input name="socialHandle" placeholder="@yourhandle" required /></label>
                  </div>
                  <label>Your content style<textarea name="contentStyle" placeholder="For example: product reviews, comedy, student life…" rows={3} required /></label>
                  <label className="check-label"><input type="checkbox" required /><span>I read the campaign brief, confirm my views will be organic, and agree to the rules.</span></label>
                  {formError && <p className="form-error" role="alert">{formError}</p>}
                  <button className="button button-dark submit-button" type="submit" disabled={submitting}>{submitting ? "Sending application…" : "Submit application"} <span>→</span></button>
                  <p className="privacy-note">Your details are only shared with Kaba Labs for campaign management.</p>
                </form>
              </>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
