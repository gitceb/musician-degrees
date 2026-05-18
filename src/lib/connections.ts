import { accentForArtist } from './artistColors'
import type { ArtistsDataset, NeighborLink, NeighborOption } from '../types/game'

function addLink(
  map: Map<string, NeighborLink[]>,
  neighbor: string,
  link: NeighborLink,
) {
  const list = map.get(neighbor) ?? []
  const exists = list.some((l) => l.track === link.track && l.via === link.via)
  if (!exists) list.push(link)
  map.set(neighbor, list)
}

/** Neighbors of `current` with track labels explaining each edge. */
export function neighborOptions(dataset: ArtistsDataset, current: string): NeighborOption[] {
  const map = new Map<string, NeighborLink[]>()

  const node = dataset[current]
  if (node) {
    for (const c of node.connections) {
      addLink(map, c.artist, {
        track: c.track,
        via: 'your_collab',
      })
    }
  }

  for (const [name, record] of Object.entries(dataset)) {
    if (name === current) continue
    for (const c of record.connections) {
      if (c.artist !== current) continue
      addLink(map, name, {
        track: c.track,
        via: 'their_collab',
      })
    }
  }

  return [...map.entries()]
    .map(([name, links]) => ({
      name,
      links,
      accent: accentForArtist(name),
    }))
    .sort((a, b) => a.name.localeCompare(b.name))
}
