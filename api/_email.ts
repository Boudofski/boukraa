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

/**
 * Build the notification email sent to Coach Boukraa
 */
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
    submission.answers?.email ||
    (submission.whatsapp?.includes('@') ? submission.whatsapp : undefined);

  const rawPhone = submission.whatsapp || submission.answers?.whatsapp || '';
  const phoneDigits = getCleanDigits(rawPhone);
  const waUrl = phoneDigits ? `https://wa.me/${phoneDigits}` : '';

  const subject = `[BOUKRAA] Nouvelle Demande : ${serviceInfo.fr} - ${submission.fullName} (${submission.id})`;

  // Build answer table rows
  const answerEntries = Object.entries(submission.answers || {});
  const tableRowsHtml = answerEntries
    .filter(([key]) => key !== 'fullName' && key !== 'age' && key !== 'email' && key !== 'whatsapp')
    .map(([key, val], idx) => {
      const label = QUESTION_LABELS[key] || key;
      const formatted = formatValue(key, val);
      const bg = idx % 2 === 0 ? '#FFFFFF' : '#F9F9F7';
      return `
        <tr style="background-color: ${bg}; border-bottom: 1px solid #E5E5E0;">
          <td style="padding: 10px 14px; font-weight: 700; color: #14283B; font-size: 12px; width: 38%; vertical-align: top;">
            ${label}
          </td>
          <td style="padding: 10px 14px; color: #2C3E50; font-size: 13px; line-height: 1.5; vertical-align: top;">
            ${formatted}
          </td>
        </tr>
      `;
    })
    .join('');

  const replyMailto = clientEmail
    ? `mailto:${clientEmail}?subject=${encodeURIComponent(`Re: Votre demande BOUKRAA Coaching (${submission.id})`)}`
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
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #E5E5E0; box-shadow: 0 4px 14px rgba(20, 40, 59, 0.06);">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #14283B; padding: 26px 32px; border-bottom: 3px solid #EF252D;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <div style="font-size: 20px; font-weight: 900; letter-spacing: 2px; color: #FFFFFF; text-transform: uppercase;">
                      BOUKRAA
                    </div>
                    <div style="font-size: 11px; font-weight: 600; letter-spacing: 1.5px; color: #EF252D; text-transform: uppercase; margin-top: 4px;">
                      NOUVELLE DEMANDE D'ÉVALUATION
                    </div>
                  </td>
                  <td align="right">
                    <span style="display: inline-block; background-color: rgba(255,255,255,0.12); color: #FFFFFF; font-family: monospace; font-size: 12px; font-weight: 700; padding: 6px 12px; border-radius: 6px; letter-spacing: 1px;">
                      ${submission.id}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Summary Box -->
          <tr>
            <td style="padding: 28px 32px 18px 32px;">
              <div style="background-color: #F5F5F2; border-left: 4px solid #EF252D; border-radius: 6px; padding: 18px 20px; margin-bottom: 24px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-size: 13px;">
                  <tr>
                    <td style="padding: 3px 0; color: #777F87; font-weight: 600; width: 110px;">Athlète :</td>
                    <td style="padding: 3px 0; color: #14283B; font-weight: 800; font-size: 15px;">${submission.fullName} (${submission.age} ans)</td>
                  </tr>
                  <tr>
                    <td style="padding: 3px 0; color: #777F87; font-weight: 600;">Service :</td>
                    <td style="padding: 3px 0; color: #EF252D; font-weight: 800; text-transform: uppercase;">${serviceInfo.fr}</td>
                  </tr>
                  ${
                    clientEmail
                      ? `<tr>
                          <td style="padding: 3px 0; color: #777F87; font-weight: 600;">Email :</td>
                          <td style="padding: 3px 0;">
                            <a href="mailto:${clientEmail}" style="color: #14283B; font-weight: 700; text-decoration: none;">${clientEmail}</a>
                          </td>
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
  `.trim();

  const text = `
NOUVELLE DEMANDE D'ÉVALUATION - BOUKRAA (${submission.id})
Service : ${serviceInfo.fr}
Athlète : ${submission.fullName} (${submission.age} ans)
Email : ${clientEmail || 'Non renseigné'}
WhatsApp : ${rawPhone || 'Non renseigné'}
Langue : ${submission.language || 'FR'}
Date : ${submission.createdAt}

--- RÉPONSES DU QUESTIONNAIRE ---
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

/**
 * Build the automatic response email sent directly to the applicant
 */
export function buildAutoReplyContent(submission: StoredSubmission): {
  subject: string;
  html: string;
  text: string;
} {
  const lang = (submission.language || 'fr').toLowerCase();
  const serviceInfo = SERVICE_TITLES[submission.service] || {
    fr: submission.service,
    en: submission.service,
    ar: submission.service,
  };

  const clientName = submission.fullName || 'Athlète';
  const serviceName = lang === 'ar' ? serviceInfo.ar : lang === 'en' ? serviceInfo.en : serviceInfo.fr;

  let subject = `[BOUKRAA] Confirmation de votre demande d'évaluation (${submission.id})`;
  if (lang === 'ar') {
    subject = `[BOUKRAA] تم استلام طلبك بنجاح — الكوتش بوكرع محمد أمين (${submission.id})`;
  } else if (lang === 'en') {
    subject = `[BOUKRAA] Assessment request received — Coach Mohamed Amine Boukraa (${submission.id})`;
  }

  // Localized texts
  let title = "DEMANDE BIEN REÇUE";
  let greeting = `Bonjour ${clientName},`;
  let p1 = `Merci pour votre démarche. Votre formulaire d'évaluation pour le service <strong>${serviceName}</strong> a bien été transmis au Coach Mohamed Amine Boukraa.`;
  let p2 = `Chaque programme d'entraînement est construit sur-mesure autour de vos objectifs, de votre niveau et de vos contraintes. Afin de garantir un accompagnement de haute qualité, un nombre limité de nouveaux athlètes et clients est accepté chaque mois.`;
  let p3 = `Votre demande est actuellement en cours d'analyse personnelle. Je reviendrai vers vous dans les plus brefs délais avec une proposition adaptée (par email ou directement sur WhatsApp).`;
  let recapTitle = "RÉCAPITULATIF DE VOTRE DEMANDE";
  let refLabel = "Référence dossier :";
  let coachRole = "Enseignant d'EPS · Préparateur Physique · Entraîneur de Football";
  let signoff = "À très bientôt,";
  let direction = "ltr";
  let align = "left";

  if (lang === 'ar') {
    direction = "rtl";
    align = "right";
    title = "تم استلام طلبك بنجاح";
    greeting = `السلام عليكم ${clientName}،`;
    p1 = `شكراً لاهتمامك وثقتك. تم استلام استمارة التقييم الخاصة بك لخدمة <strong>${serviceName}</strong> بنجاح لدى الكوتش بوكرع محمد أمين.`;
    p2 = `كل برنامج تدريبي يتم تصميمه خصيصاً وبشكل فردي وفقاً لأهدافك ومستواك وظروفك. ولضمان أعلى جودة من المتابعة والاهتمام، أقبل عدداً محدوداً من المتدربين الجدد شهرياً.`;
    p3 = `طلبك قيد المراجعة الشخصية حالياً، وسأتواصل معك شخصياً في أقرب وقت بالمقترح والخطة التدريبية الأنسب (عبر البريد الإلكتروني أو مباشرة عبر الواتساب).`;
    recapTitle = "ملخص طلبك";
    refLabel = "الرقم المرجعي :";
    coachRole = "أستاذ تربية بدنية · معد بدني · مدرب كرة قدم";
    signoff = "مع تحياتي،";
  } else if (lang === 'en') {
    title = "REQUEST RECEIVED";
    greeting = `Hello ${clientName},`;
    p1 = `Thank you for reaching out. Your assessment questionnaire for <strong>${serviceName}</strong> has been received by Coach Mohamed Amine Boukraa.`;
    p2 = `Every training program is individually designed around your goals, current level, and schedule. To maintain a high level of coaching support, I accept a limited number of new clients each month.`;
    p3 = `Your request is currently being personally reviewed. I will get back to you shortly with the best coaching approach and next steps (via email or directly on WhatsApp).`;
    recapTitle = "SUMMARY OF YOUR REQUEST";
    refLabel = "Reference ID:";
    coachRole = "PE Teacher · Strength & Conditioning Coach · Football Coach";
    signoff = "Best regards,";
  }

  const html = `
<!DOCTYPE html>
<html lang="${lang}" dir="${direction}">
<head>
  <meta charset="UTF-8">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F5F5F2; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #14283B;" dir="${direction}">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #F5F5F2; padding: 24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 580px; background-color: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #E5E5E0; box-shadow: 0 4px 14px rgba(20, 40, 59, 0.06); text-align: ${align};">
          
          <!-- Header Banner -->
          <tr>
            <td style="background-color: #14283B; padding: 28px 32px; border-bottom: 3px solid #EF252D;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <div style="font-size: 22px; font-weight: 900; letter-spacing: 2px; color: #FFFFFF; text-transform: uppercase;">
                      BOUKRAA
                    </div>
                    <div style="font-size: 11px; font-weight: 600; letter-spacing: 1.5px; color: #EF252D; text-transform: uppercase; margin-top: 4px;">
                      ${title}
                    </div>
                  </td>
                  <td align="${direction === 'rtl' ? 'left' : 'right'}">
                    <span style="display: inline-block; background-color: rgba(255,255,255,0.12); color: #FFFFFF; font-family: monospace; font-size: 12px; font-weight: 700; padding: 6px 12px; border-radius: 6px;">
                      ${submission.id}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 32px;">
              <h2 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 800; color: #14283B;">
                ${greeting}
              </h2>

              <p style="font-size: 14px; line-height: 1.6; color: #2C3E50; margin: 0 0 14px 0;">
                ${p1}
              </p>

              <div style="background-color: #F9F9F7; border-left: 3px solid #EF252D; border-radius: 6px; padding: 14px 16px; margin: 18px 0; font-size: 13px; line-height: 1.6; color: #555E68;">
                ${p2}
              </div>

              <p style="font-size: 14px; line-height: 1.6; color: #2C3E50; margin: 0 0 24px 0;">
                ${p3}
              </p>

              <!-- Recap Box -->
              <div style="background-color: #F5F5F2; border: 1px solid #E5E5E0; border-radius: 8px; padding: 16px 18px; margin-bottom: 24px;">
                <div style="font-size: 11px; font-weight: 800; letter-spacing: 1px; color: #14283B; text-transform: uppercase; margin-bottom: 10px;">
                  ${recapTitle}
                </div>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-size: 12px;">
                  <tr>
                    <td style="padding: 3px 0; color: #777F87; width: 40%; font-weight: 600;">${refLabel}</td>
                    <td style="padding: 3px 0; font-weight: 700; color: #14283B; font-family: monospace;">${submission.id}</td>
                  </tr>
                  <tr>
                    <td style="padding: 3px 0; color: #777F87; font-weight: 600;">Service :</td>
                    <td style="padding: 3px 0; font-weight: 700; color: #EF252D;">${serviceName}</td>
                  </tr>
                  ${
                    submission.answers?.sport
                      ? `<tr>
                          <td style="padding: 3px 0; color: #777F87; font-weight: 600;">Sport :</td>
                          <td style="padding: 3px 0; font-weight: 700; color: #14283B;">${submission.answers.sport}</td>
                        </tr>`
                      : ''
                  }
                  ${
                    submission.answers?.mainGoal
                      ? `<tr>
                          <td style="padding: 3px 0; color: #777F87; font-weight: 600;">Objectif :</td>
                          <td style="padding: 3px 0; font-weight: 700; color: #14283B;">${formatValue('mainGoal', submission.answers.mainGoal)}</td>
                        </tr>`
                      : ''
                  }
                </table>
              </div>

              <!-- Coach Signature -->
              <div style="border-top: 1px solid #E5E5E0; padding-top: 20px; margin-top: 20px;">
                <p style="font-size: 13px; color: #777F87; margin: 0 0 6px 0;">
                  ${signoff}
                </p>
                <div style="font-size: 16px; font-weight: 900; color: #14283B; letter-spacing: 0.5px;">
                  Mohamed Amine Boukraa (بوكرع محمد أمين)
                </div>
                <div style="font-size: 12px; font-weight: 600; color: #777F87; margin-top: 2px;">
                  ${coachRole}
                </div>
                <div style="font-size: 12px; font-weight: 700; color: #EF252D; margin-top: 6px;">
                  <a href="https://www.boukraa.net" style="color: #EF252D; text-decoration: none;">www.boukraa.net</a>
                </div>
              </div>

            </td>
          </tr>

          <!-- Footer Social Links -->
          <tr>
            <td style="background-color: #F5F5F2; padding: 20px 32px; border-top: 1px solid #E5E5E0; text-align: center;">
              <div style="font-size: 12px; color: #777F87; margin-bottom: 8px;">
                Suivez Coach Boukraa sur les réseaux sociaux :
              </div>
              <div style="font-size: 12px;">
                <a href="https://www.instagram.com/coachboukraa/" target="_blank" style="color: #14283B; font-weight: 700; text-decoration: none; margin: 0 8px;">Instagram</a> ·
                <a href="https://www.facebook.com/p/Coach-Boukraa-61596358826407/" target="_blank" style="color: #14283B; font-weight: 700; text-decoration: none; margin: 0 8px;">Facebook</a> ·
                <a href="https://www.tiktok.com/@coach.boukraa" target="_blank" style="color: #14283B; font-weight: 700; text-decoration: none; margin: 0 8px;">TikTok</a>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  const text = `
${greeting}

${p1.replace(/<[^>]+>/g, '')}

${p2}

${p3}

Référence : ${submission.id}
Service : ${serviceName}

${signoff}
Mohamed Amine Boukraa (بوكرع محمد أمين)
${coachRole}
https://www.boukraa.net
  `.trim();

  return { subject, html, text };
}

/**
 * Universal email sender with automatic provider selection:
 * 1. Hostinger Mail API (direct, high deliverability, native to coach@boukraa.net)
 * 2. Resend REST API
 * 3. Nodemailer SMTP
 * 4. Web3Forms fallback
 */
async function sendEmailWithProvider({
  to,
  subject,
  html,
  text,
  replyToEmail,
  replyToName,
}: {
  to: string[];
  subject: string;
  html: string;
  text: string;
  replyToEmail?: string;
  replyToName?: string;
}): Promise<{ success: boolean; provider?: string; id?: string; error?: string }> {
  // 1. Hostinger Mail API (Primary default for Hostinger setup)
  const hostingerToken =
    process.env.HOSTINGER_MAIL_TOKEN ||
    '1303a171f7580eb0165630013e4a1ab11a85c1d1474cafd17b1e5d2fc192133d';
  const hostingerMailboxId =
    process.env.HOSTINGER_MAILBOX_ID || 'AC55ebeba0ae74a3a8de626fdd8460';

  if (hostingerToken && hostingerMailboxId) {
    try {
      const payload: any = {
        to,
        subject,
        html,
        text,
      };

      if (replyToEmail) {
        payload.replyTo = [{ name: replyToName || '', address: replyToEmail }];
      }

      const res = await fetch(
        `https://api.mail.hostinger.com/api/v1/mailboxes/${hostingerMailboxId}/send`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${hostingerToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok || res.status === 204) {
        console.log(`[HOSTINGER MAIL API SENT] to: ${to.join(', ')} | subject: ${subject}`);
        return { success: true, provider: 'hostinger-api' };
      } else {
        const errorText = await res.text().catch(() => '');
        console.warn(`[HOSTINGER MAIL API FAILED ${res.status}]`, errorText);
      }
    } catch (err: any) {
      console.error('[HOSTINGER MAIL API ERROR]', err.message);
    }
  }

  // 2. Resend API (Fallback / Alternative)
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      const fromEmail = process.env.EMAIL_FROM || 'BOUKRAA <coach@boukraa.net>';

      const payload: any = {
        from: fromEmail,
        to,
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
        if (data?.message?.includes('domain') && !fromEmail.includes('resend.dev')) {
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
            console.log(`[EMAIL SENT VIA RESEND SANDBOX] ID: ${retryData.id}`);
            return { success: true, provider: 'resend-sandbox', id: retryData.id };
          }
        }
        throw new Error(data.message || 'Resend API error');
      }

      console.log(`[EMAIL SENT VIA RESEND] ID: ${data.id}`);
      return { success: true, provider: 'resend', id: data.id };
    } catch (err: any) {
      console.error('[EMAIL ERROR RESEND]', err.message);
    }
  }

  // 3. SMTP via Nodemailer (e.g. smtp.hostinger.com)
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
        to: to.join(', '),
        subject,
        text,
        html,
      };

      if (replyToEmail) {
        mailOptions.replyTo = replyToEmail;
      }

      const info = await transporter.sendMail(mailOptions);
      console.log(`[EMAIL SENT VIA SMTP] ID: ${info.messageId}`);
      return { success: true, provider: 'smtp', id: info.messageId };
    } catch (err: any) {
      console.error('[EMAIL ERROR SMTP]', err.message);
    }
  }

  // 4. Web3Forms fallback
  const web3formsKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (web3formsKey) {
    try {
      const formPayload: any = {
        access_key: web3formsKey,
        subject,
        from_name: 'BOUKRAA Coaching',
        email: replyToEmail || 'coach@boukraa.net',
        message: text,
      };

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formPayload),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        return { success: true, provider: 'web3forms' };
      }
    } catch (err: any) {
      console.error('[EMAIL ERROR WEB3FORMS]', err.message);
    }
  }

  return {
    success: false,
    error: 'No email service could dispatch the message.',
  };
}

