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
    ? 'rgba(255,255,255,0.92)'
    : isOpen
      ? 'rgba(255,255,255,0.86)'
      : 'rgba(255,255,255,0.56)';

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
      className="group desktop-icon-root flex w-[76px] flex-col items-center gap-1.5 rounded-[12px] px-1.5 py-2 select-none outline-none transition-colors focus-visible:bg-white/5"
      style={{
        background: isFocused
          ? 'rgba(255,255,255,0.065)'
          : isOpen
            ? 'rgba(255,255,255,0.04)'
            : 'transparent',
      }}
    >
      <div
        className="desktop-icon-tile flex h-[46px] w-[46px] items-center justify-center rounded-[13px] transition-all duration-150 group-focus-visible:ring-1"
        style={{
          background: isFocused
            ? 'rgba(255,255,255,0.13)'
            : isOpen
              ? accent.iconBg
              : 'rgba(255,255,255,0.05)',
          border: isFocused
            ? `1px solid ${accent.dot}55`
            : isOpen
              ? '1px solid rgba(255,255,255,0.12)'
              : '1px solid rgba(255,255,255,0.08)',
          boxShadow: isFocused
            ? `0 0 0 1px ${accent.dot}24, 0 10px 22px rgba(0,0,0,0.3)`
            : isOpen
              ? '0 7px 16px rgba(0,0,0,0.24)'
              : 'none',
        }}
      >
        <Icon
          size={21}
          strokeWidth={1.6}
          style={{ color: iconColor }}
          className="transition-all group-hover:!opacity-90 group-focus-visible:!opacity-100"
        />
      </div>

      <span
        className="desktop-icon-label text-[11px] font-medium text-center leading-tight"
        style={{
          color: isFocused
            ? 'rgba(255,255,255,0.88)'
            : isOpen
              ? 'rgba(255,255,255,0.78)'
              : 'rgba(255,255,255,0.58)',
          textShadow: '0 1px 3px rgba(0,0,0,0.9)',
        }}
      >
        {label}
      </span>

      {isOpen && (
        <div
          className="desktop-icon-dot h-1.5 w-1.5 rounded-full -mt-0.5"
          style={{ background: accent.dot }}
        />
      )}
    </motion.button>
  );
}
