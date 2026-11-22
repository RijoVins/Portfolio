import { memo } from 'react'
import type { ArtKey } from '../../data/portfolio'
import { cn } from '../../lib/utils'

/**
 * Original, generated poster art (inline SVG). Zero network cost, crisp at any size.
 * viewBox is 400×600 with `slice`, so the motif crops well into both posters and 16:9 thumbnails.
 */

const RED = '#c1121f'
const HOT = '#e5383b'
const BONE = '#f3f1ee'

// deterministic pseudo-random so art is stable between renders
const rand = (seed: number) => () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646

function Rag() {
  const r = rand(7)
  const nodes = Array.from({ length: 16 }, () => [230 + r() * 150, 120 + r() * 360] as const)
  return (
    <>
      <radialGradient id="rg-rag" cx="70%" cy="40%" r="60%">
        <stop offset="0" stopColor={RED} stopOpacity=".55" />
        <stop offset="1" stopColor="#000" stopOpacity="0" />
      </radialGradient>
      <rect width="400" height="600" fill="url(#rg-rag)" />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${40 + i * 18} ${170 + i * 22}) rotate(${-8 + i * 5})`}>
          <rect width="150" height="200" rx="6" fill="#16161a" stroke="#ffffff22" />
          {Array.from({ length: 9 }, (_, l) => (
            <rect key={l} x="16" y={22 + l * 18} width={l % 3 === 2 ? 70 : 118} height="5" rx="2.5" fill={i === 2 && l === 4 ? HOT : '#ffffff1f'} />
          ))}
        </g>
      ))}
      {nodes.map(([x, y], i) =>
        nodes.slice(i + 1, i + 3).map(([x2, y2], j) => <line key={`${i}-${j}`} x1={x} y1={y} x2={x2} y2={y2} stroke="#ffffff18" />),
      )}
      <path d="M190 297 C 240 297, 250 300, 300 300" stroke={HOT} strokeWidth="1.5" fill="none" strokeDasharray="4 5" />
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 5 ? 6 : 2.4} fill={i === 5 ? HOT : BONE} opacity={i === 5 ? 1 : 0.5} />
      ))}
      <circle cx={nodes[5][0]} cy={nodes[5][1]} r="22" fill="none" stroke={HOT} strokeOpacity=".4" />
    </>
  )
}

function Travel() {
  return (
    <>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#0b0b0d" />
        <stop offset=".55" stopColor="#4a0910" />
        <stop offset=".8" stopColor="#8e1520" />
      </linearGradient>
      <rect width="400" height="600" fill="url(#sky)" />
      <circle cx="250" cy="330" r="70" fill={HOT} opacity=".85" />
      <circle cx="250" cy="330" r="120" fill={HOT} opacity=".12" />
      {Array.from({ length: 40 }, (_, i) => {
        const r = rand(i + 3)
        return <circle key={i} cx={r() * 400} cy={r() * 220} r={r() * 1.2 + 0.3} fill={BONE} opacity={r() * 0.6} />
      })}
      <path d="M0 420 L70 330 L120 380 L190 280 L260 370 L320 310 L400 390 V600 H0Z" fill="#2a070c" />
      <path d="M0 470 L90 400 L150 440 L230 380 L310 450 L400 410 V600 H0Z" fill="#160406" />
      <path d="M0 530 L120 480 L220 520 L320 470 L400 500 V600 H0Z" fill="#070707" />
      <path d="M60 600 C 140 540, 200 560, 250 500" stroke={BONE} strokeOpacity=".5" strokeDasharray="3 7" fill="none" strokeWidth="1.5" />
    </>
  )
}

function Iot() {
  const pts = Array.from({ length: 41 }, (_, i) => {
    const x = i * 10
    const spike = i === 26 ? -120 : i === 27 ? 70 : 0
    return `${x},${300 + Math.sin(i * 0.9) * 22 + Math.cos(i * 0.37) * 12 + spike}`
  }).join(' ')
  return (
    <>
      <radialGradient id="rg-iot" cx="65%" cy="45%" r="55%">
        <stop offset="0" stopColor={RED} stopOpacity=".45" />
        <stop offset="1" stopColor="#000" stopOpacity="0" />
      </radialGradient>
      <rect width="400" height="600" fill="url(#rg-iot)" />
      {Array.from({ length: 13 }, (_, i) => (
        <line key={`v${i}`} x1={i * 34} y1="0" x2={i * 34} y2="600" stroke="#ffffff0d" />
      ))}
      {Array.from({ length: 18 }, (_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 34} x2="400" y2={i * 34} stroke="#ffffff0d" />
      ))}
      <rect x="0" y="262" width="400" height="76" fill="#ffffff06" />
      <polyline points={pts} fill="none" stroke={BONE} strokeOpacity=".75" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="260" cy={300 + Math.sin(26 * 0.9) * 22 + Math.cos(26 * 0.37) * 12 - 120} r="7" fill={HOT} />
      <circle cx="260" cy="200" r="34" fill="none" stroke={HOT} strokeOpacity=".5" />
      <g transform="translate(200 470)" stroke="#ffffff30" fill="none">
        <circle r="40" />
        <circle r="26" stroke={RED} />
        {Array.from({ length: 8 }, (_, i) => (
          <line key={i} x1="0" y1="0" x2={Math.cos((i * Math.PI) / 4) * 40} y2={Math.sin((i * Math.PI) / 4) * 40} />
        ))}
      </g>
    </>
  )
}

function Django() {
  return (
    <>
      <radialGradient id="rg-dj" cx="50%" cy="35%" r="60%">
        <stop offset="0" stopColor={RED} stopOpacity=".35" />
        <stop offset="1" stopColor="#000" stopOpacity="0" />
      </radialGradient>
      <rect width="400" height="600" fill="url(#rg-dj)" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} transform={`translate(110 ${170 + i * 56})`}>
          <rect width="180" height="44" rx="5" fill="#16161a" stroke="#ffffff1f" />
          <circle cx="20" cy="22" r="4" fill={i === 2 ? HOT : '#ffffff40'} />
          <circle cx="36" cy="22" r="4" fill="#ffffff20" />
          <rect x="60" y="19" width={60 + ((i * 23) % 50)} height="6" rx="3" fill="#ffffff18" />
        </g>
      ))}
      <text x="40" y="330" fill={RED} fontSize="120" fontFamily="monospace" opacity=".7">{'{'}</text>
      <text x="300" y="330" fill={RED} fontSize="120" fontFamily="monospace" opacity=".7">{'}'}</text>
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${150 + i * 50} 140 V 90`} stroke={HOT} strokeOpacity=".6" strokeDasharray="3 5" />
      ))}
    </>
  )
}

