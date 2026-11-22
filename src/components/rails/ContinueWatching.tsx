import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { useRef } from 'react'
import { useApp } from '../../context'
import { about, continueWatching, seasons, type RailItem } from '../../data/portfolio'
import { fadeUp, inView, stagger } from '../../lib/animations'
import { degreeYear, hasEnded } from '../../lib/utils'
import { Poster } from '../art/Poster'
import { SectionHeading, SectionWrapper } from '../layout/SectionWrapper'
import { RailControls } from './RailControls'

export function ContinueWatching() {
  const rail = useRef<HTMLUListElement>(null)
  return (
    <SectionWrapper id="continue" className="!pb-12">
      <div className="flex items-end justify-between gap-6">
        <SectionHeading kicker="Continue watching" title="Continue Watching" subtitle="Projects, experiments and ideas currently in progress." className="!mb-2" />
        <div className="mb-12"><RailControls rail={rail} label="Continue watching" /></div>
      </div>
      <motion.ul ref={rail} variants={stagger(0.07)} {...inView} className="rail" aria-label="Continue watching">
        {continueWatching.map((item) => (
          <motion.li key={item.id} variants={fadeUp} className="w-[78vw] max-w-[340px] sm:w-[320px]">
            <WatchCard item={item} />
          </motion.li>
        ))}
      </motion.ul>
    </SectionWrapper>
  )
}

function WatchCard({ item }: { item: RailItem }) {
  const { go } = useApp()
  return (
    <button onClick={() => go(item.target)} className="group block w-full text-left">
      <div className="relative aspect-video overflow-hidden rounded-lg shadow-card ring-1 ring-white/5 transition-all duration-500 group-hover:-translate-y-1 group-hover:ring-white/25 group-focus-visible:ring-white/40">
        <Poster art={item.art} className="transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/10 to-transparent" />
        <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 scale-75 place-items-center rounded-full bg-bone/90 text-void opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100" aria-hidden="true">
          <Play className="ml-0.5 h-5 w-5 fill-current" />
        </span>
        <p className="display absolute bottom-3 left-4 right-4 text-2xl">{item.title}</p>
        <Footer item={item} />
      </div>
      <div className="mt-3 flex items-center justify-between gap-3 px-0.5">
        <p className="truncate text-sm text-mute">{item.meta}</p>
        <Status item={item} />
      </div>
    </button>
  )
}

/** Only factual progress: degree year segments. Everything else gets no bar. */
function Footer({ item }: { item: RailItem }) {
  if (item.kind !== 'degree') return null
  const yr = degreeYear(about.education.startYear, about.education.endYear)
  return (
    <div className="absolute inset-x-0 bottom-0 flex h-1 gap-px" aria-hidden="true">
      {Array.from({ length: yr.total }, (_, i) => (
        <span key={i} className={`flex-1 ${yr.done || i < yr.current ? 'bg-ember-hi' : 'bg-white/15'}`} />
      ))}
    </div>
  )
}

function Status({ item }: { item: RailItem }) {
  let text = item.status
  if (item.status === 'season') text = hasEnded(seasons[1].endsOn) ? 'Season complete' : 'Now airing'
  if (item.status === 'degree') {
    const yr = degreeYear(about.education.startYear, about.education.endYear)
    text = yr.done ? 'Complete' : `Year ${yr.current} of ${yr.total}`
  }
  return <span className="shrink-0 font-mono text-[0.6rem] uppercase tracking-wider text-ember-hi">{text}</span>
}
