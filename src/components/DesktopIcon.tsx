'use client';

import { motion } from 'framer-motion';
import {
  User, FileText, FolderOpen, FlaskConical, Monitor, Mail, Cpu, Trophy,
  type LucideProps,
} from 'lucide-react';
import type { AppId } from '@/types';
import { APP_ACCENTS } from '@/data/apps';

const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  User, FileText, FolderOpen, FlaskConical, Monitor, Mail, Cpu, Trophy,
};

interface DesktopIconProps {
  id: AppId;
  label: string;
  iconName: string;
  isOpen: boolean;
  isFocused: boolean;
  isSelected: boolean;
  onActivate: () => void;
}

export default function DesktopIcon({
  id,
  label,
  iconName,
  isOpen,
  isFocused,
  isSelected,
  onActivate,
}: DesktopIconProps) {
  const Icon = ICON_MAP[iconName] ?? Cpu;
  const accent = APP_ACCENTS[id] ?? APP_ACCENTS.sysinfo;
  const iconColor = isFocused
    ? 'rgba(255,255,255,0.88)'
    : isOpen
      ? 'rgba(255,255,255,0.82)'
      : 'rgba(255,255,255,0.40)';

  return (
    <motion.button
      type="button"
      data-desktop-icon="true"
      data-app-id={id}
      data-desktop-selected={isSelected ? 'true' : 'false'}
      aria-label={`${isOpen ? 'Focus' : 'Open'} ${label}`}
      title={label}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.94 }}
      onClick={onActivate}
      className="group desktop-icon-root flex w-[70px] flex-col items-center gap-1.5 rounded-[10px] px-1.5 py-2 select-none outline-none transition-colors focus-visible:bg-white/5"
      style={{
        background: isFocused
          ? 'rgba(255,255,255,0.05)'
          : isOpen
            ? 'rgba(255,255,255,0.025)'
            : 'transparent',
      }}
    >
      <div
        className="desktop-icon-tile flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-150 group-focus-visible:ring-1"
        style={{
          background: isFocused
            ? 'rgba(255,255,255,0.1)'
            : isOpen
              ? accent.iconBg
              : 'rgba(255,255,255,0.02)',
          border: isFocused
            ? `1px solid ${accent.dot}50`
            : isOpen
              ? '1px solid rgba(255,255,255,0.10)'
              : '1px solid rgba(255,255,255,0.03)',
          boxShadow: isFocused
            ? `0 0 0 1px ${accent.dot}20, 0 8px 18px rgba(0,0,0,0.28)`
            : isOpen
              ? '0 5px 12px rgba(0,0,0,0.22)'
              : 'none',
        }}
      >
        <Icon
          size={20}
          strokeWidth={1.6}
          style={{ color: iconColor }}
          className="transition-all group-hover:!opacity-90 group-focus-visible:!opacity-100"
        />
      </div>

      <span
        className="desktop-icon-label text-[10.5px] font-medium text-center leading-tight"
        style={{
          color: isFocused
            ? 'rgba(255,255,255,0.82)'
            : isOpen
              ? 'rgba(255,255,255,0.72)'
              : 'rgba(255,255,255,0.4)',
          textShadow: '0 1px 3px rgba(0,0,0,0.9)',
        }}
      >
        {label}
      </span>

      {isOpen && (
        <div
          className="desktop-icon-dot w-1 h-1 rounded-full -mt-0.5"
          style={{ background: accent.dot }}
        />
      )}
    </motion.button>
  );
}
