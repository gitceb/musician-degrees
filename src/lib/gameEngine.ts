import { artistsDataset } from '../data/loadDataset'
import type { Challenge, PlayMode } from '../types/game'
import { allArtistNames, buildAdjacency, shortestHopCount } from './graph'

export const featureAdjacency = buildAdjacency(artistsDataset)
export const roster = allArtistNames(artistsDataset, featureAdjacency)

function randInt(n: number): number {
  return Math.floor(Math.random() * n)
}

export function pickRandomChallenge(minHops = 2, maxHops = 5): Challenge {
  for (let k = 0; k < 500; k++) {
    const a = roster[randInt(roster.length)]!
    const b = roster[randInt(roster.length)]!
    if (a === b) continue
    const hops = shortestHopCount(featureAdjacency, a, b)
    if (hops != null && hops >= minHops && hops <= maxHops) {
      return { start: a, target: b, optimalHops: hops }
    }
  }

  for (const a of roster) {
    for (const b of roster) {
      if (a === b) continue
      const hops = shortestHopCount(featureAdjacency, a, b)
      if (hops != null && hops >= minHops) {
        return { start: a, target: b, optimalHops: hops }
      }
    }
  }

  const a0 = roster[0]!
  const b0 = roster[1] ?? roster[0]!
  return {
    start: a0,
    target: b0,
    optimalHops: shortestHopCount(featureAdjacency, a0, b0) ?? 1,
  }
}

/** Hard cap so wandering too far ends the run (commit mode especially). */
export function maxAllowedHops(optimal: number): number {
  return Math.min(12, Math.max(optimal + 4, optimal * 2 + 2))
}

export function modeLabel(mode: PlayMode): string {
  return mode === 'rewind' ? 'Rewind' : 'Commit'
}

export function modeDescription(mode: PlayMode): string {
  if (mode === 'rewind') {
    return 'Back undoes your last hop and refunds the step — explore without fear.'
  }
  return 'No take-backs. Every hop counts toward your score and hop limit.'
}
