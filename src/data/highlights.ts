import type { AppId } from '@/types';
import { PROFILE } from '@/data/profile';

export type StatAudience = 'swe' | 'quant' | 'both';
export type AudienceLens = 'systems' | 'quant';

export interface AudienceLensOption {
  id: AudienceLens;
  label: string;
  description: string;
}

export const LENS_OPTIONS: AudienceLensOption[] = [
  {
    id: 'systems',
    label: 'SWE / Systems',
    description: 'Shipped products, pipelines, and platform work',
  },
  {
    id: 'quant',
    label: 'Quant / ML',
    description: 'Math, modeling, research, and data rigor',
  },
];

export interface Stat {
  id: string;
  /** Numeric target for count-up animation. Null renders `display` as static text. */
  value: number | null;
  /** Full rendered string once animation settles (also the no-JS / reduced-motion value). */
  display: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  /** Shorter label for narrow mobile stat cards. */
  shortLabel?: string;
  audience: StatAudience;
  featured?: boolean;
}

/** One-line positioning shown directly under the name. */
export const POSITIONING =
  'Duke Mathematics + Computer Science · Software engineer & ML researcher';

/** One-line shipped proof shown directly under the name. */
export const HERO_PROOF =
  'Saynario (HackPrinceton) · MINGL bioRxiv co-author · Code+ SWE on STINGAR';

/** Short tagline used for meta descriptions and the boot/wake line. */
export const TAGLINE =
  'Voice products, bioRxiv spatial proteomics, and 15M-row health data pipelines — SWE & ML internships, Summer 2026.';

/** "By the numbers" — high-signal proof points, scannable in seconds. */
export const STATS: Stat[] = [
  {
    id: 'hackathons',
    value: 2,
    suffix: '×',
    display: '2×',
    label: 'Hackathon wins · ElevenLabs (HackPrinceton), Solana (HackDuke)',
    shortLabel: 'Hackathon wins',
    audience: 'both',
    featured: true,
  },
  {
    id: 'icd10',
    value: 1000,
    suffix: '+',
    display: '1,000+',
    label: 'ICD-10 codes mapped · Gradient Health dataset (15M+ rows)',
    shortLabel: 'ICD-10 · 15M+ rows',
    audience: 'swe',
    featured: true,
  },
  {
    id: 'biorxiv',
    value: null,
    display: 'bioRxiv',
    label: 'Named co-author preprint · MINGL',
    shortLabel: 'MINGL preprint',
    audience: 'quant',
    featured: true,
  },
  {
    id: 'gpa',
    value: 4.0,
    decimals: 1,
    display: '4.0',
    label: 'GPA · Mathematics + CS, Duke',
    shortLabel: 'GPA · Math + CS',
    audience: 'quant',
    featured: true,
  },
  {
    id: 'fake-news',
    value: 99.5,
    suffix: '%',
    decimals: 1,
    display: '99.5%',
    label: 'BERT accuracy · WELFake fake-news detection',
    shortLabel: 'BERT · WELFake',
    audience: 'quant',
  },
  {
    id: 'discord-nlp',
    value: 4000,
    suffix: '+',
    display: '4,000+',
    label: 'Discord messages modeled · HayhaBots growth analysis',
    shortLabel: 'Discord NLP',
    audience: 'swe',
  },
  {
    id: 'cv',
    value: 90,
    suffix: '%+',
    display: '90%+',
    label: 'Real-time chess move-detection accuracy',
    shortLabel: 'ChessVision CV',
    audience: 'swe',
  },
  {
    id: 'elo',
    value: 1500,
    prefix: '~',
    display: '~1500',
    label: 'Elo · self-built chess engine (Python & C++)',
    shortLabel: 'Chess engine Elo',
    audience: 'both',
  },
  {
    id: 'lichess',
    value: 100,
    prefix: 'Top ',
    display: 'Top 100',
    label: 'Lichess rapid worldwide · USCF Candidate Master',
    shortLabel: 'Lichess · USCF CM',
    audience: 'quant',
  },
];

export const FEATURED_STATS = STATS.filter((stat) => stat.featured);
export const MORE_STATS = STATS.filter((stat) => !stat.featured);

export interface HeroCta {
  id: string;
  label: string;
  /** App to open in the JamesOS shell, when used inside the desktop. */
  app?: AppId;
  /** Anchor target for the static / simple view. */
  anchor?: string;
  /** External or file href (resume, mailto). */
  href?: string;
  tone: 'primary' | 'secondary';
}

export const HERO_CTAS: HeroCta[] = [
  { id: 'resume', label: 'View Resume', app: 'resume', anchor: '#resume', href: '/resume.pdf', tone: 'primary' },
  { id: 'projects', label: 'Browse Projects', app: 'projects', anchor: '#projects', tone: 'secondary' },
  { id: 'github', label: 'GitHub', href: PROFILE.githubUrl, tone: 'secondary' },
  { id: 'contact', label: 'Contact', app: 'contact', anchor: '#contact', tone: 'secondary' },
];

export interface ProofPoint {
  id: string;
  label: string;
  detail: string;
  statId?: string;
}

export interface ProofGroup {
  id: 'systems' | 'quant';
  label: string;
  points: ProofPoint[];
}

export const RECRUITER_PATH = 'Duke Math + CS \u00b7 Summer 2026 internships';

export const PROOF_GROUPS: ProofGroup[] = [
  {
    id: 'systems',
    label: 'SWE / systems',
    points: [
      { id: 'icd10', statId: 'icd10', label: '1,000+ ICD-10 codes', detail: 'AI-assisted mapping on Gradient Health’s 15M+ row parquet dataset via DIIG' },
      { id: 'stingar', label: 'Code+ summer SWE', detail: 'LLM honeypot prototyping and threat analysis on STINGAR' },
      { id: 'hackathons', statId: 'hackathons', label: '2× hackathon winner', detail: 'Saynario + DataCrawl shipped builds' },
      { id: 'cv', statId: 'cv', label: '90%+ CV accuracy', detail: 'real-time chess move detection' },
    ],
  },
  {
    id: 'quant',
    label: 'Quant / ML',
    points: [
      { id: 'gpa', statId: 'gpa', label: '4.0 GPA', detail: 'Mathematics + Computer Science at Duke' },
      { id: 'biorxiv', statId: 'biorxiv', label: 'bioRxiv co-author', detail: 'MINGL spatial proteomics package' },
      { id: 'research', label: 'Neural CDE forecasting', detail: 'irregular longitudinal Alzheimer’s data' },
      { id: 'chess', statId: 'lichess', label: 'CM / Top-100 Lichess', detail: 'competitive chess and search depth' },
    ],
  },
];
