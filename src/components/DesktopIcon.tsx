'use client';

import { motion } from 'framer-motion';
import {
  User, FileText, FolderOpen, FlaskConical, Monitor, Mail, Cpu,
  type LucideProps,
} from 'lucide-react';
import type { AppId } from '@/types';
import { APP_ACCENTS } from '@/data/apps';

const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  User, FileText, FolderOpen, FlaskConical, Monitor, Mail, Cpu,
};

interface DesktopIconProps {
  id: AppId;
  label: string;
  iconName: string;
  isOpen: boolean;
  onClick: () => void;
}

export default function DesktopIcon({ id, label, iconName, isOpen, onClick }: DesktopIconProps) {
  const Icon = ICON_MAP[iconName] ?? Cpu;
  const accent = APP_ACCENTS[id] ?? APP_ACCENTS.sysinfo;

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -1 }}
      whileTap={{ scale: 0.94 }}
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 w-16 py-1.5 px-1 rounded-lg group select-none focus:outline-none"
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-150"
        style={{
          background: isOpen ? accent.iconBg : 'transparent',
          border: isOpen ? '1px solid rgba(255,255,255,0.10)' : '1px solid transparent',
          boxShadow: isOpen ? '0 2px 8px rgba(0,0,0,0.4)' : 'none',
        }}
      >
        <Icon
          size={20}
          strokeWidth={1.6}
          style={{ color: isOpen ? 'rgba(255,255,255,0.82)' : 'rgba(255,255,255,0.38)' }}
          className="group-hover:!opacity-90 transition-all"
        />
      </div>

      <span
        className="text-[10.5px] font-medium text-center leading-tight"
        style={{
          color: isOpen ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.32)',
          textShadow: '0 1px 3px rgba(0,0,0,0.9)',
        }}
      >
        {label}
      </span>

      {isOpen && (
        <div
          className="w-1 h-1 rounded-full -mt-0.5"
          style={{ background: accent.dot }}
        />
      )}
    </motion.button>
  );
}
