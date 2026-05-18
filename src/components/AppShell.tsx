import type { MouseEvent } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useGame } from '../context/GameContext'

export function AppShell() {
  const { phase, exitRun } = useGame()

  const guardNav =
    (path: string) =>
    (e: MouseEvent) => {
      if (phase === 'active') {
        e.preventDefault()
        if (path === '/play') exitRun()
        else exitRun()
      }
    }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <NavLink to="/" className="brand" end onClick={guardNav('/')}>
          <span className="brand-mark" aria-hidden />
          <span className="brand-text">
            <span className="brand-name">Studio Relay</span>
            <span className="brand-tag">Feature graph</span>
          </span>
        </NavLink>

        <nav className="side-nav" aria-label="Primary">
          <NavLink to="/" className="side-link" end onClick={guardNav('/')}>
            Home
          </NavLink>
          <NavLink to="/play" className="side-link" onClick={guardNav('/play')}>
            Play
          </NavLink>
        </nav>

        <div className="side-foot">
          <p className="microcopy">Local JSON graph — no APIs. BFS shortest paths offline.</p>
        </div>
      </aside>

      <div className="main-column">
        <main className="page-scroll">
          <Outlet />
        </main>
        <footer className="mini-player" aria-hidden>
          <div className="mini-player-art" />
          <div className="mini-player-meta">
            <div className="mini-title">Studio Relay</div>
            <div className="mini-sub">Hop artists via collaboration tracks</div>
          </div>
        </footer>
      </div>
    </div>
  )
}
