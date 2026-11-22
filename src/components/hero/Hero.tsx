import { motion } from 'framer-motion'
import { Download, Play } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useApp } from '../../context'
import { profile, projects, seasons, about, viewerProfiles } from '../../data/portfolio'
import { useMagnetic } from '../../hooks/useTilt'
import { ease } from '../../lib/animations'
import { gsap } from '../../lib/scroll'
import { ParticleField } from '../effects/ParticleField'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'

/** Positions in % of the hero (desktop). Kept clear of the head and the left text column. */
const TECH_POS = [
  'left-[56%] top-[13%]',
  'right-[5%] top-[12%]',
  'right-[3%] top-[33%]',
  'right-[2%] top-[52%]',
  'right-[4%] bottom-[24%]',
  'right-[3%] bottom-[9%]',
]

export function Hero() {
  const { go, profile: viewer, switchProfile } = useApp()
  const root = useRef<HTMLElement>(null)
  const primary = useMagnetic<HTMLButtonElement>(0.2)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true }
        gsap.to('[data-hero-portrait]', { yPercent: 8, ease: 'none', scrollTrigger: st })
        gsap.to('[data-hero-copy]', { yPercent: -18, opacity: 0.15, ease: 'none', scrollTrigger: st })
        gsap.to('[data-hero-tech]', { yPercent: -60, ease: 'none', scrollTrigger: st })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const viewerName = viewerProfiles.find((p) => p.id === viewer)?.name
  const container = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } } }
  const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } } }

  return (
    <section ref={root} id="top" aria-label="Introduction" className="relative isolate flex min-h-[100svh] items-end overflow-hidden pb-14 pt-[50svh] md:pt-[56svh] lg:items-center lg:pb-0 lg:pt-24">
      {/* Atmosphere — stays dark; light only where the subject stands */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_90%_45%_at_50%_28%,rgb(193_18_31/0.16),transparent_70%)] lg:bg-[radial-gradient(ellipse_45%_65%_at_74%_42%,rgb(193_18_31/0.20),transparent_70%)]" aria-hidden="true" />
      <ParticleField className="-z-20" />
      <div className="pointer-events-none absolute inset-0 -z-20" aria-hidden="true">
        <span className="streak left-0 top-[30%]" />
        <span className="streak left-0 top-[68%]" style={{ animationDelay: '3.5s', width: '25%' }} />
      </div>

      {/* Portrait — transparent cutout, no frame. Layers: parallax (GSAP) → anchor (CSS size/position) → entrance (Framer) → drift (CSS). */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[58svh] md:h-[64svh] lg:inset-y-0 lg:h-auto">
        <div data-hero-portrait className="absolute inset-0 flex items-end justify-center lg:block">
          <div className="portrait-anchor">
            {/* backlight: charcoal separation + slow ember glow, both centred on head & shoulders */}
            <div className="absolute left-1/2 top-[34%] aspect-square w-[118%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(42_42_49/0.55),transparent_62%)]" aria-hidden="true" />
            <div className="portrait-glow absolute left-1/2 top-[28%] aspect-square w-[82%] rounded-full bg-[radial-gradient(circle,rgb(193_18_31/0.40),transparent_64%)] blur-2xl" aria-hidden="true" />

            <motion.div
              className="relative h-full"
              initial={{ opacity: 0, y: 70, scale: 1.04 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.8, ease, delay: 0.1 }}
            >
              <picture className="portrait-fade portrait-drift block h-full">
                <img
                  src={profile.portrait}
                  srcSet="/images/portrait-sm.webp 640w, /images/portrait.webp 1206w"
                  sizes="(max-width: 767px) 120vw, (max-width: 1023px) 70vw, 75vw"
                  alt={`Portrait of ${profile.name}`}
                  width={1206}
                  height={1305}
                  fetchPriority="high"
                  decoding="async"
                  className="portrait-rim block h-full w-auto max-w-none select-none"
                  draggable={false}
                />
              </picture>
            </motion.div>
          </div>
        </div>

        {/* Floating tech labels — placed around, never on, the face (desktop only) */}
        <ul data-hero-tech className="absolute inset-0 hidden lg:block" aria-label="Technologies">
          {profile.heroTech.map((t, i) => (
            <motion.li
              key={t}
              className={`absolute ${TECH_POS[i]}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.12, duration: 0.8, ease }}
            >
              <span className="glass float inline-block rounded-full px-3.5 py-1.5 font-mono text-[0.7rem] tracking-wider text-bone/85" style={{ animationDelay: `${i * -1.1}s` }}>
                {t}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Blend: soft vignette + floor fade into the next section; left shade keeps text contrast */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_120%_90%_at_60%_40%,transparent_55%,rgb(5_5_6/0.7))]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[30%] bg-gradient-to-t from-void via-void/70 to-transparent lg:h-[22%]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 left-0 -z-10 hidden w-[55%] bg-gradient-to-r from-void/80 via-void/40 to-transparent lg:block" aria-hidden="true" />

      {/* Copy */}
      <motion.div data-hero-copy className="relative mx-auto w-full max-w-7xl px-4 md:px-10" variants={container} initial="hidden" animate="show">
        <div className="max-w-2xl">
          <motion.p variants={item} className="mb-5 flex items-center gap-3">
            <span className="display text-2xl text-ember">RV</span>
            <span className="kicker text-bone/80">The Developer Series</span>
          </motion.p>

          <h1 className="display text-[clamp(4.2rem,13vw,10.5rem)]">
            <span className="block overflow-hidden">
              <motion.span className="block" variants={{ hidden: { y: '105%' }, show: { y: '0%', transition: { duration: 1.1, ease } } }}>
                {profile.name}
              </motion.span>
            </span>
          </h1>

          <motion.div variants={item} className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 font-display text-lg font-bold uppercase tracking-[0.18em] text-bone/90 md:text-2xl">
            {profile.roles.map((r, i) => (
              <span key={r} className="flex items-center gap-4">
                {i > 0 && <span className="h-1.5 w-1.5 rotate-45 bg-ember" aria-hidden="true" />}
                {r}
              </span>
            ))}
          </motion.div>

          <motion.ul variants={item} className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-mute" aria-label="At a glance">
            <li className="font-semibold text-ember-hi">B.Tech AI &amp; DS</li>
            <li className="text-dim" aria-hidden="true">·</li>
            <li>{about.education.period}</li>
            <li className="text-dim" aria-hidden="true">·</li>
            <li>{seasons.length} internships</li>
            <li className="text-dim" aria-hidden="true">·</li>
            <li>{projects.length} originals</li>
          </motion.ul>

          <motion.p variants={item} className="mt-6 text-xl font-semibold text-bone md:text-2xl">
            &ldquo;{profile.tagline}&rdquo;
          </motion.p>
          <motion.p variants={item} className="mt-3 max-w-xl text-base leading-relaxed text-mute md:text-lg">
            {profile.intro}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3 lg:w-[46rem]">
            <button ref={primary} onClick={() => go('projects')} className="btn btn-primary">
              <Play className="h-4 w-4 fill-current" aria-hidden="true" /> Explore My Projects
            </button>
            <a href={profile.resume} download={profile.resumeFileName} className="btn btn-ghost">
              <Download className="h-4 w-4" aria-hidden="true" /> Download Resume
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn-ghost px-4" aria-label="GitHub (opens in new tab)">
              <GithubIcon /> <span className="hidden sm:inline">GitHub</span>
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn btn-ghost px-4" aria-label="LinkedIn (opens in new tab)">
              <LinkedinIcon /> <span className="hidden sm:inline">LinkedIn</span>
            </a>
          </motion.div>

          {viewerName && (
            <motion.p variants={item} className="mt-6 text-xs text-dim">
              Viewing as <span className="font-semibold text-mute">{viewerName}</span> — episodes reordered for you.{' '}
              <button onClick={switchProfile} className="underline decoration-ember underline-offset-4 hover:text-bone">
                Switch
              </button>
            </motion.p>
          )}
        </div>
      </motion.div>
    </section>
  )
}
