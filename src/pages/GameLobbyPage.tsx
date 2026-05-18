import { Link } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import { roster, modeDescription, modeLabel } from '../lib/gameEngine'
import type { PlayMode } from '../types/game'

export function GameLobbyPage() {
  const { mode, setMode, startRun, challenge, phase, hopCount } = useGame()

  const modes: PlayMode[] = ['rewind', 'commit']

  return (
    <div className="page lobby-page">
      <header className="page-head">
        <p className="eyebrow">Briefing room</p>
        <h1>Connect the features</h1>
        <p className="lede">
          Hop from artist to artist using real collaboration tracks from the bundled JSON graph.
          Match the shortest path for max points — every extra hop costs you.
        </p>
      </header>

      <div className="lobby-grid">
        <div className="panel">
          <h2>Play mode</h2>
          <div className="mode-picker">
            {modes.map((m) => (
              <button
                key={m}
                type="button"
                className={`mode-card ${mode === m ? 'active' : ''}`}
                onClick={() => setMode(m)}
              >
                <span className="mode-card-title">{modeLabel(m)}</span>
                <span className="mode-card-desc">{modeDescription(m)}</span>
              </button>
            ))}
          </div>
          <button type="button" className="btn primary stretch" onClick={() => startRun()}>
            Start round ({modeLabel(mode)})
          </button>
        </div>

        <div className="panel subtle">
          <h2>Dataset</h2>
          <p className="muted">
            <strong>{roster.length}</strong> artists in the graph (including names that only appear
            as collaborators). Data lives in <code>src/data/artists.json</code>.
          </p>
          {phase === 'active' && challenge ? (
            <div className="intel">
              <p className="muted">Round in progress</p>
              <p>
                <strong>{challenge.start}</strong> → <strong>{challenge.target}</strong>
              </p>
              <p className="muted">
                Par: {challenge.optimalHops} hops · You: {hopCount}
              </p>
              <Link className="btn ghost stretch" to="/game">
                Resume game
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
