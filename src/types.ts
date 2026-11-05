export type Locale = 'fr' | 'ar' | 'en';

export type ServiceId = 'strength_conditioning' | 'reathletisation' | 'private_coaching';

export type SubmissionStatus =
  | 'NEW'
  | 'REVIEWING'
  | 'CONTACTED'
  | 'ACCEPTED'
  | 'PAYMENT_PENDING'
  | 'ACTIVE'
  | 'COMPLETED';

export interface QuestionOption {
  value: string;
  label: Record<Locale, string>;
  description?: Record<Locale, string>;
}

export interface Question {
  id: string;
  title: Record<Locale, string>;
  subtitle?: Record<Locale, string>;
  type: 'text' | 'number' | 'radio' | 'textarea' | 'tel';
  options?: QuestionOption[];
  placeholder?: Record<Locale, string>;
  required?: boolean;
  condition?: (answers: Record<string, any>) => boolean;
  disclaimer?: Record<Locale, string>;
}

export interface ServiceDefinition {
  id: ServiceId;
  code: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  ctaText: Record<Locale, string>;
  disclaimer?: Record<Locale, string>;
  questions: Question[];
}

export interface AssessmentSubmission {
  id: string;
  service: ServiceId;
  fullName: string;
  age: number | string;
  whatsapp: string;
  answers: Record<string, any>;
  status: SubmissionStatus;
  createdAt: string;
  coachNotes?: string;
  language: Locale;
}
