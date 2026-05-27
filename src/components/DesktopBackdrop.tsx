import { DESKTOP_GRID_SIZE } from '@/lib/desktop-grid';

export default function DesktopBackdrop() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #14171d 0%, #0f1217 42%, #0a0c10 100%)',
        }}
      />

      <div
        className="desktop-backdrop-breathe pointer-events-none absolute inset-0 opacity-95"
        style={{
          backgroundImage: [
            'radial-gradient(circle at 12% 14%, rgba(79,142,247,0.17) 0%, rgba(79,142,247,0.08) 18%, rgba(79,142,247,0) 38%)',
            'radial-gradient(circle at 78% 18%, rgba(50,215,75,0.08) 0%, rgba(50,215,75,0.03) 18%, rgba(50,215,75,0) 34%)',
            'radial-gradient(circle at 68% 72%, rgba(167,139,250,0.09) 0%, rgba(167,139,250,0.03) 18%, rgba(167,139,250,0) 34%)',
            'radial-gradient(circle at 26% 82%, rgba(245,158,11,0.08) 0%, rgba(245,158,11,0.03) 15%, rgba(245,158,11,0) 34%)',
          ].join(', '),
        }}
      />

      <div
        className="pointer-events-none absolute inset-y-[10%] right-[6%] w-[46%] opacity-80"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.028) 0%, rgba(255,255,255,0.006) 100%)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: 14,
          boxShadow: '0 0 0 1px rgba(255,255,255,0.02) inset',
        }}
      >
        <div
          className="absolute inset-x-[8%] top-[12%] bottom-[12%]"
          style={{
            borderLeft: '1px solid rgba(255,255,255,0.05)',
            borderRight: '1px solid rgba(255,255,255,0.05)',
          }}
        />
        <div
          className="absolute inset-y-[16%] left-[32%] right-[32%]"
          style={{
            borderLeft: '1px solid rgba(255,255,255,0.04)',
            borderRight: '1px solid rgba(255,255,255,0.04)',
          }}
        />
        <div
          className="absolute left-[10%] right-[10%] top-1/2 h-px -translate-y-1/2"
          style={{ background: 'rgba(255,255,255,0.06)' }}
        />
      </div>

      <div
        className="desktop-backdrop-drift pointer-events-none absolute inset-y-[-8%] right-[-10%] w-[60%] opacity-55"
        style={{
          background:
            'linear-gradient(112deg, rgba(255,255,255,0) 8%, rgba(79,142,247,0.12) 30%, rgba(255,255,255,0.014) 58%, rgba(255,255,255,0) 78%)',
          transform: 'skewX(-14deg)',
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage:
            `repeating-linear-gradient(rgba(255,255,255,0.013) 0px, transparent 1px, transparent ${DESKTOP_GRID_SIZE - 1}px, rgba(255,255,255,0.013) ${DESKTOP_GRID_SIZE}px), repeating-linear-gradient(90deg, rgba(255,255,255,0.011) 0px, transparent 1px, transparent ${DESKTOP_GRID_SIZE - 1}px, rgba(255,255,255,0.011) ${DESKTOP_GRID_SIZE}px)`,
        }}
      />

      <div
        className="desktop-backdrop-grid pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 24% 22%, rgba(255,255,255,0.07) 0px, rgba(255,255,255,0.07) 1px, transparent 1px), radial-gradient(circle at 74% 68%, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '240px 240px, 280px 280px',
        }}
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 56% 14%, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.012) 18%, rgba(255,255,255,0) 38%), radial-gradient(circle at 50% 100%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.4) 100%)',
        }}
      />
    </>
  );
}
