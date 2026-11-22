import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect, useRef, type ReactNode } from 'react'
import { ease } from '../../lib/animations'
import { lockScroll } from '../../lib/scroll'
import { cn } from '../../lib/utils'

const FOCUSABLE = 'a[href],button:not([disabled]),iframe,[tabindex]:not([tabindex="-1"])'

/** Accessible modal shell: focus trap, Esc to close, focus restore, scroll lock. Wrap in <AnimatePresence>. */
export function Modal({ label, onClose, children, className }: { label: string; onClose: () => void; children: ReactNode; className?: string }) {
  const panel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    lockScroll(true)
    panel.current?.focus({ preventScroll: true })
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key !== 'Tab' || !panel.current) return
      const els = [...panel.current.querySelectorAll<HTMLElement>(FOCUSABLE)]
      if (!els.length) return
      const first = els[0]
      const last = els[els.length - 1]
      if (e.shiftKey && (document.activeElement === first || document.activeElement === panel.current)) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      lockScroll(false)
      prev?.focus({ preventScroll: true })
    }
  }, [onClose])

  return (
    <motion.div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-void/80 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <motion.div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        data-lenis-prevent
        className={cn(
          'relative max-h-[92svh] w-full overflow-y-auto overscroll-contain rounded-t-2xl bg-coal shadow-card outline-none sm:max-w-4xl sm:rounded-2xl',
          className,
        )}
        initial={{ y: 60, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1, transition: { duration: 0.55, ease } }}
        exit={{ y: 40, opacity: 0, scale: 0.98, transition: { duration: 0.3 } }}
      >
        <div className="sticky top-0 z-10 h-0">
          <button
            onClick={onClose}
            className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full bg-void/70 text-bone backdrop-blur hover:bg-void"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </motion.div>
    </motion.div>
  )
}
