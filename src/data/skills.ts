import type { Skill } from '@/types';

export const SKILLS: Skill[] = [
  {
    category: 'Languages',
    items: ['Python', 'TypeScript', 'Java', 'C++', 'C'],
  },
  {
    category: 'ML & Data',
    items: [
      'PyTorch',
      'torchcde',
      'pandas',
      'NumPy',
      'Scikit-learn',
      'Gaussian Mixture Models',
      'Hugging Face',
      'OpenCV',
      'Roboflow',
    ],
  },
  {
    category: 'Systems & Web',
    items: [
      'React',
      'Next.js',
      'FastAPI',
      'WebSockets',
      'LangGraph',
      'Firebase',
      'Parquet',
      'DigitalOcean',
    ],
  },
  {
    category: 'AI & Tooling',
    items: [
      'Gemini API',
      'Whisper',
      'ElevenLabs',
      'NLTK',
      'Matplotlib',
      'Keras',
      'Crawl4AI',
    ],
  },
];
