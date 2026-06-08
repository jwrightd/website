import { Briefcase, FileText, GitBranch, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { ACHIEVEMENTS } from '@/data/achievements';
import { EDUCATION } from '@/data/education';
import { EXPERIENCE } from '@/data/experience';
import { FEATURED_STATS, HERO_CTAS, HERO_PROOF, MORE_STATS, POSITIONING, RECRUITER_PATH, TAGLINE } from '@/data/highlights';
import { PROFILE } from '@/data/profile';
import { PROJECTS } from '@/data/projects';
import { SKILLS } from '@/data/skills';

import EditorialSectionLabel from './EditorialSectionLabel';
import SimpleAmbientGrainLayer from './SimpleAmbientGrainLayer';
import SimpleGitHubSpotlight from './SimpleGitHubSpotlight';
import SimpleProjectShowcase from './SimpleProjectShowcase';
import SimpleQuantSection from './SimpleQuantSection';
import SimpleSiteHeader from './SimpleSiteHeader';
import { EnterJamesOSButton } from './StaticSiteControls';
import SimpleSectionReveal from './SimpleSectionReveal';

const cardStyle = {
  borderColor: 'rgba(255,255,255,0.08)',
  background: 'rgba(255,255,255,0.025)',
} as const;

function SectionHeading({
  id,
  index,
  label,
  title,
}: {
  id: string;
  index: string;
  label: string;
  title: string;
}) {
  return (
    <EditorialSectionLabel id={id} index={index} label={label} title={title} />
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="rounded-md border px-2 py-1 text-[12px]"
      style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.66)' }}
    >
      {children}
    </span>
  );
}

function StatLabel({ stat }: { stat: (typeof FEATURED_STATS)[number] }) {
  return (
    <>
      <span className="sm:hidden">{stat.shortLabel ?? stat.label}</span>
      <span className="hidden sm:inline">{stat.label}</span>
    </>
  );
}

