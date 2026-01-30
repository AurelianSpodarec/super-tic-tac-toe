"use client";

import { create } from "zustand";

import { PeerService, formatPeerError } from "./peerService";
import type {
  ChatMessage,
  ConnectionStatus,
  GameMode,
  LobbyPlayer,
  LobbyState,
  MultiplayerMessage,
  MultiplayerRole,
  OnlineGameState,
  PlayerSymbol,
} from "./types";

const BOARD_SIZE = 9;
const WIN_COMBOS: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function emptyGameState(): OnlineGameState {
  return {
    board: Array(BOARD_SIZE).fill(""),
    currentPlayerIndex: 0,
    winner: null,
    winningLine: null,
    score: [0, 0],
  };
}

function checkWinningLine(board: string[]): number[] | null {
  for (const combo of WIN_COMBOS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return combo;
  }
  return null;
}

function opponentSymbol(symbol: PlayerSymbol): PlayerSymbol {
  return symbol === "X" ? "O" : "X";
}

type MultiplayerStore = {
  status: ConnectionStatus;
  error: string | null;
  role: MultiplayerRole | null;

  peerId: string | null; // own peer ID
  hostPeerId: string | null; // invite code entered when joining

  lobby: LobbyState;
  game: OnlineGameState;
  chat: ChatMessage[];

  // One-shot flag used by Lobby scene to navigate into the match.
  pendingGameStart: boolean;

  createLobby: (args: { name: string; avatar: string }) => Promise<void>;
  joinLobby: (args: { inviteCode: string; name: string; avatar: string }) => Promise<void>;
  setReady: (ready: boolean) => void;
  selectMode: (mode: GameMode) => void;
  startGame: () => void;
  sendChat: (text: string) => void;
  sendMove: (index: number) => void;
  resetRound: () => void;
  resetToLobby: () => void;
  consumePendingGameStart: () => void;
  leave: () => void;

  // Internal helpers (not intended to be called by UI components directly)
  handleStatus: (status: string, err?: unknown) => void;
  handleMessage: (msg: MultiplayerMessage) => void;
  broadcastLobby: () => void;
  broadcastGame: () => void;
};

let service: PeerService | null = null;

function ensureFreshService(
  onMessage: (msg: MultiplayerMessage) => void,
  onStatus: (s: string, e?: unknown) => void
): PeerService {
  if (service) {
    // Update callbacks in case they changed (e.g., hot reload or re-render)
    service.updateCallbacks(onMessage, onStatus);
  } else {
    service = new PeerService(onMessage, onStatus);
  }
  return service;
}

function destroyService() {
  service?.destroy();
  service = null;
}

