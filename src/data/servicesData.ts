import { ServiceDefinition, Question, QuestionOption } from '../types';

/* ---------------------------------------------------------------
 * Questionnaires — follow the BOUKRAA project brief (sections 11–13).
 * Field ids (fullName, age, whatsapp) are kept for backend/admin compatibility.
 * ------------------------------------------------------------- */

const fullName: Question = {
  id: 'fullName',
  title: { fr: 'Quel est votre nom complet ?', ar: 'ما هو اسمك الكامل؟', en: 'What is your full name?' },
  type: 'text',
  required: true,
  placeholder: { fr: 'Prénom et nom', ar: 'الاسم واللقب', en: 'First and last name' },
};

const age: Question = {
  id: 'age',
  title: { fr: 'Quel est votre âge ?', ar: 'كم عمرك؟', en: 'How old are you?' },
  type: 'number',
  required: true,
  placeholder: { fr: 'Ex : 25', ar: 'مثال: 25', en: 'e.g. 25' },
};

const whatsapp: Question = {
  id: 'whatsapp',
  title: { fr: 'Quel est votre numéro WhatsApp ?', ar: 'ما هو رقم الواتساب الخاص بك؟', en: 'What is your WhatsApp number?' },
  subtitle: {
    fr: 'Pour vous recontacter. Incluez l’indicatif pays.',
    ar: 'للتواصل معك. أضف رمز الدولة.',
    en: 'So I can contact you. Include the country code.',
  },
  type: 'tel',
  required: true,
  placeholder: { fr: '+212 6… / +33 6…', ar: '‎+212 6… / +33 6…', en: '+212 6… / +33 6…' },
};

const sport = (required = true): Question => ({
  id: 'sport',
  title: { fr: 'Quel sport pratiquez-vous ?', ar: 'ما هي الرياضة التي تمارسها؟', en: 'What sport do you practice?' },
  subtitle: { fr: 'Si aucun : « Aucun ».', ar: 'إذا لم تكن تمارس أي رياضة: «لا شيء».', en: 'If none: “None”.' },
  type: 'text',
  required,
  placeholder: { fr: 'Football, course à pied, aucun…', ar: 'كرة القدم، الجري، لا شيء…', en: 'Football, running, none…' },
});

const mainGoal: Question = {
  id: 'mainGoal',
  title: { fr: 'Quel est votre objectif principal ?', ar: 'ما هو هدفك الأساسي؟', en: 'What is your main goal?' },
  type: 'radio',
  required: true,
  options: [
    { value: 'strength', label: { fr: 'Gagner en force', ar: 'زيادة القوة', en: 'Increase strength' } },
    { value: 'muscle', label: { fr: 'Prendre du muscle', ar: 'بناء العضلات', en: 'Build muscle' } },
    { value: 'fat_loss', label: { fr: 'Perdre de la masse grasse', ar: 'خسارة الدهون', en: 'Lose fat' } },
    { value: 'speed', label: { fr: 'Améliorer la vitesse', ar: 'تحسين السرعة', en: 'Improve speed' } },
    { value: 'fitness', label: { fr: 'Améliorer la condition physique générale', ar: 'تحسين اللياقة البدنية العامة', en: 'Improve general fitness' } },
  ],
};

const trainingLevel: Question = {
  id: 'trainingLevel',
  title: { fr: 'Quel est votre niveau d’entraînement actuel ?', ar: 'ما هو مستواك التدريبي الحالي؟', en: 'What is your current training level?' },
  type: 'radio',
  required: true,
  options: [
    { value: 'beginner', label: { fr: 'Débutant', ar: 'مبتدئ', en: 'Beginner' } },
    { value: 'intermediate', label: { fr: 'Intermédiaire', ar: 'متوسط', en: 'Intermediate' } },
    { value: 'advanced', label: { fr: 'Avancé', ar: 'متقدم', en: 'Advanced' } },
  ],
};

const limitations: Question = {
  id: 'limitations',
  title: {
    fr: 'Quelque chose pourrait-il limiter votre entraînement ?',
    ar: 'هل هناك ما قد يحد من تدريبك؟',
    en: 'Anything that could limit your training?',
  },
  type: 'radio',
  required: true,
  options: [
    { value: 'nothing', label: { fr: 'Rien', ar: 'لا شيء', en: 'Nothing' } },
    { value: 'injury', label: { fr: 'Blessure', ar: 'إصابة', en: 'Injury' } },
    { value: 'pain', label: { fr: 'Douleur', ar: 'ألم', en: 'Pain' } },
    { value: 'medical', label: { fr: 'Condition médicale', ar: 'حالة طبية', en: 'Medical condition' } },
    { value: 'other', label: { fr: 'Autre', ar: 'أخرى', en: 'Other' } },
  ],
};

