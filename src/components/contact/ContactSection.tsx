import { motion } from 'framer-motion'
import { Check, Copy, Mail } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { contact, profile } from '../../data/portfolio'
import { useMagnetic } from '../../hooks/useTilt'
import { fadeUp, inView, stagger } from '../../lib/animations'
import { gsap } from '../../lib/scroll'
import { ParticleField } from '../effects/ParticleField'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'

/** The finale: "To be continued..." tightens into frame as you scroll in. */
export function ContactSection() {
  const root = useRef<HTMLElement>(null)
  const cta = useMagnetic<HTMLAnchorElement>(0.2)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '[data-tbc]',
          { letterSpacing: '0.3em', opacity: 0.2, scale: 0.92 },
          { letterSpacing: '0.01em', opacity: 1, scale: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top 85%', end: 'top 25%', scrub: true } },
        )
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable — mailto link still works */
    }
  }

  return (
    <section ref={root} id="contact" className="relative isolate overflow-hidden px-4 pb-16 pt-28 md:px-10 md:pt-40">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_50%_100%,rgb(193_18_31/0.28),transparent_70%)]" aria-hidden="true" />
      <ParticleField className="-z-10" density={0.6} />

      <div className="mx-auto max-w-5xl text-center">
        <p className="kicker mb-6">Final episode · For now</p>
        <h2 data-tbc className="display origin-center whitespace-nowrap text-[clamp(2.6rem,11vw,9rem)]">
          {contact.title}
        </h2>
        <motion.div variants={stagger(0.1)} {...inView}>
          <motion.p variants={fadeUp} className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-mute md:text-xl">{contact.text}</motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a ref={cta} href={profile.linkedin} target="_blank" rel="noreferrer" className="btn btn-ember">
              <LinkedinIcon /> Connect on LinkedIn
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn-ghost">
              <GithubIcon /> Explore GitHub
            </a>
            <a href={`mailto:${profile.email}`} className="btn btn-ghost">
              <Mail className="h-4 w-4" aria-hidden="true" /> Email Me
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 py-1.5 pl-4 pr-1.5">
            <a href={`mailto:${profile.email}`} className="font-mono text-sm text-bone/90 hover:text-bone">{profile.email}</a>
            <button onClick={copy} className="grid h-9 w-9 place-items-center rounded-full text-mute hover:bg-white/10 hover:text-bone" aria-label={copied ? 'Email copied' : 'Copy email address'}>
              {copied ? <Check className="h-4 w-4 text-ember-hi" /> : <Copy className="h-4 w-4" />}
            </button>
            <span className="sr-only" aria-live="polite">{copied ? 'Email address copied to clipboard' : ''}</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
