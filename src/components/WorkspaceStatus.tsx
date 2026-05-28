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
        background: 'rgba(15,16,18,0.84)',
        boxShadow: '0 18px 30px rgba(0,0,0,0.22), 0 1px 0 rgba(255,255,255,0.05) inset',
        backdropFilter: 'blur(18px) saturate(130%)',
        WebkitBackdropFilter: 'blur(18px) saturate(130%)',
      }}
    >
      <div
        className="border-b px-4 py-3"
        style={{
          borderColor: 'rgba(255,255,255,0.08)',
          background: 'rgba(255,255,255,0.025)',
        }}
      >
        <div className="flex items-center justify-between gap-3">
          <p className="text-[12.5px] font-medium" style={{ color: 'rgba(255,255,255,0.82)' }}>
            Workspace status
          </p>
          <span
            className="inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[10.5px]"
            style={{
              color: 'rgba(255,255,255,0.78)',
              borderColor: 'rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.04)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
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
            <span className="text-[11.5px]" style={{ color: 'rgba(255,255,255,0.34)' }}>
              {label}
            </span>
            <span
              className="text-right text-[11.5px] leading-[1.5]"
              style={{
                color:
                  label === 'Current focus'
                    ? 'rgba(145,127,232,0.88)'
                    : label === 'Resume ready'
                      ? 'rgba(24,130,41,0.92)'
                      : 'rgba(255,255,255,0.76)',
                fontWeight: label === 'Current focus' ? 500 : 400,
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