function Ml() {
  const r = rand(42)
  const pts = Array.from({ length: 70 }, () => {
    const x = 30 + r() * 340
    const y = 120 + r() * 380
    const above = y < 300 + Math.sin(x / 50) * 60
    return { x, y, above }
  })
  return (
    <>
      <radialGradient id="rg-ml" cx="40%" cy="50%" r="60%">
        <stop offset="0" stopColor={RED} stopOpacity=".35" />
        <stop offset="1" stopColor="#000" stopOpacity="0" />
      </radialGradient>
      <rect width="400" height="600" fill="url(#rg-ml)" />
      <path d={`M0 ${300} ${Array.from({ length: 41 }, (_, i) => `L${i * 10} ${300 + Math.sin((i * 10) / 50) * 60}`).join(' ')}`} stroke={HOT} strokeWidth="2" fill="none" />
      {pts.map((p, i) =>
        p.above ? (
          <circle key={i} cx={p.x} cy={p.y} r="4" fill={BONE} opacity=".7" />
        ) : (
          <rect key={i} x={p.x - 3.5} y={p.y - 3.5} width="7" height="7" fill="none" stroke={HOT} strokeOpacity=".8" />
        ),
      )}
    </>
  )
}

function Fullstack() {
  return (
    <>
      <radialGradient id="rg-fs" cx="60%" cy="40%" r="60%">
        <stop offset="0" stopColor={RED} stopOpacity=".4" />
        <stop offset="1" stopColor="#000" stopOpacity="0" />
      </radialGradient>
      <rect width="400" height="600" fill="url(#rg-fs)" />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${60 + i * 40} ${150 + i * 70})`} opacity={0.5 + i * 0.25}>
          <rect width="220" height="160" rx="8" fill="#141418" stroke="#ffffff22" />
          <rect width="220" height="22" rx="8" fill="#1f1f25" />
          {[0, 1, 2].map((d) => (
            <circle key={d} cx={14 + d * 12} cy="11" r="3.5" fill={d === 0 ? HOT : '#ffffff30'} />
          ))}
          {Array.from({ length: 6 }, (_, l) => (
            <rect key={l} x={16 + (l % 3) * 12} y={38 + l * 18} width={60 + ((l * 37) % 90)} height="6" rx="3" fill={l === 2 && i === 2 ? HOT : '#ffffff1c'} />
          ))}
        </g>
      ))}
    </>
  )
}

function Data() {
  const bars = [60, 95, 80, 140, 120, 185, 165, 230]
  return (
    <>
      <radialGradient id="rg-da" cx="70%" cy="30%" r="60%">
        <stop offset="0" stopColor={RED} stopOpacity=".4" />
        <stop offset="1" stopColor="#000" stopOpacity="0" />
      </radialGradient>
      <rect width="400" height="600" fill="url(#rg-da)" />
      {bars.map((h, i) => (
        <rect key={i} x={50 + i * 40} y={460 - h} width="24" height={h} rx="3" fill={i === bars.length - 1 ? HOT : '#ffffff1f'} />
      ))}
      <polyline points={bars.map((h, i) => `${62 + i * 40},${440 - h}`).join(' ')} fill="none" stroke={BONE} strokeOpacity=".6" strokeWidth="1.5" />
      <line x1="40" y1="461" x2="370" y2="461" stroke="#ffffff30" />
    </>
  )
}

function Learning() {
  return (
    <>
      <radialGradient id="rg-le" cx="50%" cy="50%" r="55%">
        <stop offset="0" stopColor={RED} stopOpacity=".45" />
        <stop offset="1" stopColor="#000" stopOpacity="0" />
      </radialGradient>
      <rect width="400" height="600" fill="url(#rg-le)" />
      {[50, 90, 130, 170].map((r, i) => (
        <g key={r}>
          <circle cx="200" cy="300" r={r} fill="none" stroke="#ffffff1a" />
          <circle cx={200 + Math.cos(i * 1.7) * r} cy={300 + Math.sin(i * 1.7) * r} r={i === 3 ? 6 : 3.5} fill={i === 3 ? HOT : BONE} opacity=".8" />
        </g>
      ))}
      <circle cx="200" cy="300" r="14" fill={HOT} />
    </>
  )
}

const ART: Record<ArtKey, () => React.ReactElement> = {
  rag: Rag,
  travel: Travel,
  iot: Iot,
  django: Django,
  ml: Ml,
  fullstack: Fullstack,
  data: Data,
  learning: Learning,
}

export const Poster = memo(function Poster({ art, className }: { art: ArtKey; className?: string }) {
  const Scene = ART[art]
  return (
    <svg viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice" className={cn('absolute inset-0 h-full w-full bg-coal', className)} aria-hidden="true">
      <defs />
      <Scene />
    </svg>
  )
})
