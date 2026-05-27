import { APPS } from '@/data/apps';
import { PROFILE } from '@/data/profile';
import { PROJECTS } from '@/data/projects';

interface WorkspaceStatusProps {
  mountedApps: number;
}

export default function WorkspaceStatus({ mountedApps }: WorkspaceStatusProps) {
  const rows = [
    ['Apps mounted', `${mountedApps} / ${APPS.length}`],
    ['Projects indexed', String(PROJECTS.length)],
    ['Resume ready', PROFILE.resumeAvailable ? 'Ready' : 'Awaiting asset'],
    ['Last sync', PROFILE.lastUpdated],
    ['Current focus', PROFILE.currentFocus],
  ] as const;

  return (
    <div
      className="w-[260px] overflow-hidden rounded-[10px] border"
      style={{
        borderColor: 'rgba(255,255,255,0.08)',
        background: 'linear-gradient(180deg, rgba(20,20,22,0.94) 0%, rgba(17,17,19,0.92) 100%)',
        boxShadow: '0 16px 28px rgba(0,0,0,0.22), 0 1px 0 rgba(255,255,255,0.04) inset',
      }}
    >
      <div
        className="border-b px-4 py-3"
        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
      >
        <div className="flex items-center justify-between gap-3">
          <p className="text-[12.5px] font-medium" style={{ color: 'var(--os-text)' }}>
            Workspace status
          </p>
          <span
            className="inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[10.5px]"
            style={{
              color: 'rgba(255,255,255,0.44)',
              borderColor: 'rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.03)',
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: '#32d74b' }} />
            Online
          </span>
        </div>
      </div>

      <div className="px-4 py-2">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="flex items-start justify-between gap-3 border-b py-2.5 last:border-b-0"
            style={{ borderColor: 'rgba(255,255,255,0.05)' }}
          >
            <span className="text-[11.5px]" style={{ color: 'var(--os-text-3)' }}>
              {label}
            </span>
            <span
              className="text-right text-[11.5px] leading-[1.5]"
              style={{
                color:
                  label === 'Current focus'
                    ? 'rgba(167,139,250,0.92)'
                    : label === 'Resume ready'
                      ? 'rgba(50,215,75,0.84)'
                      : 'rgba(255,255,255,0.74)',
              }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
