import { useState } from 'react'
import { profile } from '../../data/portfolio'
import { cn } from '../../lib/utils'

/** Shows profile.portrait (transparent cutout); falls back to the placeholder if missing. */
export function Portrait({ className, eager }: { className?: string; eager?: boolean }) {
  const [src, setSrc] = useState(profile.portrait)
  return (
    <img
      src={src}
      onError={() => src !== profile.portraitFallback && setSrc(profile.portraitFallback)}
      alt={`Portrait of ${profile.name}`}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={cn('h-full w-full object-cover', className)}
    />
  )
}
