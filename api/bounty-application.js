const {
  DATA_SOURCES,
  createPage,
  getBountyState,
  titleProperty,
  richTextProperty,
  phoneProperty,
  selectProperty,
} = require('../lib/bounty-notion');

function clean(value, max = 500) {
  return String(value || '').trim().slice(0, max);
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const fullName = clean(req.body?.fullName, 120);
  const phone = clean(req.body?.phone, 40);
  const platform = clean(req.body?.platform, 20);
  const socialHandle = clean(req.body?.socialHandle, 120);
  const contentStyle = clean(req.body?.contentStyle, 1000);
  const campaignId = clean(req.body?.campaignId, 80);

  if (!fullName || !phone || !socialHandle || !contentStyle || !campaignId) {
    res.status(400).json({ error: 'Please complete every required field.' });
    return;
  }
  if (!['TikTok', 'Instagram', 'Both'].includes(platform)) {
    res.status(400).json({ error: 'Choose a valid creator platform.' });
    return;
  }

  try {
    const { campaigns } = await getBountyState({ includeApplications: false });
    const campaign = campaigns.find((item) => item.id === campaignId || item.slug === campaignId);
    if (!campaign || campaign.status !== 'Live') {
      res.status(404).json({ error: 'This bounty is no longer accepting applications.' });
      return;
    }

    const page = await createPage(DATA_SOURCES.applications, {
      Name: titleProperty(fullName),
      Phone: phoneProperty(phone),
      Platform: selectProperty(platform),
      'Social Handle': richTextProperty(socialHandle),
      'Content Style': richTextProperty(contentStyle),
      'Campaign ID': richTextProperty(campaign.id),
      Campaign: richTextProperty(campaign.brand),
      Status: selectProperty('New'),
    });

    res.status(201).json({ success: true, applicationId: page.id });
  } catch (error) {
    console.error('Bounty application error:', error.message);
    res.status(500).json({ error: 'Could not submit your application right now. Please try again.' });
  }
};
