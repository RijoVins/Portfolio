import { ExternalLink } from 'lucide-react'
import type { Project } from '../../data/portfolio'
import { Poster } from '../art/Poster'
import { GithubIcon } from '../ui/BrandIcons'
import { Modal } from '../ui/Modal'

export function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <Modal label={`${project.title} details`} onClose={onClose}>
      <div className="relative aspect-[16/9] max-h-[48svh] w-full overflow-hidden sm:aspect-[21/9]">
        <Poster art={project.art} />
        <div className="absolute inset-0 bg-gradient-to-t from-coal via-coal/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
          <p className="flex items-center gap-2">
            <span className="display text-xl text-ember">RV</span>
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-bone/70">Original</span>
            {project.status && <span className="ml-2 rounded-sm bg-ember px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest text-white">{project.status}</span>}
          </p>
          <h2 className="display mt-2 text-[clamp(2.4rem,7vw,4.5rem)]">{project.title}</h2>
          <p className="mt-1 text-mute">{project.subtitle}</p>
        </div>
      </div>

      <div className="grid gap-8 p-5 md:grid-cols-[1.6fr_1fr] md:p-8">
        <div className="space-y-7">
          <div className="flex flex-wrap gap-3">
            <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-primary">
              <GithubIcon /> View on GitHub
            </a>
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noreferrer" className="btn btn-ghost">
                <ExternalLink className="h-4 w-4" aria-hidden="true" /> Live demo
              </a>
            )}
          </div>
          <p className="text-lg leading-relaxed text-bone/90">{project.description}</p>
          <Block title="The problem">
            <p className="leading-relaxed text-mute">{project.problem}</p>
          </Block>
          <Block title="What I worked on">
            <ul className="space-y-2.5">
              {project.contribution.map((c) => (
                <li key={c} className="flex gap-3 text-mute">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-ember" aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>
          </Block>
        </div>

        <aside className="space-y-7 md:border-l md:border-white/[0.06] md:pl-8">
          <Block title={project.featuresLabel}>
            <ul className="space-y-2 text-sm text-mute">
              {project.features.map((f) => (
                <li key={f} className="flex items-center gap-2.5">
                  <span className="h-px w-3 bg-ember-hi" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
          </Block>
          <Block title="Stack">
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <span key={s} className="chip">{s}</span>
              ))}
            </div>
          </Block>
          <Block title="Repository">
            <a href={project.github} target="_blank" rel="noreferrer" className="break-all font-mono text-xs text-mute underline decoration-white/20 underline-offset-4 hover:text-bone">
              {project.github.replace('https://', '')}
            </a>
          </Block>
        </aside>
      </div>
    </Modal>
  )
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="kicker mb-3 text-[0.65rem]">{title}</h3>
      {children}
    </div>
  )
}
