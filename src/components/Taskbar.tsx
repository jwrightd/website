'use client';

import { useEffect, useState } from 'react';
import { Battery, FolderOpen, Search, Users, Wifi } from 'lucide-react';
import { APP_ACCENTS, APPS } from '@/data/apps';
import { PROFILE } from '@/data/profile';
import type { AppId } from '@/types';

interface TaskbarProps {
  focusedId: AppId | null;
  onOpenLauncher: () => void;
  onOpenWorkspace: () => void;
  onRecruiterMode: () => void;
}

export default function Taskbar({
  focusedId,
  onOpenLauncher,
  onOpenWorkspace,
  onRecruiterMode,
}: TaskbarProps) {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const shortcutLabel =
    typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)
      ? '⌘K'
      : 'Ctrl K';

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
      setDate(now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }));
    };

    update();
    const intervalId = window.setInterval(update, 1000);
    return () => window.clearInterval(intervalId);
  }, []);
  const activeApp = APPS.find((app) => app.id === focusedId);
  const activeAccent = focusedId ? APP_ACCENTS[focusedId] : null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9998] flex h-10 items-center px-4 select-none"
      style={{
        background: 'linear-gradient(180deg, rgba(24,24,26,0.92) 0%, rgba(16,16,18,0.88) 100%)',
        backdropFilter: 'blur(20px) saturate(165%)',
        WebkitBackdropFilter: 'blur(20px) saturate(165%)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 1px 0 rgba(255,255,255,0.04) inset',
      }}
    >
      <div className="flex min-w-0 items-center gap-4">
        <span
          className="inline-flex shrink-0 items-center gap-2 rounded-md border px-2 py-1 text-[12.5px] font-semibold tracking-wide text-white/88"
          style={{
            borderColor: 'rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.035)',
          }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-white/75" />
          JamesOS
        </span>
        {activeApp && (
          <>
            <div className="h-3.5 w-px shrink-0 bg-white/15" />
            <span
              className="inline-flex min-w-0 items-center gap-2 truncate rounded-md border px-2 py-1 text-[12px] font-medium"
              style={{
                borderColor: 'rgba(255,255,255,0.07)',
                background: 'rgba(255,255,255,0.03)',
                color: 'rgba(255,255,255,0.68)',
              }}
            >
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: activeAccent?.dot ?? '#4f8ef7' }}
              />
              <span className="truncate">{activeApp.label}</span>
            </span>
          </>
        )}
      </div>

      <div className="flex-1" />

      <div
        className="mr-4 hidden items-center gap-1.5 rounded-[10px] border p-1 lg:flex"
        style={{
          borderColor: 'rgba(255,255,255,0.08)',
          background: 'rgba(255,255,255,0.03)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.035)',
        }}
      >
        <button
          onClick={onOpenLauncher}
          className="os-shell-action inline-flex items-center gap-1.5 rounded-[9px] px-2.5 py-1 text-[11px]"
        >
          <Search size={11} />
          Search
          <span className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.24)' }}>
            {shortcutLabel}
          </span>
        </button>
        <button
          onClick={onOpenWorkspace}
          className="os-shell-action inline-flex items-center gap-1.5 rounded-[9px] px-2.5 py-1 text-[11px]"
        >
          <FolderOpen size={11} />
          Open Workspace
        </button>
        <button
          onClick={onRecruiterMode}
          className="os-shell-action inline-flex items-center gap-1.5 rounded-[9px] px-2.5 py-1 text-[11px]"
        >
          <Users size={11} />
          Recruiter Mode
        </button>
      </div>

      <div className="flex items-center gap-3" style={{ color: 'rgba(255,255,255,0.45)' }}>
        <span className="hidden text-[11px] xl:block" style={{ color: 'rgba(255,255,255,0.28)' }}>
          {PROFILE.currentFocus}
        </span>
        <Wifi size={12} strokeWidth={2} />
        <Battery size={13} strokeWidth={2} />
        <div className="h-3 w-px bg-white/12" />
        <span className="text-[11.5px]" style={{ color: 'rgba(255,255,255,0.38)' }}>
          {date}
        </span>
        <span className="text-[12px] font-medium" style={{ color: 'rgba(255,255,255,0.75)' }}>
          {time}
        </span>
      </div>
    </div>
  );
}
