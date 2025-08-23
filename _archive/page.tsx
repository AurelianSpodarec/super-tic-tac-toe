import Menu from "./_components/Menu";

interface GameStore {
  ui: {
    language: string;
    theme: string;
    audio: { master: number; music: number; sfx: number };
  };
  player: { name: string; bestScores: Record<string, number> };
  game: { mode?: string; score: number; level: number };
  leaderboard: Record<string, { name: string; score: number }[]>;
  setLanguage: (lang: string) => void;
  setAudio: (volume: Partial<{ master: number; music: number; sfx: number }>) => void;
  updateScore: (score: number) => void;
}



function Page() {
  return (
    <div className="h-full w-full" style={{ backgroundImage: "url('https://assets.grok.com/users/0edd0c0d-f3a0-494b-9d5d-f366b8b153a6/generated/fad0a09a-5567-4ea0-8728-3f25284245af/image.jpg')"}}>
      <Menu />
    </div>
  );
}

export default Page;


// GAME LOGIC
// "use client";

// import { useState, useCallback } from "react";
// import { motion, Variants } from "motion/react";

// // ----------------------- TYPES -----------------------
// type Player = "X" | "O";
// type CellValue = Player | null;
// type Board = CellValue[][];
// type SmallBoard = Board;
// type SuperBoard = SmallBoard[][];
// type BoardStatus = "ongoing" | Player | "draw";
// type GameMode = "normal" | "super";

// interface WinnerLine {
//   type: "row" | "col" | "diag-desc" | "diag-asc";
//   index?: number;
// }

// // ----------------------- MOTION VARIANTS -----------------------
// const draw: Variants = {
//   hidden: { pathLength: 0, opacity: 0 },
//   visible: (i: number) => ({
//     pathLength: 1,
//     opacity: 1,
//     transition: {
//       pathLength: { delay: i * 0.3, type: "spring", duration: 1.5, bounce: 0 },
//       opacity: { delay: i * 0.1, duration: 0.01 },
//     },
//   }),
// };

// // ----------------------- CELL -----------------------
// interface CellProps {
//   value: CellValue;
//   onClick: () => void;
//   size?: number;
// }

// const Cell: React.FC<CellProps> = ({ value, onClick, size = 64 }) => (
//   <div style={{ width: size, height: size, padding: 2 }}>
//     <motion.div className="w-full h-full cursor-pointer relative" onClick={onClick}>
//       {value === "O" && (
//         <motion.svg viewBox="0 0 100 100" className="w-full h-full" initial="hidden" animate="visible">
//           <motion.circle
//             cx="50"
//             cy="50"
//             r="40"
//             stroke="#3b82f6"
//             strokeWidth={8}
//             fill="transparent"
//             variants={draw}
//             custom={1}
//             style={{ strokeLinecap: "round" }}
//           />
//         </motion.svg>
//       )}
//       {value === "X" && (
//         <motion.svg viewBox="0 0 100 100" className="w-full h-full" initial="hidden" animate="visible">
//           <motion.line
//             x1="20"
//             y1="20"
//             x2="80"
//             y2="80"
//             stroke="#ef4444"
//             strokeWidth={8}
//             variants={draw}
//             custom={1}
//             style={{ strokeLinecap: "round" }}
//           />
//           <motion.line
//             x1="20"
//             y1="80"
//             x2="80"
//             y2="20"
//             stroke="#ef4444"
//             strokeWidth={8}
//             variants={draw}
//             custom={1.5}
//             style={{ strokeLinecap: "round" }}
//           />
//         </motion.svg>
//       )}
//     </motion.div>
//   </div>
// );

// // ----------------------- BOARD -----------------------
// interface BoardProps {
//   board: Board;
//   onCellClick: (row: number, col: number) => void;
//   winnerLine?: WinnerLine;
//   overlayWinner?: CellValue;
//   onOverlayFinished?: () => void;
//   size?: number;
// }