export const useMultiplayerStore = create<MultiplayerStore>((set, get) => ({
  status: "idle",
  error: null,
  role: null,

  peerId: null,
  hostPeerId: null,

  lobby: {
    inviteCode: null,
    selectedMode: "classic",
    players: [],
    started: false,
  },

  game: emptyGameState(),
  chat: [],
  pendingGameStart: false,

  createLobby: async ({ name, avatar }) => {
    // Destroy any previous connection before creating a new lobby
    destroyService();

    set({ status: "creating", error: null, role: "host", hostPeerId: null });

    const svc = ensureFreshService(
      (msg) => get().handleMessage(msg),
      (status, err) => get().handleStatus(status, err)
    );

    try {
      const { peerId } = await svc.createHost();
      const hostPlayer: LobbyPlayer = {
        role: "host",
        name,
        avatar,
        symbol: "X",
        ready: false,
      };

      set({
        peerId,
        lobby: {
          inviteCode: peerId,
          selectedMode: "classic",
          players: [hostPlayer],
          started: false,
        },
        game: emptyGameState(),
        chat: [],
        pendingGameStart: false,
        status: "waiting",
      });
    } catch {
      set({ status: "error", error: "Failed to create lobby." });
    }
  },

  joinLobby: async ({ inviteCode, name, avatar }) => {
    // Destroy any previous connection before joining
    destroyService();

    set({ status: "joining", error: null, role: "guest", hostPeerId: inviteCode });

    const svc = ensureFreshService(
      (msg) => get().handleMessage(msg),
      (status, err) => get().handleStatus(status, err)
    );

    try {
      await svc.connectToHost(inviteCode);
      svc.send({ type: "PLAYER_JOIN", name, avatar });
    } catch (err) {
      set({ status: "error", error: formatPeerError(err) });
    }
  },

  setReady: (ready) => {
    const { role } = get();
    if (!role) return;

    const lobby = { ...get().lobby };
    lobby.players = lobby.players.map((p) => (p.role === role ? { ...p, ready } : p));

    set({ lobby });

    const svc = service;
    if (!svc) return;

    if (role === "host") {
      // Host is authoritative: update and broadcast full lobby state.
      get().broadcastLobby();
    } else {
      svc.send({ type: "PLAYER_READY", ready });
    }
  },

  selectMode: (mode) => {
    if (get().role !== "host") return;

    set({ lobby: { ...get().lobby, selectedMode: mode } });
    get().broadcastLobby();
  },

  startGame: () => {
    if (get().role !== "host") return;

    const lobby = get().lobby;
    const bothReady = lobby.players.length === 2 && lobby.players.every((p) => p.ready);
    if (!bothReady) return;

    set({
      lobby: { ...lobby, started: true },
      game: emptyGameState(),
      pendingGameStart: true,
    });

    service?.send({ type: "GAME_START" });
    get().broadcastLobby();
    get().broadcastGame();
  },

  sendChat: (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const role = get().role;
    const sender = role ? get().lobby.players.find((p) => p.role === role)?.name ?? role : "unknown";

    const msg: ChatMessage = {
      id: createId(),
      sender,
      text: trimmed,
      timestamp: Date.now(),
    };

    set({ chat: [...get().chat, msg] });

    service?.send({ type: "CHAT", ...msg });
  },

  sendMove: (index) => {
    const { role, lobby, game } = get();
    if (!role || !lobby.started) return;
    if (game.winner) return;

    const mySymbol: PlayerSymbol = role === "host" ? "X" : "O";
    const expectedSymbol: PlayerSymbol = game.currentPlayerIndex === 0 ? "X" : "O";
    if (mySymbol !== expectedSymbol) return;

    if (role === "host") {
      // Host is authoritative: apply and broadcast.
      const next = applyMove(game, index, lobby.selectedMode);
      if (!next) return;

      set({ game: next });
      get().broadcastGame();
    } else {
      service?.send({ type: "MOVE", index });
    }
  },

  resetRound: () => {
    if (get().role !== "host") return;

    const prev = get().game;
    const next: OnlineGameState = {
      board: Array(BOARD_SIZE).fill(""),
      currentPlayerIndex: 0,
      winner: null,
      winningLine: null,
      score: prev.score,
    };

    set({ game: next });
    get().broadcastGame();
  },

  resetToLobby: () => {
    set({
      lobby: { ...get().lobby, started: false, players: get().lobby.players.map((p) => ({ ...p, ready: false })) },
      game: emptyGameState(),
      pendingGameStart: false,
    });

    if (get().role === "host") {
      get().broadcastLobby();
      get().broadcastGame();
    }
  },

  consumePendingGameStart: () => {
    if (!get().pendingGameStart) return;
    set({ pendingGameStart: false });
  },

  leave: () => {
    service?.send({ type: "LEAVE" });
    service?.destroy();
    service = null;

    set({
      status: "idle",
      error: null,
      role: null,
      peerId: null,
      hostPeerId: null,
      lobby: { inviteCode: null, selectedMode: "classic", players: [], started: false },
      game: emptyGameState(),
      chat: [],
      pendingGameStart: false,
    });
  },

  // Internal handlers (kept inside store for easy closure access)
  handleStatus: (status: string, err?: unknown) => {
    if (status === "connected") {
      set({ status: "connected", error: null });
      if (get().role === "host") {
        // When the guest connects, broadcast current lobby/game state.
        get().broadcastLobby();
        get().broadcastGame();
      }
      return;
    }

    if (status === "disconnected") {
      set({ status: "idle" });
      return;
    }

    if (status === "error") {
      set({ status: "error", error: formatPeerError(err) });
    }
  },

  handleMessage: (msg: MultiplayerMessage) => {
    const { role } = get();

    if (msg.type === "CHAT") {
      set({ chat: [...get().chat, { id: msg.id, sender: msg.sender, text: msg.text, timestamp: msg.timestamp }] });
      return;
    }

    if (msg.type === "LEAVE") {
      // Remote left: keep host lobby open, but clear guest.
      if (role === "host") {
        const lobby = get().lobby;
        set({
          lobby: { ...lobby, players: lobby.players.filter((p) => p.role !== "guest"), started: false },
          game: emptyGameState(),
        });
        get().broadcastLobby();
        get().broadcastGame();
      } else {
        get().leave();
      }
      return;
    }

    if (role === "host") {
      handleAsHost(msg, set, get);
      return;
    }

    handleAsGuest(msg, set, get);
  },

  broadcastLobby: () => {
    if (get().role !== "host") return;
    service?.send({ type: "LOBBY_STATE", lobby: get().lobby });
  },

  broadcastGame: () => {
    if (get().role !== "host") return;
    service?.send({ type: "GAME_STATE", game: get().game });
  },
}));

// ----------------- Host/Guest message handling -----------------

function handleAsHost(
  msg: MultiplayerMessage,
  set: (partial: Partial<MultiplayerStore>) => void,
  get: () => MultiplayerStore
) {
  if (msg.type === "PLAYER_JOIN") {
    const lobby = get().lobby;

    // Host already exists. Add guest.
    const guest: LobbyPlayer = {
      role: "guest",
      name: msg.name,
      avatar: msg.avatar,
      symbol: "O",
      ready: false,
    };

    const players = [...lobby.players.filter((p) => p.role !== "guest"), guest];

    set({ lobby: { ...lobby, players } });
    get().broadcastLobby();
    return;
  }

  if (msg.type === "PLAYER_READY") {
    const lobby = get().lobby;
    set({ lobby: { ...lobby, players: lobby.players.map((p) => (p.role === "guest" ? { ...p, ready: msg.ready } : p)) } });
    get().broadcastLobby();
    return;
  }

  if (msg.type === "MOVE") {
    const lobby = get().lobby;
    if (!lobby.started) return;

    const next = applyMove(get().game, msg.index, lobby.selectedMode);
    if (!next) return;

    set({ game: next });
    get().broadcastGame();
    return;
  }
}

function handleAsGuest(
  msg: MultiplayerMessage,
  set: (partial: Partial<MultiplayerStore>) => void,
  _get: () => MultiplayerStore
) {
  if (msg.type === "LOBBY_STATE") {
    const prevStarted = _get().lobby.started;
    set({ lobby: msg.lobby });

    // If we get a lobby snapshot that indicates a match is in progress, navigate into it once.
    if (!prevStarted && msg.lobby.started) {
      set({ pendingGameStart: true });
    }

    return;
  }

  if (msg.type === "GAME_STATE") {
    set({ game: msg.game });
    return;
  }

  if (msg.type === "GAME_START") {
    set({ lobby: { ..._get().lobby, started: true }, pendingGameStart: true });
    return;
  }
}

function applyMove(state: OnlineGameState, index: number, mode: GameMode): OnlineGameState | null {
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
