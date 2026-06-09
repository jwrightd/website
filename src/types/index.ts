export type AppId =
  | 'about'
  | 'resume'
  | 'projects'
  | 'research'
  | 'experience'
  | 'interests'
  | 'contact'
  | 'sysinfo';

export interface WindowPosition {
  x: number;
  y: number;
}

export interface WindowSize {
  width: number;
  height: number;
}

export interface WindowState {
  id: AppId;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  position: WindowPosition;
  size: WindowSize;
}

export interface AppConfig {
  id: AppId;
  label: string;
  iconName: string;
  minSize: WindowSize;
  defaultSize: WindowSize;
  defaultPosition: WindowPosition;
}

export interface ProjectLink {
  label: string;
  href: string;
  kind: 'github' | 'demo' | 'devpost' | 'writeup' | 'paper' | 'live';
}

export type ProjectBadge =
  | 'Winner'
  | 'Published'
  | 'Research'
  | 'Data Pipeline'
  | 'Computer Vision'
  | 'Chess Engine'
  | 'Sustainability'
  | 'Systems';

export interface ProjectMedia {
  src: string;
  alt: string;
  caption?: string;
  type?: 'image' | 'video';
  poster?: string;
}

export interface Project {
  id: string;
  name: string;
  category: string;
  status: string;
  outcome: string;
  proof: string;
  proofTone: 'winner' | 'published' | 'research' | 'systems' | 'vision' | 'engine' | 'sustainability';
  badges?: ProjectBadge[];
  featured?: boolean;
  summary: string;
  overview: string;
  problem: string;
  approach: string[];
  technicalChallenge: string;
  result: string;
  techStack: string[];
  links: ProjectLink[];
  media?: ProjectMedia[];
  /** Personal scope on collaborative repos — shown in case studies. */
  myContribution?: string;
}

export interface Experience {
  pid: string;
  role: string;
  organization: string;
  location?: string;
  status: 'Active' | 'Completed' | 'On Hold';
  focus: string;
  period: string;
  /** Weekly time commitment when helpful for concurrent roles. */
  scope?: string;
  highlights?: string[];
}

export interface ResearchItem {
  id: string;
  title: string;
  question: string;
  methods: string[];
  status: 'Ongoing' | 'Published' | 'In Progress' | 'Exploratory';
  impact: string;
  links?: ProjectLink[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface EducationEntry {
  id: string;
  institution: string;
  location: string;
  program: string;
  period: string;
  coursework?: string[];
}

export interface AchievementEntry {
  id: string;
  label: string;
  detail: string;
}

export interface NeetCodeProblem {
  slug: string;
  name: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface LeetCodeTopicProgress {
  topic: string;
  solved: number;
  total: number;
}

export interface LeetCodeProgress {
  totalRepoSolved: number;
  neetcodeSolved: number;
  neetcodeTotal: number;
  percent: number;
  byTopic: LeetCodeTopicProgress[];
  byDifficulty: Record<'Easy' | 'Medium' | 'Hard', number>;
  lastSynced: string | null;
}

export interface ContactMethod {
  id: 'email' | 'github' | 'linkedin' | 'resume';
  label: string;
  address: string;
  href: string;
  iconName: string;
  dot: string;
  subject: string;
  body: string;
  actionLabel: string;
  copyValue?: string;
}

export interface PortfolioReadme {
  label: string;
  summary: string;
  description: string;
  stack: string[];
}

export interface PersonalInterestLink {
  label: string;
  href: string;
  kind: 'profile' | 'article' | 'result';
}

export interface PersonalInterest {
  id: string;
  name: string;
  category: string;
  status: string;
  summary?: string;
  overview: string;
  recognition: string[];
  notes?: string[];
  accent: string;
  links?: PersonalInterestLink[];
}