// const BoardComponent: React.FC<BoardProps> = ({ board, onCellClick, winnerLine, overlayWinner, onOverlayFinished, size = 64 }) => {
//   const cellSize = size;
//   const padding = 10;
//   const boardSize = board.length * cellSize;

//   const getLineCoords = () => {
//     if (!winnerLine) return null;
//     const startOffset = padding + cellSize / 2;
//     const endOffset = boardSize - padding - cellSize / 2;

//     switch (winnerLine.type) {
//       case "row":
//         return { x1: startOffset, y1: winnerLine.index! * cellSize + cellSize / 2, x2: endOffset, y2: winnerLine.index! * cellSize + cellSize / 2 };
//       case "col":
//         return { x1: winnerLine.index! * cellSize + cellSize / 2, y1: startOffset, x2: winnerLine.index! * cellSize + cellSize / 2, y2: endOffset };
//       case "diag-desc":
//         return { x1: startOffset, y1: startOffset, x2: endOffset, y2: endOffset };
//       case "diag-asc":
//         return { x1: startOffset, y1: endOffset, x2: endOffset, y2: startOffset };
//     }
//   };

//   const coords = getLineCoords();

//   return (
//     <div className="relative inline-block border-2 border-gray-800" style={{ width: boardSize, height: boardSize }}>
//       {board.map((row, rowIndex) => (
//         <div key={rowIndex} className="flex">
//           {row.map((cell, colIndex) => (
//             <Cell key={colIndex} value={cell} onClick={() => onCellClick(rowIndex, colIndex)} size={cellSize} />
//           ))}
//         </div>
//       ))}

//       {coords && (
//         <motion.svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
//           <motion.line
//             x1={coords.x1}
//             y1={coords.y1}
//             x2={coords.x2}
//             y2={coords.y2}
//             stroke="red"
//             strokeWidth={6}
//             strokeLinecap="round"
//             initial={{ pathLength: 0 }}
//             animate={{ pathLength: 1 }}
//             transition={{ duration: 1.2, type: "spring", bounce: 0 }}
//           />
//         </motion.svg>
//       )}

//       {overlayWinner && overlayWinner !== "ongoing" && overlayWinner !== "draw" && (
//         <motion.div
//           className="absolute inset-0 flex items-center justify-center pointer-events-none"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1.3 }}
//           onAnimationComplete={onOverlayFinished}
//         >
//           <Cell value={overlayWinner} onClick={() => {}} size={cellSize} />
//         </motion.div>
//       )}
//     </div>
//   );
// };

// // ----------------------- GAME INFO -----------------------
// interface GameInfoProps {
//   currentPlayer: Player;
//   gameStatus: BoardStatus;
//   onRestart: () => void;
// }

// const GameInfo: React.FC<GameInfoProps> = ({ currentPlayer, gameStatus, onRestart }) => (
//   <div className="mt-6 text-center">
//     {gameStatus === "ongoing" ? <h2 className="text-xl font-bold">Current Player: {currentPlayer}</h2> : <h2 className="text-xl font-bold">{gameStatus}!</h2>}
//     <button onClick={onRestart} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
//       Restart Game
//     </button>
//   </div>
// );

// // ----------------------- HOOK -----------------------
// const BOARD_SIZE = 3;

// const useTicTacToe = (mode: GameMode = "normal") => {
//   const createEmptyBoard = () => Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(null));

//   const [currentPlayer, setCurrentPlayer] = useState<Player>("X");

//   const [board, setBoard] = useState<Board>(createEmptyBoard());
//   const [gameStatus, setGameStatus] = useState<BoardStatus>("ongoing");
//   const [winnerLine, setWinnerLine] = useState<WinnerLine | undefined>();

//   const [superBoard, setSuperBoard] = useState<SuperBoard>(
//     Array.from({ length: BOARD_SIZE }, () =>
//       Array.from({ length: BOARD_SIZE }, () => createEmptyBoard())
//     )
//   );
//   const [activeBoard, setActiveBoard] = useState<{ row: number; col: number } | null>(null);
//   const [smallBoardStatus, setSmallBoardStatus] = useState<BoardStatus[][]>(
//     Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill("ongoing"))
//   );
//   const [smallBoardWinnerLine, setSmallBoardWinnerLine] = useState<(WinnerLine | undefined)[][]>(
//     Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(undefined))
//   );
//   const [finishedSmallBoards, setFinishedSmallBoards] = useState<boolean[][]>(
//     Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(false))
//   );
//   const [mainBoardStatus, setMainBoardStatus] = useState<BoardStatus>("ongoing");

