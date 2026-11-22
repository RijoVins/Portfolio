import { AnimatePresence, motion } from 'framer-motion'
import { Play, SkipForward } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { intro, profile } from '../../data/portfolio'
import { ease } from '../../lib/animations'
import { isSmallScreen, prefersReducedMotion } from '../../lib/utils'
import { ParticleField } from '../effects/ParticleField'
import { Portrait } from '../ui/Portrait'

/**
 * Opening titles: black → preface → name → series title → portrait + tagline + PLAY.
 * ~5s on desktop, shorter on mobile, instant final frame for reduced motion.
 * Skippable at any time (button or Esc).
 */
export function OpeningSequence({ onDone }: { onDone: () => void }) {
  const reduced = prefersReducedMotion()
  const [step, setStep] = useState(reduced ? 3 : 0)
  const playRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (reduced) return
    const k = isSmallScreen() ? 0.7 : 1
    const marks = [500, 2600, 5000].map((t) => t * k)
    const timers = marks.map((t, i) => window.setTimeout(() => setStep(i + 1), t))
    return () => timers.forEach(clearTimeout)
  }, [reduced])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onDone()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onDone])

  useEffect(() => {
    if (step === 3) window.setTimeout(() => playRef.current?.focus({ preventScroll: true }), reduced ? 0 : 900)
  }, [step, reduced])

  const letters = intro.preface.toUpperCase().split('')

  return (
    <motion.div
      className="fixed inset-0 z-[80] overflow-hidden bg-void"
      role="dialog"
      aria-modal="true"
      aria-label="Opening titles"
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)', transition: { duration: 0.8, ease } }}
    >
      <ParticleField density={0.7} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#050506_80%)]" aria-hidden="true" />
      {!reduced && (
        <div className="pointer-events-none absolute inset-x-0 top-1/2" aria-hidden="true">
          <span className="streak left-0 top-0" style={{ animationDelay: '2.4s' }} />
        </div>
      )}

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.p
            key="preface"
            className="absolute inset-0 flex items-center justify-center px-6 text-center font-mono text-[0.7rem] tracking-[0.35em] text-mute md:text-sm md:tracking-[0.5em]"
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            <span aria-label={intro.preface}>
              {letters.map((c, i) => (
                <motion.span
                  key={i}
                  aria-hidden="true"
                  initial={{ opacity: 0, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  transition={{ delay: i * 0.025, duration: 0.6 }}
                >
                  {c}
                </motion.span>
              ))}
            </span>
          </motion.p>
        )}

        {step === 2 && (
          <motion.div
            key="title"
            className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center"
            exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.6, ease } }}
          >
            <motion.h1
              className="display text-[clamp(4.5rem,18vw,15rem)] text-bone"
              initial={{ opacity: 0, scale: 1.18, filter: 'blur(14px)', letterSpacing: '0.2em' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', letterSpacing: '0.01em' }}
              transition={{ duration: 1.4, ease }}
            >
              {profile.name}
            </motion.h1>
            <motion.span
              className="mt-3 h-[2px] w-40 origin-center bg-ember shadow-[0_0_20px_#e5383b] md:w-72"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.7, duration: 0.9, ease }}
              aria-hidden="true"
            />
            <motion.p
              className="kicker mt-5 text-bone md:text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              {intro.series}
            </motion.p>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="final"
            className="absolute inset-0 mx-auto flex max-w-6xl flex-col items-center justify-center gap-8 px-6 md:flex-row md:justify-between md:gap-16"
            initial={reduced ? false : 'hidden'}
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
          >
            <motion.div
              className="relative aspect-[1206/1305] w-48 sm:w-60 md:order-2 md:w-[min(36vw,440px)]"
              variants={{ hidden: { clipPath: 'inset(100% -40% 0 -40%)', opacity: 0, y: 30 }, show: { clipPath: 'inset(-40% -40% 0 -40%)', opacity: 1, y: 0, transition: { duration: 1.4, ease } } }}
            >
              <div className="absolute left-1/2 top-[42%] aspect-square w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(193_18_31/0.4),transparent_64%)] blur-2xl" aria-hidden="true" />
              <Portrait eager className="portrait-fade portrait-rim relative object-contain object-bottom" />
            </motion.div>

            <div className="text-center md:order-1 md:text-left">
              <motion.p variants={fade} className="kicker mb-3">{intro.series}</motion.p>
              <motion.h1 variants={fade} className="display text-[clamp(3.5rem,10vw,8rem)]">{profile.name}</motion.h1>
              <motion.p variants={fade} className="mt-4 max-w-md text-base text-mute md:text-xl">{profile.tagline}</motion.p>
              <motion.div variants={fade} className="mt-8">
                <button ref={playRef} onClick={onDone} className="btn btn-primary group h-14 px-8 text-lg">
                  <Play className="h-5 w-5 fill-current transition-transform group-hover:scale-110" aria-hidden="true" />
                  Play
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {step < 3 && (
        <button onClick={onDone} className="btn btn-ghost absolute bottom-6 right-6 min-h-10 px-4 text-sm md:bottom-10 md:right-10">
          Skip Intro <SkipForward className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </motion.div>
  )
}

const fade = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } }
