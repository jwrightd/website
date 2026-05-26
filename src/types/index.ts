export type AppId =
  | 'about'
  | 'resume'
  | 'projects'
  | 'research'
  | 'experience'
  | 'contact'
  | 'sysinfo';

export interface WindowState {
  id: AppId;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  position: { x: number; y: number };
}

export interface AppConfig {
  id: AppId;
  label: string;
  iconName: string;
  defaultSize: { width: number; height: number };
  defaultPosition: { x: number; y: number };
}

export interface Project {
  id: string;
  name: string;
  description: string;
  tech: string[];
  result?: string;
  github?: string;
  demo?: string;
  devpost?: string;
  writeup?: string;
}

export interface Experience {
  pid: string;
  role: string;
  organization: string;
  status: 'Active' | 'Completed' | 'On Hold';
  focus: string;
  period: string;
}

export interface ResearchItem {
  id: string;
  title: string;
  question: string;
  methods: string[];
  status: 'Ongoing' | 'Published' | 'In Progress' | 'Exploratory';
  impact: string;
}

export interface Skill {
  category: string;
  items: string[];
}
