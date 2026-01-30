export type ConnectionStatus =
  | "idle"
  | "creating"
  | "joining"
  | "waiting"
  | "connecting"
  | "connected"
  | "error";

export type MultiplayerRole = "host" | "guest";

export type GameMode = "classic" | "misere";

export type PlayerSymbol = "X" | "O";

export type LobbyPlayer = {
  role: MultiplayerRole;
  name: string;
  avatar: string;
  symbol: PlayerSymbol;
  ready: boolean;
};

export type ChatMessage = {
  id: string;
  sender: string;
  text: string;
  timestamp: number;
};

export type OnlineGameState = {
  board: string[];
  currentPlayerIndex: number;
  winner: PlayerSymbol | "draw" | null;
  winningLine: number[] | null;
  score: [number, number];
};

export type LobbyState = {
  inviteCode: string | null;
  selectedMode: GameMode;
  players: LobbyPlayer[];
  started: boolean;
};

export type MultiplayerMessage =
  | {
      type: "PLAYER_JOIN";
      name: string;
      avatar: string;
    }
  | {
      type: "PLAYER_READY";
      ready: boolean;
    }
  | {
      type: "MODE_SELECT";
      mode: GameMode;
    }
  | {
      type: "LOBBY_STATE";
      lobby: LobbyState;
    }
  | {
      type: "GAME_START";
    }
  | {
      type: "MOVE";
      index: number;
    }
  | {
      type: "GAME_STATE";
      game: OnlineGameState;
    }
  | {
      type: "CHAT";
      id: string;
      sender: string;
      text: string;
      timestamp: number;
    }
  | {
      type: "LEAVE";
    };
