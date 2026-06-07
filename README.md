# JamesOS

JamesOS is James Wright's interactive OS-style portfolio, built for fast recruiter scanning and deeper exploration.

The site keeps the desktop metaphor that makes the portfolio memorable, but it now exposes the core signal immediately: name, positioning, proof points, resume, projects, and contact paths are visible without requiring anyone to click through the OS layer.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- lucide-react

## Key Surfaces

- `StaticSite` renders crawlable, server-side portfolio content and powers Simple View.
- `Desktop` renders the interactive JamesOS shell, windows, dock, taskbar, launcher, and mobile app panels.
- `BootScreen` is a short, skippable wake animation layered over real content.
- Metadata routes provide sitemap, robots, manifest, Open Graph, Twitter card, favicon, and JSON-LD support.

## Local Development

```bash
npm run dev
```

Open `http://localhost:3000`.

## Validation

```bash
npm run lint
npm run build
```

The build may need normal local permissions because this Next/Turbopack setup can bind a local process during CSS processing.
