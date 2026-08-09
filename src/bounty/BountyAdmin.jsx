import { useEffect, useMemo, useState } from "react";
import {
  Building2,
  Check,
  ChevronRight,
  ExternalLink,
  FileText,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  UploadCloud,
  Users,
  WalletCards,
  X,
} from "lucide-react";
import "./BountyAdmin.css";

const kabaLogo = "/bounty-assets/brand/KABA_LABS_clean_proper_vector_preview.png";

const newCompany = {
  name: "",
  slug: "",
  category: "",
  website: "",
  active: true,
};

const newCampaign = {
  name: "",
  companyId: "",
  slug: "",
  category: "",
  description: "",
  rate: 175,
  cap: 7500,
  slots: 10,
  status: "Draft",
  featured: false,
  window: 14,
  payoutDay: "Friday",
  objective: "",
  audience: "",
  message: "",
  angles: "",
  hooks: "",
  must: "",
  avoid: "",
};

function money(value) {
  return `${new Intl.NumberFormat("en-US").format(Number(value || 0))} ETB`;
}

function formatDate(value) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

async function request(action, payload = {}) {
  const response = await fetch("/api/bounty-admin", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ action, ...payload }),
  });
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.error || "The action could not be completed.");
    error.status = response.status;
    throw error;
  }
  return data;
}

function fileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function StatusPill({ value }) {
  return <span className={`admin-status status-${String(value || "draft").toLowerCase()}`}>{value}</span>;
}

function EmptyState({ icon: Icon, title, copy, action }) {
  return (
    <div className="admin-empty">
      <span><Icon size={22} /></span>
      <h3>{title}</h3>
      <p>{copy}</p>
      {action}
    </div>
  );
}

function Login({ onLogin }) {
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await request("login", { password });
      await onLogin();
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="admin-login-shell">
      <section className="admin-login-card">
        <div className="admin-login-brand">
          <img src={kabaLogo} alt="Kaba Labs" />
          <span><strong>Bounty</strong><small>Admin console</small></span>
        </div>
        <div className="admin-login-copy">
          <span className="admin-kicker"><ShieldCheck size={14} /> Private workspace</span>
          <h1>Run the creator reward pilot.</h1>
          <p>Manage companies, publish briefs, review creators and track every payout.</p>
        </div>
        <form onSubmit={submit}>
          <label>Admin password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoFocus autoComplete="current-password" required /></label>
          {error && <p className="admin-error" role="alert">{error}</p>}
          <button type="submit" disabled={busy}>{busy ? "Signing in…" : "Open admin"}<ChevronRight size={17} /></button>
        </form>
        <a href="/bounty">← Back to public bounties</a>
      </section>
    </main>
  );
}

function CompanyEditor({ company, onChange, onSave, onCancel, busy }) {
  const [logoFile, setLogoFile] = useState(null);

  return (
    <form className="admin-editor" onSubmit={(event) => { event.preventDefault(); onSave(logoFile); }}>
      <div className="editor-heading">
        <div><span>Company profile</span><h2>{company.id ? `Edit ${company.name}` : "Add a company"}</h2></div>
        <button className="icon-button" type="button" onClick={onCancel} aria-label="Close editor"><X size={18} /></button>
      </div>
      <div className="editor-grid two">
        <label>Company name<input value={company.name} onChange={(event) => onChange({ ...company, name: event.target.value })} placeholder="Kaba Labs" required /></label>
        <label>Category<input value={company.category || ""} onChange={(event) => onChange({ ...company, category: event.target.value })} placeholder="Marketing" /></label>
        <label>Website<input type="url" value={company.website || ""} onChange={(event) => onChange({ ...company, website: event.target.value })} placeholder="https://…" /></label>
        <label>URL slug<input value={company.slug || ""} onChange={(event) => onChange({ ...company, slug: event.target.value })} placeholder="Generated automatically" /></label>
      </div>
      <div className="upload-panel">
        <span className="upload-icon"><UploadCloud size={20} /></span>
        <div><strong>Company logo</strong><small>PNG, JPG, WebP or SVG · maximum 2.8 MB</small></div>
        <label className="file-button"><input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" onChange={(event) => setLogoFile(event.target.files?.[0] || null)} />{logoFile ? logoFile.name : company.logo ? "Replace logo" : "Choose logo"}</label>
      </div>
      {company.logo && !logoFile && <div className="current-file"><img src={company.logo} alt="" /><span>Current logo</span><a href={company.logo} target="_blank" rel="noreferrer"><ExternalLink size={14} /></a></div>}
      <label className="switch-row"><input type="checkbox" checked={company.active !== false} onChange={(event) => onChange({ ...company, active: event.target.checked })} /><span><strong>Company active</strong><small>Inactive companies are hidden from the public bounty page.</small></span></label>
      <div className="editor-actions"><button type="button" className="secondary-button" onClick={onCancel}>Cancel</button><button type="submit" className="primary-button" disabled={busy}>{busy ? "Saving…" : "Save company"}<Check size={16} /></button></div>
    </form>
  );
}

