import Link from "next/link";
import React from "react";

import NeonButton from "./NeonButton";

export default function LandingNav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-20">
      <div className="mx-auto max-w-6xl px-6 pt-6">
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-xl">
          <Link href="/" className="font-neontubes text-xl text-[#ef476f] neon2">
            JazzTacToe
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs text-gray-300">
            <a href="#modes" className="hover:text-gray-100 transition">
              Modes
            </a>
            <a href="#faq" className="hover:text-gray-100 transition">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <NeonButton href="/game" className="px-4 py-2">
              Play now
            </NeonButton>
          </div>
        </div>
      </div>
    </header>
  );
}
