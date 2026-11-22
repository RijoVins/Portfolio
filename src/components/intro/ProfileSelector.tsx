import { motion } from 'framer-motion'
import { ArrowRight, Briefcase, Code2, Compass } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { viewerProfiles, type ProfileId } from '../../data/portfolio'
import { ease } from '../../lib/animations'

const ICONS = { recruiter: Briefcase, developer: Code2, explorer: Compass }
const TINTS = {
  recruiter: 'from-[#5c0a12] via-[#2a070c] to-coal',
  developer: 'from-[#2a2a31] via-[#16161a] to-coal',
  explorer: 'from-[#8e1520] via-[#3a0a10] to-coal',
}

/** "Who's watching?" — profiles reorder the page; nothing is hidden. */
export function ProfileSelector({ onSelect }: { onSelect: (p: ProfileId) => void }) {
  const dialogRef = useRef<HTMLDivElement>(null)
  useEffect(() => dialogRef.current?.focus({ preventScroll: true }), [])

  return (
    <motion.div
      ref={dialogRef}
      tabIndex={-1}
      className="fixed inset-0 z-[70] outline-none flex flex-col items-center justify-center overflow-y-auto bg-void px-4 py-16"
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.6 } }}
      exit={{ opacity: 0, scale: 1.03, transition: { duration: 0.6, ease } }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgb(193_18_31/0.18),transparent)]" aria-hidden="true" />
      <motion.p className="kicker mb-3" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }}>
        The Developer Series
      </motion.p>
      <motion.h2
        id="profile-title"
        className="display mb-3 text-center text-[clamp(2.4rem,7vw,4.5rem)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.25, duration: 0.8, ease } }}
      >
        Who&rsquo;s watching?
      </motion.h2>
      <motion.p className="mb-10 max-w-md text-center text-mute" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.4 } }}>
        Pick a profile to put the most relevant episodes first. Everything stays available.
      </motion.p>

      <div className="grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
        {viewerProfiles.map((p, i) => {
          const Icon = ICONS[p.id]
          return (
            <motion.button
              key={p.id}
              onClick={() => onSelect(p.id)}
              className="group flex items-center gap-4 rounded-xl p-3 text-left transition-colors hover:bg-white/[0.04] sm:flex-col sm:p-4 sm:text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.45 + i * 0.1, duration: 0.8, ease } }}
            >
              <span
                className={`relative grid aspect-square w-20 shrink-0 place-items-center overflow-hidden rounded-lg bg-gradient-to-br ${TINTS[p.id]} shadow-card ring-2 ring-transparent transition-all duration-300 group-hover:ring-bone group-focus-visible:ring-bone sm:w-full sm:max-w-[200px]`}
              >
                <Icon className="h-8 w-8 text-bone/90 transition-transform duration-500 group-hover:scale-110 sm:h-14 sm:w-14" strokeWidth={1.4} aria-hidden="true" />
                <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-ember transition-transform duration-500 group-hover:scale-x-100" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-display text-2xl font-extrabold uppercase tracking-wide text-mute transition-colors group-hover:text-bone sm:mt-2">{p.name}</span>
                <span className="mt-1 block text-sm text-dim">{p.blurb}</span>
              </span>
            </motion.button>
          )
        })}
      </div>

      <motion.button
        onClick={() => onSelect('all')}
        className="mt-12 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-mute transition-colors hover:text-bone"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.9 } }}
      >
        Skip — browse everything <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </motion.button>
    </motion.div>
  )
}