/**
 * Send notification to Coach Boukraa (delivered to coach@boukraa.net)
 */
export async function sendSubmissionEmail(submission: StoredSubmission): Promise<{
  success: boolean;
  provider?: string;
  id?: string;
  error?: string;
}> {
  const envRecipients = process.env.NOTIFICATION_EMAIL
    ? process.env.NOTIFICATION_EMAIL.split(',').map((e) => e.trim()).filter(Boolean)
    : ['coach@boukraa.net'];

  const { subject, html, text, replyToEmail } = buildEmailContent(submission);

  // Send to each recipient independently so that one invalid domain never blocks the other
  const results = await Promise.allSettled(
    envRecipients.map((recipient) =>
      sendEmailWithProvider({
        to: [recipient],
        subject,
        html,
        text,
        replyToEmail,
        replyToName: submission.fullName,
      })
    )
  );

  const successful = results.some((r) => r.status === 'fulfilled' && r.value.success);
  return {
    success: successful,
    provider: 'hostinger-api',
  };
}

/**
 * Send automatic confirmation reply to the applicant
 */
export async function sendApplicantAutoReply(submission: StoredSubmission): Promise<{
  success: boolean;
  provider?: string;
  error?: string;
}> {
  const clientEmail =
    submission.email ||
    submission.answers?.email ||
    (submission.whatsapp?.includes('@') ? submission.whatsapp : undefined);

  if (!clientEmail || !clientEmail.includes('@')) {
    console.log(`[AUTO-REPLY SKIPPED] No valid applicant email for submission ${submission.id}`);
    return { success: false, error: 'No client email provided' };
  }

  const { subject, html, text } = buildAutoReplyContent(submission);

  return sendEmailWithProvider({
    to: [clientEmail.trim()],
    subject,
    html,
    text,
    replyToEmail: process.env.REPLY_TO_EMAIL || 'coach@boukraa.net',
    replyToName: 'Coach Mohamed Amine Boukraa',
  });
}
