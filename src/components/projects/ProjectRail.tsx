import { motion } from 'framer-motion'
import { ArrowUpRight, Plus } from 'lucide-react'
import { useApp } from '../../context'
import { projects } from '../../data/portfolio'
import { fadeUp, inView, stagger } from '../../lib/animations'
import { SectionHeading, SectionWrapper } from '../layout/SectionWrapper'
import { ProjectCard } from './ProjectCard'

/** "Originals" — projects presented as original series posters. */
export function ProjectRail() {
  const { openProject, go } = useApp()
  return (
    <SectionWrapper id="projects">
      <SectionHeading kicker="Originals" title="Original Productions" subtitle="Projects written, built and still being built. Select a title for the full story." />
      <motion.div variants={stagger(0.12)} {...inView} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} onOpen={() => openProject(p.id)} />
        ))}
        <motion.div variants={fadeUp} className="sm:col-span-2 lg:col-span-1">
          <button
            onClick={() => go('contact')}
            className="group relative flex h-full min-h-56 w-full flex-col justify-between overflow-hidden rounded-xl border border-dashed border-white/15 p-6 text-left transition-colors hover:border-ember/60 lg:aspect-[2/3]"
          >
            <Plus className="h-8 w-8 text-dim transition-transform duration-500 group-hover:rotate-90 group-hover:text-ember" aria-hidden="true" />
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-dim">Next original</p>
              <p className="display mt-2 text-4xl text-mute transition-colors group-hover:text-bone">In development</p>
              <p className="mt-3 flex items-center gap-1 text-sm text-dim group-hover:text-mute">
                Have an idea worth building? Let&rsquo;s talk <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </p>
            </div>
          </button>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  )
}
