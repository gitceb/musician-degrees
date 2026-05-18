import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { GameProvider } from './context/GameContext'
import { AppShell } from './components/AppShell'
import { LandingPage } from './pages/LandingPage'
import { GameLobbyPage } from './pages/GameLobbyPage'
import { GamePlayPage } from './pages/GamePlayPage'

export default function App() {
  return (
    <BrowserRouter>
      <GameProvider>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/play" element={<GameLobbyPage />} />
            <Route path="/game" element={<GamePlayPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </GameProvider>
    </BrowserRouter>
  )
}
