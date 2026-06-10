export interface QuantSignal {
  id: string;
  title: string;
  detail: string;
  projectId?: string;
  /** External proof link (e.g. live rating profile) shown beside the project link. */
  externalHref?: string;
  externalLabel?: string;
}

export const QUANT_SIGNALS: QuantSignal[] = [
  {
    id: 'ncde',
    title: 'Neural CDE disease forecasting',
    detail: 'Irregular longitudinal ADNI data with trajectory-only Val MAE ~13–16 and tabular MMSE ablations down to ~7.',
    projectId: 'adni-ncde',
  },
  {
    id: 'datacrawl',
    title: 'Prompt-to-dataset financial pipelines',
    detail: 'HackDuke Best Use of Solana — multi-agent orchestration with schema validation subagents for structured financial data from plain-English requests.',
    projectId: 'datacrawl',
  },
  {
    id: 'mingl',
    title: 'Probabilistic spatial proteomics',
    detail: 'GMM-based cell-type classification packaged for scverse workflows; bioRxiv co-author.',
    projectId: 'mingl',
  },
  {
    id: 'chess',
    title: 'Search, pruning, and competitive play',
    detail: 'Self-built chess engines (~1500 Elo), USCF Candidate Master, and peak top 100 Lichess rapid (2538).',
    projectId: 'chessengine',
    externalHref: 'https://lichess.org/@/jamesw112106/perf/rapid',
    externalLabel: 'Lichess profile',
  },
  {
    id: 'diig',
    title: 'DIIG health-data & NLP pipelines',
    detail: 'AI-assisted ICD-10 mapping on Gradient Health’s 15M+ row dataset and dual-model Discord NLP for case discovery.',
  },
];

export const QUANT_COURSEWORK = [
  'Combinatorics (MATH 371)',
  'High Dimensional Data Analysis (MATH 465)',
  'Probability (MATH 230)',
  'Linear Algebra (MATH 221)',
  'Advanced Multivariable Calculus (MATH 222)',
] as const;

export const QUANT_SUMMARY =
  'Research-grade modeling on irregular longitudinal data, DIIG investing-group pipelines on 15M+ row health data, and competitive search-and-pruning depth — maps to quant-adjacent SWE and ML engineering roles.';
