import React from "react";

import GlassCard from "./GlassCard";

const features = [
  {
    title: "Neon-first UI",
    description:
      "Dark, high-contrast visuals with subtle glows — inspired by the in-game menu and arcade signage.",
  },
  {
    title: "More than one ruleset",
    description: "Classic when you want the timeless game. Misere when you want the mind games.",
  },
  {
    title: "Quick lobbies",
    description: "Online multiplayer uses simple invite codes so you can get into a match fast.",
  },
] as const;

export default function LandingFeatures() {
  return (
    <section className="py-14">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-neontubes text-3xl md:text-4xl text-[#ef476f]">Built for quick, replayable rounds</h2>
        <p className="mt-2 text-sm text-gray-300 max-w-2xl">
          This isn’t a massive RPG — it’s a tight little strategy loop with style. Hit play, lock in, run it back.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((f) => (
            <GlassCard key={f.title} className="p-6">
              <div className="text-lg font-semibold text-gray-100">{f.title}</div>
              <p className="mt-2 text-sm text-gray-300">{f.description}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
