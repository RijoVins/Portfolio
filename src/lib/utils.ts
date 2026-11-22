export function cn(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(' ')
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const isFinePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches

export const isSmallScreen = () => typeof window !== 'undefined' && window.innerWidth < 768

/** True once the given ISO date (end of period) has passed. */
export const hasEnded = (iso: string) => new Date() > new Date(iso + 'T23:59:59')

/** Which year of a degree the visitor is viewing in (academic year starts July). */
export function degreeYear(startYear: number, endYear: number) {
  const now = new Date()
  const total = endYear - startYear
  const elapsed = now.getFullYear() - startYear + (now.getMonth() >= 6 ? 1 : 0)
  return { current: Math.min(Math.max(elapsed, 1), total), total, done: elapsed > total }
}
