import type { ScheduleEntry } from '../lib/types';

/**
 * Seed schedule. Dates are managed from the dashboard; entries whose end date
 * has passed are filtered out of the public listing automatically.
 */
export const schedule: ScheduleEntry[] = [
  {
    id: 'sch-2609-l1', courseSlug: 'irata-level-1', published: true,
    startDate: '2026-09-07', endDate: '2026-09-12',
    location: { id: 'Pusat Pelatihan RAC, Jakarta', en: 'RAC Training Centre, Jakarta' },
    seatsTotal: 12, seatsLeft: 4, status: 'limited',
  },
  {
    id: 'sch-2609-bnsp', courseSlug: 'sertifikasi-bnsp-tkpk', published: true,
    startDate: '2026-09-15', endDate: '2026-09-18',
    location: { id: 'Pusat Pelatihan RAC, Jakarta', en: 'RAC Training Centre, Jakarta' },
    seatsTotal: 16, seatsLeft: 9, status: 'open',
  },
  {
    id: 'sch-2609-l2', courseSlug: 'irata-level-2', published: true,
    startDate: '2026-09-21', endDate: '2026-09-26',
    location: { id: 'Pusat Pelatihan RAC, Jakarta', en: 'RAC Training Centre, Jakarta' },
    seatsTotal: 10, seatsLeft: 6, status: 'open',
  },
  {
    id: 'sch-2610-l1', courseSlug: 'irata-level-1', published: true,
    startDate: '2026-10-05', endDate: '2026-10-10',
    location: { id: 'Pusat Pelatihan RAC, Jakarta', en: 'RAC Training Centre, Jakarta' },
    seatsTotal: 12, seatsLeft: 12, status: 'open',
  },
  {
    id: 'sch-2610-l3', courseSlug: 'irata-level-3', published: true,
    startDate: '2026-10-12', endDate: '2026-10-17',
    location: { id: 'Pusat Pelatihan RAC, Jakarta', en: 'RAC Training Centre, Jakarta' },
    seatsTotal: 8, seatsLeft: 2, status: 'limited',
  },
  {
    id: 'sch-2610-ref', courseSlug: 'refresher-revalidasi', published: true,
    startDate: '2026-10-26', endDate: '2026-10-28',
    location: { id: 'Pusat Pelatihan RAC, Jakarta', en: 'RAC Training Centre, Jakarta' },
    seatsTotal: 10, seatsLeft: 7, status: 'open',
  },
  {
    id: 'sch-2611-l1', courseSlug: 'irata-level-1', published: true,
    startDate: '2026-11-02', endDate: '2026-11-07',
    location: { id: 'Balikpapan, Kalimantan Timur', en: 'Balikpapan, East Kalimantan' },
    seatsTotal: 12, seatsLeft: 11, status: 'open',
  },
  {
    id: 'sch-2611-bnsp', courseSlug: 'sertifikasi-bnsp-tkpk', published: true,
    startDate: '2026-11-10', endDate: '2026-11-13',
    location: { id: 'Pusat Pelatihan RAC, Jakarta', en: 'RAC Training Centre, Jakarta' },
    seatsTotal: 16, seatsLeft: 14, status: 'open',
  },
  {
    id: 'sch-2611-l2', courseSlug: 'irata-level-2', published: true,
    startDate: '2026-11-16', endDate: '2026-11-21',
    location: { id: 'Pusat Pelatihan RAC, Jakarta', en: 'RAC Training Centre, Jakarta' },
    seatsTotal: 10, seatsLeft: 10, status: 'open',
  },
  {
    id: 'sch-2612-l1', courseSlug: 'irata-level-1', published: true,
    startDate: '2026-12-07', endDate: '2026-12-12',
    location: { id: 'Pusat Pelatihan RAC, Jakarta', en: 'RAC Training Centre, Jakarta' },
    seatsTotal: 12, seatsLeft: 12, status: 'open',
  },
  {
    id: 'sch-inhouse', courseSlug: 'pelatihan-in-house', published: true,
    startDate: '2026-09-01', endDate: '2027-12-31',
    location: { id: 'Di lokasi Anda, seluruh Indonesia', en: 'At your site, anywhere in Indonesia' },
    seatsTotal: 0, seatsLeft: 0, status: 'request',
  },
];
