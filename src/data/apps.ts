import type { AppConfig } from '@/types';

export const APPS: AppConfig[] = [
  {
    id: 'about',
    label: 'About Me',
    iconName: 'User',
    minSize: { width: 420, height: 280 },
    defaultSize: { width: 580, height: 480 },
    defaultPosition: { x: 72, y: 52 },
  },
  {
    id: 'resume',
    label: 'Resume',
    iconName: 'FileText',
    minSize: { width: 460, height: 360 },
    defaultSize: { width: 580, height: 620 },
    defaultPosition: { x: 100, y: 44 },
  },
  {
    id: 'projects',
    label: 'Projects',
    iconName: 'FolderOpen',
    minSize: { width: 520, height: 320 },
    defaultSize: { width: 720, height: 580 },
    defaultPosition: { x: 88, y: 48 },
  },
  {
    id: 'research',
    label: 'Research',
    iconName: 'FlaskConical',
    minSize: { width: 480, height: 320 },
    defaultSize: { width: 680, height: 560 },
    defaultPosition: { x: 110, y: 60 },
  },
  {
    id: 'experience',
    label: 'Experience',
    iconName: 'Monitor',
    minSize: { width: 520, height: 300 },
    defaultSize: { width: 720, height: 500 },
    defaultPosition: { x: 96, y: 52 },
  },
  {
    id: 'contact',
    label: 'Contact',
    iconName: 'Mail',
    minSize: { width: 420, height: 260 },
    defaultSize: { width: 580, height: 420 },
    defaultPosition: { x: 130, y: 68 },
  },
  {
    id: 'interests',
    label: 'Interests',
    iconName: 'Trophy',
    minSize: { width: 480, height: 320 },
    defaultSize: { width: 660, height: 520 },
    defaultPosition: { x: 118, y: 72 },
  },
  {
    id: 'sysinfo',
    label: 'System Info',
    iconName: 'Cpu',
    minSize: { width: 440, height: 320 },
    defaultSize: { width: 540, height: 520 },
    defaultPosition: { x: 150, y: 72 },
  },
];

/**
 * Subtle per-app icon tints — used for the icon container background only.
 * Dots are the primary color indicator for open state.
 */
export const APP_ACCENTS: Record<string, { iconBg: string; dot: string }> = {
  about:      { iconBg: 'rgba(79,142,247,0.15)',   dot: '#4f8ef7' },
  resume:     { iconBg: 'rgba(50,215,75,0.12)',    dot: '#32d74b' },
  projects:   { iconBg: 'rgba(167,139,250,0.12)',  dot: '#a78bfa' },
  research:   { iconBg: 'rgba(34,211,238,0.10)',   dot: '#22d3ee' },
  experience: { iconBg: 'rgba(251,191,36,0.10)',   dot: '#fbbf24' },
  interests:  { iconBg: 'rgba(245,158,11,0.12)',   dot: '#f59e0b' },
  contact:    { iconBg: 'rgba(244,114,182,0.10)',  dot: '#f472b6' },
  sysinfo:    { iconBg: 'rgba(148,163,184,0.10)',  dot: '#94a3b8' },
};
