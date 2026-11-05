import type { VercelRequest, VercelResponse } from '@vercel/node';

// In-memory fallback cache for serverless runtime
const recentSubmissions: any[] = [];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { service, fullName, age, whatsapp, answers, language } = req.body || {};

    if (!fullName || !whatsapp || !service) {
      return res.status(400).json({ error: 'Full name, WhatsApp, and service are required' });
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const id = `BK-${new Date().getFullYear()}-${randomSuffix}`;
    const createdAt = new Date().toISOString();

    const submissionRecord = {
      id,
      service,
      fullName: String(fullName).trim(),
      age: String(age || ''),
      whatsapp: String(whatsapp).trim(),
      answers: answers || {},
      status: 'NEW',
      coachNotes: '',
      language: language || 'fr',
      createdAt,
    };

    recentSubmissions.unshift(submissionRecord);
    if (recentSubmissions.length > 100) recentSubmissions.pop();

    // Log to Vercel runtime logs for immediate visibility
    console.log(`[VERCEL NEW SUBMISSION] ID: ${id} | Name: ${fullName} | Service: ${service} | WhatsApp: ${whatsapp}`);
    console.log('Answers:', JSON.stringify(answers));

    return res.status(201).json({
      success: true,
      id,
      message: 'Request received successfully',
    });
  } catch (error: any) {
    console.error('Error handling submission:', error);
    return res.status(500).json({ error: 'Internal server error processing assessment' });
  }
}
