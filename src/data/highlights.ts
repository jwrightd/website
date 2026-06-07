import type { AppId } from '@/types';

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
    description: 'Scale, shipped systems, demos, GitHub proof',
  },
  {
    id: 'quant',
    label: 'Quant / ML',
    description: 'Math, ML research, chess, data pipelines',
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
  audience: StatAudience;
}

/** One-line positioning shown directly under the name. */
export const POSITIONING =
  'Mathematics + Computer Science @ Duke · Incoming SWE @ Duke Code+ (STINGAR) · ML / research engineer';

/** Short tagline used for meta descriptions and the boot/wake line. */
export const TAGLINE =
  'Building shipped systems and research-grade ML — targeting software engineering and quantitative roles.';

/** "By the numbers" — high-signal proof points, scannable in seconds. */
export const STATS: Stat[] = [
  {
    id: 'gpa',
    value: 4.0,
    decimals: 1,
    display: '4.0',
    label: 'GPA · Mathematics + CS, Duke',
    audience: 'quant',
  },
  {
    id: 'pipeline',
    value: 15,
    suffix: 'M+',
    display: '15M+',
    label: 'Row patient-data search pipeline',
    audience: 'swe',
  },
  {
    id: 'universities',
    value: 70,
    suffix: '+',
    display: '70+',
    label: 'Universities on the STINGAR platform',
    audience: 'swe',
  },
  {
    id: 'hackathons',
    value: 2,
    suffix: '×',
    display: '2×',
    label: 'Hackathon wins · HackPrinceton, HackDuke',
    audience: 'both',
  },
  {
    id: 'cv',
    value: 90,
    suffix: '%+',
    display: '90%+',
    label: 'Real-time chess move-detection accuracy',
    audience: 'swe',
  },
  {
    id: 'elo',
    value: 1500,
    prefix: '~',
    display: '~1500',
    label: 'Elo · self-built chess engine (Python & C++)',
    audience: 'both',
  },
  {
    id: 'lichess',
    value: 100,
    prefix: 'Top ',
    display: 'Top 100',
    label: 'Lichess rapid worldwide · USCF Candidate Master',
    audience: 'quant',
  },
  {
    id: 'biorxiv',
    value: null,
    display: 'bioRxiv',
    label: 'Named co-author preprint · MINGL',
    audience: 'quant',
  },
];

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

export const RECRUITER_PATH = 'Start with Resume \u2192 Projects \u2192 Contact';

export const PROOF_GROUPS: ProofGroup[] = [
  {
    id: 'systems',
    label: 'SWE / systems',
    points: [
      { id: 'universities', statId: 'universities', label: '70+ universities', detail: 'STINGAR cyberdefense platform reach' },
      { id: 'pipeline', statId: 'pipeline', label: '15M+ row pipeline', detail: 'patient-data search and case discovery' },
      { id: 'hackathons', statId: 'hackathons', label: '2x hackathon winner', detail: 'HackPrinceton + HackDuke shipped builds' },
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
      { id: 'chess', statId: 'lichess', label: 'CM / Top-100 Lichess', detail: 'competitive chess signal and calculation depth' },
    ],
  },
];
