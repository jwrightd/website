export interface QuantSignal {
  id: string;
  title: string;
  detail: string;
  projectId?: string;
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
    detail: 'Self-built chess engines (~1500 Elo), USCF Candidate Master, and Top 100 Lichess rapid.',
    projectId: 'chessengine',
  },
  {
    id: 'diig',
    title: 'DIIG health-data & NLP pipelines',
    detail: 'AI-assisted ICD-10 mapping on Gradient Health’s 15M+ row dataset and dual-model Discord NLP for case discovery.',
  },
];

export const QUANT_COURSEWORK = [
  'Probability (MATH 230)',
  'Linear Algebra (MATH 221)',
  'Advanced Multivariable Calculus (MATH 222)',
] as const;

export const QUANT_SUMMARY =
  'Probability, linear algebra, and multivariable calculus coursework plus research-grade modeling and DIIG investing-group pipelines on 15M+ row health data — maps to quant-adjacent SWE and ML engineering roles.';
