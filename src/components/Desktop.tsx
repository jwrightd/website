'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { APPS } from '@/data/apps';
import { PROFILE } from '@/data/profile';
import { PROJECTS } from '@/data/projects';
import { useWindowManager } from '@/hooks/useWindowManager';
import type { AppId } from '@/types';

import BootScreen from './BootScreen';
import DesktopIcon from './DesktopIcon';
import Dock from './Dock';
import MobileAppPanel from './MobileAppPanel';
import QuickLauncher, { type QuickLauncherItem } from './QuickLauncher';
import Taskbar from './Taskbar';
import Window from './Window';
import WorkspaceStatus from './WorkspaceStatus';

import AboutApp from './apps/AboutApp';
import ContactApp from './apps/ContactApp';
import ExperienceApp from './apps/ExperienceApp';
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
  const [mobileAppId, setMobileAppId] = useState<AppId | null>(null);
  const [bootComplete, setBootComplete] = useState(false);

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
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
    } catch {
      openExternal(`mailto:${PROFILE.email}`);
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
      onSelect: openWorkspace,
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
      onSelect: () => openApp('resume'),
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
      onSelect: triggerResumeDownload,
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
      onSelect: () => openExternal(PROFILE.githubUrl),
    },
    {
      id: 'action-open-linkedin',
      title: 'Open LinkedIn',
      subtitle: PROFILE.linkedinDisplay,
      group: 'Actions' as const,
      iconName: 'Briefcase',
      keywords: ['professional', 'network'],
      onSelect: () => openExternal(PROFILE.linkedinUrl),
    },
    {
      id: 'action-recruiter-mode',
      title: 'Recruiter Mode',
      subtitle: 'Open resume, projects, and contact together',
      group: 'Actions' as const,
      iconName: 'Users',
      keywords: ['essentials', 'interview', 'overview'],
      onSelect: activateRecruiterMode,
    },
    {
      id: 'action-arrange-windows',
      title: 'Arrange Windows',
      subtitle: 'Place open windows into a clean layout',
      group: 'Actions' as const,
      iconName: 'WandSparkles',
      keywords: ['layout', 'organize', 'tile'],
      onSelect: arrangeWindows,
    },
  ];

  if (!bootComplete) {
    return <BootScreen onComplete={() => setBootComplete(true)} />;
  }

  return (
    <>
      <div
        className="relative hidden h-screen w-screen overflow-hidden select-none md:block"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 40%, #161618 0%, #0f0f11 100%)',
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(rgba(255,255,255,0.013) 0px, transparent 1px, transparent 32px, rgba(255,255,255,0.013) 33px), repeating-linear-gradient(90deg, rgba(255,255,255,0.013) 0px, transparent 1px, transparent 32px, rgba(255,255,255,0.013) 33px)',
          }}
        />

        <Taskbar
          focusedId={focusedId}
          onOpenLauncher={() => setLauncherOpen(true)}
          onOpenWorkspace={openWorkspace}
          onRecruiterMode={activateRecruiterMode}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.35 }}
          className="absolute top-11 right-2 z-[600] flex flex-col gap-0.5 pt-3 pb-24"
        >
          {APPS.map((app) => (
            <DesktopIcon
              key={app.id}
              id={app.id}
              label={app.label}
              iconName={app.iconName}
              isOpen={windows[app.id]?.isOpen ?? false}
              isFocused={focusedId === app.id}
              onActivate={() => activateDesktopApp(app.id)}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.3 }}
          className="absolute bottom-20 left-7"
        >
          <WorkspaceStatus
            mountedApps={Object.values(windows).filter((windowState) => windowState.isOpen && !windowState.isMinimized).length}
          />
        </motion.div>

        <div className="absolute inset-0 pt-9">
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
                    onOpenWorkspace={openWorkspace}
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

        <p
          className="pointer-events-none absolute bottom-1.5 left-1/2 -translate-x-1/2 text-[10.5px]"
          style={{ color: 'rgba(255,255,255,0.12)' }}
        >
          Click any app, use {`Cmd/Ctrl + K`}, or start with Open Workspace or Recruiter Mode.
        </p>
      </div>

      <MobileLayout
        activeAppId={mobileAppId}
        onOpenApp={setMobileAppId}
        onCloseApp={() => setMobileAppId(null)}
        selectedProjectId={selectedProjectId}
        onSelectProject={setSelectedProjectId}
      />
    </>
  );
}

function MobileLayout({
  activeAppId,
  onOpenApp,
  onCloseApp,
  selectedProjectId,
  onSelectProject,
}: {
  activeAppId: AppId | null;
  onOpenApp: (id: AppId) => void;
  onCloseApp: () => void;
  selectedProjectId: string;
  onSelectProject: (id: string) => void;
}) {
  return (
    <div className="fixed inset-0 overflow-y-auto md:hidden" style={{ background: '#0f0f11' }}>
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
        <span className="text-[12px]" style={{ color: 'rgba(255,255,255,0.32)' }}>
          {PROFILE.name}
        </span>
      </div>

      <div className="flex flex-col gap-5 px-4 pt-6 pb-24">
        <div className="px-1">
          <p className="text-[28px] font-semibold leading-tight" style={{ color: 'rgba(255,255,255,0.88)' }}>
            {PROFILE.name}
          </p>
          <p className="mt-1 text-[14px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
            {PROFILE.subtitle}
          </p>
          <p className="mt-3 text-[13.5px] leading-[1.7]" style={{ color: 'rgba(255,255,255,0.58)' }}>
            Reach the important surfaces fast: resume, projects, and contact stay one tap away.
          </p>
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
