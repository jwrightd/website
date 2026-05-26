import type { Skill } from '@/types';

export const SKILLS: Skill[] = [
  {
    category: 'Languages',
    items: ['Python', 'TypeScript', 'JavaScript', 'C', 'Java', 'SQL', 'R'],
  },
  {
    category: 'ML / Data',
    items: ['PyTorch', 'JAX', 'scikit-learn', 'pandas', 'NumPy', 'torchcde', 'HuggingFace'],
  },
  {
    category: 'Web',
    items: ['React', 'Next.js', 'FastAPI', 'Node.js', 'WebSockets', 'REST APIs'],
  },
  {
    category: 'Tools',
    items: ['Git', 'Docker', 'PostgreSQL', 'Linux', 'Jupyter', 'LaTeX'],
  },
];
