export const modes = [
  { id: "ticTacToe", label: "Tic Tac Toe" },
  { id: "ultimateTicTacToe", label: "Ultimate Tic TacToe" },
  { id: "challenges", label: "Challenges" }
];

export const playStyles = [
  { id: "singlePlayer", label: "Single Player", type: "submenu", modeIds: ["ticTacToe", "ultimateTicTacToe", "challenges"] },
  { id: "coOp", label: "Co-Op", type: "submenu", modeIds: ["ticTacToe", "ultimateTicTacToe"] },
  { id: "multiplayer", label: "Multiplayer", type: "submenu", modeIds: ["ticTacToe", "ultimateTicTacToe", "challenges"] }
];

export const menuExtras = [
  { id: "settings", label: "Settings", type: "submenu", options: ["Audio", "Sound"] },
  { id: "language", label: "Language 🌐", type: "submenu", options: ["EN", "ES", "PL", "IT"] },
  { id: "leaderboard", label: "Leaderboard", type: "action"},
  { id: "themes", label: "Themes", type: "action" },
];
