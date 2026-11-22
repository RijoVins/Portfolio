import { motion } from 'framer-motion'
import { GraduationCap, Target } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { about } from '../../data/portfolio'
import { fadeUp, inView, stagger } from '../../lib/animations'
import { gsap } from '../../lib/scroll'
import { degreeYear } from '../../lib/utils'
import { SectionHeading, SectionWrapper } from '../layout/SectionWrapper'

/** About — "The Pilot". Narration brightens word by word as you scroll. */
export function Pilot() {
  const story = useRef<HTMLDivElement>(null)
  const edu = about.education
  const yr = degreeYear(edu.startYear, edu.endYear)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '[data-word]',
          { opacity: 0.18 },
          { opacity: 1, stagger: 0.05, ease: 'none', scrollTrigger: { trigger: story.current, start: 'top 75%', end: 'bottom 55%', scrub: true } },
        )
      })
    }, story)
    return () => ctx.revert()
  }, [])

  return (
    <SectionWrapper id="about">
      <SectionHeading kicker="Episode 01 · The Pilot" title={about.title} />

      <div className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
        <div ref={story} className="space-y-6 text-xl leading-relaxed md:text-2xl md:leading-relaxed">
          {about.paragraphs.map((p, i) => (
            <p key={i} className={i === 0 ? 'font-semibold text-bone' : 'text-bone/90'}>
              {p.split(' ').map((w, j) => (
                <span key={j} data-word>
                  {w}{' '}
                </span>
              ))}
            </p>
          ))}
        </div>

        <motion.div variants={stagger(0.12)} {...inView} className="space-y-5">
          <motion.div variants={fadeUp} className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blood/60 via-coal to-coal p-6 shadow-card md:p-7">
            <GraduationCap className="absolute -right-4 -top-4 h-28 w-28 text-white/[0.04]" aria-hidden="true" />
            <p className="kicker text-[0.65rem]">Education</p>
            <h3 className="mt-3 text-xl font-bold leading-snug">{edu.degree}</h3>
            <p className="mt-1 text-mute">{edu.school}, {edu.location}</p>
            <div className="mt-5 flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-xs text-dim">{edu.period}</p>
                <div className="mt-2 flex gap-1" role="img" aria-label={yr.done ? 'Degree complete' : `Year ${yr.current} of ${yr.total}`}>
                  {Array.from({ length: yr.total }, (_, i) => (
                    <span key={i} className={`h-1 w-8 rounded-full ${yr.done || i < yr.current ? 'bg-ember-hi' : 'bg-white/10'}`} />
                  ))}
                </div>
                <p className="mt-1.5 font-mono text-[0.62rem] uppercase tracking-wider text-dim">{yr.done ? 'Complete' : `Year ${yr.current} of ${yr.total}`}</p>
              </div>
              <div className="text-right">
                <p className="display text-5xl text-bone">{edu.cgpa}</p>
                <p className="font-mono text-[0.62rem] uppercase tracking-wider text-dim">CGPA</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="rounded-2xl bg-coal p-6 shadow-card md:p-7">
            <p className="kicker text-[0.65rem]">Interests</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {about.interests.map((x) => (
                <li key={x} className="rounded-full border border-white/10 px-3.5 py-1.5 text-sm text-bone/85">{x}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp} className="flex gap-4 rounded-2xl bg-coal p-6 shadow-card md:p-7">
            <Target className="mt-1 h-5 w-5 shrink-0 text-ember-hi" aria-hidden="true" />
            <div>
              <p className="kicker text-[0.65rem]">Career goal</p>
              <p className="mt-2 text-mute">{about.goals}</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Story beats */}
      <motion.ol variants={stagger(0.12)} {...inView} className="relative mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0" aria-label="Technical journey">
        <span className="absolute left-0 right-0 top-[7px] hidden h-px bg-gradient-to-r from-ember via-white/15 to-transparent lg:block" aria-hidden="true" />
        {about.beats.map((b) => (
          <motion.li key={b.title} variants={fadeUp} className="relative border-l border-white/10 pl-5 lg:border-l-0 lg:pl-0 lg:pr-8">
            <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rotate-45 bg-ember lg:static lg:mb-5 lg:block" aria-hidden="true" />
            <p className="font-mono text-xs text-ember-hi">{b.year}</p>
            <p className="mt-1 font-bold text-bone">{b.title}</p>
            <p className="mt-1 text-sm text-mute">{b.text}</p>
          </motion.li>
        ))}
      </motion.ol>
    </SectionWrapper>
  )
}
