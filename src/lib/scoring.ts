/** Max score when you match the BFS-shortest hop count exactly. */
export const PERFECT_ROUND_SCORE = 1000

/** Points lost for each hop beyond the shortest path. */
export const EXTRA_HOP_PENALTY = 150

export const MIN_ROUND_SCORE = 50

export function scoreForRun(playerHops: number, optimalHops: number): number {
  const extra = Math.max(0, playerHops - optimalHops)
  return Math.max(MIN_ROUND_SCORE, PERFECT_ROUND_SCORE - EXTRA_HOP_PENALTY * extra)
}

export function projectedScore(currentHops: number, optimalHops: number): number {
  return scoreForRun(currentHops, optimalHops)
}
