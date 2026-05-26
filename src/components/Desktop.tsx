'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useWindowManager } from '@/hooks/useWindowManager';
import { APPS } from '@/data/apps';
import type { AppId } from '@/types';

import DesktopIcon from './DesktopIcon';
import Window from './Window';
import Dock from './Dock';
import Taskbar from './Taskbar';
import BootScreen from './BootScreen';
import QuickLauncher from './QuickLauncher';

import AboutApp from './apps/AboutApp';
import ResumeApp from './apps/ResumeApp';
import ProjectsApp from './apps/ProjectsApp';
import ResearchApp from './apps/ResearchApp';
import ExperienceApp from './apps/ExperienceApp';
import ContactApp from './apps/ContactApp';
import SystemInfoApp from './apps/SystemInfoApp';

function AppContent({ id, onOpen }: { id: AppId; onOpen: (id: AppId) => void }) {
  switch (id) {
    case 'about':      return <AboutApp onOpen={onOpen} />;
    case 'resume':     return <ResumeApp />;
    case 'projects':   return <ProjectsApp />;
    case 'research':   return <ResearchApp />;
    case 'experience': return <ExperienceApp />;
    case 'contact':    return <ContactApp />;
    case 'sysinfo':    return <SystemInfoApp />;
  }
}

export default function Desktop() {
  const { windows, focusedId, openApp, closeApp, minimizeApp, focusApp } = useWindowManager();

  return (
    <>
      <BootScreen />

      {/* ── Desktop (md+) ──────────────────────────────────────── */}
      <div
        className="hidden md:block relative w-screen h-screen overflow-hidden select-none"
        style={{
            background: 'radial-gradient(ellipse 70% 60% at 50% 40%, #161618 0%, #0f0f11 100%)',
        }}
      >
        {/* Subtle grid texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(rgba(255,255,255,0.013) 0px, transparent 1px, transparent 32px, rgba(255,255,255,0.013) 33px), repeating-linear-gradient(90deg, rgba(255,255,255,0.013) 0px, transparent 1px, transparent 32px, rgba(255,255,255,0.013) 33px)',
          }}
        />

        <Taskbar focusedId={focusedId} />

        {/* Desktop icon column — right edge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.35 }}
          className="absolute top-11 right-2 flex flex-col gap-0.5 pt-3 pb-24"
        >
          {APPS.map((app) => (
            <DesktopIcon
              key={app.id}
              id={app.id}
              label={app.label}
              iconName={app.iconName}
              isOpen={windows[app.id]?.isOpen ?? false}
              onClick={() => openApp(app.id)}
            />
          ))}
        </motion.div>

        {/* Workspace status — bottom-left */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.4 }}
          className="absolute bottom-20 left-7 flex flex-col gap-0.5 pointer-events-none select-none"
        >
          {[
            ['apps',    '7 apps installed'],
            ['index',   '6 projects indexed'],
            ['resume',  'resume.pdf — available'],
            ['updated', 'last updated: May 2026'],
            ['focus',   'focus: ML systems + research'],
          ].map(([key, line]) => (
            <p key={key} className="font-mono text-[11px] leading-[1.55]" style={{ color: 'rgba(255,255,255,0.22)' }}>
              <span style={{ color: 'rgba(255,255,255,0.12)' }}>{'>'} </span>
              {line}
            </p>
          ))}
        </motion.div>

        {/* Windows layer */}
        <div className="absolute inset-0 pt-9">
          <AnimatePresence>
            {APPS.map((app) => {
              const win = windows[app.id];
              if (!win?.isOpen) return null;
              return (
                <Window
                  key={app.id}
                  id={app.id}
                  isFocused={focusedId === app.id}
                  zIndex={win.zIndex}
                  isMinimized={win.isMinimized}
                  onClose={() => closeApp(app.id)}
                  onMinimize={() => minimizeApp(app.id)}
                  onFocus={() => focusApp(app.id)}
                >
                  <AppContent id={app.id} onOpen={openApp} />
                </Window>
              );
            })}
          </AnimatePresence>
        </div>

        <Dock windows={windows} onOpen={openApp} onFocus={focusApp} />
        <QuickLauncher onOpen={openApp} />

        <p
          className="absolute bottom-1.5 left-1/2 -translate-x-1/2 text-[10.5px] pointer-events-none select-none"
          style={{ color: 'rgba(255,255,255,0.12)' }}
        >
          Click icons or use ⌘K to open apps
        </p>
      </div>

      {/* ── Mobile ─────────────────────────────────────────────── */}
      <MobileLayout onOpen={openApp} />
    </>
  );
}

