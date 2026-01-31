import React from "react";

import GlassCard from "./GlassCard";
import NeonButton from "./NeonButton";

export default function LandingFinalCta() {
  return (
    <section className="py-14">
      <div className="mx-auto max-w-6xl px-6">
        <GlassCard className="p-8 md:p-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="font-neontubes text-3xl md:text-4xl text-gray-100">Ready to run it back?</h2>
              <p className="mt-2 text-sm text-gray-300 max-w-xl">
                Jump into a quick match — solo, shared screen, or online multiplayer.
              </p>
            </div>
            <div className="flex gap-3">
              <NeonButton href="/game">Play now</NeonButton>
              <NeonButton href="#modes" variant="secondary">
                Modes
              </NeonButton>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
