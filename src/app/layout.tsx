import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { PROFILE } from '@/data/profile';
import { POSITIONING } from '@/data/highlights';
import './globals.css';

const SITE_URL = 'https://jameswright.dev';
const DESCRIPTION =
  'James Wright — Duke Math + CS, software engineer & ML researcher. Shipped systems, bioRxiv research, and large-scale data pipelines. Seeking SWE/ML internships Summer 2026.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'James Wright — Software & ML Engineer',
    template: '%s — James Wright',
  },
  description: DESCRIPTION,
  applicationName: 'James Wright',
  authors: [{ name: 'James Wright', url: SITE_URL }],
  creator: 'James Wright',
  keywords: [
    'James Wright',
    'Duke University',
    'software engineer',
    'machine learning engineer',
    'quantitative',
    'research engineer',
    'portfolio',
    'internship',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'James Wright',
    title: 'James Wright — Software & ML Engineer',
    description: DESCRIPTION,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'James Wright — Software & ML Engineer',
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  category: 'technology',
};

export const viewport: Viewport = {
  themeColor: '#0f0f11',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

const VIEW_MODE_BOOTSTRAP = `(function(){try{var d=document.documentElement;d.classList.add('js');var s=sessionStorage;if(s.getItem('jamesos:simple')!=='0'){d.classList.add('simple-view');}if(s.getItem('jamesos:booted')==='1'){d.classList.add('booted');}}catch(e){}})();`;

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: PROFILE.name,
  url: SITE_URL,
  jobTitle: 'Software Engineer / Machine Learning Research Engineer',
  description: POSITIONING,
  email: `mailto:${PROFILE.email}`,
  address: { '@type': 'PostalAddress', addressLocality: 'Durham', addressRegion: 'NC', addressCountry: 'US' },
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'Duke University' },
    { '@type': 'EducationalOrganization', name: 'Thomas Jefferson High School for Science and Technology' },
  ],
  sameAs: [PROFILE.githubUrl, PROFILE.linkedinUrl],
  knowsAbout: [
    'Machine Learning',
    'Software Engineering',
    'Mathematics',
    'Neural Differential Equations',
    'Spatial Proteomics',
    'Computer Vision',
    'Quantitative Finance',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="font-sans antialiased bg-[#080b14]">
        <script dangerouslySetInnerHTML={{ __html: VIEW_MODE_BOOTSTRAP }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
