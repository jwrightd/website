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
    detail: 'Multi-agent orchestration for validated structured data acquisition from plain-English requests.',
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
];

export const QUANT_SUMMARY =
  'Math + CS coursework, research-grade modeling, and systems work that maps cleanly to quant-adjacent SWE and ML engineering roles.';
