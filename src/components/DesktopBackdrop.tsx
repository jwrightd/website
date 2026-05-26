export default function DesktopBackdrop() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #111317 0%, #0d0f12 44%, #0b0c0f 100%)',
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          backgroundImage: [
            'radial-gradient(circle at 14% 16%, rgba(79,142,247,0.16) 0%, rgba(79,142,247,0.07) 16%, rgba(79,142,247,0) 38%)',
            'radial-gradient(circle at 83% 18%, rgba(50,215,75,0.08) 0%, rgba(50,215,75,0.03) 14%, rgba(50,215,75,0) 34%)',
            'radial-gradient(circle at 70% 78%, rgba(244,114,182,0.06) 0%, rgba(244,114,182,0.02) 18%, rgba(244,114,182,0) 36%)',
            'radial-gradient(circle at 32% 84%, rgba(251,191,36,0.06) 0%, rgba(251,191,36,0.02) 15%, rgba(251,191,36,0) 32%)',
          ].join(', '),
        }}
      />

      <div
        className="pointer-events-none absolute inset-y-0 right-[-10%] w-[54%] opacity-40"
        style={{
          background:
            'linear-gradient(112deg, rgba(255,255,255,0) 4%, rgba(255,255,255,0.035) 34%, rgba(255,255,255,0.008) 56%, rgba(255,255,255,0) 76%)',
          transform: 'skewX(-16deg)',
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(rgba(255,255,255,0.012) 0px, transparent 1px, transparent 34px, rgba(255,255,255,0.012) 35px), repeating-linear-gradient(90deg, rgba(255,255,255,0.01) 0px, transparent 1px, transparent 34px, rgba(255,255,255,0.01) 35px)',
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'repeating-radial-gradient(circle at 18% 22%, rgba(255,255,255,0.28) 0px, rgba(255,255,255,0.28) 1px, transparent 1px, transparent 20px)',
        }}
      />
    </>
  );
}
