# Rijo Vins — The Developer Series

A cinematic, streaming-platform-inspired portfolio. Built with React, TypeScript, Vite, Tailwind CSS v4, Framer Motion, GSAP ScrollTrigger and Lenis.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the production build
```

## Updating content

All text, links, projects, internships, skills and certifications live in **`src/data/portfolio.ts`**, so you don't need to touch any UI code.

| What | Where |
| --- | --- |
| Portrait | Transparent-background cutout: `public/images/portrait.webp` (desktop) and `public/images/portrait-sm.webp` (≤767px). Source PNG: `design/portrait-cutout-original.png`. The hero fades the bottom and side edges and adds the rim light in CSS (`.portrait-fade`, `.portrait-rim` in `src/index.css`). Desktop size and position per breakpoint are the `--x`, `--top` and `--h` values on `.portrait-anchor`. If you replace it, keep the transparent background. |
| Resume | Replace `public/resume/Rijo_Vins_Resume.pdf`, then regenerate `public/resume/resume-preview.webp` (first-page image, with the phone number masked). |
| New project | Add an entry to `projects` (set `demo` to show a Live Demo button). |
| Certificate links | Add `credentialUrl` to an entry in `certifications`. |
| Profile ordering | Edit `order` in `viewerProfiles`. |

## Structure

```
src/
├── data/portfolio.ts        ← all content
├── App.tsx                  ← intro → profile → site flow, section ordering, modals
├── components/
│   ├── intro/               OpeningSequence, ProfileSelector
│   ├── layout/              Navbar, Footer, SectionWrapper
│   ├── hero/                Hero
│   ├── rails/               ContinueWatching, TopPicks
│   ├── about/               Pilot
│   ├── journey/             Timeline, SeasonCard
│   ├── projects/            ProjectRail, ProjectCard, ProjectModal
│   ├── skills/ certifications/ resume/ contact/
│   ├── art/Poster.tsx       generated SVG poster art (no image downloads)
│   ├── effects/             ParticleField (canvas)
│   └── ui/                  Modal, Portrait, BrandIcons
├── hooks/                   useTilt / useMagnetic, useActiveSection
└── lib/                     scroll (Lenis + ScrollTrigger), animations, utils
```

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. On vercel.com, choose **Add New → Project** and import the repo. Vercel detects Vite automatically (`vercel.json` is included).
3. Click Deploy.

## Accessibility & performance notes

- Respects `prefers-reduced-motion`: the intro jumps to its final frame, smooth scrolling and scroll-scrubbed effects are off, and all content stays visible.
- Keyboard: skip link, visible focus, Esc closes modals, menus and the intro, and focus is trapped and restored in modals.
- The intro is skippable, and shown once per browser session (replay it from the footer or menu).
- Particles pause when off-screen or the tab is hidden; there's no 3D or large image payload.
