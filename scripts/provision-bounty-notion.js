const NOTION_VERSION = '2026-03-11';
const CONTAINER_DATABASE_ID = '3cbe215d-00ac-42cb-95b9-cea5fcbf4aac';
const passwordHash = Buffer.from(process.argv[2] || '', 'base64').toString('utf8');

if (!passwordHash) {
  throw new Error('Missing initial admin password hash');
}

const token = process.env.NOTION_TOKEN;

if (!token) {
  throw new Error('NOTION_TOKEN is unavailable');
}

const notionHeaders = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
  'Notion-Version': NOTION_VERSION,
};

function richText(content) {
  return [{ type: 'text', text: { content: String(content || '').slice(0, 2000) } }];
}

async function notion(path, options = {}) {
  const response = await fetch(`https://api.notion.com/v1${path}`, {
    ...options,
    headers: { ...notionHeaders, ...(options.headers || {}) },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(`${response.status} ${data.message || JSON.stringify(data)}`);
  }
  return data;
}

async function findDataSource(title) {
  const result = await notion('/search', {
    method: 'POST',
    body: JSON.stringify({ query: title, filter: { property: 'object', value: 'data_source' }, page_size: 25 }),
  });
  return result.results.find((source) =>
    source.title?.map((item) => item.plain_text).join('') === title &&
    source.parent?.database_id === CONTAINER_DATABASE_ID
  );
}

async function createDataSource(title, properties) {
  const existing = await findDataSource(title);
  if (existing) return existing;

  return notion('/data_sources', {
    method: 'POST',
    body: JSON.stringify({
      parent: { type: 'database_id', database_id: CONTAINER_DATABASE_ID },
      title: richText(title),
      properties,
    }),
  });
}

async function query(dataSourceIdValue, body = {}) {
  return notion(`/data_sources/${dataSourceIdValue}/query`, {
    method: 'POST',
    body: JSON.stringify({ page_size: 100, ...body }),
  });
}

async function createPage(dataSourceIdValue, properties) {
  return notion('/pages', {
    method: 'POST',
    body: JSON.stringify({
      parent: { type: 'data_source_id', data_source_id: dataSourceIdValue },
      properties,
    }),
  });
}

function title(value) {
  return { type: 'title', title: richText(value) };
}

function text(value) {
  return { type: 'rich_text', rich_text: richText(value) };
}

function number(value) {
  return { type: 'number', number: value };
}

function select(value) {
  return { type: 'select', select: value ? { name: value } : null };
}

function checkbox(value) {
  return { type: 'checkbox', checkbox: Boolean(value) };
}

function externalFile(name, url) {
  return { name, type: 'external', external: { url } };
}

async function seedIfEmpty(dataSourceIdValue, rows) {
  const existing = await query(dataSourceIdValue);
  if (existing.results.length) return;
  for (const properties of rows) {
    await createPage(dataSourceIdValue, properties);
  }
}

async function main() {
  const companyDs = '0cb0b512-6591-40bf-b805-fe16a5e6a133';
  const bountyDs = 'fb5fc5c4-e53a-4475-a884-8cf75db549f2';
  const applicationDs = 'c1945ce5-7ee7-470f-9f34-1695d0f1e723';
  const configDs = '1dbed467-4763-4a25-8094-572976c04c15';

  const logoUrl = 'https://kabalabs.et/bounty-assets/brand/KABA_LABS_clean_proper_vector_preview.png';
  const companyRows = [
    ['Akbari Planner', 'akbari-planner', 'Productivity', 'https://akbari.et', []],
    ['Gizet', 'gizet', 'Marketplace', 'https://gizet.et', []],
    ['Shaba Closet', 'shaba-closet', 'Fashion', 'https://shabacloset.com', []],
    ['Kaba Labs', 'kaba-labs', 'Marketing', 'https://kabalabs.et', [externalFile('Kaba Labs logo', logoUrl)]],
    ['Kaba Bounty', 'kaba-bounty', 'Creator Economy', 'https://kabalabs.et/bounty', [externalFile('Kaba Bounty logo', logoUrl)]],
  ].map(([name, slug, category, website, logo]) => ({
    Name: title(name), Slug: text(slug), Category: text(category),
    Website: { type: 'url', url: website }, Logo: { type: 'files', files: logo }, Active: checkbox(true),
  }));
  await seedIfEmpty(companyDs, companyRows);

  const companyPages = await query(companyDs);
  const companyIdByName = Object.fromEntries(companyPages.results.map((page) => [
    page.properties.Name.title?.[0]?.plain_text,
    page.id,
  ]));

  const campaigns = [
    {
      company: 'Akbari Planner', slug: 'akbari-planner', category: 'Productivity',
      name: 'Show how you plan a better week',
      description: 'Create a native TikTok showing how Akbari helps students, founders, or busy professionals organize their week.',
      rate: 200, cap: 10000, slots: 8, featured: true,
      objective: 'Make Akbari feel like a practical tool that helps real people plan their week, protect their time, and follow through on priorities.',
      audience: 'Students, founders, professionals, freelancers, and anyone who wants more structure.',
      message: 'A better week starts when you can clearly see what matters and decide where your time goes.',
      angles: ['Plan a realistic week in under five minutes.', 'Show the difference between a chaotic week and an organized one.', 'Use Akbari for study planning, business goals, or personal habits.'],
      hooks: ['If every Monday feels like starting from zero, try this.', 'This is how I stopped forgetting the important parts of my week.', 'I planned my whole week in five minutes using an Ethiopian planner.'],
      must: ['Show or mention Akbari Planner in the first 8 seconds.', 'Demonstrate one real use case instead of only listing features.', 'Use your own voice, footage, and honest experience.'],
      avoid: ['Guaranteeing success or productivity.', "Copying another creator's script or video.", 'Paid boosting, purchased views, or engagement groups.'],
      pdf: 'https://kabalabs.et/bounty-assets/briefs/akbari-planner-creator-brief.pdf',
    },
    {
      company: 'Gizet', slug: 'gizet', category: 'Marketplace', name: 'Introduce the marketplace Ethiopia deserves',
      description: 'Make an original video about discovering useful products and local businesses through Gizet.',
      rate: 175, cap: 7500, slots: 10, featured: false,
      objective: 'Help Ethiopians understand that Gizet is a marketplace where customers discover useful products and local businesses reach more buyers.',
      audience: 'Online shoppers, small-business owners, product lovers, and people looking for local options.',
      message: 'Gizet brings products and Ethiopian businesses together in one marketplace where there is room for everyone.',
      angles: ['Find three useful or surprising products on Gizet.', 'Explain why Ethiopia needs a stronger local marketplace.', 'Speak to a small business owner who wants to sell online.'],
      hooks: ['Why is finding a simple product online still this difficult in Ethiopia?', 'I found an Ethiopian marketplace you should know about.', 'If you own a business in Ethiopia, this could help people find you.'],
      must: ['Say or show the name Gizet clearly.', 'Show at least one real page, product, or marketplace interaction.', 'Describe Gizet as a marketplace, not the seller of every product.'],
      avoid: ['Unconfirmed delivery times, discounts, or guarantees.', "Misrepresenting a vendor's product or price.", 'Copied footage, purchased views, or paid boosting.'],
      pdf: 'https://kabalabs.et/bounty-assets/briefs/gizet-creator-brief.pdf',
    },
    {
      company: 'Shaba Closet', slug: 'shaba-closet', category: 'Fashion', name: 'Style it your way',
      description: 'Create a fashion-first video featuring a Shaba Closet look, styling idea, or honest product story.',
      rate: 150, cap: 7500, slots: 6, featured: false,
      objective: "Create fashion content that makes Shaba Closet feel expressive and relevant to the creator's own style instead of looking like a standard advertisement.",
      audience: 'Fashion-conscious Ethiopian shoppers looking for outfit inspiration and confident personal style.',
      message: 'Style is personal. Shaba Closet gives you more ways to build a look that feels like you.',
      angles: ['Build one outfit around a Shaba Closet item.', 'Show three ways to style one piece.', 'Create a before-and-after outfit transformation.'],
      hooks: ['One piece, three completely different looks.', 'This outfit looked basic until I changed one thing.', 'I tried styling this the way I would actually wear it in Addis.'],
      must: ['Feature Shaba Closet or the approved item clearly.', 'Show the complete look in good lighting.', 'Be honest about fit and styling; do not invent details.'],
      avoid: ['Unconfirmed claims about stock, delivery, or sizing.', "Heavily changing the product's color or appearance.", 'Reused footage, purchased views, or engagement groups.'],
      pdf: 'https://kabalabs.et/bounty-assets/briefs/shaba-closet-creator-brief.pdf',
    },
    {
      company: 'Kaba Labs', slug: 'kaba-labs', category: 'Marketing', name: 'Show what real business growth support looks like',
      description: 'Create a clear, original video showing how Kaba Labs diagnoses business problems and builds the right growth system.',
      rate: 200, cap: 10000, slots: 8, featured: false,
      objective: 'Help Ethiopian business owners understand that Kaba Labs is an accountable growth partner, not only a content-production agency.',
      audience: 'Ethiopian founders, business owners, and managers who need stronger marketing and sales systems.',
      message: 'Kaba Labs diagnoses the real bottleneck, prioritizes the right work, and stays accountable for execution.',
      angles: ['Explain why more content does not always fix a business.', 'Show the difference between buying deliverables and hiring a growth partner.', 'Break down one common business-growth bottleneck.'],
      hooks: ['Eight videos cannot fix the wrong business problem.', 'Your ads may not be the real reason sales are slow.', 'This is what a real outsourced growth team should do.'],
      must: ['Say Kaba Labs clearly.', 'Explain diagnosis before deliverables.', 'Use original examples and your own presentation style.'],
      avoid: ['Guaranteed revenue claims.', 'Invented client results.', 'Purchased views, copied scripts, or paid boosting.'],
      pdf: 'https://kabalabs.et/bounty-assets/briefs/kaba-labs-creator-brief.pdf',
    },
    {
      company: 'Kaba Bounty', slug: 'kaba-bounty', category: 'Creator Economy', name: 'Explain how creators can earn from their views',
      description: 'Introduce Kaba Bounty as a starting point for creators who can make useful content but do not yet receive brand deals.',
      rate: 175, cap: 7500, slots: 12, featured: false,
      objective: 'Help early creators understand how Kaba Bounty pays for qualified organic views and how to apply for a campaign.',
      audience: 'Ethiopian TikTok and Instagram creators, especially smaller creators building their first portfolio.',
      message: 'Choose a bounty, follow the brief, publish approved original content, and earn based on qualified views.',
      angles: ['Walk through the three-step creator process.', 'Calculate what 10,000 or 50,000 views could earn.', 'Explain why creators do not need a huge following to start.'],
      hooks: ['You do not need a brand deal to start earning from content.', 'What if 10,000 views could pay you?', 'Small Ethiopian creators should know about this.'],
      must: ['Show the Kaba Bounty website.', 'Explain that content requires approval before publishing.', 'Mention that only qualified organic views are paid.'],
      avoid: ['Promising every applicant will be accepted.', 'Promising unlimited payouts.', 'Fake views, engagement groups, or misleading earnings claims.'],
      pdf: 'https://kabalabs.et/bounty-assets/briefs/kaba-bounty-creator-brief.pdf',
    },
  ];

  const campaignRows = campaigns.map((campaign) => ({
    Name: title(campaign.name), Slug: text(campaign.slug),
    'Company ID': text(companyIdByName[campaign.company] || ''), Company: text(campaign.company),
    Category: text(campaign.category), Description: text(campaign.description),
    Rate: number(campaign.rate), 'Max Reward': number(campaign.cap), Slots: number(campaign.slots),
    Status: select('Live'), Featured: checkbox(campaign.featured), 'Earning Window': number(14),
    'Payout Day': text('Friday'),
    'Brief PDF': { type: 'files', files: campaign.pdf ? [externalFile(`${campaign.company} creator brief`, campaign.pdf)] : [] },
    Objective: text(campaign.objective), Audience: text(campaign.audience), 'Core Message': text(campaign.message),
    Angles: text(campaign.angles.join('\n')), Hooks: text(campaign.hooks.join('\n')),
    'Must Include': text(campaign.must.join('\n')), Avoid: text(campaign.avoid.join('\n')),
  }));
  await seedIfEmpty(bountyDs, campaignRows);

  const configRows = [
    { Key: title('admin_password_hash'), Value: text(passwordHash) },
    { Key: title('session_secret'), Value: text(require('crypto').randomBytes(32).toString('hex')) },
  ];
  await seedIfEmpty(configDs, configRows);

  process.stdout.write(JSON.stringify({
    companiesDataSourceId: companyDs,
    bountiesDataSourceId: bountyDs,
    applicationsDataSourceId: applicationDs,
    configDataSourceId: configDs,
  }));
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
