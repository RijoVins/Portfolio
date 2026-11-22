import { createContext, useContext } from 'react'
import type { ProfileId } from './data/portfolio'

export type AppCtx = {
  profile: ProfileId
  setProfile: (p: ProfileId) => void
  openProject: (id: string) => void
  openResume: () => void
  replayIntro: () => void
  switchProfile: () => void
  /** Navigate to a section id or "project:<id>". */
  go: (target: string) => void
}

export const AppContext = createContext<AppCtx | null>(null)

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppContext')
  return ctx
}
