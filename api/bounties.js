const { getBountyState } = require('../lib/bounty-notion');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { companies, campaigns } = await getBountyState({ includeApplications: false });
    const activeCompanies = new Set(companies.filter((company) => company.active).map((company) => company.id));
    const liveCampaigns = campaigns
      .filter((campaign) => campaign.status === 'Live' && activeCompanies.has(campaign.companyId))
      .sort((a, b) => Number(b.featured) - Number(a.featured));

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    res.status(200).json({ campaigns: liveCampaigns });
  } catch (error) {
    console.error('Bounty listing error:', error.message);
    res.status(500).json({ error: 'Could not load bounties right now.' });
  }
};
