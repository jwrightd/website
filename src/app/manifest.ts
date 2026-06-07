import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'James Wright',
    short_name: 'James Wright',
    description: 'Portfolio for James Wright — Duke Math + CS, software engineer and ML researcher.',
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
