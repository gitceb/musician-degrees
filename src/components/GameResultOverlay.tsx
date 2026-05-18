import { useGame } from '../context/GameContext'
import { PERFECT_ROUND_SCORE } from '../lib/scoring'

export function GameResultOverlay() {
  const { phase, challenge, hopCount, lastScore, startRun, dismissResult, mode } = useGame()

  if (phase !== 'won' && phase !== 'lost') return null

  const perfect = challenge && hopCount === challenge.optimalHops

  return (
    <div className="overlay-root" role="dialog" aria-modal="true">
      <div className="overlay-card">
        {phase === 'won' ? (
          <>
            <p className="overlay-kicker">Target reached</p>
            <h2 className="overlay-title">{perfect ? 'Perfect path!' : 'You made it'}</h2>
            <p className="overlay-body">
              {challenge ? (
                <>
                  <strong>{challenge.start}</strong> → <strong>{challenge.target}</strong> in{' '}
                  <strong>{hopCount}</strong> hop{hopCount === 1 ? '' : 's'}. Par was{' '}
                  <strong>{challenge.optimalHops}</strong>.
                </>
              ) : null}
            </p>
            {lastScore != null ? (
              <p className="overlay-score">
                Round score: <strong>{lastScore}</strong>
                {perfect ? (
                  <span className="overlay-badge"> max {PERFECT_ROUND_SCORE}</span>
                ) : null}
              </p>
            ) : null}
          </>
        ) : (
          <>
            <p className="overlay-kicker">Out of hops</p>
            <h2 className="overlay-title">Detour too long</h2>
            <p className="overlay-body">
              You exceeded the hop budget for this puzzle. Shortest route was{' '}
              <strong>{challenge?.optimalHops ?? '—'}</strong> hops — try a tighter line.
            </p>
          </>
        )}
        <div className="overlay-actions">
          <button type="button" className="btn primary" onClick={() => startRun(mode)}>
            Play again
          </button>
          <button type="button" className="btn ghost" onClick={() => dismissResult()}>
            Back to lobby
          </button>
        </div>
      </div>
    </div>
  )
}
