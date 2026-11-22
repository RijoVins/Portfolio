import { motion } from 'framer-motion'
import type { Project } from '../../data/portfolio'
import { useTilt } from '../../hooks/useTilt'
import { fadeUp } from '../../lib/animations'
import { Poster } from '../art/Poster'

/** Tall "original title" poster. Whole card is a button that opens the detail modal. */
export function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const tilt = useTilt<HTMLButtonElement>(7)
  return (
    <motion.div variants={fadeUp}>
      <button
        ref={tilt}
        onClick={onOpen}
        aria-label={`${project.title} — ${project.subtitle}. Open details`}
        className="group relative block aspect-[2/3] w-full overflow-hidden rounded-xl text-left shadow-card transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-glow focus-visible:shadow-glow"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <Poster art={project.art} className="transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent" />
        {/* glare follows cursor */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: 'radial-gradient(600px circle at var(--mx,50%) var(--my,50%), rgb(255 255 255 / 0.08), transparent 40%)' }}
        />

        <div className="absolute left-4 right-4 top-4 flex items-start justify-between">
          <span className="flex items-center gap-2">
            <span className="display text-xl text-ember">RV</span>
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-bone/70">Original</span>
          </span>
          {project.status && (
            <span className="rounded-sm bg-ember px-2 py-1 font-mono text-[0.62rem] font-medium uppercase tracking-widest text-white">{project.status}</span>
          )}
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-ember-hi">Original {String(index + 1).padStart(2, '0')}</p>
          <h3 className="display mt-2 text-[clamp(2.4rem,5vw,3.6rem)] transition-transform duration-700 group-hover:-translate-y-1">{project.title}</h3>
          <p className="mt-2 text-sm text-mute">{project.subtitle}</p>
          <div className="mt-4 flex flex-wrap gap-1.5 transition-all duration-500 [@media(hover:hover)]:translate-y-3 [@media(hover:hover)]:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
            {project.stack.slice(0, 4).map((s) => (
              <span key={s} className="chip bg-void/60">{s}</span>
            ))}
          </div>
        </div>
      </button>
    </motion.div>
  )
}
