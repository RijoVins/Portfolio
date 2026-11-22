import { useEffect, useState } from 'react'

/** Tracks which section is in the middle of the viewport. Only updates state when it changes. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const els = ids.map((id) => (id === 'home' ? document.getElementById('top') : document.getElementById(id))).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const id = e.target.id === 'top' ? 'home' : e.target.id
            setActive((prev) => (prev === id ? prev : id))
          }
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids])
  return active
}
