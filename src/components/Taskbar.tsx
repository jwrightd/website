'use client';

import { useState, useEffect } from 'react';
import { Wifi, Battery, Search } from 'lucide-react';
import { APPS } from '@/data/apps';
import type { AppId } from '@/types';

interface TaskbarProps {
  focusedId: AppId | null;
}

export default function Taskbar({ focusedId }: TaskbarProps) {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
      setDate(now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const activeApp = APPS.find((a) => a.id === focusedId);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9998] h-9 flex items-center px-4 select-none"
      style={{
        background: 'rgba(15,15,17,0.85)',
        backdropFilter: 'blur(20px) saturate(160%)',
        WebkitBackdropFilter: 'blur(20px) saturate(160%)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Left: OS brand + active app */}
      <div className="flex items-center gap-4 min-w-0">
        <span className="text-[13px] font-semibold text-white/90 tracking-wide shrink-0">JamesOS</span>
        {activeApp && (
          <>
            <div className="w-px h-3.5 bg-white/15 shrink-0" />
            <span className="text-[12.5px] font-semibold text-white/65 truncate">{activeApp.label}</span>
          </>
        )}
      </div>

      <div className="flex-1" />

      {/* Right: system tray */}
      <div className="flex items-center gap-3" style={{ color: 'rgba(255,255,255,0.45)' }}>
        <button
          className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] hover:bg-white/6 transition-colors"
          style={{ border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.32)' }}
          onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true }))}
        >
          <Search size={10} />
          <span className="font-mono">⌘K</span>
        </button>
        <Wifi size={12} strokeWidth={2} />
        <Battery size={13} strokeWidth={2} />
        <div className="w-px h-3 bg-white/12" />
        <span className="text-[11.5px]" style={{ color: 'rgba(255,255,255,0.38)' }}>{date}</span>
        <span className="text-[12px] font-medium" style={{ color: 'rgba(255,255,255,0.75)' }}>{time}</span>
      </div>
    </div>
  );
}
