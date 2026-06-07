import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'JamesOS',
    short_name: 'JamesOS',
    description: 'Interactive OS-style portfolio for James Wright.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f0f11',
    theme_color: '#0f0f11',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '32x32',
        type: 'image/x-icon',
      },
      {
        src: '/logo.png',
        sizes: '1254x1254',
        type: 'image/png',
      },
    ],
  };
}
