import { ArrowLeft } from 'lucide-react';

interface MobileAppPanelProps {
  title: string;
  onBack: () => void;
  children: React.ReactNode;
}

export default function MobileAppPanel({
  title,
  onBack,
  children,
}: MobileAppPanelProps) {
  return (
    <div className="fixed inset-0 z-30 flex flex-col md:hidden" style={{ background: '#0f0f11' }}>
      <div
        className="flex h-14 items-center gap-3 border-b px-4"
        style={{
          borderColor: 'rgba(255,255,255,0.08)',
          background: 'rgba(15,15,17,0.96)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-[12px]"
          style={{
            borderColor: 'rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.04)',
            color: 'rgba(255,255,255,0.72)',
          }}
        >
          <ArrowLeft size={13} />
          Back
        </button>
        <span className="text-[13px] font-medium" style={{ color: 'rgba(255,255,255,0.84)' }}>
          {title}
        </span>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
