import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'James Wright — JamesOS',
  description: 'Mathematics and Computer Science student at Duke University working across machine learning, research engineering, and applied software.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased bg-[#080b14] overflow-hidden">
        {children}
      </body>
    </html>
  );
}
