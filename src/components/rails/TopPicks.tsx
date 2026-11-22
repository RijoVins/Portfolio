import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useApp } from '../../context'
import { topPicks } from '../../data/portfolio'
import { fadeUp, inView, stagger } from '../../lib/animations'
import { Poster } from '../art/Poster'
import { SectionHeading, SectionWrapper } from '../layout/SectionWrapper'
import { RailControls } from './RailControls'

/** Top Picks — numbers are decorative episode labels, not rankings. */
export function TopPicks() {
  const { go } = useApp()
  const rail = useRef<HTMLOListElement>(null)
  return (
    <SectionWrapper id="toppicks" className="overflow-hidden">
      <div className="flex items-end justify-between gap-6">
        <SectionHeading kicker="Top picks" title="Top Picks — My Work" subtitle="A hand-picked lineup. The numbers are just labels, not rankings." className="!mb-2" />
        <div className="mb-12"><RailControls rail={rail} label="Top picks" /></div>
      </div>
      <motion.ol ref={rail} variants={stagger(0.08)} {...inView} className="rail !gap-2" aria-label="Top picks">
        {topPicks.map((p, i) => (
          <motion.li key={p.id} variants={fadeUp} className="w-[250px] sm:w-[340px]">
            <button onClick={() => go(p.target)} className="group flex w-full items-end text-left" aria-label={`${p.title} — ${p.caption}`}>
              <span
                className="display -mr-4 select-none text-[9rem] leading-[0.75] text-transparent transition-colors duration-500 [-webkit-text-stroke:2px_rgb(255_255_255/0.22)] group-hover:[-webkit-text-stroke:2px_#e5383b] sm:text-[13rem]"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <span className="relative z-10 block aspect-[2/3] w-36 shrink-0 overflow-hidden rounded-md shadow-card ring-1 ring-white/5 transition-transform duration-500 group-hover:-translate-y-2 group-hover:ring-white/25 sm:w-44">
                <Poster art={p.art} className="transition-transform duration-[1.2s] group-hover:scale-110" />
                <span className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent" />
                <span className="absolute inset-x-3 bottom-3">
                  <span className="display block text-xl leading-none">{p.title}</span>
                  <span className="mt-1 block font-mono text-[0.6rem] uppercase tracking-wider text-mute">{p.caption}</span>
                </span>
              </span>
            </button>
          </motion.li>
        ))}
      </motion.ol>
    </SectionWrapper>
  )
}
