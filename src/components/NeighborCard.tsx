import type { CSSProperties } from 'react'
import type { NeighborOption } from '../types/game'

type Props = {
  option: NeighborOption
  currentArtist: string
  onPick: (name: string) => void
}

function linkCaption(current: string, option: NeighborOption): string {
  const first = option.links[0]
  if (!first) return 'Collaboration link'
  if (first.via === 'your_collab') {
    return `“${first.track}” — your connection to ${option.name}`
  }
  return `“${first.track}” — ${option.name} ↔ ${current}`
}

export function NeighborCard({ option, currentArtist, onPick }: Props) {
  const extra = option.links.length > 1 ? ` (+${option.links.length - 1} more)` : ''

  return (
    <button
      type="button"
      className="neighbor-card"
      style={{ '--card-accent': option.accent } as CSSProperties}
      onClick={() => onPick(option.name)}
    >
      <span className="neighbor-glow" aria-hidden />
      <span className="neighbor-name">{option.name}</span>
      <span className="neighbor-track">
        {linkCaption(currentArtist, option)}
        {extra}
      </span>
    </button>
  )
}
