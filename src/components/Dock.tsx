'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, FileText, FolderOpen, FlaskConical, Monitor, Mail, Cpu,
  type LucideProps,
} from 'lucide-react';
import type { AppId, WindowState } from '@/types';
import { APPS, APP_ACCENTS } from '@/data/apps';

const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  User, FileText, FolderOpen, FlaskConical, Monitor, Mail, Cpu,
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
        className="flex items-end gap-1.5 px-3 py-2.5 rounded-2xl"
        style={{
          background: 'rgba(28,28,30,0.92)',
          border: '1px solid rgba(255,255,255,0.09)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.7), 0 1px 0 rgba(255,255,255,0.04) inset',
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
                      className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md text-[11.5px] font-medium text-white/85 whitespace-nowrap pointer-events-none"
                      style={{
                        background: '#1c1c1e',
                        border: '1px solid rgba(255,255,255,0.1)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                      }}
                    >
                      {app.label}
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  animate={{ scale: isHovered ? 1.22 : 1, y: isHovered ? -7 : 0 }}
                  transition={{ type: 'spring', stiffness: 520, damping: 32 }}
                  onHoverStart={() => setHoveredId(app.id)}
                  onHoverEnd={() => setHoveredId(null)}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    if (isOpen && !isMinimized) onFocus(app.id);
                    else onOpen(app.id);
                  }}
                  className="w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-100"
                  style={{
                    background: isOpen ? accent.iconBg : 'rgba(255,255,255,0.06)',
                    border: isOpen
                      ? `1px solid ${accent.dot}30`
                      : '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <Icon
                    size={20}
                    strokeWidth={1.6}
                    style={{ color: isOpen ? 'rgba(255,255,255,0.82)' : 'rgba(255,255,255,0.50)' }}
                  />
                </motion.button>

                {isOpen && (
                  <div
                    className="absolute -bottom-1.5 w-1.5 h-1.5 rounded-full"
                    style={{ background: accent.dot, boxShadow: `0 0 4px ${accent.dot}80` }}
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
