import type { Locale } from '../i18n/config';

/** A field that carries both languages. */
export type I18nText = Record<Locale, string>;
export type I18nList = Record<Locale, string[]>;

export interface SeoFields {
  metaTitle?: Partial<I18nText>;
  metaDescription?: Partial<I18nText>;
  ogImage?: string;
  noindex?: boolean;
}

export interface Course extends SeoFields {
  slug: string;
  code: string;
  scheme: 'IRATA' | 'SPRAT' | 'BNSP' | 'IN-HOUSE';
  level: string;
  order: number;
  featured: boolean;
  published: boolean;
  title: I18nText;
  summary: I18nText;
  duration: I18nText;
  price: I18nText;
  prerequisites: I18nList;
  outcomes: I18nList;
  syllabus: Array<{ title: I18nText; detail: I18nText }>;
  certificate: I18nText;
  image: string;
  imageAlt: I18nText;
  body: Partial<I18nText>;
}

export interface Service extends SeoFields {
  slug: string;
  icon: string;
  order: number;
  featured: boolean;
  published: boolean;
  title: I18nText;
  summary: I18nText;
  scope: I18nList;
  industries: I18nList;
  deliverables: I18nList;
  image: string;
  imageAlt: I18nText;
  body: Partial<I18nText>;
}

export interface Post extends SeoFields {
  slug: string;
  category: I18nText;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  readingMinutes: number;
  featured: boolean;
  published: boolean;
  title: I18nText;
  excerpt: I18nText;
  image: string;
  imageAlt: I18nText;
  body: I18nText;
  tags: string[];
}

export interface ScheduleEntry {
  id: string;
  courseSlug: string;
  startDate: string;
  endDate: string;
  location: I18nText;
  seatsTotal: number;
  seatsLeft: number;
  status: 'open' | 'limited' | 'full' | 'request';
  published: boolean;
}

export interface Faq {
  id: string;
  group: 'general' | 'training' | 'certification' | 'services';
  order: number;
  published: boolean;
  question: I18nText;
  answer: I18nText;
}

export interface Testimonial {
  id: string;
  order: number;
  published: boolean;
  name: string;
  role: I18nText;
  company: string;
  quote: I18nText;
  avatar?: string;
}

export interface TeamMember {
  id: string;
  order: number;
  published: boolean;
  name: string;
  role: I18nText;
  credentials: string[];
  bio: I18nText;
  photo?: string;
}

export interface Accreditation {
  id: string;
  name: string;
  note: I18nText;
  logo?: string;
  order: number;
}

export interface StatItem {
  value: string;
  label: I18nText;
  icon: string;
}

export interface SiteSettings {
  brandName: string;
  legalName: string;
  tagline: I18nText;
  description: I18nText;
  /** E.164 without the leading `+`, e.g. `6281234567890`. */
  whatsapp: string;
  whatsappGreeting: I18nText;
  phoneDisplay: string;
  email: string;
  addressLine: I18nText;
  city: string;
  region: string;
  postalCode: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  openingHours: I18nText;
  mapEmbedQuery: string;
  social: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    tiktok?: string;
  };
  founded: string;
  stats: StatItem[];
}

export interface SiteContent {
  settings: SiteSettings;
  courses: Course[];
  services: Service[];
  posts: Post[];
  schedule: ScheduleEntry[];
  faqs: Faq[];
  testimonials: Testimonial[];
  team: TeamMember[];
  accreditations: Accreditation[];
  pages: Record<string, PageContent>;
}

/** Free-form, per-page editorial blocks (hero copy, section intros…). */
export interface PageContent extends SeoFields {
  key: string;
  heroEyebrow?: Partial<I18nText>;
  heroTitle?: Partial<I18nText>;
  heroSubtitle?: Partial<I18nText>;
  heroImage?: string;
  intro?: Partial<I18nText>;
  body?: Partial<I18nText>;
  blocks?: Record<string, unknown>;
}

export type CollectionName =
  | 'courses' | 'services' | 'posts' | 'schedule'
  | 'faqs' | 'testimonials' | 'team' | 'accreditations' | 'pages';
