const crypto = require('crypto');

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_VERSION = '2026-03-11';

const DATA_SOURCES = {
  companies: '0cb0b512-6591-40bf-b805-fe16a5e6a133',
  campaigns: 'fb5fc5c4-e53a-4475-a884-8cf75db549f2',
  applications: 'c1945ce5-7ee7-470f-9f34-1695d0f1e723',
  config: '1dbed467-4763-4a25-8094-572976c04c15',
};

async function notionRequest(path, options = {}) {
  if (!NOTION_TOKEN) {
    const error = new Error('The Notion integration is not configured');
    error.status = 503;
    throw error;
  }

  const headers = {
    Authorization: `Bearer ${NOTION_TOKEN}`,
    'Notion-Version': NOTION_VERSION,
    ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
    ...(options.headers || {}),
  };

  const response = await fetch(`https://api.notion.com/v1${path}`, {
    ...options,
    headers,
    body: options.body && !(options.body instanceof FormData)
      ? JSON.stringify(options.body)
      : options.body,
  });
  const payload = await response.json();

  if (!response.ok) {
    const error = new Error(payload.message || 'Notion request failed');
    error.status = response.status;
    error.details = payload;
    throw error;
  }

  return payload;
}

async function queryAll(dataSourceId, filter) {
  const results = [];
  let startCursor;

  do {
    const payload = await notionRequest(`/data_sources/${dataSourceId}/query`, {
      method: 'POST',
      body: {
        page_size: 100,
        ...(filter ? { filter } : {}),
        ...(startCursor ? { start_cursor: startCursor } : {}),
      },
    });
    results.push(...payload.results);
    startCursor = payload.has_more ? payload.next_cursor : null;
  } while (startCursor);

  return results;
}

function textParts(value) {
  return [{ type: 'text', text: { content: String(value || '').slice(0, 2000) } }];
}

function titleProperty(value) {
  return { type: 'title', title: textParts(value) };
}

function richTextProperty(value) {
  return { type: 'rich_text', rich_text: textParts(value) };
}

function numberProperty(value) {
  const parsed = Number(value);
  return { type: 'number', number: Number.isFinite(parsed) ? parsed : 0 };
}

function checkboxProperty(value) {
  return { type: 'checkbox', checkbox: Boolean(value) };
}

function selectProperty(value) {
  return { type: 'select', select: value ? { name: value } : null };
}

function urlProperty(value) {
  return { type: 'url', url: value || null };
}

function phoneProperty(value) {
  return { type: 'phone_number', phone_number: value || null };
}

function uploadedFileProperty(uploadId, name) {
  return {
    type: 'files',
    files: uploadId ? [{ name, type: 'file_upload', file_upload: { id: uploadId } }] : [],
  };
}

function getTitle(property) {
  return property?.title?.map((item) => item.plain_text || '').join('') || '';
}

function getText(property) {
  return property?.rich_text?.map((item) => item.plain_text || '').join('') || '';
}

function getFile(property) {
  const file = property?.files?.[0];
  if (!file) return null;
  return file.external?.url || file.file?.url || null;
}

function splitLines(value) {
  if (Array.isArray(value)) return value.map(String).map((line) => line.trim()).filter(Boolean);
  return String(value || '').split('\n').map((line) => line.trim()).filter(Boolean);
}

function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 80);
}

