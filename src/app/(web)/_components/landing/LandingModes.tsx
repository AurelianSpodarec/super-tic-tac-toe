import React from "react";

import GlassCard from "./GlassCard";
import NeonButton from "./NeonButton";

const modes = [
  {
    title: "Singleplayer",
    icon: "🤖",
    description: "Warm up against the AI and sharpen your openings.",
  },
  {
    title: "Shared screen",
    icon: "🕹️",
    description: "Two players, one screen. Clean, fast, and perfect for couch battles.",
  },
  {
    title: "Online multiplayer",
    icon: "🌐",
    description: "Create a private lobby, share a code, and play from anywhere.",
  },
  {
    title: "Leaderboard",
    icon: "🏆",
    description: "Track wins, time, and bragging rights with lightweight stats.",
  },
] as const;

export default function LandingModes() {
  return (
    <section id="modes" className="py-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h2 className="font-neontubes text-3xl md:text-4xl text-[#ef476f]">Play your way</h2>
            <p className="mt-2 text-sm text-gray-300 max-w-xl">
              Pick a vibe: solo practice, shared screen with a friend, or online multiplayer with lobbies.
            </p>
          </div>

          <div className="flex gap-3">
            <NeonButton href="/game">Launch the game</NeonButton>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {modes.map((m) => (
            <GlassCard key={m.title} className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-2xl">{m.icon}</div>
                  <div className="mt-3 font-semibold text-gray-100">{m.title}</div>
                </div>
                <div className="h-2 w-2 rounded-full bg-[#ef476f] shadow-[0_0_18px_rgba(239,71,111,0.6)]" />
              </div>
              <p className="mt-3 text-sm text-gray-300">{m.description}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
