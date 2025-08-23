"use client";

import { useState } from "react";
import { motion, Variants } from "motion/react";

// ----------------------- TYPES -----------------------
type Player = "X" | "O";
type CellValue = Player | null;
type Board = CellValue[][];
type GameStatus = "ongoing" | "X wins" | "O wins" | "draw";

interface WinnerLine {
  type: "row" | "col" | "diag-desc" | "diag-asc";
  index?: number;
}

// ----------------------- MOTION VARIANTS -----------------------
const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: i * 0.3, type: "spring", duration: 1.5, bounce: 0 },
      opacity: { delay: i * 0.1, duration: 0.01 },
    },
  }),
};

// ----------------------- CELL -----------------------
interface CellProps {
  value: CellValue;
  onClick: () => void;
}

const Cell: React.FC<CellProps> = ({ value, onClick }) => (
  <div className="w-16 h-16 p-1">
    <motion.div className="w-full h-full cursor-pointer relative" onClick={onClick}>
      {value === "O" && (
        <motion.svg viewBox="0 0 100 100" className="w-full h-full" initial="hidden" animate="visible">
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            stroke="#3b82f6"
            strokeWidth={8}
            fill="transparent"
            variants={draw}
            custom={1}
            style={{ strokeLinecap: "round" }}
          />
        </motion.svg>
      )}
      {value === "X" && (
        <motion.svg viewBox="0 0 100 100" className="w-full h-full" initial="hidden" animate="visible">
          <motion.line
            x1="20"
            y1="20"
            x2="80"
            y2="80"
            stroke="#ef4444"
            strokeWidth={8}
            variants={draw}
            custom={1}
            style={{ strokeLinecap: "round" }}
          />
          <motion.line
            x1="20"
            y1="80"
            x2="80"
            y2="20"
            stroke="#ef4444"
            strokeWidth={8}
            variants={draw}
            custom={1.5}
            style={{ strokeLinecap: "round" }}
          />
        </motion.svg>
      )}
    </motion.div>
  </div>
);

// ----------------------- BOARD -----------------------
interface BoardProps {
  board: Board;
  onCellClick: (row: number, col: number) => void;
  winnerLine?: WinnerLine;
}

const BoardComponent: React.FC<BoardProps> = ({ board, onCellClick, winnerLine }) => {
  const cellSize = 64;
  const padding = 10;
  const boardSize = board.length * cellSize;

  // SVG coordinates for winning line
  const getLineCoords = () => {
    if (!winnerLine) return null;
    const startOffset = padding + cellSize / 2;
    const endOffset = boardSize - padding - cellSize / 2;

    switch (winnerLine.type) {
      case "row":
        return { x1: startOffset, y1: winnerLine.index! * cellSize + cellSize / 2, x2: endOffset, y2: winnerLine.index! * cellSize + cellSize / 2 };
      case "col":
        return { x1: winnerLine.index! * cellSize + cellSize / 2, y1: startOffset, x2: winnerLine.index! * cellSize + cellSize / 2, y2: endOffset };
      case "diag-desc":
        return { x1: startOffset, y1: startOffset, x2: endOffset, y2: endOffset };
      case "diag-asc":
        return { x1: startOffset, y1: endOffset, x2: endOffset, y2: startOffset };
    }
  };

  const coords = getLineCoords();

  return (
    <div className="relative inline-block border-4 border-gray-800">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((cell, colIndex) => (
            <Cell key={colIndex} value={cell} onClick={() => onCellClick(rowIndex, colIndex)} />
          ))}
        </div>
      ))}

      {coords && (
        <motion.svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <motion.line
            x1={coords.x1}
            y1={coords.y1}
            x2={coords.x2}
            y2={coords.y2}
            stroke="red"
            strokeWidth={6}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, type: "spring", bounce: 0 }}
          />
        </motion.svg>
      )}
    </div>
  );
};

// ----------------------- GAME INFO -----------------------
interface GameInfoProps {
  currentPlayer: Player;
  gameStatus: GameStatus;
  onRestart: () => void;
}

const GameInfo: React.FC<GameInfoProps> = ({ currentPlayer, gameStatus, onRestart }) => (
  <div className="mt-6 text-center">
    {gameStatus === "ongoing" ? <h2 className="text-xl font-bold">Current Player: {currentPlayer}</h2> : <h2 className="text-xl font-bold">{gameStatus}</h2>}
    <button onClick={onRestart} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
      Restart Game
    </button>
  </div>
);

// ----------------------- GAME -----------------------
const BOARD_SIZE = 3;

const createEmptyBoard = (): Board =>
  Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(null));

const Game: React.FC = () => {
  const [board, setBoard] = useState<Board>(createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [gameStatus, setGameStatus] = useState<GameStatus>("ongoing");
  const [winnerLine, setWinnerLine] = useState<WinnerLine | undefined>();

  const checkWinner = (b: Board): { status: GameStatus; line?: WinnerLine } => {
    for (let i = 0; i < BOARD_SIZE; i++) {
      if (b[i][0] && b[i].every(c => c === b[i][0])) return { status: `${b[i][0]} wins` as GameStatus, line: { type: "row", index: i } };
      const col = [b[0][i], b[1][i], b[2][i]];
      if (col[0] && col.every(c => c === col[0])) return { status: `${col[0]} wins` as GameStatus, line: { type: "col", index: i } };
    }
    const diagDesc = [b[0][0], b[1][1], b[2][2]];
    if (diagDesc[0] && diagDesc.every(c => c === diagDesc[0])) return { status: `${diagDesc[0]} wins` as GameStatus, line: { type: "diag-desc" } };
    const diagAsc = [b[2][0], b[1][1], b[0][2]];
    if (diagAsc[0] && diagAsc.every(c => c === diagAsc[0])) return { status: `${diagAsc[0]} wins` as GameStatus, line: { type: "diag-asc" } };
    if (b.flat().every(c => c !== null)) return { status: "draw" };
    return { status: "ongoing" };
  };

  const handleCellClick = (row: number, col: number) => {
    if (board[row][col] || gameStatus !== "ongoing") return;
    const newBoard = board.map(r => r.slice());
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);

    const { status, line } = checkWinner(newBoard);
    setGameStatus(status);
    setWinnerLine(line);

    if (status === "ongoing") setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const handleRestart = () => {
    setBoard(createEmptyBoard());
    setCurrentPlayer("X");
    setGameStatus("ongoing");
    setWinnerLine(undefined);
  };

  return (
    <div className="text-center mt-12">
      <BoardComponent board={board} onCellClick={handleCellClick} winnerLine={winnerLine} />
      <GameInfo currentPlayer={currentPlayer} gameStatus={gameStatus} onRestart={handleRestart} />
    </div>
  );
};

// ----------------------- NEXT.JS PAGE -----------------------
export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mt-6">Tic Tac Toe</h1>
      <Game />
    </div>
  );
}
