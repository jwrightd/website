import { ImageResponse } from 'next/og';
import { PROJECTS } from '@/data/projects';

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

interface ProjectOgImageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectOpenGraphImage({ params }: ProjectOgImageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((entry) => entry.id === slug);

  if (!project) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0f0f11',
            color: '#f5f5f5',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 48,
          }}
        >
          James Wright
        </div>
      ),
      size,
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 64,
          background: '#0f0f11',
          color: '#f5f5f5',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 26, fontWeight: 650, color: 'rgba(255,255,255,0.72)' }}>jameswright.dev</div>
          <div style={{ fontSize: 22, color: 'rgba(255,255,255,0.42)' }}>{project.category}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 68, lineHeight: 1.05, fontWeight: 760, letterSpacing: '-0.03em' }}>
            {project.name}
          </div>
          <div
            style={{
              marginTop: 24,
              maxWidth: 980,
              fontSize: 30,
              lineHeight: 1.4,
              color: 'rgba(255,255,255,0.62)',
            }}
          >
            {project.outcome}
          </div>
        </div>

        <div
          style={{
            alignSelf: 'flex-start',
            border: '1px solid rgba(79,142,247,0.45)',
            background: 'rgba(79,142,247,0.12)',
            borderRadius: 12,
            padding: '16px 22px',
            fontSize: 24,
            color: '#c7d9ff',
          }}
        >
          {project.proof}
        </div>
      </div>
    ),
    size,
  );
}
