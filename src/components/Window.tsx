'use client';

import { motion } from 'framer-motion';
import type { AppId } from '@/types';
import { APPS } from '@/data/apps';

interface WindowProps {
  id: AppId;
  isFocused: boolean;
  zIndex: number;
  isMinimized: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  children: React.ReactNode;
}

export default function Window({
  id,
  isFocused,
  zIndex,
  isMinimized,
  onClose,
  onMinimize,
  onFocus,
  children,
}: WindowProps) {
  const app = APPS.find((a) => a.id === id)!;

  if (isMinimized) return null;

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: 8 }}
      transition={{ type: 'spring', stiffness: 420, damping: 36 }}
      onPointerDown={onFocus}
      style={{
        position: 'absolute',
        zIndex,
        width: app.defaultSize.width,
        maxWidth: 'calc(100vw - 20px)',
        left: app.defaultPosition.x,
        top: app.defaultPosition.y,
        borderRadius: 10,
        overflow: 'hidden',
        boxShadow: isFocused
          ? '0 0 0 1px rgba(255,255,255,0.09), 0 24px 72px rgba(0,0,0,0.85), 0 4px 16px rgba(0,0,0,0.6)'
          : '0 0 0 1px rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.7)',
      }}
    >
      {/* ── Title bar ─────────────────────────────────────── */}
      <div
        className="flex items-center gap-2.5 px-3.5 h-10 shrink-0 cursor-grab active:cursor-grabbing select-none"
        style={{
          background: isFocused ? 'var(--os-titlebar)' : '#202022',
          borderBottom: '1px solid var(--os-border)',
          touchAction: 'none',
        }}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5">
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="group w-3 h-3 rounded-full flex items-center justify-center transition-opacity"
            style={{ background: isFocused ? '#ff5f57' : '#3a3a3c' }}
            title="Close"
          >
            {isFocused && (
              <span className="opacity-0 group-hover:opacity-100 text-[7px] text-[#7a0000] font-black leading-none transition-opacity">✕</span>
            )}
          </button>
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            className="group w-3 h-3 rounded-full flex items-center justify-center transition-opacity"
            style={{ background: isFocused ? '#febc2e' : '#3a3a3c' }}
            title="Minimize"
          >
            {isFocused && (
              <span className="opacity-0 group-hover:opacity-100 text-[8px] text-[#7a4800] font-black leading-none transition-opacity">−</span>
            )}
          </button>
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: '#3a3a3c' }}
          />
        </div>

        {/* Title */}
        <span
          className="flex-1 text-center text-[12.5px] font-medium pointer-events-none"
          style={{ color: isFocused ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.25)' }}
        >
          {app.label}
        </span>

        {/* Balance spacer */}
        <div className="w-[52px]" />
      </div>

      {/* ── Content ───────────────────────────────────────── */}
      <div
        className="overflow-hidden flex flex-col"
        style={{
          height: app.defaultSize.height,
          background: 'var(--os-window)',
          opacity: isFocused ? 1 : 0.88,
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}