function CampaignEditor({ campaign, companies, onChange, onSave, onCancel, busy }) {
  const [briefFile, setBriefFile] = useState(null);
  const company = companies.find((item) => item.id === campaign.companyId);

  return (
    <form className="admin-editor campaign-editor" onSubmit={(event) => { event.preventDefault(); onSave(briefFile); }}>
      <div className="editor-heading">
        <div><span>Campaign builder</span><h2>{campaign.id ? "Edit bounty" : "Create a bounty"}</h2></div>
        <button className="icon-button" type="button" onClick={onCancel} aria-label="Close editor"><X size={18} /></button>
      </div>

      <section className="builder-step">
        <div className="builder-number">01</div>
        <div className="builder-content">
          <div className="builder-title"><span>Choose the business</span><h3>Who is funding this bounty?</h3></div>
          <label>Company<select value={campaign.companyId || ""} onChange={(event) => onChange({ ...campaign, companyId: event.target.value })} required><option value="">Select a company</option>{companies.filter((item) => item.active).map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}</select></label>
          {company && <div className="selected-company">{company.logo ? <img src={company.logo} alt="" /> : <span>{company.name.slice(0, 2).toUpperCase()}</span>}<div><strong>{company.name}</strong><small>{company.category}</small></div><Check size={18} /></div>}
        </div>
      </section>

      <section className="builder-step">
        <div className="builder-number">02</div>
        <div className="builder-content">
          <div className="builder-title"><span>Define the offer</span><h3>Reward, limit and availability</h3></div>
          <div className="editor-grid two">
            <label>Campaign title<input value={campaign.name} onChange={(event) => onChange({ ...campaign, name: event.target.value })} placeholder="Show what real growth support looks like" required /></label>
            <label>Category<input value={campaign.category || ""} onChange={(event) => onChange({ ...campaign, category: event.target.value })} placeholder={company?.category || "Campaign category"} /></label>
          </div>
          <label>Short public description<textarea rows={3} value={campaign.description || ""} onChange={(event) => onChange({ ...campaign, description: event.target.value })} placeholder="What should the creator make?" required /></label>
          <div className="reward-grid">
            <label>ETB per 1,000 views<input type="number" min="0" value={campaign.rate} onChange={(event) => onChange({ ...campaign, rate: event.target.value })} required /></label>
            <label>Maximum payout<input type="number" min="0" value={campaign.cap} onChange={(event) => onChange({ ...campaign, cap: event.target.value })} required /></label>
            <label>Creator slots<input type="number" min="0" value={campaign.slots} onChange={(event) => onChange({ ...campaign, slots: event.target.value })} required /></label>
            <label>View window (days)<input type="number" min="1" value={campaign.window} onChange={(event) => onChange({ ...campaign, window: event.target.value })} /></label>
          </div>
        </div>
      </section>

      <section className="builder-step">
        <div className="builder-number">03</div>
        <div className="builder-content">
          <div className="builder-title"><span>Creator instructions</span><h3>Upload the PDF and write the brief</h3></div>
          <div className="upload-panel large">
            <span className="upload-icon"><FileText size={20} /></span>
            <div><strong>Campaign guideline PDF</strong><small>Creators can download this before applying · maximum 2.8 MB</small></div>
            <label className="file-button"><input type="file" accept="application/pdf" onChange={(event) => setBriefFile(event.target.files?.[0] || null)} />{briefFile ? briefFile.name : campaign.pdf ? "Replace PDF" : "Choose PDF"}</label>
          </div>
          {campaign.pdf && !briefFile && <div className="current-file"><FileText size={18} /><span>Current creator brief</span><a href={campaign.pdf} target="_blank" rel="noreferrer"><ExternalLink size={14} /></a></div>}
          <label>Campaign objective<textarea rows={3} value={campaign.objective || ""} onChange={(event) => onChange({ ...campaign, objective: event.target.value })} placeholder="What should this content achieve?" /></label>
          <div className="editor-grid two"><label>Target audience<textarea rows={3} value={campaign.audience || ""} onChange={(event) => onChange({ ...campaign, audience: event.target.value })} /></label><label>Core message<textarea rows={3} value={campaign.message || ""} onChange={(event) => onChange({ ...campaign, message: event.target.value })} /></label></div>
          <div className="editor-grid two"><label>Content angles<textarea rows={5} value={campaign.angles || ""} onChange={(event) => onChange({ ...campaign, angles: event.target.value })} placeholder="One idea per line" /></label><label>Hook starters<textarea rows={5} value={campaign.hooks || ""} onChange={(event) => onChange({ ...campaign, hooks: event.target.value })} placeholder="One hook per line" /></label></div>
          <div className="editor-grid two"><label>Must include<textarea rows={5} value={campaign.must || ""} onChange={(event) => onChange({ ...campaign, must: event.target.value })} placeholder="One requirement per line" /></label><label>Creators must avoid<textarea rows={5} value={campaign.avoid || ""} onChange={(event) => onChange({ ...campaign, avoid: event.target.value })} placeholder="One restriction per line" /></label></div>
        </div>
      </section>

      <section className="builder-step last">
        <div className="builder-number">04</div>
        <div className="builder-content">
          <div className="builder-title"><span>Publishing</span><h3>Save it as a draft or make it live</h3></div>
          <div className="editor-grid two"><label>Status<select value={campaign.status} onChange={(event) => onChange({ ...campaign, status: event.target.value })}><option>Draft</option><option>Live</option><option>Paused</option><option>Closed</option></select></label><label>Payout day<input value={campaign.payoutDay || ""} onChange={(event) => onChange({ ...campaign, payoutDay: event.target.value })} placeholder="Friday" /></label></div>
          <label className="switch-row"><input type="checkbox" checked={Boolean(campaign.featured)} onChange={(event) => onChange({ ...campaign, featured: event.target.checked })} /><span><strong>Feature this bounty</strong><small>Use it as the primary campaign at the top of the public page.</small></span></label>
        </div>
      </section>

      <div className="editor-actions sticky"><button type="button" className="secondary-button" onClick={onCancel}>Cancel</button><button type="submit" className="primary-button" disabled={busy}>{busy ? "Saving bounty…" : campaign.status === "Live" ? "Save and publish" : "Save bounty"}<Check size={16} /></button></div>
    </form>
  );
}

