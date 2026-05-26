'use client';

export default function BootScreen() {
  return (
    <div
      className="boot-screen fixed inset-0 z-[99999] flex flex-col items-center justify-center"
      style={{ background: '#0f0f11' }}
    >
      <div className="boot-content flex flex-col items-center gap-6">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-black text-white"
          style={{
            background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
            boxShadow: '0 0 40px rgba(99,102,241,0.4)',
          }}
        >
          J
        </div>

        <div className="text-center">
          <p className="text-[22px] font-semibold tracking-tight text-white">JamesOS</p>
          <p className="mt-1 text-[12px] uppercase tracking-widest text-white/30">Starting up</p>
        </div>

        <div className="h-[2px] w-32 overflow-hidden rounded-full bg-white/8">
          <div className="boot-progress h-full rounded-full" />
        </div>
      </div>
    </div>
  );
}
