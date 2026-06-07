'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';
import { APPS } from '@/data/apps';
import { POSITIONING, STATS } from '@/data/highlights';
import { PROFILE } from '@/data/profile';
import { PROJECTS } from '@/data/projects';
import { useWindowManager } from '@/hooks/useWindowManager';
import { setSimpleView } from '@/lib/view-mode';
import type { AppId } from '@/types';

import BootScreen from './BootScreen';
import DesktopBackdrop from './DesktopBackdrop';
import DesktopHero from './DesktopHero';
import DesktopIcon from './DesktopIcon';
import DesktopInteractionLayer from './DesktopInteractionLayer';
import Dock from './Dock';
import MobileAppPanel from './MobileAppPanel';
import QuickLauncher, { type QuickLauncherItem } from './QuickLauncher';
import Taskbar from './Taskbar';
import Window from './Window';
import WorkspaceStatus from './WorkspaceStatus';

const BOOT_STORAGE_KEY = 'jamesos:booted';
const RECRUITER_PROMPT_STORAGE_KEY = 'jamesos:recruiter-prompt-dismissed';

import AboutApp from './apps/AboutApp';
import ContactApp from './apps/ContactApp';
import ExperienceApp from './apps/ExperienceApp';
import InterestsApp from './apps/InterestsApp';
import ProjectsApp from './apps/ProjectsApp';
import ResearchApp from './apps/ResearchApp';
import ResumeApp from './apps/ResumeApp';
import SystemInfoApp from './apps/SystemInfoApp';

interface AppContentProps {
  id: AppId;
  onOpen: (id: AppId) => void;
  onOpenWorkspace: () => void;
  selectedProjectId: string;
  onSelectProject: (id: string) => void;
  isMobile?: boolean;
}

function AppContent({
  id,
  onOpen,
  onOpenWorkspace,
  selectedProjectId,
  onSelectProject,
  isMobile = false,
}: AppContentProps) {
  switch (id) {
    case 'about':
      return <AboutApp onOpen={onOpen} onOpenWorkspace={onOpenWorkspace} />;
    case 'resume':
      return <ResumeApp isMobile={isMobile} />;
    case 'projects':
      return (
        <ProjectsApp
          selectedId={selectedProjectId}
          onSelectProject={onSelectProject}
          isMobile={isMobile}
        />
      );
    case 'research':
      return <ResearchApp />;
    case 'experience':
      return <ExperienceApp />;
    case 'interests':
      return <InterestsApp />;
    case 'contact':
      return <ContactApp isMobile={isMobile} />;
    case 'sysinfo':
      return <SystemInfoApp />;
  }
}

function triggerResumeDownload() {
  const anchor = document.createElement('a');
  anchor.href = PROFILE.resumeHref;
  anchor.download = '';
  anchor.click();
}

