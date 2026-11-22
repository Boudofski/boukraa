import type { StoredSubmission } from './_db.js';

const SERVICE_TITLES: Record<string, { fr: string; en: string; ar: string }> = {
  strength_conditioning: {
    fr: 'PRÉPARATION PHYSIQUE (S&C)',
    en: 'STRENGTH & CONDITIONING',
    ar: 'الإعداد البدني',
  },
  reathletisation: {
    fr: 'RÉATHLÉTISATION (RETOUR AU SPORT)',
    en: 'RÉATHLÉTISATION (RETURN TO SPORT)',
    ar: 'إعادة التأهيل الرياضي',
  },
  private_coaching: {
    fr: 'COACHING PRIVÉ 1-ON-1',
    en: 'PRIVATE COACHING 1-ON-1',
    ar: 'التدريب الخاص المباشر',
  },
};

const QUESTION_LABELS: Record<string, string> = {
  fullName: 'Nom complet / Full Name',
  age: 'Âge / Age',
  email: 'Email',
  whatsapp: 'WhatsApp / Téléphone',
  sport: 'Sport pratiqué / Sport',
  mainGoal: 'Objectif principal / Main Goal',
  trainingLevel: 'Niveau actuel / Current Level',
  limitations: 'Facteurs limitants / Limitations',
  limitationsExplanation: 'Précisions limitations / Explanation',
  programDuration: 'Durée souhaitée / Program Duration',
  trainingFrequency: 'Fréquence / Weekly Frequency',
  injuryDescription: 'Nature de la blessure / Injury Details',
  injuryDate: 'Date de blessure / Injury Date',
  completedRehab: 'Rééducation terminée / Completed Rehab',
  clearedToReturn: 'Autorisation médicale / Medical Clearance',
  physioRecommendations: 'Recommandations kiné / Physio Guidance',
  additionalNotes: 'Précisions utiles / Additional Notes',
};

const VALUE_LABELS: Record<string, string> = {
  strength: 'Gagner en force / Increase strength',
  muscle: 'Prendre du muscle / Build muscle',
  fat_loss: 'Perdre de la masse grasse / Lose fat',
  speed: 'Améliorer la vitesse / Improve speed',
  fitness: 'Condition physique générale / General fitness',
  beginner: 'Débutant / Beginner (< 1 an)',
  intermediate: 'Intermédiaire / Intermediate (1-3 ans)',
  advanced: 'Avancé / Advanced (> 3 ans)',
  nothing: 'Rien à signaler / Nothing',
  injury: 'Blessure / Injury',
  pain: 'Douleur / Pain',
  medical: 'Condition médicale / Medical',
  other: 'Autre / Other',
  yes: 'Oui / Yes',
  no: 'Non / No',
  not_sure: 'Pas certain(e) / Not sure',
};

function formatValue(key: string, val: any): string {
  if (val === undefined || val === null || val === '') return '—';
  if (typeof val === 'boolean') return val ? 'Oui / Yes' : 'Non / No';
  const str = String(val);
  if (VALUE_LABELS[str]) return VALUE_LABELS[str];
  if (key === 'programDuration') return `${str} mois / months`;
  if (key === 'trainingFrequency') return `${str} séance(s) par semaine / sessions per week`;
  return str;
}

function getCleanDigits(phone: string): string {
  return phone.replace(/[^0-9]/g, '');
}