function ApplicationEditor({ application, campaigns, onChange, onSave, onCancel, busy }) {
  const campaign = campaigns.find((item) => item.id === application.campaignId);
  const estimated = campaign ? Math.min((Number(application.verifiedViews || 0) / 1000) * campaign.rate, campaign.cap) : 0;
  return (
    <form className="admin-editor application-editor" onSubmit={(event) => { event.preventDefault(); onSave(); }}>
      <div className="editor-heading"><div><span>Creator application</span><h2>{application.name}</h2></div><button className="icon-button" type="button" onClick={onCancel}><X size={18} /></button></div>
      <div className="creator-profile"><span>{application.name.slice(0, 2).toUpperCase()}</span><div><strong>{application.socialHandle}</strong><small>{application.platform} · {application.phone}</small></div><StatusPill value={application.status} /></div>
      <div className="application-meta"><div><span>Campaign</span><strong>{application.campaign}</strong></div><div><span>Applied</span><strong>{formatDate(application.appliedAt)}</strong></div></div>
      <section className="application-note"><span>Creator style</span><p>{application.contentStyle || "No style description submitted."}</p></section>
      <div className="editor-grid two"><label>Status<select value={application.status} onChange={(event) => onChange({ ...application, status: event.target.value })}><option>New</option><option>Approved</option><option>Rejected</option><option>Published</option><option>Verified</option><option>Paid</option></select></label><label>Published video URL<input type="url" value={application.videoUrl || ""} onChange={(event) => onChange({ ...application, videoUrl: event.target.value })} placeholder="https://tiktok.com/…" /></label></div>
      <div className="editor-grid two"><label>Verified views<input type="number" min="0" value={application.verifiedViews || 0} onChange={(event) => onChange({ ...application, verifiedViews: event.target.value })} /></label><label>Payout amount (ETB)<input type="number" min="0" value={application.payoutAmount || ""} onChange={(event) => onChange({ ...application, payoutAmount: event.target.value })} placeholder={String(Math.round(estimated))} /></label></div>
      <div className="payout-preview"><span><WalletCards size={18} /> Calculated payout</span><strong>{money(estimated)}</strong><small>Based on verified views, campaign CPM and the maximum reward cap. You can override it above.</small></div>
      <div className="editor-actions"><button type="button" className="secondary-button" onClick={onCancel}>Cancel</button><button type="submit" className="primary-button" disabled={busy}>{busy ? "Saving…" : "Update application"}<Check size={16} /></button></div>
    </form>
  );
}

