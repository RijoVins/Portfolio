import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { RefObject } from 'react'

/** Prev/next buttons for horizontal rails (desktop). Touch users swipe. */
export function RailControls({ rail, label }: { rail: RefObject<HTMLElement | null>; label: string }) {
  const by = (dir: 1 | -1) => rail.current?.scrollBy({ left: dir * rail.current.clientWidth * 0.8, behavior: 'smooth' })
  return (
    <div className="hidden gap-2 md:flex">
      <button onClick={() => by(-1)} className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-mute transition-colors hover:border-white/30 hover:text-bone" aria-label={`Scroll ${label} left`}>
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button onClick={() => by(1)} className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-mute transition-colors hover:border-white/30 hover:text-bone" aria-label={`Scroll ${label} right`}>
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  )
}
