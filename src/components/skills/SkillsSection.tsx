import { motion } from 'framer-motion'
import { Brain, Code2, Database, LayoutTemplate, Server, Wrench } from 'lucide-react'
import { skills, type SkillGenre } from '../../data/portfolio'
import { useTilt } from '../../hooks/useTilt'
import { fadeUp, inView, stagger } from '../../lib/animations'
import { SectionHeading, SectionWrapper } from '../layout/SectionWrapper'

const ICONS = { code: Code2, layout: LayoutTemplate, server: Server, database: Database, brain: Brain, wrench: Wrench }

/** Skills as "genres" — no fake percentages, just the tools and where they were used. */
export function SkillsSection() {
  return (
    <SectionWrapper id="skills">
      <SectionHeading kicker="Browse by genre" title="Technical Skills" subtitle="Grouped by genre, with where each one has shown up in my work." />
      <motion.ul variants={stagger(0.07)} {...inView} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((g, i) => (
          <motion.li key={g.id} variants={fadeUp}>
            <Genre genre={g} index={i} />
          </motion.li>
        ))}
      </motion.ul>
    </SectionWrapper>
  )
}

function Genre({ genre, index }: { genre: SkillGenre; index: number }) {
  const Icon = ICONS[genre.icon]
  const tilt = useTilt<HTMLDivElement>(4)
  return (
    <div
      ref={tilt}
      className="group relative h-full overflow-hidden rounded-xl bg-coal p-6 shadow-card transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-glow md:p-7"
    >
      <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-ember-hi to-transparent transition-transform duration-700 group-hover:scale-x-100" aria-hidden="true" />
      <span className="display pointer-events-none absolute -bottom-6 -right-1 text-[6rem] text-white/[0.025]" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-lg bg-white/[0.04] text-ember-hi ring-1 ring-white/[0.06] transition-all duration-500 group-hover:bg-ember group-hover:text-white">
          <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
        </span>
        <h3 className="display text-[1.7rem]">{genre.genre}</h3>
      </div>
      <ul className="mt-5 flex flex-wrap gap-x-1.5 gap-y-2" aria-label={`${genre.genre} skills`}>
        {genre.items.map((s) => (
          <li key={s} className="rounded-md bg-white/[0.045] px-2.5 py-1 text-sm text-bone/90 transition-colors hover:bg-white/10">{s}</li>
        ))}
      </ul>
      {genre.seenIn && (
        <p className="mt-5 border-t border-white/[0.06] pt-4 text-xs text-dim">
          <span className="font-mono uppercase tracking-wider text-mute">Seen in · </span>
          {genre.seenIn}
        </p>
      )}
    </div>
  )
}
