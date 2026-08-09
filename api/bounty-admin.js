const {
  DATA_SOURCES,
  createPage,
  updatePage,
  getBountyState,
  getConfig,
  setConfig,
  titleProperty,
  richTextProperty,
  numberProperty,
  checkboxProperty,
  selectProperty,
  urlProperty,
  uploadedFileProperty,
  slugify,
  hashPassword,
  verifyPassword,
  createSession,
  verifySession,
  parseCookies,
  uploadFile,
} = require('../lib/bounty-notion');

const SESSION_COOKIE = 'kaba_bounty_session';
const STATUS_OPTIONS = new Set(['Draft', 'Live', 'Paused', 'Closed']);
const APPLICATION_STATUS_OPTIONS = new Set(['New', 'Approved', 'Rejected', 'Published', 'Verified', 'Paid']);

function clean(value, max = 2000) {
  return String(value || '').trim().slice(0, max);
}

function setSessionCookie(res, token) {
  const secure = process.env.VERCEL ? '; Secure' : '';
  res.setHeader('Set-Cookie', [
    `${SESSION_COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly${secure}; SameSite=Lax; Max-Age=${8 * 60 * 60}`,
  ]);
}

function clearSessionCookie(res) {
  const secure = process.env.VERCEL ? '; Secure' : '';
  res.setHeader('Set-Cookie', [
    `${SESSION_COOKIE}=; Path=/; HttpOnly${secure}; SameSite=Lax; Max-Age=0`,
  ]);
}

async function authenticate(req) {
  const config = await getConfig();
  const token = parseCookies(req.headers.cookie || '')[SESSION_COOKIE];
  const secret = config.session_secret?.value;
  return {
    valid: Boolean(token && secret && verifySession(token, secret)),
    config,
  };
}

function summarize(state) {
  const paidTotal = state.applications
    .filter((application) => application.status === 'Paid')
    .reduce((sum, application) => sum + Number(application.payoutAmount || 0), 0);
  return {
    companies: state.companies.filter((company) => company.active).length,
    liveCampaigns: state.campaigns.filter((campaign) => campaign.status === 'Live').length,
    newApplications: state.applications.filter((application) => application.status === 'New').length,
    awaitingPayout: state.applications.filter((application) => application.status === 'Verified').length,
    paidTotal,
  };
}

async function sendState(res) {
  const state = await getBountyState();
  res.status(200).json({ ...state, stats: summarize(state) });
}

async function saveCompany(body) {
  const name = clean(body.name, 120);
  if (!name) throw new Error('Company name is required.');

  const properties = {
    Name: titleProperty(name),
    Slug: richTextProperty(clean(body.slug, 80) || slugify(name)),
    Category: richTextProperty(clean(body.category, 120)),
    Website: urlProperty(clean(body.website, 500)),
    Active: checkboxProperty(body.active !== false),
  };
  if (body.logoUploadId || body.removeLogo) {
    properties.Logo = uploadedFileProperty(clean(body.logoUploadId, 100), clean(body.logoFileName, 120) || `${name} logo`);
  }

  return body.id
    ? updatePage(clean(body.id, 80), properties)
    : createPage(DATA_SOURCES.companies, properties);
}

