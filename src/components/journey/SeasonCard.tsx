import { AnimatePresence, motion, useInView } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useId, useRef, useState } from 'react'
import type { Season } from '../../data/portfolio'
import { ease, fadeUp } from '../../lib/animations'
import { cn, hasEnded } from '../../lib/utils'
import { Poster } from '../art/Poster'

export function SeasonCard({ season, index, defaultOpen }: { season: Season; index: number; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen)
  const panelId = useId()
  const ended = hasEnded(season.endsOn)

  return (
    <motion.article variants={fadeUp} className="relative overflow-hidden rounded-2xl bg-coal shadow-card" aria-labelledby={`${panelId}-t`}>
      <div className="grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {/* Episode still */}
        <div className="relative aspect-[16/9] overflow-hidden md:aspect-auto md:min-h-80">
          <Poster art={season.art} />
          <div className="absolute inset-0 bg-gradient-to-t from-coal via-coal/30 to-transparent md:bg-gradient-to-r md:from-transparent md:via-coal/20 md:to-coal" />
          <div className="absolute left-5 top-5 flex items-center gap-2">
            <span className="rounded-sm bg-void/70 px-2 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-bone backdrop-blur">
              S{String(index + 1).padStart(2, '0')} · E01
            </span>
            <span className={cn('rounded-sm px-2 py-1 font-mono text-[0.62rem] uppercase tracking-widest', ended ? 'bg-white/10 text-mute' : 'bg-ember text-white')}>
              {ended ? 'Season complete' : 'Now airing'}
            </span>
          </div>
          <span className="display absolute bottom-2 left-4 text-[7rem] leading-none text-white/[0.07] md:text-[9rem]" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Details */}
        <div className="p-6 md:p-9">
          <p className="kicker text-ember-hi">
            {season.season} — {season.seasonTitle}
          </p>
          <h3 id={`${panelId}-t`} className="display mt-3 text-[clamp(2.2rem,5vw,3.6rem)]">
            &ldquo;{season.episode}&rdquo;
          </h3>
          <p className="mt-3 text-lg font-semibold text-bone">{season.role}</p>
          <p className="text-mute">
            {season.company} <span className="text-dim">·</span> <span className="whitespace-nowrap">{season.period}</span>
          </p>
          <p className="mt-4 max-w-xl italic text-mute">{season.logline}</p>

          {season.metrics && (
            <div className="mt-6 flex flex-wrap gap-6">
              {season.metrics.map((m) => (
                <Metric key={m.label} {...m} />
              ))}
            </div>
          )}

          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls={panelId}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-bone hover:text-ember-hi"
          >
            {open ? 'Hide episode details' : 'Episode details'}
            <ChevronDown className={cn('h-4 w-4 transition-transform duration-300', open && 'rotate-180')} aria-hidden="true" />
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                id={panelId}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1, transition: { duration: 0.5, ease } }}
                exit={{ height: 0, opacity: 0, transition: { duration: 0.3 } }}
                className="overflow-hidden"
              >
                <ul className="mt-5 space-y-2.5 border-t border-white/[0.06] pt-5">
                  {season.work.map((w) => (
                    <li key={w} className="flex gap-3 text-mute">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-ember" aria-hidden="true" />
                      {w}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {season.stack.map((s) => (
                    <span key={s} className="chip">{s}</span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  )
}

/** Ring gauge that fills once when scrolled into view. */
function Metric({ value, max, display, label, note }: { value: number; max: number; display: string; label: string; note: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const seen = useInView(ref, { once: true, margin: '-10% 0px' })
  const r = 34
  const c = 2 * Math.PI * r
  return (
    <div ref={ref} className="flex items-center gap-4">
      <div className="relative h-20 w-20">
        <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90" aria-hidden="true">
          <circle cx="40" cy="40" r={r} fill="none" stroke="rgb(255 255 255 / 0.08)" strokeWidth="5" />
          <motion.circle
            cx="40"
            cy="40"
            r={r}
            fill="none"
            stroke="#e5383b"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            animate={{ strokeDashoffset: seen ? c * (1 - value / max) : c }}
            transition={{ duration: 1.6, ease }}
            style={{ filter: 'drop-shadow(0 0 6px rgb(229 56 59 / 0.6))' }}
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center font-display text-xl font-extrabold">{display}</span>
      </div>
      <div>
        <p className="font-semibold text-bone">{label}</p>
        <p className="font-mono text-[0.62rem] uppercase tracking-wider text-dim">{note}</p>
      </div>
    </div>
  )
}
