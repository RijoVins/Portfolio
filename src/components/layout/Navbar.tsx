import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Menu, RotateCcw, Users, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useApp } from '../../context'
import { navItems, profile, viewerProfiles } from '../../data/portfolio'
import { useActiveSection } from '../../hooks/useActiveSection'
import { ease } from '../../lib/animations'
import { lockScroll, scrollToId } from '../../lib/scroll'
import { cn } from '../../lib/utils'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'

const ids = navItems.map((n) => n.id)

export function Navbar() {
  const { profile: viewer, switchProfile, replayIntro } = useApp()
  const active = useActiveSection(ids)
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    const s = y > 40
    const h = y > 500 && y > prev + 4
    const show = y < prev - 4
    setScrolled((v) => (v === s ? v : s))
    if (h) setHidden((v) => (v ? v : true))
    else if (show) setHidden((v) => (v ? false : v))
  })

  useEffect(() => {
    lockScroll(open)
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (id: string) => {
    setOpen(false)
    requestAnimationFrame(() => scrollToId(id))
  }
  const viewerName = viewerProfiles.find((p) => p.id === viewer)?.name ?? 'Everyone'

  return (
    <>
      <a href="#main" className="sr-only z-[100] rounded bg-bone px-4 py-2 text-void focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <motion.header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,box-shadow] duration-500',
          scrolled ? 'bg-void/75 shadow-[0_1px_0_rgb(255_255_255/0.06)] backdrop-blur-xl' : 'bg-gradient-to-b from-void/80 to-transparent',
        )}
        animate={{ y: hidden && !open ? '-100%' : '0%' }}
        transition={{ duration: 0.45, ease }}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-[72px] md:px-10" aria-label="Primary">
          <button onClick={() => go('home')} className="flex items-center gap-2.5" aria-label={`${profile.name} — back to top`}>
            <span className="display text-3xl text-ember">RV</span>
            <span className="hidden font-mono text-[0.68rem] uppercase tracking-[0.25em] text-mute sm:inline">{profile.name}</span>
          </button>

          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((n) => (
              <li key={n.id}>
                <button
                  onClick={() => go(n.id)}
                  aria-current={active === n.id ? 'true' : undefined}
                  className={cn('relative px-3 py-2 text-sm font-semibold transition-colors', active === n.id ? 'text-bone' : 'text-mute hover:text-bone')}
                >
                  {n.label}
                  {active === n.id && (
                    <motion.span layoutId="nav-dot" className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded bg-ember" transition={{ duration: 0.45, ease }} />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={switchProfile}
              className="hidden items-center gap-2 rounded-md px-3 py-2 text-xs font-semibold text-mute transition-colors hover:bg-white/5 hover:text-bone sm:flex"
              title="Switch viewing profile"
            >
              <Users className="h-4 w-4" aria-hidden="true" />
              <span>
                <span className="sr-only">Switch profile. Currently viewing as </span>
                {viewerName}
              </span>
            </button>
            <button
              onClick={() => setOpen((o) => !o)}
              className="grid h-11 w-11 place-items-center rounded-md text-bone hover:bg-white/5 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-void/95 px-6 pb-10 pt-24 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            data-lenis-prevent
          >
            <ul className="flex flex-col gap-1">
              {navItems.map((n, i) => (
                <motion.li key={n.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.05 * i, ease } }}>
                  <button
                    onClick={() => go(n.id)}
                    className={cn('display flex w-full items-center gap-4 py-2 text-left text-5xl', active === n.id ? 'text-bone' : 'text-dim')}
                  >
                    <span className="font-mono text-xs text-ember">{String(i + 1).padStart(2, '0')}</span>
                    {n.label}
                  </button>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
              <button onClick={() => { setOpen(false); switchProfile() }} className="btn btn-ghost min-h-11 text-sm">
                <Users className="h-4 w-4" aria-hidden="true" /> Profile: {viewerName}
              </button>
              <button onClick={() => { setOpen(false); replayIntro() }} className="btn btn-ghost min-h-11 text-sm">
                <RotateCcw className="h-4 w-4" aria-hidden="true" /> Replay intro
              </button>
              <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn-ghost min-h-11 w-11 px-0" aria-label="GitHub (opens in new tab)">
                <GithubIcon />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn btn-ghost min-h-11 w-11 px-0" aria-label="LinkedIn (opens in new tab)">
                <LinkedinIcon />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
