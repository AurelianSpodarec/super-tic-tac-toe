import React from "react";

import GlassCard from "./GlassCard";

export default function LandingPreview() {
  return (
    <section className="py-14">
      <div className="mx-auto max-w-6xl px-6">
        <GlassCard className="overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
            <div
              className="min-h-[260px] lg:min-h-[340px] bg-cover bg-center opacity-90"
              style={{ backgroundImage: "url(/images/music-bg.jpg)" }}
            />

            <div className="p-6 lg:p-8">
              <div className="text-xs text-gray-400">Preview</div>
              <h3 className="mt-3 font-neontubes text-3xl text-gray-100">Neon grid. Crisp feedback.</h3>
              <p className="mt-3 text-sm text-gray-300">
                Drop in a screenshot later — for now this is a placeholder that matches the game’s vibe.
              </p>

              <ul className="mt-6 space-y-2 text-sm text-gray-300">
                <li>• Smooth animations and subtle glows</li>
                <li>• Minimal UI clutter</li>
                <li>• Optimized for quick rematches</li>
              </ul>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