//   const checkWinner = useCallback((b: (CellValue | BoardStatus)[][]): { status: BoardStatus; line?: WinnerLine } => {
//     for (let i = 0; i < BOARD_SIZE; i++) {
//       if (b[i][0] && b[i].every(c => c === b[i][0])) return { status: b[i][0] as BoardStatus, line: { type: "row", index: i } };
//       const col = [b[0][i], b[1][i], b[2][i]];
//       if (col[0] && col.every(c => c === col[0])) return { status: col[0] as BoardStatus, line: { type: "col", index: i } };
//     }
//     const diagDesc = [b[0][0], b[1][1], b[2][2]];
//     if (diagDesc[0] && diagDesc.every(c => c === diagDesc[0])) return { status: diagDesc[0] as BoardStatus, line: { type: "diag-desc" } };
//     const diagAsc = [b[2][0], b[1][1], b[0][2]];
//     if (diagAsc[0] && diagAsc.every(c => c === diagAsc[0])) return { status: diagAsc[0] as BoardStatus, line: { type: "diag-asc" } };
//     if (b.flat().every(c => c !== null)) return { status: "draw" };
//     return { status: "ongoing" };
//   }, []);

//   const handleNormalCellClick = (row: number, col: number) => {
//     if (board[row][col] || gameStatus !== "ongoing") return;
//     const newBoard = board.map(r => r.slice());
//     newBoard[row][col] = currentPlayer;
//     setBoard(newBoard);

//     const { status, line } = checkWinner(newBoard);
//     setGameStatus(status);
//     setWinnerLine(line);

//     if (status === "ongoing") setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
//   };

//   const handleSuperCellClick = (bigRow: number, bigCol: number, row: number, col: number) => {
//     if (mainBoardStatus !== "ongoing") return;
//     if (activeBoard && !(activeBoard.row === bigRow && activeBoard.col === bigCol)) return;
//     if (superBoard[bigRow][bigCol][row][col]) return;

//     const newSuperBoard = superBoard.map((br, i) =>
//       br.map((bc, j) => {
//         if (i === bigRow && j === bigCol) {
//           const newSmall = bc.map(r => r.slice());
//           newSmall[row][col] = currentPlayer;
//           return newSmall;
//         }
//         return bc;
//       })
//     );
//     setSuperBoard(newSuperBoard);

//     // Check small board winner
//     const { status: smallWinner, line: smallLine } = checkWinner(newSuperBoard[bigRow][bigCol]);
//     const newSmallStatus = smallBoardStatus.map(r => r.slice());
//     newSmallStatus[bigRow][bigCol] = smallWinner;
//     setSmallBoardStatus(newSmallStatus);

//     const newSmallLines = smallBoardWinnerLine.map(r => r.slice());
//     newSmallLines[bigRow][bigCol] = smallLine;
//     setSmallBoardWinnerLine(newSmallLines);

//     const newFinished = finishedSmallBoards.map(r => r.slice());
//     if (smallWinner !== "ongoing" && smallWinner !== "draw") {
//       newFinished[bigRow][bigCol] = false; // will become true after animation
//     }
//     setFinishedSmallBoards(newFinished);

//     // Check main board winner
//     const { status: mainWinner } = checkWinner(newSmallStatus);
//     setMainBoardStatus(mainWinner);

//     // Next active board
//     if (newSmallStatus[row][col] === "ongoing") setActiveBoard({ row, col });
//     else setActiveBoard(null);

//     setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
//   };

//   const markSmallBoardFinished = (bigRow: number, bigCol: number) => {
//     const newFinished = finishedSmallBoards.map(r => r.slice());
//     newFinished[bigRow][bigCol] = true;
//     setFinishedSmallBoards(newFinished);
//   };