export default function Desktop() {
  const {
    windows,
    focusedId,
    openApp,
    closeApp,
    minimizeApp,
    focusApp,
    moveApp,
    resizeApp,
    arrangeWindows,
    openWorkspace,
    activateRecruiterMode,
  } = useWindowManager();

  const [launcherOpen, setLauncherOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(PROJECTS[0].id);
  const [selectedDesktopIds, setSelectedDesktopIds] = useState<AppId[]>([]);
  const [mobileAppId, setMobileAppId] = useState<AppId | null>(null);
  const [showBoot, setShowBoot] = useState(true);
  const [showRecruiterPrompt, setShowRecruiterPrompt] = useState(true);
  const [heroDismissed, setHeroDismissed] = useState(false);

  useEffect(() => {
    let frame = 0;
    try {
      if (sessionStorage.getItem(BOOT_STORAGE_KEY) === '1') {
        document.documentElement.classList.add('booted');
      }
      const shouldHideBoot = sessionStorage.getItem(BOOT_STORAGE_KEY) === '1';
      const shouldHideRecruiterPrompt = sessionStorage.getItem(RECRUITER_PROMPT_STORAGE_KEY) === '1';
      frame = requestAnimationFrame(() => {
        if (shouldHideBoot) setShowBoot(false);
        if (shouldHideRecruiterPrompt) setShowRecruiterPrompt(false);
      });
    } catch {
      /* ignore */
    }

    return () => cancelAnimationFrame(frame);
  }, []);

  const finishBoot = useCallback(() => {
    setShowBoot(false);
    try {
      sessionStorage.setItem(BOOT_STORAGE_KEY, '1');
      document.documentElement.classList.add('booted');
    } catch {
      /* ignore */
    }
  }, []);

  const enterSimpleView = useCallback(() => {
    setSimpleView(true);
    window.scrollTo({ top: 0 });
  }, []);

  const dismissRecruiterPrompt = useCallback(() => {
    setShowRecruiterPrompt(false);
    try {
      sessionStorage.setItem(RECRUITER_PROMPT_STORAGE_KEY, '1');
    } catch {
      /* ignore */
    }
  }, []);

  const openWorkspaceWithNotice = useCallback(() => {
    openWorkspace();
    toast('Workspace opened', {
      description: 'Resume, projects, and contact are arranged for scanning.',
    });
  }, [openWorkspace]);

  const arrangeWindowsWithNotice = useCallback(() => {
    arrangeWindows();
    toast('Windows arranged', {
      description: 'Open windows were placed into a clean layout.',
    });
  }, [arrangeWindows]);

  const openRecruiterFastPath = useCallback(() => {
    dismissRecruiterPrompt();
    activateRecruiterMode();
    toast('Recruiter Mode activated', {
      description: 'Resume, projects, and contact are ready.',
    });
  }, [activateRecruiterMode, dismissRecruiterPrompt]);

  const anyWindowOpen = Object.values(windows).some((windowState) => windowState.isOpen);
  const heroVisible = !heroDismissed && !anyWindowOpen;

  const openProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    openApp('projects');
  };

  const activateDesktopApp = (id: AppId) => {
    const windowState = windows[id];
    if (windowState?.isOpen) {
      focusApp(id);
      return;
    }

    openApp(id);
  };

  const openExternal = (href: string) => {
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  const openResumeInNewTab = () => {
    openExternal(PROFILE.resumeHref);
    toast('Resume opened', {
      description: PROFILE.resumeLabel,
    });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      toast('Email copied', {
        description: PROFILE.email,
      });
    } catch {
      openExternal(`mailto:${PROFILE.email}`);
      toast('Email client opened', {
        description: PROFILE.email,
      });
    }
  };

  const quickLauncherItems: QuickLauncherItem[] = [
    ...APPS.map((app) => ({
      id: `app-${app.id}`,
      title: app.label,
      subtitle: `Open the ${app.label} window`,
      group: 'Apps' as const,
      iconName: app.iconName,
      keywords: [app.id, app.label, 'window', 'app'],
      onSelect: () => openApp(app.id),
    })),
    ...PROJECTS.map((project) => ({
      id: `project-${project.id}`,
      title: project.name,
      subtitle: `${project.category} · ${project.status}`,
      group: 'Projects' as const,
      iconName: 'FolderOpen',
      keywords: [project.id, project.category, project.status, ...project.techStack],
      onSelect: () => openProject(project.id),
    })),
    {
      id: 'action-open-workspace',
      title: 'Open Workspace',
      subtitle: 'Open resume, projects, and contact in a clean layout',
      group: 'Actions' as const,
      iconName: 'FolderOpen',
      keywords: ['workspace', 'explore', 'start'],
      onSelect: openWorkspaceWithNotice,
    },
    {
      id: 'action-open-about',
      title: 'Open About Me',
      subtitle: 'Jump to the overview window',
      group: 'Actions' as const,
      iconName: 'User',
      keywords: ['bio', 'overview', 'introduction'],
      onSelect: () => openApp('about'),
    },
    {
      id: 'action-open-resume',
      title: 'Open Resume',
      subtitle: 'Show the resume window',
      group: 'Actions' as const,
      iconName: 'FileText',
      keywords: ['cv', 'pdf'],
      onSelect: () => {
        openApp('resume');
        toast('Resume opened', {
          description: 'Resume window focused in JamesOS.',
        });
      },
    },
    {
      id: 'action-open-projects',
      title: 'Open Projects',
      subtitle: 'Show the project index',
      group: 'Actions' as const,
      iconName: 'FolderOpen',
      keywords: ['portfolio', 'work'],
      onSelect: () => openApp('projects'),
    },
    {
      id: 'action-open-research',
      title: 'Open Research',
      subtitle: 'Show research work and questions',
      group: 'Actions' as const,
      iconName: 'FlaskConical',
      keywords: ['papers', 'lab'],
      onSelect: () => openApp('research'),
    },
    {
      id: 'action-open-experience',
      title: 'Open Experience',
      subtitle: 'Show experience history',
      group: 'Actions' as const,
      iconName: 'Monitor',
      keywords: ['roles', 'work history'],
      onSelect: () => openApp('experience'),
    },
    {
      id: 'action-open-contact',
      title: 'Open Contact',
      subtitle: 'Show contact channels',
      group: 'Actions' as const,
      iconName: 'Mail',
      keywords: ['email', 'reach out'],
      onSelect: () => openApp('contact'),
    },
    {
      id: 'action-open-interests',
      title: 'Open Interests',
      subtitle: 'Show chess, wrestling, and personal interests',
      group: 'Actions' as const,
      iconName: 'Trophy',
      keywords: ['chess', 'wrestling', 'personal'],
      onSelect: () => openApp('interests'),
    },
    {
      id: 'action-open-sysinfo',
      title: 'Open System Info',
      subtitle: 'Show JamesOS system details',
      group: 'Actions' as const,
      iconName: 'Cpu',
      keywords: ['status', 'stack', 'skills'],
      onSelect: () => openApp('sysinfo'),
    },
    {
      id: 'action-download-resume',
      title: 'Download Resume',
      subtitle: PROFILE.resumeLabel,
      group: 'Actions' as const,
      iconName: 'Download',
      keywords: ['pdf', 'resume file'],
      onSelect: () => {
        triggerResumeDownload();
        toast('Resume download started', {
          description: PROFILE.resumeLabel,
        });
      },
    },
    {
      id: 'action-open-resume-tab',
      title: 'Open Resume in New Tab',
      subtitle: PROFILE.resumeLabel,
      group: 'Actions' as const,
      iconName: 'ExternalLink',
      keywords: ['resume', 'tab', 'pdf'],
      onSelect: openResumeInNewTab,
    },
    {
      id: 'action-copy-email',
      title: 'Copy Email',
      subtitle: PROFILE.email,
      group: 'Actions' as const,
      iconName: 'Copy',
      keywords: ['contact', 'mail'],
      onSelect: () => {
        void copyEmail();
      },
    },
    {
      id: 'action-open-github',
      title: 'Open GitHub',
      subtitle: PROFILE.githubDisplay,
      group: 'Actions' as const,
      iconName: 'GitBranch',
      keywords: ['code', 'repositories'],
      onSelect: () => {
        openExternal(PROFILE.githubUrl);
        toast('GitHub opened', {
          description: PROFILE.githubDisplay,
        });
      },
    },
    {
      id: 'action-open-linkedin',
      title: 'Open LinkedIn',
      subtitle: PROFILE.linkedinDisplay,
      group: 'Actions' as const,
      iconName: 'Briefcase',
      keywords: ['professional', 'network'],
      onSelect: () => {
        openExternal(PROFILE.linkedinUrl);
        toast('LinkedIn opened', {
          description: PROFILE.linkedinDisplay,
        });
      },
    },
    {
      id: 'action-recruiter-mode',
      title: 'Recruiter Mode',
      subtitle: 'Open resume, projects, and contact together',
      group: 'Actions' as const,
      iconName: 'Users',
      keywords: ['essentials', 'interview', 'overview'],
      onSelect: openRecruiterFastPath,
    },
    {
      id: 'action-arrange-windows',
      title: 'Arrange Windows',
      subtitle: 'Place open windows into a clean layout',
      group: 'Actions' as const,
      iconName: 'WandSparkles',
      keywords: ['layout', 'organize', 'tile'],
      onSelect: arrangeWindowsWithNotice,
    },
  ];

  return (
    <div className="os-shell-overlay fixed inset-0 z-40">
      <div
        className="relative hidden h-full w-full overflow-hidden select-none md:block"
        style={{ background: '#0f0f11' }}
      >
        <DesktopBackdrop />
        <DesktopInteractionLayer onSelectionAppsChange={setSelectedDesktopIds} />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            boxShadow:
              'inset 0 0 0 1px rgba(255,255,255,0.05), inset 0 80px 120px rgba(255,255,255,0.02), inset 0 -140px 180px rgba(0,0,0,0.34)',
          }}
        />

        <Taskbar
          focusedId={focusedId}
          onOpenLauncher={() => setLauncherOpen(true)}
          onOpenWorkspace={openWorkspaceWithNotice}
          onRecruiterMode={openRecruiterFastPath}
          onSimpleView={enterSimpleView}
        />

        <AnimatePresence>
          {heroVisible ? (
            <DesktopHero
              onOpenApp={activateDesktopApp}
              onRecruiterMode={openRecruiterFastPath}
              onSimpleView={enterSimpleView}
              onDismiss={() => setHeroDismissed(true)}
            />
          ) : null}
        </AnimatePresence>

        <AnimatePresence>
          {showRecruiterPrompt && !showBoot && heroVisible ? (
            <motion.div
              initial={{ opacity: 0, x: -8, y: 3 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: -6, y: 3 }}
              transition={{ delay: 0.95, duration: 0.24, ease: 'easeOut' }}
              className="absolute left-7 top-14 z-[650] rounded-[12px] border px-2.5 py-2 shadow-[0_10px_24px_rgba(0,0,0,0.24)] backdrop-blur-xl"
              style={{
                borderColor: 'rgba(255,255,255,0.085)',
                background: 'rgba(15,16,18,0.78)',
              }}
              role="region"
              aria-label="Recruiter fast path"
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: 'var(--os-accent)' }}
                />
                <span className="text-[11.5px] font-medium" style={{ color: 'rgba(255,255,255,0.68)' }}>
                  Recruiter fast path
                </span>
                <button
                  type="button"
                  onClick={openRecruiterFastPath}
                  className="rounded-md px-2 py-1 text-[11px] font-semibold"
                  style={{ background: 'var(--os-accent)', color: '#08101f' }}
                >
                  Open
                </button>
                <button
                  type="button"
                  onClick={dismissRecruiterPrompt}
                  aria-label="Dismiss recruiter fast path"
                  className="grid h-5 w-5 place-items-center rounded-md text-[13px]"
                  style={{ color: 'rgba(255,255,255,0.36)' }}
                >
                  ×
                </button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.86 }}
          transition={{ delay: 0.9, duration: 0.35 }}
          className="absolute top-12 right-5 z-[600] flex flex-col gap-0 pt-2.5 pb-20"
        >
          {APPS.map((app) => (
            <DesktopIcon
              key={app.id}
              id={app.id}
              label={app.label}
              iconName={app.iconName}
              isOpen={windows[app.id]?.isOpen ?? false}
              isFocused={focusedId === app.id}
              isSelected={selectedDesktopIds.includes(app.id)}
              onActivate={() => activateDesktopApp(app.id)}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 0.74, y: 0 }}
          transition={{ delay: 1.15, duration: 0.3 }}
          className="absolute bottom-20 left-7"
        >
          <WorkspaceStatus
            mountedApps={Object.values(windows).filter((windowState) => windowState.isOpen && !windowState.isMinimized).length}
          />
        </motion.div>

        <div className="absolute inset-0 pt-10">
          <AnimatePresence>
            {APPS.map((app) => {
              const windowState = windows[app.id];
              if (!windowState?.isOpen) {
                return null;
              }

              return (
                <Window
                  key={app.id}
                  id={app.id}
                  isFocused={focusedId === app.id}
                  zIndex={windowState.zIndex}
                  isMinimized={windowState.isMinimized}
                  position={windowState.position}
                  size={windowState.size}
                  onClose={() => closeApp(app.id)}
                  onMinimize={() => minimizeApp(app.id)}
                  onFocus={() => focusApp(app.id)}
                  onMove={(position) => moveApp(app.id, position)}
                  onResize={(position, size) => resizeApp(app.id, position, size)}
                >
                  <AppContent
                    id={app.id}
                    onOpen={openApp}
                    onOpenWorkspace={openWorkspaceWithNotice}
                    selectedProjectId={selectedProjectId}
                    onSelectProject={setSelectedProjectId}
                  />
                </Window>
              );
            })}
          </AnimatePresence>
        </div>

        <Dock windows={windows} onOpen={openApp} onFocus={focusApp} />
        <QuickLauncher open={launcherOpen} onOpenChange={setLauncherOpen} items={quickLauncherItems} />
        <Toaster
          position="top-right"
          duration={2600}
          gap={8}
          toastOptions={{
            style: {
              border: '1px solid rgba(255,255,255,0.09)',
              background: 'rgba(24,24,26,0.96)',
              color: 'rgba(255,255,255,0.84)',
              boxShadow: '0 16px 42px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.04)',
            },
          }}
        />

        <p
          className="pointer-events-none absolute bottom-1.5 left-1/2 -translate-x-1/2 text-[10.5px]"
          style={{ color: 'rgba(255,255,255,0.18)' }}
        >
          Open an app, press {`Cmd/Ctrl + K`}, or drag across empty desktop space.
        </p>
      </div>

      <MobileLayout
        activeAppId={mobileAppId}
        onOpenApp={setMobileAppId}
        onCloseApp={() => setMobileAppId(null)}
        selectedProjectId={selectedProjectId}
        onSelectProject={setSelectedProjectId}
        onSimpleView={enterSimpleView}
      />

      <AnimatePresence>{showBoot ? <BootScreen onComplete={finishBoot} /> : null}</AnimatePresence>
    </div>
  );
}

