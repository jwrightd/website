'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, FileText, FolderOpen, FlaskConical, Monitor, Mail, Cpu, Trophy,
  type LucideProps,
} from 'lucide-react';
import type { AppId, WindowState } from '@/types';
import { APPS, APP_ACCENTS } from '@/data/apps';

const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  User, FileText, FolderOpen, FlaskConical, Monitor, Mail, Cpu, Trophy,
};

interface DockProps {
  windows: Record<AppId, WindowState>;
  onOpen: (id: AppId) => void;
  onFocus: (id: AppId) => void;
}

export default function Dock({ windows, onOpen, onFocus }: DockProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9999]">
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, type: 'spring', stiffness: 280, damping: 28 }}
        className="flex items-end gap-2 rounded-[20px] px-4 py-3.5"
        style={{
          background: 'rgba(15,16,18,0.84)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 22px 42px rgba(0,0,0,0.34), 0 1px 0 rgba(255,255,255,0.05) inset',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        {APPS.map((app, i) => {
          const Icon = ICON_MAP[app.iconName] ?? Cpu;
          const win = windows[app.id];
          const isOpen = win?.isOpen ?? false;
          const isMinimized = win?.isMinimized ?? false;
          const accent = APP_ACCENTS[app.id] ?? APP_ACCENTS.sysinfo;
          const isHovered = hoveredId === app.id;
          const showSeparator = i === APPS.length - 1;

          return (
            <div key={app.id} className="flex items-end gap-1.5">
              {showSeparator && (
                <div className="w-px h-7 self-center mx-0.5" style={{ background: 'rgba(255,255,255,0.1)' }} />
              )}

              <div className="relative flex flex-col items-center">
                {/* Tooltip */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.1 }}
                      className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 rounded-md border px-2.5 py-1 text-[12px] font-medium whitespace-nowrap text-white/86"
                      style={{
                        background: 'rgba(24,24,26,0.96)',
                        borderColor: 'rgba(255,255,255,0.1)',
                        boxShadow: '0 8px 18px rgba(0,0,0,0.32)',
                      }}
                    >
                      {app.label}
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  aria-label={`${isOpen && !isMinimized ? 'Focus' : 'Open'} ${app.label}`}
                  title={app.label}
                  animate={{ scale: isHovered ? 1.18 : 1, y: isHovered ? -6 : 0 }}
                  transition={{ type: 'spring', stiffness: 520, damping: 32 }}
                  onHoverStart={() => setHoveredId(app.id)}
                  onHoverEnd={() => setHoveredId(null)}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    if (isOpen && !isMinimized) onFocus(app.id);
                    else onOpen(app.id);
                  }}
                  className="os-dock-button flex h-[54px] w-[54px] items-center justify-center rounded-[14px]"
                  data-open={isOpen}
                  style={{
                    background: isOpen ? accent.iconBg : 'rgba(255,255,255,0.085)',
                    border: isOpen
                      ? `1px solid ${accent.dot}38`
                      : '1px solid rgba(255,255,255,0.11)',
                  }}
                >
                  <Icon
                    size={24}
                    strokeWidth={1.6}
                    style={{ color: isOpen ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.66)' }}
                  />
                </motion.button>

                {isOpen && (
                  <div
                    className="absolute -bottom-1.5 h-1.5 w-[18px] rounded-full"
                    style={{ background: accent.dot, boxShadow: `0 0 8px ${accent.dot}55` }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