//   const handleRestart = () => {
//     setBoard(createEmptyBoard());
//     setSuperBoard(Array.from({ length: BOARD_SIZE }, () =>
//       Array.from({ length: BOARD_SIZE }, () => createEmptyBoard())
//     ));
//     setCurrentPlayer("X");
//     setGameStatus("ongoing");
//     setWinnerLine(undefined);
//     setSmallBoardStatus(Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill("ongoing")));
//     setSmallBoardWinnerLine(Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(undefined)));
//     setFinishedSmallBoards(Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(false)));
//     setMainBoardStatus("ongoing");
//     setActiveBoard(null);
//   };

//   return {
//     currentPlayer,
//     mode,
//     board,
//     gameStatus,
//     winnerLine,
//     superBoard,
//     smallBoardStatus,
//     smallBoardWinnerLine,
//     finishedSmallBoards,
//     mainBoardStatus,
//     activeBoard,
//     handleNormalCellClick,
//     handleSuperCellClick,
//     markSmallBoardFinished,
//     handleRestart
//   };
// };

// // ----------------------- GAME COMPONENT -----------------------
// const Game: React.FC = () => {
//   const [mode, setMode] = useState<GameMode>("normal");
//   const {
//     currentPlayer,
//     board,
//     gameStatus,
//     winnerLine,
//     superBoard,
//     smallBoardStatus,
//     smallBoardWinnerLine,
//     finishedSmallBoards,
//     mainBoardStatus,
//     activeBoard,
//     handleNormalCellClick,
//     handleSuperCellClick,
//     markSmallBoardFinished,
//     handleRestart
//   } = useTicTacToe(mode);

//   const allFinished = finishedSmallBoards.flat().every((f, i) => {
//     const row = Math.floor(i / BOARD_SIZE);
//     const col = i % BOARD_SIZE;
//     return smallBoardStatus[row][col] === "ongoing" || f;
//   });

//   return (
//     <div className="text-center mt-12">
//       <div className="mb-4">
//         <button onClick={() => setMode("normal")} className={`px-4 py-2 mr-2 rounded ${mode === "normal" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>Normal</button>
//         <button onClick={() => setMode("super")} className={`px-4 py-2 rounded ${mode === "super" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>Super</button>
//       </div>

//       {mode === "normal" && (
//         <>
//           <BoardComponent board={board} onCellClick={handleNormalCellClick} winnerLine={winnerLine} />
//           <GameInfo currentPlayer={currentPlayer} gameStatus={gameStatus} onRestart={handleRestart} />
//         </>
//       )}

//       {mode === "super" && (
//         <>
//           <div className="relative">
//             <div className="grid grid-cols-3 gap-2">
//               {superBoard.map((row, bigRow) =>
//                 row.map((small, bigCol) => (
//                   <div key={`${bigRow}-${bigCol}`} className="relative border-2" style={{ borderColor: activeBoard?.row === bigRow && activeBoard?.col === bigCol ? '#3b82f6' : '#9ca3af' }}>
//                     <BoardComponent
//                       board={small}
//                       onCellClick={(r,c) => handleSuperCellClick(bigRow,bigCol,r,c)}
//                       winnerLine={smallBoardWinnerLine[bigRow][bigCol]}
//                       overlayWinner={smallBoardStatus[bigRow][bigCol] !== "ongoing" && smallBoardStatus[bigRow][bigCol] !== "draw" ? smallBoardStatus[bigRow][bigCol] : undefined}
//                       onOverlayFinished={() => markSmallBoardFinished(bigRow,bigCol)}
//                     />
//                   </div>
//                 ))
//               )}
//             </div>

//             {mainBoardStatus !== "ongoing" && mainBoardStatus !== "draw" && allFinished && (
//               <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
//                 <Cell value={mainBoardStatus} onClick={() => {}} size={64*BOARD_SIZE*3} />
//               </div>
//             )}
//           </div>
//           <GameInfo currentPlayer={currentPlayer} gameStatus={mainBoardStatus} onRestart={handleRestart} />
//         </>
//       )}
//     </div>
//   );
// };

