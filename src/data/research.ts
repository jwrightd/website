import type { ResearchItem } from '@/types';

export const RESEARCH: ResearchItem[] = [
  {
    id: 'mingle',
    title: 'MINGLE — Spatial Proteomics Cell-Type Classification',
    question:
      'Can Gaussian Mixture Models enable probabilistic, interpretable cell-type classification in multiplexed spatial proteomics data?',
    methods: ['Gaussian Mixture Models', 'JAX', 'spatial proteomics', 'CODEX imaging', 'Python'],
    status: 'Ongoing',
    impact:
      'Enables researchers to annotate tissue samples at single-cell resolution without requiring manual gating, accelerating biomarker discovery.',
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
  {
    id: 'cyber',
    title: 'LLM-Based Threat Intelligence',
    question:
      'Can large language models be systematically used to identify, classify, and prioritize cybersecurity vulnerabilities from unstructured threat feeds?',
    methods: ['LLM prompting', 'RAG', 'NLP', 'vulnerability databases', 'Python'],
    status: 'Exploratory',
    impact:
      'Could reduce analyst triage time for threat feeds by automating initial classification and context enrichment of CVEs and threat reports.',
  },
];