function MobileLayout({
  activeAppId,
  onOpenApp,
  onCloseApp,
  selectedProjectId,
  onSelectProject,
  onSimpleView,
}: {
  activeAppId: AppId | null;
  onOpenApp: (id: AppId) => void;
  onCloseApp: () => void;
  selectedProjectId: string;
  onSelectProject: (id: string) => void;
  onSimpleView: () => void;
}) {
  return (
    <div
      className="fixed inset-0 overflow-y-auto md:hidden"
      style={{
        background:
          'radial-gradient(circle at 18% 12%, rgba(79,142,247,0.12) 0%, rgba(79,142,247,0.03) 18%, rgba(79,142,247,0) 38%), linear-gradient(180deg, #101114 0%, #0d0f12 100%)',
      }}
    >
      <div
        className="sticky top-0 z-10 flex h-14 items-center justify-between border-b px-5"
        style={{
          background: 'rgba(15,15,17,0.94)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderColor: 'rgba(255,255,255,0.07)',
        }}
      >
        <span className="text-[15px] font-semibold" style={{ color: 'rgba(255,255,255,0.88)' }}>
          JamesOS
        </span>
        <button
          onClick={onSimpleView}
          className="rounded-md border px-2.5 py-1 text-[11.5px]"
          style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.6)' }}
        >
          Simple view
        </button>
      </div>

      <div className="flex flex-col gap-5 px-4 pt-6 pb-24">
        <div className="px-1">
          <p className="text-[28px] font-semibold leading-tight" style={{ color: 'rgba(255,255,255,0.88)' }}>
            {PROFILE.name}
          </p>
          <p className="mt-2 text-[13px] leading-[1.6]" style={{ color: 'rgba(255,255,255,0.52)' }}>
            {POSITIONING}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {STATS.slice(0, 4).map((stat) => (
              <div
                key={stat.id}
                className="rounded-lg border px-3 py-2.5"
                style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}
              >
                <p className="text-[18px] font-semibold leading-none" style={{ color: 'rgba(255,255,255,0.9)' }}>
                  {stat.display}
                </p>
                <p className="mt-1 text-[10.5px] leading-[1.4]" style={{ color: 'rgba(255,255,255,0.42)' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {([
            { id: 'resume' as AppId, label: 'Resume' },
            { id: 'projects' as AppId, label: 'Projects' },
            { id: 'contact' as AppId, label: 'Contact' },
          ] as const).map((item) => (
            <button
              key={item.id}
              onClick={() => onOpenApp(item.id)}
              className="rounded-xl border py-4 text-center active:scale-[0.98]"
              style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.09)' }}
            >
              <span className="text-[13.5px] font-medium" style={{ color: 'rgba(255,255,255,0.8)' }}>
                {item.label}
              </span>
            </button>
          ))}
        </div>

        <div
          className="rounded-xl border px-4 py-4"
          style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.07)' }}
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[13px] font-medium" style={{ color: 'rgba(255,255,255,0.84)' }}>
                Workspace status
              </p>
              <p className="mt-1 text-[12px]" style={{ color: 'rgba(255,255,255,0.36)' }}>
                {PROJECTS.length} projects indexed · focus on {PROFILE.currentFocus}
              </p>
            </div>
            <button
              onClick={() => onOpenApp('projects')}
              className="rounded-md border px-3 py-1.5 text-[12px]"
              style={{
                borderColor: 'rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.04)',
                color: 'rgba(255,255,255,0.72)',
              }}
            >
              Open
            </button>
          </div>
        </div>

        <div>
          <p className="px-1 text-[13px] font-medium" style={{ color: 'rgba(255,255,255,0.78)' }}>
            Apps
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2.5">
            {APPS.map((app) => (
              <button
                key={app.id}
                onClick={() => onOpenApp(app.id)}
                className="rounded-xl border p-4 text-left active:scale-[0.98]"
                style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.07)' }}
              >
                <p className="text-[13.5px] font-medium" style={{ color: 'rgba(255,255,255,0.8)' }}>
                  {app.label}
                </p>
                <p className="mt-1 text-[11px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  Open full screen
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeAppId && (
        <MobileAppPanel
          title={APPS.find((app) => app.id === activeAppId)?.label ?? 'App'}
          onBack={onCloseApp}
        >
          <AppContent
            id={activeAppId}
            onOpen={onOpenApp}
            onOpenWorkspace={() => onOpenApp('projects')}
            selectedProjectId={selectedProjectId}
            onSelectProject={onSelectProject}
            isMobile
          />
        </MobileAppPanel>
      )}
    </div>
  );
}
