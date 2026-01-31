import React from "react";

function WebLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background: match the game vibe (brick wall + curtain/radial fade) */}
      <div
        className="fixed inset-0 pointer-events-none select-none opacity-25"
        style={{
          backgroundImage: "url(/images/brick-wall.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Reuse existing global CSS helpers from the game */}
      <div className="fixed inset-0 pointer-events-none select-none curtain circular-fade curtain-primary" />

      {/* Extra right-side fade so bricks fall off to the right like the game menu */}
      <div className="fixed inset-0 pointer-events-none select-none bg-gradient-to-l from-black via-black/30 to-transparent" />

      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default WebLayout;