const limitationsExplanation: Question = {
  id: 'limitationsExplanation',
  title: { fr: 'Merci d’expliquer brièvement.', ar: 'يرجى التوضيح باختصار.', en: 'Please briefly explain.' },
  type: 'textarea',
  required: true,
  condition: (a) => !!a.limitations && a.limitations !== 'nothing',
  placeholder: {
    fr: 'Zone concernée, depuis quand…',
    ar: 'المنطقة المعنية، منذ متى…',
    en: 'Affected area, since when…',
  },
};

const durationOptions: QuestionOption[] = ['1', '2', '3', '4', '5', '6', '9', '12'].map((m) => ({
  value: m,
  label: {
    fr: `${m} mois`,
    ar: m === '1' ? 'شهر واحد' : m === '2' ? 'شهران' : `${m} ${Number(m) <= 10 ? 'أشهر' : 'شهراً'}`,
    en: m === '1' ? '1 month' : `${m} months`,
  },
}));

const programDuration: Question = {
  id: 'programDuration',
  title: { fr: 'Durée de programme souhaitée', ar: 'مدة البرنامج المرغوبة', en: 'Desired program duration' },
  type: 'radio',
  required: true,
  options: durationOptions,
};

const frequencyOptions: QuestionOption[] = ['1', '2', '3', '4', '5', '6+'].map((n) => ({
  value: n,
  label: {
    fr: n === '1' ? '1 séance par semaine' : `${n} séances par semaine`,
    ar: n === '1' ? 'حصة واحدة أسبوعياً' : n === '2' ? 'حصتان أسبوعياً' : `${n} حصص أسبوعياً`,
    en: n === '1' ? '1 session per week' : `${n} sessions per week`,
  },
}));

const trainingFrequency: Question = {
  id: 'trainingFrequency',
  title: {
    fr: 'Fréquence d’entraînement réaliste',
    ar: 'عدد الحصص الواقعي أسبوعياً',
    en: 'Realistic training frequency',
  },
  type: 'radio',
  required: true,
  options: frequencyOptions,
};

