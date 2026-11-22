import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from './utils'

gsap.registerPlugin(ScrollTrigger)

let lenis: Lenis | null = null

/** Starts Lenis smooth scrolling (skipped for reduced motion) and wires it to ScrollTrigger. */
export function initSmoothScroll() {
  if (lenis || prefersReducedMotion()) return () => {}
  lenis = new Lenis({ duration: 1.1, smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  const tick = (time: number) => lenis?.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  return () => {
    gsap.ticker.remove(tick)
    lenis?.destroy()
    lenis = null
  }
}

export function scrollToId(id: string) {
  const el = id === 'home' ? document.body : document.getElementById(id)
  if (!el) return
  if (lenis) lenis.scrollTo(id === 'home' ? 0 : el, { duration: 1.4 })
  else if (id === 'home') window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  else el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}

/** Pause page scroll while a modal/menu is open. */
export function lockScroll(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop()
    else lenis.start()
  }
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}

export { gsap, ScrollTrigger }
