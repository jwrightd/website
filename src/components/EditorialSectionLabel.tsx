interface EditorialSectionLabelProps {
  id: string;
  index: string;
  label: string;
  title: string;
}

export default function EditorialSectionLabel({
  id,
  index,
  label,
  title,
}: EditorialSectionLabelProps) {
  return (
    <div className="mb-6 grid gap-2 sm:grid-cols-[86px_1fr] sm:items-baseline">
      <p
        data-section-label
        className="font-mono text-[11px] leading-none tracking-[0.08em]"
        style={{ color: 'rgba(255,255,255,0.34)' }}
      >
        [{index}] {label}
      </p>
      <h2
        id={id}
        className="text-[22px] font-semibold tracking-[-0.01em]"
        style={{ color: 'rgba(255,255,255,0.9)' }}
      >
        {title}
      </h2>
    </div>
  );
}
