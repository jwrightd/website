import type { AppId, ContactMethod, PortfolioReadme } from '@/types';

export const PROFILE = {
  name: 'James Wright',
  subtitle: 'Mathematics and Computer Science · Duke University',
  location: 'Durham, NC',
  currentFocus: 'Duke Code+ software engineering · Alzheimer’s forecasting · spatial proteomics',
  recruiterHeadline: 'Incoming Software Engineer, Duke Code+ · Summer 2026',
  lastUpdated: 'May 2026',
  email: 'james.wright@duke.edu',
  githubUrl: 'https://github.com/jwrightd',
  githubDisplay: 'github.com/jwrightd',
  linkedinUrl: 'https://linkedin.com/in/james-wright6',
  linkedinDisplay: 'linkedin.com/in/james-wright6',
  resumeHref: '/resume.pdf',
  resumeLabel: 'resume.pdf',
  resumeAvailable: true,
  aboutSummary:
    'Mathematics and Computer Science student at Duke University building across machine learning, data systems, and applied software.',
  aboutSecondary:
    'Current work spans Duke Impact Investment Group, Duke Applied Machine Learning, and the Hickey Lab, with experience in cyberdefense tooling, voice interfaces, longitudinal Alzheimer’s modeling, spatial proteomics, and computer vision.',
  interests: [
    'Machine Learning',
    'Research Engineering',
    'Data Systems',
    'Computer Vision',
    'Spatial Proteomics',
    'Cybersecurity',
    'Voice Interfaces',
    'Chess',
  ],
} as const;

export const PRIMARY_RECRUITER_APPS: AppId[] = ['resume', 'projects', 'contact'];
export const PRIMARY_WORKSPACE_APPS: AppId[] = ['resume', 'projects', 'contact'];

export const JAMES_OS_README: PortfolioReadme = {
  label: 'README.md',
  summary: 'JamesOS is an interactive OS-style portfolio rather than a static landing page.',
  description:
    'The site is built to feel like opening a personal workspace: windows, launchers, focused apps, and a small desktop shell that lets recruiters or collaborators explore projects, resume details, and contact paths naturally.',
  stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
};

export const CONTACT_METHODS: ContactMethod[] = [
  {
    id: 'email',
    label: 'Email',
    address: PROFILE.email,
    href: `mailto:${PROFILE.email}`,
    iconName: 'Mail',
    dot: '#4f8ef7',
    subject: 'Direct message',
    body: 'Best route for software engineering, internship, research, and project conversations.',
    actionLabel: 'Compose email',
    copyValue: PROFILE.email,
  },
  {
    id: 'github',
    label: 'GitHub',
    address: PROFILE.githubDisplay,
    href: PROFILE.githubUrl,
    iconName: 'GitBranch',
    dot: '#94a3b8',
    subject: 'Source code',
    body: 'Browse repositories, experiments, and project implementation details.',
    actionLabel: 'Open GitHub',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    address: PROFILE.linkedinDisplay,
    href: PROFILE.linkedinUrl,
    iconName: 'Briefcase',
    dot: '#22d3ee',
    subject: 'Professional profile',
    body: 'View current roles, education, and the public-facing version of the professional profile.',
    actionLabel: 'Open LinkedIn',
  },
  {
    id: 'resume',
    label: 'Resume',
    address: PROFILE.resumeLabel,
    href: PROFILE.resumeHref,
    iconName: 'FileText',
    dot: '#32d74b',
    subject: 'Resume download',
    body: 'Download the latest resume PDF with education, experience, projects, and skills.',
    actionLabel: 'Download resume',
  },
];
