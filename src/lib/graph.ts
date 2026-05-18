import type { ArtistsDataset } from '../types/game'

/** Undirected adjacency from collaboration edges (track = one edge). */
export function buildAdjacency(dataset: ArtistsDataset): Map<string, Set<string>> {
  const adj = new Map<string, Set<string>>()

  const link = (a: string, b: string) => {
    if (a === b) return
    if (!adj.has(a)) adj.set(a, new Set())
    if (!adj.has(b)) adj.set(b, new Set())
    adj.get(a)!.add(b)
    adj.get(b)!.add(a)
  }

  for (const [name, node] of Object.entries(dataset)) {
    if (!adj.has(name)) adj.set(name, new Set())
    for (const c of node.connections) link(name, c.artist)
  }

  return adj
}

/** Every artist that appears in the dataset keys or any connection target. */
export function allArtistNames(dataset: ArtistsDataset, adj: Map<string, Set<string>>): string[] {
  const names = new Set<string>(Object.keys(dataset))
  for (const n of adj.keys()) names.add(n)
  return [...names].sort((a, b) => a.localeCompare(b))
}

/**
 * Breadth-first search — shortest path in an unweighted collaboration graph.
 * Returns ordered list of artist names from start → end, or null if unreachable.
 */
export function bfsShortestPath(
  adj: Map<string, Set<string>>,
  start: string,
  end: string,
): string[] | null {
  if (start === end) return [start]
  if (!adj.has(start) || !adj.has(end)) return null

  const queue: string[] = [start]
  const prev = new Map<string, string | null>()
  prev.set(start, null)

  while (queue.length) {
    const u = queue.shift()!
    for (const v of adj.get(u) ?? []) {
      if (prev.has(v)) continue
      prev.set(v, u)
      if (v === end) {
        const path: string[] = []
        let cur: string | null = end
        while (cur != null) {
          path.push(cur)
          cur = prev.get(cur) ?? null
        }
        path.reverse()
        return path
      }
      queue.push(v)
    }
  }

  return null
}

export function shortestHopCount(
  adj: Map<string, Set<string>>,
  start: string,
  end: string,
): number | null {
  const path = bfsShortestPath(adj, start, end)
  if (!path) return null
  return Math.max(0, path.length - 1)
}
