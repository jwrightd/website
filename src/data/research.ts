import type { ResearchItem } from '@/types';

export const RESEARCH: ResearchItem[] = [
  {
    id: 'mingl',
    title: 'MINGL — Probabilistic Cell-Type Classification',
    question:
      'How can Gaussian Mixture Models support probabilistic, interpretable cell-type classification in multiplexed spatial proteomics data?',
    methods: ['Gaussian Mixture Models', 'Python', 'scverse', 'spatial proteomics', 'multiplexed imaging'],
    status: 'Published',
    impact:
      'Shipped as a scverse-compatible Python package with 13 tool functions and 13 plotting functions, and contributed to a bioRxiv preprint as a named co-author.',
  },
  {
    id: 'adni',
    title: 'Multimodal Neural CDEs for Alzheimer\'s Progression',
    question:
      'How can neural controlled differential equations fuse longitudinal clinical data with structural MRI to predict Alzheimer\'s disease progression?',
    methods: ['Neural CDEs', 'torchcde', 'PyTorch', 'MRI feature extraction', 'ADNI dataset'],
    status: 'In Progress',
    impact:
      'Could improve early detection and staging of Alzheimer\'s by modeling irregular time-series data jointly with neuroimaging biomarkers.',
  },
];
