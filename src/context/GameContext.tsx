import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { useNavigate } from 'react-router-dom'
import type { Challenge, PlayMode } from '../types/game'
import { featureAdjacency, maxAllowedHops, pickRandomChallenge } from '../lib/gameEngine'
import { projectedScore, scoreForRun } from '../lib/scoring'
import { shortestHopCount } from '../lib/graph'

type GameContextValue = {
  phase: 'idle' | 'active' | 'won' | 'lost'
  mode: PlayMode
  setMode: (mode: PlayMode) => void
  challenge: Challenge | null
  currentArtist: string | null
  hopCount: number
  maxHops: number
  canGoBack: boolean
  lastScore: number | null
  liveScore: number
  pathTrail: string[]
  startRun: (mode?: PlayMode) => void
  pickNeighbor: (name: string) => void
  goBack: () => void
  exitRun: () => void
  dismissResult: () => void
}

const GameContext = createContext<GameContextValue | null>(null)

export function GameProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const [phase, setPhase] = useState<GameContextValue['phase']>('idle')
  const [mode, setMode] = useState<PlayMode>('rewind')
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [currentArtist, setCurrentArtist] = useState<string | null>(null)
  const [hopCount, setHopCount] = useState(0)
  const [pathTrail, setPathTrail] = useState<string[]>([])
  const [lastScore, setLastScore] = useState<number | null>(null)

  const maxHops = challenge ? maxAllowedHops(challenge.optimalHops) : 0

  const liveScore = challenge ? projectedScore(hopCount, challenge.optimalHops) : 0

  const canGoBack = mode === 'rewind' && pathTrail.length > 1 && phase === 'active'

  const startRun = useCallback(
    (runMode?: PlayMode) => {
      if (runMode) setMode(runMode)
      const next = pickRandomChallenge()
      setChallenge(next)
      setCurrentArtist(next.start)
      setHopCount(0)
      setPathTrail([next.start])
      setLastScore(null)
      setPhase('active')
      navigate('/game')
    },
    [mode, navigate],
  )

  const exitRun = useCallback(() => {
    setPhase('idle')
    setChallenge(null)
    setCurrentArtist(null)
    setHopCount(0)
    setPathTrail([])
    setLastScore(null)
    navigate('/play')
  }, [navigate])

  const dismissResult = useCallback(() => {
    setPhase('idle')
    setChallenge(null)
    setCurrentArtist(null)
    setHopCount(0)
    setPathTrail([])
    navigate('/play')
  }, [navigate])

  const pickNeighbor = useCallback(
    (name: string) => {
      if (phase !== 'active' || !challenge || !currentArtist) return
      if (name === currentArtist) return

      const nextHops = hopCount + 1
      setHopCount(nextHops)
      setCurrentArtist(name)
      setPathTrail((t) => [...t, name])

      if (name === challenge.target) {
        setLastScore(scoreForRun(nextHops, challenge.optimalHops))
        setPhase('won')
        return
      }

      if (nextHops > maxAllowedHops(challenge.optimalHops)) {
        setLastScore(scoreForRun(nextHops, challenge.optimalHops))
        setPhase('lost')
      }
    },
    [challenge, currentArtist, hopCount, phase],
  )

  const goBack = useCallback(() => {
    if (mode !== 'rewind' || phase !== 'active') return
    setPathTrail((t) => {
      if (t.length <= 1) return t
      const next = t.slice(0, -1)
      setCurrentArtist(next[next.length - 1] ?? null)
      setHopCount((h) => Math.max(0, h - 1))
      return next
    })
  }, [mode, phase])

  const value = useMemo(
    () => ({
      phase,
      mode,
      setMode,
      challenge,
      currentArtist,
      hopCount,
      maxHops,
      canGoBack,
      lastScore,
      liveScore,
      pathTrail,
      startRun,
      pickNeighbor,
      goBack,
      exitRun,
      dismissResult,
    }),
    [
      canGoBack,
      challenge,
      currentArtist,
      dismissResult,
      exitRun,
      goBack,
      hopCount,
      lastScore,
      liveScore,
      maxHops,
      mode,
      pathTrail,
      phase,
      pickNeighbor,
      startRun,
    ],
  )

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used within GameProvider')
  return ctx
}

/** Hops remaining on shortest path from current position to target (for HUD hint). */
export function hopsToTarget(current: string, target: string): number | null {
  return shortestHopCount(featureAdjacency, current, target)
}
