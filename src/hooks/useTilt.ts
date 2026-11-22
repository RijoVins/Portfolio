import { useEffect, useRef } from 'react'
import { isFinePointer, prefersReducedMotion } from '../lib/utils'

/** Subtle 3D tilt on desktop pointers. Writes styles directly — no React re-renders. */
export function useTilt<T extends HTMLElement>(max = 8) {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !isFinePointer() || prefersReducedMotion()) return
    let frame = 0
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5
      const y = (e.clientY - r.top) / r.height - 0.5
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        el.style.transform = `perspective(900px) rotateX(${-y * max}deg) rotateY(${x * max}deg) translateZ(0)`
        el.style.setProperty('--mx', `${(x + 0.5) * 100}%`)
        el.style.setProperty('--my', `${(y + 0.5) * 100}%`)
      })
    }
    const leave = () => {
      cancelAnimationFrame(frame)
      el.style.transform = ''
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [max])
  return ref
}

/** Magnetic pull towards the cursor for primary buttons. */
export function useMagnetic<T extends HTMLElement>(strength = 0.25) {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !isFinePointer() || prefersReducedMotion()) return
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * strength}px, ${(e.clientY - r.top - r.height / 2) * strength}px)`
    }
    const leave = () => (el.style.transform = '')
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [strength])
  return ref
}
