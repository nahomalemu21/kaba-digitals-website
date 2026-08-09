const BOUNTY_API = 'https://kaba-bounty.shabacloset.chatgpt.site/api/applications';

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const response = await fetch(BOUNTY_API, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(req.body),
    });
    const payload = await response.json();
    res.status(response.status).json(payload);
  } catch {
    res.status(502).json({
      error: 'Could not submit your application right now. Please try again.',
    });
  }
};
