export type Connection = {
  artist: string
  track: string
}

export type ArtistRecord = {
  connections: Connection[]
}

/** Keys are display names; graph also includes artists only mentioned in connections. */
export type ArtistsDataset = Record<string, ArtistRecord>

export type PlayMode = 'rewind' | 'commit'

export type Challenge = {
  start: string
  target: string
  optimalHops: number
}

export type NeighborLink = {
  track: string
  /** You appear on their song vs they appear on yours (wording only). */
  via: 'your_collab' | 'their_collab'
}

export type NeighborOption = {
  name: string
  links: NeighborLink[]
  accent: string
}
