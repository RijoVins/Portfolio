import type { Variants, Transition } from 'framer-motion'

export const ease = [0.22, 1, 0.36, 1] as const
export const cine: Transition = { duration: 0.9, ease }

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: cine },
}

export const stagger = (step = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: step, delayChildren: delay } },
})

/** Line-by-line mask reveal for headings. */
export const lineReveal: Variants = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 1, ease } },
}

export const inView = { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '-12% 0px' } } as const