function initials(value) {
  return String(value || '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
}

function mapCompany(page) {
  const properties = page.properties || {};
  const name = getTitle(properties.Name);
  return {
    id: page.id,
    name,
    slug: getText(properties.Slug) || slugify(name),
    category: getText(properties.Category),
    website: properties.Website?.url || '',
    logo: getFile(properties.Logo),
    active: Boolean(properties.Active?.checkbox),
    createdAt: properties.Created?.created_time || page.created_time,
    updatedAt: properties.Updated?.last_edited_time || page.last_edited_time,
  };
}

function mapCampaign(page, companyById = new Map(), companyByName = new Map()) {
  const properties = page.properties || {};
  const companyId = getText(properties['Company ID']);
  const companyName = getText(properties.Company);
  const company = companyById.get(companyId) || companyByName.get(companyName);
  const slug = getText(properties.Slug) || slugify(companyName || getTitle(properties.Name));

  return {
    id: page.id,
    slug,
    brand: company?.name || companyName,
    companyId: company?.id || companyId,
    companySlug: company?.slug || slug,
    website: company?.website || '',
    logo: company?.logo || null,
    initials: initials(company?.name || companyName),
    accent: slugify(company?.name || companyName),
    category: getText(properties.Category) || company?.category || '',
    title: getTitle(properties.Name),
    description: getText(properties.Description),
    rate: properties.Rate?.number || 0,
    cap: properties['Max Reward']?.number || 0,
    slots: properties.Slots?.number || 0,
    status: properties.Status?.select?.name || 'Draft',
    featured: Boolean(properties.Featured?.checkbox),
    window: properties['Earning Window']?.number || 14,
    payoutDay: getText(properties['Payout Day']) || 'Friday',
    pdf: getFile(properties['Brief PDF']),
    objective: getText(properties.Objective),
    audience: getText(properties.Audience),
    message: getText(properties['Core Message']),
    angles: splitLines(getText(properties.Angles)),
    hooks: splitLines(getText(properties.Hooks)),
    must: splitLines(getText(properties['Must Include'])),
    avoid: splitLines(getText(properties.Avoid)),
    createdAt: properties.Created?.created_time || page.created_time,
    updatedAt: properties.Updated?.last_edited_time || page.last_edited_time,
  };
}

function mapApplication(page) {
  const properties = page.properties || {};
  return {
    id: page.id,
    name: getTitle(properties.Name),
    phone: properties.Phone?.phone_number || '',
    platform: properties.Platform?.select?.name || '',
    socialHandle: getText(properties['Social Handle']),
    contentStyle: getText(properties['Content Style']),
    campaignId: getText(properties['Campaign ID']),
    campaign: getText(properties.Campaign),
    status: properties.Status?.select?.name || 'New',
    videoUrl: properties['Video URL']?.url || '',
    verifiedViews: properties['Verified Views']?.number || 0,
    payoutAmount: properties['Payout Amount']?.number || 0,
    appliedAt: properties.Applied?.created_time || page.created_time,
    updatedAt: properties.Updated?.last_edited_time || page.last_edited_time,
  };
}

async function getBountyState({ includeApplications = true } = {}) {
  const [companyPages, campaignPages, applicationPages] = await Promise.all([
    queryAll(DATA_SOURCES.companies),
    queryAll(DATA_SOURCES.campaigns),
    includeApplications ? queryAll(DATA_SOURCES.applications) : Promise.resolve([]),
  ]);
  const companies = companyPages.map(mapCompany);
  const companyById = new Map(companies.map((company) => [company.id, company]));
  const companyByName = new Map(companies.map((company) => [company.name, company]));
  const campaigns = campaignPages.map((page) => mapCampaign(page, companyById, companyByName));
  const applications = applicationPages.map(mapApplication).sort((a, b) =>
    String(b.appliedAt).localeCompare(String(a.appliedAt))
  );

  return { companies, campaigns, applications };
}

async function createPage(dataSourceId, properties) {
  return notionRequest('/pages', {
    method: 'POST',
    body: { parent: { type: 'data_source_id', data_source_id: dataSourceId }, properties },
  });
}

async function updatePage(pageId, properties) {
  return notionRequest(`/pages/${pageId}`, { method: 'PATCH', body: { properties } });
}

async function getConfig() {
  const pages = await queryAll(DATA_SOURCES.config);
  return Object.fromEntries(pages.map((page) => [
    getTitle(page.properties.Key),
    { value: getText(page.properties.Value), pageId: page.id },
  ]));
}

async function setConfig(key, value) {
  const config = await getConfig();
  if (config[key]) {
    return updatePage(config[key].pageId, { Value: richTextProperty(value) });
  }
  return createPage(DATA_SOURCES.config, { Key: titleProperty(key), Value: richTextProperty(value) });
}

function hashPassword(password) {
  const iterations = 120000;
  const salt = crypto.randomBytes(16).toString('hex');
  const digest = crypto.pbkdf2Sync(password, salt, iterations, 32, 'sha256').toString('hex');
  return `pbkdf2$${iterations}$${salt}$${digest}`;
}

function verifyPassword(password, storedHash) {
  try {
    const [scheme, iterationText, salt, expectedHex] = String(storedHash || '').split('$');
    if (scheme !== 'pbkdf2' || !iterationText || !salt || !expectedHex) return false;
    const actual = crypto.pbkdf2Sync(password, salt, Number(iterationText), expectedHex.length / 2, 'sha256');
    const expected = Buffer.from(expectedHex, 'hex');
    return actual.length === expected.length && crypto.timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}

function createSession(secret) {
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + 8 * 60 * 60 * 1000 })).toString('base64url');
  const signature = crypto.createHmac('sha256', secret).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

function verifySession(token, secret) {
  try {
    const [payload, signature] = String(token || '').split('.');
    if (!payload || !signature) return false;
    const expected = crypto.createHmac('sha256', secret).update(payload).digest('base64url');
    const validSignature = crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return validSignature && Number(data.exp) > Date.now();
  } catch {
    return false;
  }
}

function parseCookies(header = '') {
  return Object.fromEntries(String(header).split(';').map((item) => {
    const [key, ...rest] = item.trim().split('=');
    return [key, decodeURIComponent(rest.join('='))];
  }).filter(([key]) => key));
}

async function uploadFile({ name, type, data }) {
  const allowedTypes = new Set(['application/pdf', 'image/png', 'image/jpeg', 'image/webp', 'image/svg+xml']);
  if (!name || !allowedTypes.has(type)) throw new Error('Unsupported file type.');
  const base64 = String(data || '').replace(/^data:[^;]+;base64,/, '');
  const buffer = Buffer.from(base64, 'base64');
  if (!buffer.length || buffer.length > 2_800_000) throw new Error('Files must be smaller than 2.8 MB.');

  const upload = await notionRequest('/file_uploads', {
    method: 'POST',
    body: { mode: 'single_part', filename: name.slice(0, 120), content_type: type },
  });
  const form = new FormData();
  form.append('file', new Blob([buffer], { type }), name.slice(0, 120));
  await notionRequest(`/file_uploads/${upload.id}/send`, { method: 'POST', body: form });
  return { id: upload.id, name: name.slice(0, 120) };
}

module.exports = {
  NOTION_TOKEN,
  DATA_SOURCES,
  notionRequest,
  queryAll,
  createPage,
  updatePage,
  getBountyState,
  getConfig,
  setConfig,
  mapCompany,
  mapCampaign,
  mapApplication,
  titleProperty,
  richTextProperty,
  numberProperty,
  checkboxProperty,
  selectProperty,
  urlProperty,
  phoneProperty,
  uploadedFileProperty,
  slugify,
  splitLines,
  hashPassword,
  verifyPassword,
  createSession,
  verifySession,
  parseCookies,
  uploadFile,
};
