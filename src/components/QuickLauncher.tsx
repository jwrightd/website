'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, User, FileText, FolderOpen, FlaskConical, Monitor, Mail, Cpu,
  type LucideProps,
} from 'lucide-react';
import type { AppId } from '@/types';
import { APPS, APP_ACCENTS } from '@/data/apps';

const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  User, FileText, FolderOpen, FlaskConical, Monitor, Mail, Cpu,
};

interface QuickLauncherProps {
  onOpen: (id: AppId) => void;
}

export default function QuickLauncher({ onOpen }: QuickLauncherProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
        setQuery('');
        setSelectedIdx(0);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 60);
  }, [open]);

  const filtered = APPS.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setSelectedIdx(0);
  };


  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIdx((i) => Math.min(i + 1, filtered.length - 1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setSelectedIdx((i) => Math.max(i - 1, 0)); }
    if (e.key === 'Enter' && filtered[selectedIdx]) {
      onOpen(filtered[selectedIdx].id);
      setOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[9990]"
            style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
          />

          <motion.div
            key="launcher"
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ type: 'spring', stiffness: 500, damping: 36 }}
            className="fixed top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9991] w-[460px] max-w-[calc(100vw-32px)] overflow-hidden"
            style={{
              background: 'var(--os-window)',
              borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.09)',
              boxShadow: '0 0 0 1px rgba(0,0,0,0.5), 0 24px 64px rgba(0,0,0,0.85)',
            }}
          >
            {/* Search input */}
            <div
              className="flex items-center gap-3 px-4 py-3.5"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
              <Search size={15} className="text-white/30 shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={handleQueryChange}
                onKeyDown={handleKeyDown}
                placeholder="Open app..."
                className="flex-1 bg-transparent text-[14px] text-white placeholder:text-white/25 outline-none"
              />
              <kbd className="text-[11px] text-white/20 font-mono px-1.5 py-0.5 rounded border border-white/10">ESC</kbd>
            </div>

            {/* Results */}
            <div className="py-2 max-h-72 overflow-y-auto">
              {filtered.length === 0 ? (
                <p className="text-center text-[13px] text-white/25 py-8">No results for &ldquo;{query}&rdquo;</p>
              ) : (
                filtered.map((app, i) => {
                  const Icon = ICON_MAP[app.iconName] ?? Cpu;
                  const accent = APP_ACCENTS[app.id] ?? APP_ACCENTS.sysinfo;
                  const isSelected = i === selectedIdx;
                  return (
                    <button
                      key={app.id}
                      onClick={() => { onOpen(app.id); setOpen(false); }}
                      onMouseEnter={() => setSelectedIdx(i)}
                      className={`w-full flex items-center gap-3.5 px-4 py-2.5 transition-colors ${isSelected ? 'bg-white/6' : 'hover:bg-white/4'}`}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: accent.iconBg, border: '1px solid rgba(255,255,255,0.08)' }}
                      >
                        <Icon size={15} strokeWidth={1.7} className="text-white/70" />
                      </div>
                      <span className="text-[13px] text-white/75 font-medium">{app.label}</span>
                      {isSelected && (
                        <kbd className="ml-auto text-[10px] text-white/20 font-mono">↵</kbd>
                      )}
                    </button>
                  );
                })
              )}
            </div>

            <div
              className="px-4 py-2 flex justify-between text-[11px] text-white/20"
              style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
            >
              <span>↑↓ navigate</span>
              <span>↵ open</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
