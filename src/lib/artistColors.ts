const PALETTE = [
  '#1ed760',
  '#ff6b4a',
  '#8b7cff',
  '#f59e0b',
  '#22d3ee',
  '#ec4899',
  '#a3e635',
  '#fb7185',
  '#38bdf8',
  '#c084fc',
  '#fbbf24',
  '#34d399',
]

export function accentForArtist(name: string): string {
  let h = 0
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0
  return PALETTE[h % PALETTE.length]!
}

export function gradientForArtist(name: string): string {
  const a = accentForArtist(name)
  const b = accentForArtist(name + '·')
  return `linear-gradient(135deg, ${a} 0%, ${b} 55%, #2a2a32 100%)`
}
