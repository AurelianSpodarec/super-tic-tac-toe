'use client'

function SceneGame() {
  return (
    <div style={{ backgroundImage: "url('/images/bollywood.svg')" }}>

    </div>
  )
}

function SceneGameModes() {
  return (
    <div>

    </div>
  )
}

function SceneLeaderboard() {
  return (
    <div>

    </div>
  )
}

// function SceneStart() {
//   return (
//     <div
//       style={{ backgroundImage: "url('/images/brick.svg')" }}
//       className="h-full w-full bg-[#1A1A2E]"
//     >
//       <div>
//         Glowing Text
//       </div>
//       <div className="absolute inset-0 bg-black/50"></div>
//       <div className="relative z-10 flex items-center justify-center h-full">
//         <h1 className="text-yellow-400 text-5xl font-bold text-glow">Hello, World!</h1>
//       </div>
//     </div>
//   )
// }


import { useState, useEffect } from "react";
function MenuButton({ text, isActive, onMouseEnter, onSelect }) {
  useEffect(() => {
    if (isActive) {
      const hoverSound = new Audio("/audio/rimshot-sweet.mp3");
      hoverSound.play();
    }
  }, [isActive]);

  return (
    <button
      type="button"
      className={`text-[#ef476f] text-[clamp(1.5rem,2.5vw,2rem)] ${isActive ? "active-item neon2 scale-105" : ""}`}
      onMouseEnter={onMouseEnter}
      onClick={onSelect}
      aria-current={isActive ? "true" : undefined}
      aria-label={`${text}${isActive ? " (active)" : ""}`}
    >
      {text}
    </button>
  );
}


function SceneStart() {
  const menuItems = ["Singleplayer", "Local Co-Op", "Multiplayer", "Leaderboard"];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "ArrowUp") {
        setActiveIndex((prev) => (prev - 1 + menuItems.length) % menuItems.length);
      } else if (e.key === "ArrowDown") {
        setActiveIndex((prev) => (prev + 1) % menuItems.length);
      } else if (e.key === "Tab") {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % menuItems.length);
      } else if (e.key === "Enter") {
        // const selectSound = new Audio("/audio/spacebar-click-keyboard.mp3");
        const selectSound = new Audio("/audio/jazzysnap.mp3");
        selectSound.play();
        console.log("Selected:", menuItems[activeIndex]);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  const handleSelect = (index) => {
    const selectSound = new Audio("/audio/jazzsnap.mp3");
    selectSound.play();
    console.log("Clicked:", menuItems[index]);
  };

  return (
    <div className="relative h-screen w-full bg-[#1a1a1b] flex flex-col items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 opacity-20 pointer-events-none select-none"
        style={{ backgroundImage: "url('/images/brick.svg')" }}
      ></div>

      <audio src="/audio/relaxing-jazz-saxophone.mp3" autoPlay />

      <div className="text-center -mt-32">
        <span className="neon relative font-bold font-sacramento text-yellow-400 neon-logo text-[clamp(0.5rem,2vw,3rem)]">By Aurelian Spodarec</span>
        <h1 className="neon relative font-bold text-yellow-400 neon-logo text-[clamp(2rem,5vw,5rem)]">
          JazzTacToe
        </h1>
      </div>


      <nav className="flex flex-col mt-10">
        {menuItems.map((text, index) => (
          <MenuButton
            key={text}
            text={text}
            isActive={index === activeIndex}
            onMouseEnter={() => setActiveIndex(index)}
            onSelect={() => handleSelect(index)}
          />
        ))}
      </nav>

      <div className="theme-bg-curtain relative -z-10 pointer-events-none select-none" />
    </div>
  );
}


function Page() {
  return (
    <div className="h-full w-full overflow-hidden">
      <SceneStart />
    </div>
  );
}

export default Page

// background: radial-gradient(circle at center, rgba(26, 26, 46, 0.1) 40%, rgba(10, 10, 15, 1) 80%);