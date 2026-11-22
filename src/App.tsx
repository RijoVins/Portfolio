import { AnimatePresence, MotionConfig } from 'framer-motion'
import { useCallback, useEffect, useMemo, useState, type ComponentType } from 'react'
import { Pilot } from './components/about/Pilot'
import { Certifications } from './components/certifications/CertificationCard'
import { ContactSection } from './components/contact/ContactSection'
import { Hero } from './components/hero/Hero'
import { OpeningSequence } from './components/intro/OpeningSequence'
import { ProfileSelector } from './components/intro/ProfileSelector'
import { Timeline } from './components/journey/Timeline'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { ProjectModal } from './components/projects/ProjectModal'
import { ProjectRail } from './components/projects/ProjectRail'
import { ContinueWatching } from './components/rails/ContinueWatching'
import { TopPicks } from './components/rails/TopPicks'
import { ResumeModal, ResumeSection } from './components/resume/ResumeViewer'
import { SkillsSection } from './components/skills/SkillsSection'
import { AppContext, type AppCtx } from './context'
import { defaultOrder, projects, viewerProfiles, type ProfileId, type SectionId } from './data/portfolio'
import { initSmoothScroll, lockScroll, ScrollTrigger, scrollToId } from './lib/scroll'

const SECTIONS: Record<SectionId, ComponentType> = {
  continue: ContinueWatching,
  about: Pilot,
  journey: Timeline,
  projects: ProjectRail,
  toppicks: TopPicks,
  skills: SkillsSection,
  certifications: Certifications,
  resume: ResumeSection,
}

type Stage = 'intro' | 'profiles' | 'main'
const KEY = 'rv-series'

function readSession(): { seen: boolean; profile: ProfileId } {
  try {
    const raw = sessionStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* storage unavailable */ }
  return { seen: false, profile: 'all' }
}
function writeSession(profile: ProfileId) {
  try { sessionStorage.setItem(KEY, JSON.stringify({ seen: true, profile })) } catch { /* ignore */ }
}

export default function App() {
  const [initial] = useState(readSession)
  const [stage, setStage] = useState<Stage>(initial.seen ? 'main' : 'intro')
  const [mainReady, setMainReady] = useState(initial.seen)
  const [profile, setProfileState] = useState<ProfileId>(initial.profile)
  const [projectId, setProjectId] = useState<string | null>(null)
  const [resumeOpen, setResumeOpen] = useState(false)

  useEffect(() => initSmoothScroll(), [])

  // Re-measure scroll animations whenever layout order changes or fonts arrive.
  useEffect(() => {
    if (stage !== 'main') return
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [stage, profile])

  // Lock page scroll under the intro / profile overlays.
  useEffect(() => {
    lockScroll(stage !== 'main')
  }, [stage])

  const setProfile = useCallback((p: ProfileId) => {
    setProfileState(p)
    writeSession(p)
    setMainReady(true)
    setStage('main')
    window.scrollTo(0, 0)
  }, [])

  const finishIntro = useCallback(() => setStage(initial.seen || mainReady ? 'main' : 'profiles'), [initial.seen, mainReady])

  const ctx: AppCtx = useMemo(
    () => ({
      profile,
      setProfile,
      openProject: (id) => setProjectId(id),
      openResume: () => setResumeOpen(true),
      replayIntro: () => setStage('intro'),
      switchProfile: () => setStage('profiles'),
      go: (target) => (target.startsWith('project:') ? setProjectId(target.slice(8)) : scrollToId(target)),
    }),
    [profile, setProfile],
  )

  const order = viewerProfiles.find((p) => p.id === profile)?.order ?? defaultOrder
  const project = projects.find((p) => p.id === projectId)

  return (
    <MotionConfig reducedMotion="user">
      <AppContext.Provider value={ctx}>
        {mainReady && (
          <>
            <Navbar />
            <main id="main" tabIndex={-1} className="outline-none" aria-hidden={stage !== 'main'}>
              <Hero />
              {order.map((id) => {
                const Section = SECTIONS[id]
                return <Section key={id} />
              })}
              <ContactSection />
            </main>
            <Footer />
          </>
        )}

        <AnimatePresence mode="wait">
          {stage === 'intro' && <OpeningSequence key="intro" onDone={finishIntro} />}
          {stage === 'profiles' && <ProfileSelector key="profiles" onSelect={setProfile} />}
        </AnimatePresence>

        <AnimatePresence>
          {project && <ProjectModal key={project.id} project={project} onClose={() => setProjectId(null)} />}
          {resumeOpen && <ResumeModal key="resume" onClose={() => setResumeOpen(false)} />}
        </AnimatePresence>

        <div className="grain" aria-hidden="true" />
      </AppContext.Provider>
    </MotionConfig>
  )
}
