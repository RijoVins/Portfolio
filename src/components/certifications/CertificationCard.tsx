import { motion } from 'framer-motion'
import { Award, ExternalLink } from 'lucide-react'
import { certifications, type Certification } from '../../data/portfolio'
import { fadeUp, inView, stagger } from '../../lib/animations'
import { SectionHeading, SectionWrapper } from '../layout/SectionWrapper'

export function Certifications() {
  return (
    <SectionWrapper id="certifications">
      <SectionHeading kicker="Credits" title="Awards & Certifications" subtitle="Courses and professional certificates completed along the way." />
      <motion.ul variants={stagger(0.07)} {...inView} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {certifications.map((c, i) => (
          <motion.li key={c.title} variants={fadeUp}>
            <CertificationCard cert={c} index={i} />
          </motion.li>
        ))}
      </motion.ul>
    </SectionWrapper>
  )
}

/** Ticket-stub style credit card. */
export function CertificationCard({ cert, index }: { cert: Certification; index: number }) {
  return (
    <article className="group relative flex h-full overflow-hidden rounded-xl bg-gradient-to-br from-smoke to-coal shadow-card transition-transform duration-500 hover:-translate-y-1">
      <div className="relative flex w-16 shrink-0 flex-col items-center justify-between border-r border-dashed border-white/10 py-5">
        <Award className="h-5 w-5 text-ember-hi" aria-hidden="true" />
        <span className="font-mono text-[0.6rem] tracking-[0.3em] text-dim [writing-mode:vertical-rl]">CERT · {String(index + 1).padStart(2, '0')}</span>
        {/* perforation notches */}
        <span className="absolute -right-2 -top-2 h-4 w-4 rounded-full bg-void" aria-hidden="true" />
        <span className="absolute -bottom-2 -right-2 h-4 w-4 rounded-full bg-void" aria-hidden="true" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ember-hi">{cert.issuer}</p>
        <h3 className="mt-2 text-lg font-bold leading-snug text-bone">{cert.title}</h3>
        {cert.credentialUrl && (
          <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm text-mute hover:text-bone">
            View credential <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        )}
      </div>
      <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_40%,rgb(255_255_255/0.06)_50%,transparent_60%)] bg-[length:250%_100%] bg-[position:100%_0] transition-[background-position] duration-1000 group-hover:bg-[position:-50%_0]" aria-hidden="true" />
    </article>
  )
}
