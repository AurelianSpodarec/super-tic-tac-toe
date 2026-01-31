import React from "react";

export default function LandingFooter() {
  return (
    <footer className="pb-10 pt-6">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-gray-400">
          <div>
            <span className="neon2 text-[#ef476f] font-neontubes">JazzTacToe</span>
            <span className="ml-2">— neon tic tac toe with a jazz edge.</span>
          </div>
          <div className="text-gray-500">© {new Date().getFullYear()} • Placeholder links</div>
        </div>
      </div>
    </footer>
  );
}
