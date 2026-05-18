import { Link } from 'react-router-dom'
import { useGame } from '../context/GameContext'

export function LandingPage() {
  const { startRun } = useGame()

  return (
    <div className="landing">
      <section className="landing-hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Feature graph puzzle</p>
            <h1>
              Six degrees of <span className="accent">features</span>, not film credits.
            </h1>
            <p className="hero-lede">
              Studio Relay loads a local JSON roster of hip-hop and pop collaborators. Each hop is a
              real track link — BFS finds the shortest path in the background while you chase the
              target artist for points.
            </p>
            <div className="hero-actions">
              <Link to="/play" className="btn primary">
                Choose mode & play
              </Link>
              <button type="button" className="btn ghost" onClick={() => startRun('rewind')}>
                Quick start (Rewind)
              </button>
            </div>
            <ul className="hero-points">
              <li>Grey canvas, colourful artist cards — Spotify-ish, not a clone.</li>
              <li>Options show artist name + track that connects you.</li>
              <li>Rewind mode vs Commit mode — undo hops or play for keeps.</li>
            </ul>
          </div>
          <div className="hero-visual" aria-hidden>
            <div className="hero-stack">
              <div className="stack-card c1">Kendrick → SZA</div>
              <div className="stack-card c2">“All The Stars”</div>
              <div className="stack-card c3">Par: 2 hops · 1000 pts</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
