import type { VercelRequest, VercelResponse } from '@vercel/node';
import { submissionsDb } from '../_db.js';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'boukraa2026';

const checkAuth = (req: VercelRequest) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    if (token === ADMIN_PASSWORD || token === 'boukraa-secret-session-token') return true;
  }
  // Also check query param token (e.g. for CSV export)
  if (req.query?.token === ADMIN_PASSWORD || req.query?.token === 'boukraa-secret-session-token') {
    return true;
  }
  return false;
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (!checkAuth(req)) {
    return res.status(401).json({ error: 'Unauthorized: invalid or missing token' });
  }

  const url = req.url || '';
  const matchId = url.match(/\/submissions\/([a-zA-Z0-9_-]+)/);
  const pathId = matchId ? matchId[1] : undefined;

  // GET: list submissions or CSV export
  if (req.method === 'GET') {
    if (url.includes('/export')) {
      const list = submissionsDb.getAll();
      const csvHeader = 'ID,Name,Age,WhatsApp,Service,Sport,Status,Date\n';
      const csvRows = list
        .map((s) => `"${s.id}","${s.fullName}","${s.age}","${s.whatsapp}","${s.service}","${s.answers?.sport || ''}","${s.status}","${s.createdAt}"`)
        .join('\n');
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', 'attachment; filename="boukraa_athletes.csv"');
      return res.status(200).send(csvHeader + csvRows);
    }

    const { service, status, search } = req.query as { service?: string; status?: string; search?: string };
    const list = submissionsDb.getAll(service, status, search);
    return res.json({ success: true, count: list.length, submissions: list });
  }

  // PATCH: update status or notes
  if (req.method === 'PATCH') {
    const id = pathId || req.body?.id;
    if (!id) return res.status(400).json({ error: 'Submission ID is required' });

    const { status, coachNotes } = req.body || {};

    if (url.includes('/status') || status !== undefined) {
      submissionsDb.updateStatus(id, status);
    }
    if (url.includes('/notes') || coachNotes !== undefined) {
      submissionsDb.updateNotes(id, coachNotes);
    }

    return res.json({ success: true, id, status, coachNotes });
  }

  // DELETE: remove submission
  if (req.method === 'DELETE') {
    const id = pathId || (req.query?.id as string) || req.body?.id;
    if (!id) return res.status(400).json({ error: 'Submission ID is required' });
    submissionsDb.delete(id);
    return res.json({ success: true, id });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