export function buildEmailContent(submission: StoredSubmission): {
  subject: string;
  html: string;
  text: string;
  replyToEmail: string | undefined;
} {
  const serviceInfo = SERVICE_TITLES[submission.service] || {
    fr: submission.service,
    en: submission.service,
    ar: submission.service,
  };

  const clientEmail =
    submission.email ||
    submission.answers.email ||
    (submission.whatsapp.includes('@') ? submission.whatsapp : undefined);

  const rawPhone = submission.whatsapp || submission.answers.whatsapp || '';
  const phoneDigits = getCleanDigits(rawPhone);
  const waUrl = phoneDigits ? `https://wa.me/${phoneDigits}` : '';

  const subject = `[BOUKRAA] Nouvelle Demande : ${serviceInfo.fr} - ${submission.fullName} (${submission.id})`;

  // Build answer table rows
  const answerEntries = Object.entries(submission.answers || {});
  const tableRowsHtml = answerEntries
    .filter(([key]) => key !== 'fullName' && key !== 'age' && key !== 'email' && key !== 'whatsapp')
    .map(([key, value]) => {
      const label = QUESTION_LABELS[key] || key;
      const formatted = formatValue(key, value);
      return `
        <tr>
          <td style="padding: 10px 14px; border-bottom: 1px solid #E5E5E0; color: #777F87; font-size: 13px; font-weight: 600; width: 40%; vertical-align: top;">
            ${label}
          </td>
          <td style="padding: 10px 14px; border-bottom: 1px solid #E5E5E0; color: #14283B; font-size: 13px; font-weight: 500; vertical-align: top;">
            ${formatted.replace(/\n/g, '<br/>')}
          </td>
        </tr>
      `;
    })
    .join('');

  const replyMailto = clientEmail
    ? `mailto:${clientEmail}?subject=${encodeURIComponent(
        `BOUKRAA Coaching — Suite à votre demande (${submission.id})`
      )}`
    : '';

  const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F5F5F2; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #14283B;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #F5F5F2; padding: 24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 620px; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; border: 1px solid #E5E5E0; box-shadow: 0 4px 16px rgba(0,0,0,0.06);">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #14283B; padding: 28px 32px; border-bottom: 3px solid #EF252D;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <div style="font-size: 11px; letter-spacing: 3px; font-weight: 800; color: #EF252D; text-transform: uppercase; margin-bottom: 4px;">
                      NOUVELLE DEMANDE D'ÉVALUATION
                    </div>
                    <div style="font-size: 24px; font-weight: 900; color: #FFFFFF; letter-spacing: 0.5px;">
                      BOUKRAA COACHING
                    </div>
                  </td>
                  <td align="right" style="vertical-align: middle;">
                    <span style="background-color: rgba(239, 37, 45, 0.18); border: 1px solid #EF252D; color: #FFFFFF; font-family: ui-monospace, monospace; font-size: 12px; font-weight: 800; padding: 6px 12px; rounded: 8px; border-radius: 6px;">
                      ${submission.id}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Client Overview Card -->
          <tr>
            <td style="padding: 28px 32px 16px 32px;">
              <div style="background-color: #F5F5F2; border: 1px solid #E5E5E0; border-radius: 12px; padding: 20px 24px; margin-bottom: 24px;">
                <div style="font-size: 11px; font-weight: 800; letter-spacing: 1.5px; color: #EF252D; text-transform: uppercase; margin-bottom: 8px;">
                  SERVICE DEMANDÉ : ${serviceInfo.fr}
                </div>
                <div style="font-size: 20px; font-weight: 800; color: #14283B; margin-bottom: 12px;">
                  ${submission.fullName} <span style="font-size: 14px; font-weight: 500; color: #777F87;">(${submission.age} ans)</span>
                </div>
                
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-size: 13px; line-height: 1.6;">
                  ${
                    clientEmail
                      ? `<tr>
                          <td style="padding: 3px 0; color: #777F87; font-weight: 600; width: 110px;">Email :</td>
                          <td style="padding: 3px 0;"><a href="mailto:${clientEmail}" style="color: #14283B; font-weight: 700; text-decoration: underline;">${clientEmail}</a></td>
                        </tr>`
                      : ''
                  }
                  ${
                    rawPhone
                      ? `<tr>
                          <td style="padding: 3px 0; color: #777F87; font-weight: 600; width: 110px;">WhatsApp :</td>
                          <td style="padding: 3px 0;">
                            <span style="color: #14283B; font-weight: 700;">${rawPhone}</span>
                            ${
                              waUrl
                                ? ` &nbsp;·&nbsp; <a href="${waUrl}" target="_blank" style="color: #10B981; font-weight: 700; text-decoration: none;">Ouvrir sur WhatsApp →</a>`
                                : ''
                            }
                          </td>
                        </tr>`
                      : ''
                  }
                  <tr>
                    <td style="padding: 3px 0; color: #777F87; font-weight: 600;">Langue :</td>
                    <td style="padding: 3px 0; color: #14283B; font-weight: 600; text-transform: uppercase;">${submission.language || 'FR'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 3px 0; color: #777F87; font-weight: 600;">Reçue le :</td>
                    <td style="padding: 3px 0; color: #777F87;">${new Date(submission.createdAt).toLocaleString('fr-FR', { timeZone: 'Africa/Casablanca' })}</td>
                  </tr>
                </table>
              </div>

              <!-- Quick Actions -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 28px;">
                <tr>
                  ${
                    replyMailto
                      ? `<td style="padding-right: 8px;">
                          <a href="${replyMailto}" style="display: block; text-align: center; background-color: #EF252D; color: #FFFFFF; font-size: 12px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; text-decoration: none; padding: 12px 16px; border-radius: 8px;">
                            ✉ Répondre par Email
                          </a>
                        </td>`
                      : ''
                  }
                  ${
                    waUrl
                      ? `<td style="padding-right: 8px;">
                          <a href="${waUrl}" target="_blank" style="display: block; text-align: center; background-color: #10B981; color: #FFFFFF; font-size: 12px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; text-decoration: none; padding: 12px 16px; border-radius: 8px;">
                            💬 WhatsApp
                          </a>
                        </td>`
                      : ''
                  }
                  <td>
                    <a href="https://boukraa.vercel.app/#admin" target="_blank" style="display: block; text-align: center; background-color: #14283B; color: #FFFFFF; font-size: 12px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; text-decoration: none; padding: 12px 16px; border-radius: 8px;">
                      Espace Coach →
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Detailed Answers -->
              <div style="border-top: 1px solid #E5E5E0; padding-top: 20px; margin-bottom: 12px;">
                <div style="font-size: 13px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; color: #14283B; margin-bottom: 12px;">
                  DÉTAIL DU QUESTIONNAIRE
                </div>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border: 1px solid #E5E5E0; border-radius: 8px; border-collapse: separate; border-spacing: 0; overflow: hidden;">
                  ${tableRowsHtml}
                </table>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #F5F5F2; padding: 20px 32px; border-top: 1px solid #E5E5E0; text-align: center;">
              <div style="font-size: 11px; color: #777F87; line-height: 1.5;">
                Notification automatique générée par la plateforme <strong>boukraa.vercel.app</strong>.<br/>
                Vous pouvez répondre directement à cet email pour contacter <strong>${submission.fullName}</strong>.
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const text = `
NOUVELLE DEMANDE D'ÉVALUATION - BOUKRAA COACHING
------------------------------------------------
Référence : ${submission.id}
Service : ${serviceInfo.fr}
Client : ${submission.fullName} (${submission.age} ans)
Email : ${clientEmail || 'Non renseigné'}
WhatsApp : ${rawPhone || 'Non renseigné'}
Date : ${submission.createdAt}
Langue : ${submission.language}

DÉTAILS DU QUESTIONNAIRE :
${answerEntries
  .filter(([k]) => k !== 'fullName' && k !== 'age' && k !== 'email' && k !== 'whatsapp')
  .map(([k, v]) => `• ${QUESTION_LABELS[k] || k} : ${formatValue(k, v)}`)
  .join('\n')}

Pour répondre directement à l'athlète, répondez à cet email ou écrivez à : ${clientEmail || rawPhone}
Lien WhatsApp direct : ${waUrl || 'N/A'}
Espace Coach : https://boukraa.vercel.app/#admin
  `.trim();

  return { subject, html, text, replyToEmail: clientEmail };
}

export async function sendSubmissionEmail(submission: StoredSubmission): Promise<{
  success: boolean;
  provider?: string;
  id?: string;
  error?: string;
}> {
  const targetRecipient = process.env.NOTIFICATION_EMAIL || 'coach@boukraa.net';
  const { subject, html, text, replyToEmail } = buildEmailContent(submission);

  // 1. Try Resend API (Recommended free system)
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      const fromEmail = process.env.EMAIL_FROM || 'BOUKRAA <notifications@boukraa.net>';

      const payload: any = {
        from: fromEmail,
        to: [targetRecipient],
        subject,
        html,
        text,
      };

      if (replyToEmail) {
        payload.reply_to = replyToEmail;
      }

      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = (await res.json().catch(() => ({}))) as any;

      if (!res.ok) {
        console.warn('[RESEND ERROR]', data);
        // If domain not verified yet on custom from address, try onboarding sandbox if to is owner
        if (data?.message?.includes('domain') && !fromEmail.includes('resend.dev')) {
          console.log('[RESEND RETRY] Retrying with onboarding@resend.dev...');
          const retryRes = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${resendApiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...payload,
              from: 'BOUKRAA Coaching <onboarding@resend.dev>',
            }),
          });
          const retryData = await retryRes.json().catch(() => ({}));
          if (retryRes.ok) {
            console.log(`[EMAIL SENT VIA RESEND SANDBOX] ID: ${retryData.id} to ${targetRecipient}`);
            return { success: true, provider: 'resend-sandbox', id: retryData.id };
          }
        }
        throw new Error(data.message || 'Resend API error');
      }

      console.log(`[EMAIL SENT VIA RESEND] ID: ${data.id} to ${targetRecipient}`);
      return { success: true, provider: 'resend', id: data.id };
    } catch (err: any) {
      console.error('[EMAIL ERROR RESEND]', err.message);
    }
  }

  // 2. Try SMTP via Nodemailer if SMTP credentials are provided (e.g. Spaceship Spacemail, Hostinger, Gmail)
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const nodemailer = await import('nodemailer');
      const port = Number(process.env.SMTP_PORT) || 465;
      const secure = port === 465;

      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port,
        secure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const mailOptions: any = {
        from: process.env.EMAIL_FROM || `"BOUKRAA Coaching" <${smtpUser}>`,
        to: targetRecipient,
        subject,
        text,
        html,
      };

      if (replyToEmail) {
        mailOptions.replyTo = replyToEmail;
      }

      const info = await transporter.sendMail(mailOptions);
      console.log(`[EMAIL SENT VIA SMTP] ID: ${info.messageId} to ${targetRecipient}`);
      return { success: true, provider: 'smtp', id: info.messageId };
    } catch (err: any) {
      console.error('[EMAIL ERROR SMTP]', err.message);
    }
  }

  // 3. Try Web3Forms access key (zero-config free fallback)
  const web3formsKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (web3formsKey) {
    try {
      const formPayload: any = {
        access_key: web3formsKey,
        subject,
        from_name: `BOUKRAA - ${submission.fullName}`,
        email: replyToEmail || 'no-reply@boukraa.net',
        message: text,
      };

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formPayload),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        console.log(`[EMAIL SENT VIA WEB3FORMS] to ${targetRecipient}`);
        return { success: true, provider: 'web3forms' };
      }
    } catch (err: any) {
      console.error('[EMAIL ERROR WEB3FORMS]', err.message);
    }
  }

  console.log(
    `[EMAIL NOT SENT - NO PROVIDER CONFIGURED] Submission ${submission.id} saved in database. Set RESEND_API_KEY or SMTP_HOST/USER/PASS in Vercel environment variables to enable automatic delivery to ${targetRecipient}.`
  );

  return {
    success: false,
    error: 'No email service configured. Set RESEND_API_KEY in environment variables.',
  };
}
