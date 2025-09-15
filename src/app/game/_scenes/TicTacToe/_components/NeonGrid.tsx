"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, Variants } from "motion/react"
import UserItem from "./UserItem"

// ----------------- Constants -----------------
const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { type: "spring", duration: 1.2, bounce: 0 },
      opacity: { duration: 0.01 },
    },
  }),
}

const CELL_SIZE = 100
const OFFSET = 50
const ANIMATION_DURATION = 1200
const BOARD_SIZE = 9
const WIN_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const coords = Array.from({ length: BOARD_SIZE }, (_, i) => [
  OFFSET + (i % 3) * CELL_SIZE,
  OFFSET + Math.floor(i / 3) * CELL_SIZE,
])

type Player = { name: string; avatar: string; symbol: string }

// ----------------- Custom Hook: useTicTacToe -----------------
function useTicTacToe(players: Player[]) {
  const [board, setBoard] = useState(Array(BOARD_SIZE).fill(""))
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [winner, setWinner] = useState<string | "draw" | null>(null)
  const [winningLine, setWinningLine] = useState<number[] | null>(null)
  const [score, setScore] = useState([0, 0])
  const [timer, setTimer] = useState(0)
  const [timerRunning, setTimerRunning] = useState(false)

  useEffect(() => {
    if (!timerRunning) return
    const interval = setInterval(() => setTimer((t) => t + 1), 1000)
    return () => clearInterval(interval)
  }, [timerRunning])

  const checkWinner = useCallback((b: string[]) => {
    for (const combo of WIN_COMBOS) {
      const [a, b1, c] = combo
      if (b[a] && b[a] === b[b1] && b[a] === b[c]) return combo
    }
    return null
  }, [])

 const handleMove = (index: number) => {
  if (board[index] || winner) return // ignore clicks if cell is filled or winner exists

  if (!timerRunning) setTimerRunning(true) // start timer on first move

  const currentSymbol = players[currentPlayerIndex].symbol
  const newBoard = [...board]
  newBoard[index] = currentSymbol
  setBoard(newBoard)

  // Check winner immediately to block further clicks
  const winCombo = checkWinner(newBoard)
  if (winCombo) {
    setWinner(currentSymbol)
    setWinningLine(winCombo)
    setScore((prev) =>
      currentSymbol === players[0].symbol ? [prev[0] + 1, prev[1]] : [prev[0], prev[1] + 1]
    )
    setTimerRunning(false)
  } else if (newBoard.every(Boolean)) {
    setWinner("draw")
    setTimerRunning(false)
  } else {
    // Swap player only if the game is still ongoing
    setCurrentPlayerIndex((prev) => 1 - prev)
  }
}


  const resetGame = () => {
    setBoard(Array(BOARD_SIZE).fill(""))
    setCurrentPlayerIndex(0)
    setWinner(null)
    setWinningLine(null)
    setTimer(0)
    setTimerRunning(false)
  }

  return {
    board,
    currentPlayerIndex,
    winner,
    winningLine,
    score,
    timer,
    handleMove,
    resetGame,
  }
}

// ----------------- Main Component -----------------
export default function TicTacToe() {
  const players: Player[] = [
    { name: "Aurelian Spodarec", avatar: "https://i.imgur.com/cTzL0ai.png", symbol: "X" },
    { name: "Novice AI", avatar: "https://i.imgur.com/Osx2CgE.png", symbol: "O" },
  ]

  const {
    board,
    currentPlayerIndex,
    winner,
    winningLine,
    score,
    timer,
    handleMove,
    resetGame,
  } = useTicTacToe(players)

  return (
    <div className="w-[700px] text-center z-10">
      <TimerDisplay timer={timer} />
      <PlayerHeader
        players={players}
        currentPlayerIndex={currentPlayerIndex}
        winner={winner}
        score={score}
      />
      <Board board={board} winningLine={winningLine} onCellClick={handleMove} winner={winner} />
      <button onClick={resetGame} className={`mt-10 px-4 py-2 border rounded-lg text-white ${winner ? "opacity-100" : "opacity-0 select-none pointer-events-none"}`}>
        Play Again
      </button>
    </div>
  )
}

// ----------------- Timer Display Component -----------------
type TimerProps = { timer: number }