// // ----------------------- PAGE -----------------------
// export default function Home() {
//   return (
//     <div className="flex flex-col items-center">
//       <h1 className="text-3xl font-bold mt-6">Tic Tac Toe</h1>
//       <Game />
//     </div>
//   );
// }


// app/mode-selection/page.tsx (Next.js 13+ app router)
// "use client";

// import { useState } from "react";

// const data = {
//   "screen": "ModeSelection",
//   "title": "Choose Your Mode",
//   "subtitle": "Pick a challenge style",
//   "sections": [
//     {
//       "name": "Standard Modes",
//       "modes": [
//         {
//           "id": "tic_tac_toe",
//           "title": "Tic Tac Toe",
//           "description": "Grid 3x3 classic mode",
//           "icon": "⭕❌",
//           "playStyles": ["Single Player", "Multiplayer", "Co-Op"]
//         },
//         {
//           "id": "super_tic_tac_toe",
//           "title": "Super Tic Tac Toe",
//           "description": "Board inside a board",
//           "icon": "🟦",
//           "playStyles": ["Single Player", "Multiplayer", "Co-Op"]
//         },
//         {
//           "id": "tic_tac_ku",
//           "title": "Tic Tac Ku",
//           "description": "Puzzle-style hybrid",
//           "icon": "🔢",
//           "playStyles": ["Single Player", "Multiplayer", "Co-Op"]
//         }
//       ]
//     },
//     {
//       "name": "Challenge Modes",
//       "modes": [
//         {
//           "id": "non_standard",
//           "title": "Non-Standard",
//           "description": "Weird asymmetric rules (e.g. 100 pawns vs 10 rocks)",
//           "icon": "⚔️"
//         },
//         {
//           "id": "fast_cognitive_load",
//           "title": "Fast Cognitive Load",
//           "description": "Tap fastest across all boards (timed mode)",
//           "icon": "⚡"
//         }
//       ]
//     }
//   ]
// }


// export default function ModeSelectionPage() {
//   const [selectedMode, setSelectedMode] = useState<any>(null);

//   return (
//     <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center py-10 px-4">
//       <h1 className="text-3xl font-bold">{data.title}</h1>
//       <p className="text-gray-400 mb-8">{data.subtitle}</p>

//       {!selectedMode ? (
//         <div className="w-full max-w-3xl space-y-10">
//           {data.sections.map((section) => (
//             <div key={section.name}>
//               <h2 className="text-xl font-semibold mb-4">{section.name}</h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 {section.modes.map((mode) => (
//                   <button
//                     key={mode.id}
//                     onClick={() => setSelectedMode(mode)}
//                     className="bg-gray-800 rounded-2xl p-6 shadow-md hover:bg-gray-700 transition flex flex-col items-center"
//                   >
//                     <div className="text-3xl mb-2">{mode.icon}</div>
//                     <h3 className="font-bold text-lg">{mode.title}</h3>
//                     <p className="text-sm text-gray-400 text-center">
//                       {mode.description}
//                     </p>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="w-full max-w-md bg-gray-900 rounded-2xl p-6 text-center">
//           <button
//             onClick={() => setSelectedMode(null)}
//             className="text-sm text-blue-400 mb-4 hover:underline"
//           >
//             ← Back to Modes
//           </button>
//           <div className="text-4xl mb-2">{selectedMode.icon}</div>
//           <h2 className="text-2xl font-bold">{selectedMode.title}</h2>
//           <p className="text-gray-400 mb-6">{selectedMode.description}</p>

//           <h3 className="text-lg font-semibold mb-3">Choose Play Style</h3>
//           <div className="grid grid-cols-1 gap-3">
//             {selectedMode.playStyles.map((style: string) => (
//               <button
//                 key={style}
//                 className="bg-blue-600 hover:bg-blue-500 rounded-xl py-3 font-semibold shadow-md"
//               >
//                 {style}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

