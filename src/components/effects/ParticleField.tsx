import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../../lib/utils'

/**
 * Lightweight ambient particles (2D canvas). Pauses when off-screen or tab hidden,
 * scales density to screen size, renders a single static frame for reduced motion.
 */
export function ParticleField({ className = '', density = 1 }: { className?: string; density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduced = prefersReducedMotion()
    let w = 0, h = 0, raf = 0, visible = true
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    type P = { x: number; y: number; r: number; vx: number; vy: number; a: number; red: boolean }
    let ps: P[] = []

    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round(Math.min(90, (w * h) / 16000) * density)
      ps = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.3,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -Math.random() * 0.25 - 0.05,
        a: Math.random() * 0.5 + 0.15,
        red: Math.random() < 0.18,
      }))
      draw()
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of ps) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.red ? `rgba(229,56,59,${p.a})` : `rgba(243,241,238,${p.a * 0.7})`
        ctx.fill()
      }
    }

    const step = () => {
      for (const p of ps) {
        p.x += p.vx
        p.y += p.vy
        if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w }
        if (p.x < -5) p.x = w + 5
        if (p.x > w + 5) p.x = -5
      }
      draw()
      raf = requestAnimationFrame(step)
    }

    const start = () => { if (!reduced && visible && !document.hidden && !raf) raf = requestAnimationFrame(step) }
    const stop = () => { cancelAnimationFrame(raf); raf = 0 }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible) start()
      else stop()
    })
    io.observe(canvas)
    const onVis = () => (document.hidden ? stop() : start())
    document.addEventListener('visibilitychange', onVis)
    resize()
    start()
    return () => { stop(); ro.disconnect(); io.disconnect(); document.removeEventListener('visibilitychange', onVis) }
  }, [density])

  return <canvas ref={ref} className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} aria-hidden="true" />
}