export default function BountyAdmin() {
  const [auth, setAuth] = useState("loading");
  const [data, setData] = useState({ companies: [], campaigns: [], applications: [], stats: {} });
  const [tab, setTab] = useState("overview");
  const [editingCompany, setEditingCompany] = useState(null);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [editingApplication, setEditingApplication] = useState(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState(null);
  const [search, setSearch] = useState("");

  async function loadData() {
    const response = await fetch("/api/bounty-admin", { cache: "no-store" });
    if (response.status === 401) {
      setAuth("login");
      return false;
    }
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || "Could not load admin data.");
    setData(payload);
    setAuth("ready");
    return true;
  }

  useEffect(() => {
    loadData().catch((error) => { setNotice({ type: "error", text: error.message }); setAuth("login"); });
  }, []);

  const filteredApplications = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return data.applications;
    return data.applications.filter((item) => [item.name, item.socialHandle, item.campaign, item.status].some((value) => String(value).toLowerCase().includes(query)));
  }, [data.applications, search]);

  async function upload(file) {
    if (!file) return null;
    if (file.size > 2_800_000) throw new Error("The file is larger than 2.8 MB.");
    const result = await request("upload-file", { file: { name: file.name, type: file.type, data: await fileAsDataUrl(file) } });
    return result.file;
  }

  async function runSave(action, payload, successText) {
    setBusy(true);
    setNotice(null);
    try {
      await request(action, payload);
      await loadData();
      setEditingCompany(null);
      setEditingCampaign(null);
      setEditingApplication(null);
      setNotice({ type: "success", text: successText });
    } catch (error) {
      setNotice({ type: "error", text: error.message });
    } finally {
      setBusy(false);
    }
  }

  async function saveCompany(logoFile) {
    try {
      setBusy(true);
      const file = await upload(logoFile);
      await runSave("save-company", { company: { ...editingCompany, ...(file ? { logoUploadId: file.id, logoFileName: file.name } : {}) } }, "Company saved.");
    } catch (error) { setNotice({ type: "error", text: error.message }); setBusy(false); }
  }

  async function saveCampaign(briefFile) {
    try {
      setBusy(true);
      const file = await upload(briefFile);
      await runSave("save-campaign", { campaign: { ...editingCampaign, ...(file ? { briefUploadId: file.id, briefFileName: file.name } : {}) } }, editingCampaign.status === "Live" ? "Bounty published." : "Bounty saved.");
    } catch (error) { setNotice({ type: "error", text: error.message }); setBusy(false); }
  }

  async function logout() {
    await request("logout");
    setAuth("login");
  }

  function openTab(nextTab) {
    setTab(nextTab);
    setEditingCompany(null);
    setEditingCampaign(null);
    setEditingApplication(null);
  }

  if (auth === "loading") return <main className="admin-loading"><RefreshCw className="spin" /><span>Opening Kaba Bounty…</span></main>;
  if (auth === "login") return <Login onLogin={loadData} />;

  const nav = [
    ["overview", LayoutDashboard, "Overview"],
    ["companies", Building2, "Companies"],
    ["campaigns", Megaphone, "Bounties"],
    ["applications", Users, "Applications"],
  ];

  return (
    <main className="bounty-admin-app">
      <aside className="admin-sidebar">
        <a className="admin-brand" href="/bounty/admin"><img src={kabaLogo} alt="Kaba Labs" /><span><strong>Bounty</strong><small>Admin console</small></span></a>
        <nav>{nav.map(([id, Icon, label]) => <button type="button" className={tab === id ? "active" : ""} onClick={() => openTab(id)} key={id}><Icon size={17} /><span>{label}</span>{id === "applications" && data.stats.newApplications > 0 && <b>{data.stats.newApplications}</b>}</button>)}</nav>
        <div className="sidebar-foot"><a href="/bounty" target="_blank"><ExternalLink size={16} />View public page</a><button type="button" onClick={logout}><LogOut size={16} />Sign out</button></div>
      </aside>

      <section className="admin-workspace">
        <header className="admin-topbar"><div><span>Kaba Labs funded pilot</span><h1>{nav.find(([id]) => id === tab)?.[2]}</h1></div><div className="admin-top-actions"><button className="refresh-button" type="button" onClick={() => loadData()}><RefreshCw size={15} />Refresh</button>{tab === "companies" && <button className="primary-button" onClick={() => setEditingCompany({ ...newCompany })}><Plus size={16} />Add company</button>}{tab === "campaigns" && <button className="primary-button" onClick={() => setEditingCampaign({ ...newCampaign, companyId: data.companies.find((item) => item.active)?.id || "" })}><Plus size={16} />Create bounty</button>}</div></header>
        {notice && <div className={`admin-notice ${notice.type}`}><span>{notice.type === "success" ? <Check size={16} /> : <X size={16} />}{notice.text}</span><button onClick={() => setNotice(null)}><X size={15} /></button></div>}

        {tab === "overview" && (
          <div className="overview-view">
            <section className="stat-grid">
              <article><span><Building2 size={18} /></span><div><small>Active companies</small><strong>{data.stats.companies || 0}</strong></div></article>
              <article><span><Megaphone size={18} /></span><div><small>Live bounties</small><strong>{data.stats.liveCampaigns || 0}</strong></div></article>
              <article><span><Users size={18} /></span><div><small>New applications</small><strong>{data.stats.newApplications || 0}</strong></div></article>
              <article><span><WalletCards size={18} /></span><div><small>Total paid</small><strong>{money(data.stats.paidTotal)}</strong></div></article>
            </section>
            <section className="overview-grid">
              <article className="admin-panel pilot-panel"><div><span className="panel-kicker">Pilot control</span><h2>Create the next funded bounty.</h2><p>Choose one of your businesses, upload a clear creator brief, set the maximum budget and publish it when ready.</p><button className="primary-button acid" onClick={() => { setTab("campaigns"); setEditingCampaign({ ...newCampaign, companyId: data.companies.find((item) => item.active)?.id || "" }); }}>Create a bounty<ChevronRight size={17} /></button></div><div className="pilot-orbit"><span>KABA</span><strong>150–200</strong><small>ETB / 1K views</small></div></article>
              <article className="admin-panel recent-panel"><div className="panel-header"><div><span className="panel-kicker">Latest activity</span><h2>Creator applications</h2></div><button onClick={() => setTab("applications")}>View all</button></div>{data.applications.slice(0, 5).map((application) => <button className="recent-row" key={application.id} onClick={() => { setTab("applications"); setEditingApplication({ ...application }); }}><span className="avatar">{application.name.slice(0, 2).toUpperCase()}</span><div><strong>{application.name}</strong><small>{application.campaign} · {application.socialHandle}</small></div><StatusPill value={application.status} /><ChevronRight size={16} /></button>)}{!data.applications.length && <EmptyState icon={Users} title="No applications yet" copy="New creator applications will appear here." />}</article>
            </section>
          </div>
        )}

        {tab === "companies" && !editingCompany && (
          <div className="cards-view">{data.companies.map((company) => <article className="company-admin-card" key={company.id}><div className="company-logo-preview">{company.logo ? <img src={company.logo} alt="" /> : company.name.slice(0, 2).toUpperCase()}</div><div className="company-card-copy"><span>{company.category || "Uncategorized"}</span><h2>{company.name}</h2><p>{company.website || "No website added"}</p></div><div className="company-card-foot"><StatusPill value={company.active ? "Active" : "Inactive"} /><button onClick={() => setEditingCompany({ ...company })}>Edit<ChevronRight size={15} /></button></div></article>)}<button className="add-card" onClick={() => setEditingCompany({ ...newCompany })}><Plus size={22} /><strong>Add another company</strong><span>Create its profile and upload a logo.</span></button></div>
        )}
        {tab === "companies" && editingCompany && <CompanyEditor company={editingCompany} onChange={setEditingCompany} onSave={saveCompany} onCancel={() => setEditingCompany(null)} busy={busy} />}

        {tab === "campaigns" && !editingCampaign && (
          data.campaigns.length ? <div className="campaign-admin-list">{data.campaigns.map((campaign) => <article key={campaign.id}><div className="campaign-list-logo">{campaign.logo ? <img src={campaign.logo} alt="" /> : campaign.initials}</div><div className="campaign-list-main"><span>{campaign.brand} · {campaign.category}</span><h2>{campaign.title}</h2><p>{campaign.rate} ETB / 1K views · {money(campaign.cap)} cap · {campaign.slots} slots</p></div><StatusPill value={campaign.status} /><button className="edit-row-button" onClick={() => setEditingCampaign({ ...campaign, angles: campaign.angles.join("\n"), hooks: campaign.hooks.join("\n"), must: campaign.must.join("\n"), avoid: campaign.avoid.join("\n") })}>Edit<ChevronRight size={16} /></button></article>)}</div> : <EmptyState icon={Megaphone} title="No bounties yet" copy="Create a funded test bounty for one of your businesses." action={<button className="primary-button" onClick={() => setEditingCampaign({ ...newCampaign, companyId: data.companies[0]?.id || "" })}><Plus size={16} />Create bounty</button>} />
        )}
        {tab === "campaigns" && editingCampaign && <CampaignEditor campaign={editingCampaign} companies={data.companies} onChange={setEditingCampaign} onSave={saveCampaign} onCancel={() => setEditingCampaign(null)} busy={busy} />}

        {tab === "applications" && !editingApplication && (
          <div className="applications-view"><div className="table-tools"><label><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search creators, campaigns or status…" /></label><span>{filteredApplications.length} applications</span></div>{filteredApplications.length ? <div className="application-table"><div className="table-head"><span>Creator</span><span>Campaign</span><span>Status</span><span>Views</span><span>Payout</span><span /></div>{filteredApplications.map((application) => <button className="table-row" key={application.id} onClick={() => setEditingApplication({ ...application })}><span className="creator-cell"><b>{application.name.slice(0, 2).toUpperCase()}</b><span><strong>{application.name}</strong><small>{application.socialHandle} · {application.platform}</small></span></span><span>{application.campaign}</span><StatusPill value={application.status} /><span>{Number(application.verifiedViews || 0).toLocaleString()}</span><span>{money(application.payoutAmount)}</span><ChevronRight size={16} /></button>)}</div> : <EmptyState icon={Users} title="No matching applications" copy="Applications will show here when creators submit through the public page." />}</div>
        )}
        {tab === "applications" && editingApplication && <ApplicationEditor application={editingApplication} campaigns={data.campaigns} onChange={setEditingApplication} onSave={() => runSave("save-application", { application: editingApplication }, "Application updated.")} onCancel={() => setEditingApplication(null)} busy={busy} />}
      </section>
    </main>
  );
}
