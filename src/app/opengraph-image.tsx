import { ImageResponse } from 'next/og';
import { POSITIONING } from '@/data/highlights';

export const alt = 'James Wright, Math + CS at Duke, SWE at Duke Code+';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: 999,
                background: '#4f8ef7',
              }}
            />
            <div style={{ fontSize: 28, fontWeight: 650, color: 'rgba(255,255,255,0.78)' }}>
              jameswright.dev
            </div>
          </div>
          <div style={{ fontSize: 24, color: 'rgba(255,255,255,0.48)' }}>Duke Math + CS · Code+</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 82, lineHeight: 1, fontWeight: 760, letterSpacing: '-0.035em' }}>
            James Wright
          </div>
          <div
            style={{
              marginTop: 28,
              maxWidth: 980,
              fontSize: 34,
              lineHeight: 1.35,
              color: 'rgba(255,255,255,0.68)',
            }}
          >
            {POSITIONING}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 18 }}>
          {['4.0 GPA', 'bioRxiv co-author', '2x hackathon winner', 'USCF Candidate Master'].map((item) => (
            <div
              key={item}
              style={{
                border: '1px solid rgba(255,255,255,0.11)',
                background: 'rgba(255,255,255,0.045)',
                borderRadius: 12,
                padding: '18px 22px',
                fontSize: 25,
                color: 'rgba(255,255,255,0.82)',
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
