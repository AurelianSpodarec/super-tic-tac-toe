'use client'

import type { LobbyPlayer } from "@/app/game/_engine/Multiplayer";

export default function PlayerCard({ player }: { player: LobbyPlayer }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={player.avatar} alt={player.name} className="w-11 h-11 rounded-full object-cover" />
      <div className="min-w-0">
        <div className="font-semibold truncate">{player.name}</div>
        <div className="text-xs text-gray-400">
          {player.role.toUpperCase()} · {player.symbol} · {player.ready ? "Ready" : "Not ready"}
        </div>
      </div>
      <div className="ml-auto">
        <span className={`text-xs font-bold ${player.ready ? "text-green-400" : "text-gray-500"}`}>
          {player.ready ? "READY" : "WAIT"}
        </span>
      </div>
    </div>
  );
}
