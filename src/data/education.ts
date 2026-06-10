import type { EducationEntry } from '@/types';

export const EDUCATION: EducationEntry[] = [
  {
    id: 'duke',
    institution: 'Duke University',
    location: 'Durham, NC',
    program: 'Mathematics and Computer Science · GPA 4.0',
    period: 'August 2025 – May 2028',
    coursework: [
      'Combinatorics (MATH 371)',
      'Introduction to High Dimensional Data Analysis (MATH 465)',
      'Probability (MATH 230)',
      'Advanced Multivariable Calculus (MATH 222)',
      'Linear Algebra (MATH 221)',
      'Data Structures and Algorithms (COMPSCI 201)',
      'Intro to Computer Systems (COMPSCI 210)',
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
