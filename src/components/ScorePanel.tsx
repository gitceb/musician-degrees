import { useGame, hopsToTarget } from '../context/GameContext'
import { EXTRA_HOP_PENALTY, PERFECT_ROUND_SCORE } from '../lib/scoring'

export function ScorePanel() {
  const { phase, challenge, hopCount, liveScore, currentArtist } = useGame()

  if (phase !== 'active' || !challenge) return null

  const remaining =
    currentArtist != null ? hopsToTarget(currentArtist, challenge.target) : null

  return (
    <aside className="score-panel" aria-label="Round scoring">
      <p className="score-kicker">Shortest path</p>
      <div className="score-par">
        <span className="score-par-num">{challenge.optimalHops}</span>
        <span className="score-par-label">hops (par)</span>
      </div>
      <div className="score-divider" />
      <div className="score-row">
        <span className="score-label">Your hops</span>
        <strong>{hopCount}</strong>
      </div>
      {remaining != null ? (
        <div className="score-row subtle">
          <span className="score-label">To target (BFS)</span>
          <strong>{remaining}</strong>
        </div>
      ) : null}
      <div className="score-divider" />
      <div className="score-row highlight">
        <span className="score-label">Live score</span>
        <strong className="score-live">{liveScore}</strong>
      </div>
      <p className="score-hint">
        Perfect run: <strong>{PERFECT_ROUND_SCORE}</strong> pts. Each extra hop −
        {EXTRA_HOP_PENALTY}.
      </p>
    </aside>
  )
}
