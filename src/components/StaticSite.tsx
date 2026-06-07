import { ArrowUpRight, Briefcase, FileText, GitBranch, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';

import { ACHIEVEMENTS } from '@/data/achievements';
import { EDUCATION } from '@/data/education';
import { EXPERIENCE } from '@/data/experience';
import { HERO_CTAS, POSITIONING, STATS, TAGLINE } from '@/data/highlights';
import { PROFILE } from '@/data/profile';
import { PROJECTS } from '@/data/projects';
import { RESEARCH } from '@/data/research';
import { SKILLS } from '@/data/skills';
import { getProjectProofTone, getStatusTone } from '@/lib/badges';
import type { Project } from '@/types';

import { EnterJamesOSButton } from './StaticSiteControls';

const cardStyle = {
  borderColor: 'rgba(255,255,255,0.08)',
  background: 'rgba(255,255,255,0.025)',
} as const;

function SectionHeading({ id, kicker, title }: { id: string; kicker: string; title: string }) {
  return (
    <div className="mb-6">
      <p className="text-[11px] font-medium uppercase tracking-[0.22em]" style={{ color: 'rgba(255,255,255,0.3)' }}>
        {kicker}
      </p>
      <h2 id={id} className="mt-2 text-[22px] font-semibold tracking-[-0.01em]" style={{ color: 'rgba(255,255,255,0.9)' }}>
        {title}
      </h2>
    </div>
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

function ProjectProofCard({ project }: { project: Project }) {
  const tone = getProjectProofTone(project.proofTone);
  const preview = project.media?.[0];

  return (
    <article className="project-proof-card flex flex-col overflow-hidden rounded-xl border" style={cardStyle}>
      {preview ? (
        <div className="relative aspect-[16/9] border-b" style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(8,10,14,0.72)' }}>
          <Image
            src={preview.src}
            alt={preview.alt}
            fill
            sizes="(max-width: 768px) 100vw, 520px"
            className="object-cover opacity-[0.82]"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0.28))' }} />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col px-5 py-5">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="rounded-md border px-2 py-1 text-[11px] font-semibold"
            style={{ color: tone.fg, background: tone.bg, borderColor: tone.border }}
          >
            {project.proof}
          </span>
          <span className="text-[11.5px]" style={{ color: 'rgba(255,255,255,0.36)' }}>
            {project.category}
          </span>
        </div>
        <h3 className="mt-3 text-[17px] font-semibold" style={{ color: 'rgba(255,255,255,0.93)' }}>
          {project.name}
        </h3>
        <p className="mt-2 text-[13.5px] font-medium leading-[1.65]" style={{ color: 'rgba(255,255,255,0.7)' }}>
          {project.outcome}
        </p>
        <p className="mt-2 flex-1 text-[13px] leading-[1.65]" style={{ color: 'rgba(255,255,255,0.48)' }}>
          {project.summary}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 5).map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
        {project.links.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-3 border-t pt-3" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[12.5px] font-semibold"
                style={{ color: '#c7d9ff' }}
              >
                {link.label}
                <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default function StaticSite() {
  const languages = SKILLS.find((group) => group.category === 'Languages');
  const tools = SKILLS.find((group) => group.category === 'Libraries & Tools');

  return (
    <div id="simple-site" style={{ background: 'var(--os-bg)', color: 'var(--os-text)' }}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      {/* Top bar */}
      <header
        className="sticky top-0 z-10 border-b backdrop-blur"
        style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(15,15,17,0.82)' }}
      >
        <div className="mx-auto flex h-14 max-w-[1100px] items-center justify-between px-6">
          <a href="#top" className="text-[14px] font-semibold tracking-tight" style={{ color: 'rgba(255,255,255,0.82)' }}>
            James Wright · Recruiter Brief
          </a>
          <nav className="flex items-center gap-2" aria-label="Quick links">
            <a
              href={PROFILE.resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border px-3 py-1.5 text-[12.5px]"
              style={{ ...cardStyle, color: 'rgba(255,255,255,0.74)' }}
            >
              Resume
            </a>
            <EnterJamesOSButton className="rounded-md border px-3 py-1.5 text-[12.5px] font-medium transition-colors">
              <span style={{ color: '#bcd4ff' }}>Enter JamesOS →</span>
            </EnterJamesOSButton>
          </nav>
        </div>
      </header>

      <main id="main" className="mx-auto max-w-[1100px] px-6 pb-24">
        {/* Hero */}
        <section id="top" className="pt-14 pb-10" aria-labelledby="hero-name">
          <p className="text-[12.5px] font-semibold" style={{ color: 'var(--os-accent)' }}>
            Recruiter Brief · Resume → Projects → Contact
          </p>
          <h1
            id="hero-name"
            className="mt-3 text-[44px] font-semibold leading-[1.05] tracking-[-0.02em] sm:text-[56px]"
            style={{ color: 'rgba(255,255,255,0.95)' }}
          >
            James Wright
          </h1>
          <p className="mt-4 max-w-[760px] text-[16.5px] leading-[1.6]" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {POSITIONING}
          </p>
          <p className="mt-3 max-w-[720px] text-[14.5px] leading-[1.7]" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {TAGLINE}
          </p>
          <p className="mt-4 flex items-center gap-1.5 text-[13px]" style={{ color: 'rgba(255,255,255,0.42)' }}>
            <MapPin size={14} aria-hidden="true" />
            {PROFILE.location}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            {HERO_CTAS.map((cta) => {
              const isPrimary = cta.tone === 'primary';
              const href = cta.id === 'resume' ? PROFILE.resumeHref : (cta.anchor ?? '#');
              const external = cta.id === 'resume';
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
            {STATS.map((stat) => (
              <div key={stat.id} className="rounded-xl border px-4 py-4" style={cardStyle}>
                <p className="text-[26px] font-semibold leading-none tracking-[-0.01em]" style={{ color: 'rgba(255,255,255,0.92)' }}>
                  {stat.display}
                </p>
                <p className="mt-2 text-[12px] leading-[1.5]" style={{ color: 'rgba(255,255,255,0.46)' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Dual-audience framing */}
        <section className="py-8" aria-label="What I bring">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border px-5 py-5" style={cardStyle}>
              <h3 className="text-[14px] font-semibold" style={{ color: 'rgba(255,255,255,0.86)' }}>
                For software teams
              </h3>
              <p className="mt-2 text-[13.5px] leading-[1.7]" style={{ color: 'rgba(255,255,255,0.56)' }}>
                Ships end-to-end systems — real-time voice products, data pipelines over 15M+ rows, and cyberdefense
                tooling used across 70+ universities. Breadth across Python, C++, Java, C, and TypeScript with live demos
                and public repos to back it up.
              </p>
            </div>
            <div className="rounded-xl border px-5 py-5" style={cardStyle}>
              <h3 className="text-[14px] font-semibold" style={{ color: 'rgba(255,255,255,0.86)' }}>
                For quantitative teams
              </h3>
              <p className="mt-2 text-[13.5px] leading-[1.7]" style={{ color: 'rgba(255,255,255,0.56)' }}>
                Mathematics + CS major with a 4.0 GPA, published ML research (Gaussian Mixture Models, Neural CDEs,
                RoBERTa/VADER), and a competitive edge — USCF Candidate Master, Top-100 Lichess rapid, and Virginia
                College State Champion. Measurable outcomes over hand-waving.
              </p>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="border-t py-10" style={{ borderColor: 'rgba(255,255,255,0.06)' }} aria-labelledby="about-h">
          <SectionHeading id="about-h" kicker="About" title="Overview" />
          <p className="max-w-[820px] text-[15px] leading-[1.8]" style={{ color: 'rgba(255,255,255,0.72)' }}>
            {PROFILE.aboutSummary}
          </p>
          <p className="mt-3 max-w-[820px] text-[14px] leading-[1.8]" style={{ color: 'rgba(255,255,255,0.54)' }}>
            {PROFILE.aboutSecondary}
          </p>
        </section>

        {/* Experience */}
        <section id="experience" className="border-t py-10" style={{ borderColor: 'rgba(255,255,255,0.06)' }} aria-labelledby="experience-h">
          <SectionHeading id="experience-h" kicker="Experience" title="Where I've worked" />
          <div className="flex flex-col gap-4">
            {EXPERIENCE.map((role) => (
              <article key={role.pid} className="rounded-xl border px-5 py-5" style={cardStyle}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-[16px] font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>
                    {role.role} · {role.organization}
                  </h3>
                  <span className="text-[12.5px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {role.period}
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
        </section>

        {/* Projects */}
        <section id="projects" className="border-t py-10" style={{ borderColor: 'rgba(255,255,255,0.06)' }} aria-labelledby="projects-h">
          <SectionHeading id="projects-h" kicker="Projects" title="Selected work" />
          <div className="grid gap-4 md:grid-cols-2">
            {PROJECTS.map((project) => (
              <ProjectProofCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* Research */}
        <section id="research" className="border-t py-10" style={{ borderColor: 'rgba(255,255,255,0.06)' }} aria-labelledby="research-h">
          <SectionHeading id="research-h" kicker="Research" title="Open questions I'm working on" />
          <div className="grid gap-4 md:grid-cols-2">
            {RESEARCH.map((item) => {
              const tone = getStatusTone(item.status);
              return (
                <article key={item.id} className="rounded-xl border px-5 py-5" style={cardStyle}>
                  <span
                    className="rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.04em]"
                    style={{ color: tone.fg, background: tone.bg, borderColor: tone.border }}
                  >
                    {item.status}
                  </span>
                  <h3 className="mt-3 text-[16px] font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[13px] italic leading-[1.7]" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    {item.question}
                  </p>
                  <p className="mt-2 text-[13px] leading-[1.7]" style={{ color: 'rgba(255,255,255,0.58)' }}>
                    {item.impact}
                  </p>
                  {item.links && item.links.length > 0 ? (
                    <div className="mt-3 flex flex-wrap gap-3">
                      {item.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[12.5px] font-medium"
                          style={{ color: '#bcd4ff' }}
                        >
                          {link.label}
                          <ArrowUpRight size={13} aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="border-t py-10" style={{ borderColor: 'rgba(255,255,255,0.06)' }} aria-labelledby="skills-h">
          <SectionHeading id="skills-h" kicker="Skills" title="Tools of the trade" />
          {languages ? (
            <div className="mb-5">
              <p className="mb-2 text-[12.5px] font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Languages
              </p>
              <div className="flex flex-wrap gap-2">
                {languages.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border px-2.5 py-1.5 text-[13px] font-medium"
                    style={{ borderColor: 'rgba(79,142,247,0.28)', background: 'rgba(79,142,247,0.1)', color: '#cfe0ff' }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
          {tools ? (
            <div>
              <p className="mb-2 text-[12.5px] font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Libraries &amp; Tools
              </p>
              <div className="flex flex-wrap gap-1.5">
                {tools.items.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            </div>
          ) : null}
        </section>

        {/* Education + Achievements */}
        <section className="grid gap-8 border-t py-10 md:grid-cols-2" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <div aria-labelledby="education-h">
            <SectionHeading id="education-h" kicker="Education" title="Education" />
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
                </div>
              ))}
            </div>
          </div>
          <div aria-labelledby="achievements-h">
            <SectionHeading id="achievements-h" kicker="Recognition" title="Achievements" />
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

        {/* Contact */}
        <section id="contact" className="border-t py-10" style={{ borderColor: 'rgba(255,255,255,0.06)' }} aria-labelledby="contact-h">
          <SectionHeading id="contact-h" kicker="Contact" title="Get in touch" />
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
      </main>

      <footer className="border-t py-8" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-3 px-6 text-center">
          <p className="text-[12.5px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
            © {new Date().getFullYear()} James Wright · Built as JamesOS
          </p>
          <EnterJamesOSButton className="rounded-md border px-3 py-1.5 text-[12.5px] font-medium">
            <span style={{ color: '#bcd4ff' }}>Launch the interactive experience →</span>
          </EnterJamesOSButton>
        </div>
      </footer>
    </div>
  );
}