export const servicesData: ServiceDefinition[] = [
  /* ---------------- 01 — STRENGTH & CONDITIONING ---------------- */
  {
    id: 'strength_conditioning',
    code: '01',
    title: { fr: 'PRÉPARATION PHYSIQUE', ar: 'الإعداد البدني', en: 'STRENGTH & CONDITIONING' },
    description: {
      fr: 'Un entraînement personnalisé conçu selon vos objectifs, votre niveau et votre temps disponible.',
      ar: 'تدريب مخصص مبني حول أهدافك ومستواك والوقت المتاح لديك.',
      en: 'Personalized training designed around your goals, level and available training time.',
    },
    ctaText: { fr: 'COMMENCER LE BILAN', ar: 'ابدأ التقييم', en: 'START ASSESSMENT' },
    questions: [fullName, age, whatsapp, sport(), mainGoal, trainingLevel, limitations, limitationsExplanation, programDuration, trainingFrequency],
  },

  /* ---------------- 02 — RÉATHLÉTISATION ---------------- */
  {
    id: 'reathletisation',
    code: '02',
    title: { fr: 'RÉATHLÉTISATION', ar: 'إعادة التأهيل الرياضي', en: 'RÉATHLÉTISATION' },
    description: {
      fr: 'Préparation physique de fin de parcours pour vous accompagner de la rééducation vers le retour au sport.',
      ar: 'إعداد بدني في المرحلة المتقدمة لمساعدتك على الانتقال من إعادة التأهيل إلى العودة للرياضة.',
      en: 'Late-stage physical preparation to help you progress from rehabilitation toward a return to sport.',
    },
    ctaText: { fr: 'COMMENCER LE BILAN', ar: 'ابدأ التقييم', en: 'START ASSESSMENT' },
    disclaimer: {
      fr: 'Ce service ne remplace pas les soins médicaux ou de kinésithérapie.',
      ar: 'هذه الخدمة لا تعوض الرعاية الطبية أو العلاج الطبيعي.',
      en: 'This service does not replace medical or physiotherapy care.',
    },
    questions: [
      fullName,
      age,
      whatsapp,
      sport(),
      {
        id: 'injuryDescription',
        title: { fr: 'Quelle est votre blessure ?', ar: 'ما هي إصابتك؟', en: 'What is your injury?' },
        type: 'textarea',
        required: true,
        placeholder: { fr: 'Ex : rupture du LCA genou gauche, opérée', ar: 'مثال: تمزق الرباط الصليبي للركبة اليسرى مع جراحة', en: 'e.g. Left knee ACL reconstruction' },
      },
      {
        id: 'injuryDate',
        title: { fr: 'Quand la blessure est-elle survenue ?', ar: 'متى حدثت الإصابة؟', en: 'When did the injury happen?' },
        type: 'text',
        required: true,
        placeholder: { fr: 'Ex : mars 2026', ar: 'مثال: مارس 2026', en: 'e.g. March 2026' },
      },
      {
        id: 'completedRehab',
        title: { fr: 'Avez-vous terminé votre rééducation ?', ar: 'هل أكملت إعادة التأهيل؟', en: 'Have you completed your rehabilitation?' },
        type: 'radio',
        required: true,
        options: [
          { value: 'yes', label: { fr: 'Oui', ar: 'نعم', en: 'Yes' } },
          { value: 'no', label: { fr: 'Non', ar: 'لا', en: 'No' } },
        ],
      },
      {
        id: 'clearedToReturn',
        title: { fr: 'Avez-vous reçu l’autorisation de reprendre le sport ?', ar: 'هل حصلت على إذن بالعودة إلى الرياضة؟', en: 'Have you been cleared to return to sport?' },
        type: 'radio',
        required: true,
        options: [
          { value: 'yes', label: { fr: 'Oui', ar: 'نعم', en: 'Yes' } },
          { value: 'no', label: { fr: 'Non', ar: 'لا', en: 'No' } },
          { value: 'not_sure', label: { fr: 'Pas sûr(e)', ar: 'غير متأكد', en: 'Not sure' } },
        ],
        blockingValues: ['no'],
        blockingMessage: {
          fr: 'La réathlétisation intervient après la rééducation et l’accord de votre médecin ou kinésithérapeute. Revenez dès que vous avez reçu le feu vert.',
          ar: 'تأتي إعادة التأهيل الرياضي بعد العلاج وموافقة طبيبك أو أخصائي العلاج الطبيعي. عد بمجرد حصولك على الإذن.',
          en: 'Réathlétisation comes after rehabilitation and approval from your doctor or physiotherapist. Come back once you have been cleared.',
        },
      },
      {
        id: 'physioRecommendations',
        title: {
          fr: 'Que vous a recommandé votre kinésithérapeute pour la suite ?',
          ar: 'بماذا أوصاك أخصائي العلاج الطبيعي للمرحلة القادمة؟',
          en: 'What did your physiotherapist recommend for your next phase?',
        },
        type: 'textarea',
        required: true,
        placeholder: { fr: 'Ex : renforcement, reprise progressive de la course…', ar: 'مثال: تقوية، عودة تدريجية للجري…', en: 'e.g. Strengthening, progressive return to running…' },
      },
      programDuration,
      trainingFrequency,
      {
        id: 'additionalNotes',
        title: {
          fr: 'Autre chose à savoir sur votre situation ? (optionnel)',
          ar: 'هل هناك شيء آخر تود إخباري به عن وضعك؟ (اختياري)',
          en: 'Is there anything else you would like me to know about your situation? (optional)',
        },
        type: 'textarea',
        required: false,
        placeholder: { fr: 'Optionnel', ar: 'اختياري', en: 'Optional' },
      },
    ],
  },

  /* ---------------- 03 — PRIVATE COACHING ---------------- */
  {
    id: 'private_coaching',
    code: '03',
    title: { fr: 'COACHING PRIVÉ', ar: 'التدريب الخاص', en: 'PRIVATE COACHING' },
    description: {
      fr: 'Un entraînement individuel construit autour de vos objectifs, de votre niveau et de vos besoins.',
      ar: 'تدريب فردي مبني حول أهدافك ومستواك واحتياجاتك الخاصة.',
      en: 'One-to-one training built around your goals, level and individual needs.',
    },
    ctaText: { fr: 'FAIRE UNE DEMANDE', ar: 'قدّم طلبك', en: 'START A REQUEST' },
    questions: [fullName, age, whatsapp, sport(), mainGoal, trainingLevel, limitations, limitationsExplanation, trainingFrequency],
  },
];