function MobileLayout({ onOpen }: { onOpen: (id: AppId) => void }) {
  return (
    <div
      className="md:hidden fixed inset-0 overflow-y-auto"
      style={{ background: '#0f0f11' }}
    >
      {/* Mobile status bar */}
      <div
        className="sticky top-0 z-10 flex items-center justify-between px-5 h-14"
        style={{
          background: 'rgba(15,15,17,0.9)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <span className="text-[15px] font-semibold" style={{ color: 'rgba(255,255,255,0.88)' }}>JamesOS</span>
        <span className="text-[12px]" style={{ color: 'rgba(255,255,255,0.32)' }}>James Wright</span>
      </div>

      <div className="px-4 pt-6 pb-24 flex flex-col gap-5">
        <div className="px-1">
          <h1 className="text-[28px] font-bold leading-tight" style={{ color: 'rgba(255,255,255,0.88)' }}>
            James Wright
          </h1>
          <p className="text-[14px] mt-1" style={{ color: 'rgba(255,255,255,0.40)' }}>
            CS + Mathematics · Duke University
          </p>
        </div>

        {/* Primary CTAs */}
        <div className="grid grid-cols-3 gap-2.5">
          {([
            { id: 'resume'   as AppId, label: 'Resume',   dot: '#32d74b' },
            { id: 'projects' as AppId, label: 'Projects', dot: '#a78bfa' },
            { id: 'contact'  as AppId, label: 'Contact',  dot: '#f472b6' },
          ] as const).map(({ id, label, dot }) => (
            <button
              key={id}
              onClick={() => onOpen(id)}
              className="py-4 rounded-xl flex flex-col items-center gap-2 active:scale-95 transition-transform"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }}
            >
              <div className="w-2 h-2 rounded-full" style={{ background: dot }} />
              <span className="text-[13.5px] font-semibold" style={{ color: 'rgba(255,255,255,0.78)' }}>{label}</span>
            </button>
          ))}
        </div>

        {/* Bio */}
        <div
          className="rounded-xl p-4"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <p className="text-[13.5px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.62)' }}>
            I build at the intersection of <span style={{ color: '#4f8ef7' }}>machine learning</span>,{' '}
            <span style={{ color: '#a78bfa' }}>systems</span>, and{' '}
            <span style={{ color: '#22d3ee' }}>data science</span>. HackPrinceton winner.
            Research in spatial proteomics and Alzheimer&apos;s ML. Based at Duke.
          </p>
        </div>

        {/* All apps */}
        <p className="text-[11px] font-semibold uppercase tracking-widest px-1" style={{ color: 'rgba(255,255,255,0.22)' }}>
          All Apps
        </p>
        <div className="grid grid-cols-2 gap-2.5">
          {APPS.map((app) => (
            <button
              key={app.id}
              onClick={() => onOpen(app.id)}
              className="text-left p-4 rounded-xl active:scale-95 transition-transform"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <p className="text-[13.5px] font-semibold" style={{ color: 'rgba(255,255,255,0.80)' }}>{app.label}</p>
              <p className="text-[11px] mt-0.5" style={{ color: 'rgba(255,255,255,0.28)' }}>Open →</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
