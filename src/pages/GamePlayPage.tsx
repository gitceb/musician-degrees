import { Navigate } from 'react-router-dom'
import { artistsDataset } from '../data/loadDataset'
import { neighborOptions } from '../lib/connections'
import { gradientForArtist } from '../lib/artistColors'
import { useGame } from '../context/GameContext'
import { NeighborCard } from '../components/NeighborCard'
import { ScorePanel } from '../components/ScorePanel'
import { GameResultOverlay } from '../components/GameResultOverlay'
import { modeLabel } from '../lib/gameEngine'

export function GamePlayPage() {
  const {
    phase,
    challenge,
    currentArtist,
    mode,
    canGoBack,
    goBack,
    pickNeighbor,
    exitRun,
    pathTrail,
    hopCount,
    maxHops,
  } = useGame()

  if (phase === 'idle' || !challenge) {
    return <Navigate to="/play" replace />
  }

  const artist = currentArtist ?? challenge.start
  const options = neighborOptions(artistsDataset, artist)
  const target = challenge.target

  return (
    <div className="game-layout">
      <div className="game-main">
        <header className="game-header">
          <div className="game-mission">
            <span className="muted">Reach</span>
            <strong className="target-name">{target}</strong>
            <span className="muted">from</span>
            <strong>{challenge.start}</strong>
          </div>
          <div className="game-header-meta">
            <span className="pill mode-pill">{modeLabel(mode)} mode</span>
            <span className="pill">
              Hops <strong>{hopCount}</strong> / {maxHops}
            </span>
          </div>
        </header>

        <section className="current-artist">
          <div
            className="artist-avatar"
            style={{ background: gradientForArtist(artist) }}
            aria-hidden
          />
          <div>
            <p className="eyebrow">You are here</p>
            <h1>{artist}</h1>
            {artist === target ? (
              <p className="lede tight win-flash">That&apos;s the target — you win!</p>
            ) : (
              <p className="lede tight">Pick a collaborator to hop to the next artist.</p>
            )}
          </div>
        </section>

        {pathTrail.length > 1 ? (
          <nav className="path-trail" aria-label="Your path">
            {pathTrail.map((name, i) => (
              <span key={`${name}-${i}`} className={i === pathTrail.length - 1 ? 'trail-current' : ''}>
                {i > 0 ? <span className="trail-arrow">→</span> : null}
                {name}
              </span>
            ))}
          </nav>
        ) : null}

        <section className="neighbors-section">
          <h2 className="section-title">Connected artists</h2>
          {options.length === 0 ? (
            <p className="panel subtle">No collaborators in the dataset from here — try going back.</p>
          ) : (
            <div className="neighbor-grid">
              {options.map((opt) => (
                <NeighborCard
                  key={opt.name}
                  option={opt}
                  currentArtist={artist}
                  onPick={pickNeighbor}
                />
              ))}
            </div>
          )}
        </section>

        <div className="game-actions">
          {canGoBack ? (
            <button type="button" className="btn ghost" onClick={() => goBack()}>
              ← Undo last hop
            </button>
          ) : (
            <span className="muted fineprint">
              {mode === 'commit' ? 'Commit mode: hops cannot be undone.' : null}
            </span>
          )}
          <button type="button" className="btn tiny ghost" onClick={() => exitRun()}>
            Exit round
          </button>
        </div>
      </div>
      <ScorePanel />
      <GameResultOverlay />
    </div>
  )
}
