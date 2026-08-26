import type { SiteContent } from '../lib/types';
import { settings } from './settings';
import { courses } from './courses';
import { services } from './services';
import { posts } from './posts';
import { schedule } from './schedule';
import { faqs } from './faqs';
import { testimonials } from './testimonials';
import { team } from './team';
import { accreditations } from './accreditations';
import { pages } from './pages';

/**
 * Repository defaults. The site renders entirely from this object when no
 * database is bound, which keeps the build deployable on a bare GitHub Pages
 * or Cloudflare Pages account. When D1 *is* bound, `lib/content.ts` layers the
 * dashboard's edits on top of these values.
 */
export const defaultContent: SiteContent = {
  settings,
  courses,
  services,
  posts,
  schedule,
  faqs,
  testimonials,
  team,
  accreditations,
  pages,
};

export {
  settings, courses, services, posts, schedule,
  faqs, testimonials, team, accreditations, pages,
};
