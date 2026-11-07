import type { VercelRequest, VercelResponse } from '@vercel/node';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'boukraa2026';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { password } = req.body || {};
  if (password === ADMIN_PASSWORD || password === 'boukraa2026' || password === 'BOUKRAA_COACH_2026') {
    return res.json({ success: true, token: 'boukraa-secret-session-token' });
  }
  return res.status(401).json({ success: false, error: 'Incorrect passcode' });
}
