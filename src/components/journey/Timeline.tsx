import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { seasons } from '../../data/portfolio'
import { inView, stagger } from '../../lib/animations'
import { gsap } from '../../lib/scroll'
import { SectionHeading, SectionWrapper } from '../layout/SectionWrapper'
import { SeasonCard } from './SeasonCard'

/** Seasons & Episodes — a scroll-drawn timeline connecting each internship. */
export function Timeline() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '[data-tl-fill]',
          { scaleY: 0 },
          { scaleY: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top 70%', end: 'bottom 60%', scrub: 0.6 } },
        )
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <SectionWrapper id="journey">
      <SectionHeading kicker="My journey" title="Seasons & Episodes" subtitle="Two internships so far — one in backend engineering, one in applied AI." />
      <div ref={root} className="relative md:pl-14">
        <div className="absolute bottom-6 left-[11px] top-6 hidden w-px bg-white/10 md:block" aria-hidden="true">
          <div data-tl-fill className="h-full w-full origin-top bg-gradient-to-b from-ember-hi to-ember shadow-[0_0_12px_#e5383b]" />
        </div>
        <motion.ol variants={stagger(0.15)} {...inView} className="space-y-8">
          {seasons.map((s, i) => (
            <li key={s.id} className="relative">
              <span className="absolute -left-14 top-8 hidden h-6 w-6 place-items-center rounded-full border border-ember bg-void md:grid" aria-hidden="true">
                <span className="h-2 w-2 rounded-full bg-ember-hi" />
              </span>
              <SeasonCard season={s} index={i} defaultOpen={i === seasons.length - 1} />
            </li>
          ))}
        </motion.ol>
      </div>
    </SectionWrapper>
  )
}
