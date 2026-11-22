import { motion } from 'framer-motion'
import { Download, Eye, FileText } from 'lucide-react'
import { useApp } from '../../context'
import { profile } from '../../data/portfolio'
import { fadeUp, inView, stagger } from '../../lib/animations'
import { useTilt } from '../../hooks/useTilt'
import { SectionWrapper } from '../layout/SectionWrapper'
import { Modal } from '../ui/Modal'

export function ResumeSection() {
  const { openResume } = useApp()
  const tilt = useTilt<HTMLButtonElement>(6)
  return (
    <SectionWrapper id="resume">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blood/70 via-coal to-ink p-6 shadow-card sm:p-10 lg:p-14">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-ember/20 blur-3xl" aria-hidden="true" />
        <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          <motion.div variants={stagger(0.1)} {...inView}>
            <motion.p variants={fadeUp} className="kicker mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-ember" aria-hidden="true" /> Resume
            </motion.p>
            <motion.h2 variants={fadeUp} className="display text-[clamp(2.8rem,7vw,5.5rem)]">The Complete Story</motion.h2>
            <motion.p variants={fadeUp} className="mt-4 max-w-md text-lg text-mute">Everything you need to know about my professional journey.</motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              <button onClick={openResume} className="btn btn-primary">
                <Eye className="h-4 w-4" aria-hidden="true" /> View Resume
              </button>
              <a href={profile.resume} download={profile.resumeFileName} className="btn btn-ember">
                <Download className="h-4 w-4" aria-hidden="true" /> Download Resume
              </a>
              <a href={profile.resume} target="_blank" rel="noreferrer" className="btn btn-ghost">
                <FileText className="h-4 w-4" aria-hidden="true" /> Open PDF
              </a>
            </motion.div>
            <motion.p variants={fadeUp} className="mt-5 font-mono text-xs text-dim">PDF · 1 page</motion.p>
          </motion.div>

          <motion.div variants={fadeUp} {...inView} className="mx-auto w-full max-w-sm [perspective:1000px]">
            <button ref={tilt} onClick={openResume} className="group relative block w-full rounded-lg transition-transform duration-500" aria-label="Preview resume">
              <span className="absolute inset-0 translate-x-3 translate-y-3 rotate-3 rounded-lg bg-white/10" aria-hidden="true" />
              <img
                src="/resume/resume-preview.webp"
                alt="First page of Rijo Vins' resume"
                loading="lazy"
                width={910}
                height={1287}
                className="relative w-full rounded-lg shadow-[0_40px_80px_-20px_rgb(0_0_0/0.8)] transition-transform duration-500 group-hover:-translate-y-1"
              />
              <span className="absolute inset-0 grid place-items-center rounded-lg bg-void/0 transition-colors duration-500 group-hover:bg-void/50">
                <span className="btn btn-primary scale-90 opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
                  <Eye className="h-4 w-4" aria-hidden="true" /> Preview
                </span>
              </span>
            </button>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}

export function ResumeModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal label="Resume" onClose={onClose} className="sm:max-w-5xl">
      <div className="flex flex-wrap items-center gap-3 border-b border-white/[0.06] p-4 pr-16 md:p-5 md:pr-16">
        <h2 className="display mr-auto text-3xl">Resume</h2>
        <a href={profile.resume} download={profile.resumeFileName} className="btn btn-ember min-h-10 text-sm">
          <Download className="h-4 w-4" aria-hidden="true" /> Download
        </a>
        <a href={profile.resume} target="_blank" rel="noreferrer" className="btn btn-ghost min-h-10 text-sm">
          <FileText className="h-4 w-4" aria-hidden="true" /> Open in new tab
        </a>
      </div>
      <object data={`${profile.resume}#view=FitH`} type="application/pdf" className="block h-[75svh] w-full bg-smoke" aria-label="Resume PDF">
        {/* Fallback for browsers (mostly mobile) that can't embed PDFs */}
        <div className="p-6 text-center">
          <img src="/resume/resume-preview.webp" alt="First page of Rijo Vins' resume" className="mx-auto w-full max-w-md rounded shadow-card" />
          <p className="mt-4 text-sm text-mute">Your browser can&rsquo;t display the PDF inline — use Download or Open in new tab above.</p>
        </div>
      </object>
    </Modal>
  )
}
