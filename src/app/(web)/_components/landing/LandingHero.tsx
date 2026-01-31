import React from "react";

import NeonButton from "./NeonButton";

export default function LandingHero() {
  return (
    <section className="pt-28 pb-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs text-gray-300 backdrop-blur">
            <span className="neon2 text-[#ef476f]">Neon jazz</span>
            <span className="text-gray-500">•</span>
            <span>Classic + Misere</span>
            <span className="text-gray-500">•</span>
            <span>Shared screen + Online multiplayer</span>
          </div>

          <h1 className="mt-8 font-neontubes text-5xl md:text-7xl leading-[0.95] neon-logo-2">
            Step Up to the Jazzy Board
          </h1>

          <p className="mt-6 text-base md:text-lg text-gray-200 max-w-2xl mx-auto">
            A modern, neon-lit Tic Tac Toe experience. Quick rounds, slick visuals, and just enough jazz to keep it
            dangerous.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <NeonButton href="/game">Play now</NeonButton>
            <NeonButton href="#modes" variant="secondary">
              Explore modes
            </NeonButton>
          </div>

          <div className="mt-8 text-xs text-gray-400">
            Tip: if you’re on desktop, try fullscreen for the full arcade vibe.
          </div>
        </div>
      </div>
    </section>
  );
}
