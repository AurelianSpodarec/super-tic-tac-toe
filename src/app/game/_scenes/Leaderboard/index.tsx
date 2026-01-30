'use client'

import { useEffect, useState } from "react";
import { clearLeaderboard, getLeaderboard, type LeaderboardResult } from "@/app/game/_engine/leaderboard";

function SceneLeaderboard() {
  const [items, setItems] = useState<LeaderboardResult[]>([]);

  const reload = () => setItems(getLeaderboard());

  useEffect(() => {
    reload();
  }, []);

  return (
    <section className="h-full w-full flex flex-col items-center py-20 px-6">
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-bold text-2xl">Leaderboard</h1>
          <div className="flex gap-2">
            <button
              type="button"
              className="px-3 py-1.5 rounded-md border border-white/20 hover:border-white/40"
              onClick={reload}
            >
              Refresh
            </button>
            <button
              type="button"
              className="px-3 py-1.5 rounded-md border border-white/20 hover:border-white/40"
              onClick={() => {
                clearLeaderboard();
                reload();
              }}
            >
              Clear
            </button>
          </div>
        </div>

        {items.length === 0 ? (
          <p className="text-gray-300">No games recorded yet. Play a round to get started.</p>
        ) : (
          <ol className="space-y-2">
            {items.map((it) => (
              <li key={it.id} className="rounded-lg border border-white/10 bg-black/30 px-4 py-3">
                <div className="flex items-center justify-between gap-4">
                  <div className="font-semibold text-white">
                    {it.winner === "draw" ? "Draw" : `Winner: ${it.winner}`}
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(it.createdAt).toLocaleString()}
                  </div>
                </div>
                <div className="mt-1 text-sm text-gray-300 flex flex-wrap gap-x-4 gap-y-1">
                  <span>Mode: {it.mode}</span>
                  <span>Vs: {it.vs}</span>
                  <span>Time: {it.durationSeconds}s</span>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}

export default SceneLeaderboard
