import { RotateCcw } from 'lucide-react'
import { useApp } from '../../context'
import { profile } from '../../data/portfolio'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'

const YEAR = new Date().getFullYear()

export function Footer() {
  const { replayIntro } = useApp()
  return (
    <footer className="border-t border-white/[0.06] px-4 py-8 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-sm text-dim md:flex-row">
        <p className="flex items-center gap-3">
          <span className="display text-xl text-ember">RV</span>
          <span>© {YEAR} {profile.name}. Designed &amp; built from scratch.</span>
        </p>
        <div className="flex items-center gap-1">
          <button onClick={replayIntro} className="inline-flex min-h-11 items-center gap-2 rounded-md px-3 hover:bg-white/5 hover:text-bone">
            <RotateCcw className="h-4 w-4" aria-hidden="true" /> Replay intro
          </button>
          <a href={profile.github} target="_blank" rel="noreferrer" className="grid h-11 w-11 place-items-center rounded-md hover:bg-white/5 hover:text-bone" aria-label="GitHub (opens in new tab)">
            <GithubIcon />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="grid h-11 w-11 place-items-center rounded-md hover:bg-white/5 hover:text-bone" aria-label="LinkedIn (opens in new tab)">
            <LinkedinIcon />
          </a>
        </div>
      </div>
    </footer>
  )
}
