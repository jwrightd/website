import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};

export const contentType = 'image/png';

export default function AppleIcon() {
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
        }}
      >
        <div
          style={{
            width: 118,
            height: 118,
            borderRadius: 34,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(255,255,255,0.18)',
            background: 'linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.025))',
            boxShadow: '0 28px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.18)',
            color: '#dce8ff',
            fontSize: 54,
            fontWeight: 760,
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
          }}
        >
          J
        </div>
      </div>
    ),
    size
  );
}
