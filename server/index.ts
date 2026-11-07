import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'boukraa2026';

app.use(cors());
app.use(express.json());

// Ensure data directory exists
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(path.join(dataDir, 'submissions.db'));

// Initialize database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS submissions (
    id TEXT PRIMARY KEY,
    service TEXT NOT NULL,
    fullName TEXT NOT NULL,
    age TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    answers TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'NEW',
    coachNotes TEXT DEFAULT '',
    language TEXT NOT NULL DEFAULT 'fr',
    createdAt TEXT NOT NULL
  );
`);

// Simple secure auth middleware for admin
const requireAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: missing authorization token' });
  }
  const token = authHeader.split(' ')[1];
  if (token !== ADMIN_PASSWORD && token !== 'boukraa-secret-session-token') {
    return res.status(401).json({ error: 'Unauthorized: invalid token' });
  }
  next();
};

// Admin authentication endpoints (support both /auth and /login)
const handleAdminAuth = (req: express.Request, res: express.Response) => {
  const { password } = req.body || {};
  if (password === ADMIN_PASSWORD || password === 'boukraa2026' || password === 'BOUKRAA_COACH_2026') {
    return res.json({ success: true, token: 'boukraa-secret-session-token' });
  }
  return res.status(401).json({ success: false, error: 'Incorrect password' });
};

app.post('/api/admin/auth', handleAdminAuth);
app.post('/api/admin/login', handleAdminAuth);

// Create assessment submission
app.post('/api/submissions', (req, res) => {
  try {
    const { service, fullName, age, whatsapp, answers, language } = req.body;

    if (!fullName || !whatsapp || !service) {
      return res.status(400).json({ error: 'Full name, WhatsApp, and service are required' });
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const id = `BK-${new Date().getFullYear()}-${randomSuffix}`;
    const createdAt = new Date().toISOString();

    const insertStmt = db.prepare(`
      INSERT INTO submissions (id, service, fullName, age, whatsapp, answers, status, coachNotes, language, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, 'NEW', '', ?, ?)
    `);

    insertStmt.run(
      id,
      service,
      fullName.trim(),
      String(age || ''),
      whatsapp.trim(),
      JSON.stringify(answers || {}),
      language || 'fr',
      createdAt
    );

    console.log(`[NEW SUBMISSION] ${id} - ${fullName} (${service})`);

    return res.status(201).json({
      success: true,
      id,
      message: 'Request received successfully',
    });
  } catch (error: any) {
    console.error('Error saving submission:', error);
    return res.status(500).json({ error: 'Failed to process assessment request' });
  }
});

// Admin: Get all submissions with filters
app.get('/api/admin/submissions', requireAdmin, (req, res) => {
  try {
    const { service, status, search } = req.query;

    let query = 'SELECT * FROM submissions WHERE 1=1';
    const params: any[] = [];

    if (service && service !== 'ALL') {
      query += ' AND service = ?';
      params.push(service);
    }

    if (status && status !== 'ALL') {
      query += ' AND status = ?';
      params.push(status);
    }

    if (search) {
      query += ' AND (fullName LIKE ? OR whatsapp LIKE ? OR answers LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY createdAt DESC';

    const rows = db.prepare(query).all(...params) as any[];

    const submissions = rows.map((row) => ({
      ...row,
      answers: JSON.parse(row.answers || '{}'),
    }));

    return res.json({ success: true, count: submissions.length, submissions });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

// Admin: Update status
app.patch('/api/admin/submissions/:id/status', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['NEW', 'REVIEWING', 'CONTACTED', 'ACCEPTED', 'PAYMENT_PENDING', 'ACTIVE', 'COMPLETED'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const updateStmt = db.prepare('UPDATE submissions SET status = ? WHERE id = ?');
    const result = updateStmt.run(status, id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    return res.json({ success: true, id, status });
  } catch (error) {
    console.error('Error updating status:', error);
    return res.status(500).json({ error: 'Failed to update status' });
  }
});

// Admin: Update coach notes
app.patch('/api/admin/submissions/:id/notes', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const { coachNotes } = req.body;

    const updateStmt = db.prepare('UPDATE submissions SET coachNotes = ? WHERE id = ?');
    const result = updateStmt.run(coachNotes || '', id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    return res.json({ success: true, id, coachNotes });
  } catch (error) {
    console.error('Error updating notes:', error);
    return res.status(500).json({ error: 'Failed to update coach notes' });
  }
});

// Admin: Delete submission
app.delete('/api/admin/submissions/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const deleteStmt = db.prepare('DELETE FROM submissions WHERE id = ?');
    const result = deleteStmt.run(id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    return res.json({ success: true, message: 'Submission deleted' });
  } catch (error) {
    console.error('Error deleting submission:', error);
    return res.status(500).json({ error: 'Failed to delete submission' });
  }
});

// Admin: Export CSV
app.get('/api/admin/export', requireAdmin, (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM submissions ORDER BY createdAt DESC').all() as any[];

    const headers = ['ID', 'Date', 'Status', 'Service', 'Full Name', 'Age', 'WhatsApp', 'Language', 'Notes', 'Answers JSON'];
    const csvLines = [headers.join(',')];

    for (const r of rows) {
      const line = [
        `"${r.id}"`,
        `"${r.createdAt}"`,
        `"${r.status}"`,
        `"${r.service}"`,
        `"${(r.fullName || '').replace(/"/g, '""')}"`,
        `"${r.age}"`,
        `"${r.whatsapp}"`,
        `"${r.language}"`,
        `"${(r.coachNotes || '').replace(/"/g, '""')}"`,
        `"${(r.answers || '').replace(/"/g, '""')}"`,
      ];
      csvLines.push(line.join(','));
    }

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="boukraa_submissions_${Date.now()}.csv"`);
    return res.send(csvLines.join('\n'));
  } catch (error) {
    console.error('Error exporting CSV:', error);
    return res.status(500).json({ error: 'Failed to export CSV' });
  }
});

// Serve static frontend build if present
const distPath = path.join(__dirname, '../dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(distPath, 'index.html'));
    }
  });
}

app.listen(PORT, () => {
  console.log(`[BOUKRAA SERVER] Running on http://localhost:${PORT}`);
});