export default function StaticSite() {

  return (
    <div id="simple-site" style={{ background: 'var(--os-bg)', color: 'var(--os-text)' }}>
      <SimpleAmbientGrainLayer />
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <SimpleSiteHeader />

      <main id="main" className="mx-auto max-w-[1100px] px-6 pb-24">
        {/* Hero */}
        <section id="top" className="pt-14 pb-10" aria-labelledby="hero-name">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
            <div
              className="relative mx-auto h-28 w-28 shrink-0 overflow-hidden rounded-xl border sm:mx-0 sm:h-32 sm:w-32"
              style={cardStyle}
            >
              <Image
                src={PROFILE.profilePhotoSrc}
                alt={PROFILE.profilePhotoAlt}
                fill
                priority
                sizes="(max-width: 640px) 112px, 128px"
                className="object-cover"
              />
            </div>

            <div className="min-w-0 flex-1 text-center sm:text-left">
              <p className="text-[12.5px] font-semibold" style={{ color: 'var(--os-accent)' }}>
                {RECRUITER_PATH}
              </p>
              <h1
                id="hero-name"
                className="mt-3 text-[44px] font-semibold leading-[1.05] tracking-[-0.02em] sm:text-[56px]"
                style={{ color: 'rgba(255,255,255,0.95)' }}
              >
                James Wright
              </h1>
              <p className="mt-3 max-w-[760px] text-[14px] leading-[1.65] sm:mx-0 mx-auto" style={{ color: 'rgba(255,255,255,0.58)' }}>
                {HERO_PROOF}
              </p>
              <p className="mt-4 max-w-[760px] text-[16.5px] leading-[1.6] sm:mx-0 mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
                {POSITIONING}
              </p>
              <p className="mt-3 max-w-[720px] text-[14.5px] leading-[1.7] sm:mx-0 mx-auto" style={{ color: 'rgba(255,255,255,0.5)' }}>
                {TAGLINE}
              </p>
              <div className="mt-4 flex flex-col gap-1.5 text-[13px] sm:items-start items-center" style={{ color: 'rgba(255,255,255,0.42)' }}>
                <p className="flex items-center gap-1.5">
                  <MapPin size={14} aria-hidden="true" />
                  {PROFILE.location}
                </p>
                <p>{PROFILE.availability}</p>
              </div>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap justify-center gap-3 sm:justify-start">
            {HERO_CTAS.map((cta) => {
              const isPrimary = cta.tone === 'primary';
              const href = cta.href ?? (cta.id === 'resume' ? PROFILE.resumeHref : (cta.anchor ?? '#'));
              const external = Boolean(cta.href) || cta.id === 'resume';
              return (
                <a
                  key={cta.id}
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="rounded-lg border px-5 py-2.5 text-[14px] font-medium transition-colors"
                  style={
                    isPrimary
                      ? { background: 'var(--os-accent)', borderColor: 'var(--os-accent)', color: '#08101f' }
                      : { ...cardStyle, color: 'rgba(255,255,255,0.82)' }
                  }
                >
                  {cta.label}
                </a>
              );
            })}
          </div>
        </section>

        {/* By the numbers */}
        <section className="py-8" aria-label="By the numbers">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {FEATURED_STATS.map((stat) => (
              <div key={stat.id} className="rounded-xl border px-4 py-4" style={cardStyle}>
                <p className="text-[26px] font-semibold leading-none tracking-[-0.01em]" style={{ color: 'rgba(255,255,255,0.92)' }}>
                  {stat.display}
                </p>
                <p className="mt-2 text-[12px] leading-[1.5]" style={{ color: 'rgba(255,255,255,0.52)' }}>
                  <StatLabel stat={stat} />
                </p>
              </div>
            ))}
          </div>
          {MORE_STATS.length > 0 ? (
            <details className="mt-3">
              <summary
                className="cursor-pointer list-none text-[12.5px] font-medium [&::-webkit-details-marker]:hidden"
                style={{ color: 'rgba(255,255,255,0.46)' }}
              >
                More signal
              </summary>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {MORE_STATS.map((stat) => (
                  <div key={stat.id} className="rounded-xl border px-4 py-3" style={cardStyle}>
                    <p className="text-[20px] font-semibold leading-none tracking-[-0.01em]" style={{ color: 'rgba(255,255,255,0.82)' }}>
                      {stat.display}
                    </p>
                    <p className="mt-2 text-[11.5px] leading-[1.45]" style={{ color: 'rgba(255,255,255,0.48)' }}>
                      <StatLabel stat={stat} />
                    </p>
                  </div>
                ))}
              </div>
            </details>
          ) : null}
        </section>

        <SimpleSectionReveal>
          <section className="py-8" aria-labelledby="github-h">
            <SectionHeading id="github-h" index="01" label="Code" title="GitHub spotlight" />
            <SimpleGitHubSpotlight />
          </section>
        </SimpleSectionReveal>

        <SimpleSectionReveal>
          <section id="projects" className="border-t py-10" style={{ borderColor: 'rgba(255,255,255,0.06)' }} aria-labelledby="projects-h">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <EditorialSectionLabel id="projects-h" index="02" label="Projects" title="Selected work" />
              <Link
                href="/projects"
                className="text-[12.5px] font-semibold"
                style={{ color: '#c7d9ff' }}
              >
                View all projects →
              </Link>
            </div>
            <SimpleProjectShowcase projects={PROJECTS} />
          </section>
        </SimpleSectionReveal>

        <SimpleSectionReveal>
          <section id="experience" className="border-t py-10" style={{ borderColor: 'rgba(255,255,255,0.06)' }} aria-labelledby="experience-h">
            <SectionHeading id="experience-h" index="03" label="Experience" title="Where I've worked" />
            <div className="flex flex-col gap-4">
              {EXPERIENCE.map((role) => (
                <article key={role.pid} className="rounded-xl border px-5 py-5" style={cardStyle}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-[16px] font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>
                      {role.role} · {role.organization}
                    </h3>
                    <span className="text-[12.5px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      {role.period}
                      {role.scope ? ` · ${role.scope}` : ''}
                    </span>
                  </div>
                  <p className="mt-2 text-[13.5px] leading-[1.7]" style={{ color: 'rgba(255,255,255,0.58)' }}>
                    {role.focus}
                  </p>
                  {role.highlights && role.highlights.length > 0 ? (
                    <ul className="mt-3 flex flex-col gap-1.5">
                      {role.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-2 text-[13px] leading-[1.6]" style={{ color: 'rgba(255,255,255,0.52)' }}>
                          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: 'var(--os-accent)' }} />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              ))}
            </div>
            <p className="mt-4 text-[12px] leading-[1.55]" style={{ color: 'rgba(255,255,255,0.36)' }}>
              Four concurrent roles during the academic year — scope notes reflect typical weekly commitment alongside coursework.
            </p>
          </section>
        </SimpleSectionReveal>

        <SimpleSectionReveal>
          <section id="quant" className="border-t py-10" style={{ borderColor: 'rgba(255,255,255,0.06)' }} aria-labelledby="quant-h">
            <SectionHeading id="quant-h" index="04" label="Quant / ML" title="Quant-relevant work" />
            <SimpleQuantSection />
          </section>
        </SimpleSectionReveal>

        <SimpleSectionReveal>
          <section id="about" className="border-t py-10" style={{ borderColor: 'rgba(255,255,255,0.06)' }} aria-labelledby="about-h">
            <SectionHeading id="about-h" index="05" label="About" title="Overview" />
            <p className="max-w-[820px] text-[15px] leading-[1.8]" style={{ color: 'rgba(255,255,255,0.72)' }}>
              {PROFILE.aboutSummary}
            </p>
            <ul className="mt-4 max-w-[820px] flex flex-col gap-2">
              {PROFILE.aboutBullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2 text-[14px] leading-[1.7]" style={{ color: 'rgba(255,255,255,0.54)' }}>
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: 'rgba(255,255,255,0.28)' }} />
                  {bullet}
                </li>
              ))}
            </ul>
          </section>
        </SimpleSectionReveal>

        <SimpleSectionReveal>
          <section id="resume" className="border-t py-8" style={{ borderColor: 'rgba(255,255,255,0.06)' }} aria-labelledby="resume-h">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 id="resume-h" className="text-[15px] font-semibold" style={{ color: 'rgba(255,255,255,0.82)' }}>
                  Resume
                </h2>
                <p className="mt-1 text-[12.5px]" style={{ color: 'rgba(255,255,255,0.42)' }}>
                  PDF · Last updated {PROFILE.lastUpdated}
                </p>
              </div>
              <a
                href={PROFILE.resumeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-lg border px-4 py-2 text-[13px] font-medium"
                style={{ background: 'var(--os-accent)', borderColor: 'var(--os-accent)', color: '#08101f' }}
              >
                <FileText size={14} aria-hidden="true" />
                View PDF
              </a>
            </div>
          </section>
        </SimpleSectionReveal>

        <SimpleSectionReveal>
          <section id="skills" className="border-t py-10" style={{ borderColor: 'rgba(255,255,255,0.06)' }} aria-labelledby="skills-h">
            <SectionHeading id="skills-h" index="06" label="Skills" title="Technical stack" />
            <div className="flex flex-col gap-5">
              {SKILLS.map((group) => (
                <div key={group.category}>
                  <p className="mb-2 text-[12.5px] font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    {group.category}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <Tag key={item}>{item}</Tag>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </SimpleSectionReveal>

        <SimpleSectionReveal>
          <section className="grid gap-8 border-t py-10 md:grid-cols-2" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <div aria-labelledby="education-h">
              <SectionHeading id="education-h" index="07" label="Background" title="Education" />
              <div className="flex flex-col gap-3">
                {EDUCATION.map((entry) => (
                  <div key={entry.id} className="rounded-xl border px-5 py-4" style={cardStyle}>
                    <h3 className="text-[15px] font-semibold" style={{ color: 'rgba(255,255,255,0.88)' }}>
                      {entry.institution}
                    </h3>
                    <p className="mt-1 text-[13px]" style={{ color: 'rgba(255,255,255,0.58)' }}>
                      {entry.program}
                    </p>
                    <p className="mt-1 text-[12px]" style={{ color: 'rgba(255,255,255,0.38)' }}>
                      {entry.location} · {entry.period}
                    </p>
                    {entry.coursework && entry.coursework.length > 0 ? (
                      <div className="mt-2">
                        <p className="text-[12px] font-medium" style={{ color: 'rgba(255,255,255,0.58)' }}>
                          Coursework
                        </p>
                        <ul className="mt-1.5 flex flex-col gap-1">
                          {entry.coursework.map((course) => (
                            <li
                              key={course}
                              className="flex items-start gap-2 text-[12px] leading-[1.5]"
                              style={{ color: 'rgba(255,255,255,0.46)' }}
                            >
                              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full" style={{ background: 'rgba(255,255,255,0.28)' }} />
                              {course}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
            <div aria-labelledby="achievements-h">
              <SectionHeading id="achievements-h" index="08" label="Recognition" title="Achievements" />
              <div className="flex flex-col gap-3">
                {ACHIEVEMENTS.map((entry) => (
                  <div key={entry.id} className="rounded-xl border px-5 py-4" style={cardStyle}>
                    <h3 className="text-[14px] font-semibold" style={{ color: 'rgba(255,255,255,0.86)' }}>
                      {entry.label}
                    </h3>
                    <p className="mt-1 text-[13px] leading-[1.6]" style={{ color: 'rgba(255,255,255,0.56)' }}>
                      {entry.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </SimpleSectionReveal>

        <SimpleSectionReveal>
          <section id="contact" className="border-t py-10" style={{ borderColor: 'rgba(255,255,255,0.06)' }} aria-labelledby="contact-h">
            <SectionHeading id="contact-h" index="09" label="Contact" title="Get in touch" />
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${PROFILE.email}`}
                className="inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-[13.5px] font-medium"
                style={{ background: 'var(--os-accent)', borderColor: 'var(--os-accent)', color: '#08101f' }}
              >
                <Mail size={15} aria-hidden="true" />
                {PROFILE.email}
              </a>
              <a
                href={PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-[13.5px]"
                style={{ ...cardStyle, color: 'rgba(255,255,255,0.8)' }}
              >
                <GitBranch size={15} aria-hidden="true" />
                GitHub
              </a>
              <a
                href={PROFILE.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-[13.5px]"
                style={{ ...cardStyle, color: 'rgba(255,255,255,0.8)' }}
              >
                <Briefcase size={15} aria-hidden="true" />
                LinkedIn
              </a>
              <a
                href={PROFILE.resumeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-[13.5px]"
                style={{ ...cardStyle, color: 'rgba(255,255,255,0.8)' }}
              >
                <FileText size={15} aria-hidden="true" />
                Resume (PDF)
              </a>
            </div>
          </section>
        </SimpleSectionReveal>
      </main>

      <footer className="border-t py-6" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-2 px-6 text-center">
          <p className="text-[12px]" style={{ color: 'rgba(255,255,255,0.38)' }}>
            © {new Date().getFullYear()} James Wright · {PROFILE.email}
          </p>
          <EnterJamesOSButton className="rounded-md border px-2.5 py-1 text-[11px] font-medium">
            <span style={{ color: 'rgba(188,212,255,0.65)' }}>Interactive portfolio</span>
          </EnterJamesOSButton>
        </div>
      </footer>
    </div>
  );
}
