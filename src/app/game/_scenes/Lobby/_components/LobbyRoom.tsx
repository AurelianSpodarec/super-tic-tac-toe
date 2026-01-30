'use client'

import type { ChatMessage, GameMode, LobbyState, MultiplayerRole } from "@/app/game/_engine/Multiplayer";

import ChatPanel from "@/app/game/_components/ChatPanel";

import InviteCode from "./InviteCode";
import ModeSelector from "./ModeSelector";
import PlayerCard from "./PlayerCard";

export default function LobbyRoom({
  role,
  status,
  lobby,
  messages,
  onSelectMode,
  onToggleReady,
  onStart,
  onSendChat,
  onLeave,
}: {
  role: MultiplayerRole;
  status: string;
  lobby: LobbyState;
  messages: ChatMessage[];
  onSelectMode: (mode: GameMode) => void;
  onToggleReady: (ready: boolean) => void;
  onStart: () => void;
  onSendChat: (text: string) => void;
  onLeave: () => void;
}) {
  const me = lobby.players.find((p) => p.role === role);
  const bothReady = lobby.players.length === 2 && lobby.players.every((p) => p.ready);

  return (
    <div className="h-full pt-24 pb-10 px-6 max-w-5xl mx-auto w-full">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h2 className="font-neontubes text-3xl text-[#ef476f]">Lobby</h2>
          <div className="text-sm text-gray-400">Status: {status}</div>
        </div>

        <button
          type="button"
          onClick={onLeave}
          className="px-3 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-sm"
        >
          Leave
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
        <div className="space-y-4">
          {role === "host" && lobby.inviteCode ? <InviteCode code={lobby.inviteCode} /> : null}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {lobby.players.map((p) => (
              <PlayerCard key={p.role} player={p} />
            ))}
            {lobby.players.length < 2 ? (
              <div className="rounded-xl border border-dashed border-white/10 bg-white/5 p-4 text-sm text-gray-400 flex items-center justify-center">
                Waiting for friend…
              </div>
            ) : null}
          </div>

          <div className="flex flex-col md:flex-row md:items-end gap-4">
            <ModeSelector
              mode={lobby.selectedMode}
              disabled={role !== "host" || lobby.started}
              onChange={onSelectMode}
            />

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onToggleReady(!me?.ready)}
                className={`px-4 py-2 rounded-lg border text-sm ${me?.ready ? "border-green-500/40 bg-green-500/10" : "border-white/10 bg-white/10 hover:bg-white/15"}`}
              >
                {me?.ready ? "Unready" : "Ready"}
              </button>

              {role === "host" ? (
                <button
                  type="button"
                  onClick={onStart}
                  disabled={!bothReady}
                  className={`px-4 py-2 rounded-lg border text-sm ${bothReady ? "border-[#ef476f]/60 bg-[#ef476f]/20 hover:bg-[#ef476f]/25" : "border-white/10 bg-white/5 text-gray-500 cursor-not-allowed"}`}
                >
                  Start Game
                </button>
              ) : null}
            </div>
          </div>

          {lobby.started ? (
            <div className="text-sm text-gray-300">Starting…</div>
          ) : null}
        </div>

        <ChatPanel title="Lobby chat" messages={messages} onSend={onSendChat} />
      </div>

      <div className="text-xs text-gray-500 mt-6">
        Chat messages: {messages.length}
      </div>
    </div>
  );
}
