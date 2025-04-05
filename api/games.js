export default async function handler(req, res) {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ error: 'Missing date parameter (YYYY-MM-DD)' });
  }

  try {
    const nhlRes = await fetch(`https://statsapi.web.nhl.com/api/v1/schedule?date=${date}`);
    const data = await nhlRes.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error('NHL Proxy Error:', err);
    return res.status(500).json({ error: 'Failed to fetch NHL data' });
  }
}
