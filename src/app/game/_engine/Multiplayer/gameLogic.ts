import type { GameMode, OnlineGameState, PlayerSymbol } from "./types";

export const BOARD_SIZE = 9;
export const WIN_COMBOS: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function emptyGameState(): OnlineGameState {
  return {
    board: Array(BOARD_SIZE).fill(""),
    currentPlayerIndex: 0,
    winner: null,
    winningLine: null,
    score: [0, 0],
  };
}

export function checkWinningLine(board: string[]): number[] | null {
  for (const combo of WIN_COMBOS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return combo;
  }
  return null;
}

export function opponentSymbol(symbol: PlayerSymbol): PlayerSymbol {
  return symbol === "X" ? "O" : "X";
}

export function applyMove(state: OnlineGameState, index: number, mode: GameMode): OnlineGameState | null {
  if (state.board[index] || state.winner) return null;

  const currentSymbol: PlayerSymbol = state.currentPlayerIndex === 0 ? "X" : "O";
  const nextBoard = [...state.board];
  nextBoard[index] = currentSymbol;

  const line = checkWinningLine(nextBoard);
  if (line) {
    const computedWinner: PlayerSymbol = mode === "misere" ? opponentSymbol(currentSymbol) : currentSymbol;
    const score = [...state.score] as [number, number];
    if (computedWinner === "X") score[0] += 1;
    else score[1] += 1;

    return {
      ...state,
      board: nextBoard,
      winner: computedWinner,
      winningLine: line,
      score,
    };
  }

  if (nextBoard.every(Boolean)) {
    return {
      ...state,
      board: nextBoard,
      winner: "draw",
      winningLine: null,
    };
  }

  return {
    ...state,
    board: nextBoard,
    currentPlayerIndex: 1 - state.currentPlayerIndex,
  };
}
