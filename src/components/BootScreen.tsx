'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { PROFILE } from '@/data/profile';

interface BootScreenProps {
  onComplete: () => void;
}

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [typedUsername, setTypedUsername] = useState('');
  const [typedPassword, setTypedPassword] = useState('');
  const [activeField, setActiveField] = useState<'username' | 'password' | 'loading'>('username');
  const [imageFailed, setImageFailed] = useState(false);

  const fallbackInitials = useMemo(
    () =>
      PROFILE.name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase(),
    []
  );

  useEffect(() => {
    let cancelled = false;
    const timers: number[] = [];

    const wait = (delay: number) =>
      new Promise<void>((resolve) => {
        const timerId = window.setTimeout(resolve, delay);
        timers.push(timerId);
      });

    const runSequence = async () => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const charDelay = reduceMotion ? 18 : 128;
      const fieldPause = reduceMotion ? 56 : 260;
      const loadingPause = reduceMotion ? 220 : 1020;

      await wait(reduceMotion ? 70 : 360);

      for (const char of PROFILE.loginUsername) {
        if (cancelled) {
          return;
        }

        setTypedUsername((current) => current + char);
        await wait(charDelay);
      }

      await wait(fieldPause);

      if (cancelled) {
        return;
      }

      setActiveField('password');

      for (const char of PROFILE.loginPasswordMask) {
        if (cancelled) {
          return;
        }

        setTypedPassword((current) => current + char);
        await wait(charDelay);
      }

      await wait(fieldPause);

      if (cancelled) {
        return;
      }

      setActiveField('loading');
      await wait(loadingPause);

      if (!cancelled) {
        onComplete();
      }
    };

    void runSequence();

    return () => {
      cancelled = true;
      for (const timerId of timers) {
        window.clearTimeout(timerId);
      }
    };
  }, [onComplete]);

  return (
    <div
      className="boot-screen fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at 84% 44%, rgba(79,142,247,0.18) 0%, rgba(79,142,247,0.08) 18%, rgba(79,142,247,0) 46%), linear-gradient(180deg, #08090b 0%, #0d0f12 100%)',
      }}
    >
      <div
        aria-hidden="true"
        className="boot-ambient absolute inset-0 opacity-80"
        style={{
          backgroundImage:
            'repeating-linear-gradient(rgba(255,255,255,0.012) 0px, transparent 1px, transparent 34px, rgba(255,255,255,0.012) 35px), repeating-linear-gradient(90deg, rgba(255,255,255,0.01) 0px, transparent 1px, transparent 34px, rgba(255,255,255,0.01) 35px)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute top-1/2 right-[-12vw] h-[72vw] w-[72vw] -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(79,142,247,0.18) 0%, rgba(79,142,247,0) 62%)' }}
      />

      <div className="boot-content relative z-10 flex w-full max-w-[440px] flex-col items-center px-6 text-center">
        <div className="relative h-[108px] w-[108px] overflow-hidden rounded-full border border-white/12 bg-white/6 shadow-[0_18px_60px_rgba(0,0,0,0.42)]">
          {!imageFailed ? (
            <Image
              src={PROFILE.profilePhotoSrc}
              alt={PROFILE.profilePhotoAlt}
              fill
              priority
              sizes="108px"
              className="object-cover"
              onError={() => setImageFailed(true)}
            />
          ) : null}
          {imageFailed ? (
            <div className="flex h-full w-full items-center justify-center text-[30px] font-semibold tracking-[0.08em] text-white/78">
              {fallbackInitials}
            </div>
          ) : null}
        </div>

        <div className="mt-6">
          <p className="text-[34px] font-light tracking-[-0.02em] text-white/90 sm:text-[38px]">
            {PROFILE.name}
          </p>
          <p className="mt-2 text-[12px] tracking-[0.18em] text-white/24">JAMESOS LOGIN</p>
        </div>

        <div className="mt-8 flex w-full flex-col gap-3">
          <LoginField
            label="User name"
            value={typedUsername}
            isActive={activeField === 'username'}
          />
          <LoginField
            label="Password"
            value={typedPassword}
            isActive={activeField === 'password'}
            isPassword
          />
        </div>

        <div className="mt-7 flex min-h-6 items-center gap-3 text-[13px] text-white/42">
          {activeField === 'loading' ? (
            <>
              <span className="boot-loader h-4 w-4 rounded-full border border-white/18 border-t-white/72" />
              <span>Signing in to workspace</span>
            </>
          ) : (
            <span style={{ color: 'rgba(255,255,255,0.26)' }}>Preparing workspace credentials</span>
          )}
        </div>
      </div>
    </div>
  );
}

function LoginField({
  label,
  value,
  isActive,
  isPassword = false,
}: {
  label: string;
  value: string;
  isActive: boolean;
  isPassword?: boolean;
}) {
  return (
    <div
      className="w-full border px-4 py-3 text-left"
      style={{
        background: isPassword ? 'rgba(8,11,16,0.72)' : 'rgba(245,246,248,0.96)',
        borderColor: isActive ? 'rgba(79,142,247,0.44)' : 'rgba(255,255,255,0.12)',
        boxShadow: isActive ? '0 0 0 1px rgba(79,142,247,0.16)' : 'none',
      }}
    >
      <p
        className="text-[11px] leading-none"
        style={{ color: isPassword ? 'rgba(255,255,255,0.34)' : 'rgba(15,15,17,0.38)' }}
      >
        {label}
      </p>
      <div
        className="mt-2 flex min-h-[18px] items-center font-mono text-[15px] tracking-[0.08em]"
        style={{ color: isPassword ? 'rgba(255,255,255,0.88)' : 'rgba(15,15,17,0.82)' }}
      >
        <span>{value || '\u00a0'}</span>
        {isActive ? <span aria-hidden="true" className="boot-caret ml-0.5 h-[18px] w-px bg-current" /> : null}
      </div>
    </div>
  );
}
