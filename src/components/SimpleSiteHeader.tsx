'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { PROFILE } from '@/data/profile';
import { EnterJamesOSButton } from './StaticSiteControls';

const cardStyle = {
  borderColor: 'rgba(255,255,255,0.08)',
  background: 'rgba(255,255,255,0.025)',
} as const;

const NAV_LINKS = [
  { href: PROFILE.resumeHref, label: 'Resume', external: true },
  { href: '/#projects', label: 'Projects', external: false },
  { href: PROFILE.githubUrl, label: 'GitHub', external: true },
  { href: PROFILE.linkedinUrl, label: 'LinkedIn', external: true },
  { href: '/#contact', label: 'Contact', external: false },
] as const;

export default function SimpleSiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className="sticky top-0 z-10 border-b backdrop-blur"
      style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(15,15,17,0.82)' }}
    >
      <div className="mx-auto flex h-14 max-w-[1100px] items-center justify-between gap-3 px-6">
        <a href="#top" className="text-[14px] font-semibold tracking-tight" style={{ color: 'rgba(255,255,255,0.82)' }}>
          James Wright
        </a>

        <nav className="hidden items-center gap-2 md:flex" aria-label="Quick links">
          {NAV_LINKS.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border px-3 py-1.5 text-[12.5px]"
                style={{ ...cardStyle, color: 'rgba(255,255,255,0.74)' }}
              >
                {link.label}
              </a>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="rounded-md border px-3 py-1.5 text-[12.5px]"
                style={{ ...cardStyle, color: 'rgba(255,255,255,0.74)' }}
              >
                {link.label}
              </a>
            )
          )}
          <EnterJamesOSButton className="rounded-md border px-3 py-1.5 text-[12.5px] font-medium transition-colors">
            <span style={{ color: '#bcd4ff' }}>Enter JamesOS →</span>
          </EnterJamesOSButton>
        </nav>

        <button
          type="button"
          className="grid h-9 w-9 place-items-center rounded-md border md:hidden"
          style={{ ...cardStyle, color: 'rgba(255,255,255,0.72)' }}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t px-6 py-4 md:hidden"
          style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(12,13,16,0.96)' }}
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="rounded-md border px-3 py-2.5 text-[13px]"
                  style={{ ...cardStyle, color: 'rgba(255,255,255,0.78)' }}
                >
                  {link.label}
                </a>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="rounded-md border px-3 py-2.5 text-[13px]"
                  style={{ ...cardStyle, color: 'rgba(255,255,255,0.78)' }}
                >
                  {link.label}
                </a>
              )
            )}
            <EnterJamesOSButton
              className="rounded-md border px-3 py-2.5 text-left text-[13px] font-medium"
              onActivate={closeMenu}
            >
              <span style={{ color: '#bcd4ff' }}>Enter JamesOS →</span>
            </EnterJamesOSButton>
            <Link
              href="/#quant"
              onClick={closeMenu}
              className="rounded-md border px-3 py-2.5 text-[13px]"
              style={{ ...cardStyle, color: 'rgba(255,255,255,0.78)' }}
            >
              Quant / ML
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
