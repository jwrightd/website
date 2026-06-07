import type { EducationEntry } from '@/types';

export const EDUCATION: EducationEntry[] = [
  {
    id: 'duke',
    institution: 'Duke University',
    location: 'Durham, NC',
    program: 'Mathematics and Computer Science · GPA 4.0',
    period: 'August 2025 – May 2028',
    coursework: [
      'Advanced Multivariable Calculus (MATH 222)',
      'Data Structures and Algorithms (COMPSCI 201)',
      'Intro to Computer Systems (COMPSCI 210)',
      'Linear Algebra (MATH 221)',
      'Probability (MATH 230)',
    ],
  },
  {
    id: 'tjhsst',
    institution: 'Thomas Jefferson High School for Science and Technology',
    location: 'Alexandria, VA',
    program: 'GPA 4.576/4.0 weighted',
    period: 'August 2021 – June 2025',
    coursework: [
      'Linear Algebra',
      'Multivariable Calculus',
      'Artificial Intelligence I & II',
      'Machine Learning I & II',
    ],
  },
];
