import type { Experience } from '@/types';

export const EXPERIENCE: Experience[] = [
  {
    pid: '001',
    role: 'Software Engineer',
    organization: 'Duke University, Code+',
    location: 'Durham, NC',
    status: 'Active',
    focus:
      'Building LLM-driven honeypot prototyping and threat analysis tools for STINGAR, an AI-powered cyberdefense platform deployed across 70+ partner universities.',
    period: 'May 2026 – Present',
    highlights: [
      'LLM-driven honeypot prototyping',
      'Threat analysis tooling for STINGAR',
      'Cyberdefense platform engineering on a university-scale deployment',
    ],
  },
  {
    pid: '002',
    role: 'Data Analyst',
    organization: 'Duke Impact Investment Group',
    location: 'Durham, NC',
    status: 'Active',
    focus:
      'Engineered a parquet search pipeline over a 15M+ row patient dataset and a dual-model NLP pipeline over 4,000+ Discord messages to deliver case-discovery and growth insights.',
    period: 'September 2025 – Present',
    highlights: [
      'Mapped 1,000+ ICD-10 codes to de-identified cases for Gradient Health',
      'Applied RoBERTa and VADER to a 4,000+ message Discord dataset for HayhaBots',
    ],
  },
  {
    pid: '003',
    role: 'ML Engineer',
    organization: 'Duke Applied Machine Learning',
    location: 'Durham, NC',
    status: 'Active',
    focus:
      'Built a longitudinal Alzheimer’s disease forecasting pipeline to predict next-visit ADAS13 scores using 3D MRI trajectory features and Neural Controlled Differential Equations.',
    period: 'September 2025 – Present',
    highlights: [
      'Extracted 3D MRI trajectory features across visits',
      'Modeled irregular time-series histories with Neural Controlled Differential Equations',
    ],
  },
  {
    pid: '004',
    role: 'Research Intern',
    organization: 'Hickey Lab',
    location: 'Durham, NC',
    status: 'Active',
    focus:
      'Published a scverse-compatible Python package (MINGL) for probabilistic cell-type classification with 13 tool and 13 plotting functions spanning gradient, border, and heterogeneity analyses.',
    period: 'September 2025 – Present',
    highlights: [
      'Implemented Gaussian Mixture Models for cell-type classification',
      'Named co-author on a bioRxiv preprint',
    ],
  },
];
