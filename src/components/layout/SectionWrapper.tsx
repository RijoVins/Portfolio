import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp, inView, lineReveal, stagger } from '../../lib/animations'
import { cn } from '../../lib/utils'

export function SectionWrapper({ id, children, className }: { id: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={cn('relative px-4 py-20 md:px-10 md:py-28', className)}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  )
}

/** Cinematic section heading: mono kicker, masked display title, optional subtitle. */
export function SectionHeading({ kicker, title, subtitle, className }: { kicker: string; title: string; subtitle?: string; className?: string }) {
  return (
    <motion.header variants={stagger(0.1)} {...inView} className={cn('mb-10 md:mb-14', className)}>
      <motion.p variants={fadeUp} className="kicker mb-4 flex items-center gap-3">
        <span className="h-px w-8 bg-ember" aria-hidden="true" />
        {kicker}
      </motion.p>
      <h2 className="display text-[clamp(2.6rem,7vw,5.5rem)]">
        <span className="block overflow-hidden pb-1">
          <motion.span variants={lineReveal} className="block">{title}</motion.span>
        </span>
      </h2>
      {subtitle && <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-base text-mute md:text-lg">{subtitle}</motion.p>}
    </motion.header>
  )
}
