import type { VercelRequest, VercelResponse } from '@vercel/node';
import { submissionsDb, StoredSubmission } from './_db.js';
import { sendSubmissionEmail } from './_email.js';

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
    const { service, fullName, age, whatsapp, email, answers, language } = req.body || {};

    if (!fullName || (!whatsapp && !email) || !service) {
      return res.status(400).json({ error: 'Full name, contact (WhatsApp or Email), and service are required' });
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const id = `BK-${new Date().getFullYear()}-${randomSuffix}`;
    const createdAt = new Date().toISOString();

    const clientEmail = (email || answers?.email || (whatsapp && String(whatsapp).includes('@') ? whatsapp : ''))
      ? String(email || answers?.email || (whatsapp && String(whatsapp).includes('@') ? whatsapp : '')).trim()
      : undefined;

    const submissionRecord: StoredSubmission = {
      id,
      service,
      fullName: String(fullName).trim(),
      age: String(age || ''),
      whatsapp: String(whatsapp || '').trim(),
      email: clientEmail,
      answers: answers || {},
      status: 'NEW',
      coachNotes: '',
      language: language || 'fr',
      createdAt,
    };

    submissionsDb.add(submissionRecord);

    console.log(
      `[VERCEL NEW SUBMISSION] ID: ${id} | Name: ${fullName} | Service: ${service} | Email: ${clientEmail || 'N/A'} | WhatsApp: ${whatsapp || 'N/A'}`
    );

    // Send email notification safely to coach@boukraa.net
    const emailResult = await sendSubmissionEmail(submissionRecord).catch((err) => {
      console.error('[EMAIL NOTIFICATION EXCEPTION]', err);
      return { success: false, error: err?.message };
    });

    return res.status(201).json({
      success: true,
      id,
      emailSent: emailResult.success,
      message: 'Request received successfully',
    });
  } catch (error: any) {
    console.error('Error handling submission:', error);
    return res.status(500).json({ error: 'Internal server error processing assessment' });
  }
}