function TimerDisplay({ timer }: TimerProps) {
  const m = Math.floor(timer / 60)
  const s = timer % 60
  const formatted = `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
  return <div className="mb-2 text-gray-50 text-lg">{formatted}</div>
}

// ----------------- Player Header Component -----------------
type PlayerHeaderProps = {
  players: Player[]
  currentPlayerIndex: number
  winner: string | "draw" | null
  score: number[]
}

function PlayerHeader({ players, currentPlayerIndex, winner, score }: PlayerHeaderProps) {
  const statusText = winner
    ? winner === "draw"
      ? "It's a draw!"
      : `${players.find((p) => p.symbol === winner)?.name} wins!`
    : `${players[currentPlayerIndex].name}'s turn`

  return (
    <>
      <div className="mb-5 text-center text-[#ef476f] bg-[#ef476f]/30 backdrop-blur inline-block mx-auto py-1.5 px-3 font-bold rounded-lg">
        {statusText}
      </div>
      <header className="flex justify-between relative mb-5">
        <UserItem name={`${players[0].name} (${score[0]})`} avatar={players[0].avatar} />
        <UserItem
          name={`${players[1].name} (${score[1]})`}
          avatar={players[1].avatar}
          labelPosition="right"
        />
      </header>
    </>
  )
}

// ----------------- Board Component -----------------
type BoardProps = {
  board: string[]
  winningLine: number[] | null
  onCellClick: (i: number) => void
  winner: string | "draw" | null
}

function Board({ board, winningLine, onCellClick, winner }: BoardProps) {
  return (
    <section className="flex flex-col items-center justify-center">
      <svg
        width={CELL_SIZE * 3}
        height={CELL_SIZE * 3}
        viewBox={`0 0 ${CELL_SIZE * 3} ${CELL_SIZE * 3}`}
        onClick={(e) => {
          if (winner) return
          const rect = e.currentTarget.getBoundingClientRect()
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top
          const idx = Math.floor(y / CELL_SIZE) * 3 + Math.floor(x / CELL_SIZE)
          onCellClick(idx)
        }}
      >
        {/* Grid */}
        <g stroke="#78d6c6" strokeWidth={6}>
          <line x1="100" y1="0" x2="100" y2="300" />
          <line x1="200" y1="0" x2="200" y2="300" />
          <line x1="0" y1="100" x2="300" y2="100" />
          <line x1="0" y1="200" x2="300" y2="200" />
        </g>

        {/* Cells */}
        {board.map((cell, i) => (
          <Cell key={i} value={cell} index={i} />
        ))}

        {/* Winning line */}
        {winningLine && <WinningLine line={winningLine} />}
      </svg>
    </section>
  )
}

// ----------------- Cell Component -----------------
type CellProps = { value: string; index: number }

function Cell({ value, index }: CellProps) {
  const [cx, cy] = coords[index]

  if (value === "O") {
    return (
      <motion.circle
        cx={cx}
        cy={cy}
        r={35}
        stroke="#0d63f8"
        strokeWidth={8}
        variants={draw}
        initial="hidden"
        animate="visible"
        custom={index}
        style={{ fill: "transparent", strokeLinecap: "round" }}
      />
    )
  }

  if (value === "X") {
    return (
      <g>
        <motion.line
          x1={cx - 30}
          y1={cy - 30}
          x2={cx + 30}
          y2={cy + 30}
          stroke="#ff0088"
          strokeWidth={8}
          variants={draw}
          initial="hidden"
          animate="visible"
          custom={index}
          style={{ strokeLinecap: "round" }}
        />
        <motion.line
          x1={cx - 30}
          y1={cy + 30}
          x2={cx + 30}
          y2={cy - 30}
          stroke="#ff0088"
          strokeWidth={8}
          variants={draw}
          initial="hidden"
          animate="visible"
          custom={index + 0.5}
          style={{ strokeLinecap: "round" }}
        />
      </g>
    )
  }

  return null
}

// ----------------- WinningLine Component -----------------
type WinningLineProps = { line: number[] }

function WinningLine({ line }: WinningLineProps) {
  const [a, , c] = line
  const [x1, y1] = coords[a]
  const [x2, y2] = coords[c]

  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="#ef476f"
      strokeWidth={10}
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.8 }}
      style={{ strokeLinecap: "round" }}
    />
  )
}
