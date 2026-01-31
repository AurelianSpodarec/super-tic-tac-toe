import React from "react";

import GlassCard from "./GlassCard";

const faqs = [
  {
    q: "How do I play?",
    a: "Pick a mode, pick a ruleset (Classic or Misere), and start placing Xs and Os. First to 3 in a row wins (unless you’re playing Misere).",
  },
  {
    q: "Can I play online?",
    a: "Yes — create a lobby, copy the invite code, and have a friend join. Perfect for quick private matches.",
  },
  {
    q: "Is it free?",
    a: "Yep. No sign-up required for local play, and online uses lightweight lobbies.",
  },
] as const;

export default function LandingFaq() {
  return (
    <section id="faq" className="py-14">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-neontubes text-3xl md:text-4xl text-[#ef476f]">FAQ</h2>
        <p className="mt-2 text-sm text-gray-300">Quick answers before you hit play.</p>

        <div className="mt-8 grid grid-cols-1 gap-3">
          {faqs.map((f) => (
            <GlassCard key={f.q} className="p-5">
              <details className="group">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold text-gray-100">{f.q}</span>
                  <span className="text-gray-400 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm text-gray-300">{f.a}</p>
              </details>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
