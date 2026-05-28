import Image from 'next/image';
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
        className="desktop-backdrop-drift pointer-events-none absolute inset-y-[-10%] right-[-14%] w-[68%] opacity-45"
        style={{
          background:
            'linear-gradient(112deg, rgba(79,142,247,0) 10%, rgba(79,142,247,0.08) 34%, rgba(255,255,255,0.012) 54%, rgba(79,142,247,0.03) 68%, rgba(79,142,247,0) 86%)',
          transform: 'skewX(-12deg)',
          filter: 'blur(18px)',
        }}
      />

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className="absolute h-[42vw] w-[42vw] max-h-[560px] max-w-[560px] min-h-[280px] min-w-[280px] rounded-full opacity-75"
          style={{
            background:
              'radial-gradient(circle, rgba(79,142,247,0.22) 0%, rgba(79,142,247,0.09) 28%, rgba(79,142,247,0.03) 52%, rgba(79,142,247,0) 76%)',
            filter: 'blur(22px)',
          }}
        />
        <div
          className="relative h-[42vw] w-[42vw] max-h-[560px] max-w-[560px] min-h-[280px] min-w-[280px] opacity-[0.5]"
          style={{
            mixBlendMode: 'lighten',
            WebkitMaskImage:
              'radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 54%, rgba(0,0,0,0.82) 68%, rgba(0,0,0,0.22) 84%, rgba(0,0,0,0) 100%)',
            maskImage:
              'radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 54%, rgba(0,0,0,0.82) 68%, rgba(0,0,0,0.22) 84%, rgba(0,0,0,0) 100%)',
          }}
        >
          <Image
            src="/logo.png"
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 64vw, 42vw"
            style={{
              objectFit: 'contain',
              filter:
                'brightness(1.16) contrast(1.3) saturate(1.12) drop-shadow(0 0 52px rgba(79,142,247,0.2))',
            }}
          />
        </div>
      </div>

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