async function saveCampaign(body) {
  const name = clean(body.name, 160);
  const companyId = clean(body.companyId, 80);
  if (!name || !companyId) throw new Error('Campaign name and company are required.');

  const { companies } = await getBountyState({ includeApplications: false });
  const company = companies.find((item) => item.id === companyId);
  if (!company) throw new Error('Choose a valid company.');
  const status = STATUS_OPTIONS.has(body.status) ? body.status : 'Draft';
  const properties = {
    Name: titleProperty(name),
    Slug: richTextProperty(clean(body.slug, 80) || slugify(company.name)),
    'Company ID': richTextProperty(company.id),
    Company: richTextProperty(company.name),
    Category: richTextProperty(clean(body.category, 120) || company.category),
    Description: richTextProperty(clean(body.description)),
    Rate: numberProperty(body.rate),
    'Max Reward': numberProperty(body.cap),
    Slots: numberProperty(body.slots),
    Status: selectProperty(status),
    Featured: checkboxProperty(body.featured),
    'Earning Window': numberProperty(body.window || 14),
    'Payout Day': richTextProperty(clean(body.payoutDay, 40) || 'Friday'),
    Objective: richTextProperty(clean(body.objective)),
    Audience: richTextProperty(clean(body.audience)),
    'Core Message': richTextProperty(clean(body.message)),
    Angles: richTextProperty(clean(body.angles)),
    Hooks: richTextProperty(clean(body.hooks)),
    'Must Include': richTextProperty(clean(body.must)),
    Avoid: richTextProperty(clean(body.avoid)),
  };
  if (body.briefUploadId || body.removeBrief) {
    properties['Brief PDF'] = uploadedFileProperty(
      clean(body.briefUploadId, 100),
      clean(body.briefFileName, 120) || `${company.name} creator brief.pdf`
    );
  }

  return body.id
    ? updatePage(clean(body.id, 80), properties)
    : createPage(DATA_SOURCES.campaigns, properties);
}

async function saveApplication(body) {
  const id = clean(body.id, 80);
  const status = APPLICATION_STATUS_OPTIONS.has(body.status) ? body.status : 'New';
  if (!id) throw new Error('Application is required.');

  let payoutAmount = Number(body.payoutAmount || 0);
  const verifiedViews = Number(body.verifiedViews || 0);
  if (!payoutAmount && verifiedViews > 0) {
    const { applications, campaigns } = await getBountyState();
    const application = applications.find((item) => item.id === id);
    const campaign = campaigns.find((item) => item.id === application?.campaignId);
    if (campaign) payoutAmount = Math.min((verifiedViews / 1000) * campaign.rate, campaign.cap);
  }

  return updatePage(id, {
    Status: selectProperty(status),
    'Video URL': urlProperty(clean(body.videoUrl, 500)),
    'Verified Views': numberProperty(verifiedViews),
    'Payout Amount': numberProperty(Math.round(payoutAmount)),
  });
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  try {
    if (req.method === 'POST' && req.body?.action === 'login') {
      const config = await getConfig();
      const passwordHash = config.admin_password_hash?.value;
      const sessionSecret = config.session_secret?.value;
      if (!passwordHash || !sessionSecret || !verifyPassword(String(req.body.password || ''), passwordHash)) {
        res.status(401).json({ error: 'Incorrect password.' });
        return;
      }
      setSessionCookie(res, createSession(sessionSecret));
      res.status(200).json({ success: true });
      return;
    }

    if (req.method === 'POST' && req.body?.action === 'logout') {
      clearSessionCookie(res);
      res.status(200).json({ success: true });
      return;
    }

    const auth = await authenticate(req);
    if (!auth.valid) {
      res.status(401).json({ error: 'Authentication required.' });
      return;
    }

    if (req.method === 'GET') {
      await sendState(res);
      return;
    }
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'GET, POST');
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    const body = req.body || {};
    if (body.action === 'save-company') await saveCompany(body.company || {});
    else if (body.action === 'save-campaign') await saveCampaign(body.campaign || {});
    else if (body.action === 'save-application') await saveApplication(body.application || {});
    else if (body.action === 'upload-file') {
      const file = await uploadFile(body.file || {});
      res.status(200).json({ success: true, file });
      return;
    } else if (body.action === 'change-password') {
      const password = String(body.password || '');
      if (password.length < 10) throw new Error('Use at least 10 characters for the new password.');
      await setConfig('admin_password_hash', hashPassword(password));
      clearSessionCookie(res);
      res.status(200).json({ success: true, signedOut: true });
      return;
    } else {
      res.status(400).json({ error: 'Unknown admin action.' });
      return;
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Bounty admin error:', error.message);
    const status = /required|valid|choose|smaller|unsupported|characters/i.test(error.message) ? 400 : 500;
    res.status(status).json({ error: status === 400 ? error.message : 'The admin action could not be completed.' });
  }
};
