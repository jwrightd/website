import type { Project } from '@/types';

export const PROJECTS: Project[] = [
  {
    id: 'saynario',
    name: 'Saynario',
    description:
      'Voice-first language learning app that uses real-time AI conversation to accelerate fluency through immersive speaking practice.',
    tech: ['React', 'FastAPI', 'WebSockets', 'Gemini', 'Whisper', 'ElevenLabs'],
    result: 'HackPrinceton Winner',
    devpost: '#',
    github: '#',
  },
  {
    id: 'mingle',
    name: 'MINGLE',
    description:
      'Spatial proteomics package using Gaussian Mixture Models for probabilistic cell-type classification in multiplexed tissue imaging data.',
    tech: ['Python', 'JAX', 'NumPy', 'scikit-learn', 'spatial proteomics'],
    result: 'Research package — Hickey Lab',
    github: '#',
    writeup: '#',
  },
  {
    id: 'adni-ncde',
    name: 'ADNI Multimodal NCDE',
    description:
      'Neural Controlled Differential Equations integrating longitudinal clinical data and MRI imaging for multimodal Alzheimer\'s disease progression prediction.',
    tech: ['PyTorch', 'torchcde', 'pandas', 'MRI', 'ADNI'],
    result: 'Ongoing research project',
    github: '#',
    writeup: '#',
  },
  {
    id: 'chessvision',
    name: 'ChessVision',
    description:
      'Real-time computer vision system for detecting and capturing over-the-board chess moves from a camera feed.',
    tech: ['Python', 'OpenCV', 'PyTorch', 'Computer Vision'],
    github: '#',
  },
  {
    id: 'datacrawl',
    name: 'DataCrawl',
    description:
      'Automated data collection and aggregation pipeline for structured extraction from heterogeneous web sources.',
    tech: ['Python', 'BeautifulSoup', 'Playwright', 'PostgreSQL'],
    github: '#',
  },
  {
    id: 'kalshibot',
    name: 'KalshiBot',
    description:
      'Algorithmic trading system interfacing with prediction market APIs to automate position management and market data ingestion.',
    tech: ['Python', 'REST APIs', 'asyncio', 'pandas'],
    github: '#',
  },
];
