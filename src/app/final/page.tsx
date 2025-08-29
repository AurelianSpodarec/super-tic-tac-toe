'use client'

function SceneGame() {
  return (
    <div style={{ backgroundImage: "url('/images/bollywood.svg')" }}>

    </div>
  )
}


const dataGameModes = [
  {
    name: "TicTacToe",
    image: "/images/tic-tac-toe.svg",
    modeId: "modeTicTacToe"
  },
  {
    name: "Super TicTacToe",
    image: "https://i.imgur.com/DlWB4Ua.png",
    modeId: "modeSuperTicTacToe"
  }
]

function GameModeItem({ item }: any) {
  return (
    <div className="box rounded-lg h-[300px] w-[300px] neon2 hover:scale-105 transition duration-75 ease-in-out">
      <div className="box-container h-[300px] w-[300px] bg-white rounded-lg">
        <img src={item.image} className="w-full h-full rounded-lg" />
        <span>{item.name}</span>
        <span>Game Ruless</span>
      </div>
    </div>
  )
}

function SceneGameModes() {
  return (
    <div>
      <div className="text-center -mt-32">

        {/* <span className="neon relative font-bold font-sacramento text-yellow-400 neon-logo text-[clamp(0.5rem,2vw,4rem)]">By Aurelian Spodarec</span> */}
        <h1 className="neon relative font-bold text-yellow-400 neon-logo text-[clamp(1rem,3.5vw,3rem)]">
          Choose your game Mode
        </h1>

      </div>
      <div className="flex space-x-4 max-w-[900px] mt-10">
        {dataGameModes.map((item) => {
          return (
            <GameModeItem item={item} />
          )
        })}
      </div>
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
import NeonText from "../good-game/_components/NeonText"
function MenuButton({ text, turnedOn, isActive, onMouseEnter, onSelect }) {
  useEffect(() => {
    if (isActive) {
      const hoverSound = new Audio("/audio/rimshot-sweet.mp3");
      hoverSound.play();
    }
  }, [isActive]);

  return (
    <button
      type="button"
      className={`
        text-[clamp(1.5rem,2.5vw,2rem)] outline-none transition-all duration-200
        ${turnedOn ? "text-[#ef476f]" : "text-[#4a4a4a] opacity-40"} 
        ${isActive && turnedOn ? "active-item neon2 scale-105" : ""}
      `}
      onMouseEnter={onMouseEnter}
      onClick={onSelect}
      aria-current={isActive ? "true" : undefined}
      aria-label={`${text}${isActive ? " (active)" : ""}`}
    >
      {text}
    </button>
  );
}


function NeonLogo({ text, className, stagger = 150 }) {
  const [turnedOnLetters, setTurnedOnLetters] = useState([]);

  useEffect(() => {
    const timers = [];
    for (let i = 0; i < text.length; i++) {
      timers.push(
        setTimeout(() => {
          setTurnedOnLetters((prev) => [...prev, i]);
        }, i * stagger)
      );
    }
    return () => timers.forEach(clearTimeout);
  }, [text, stagger]);

  return (
    <div className={`relative ${className}`} style={{ display: "inline-block" }}>
      {/* Outline / grayed text layer */}
      <div className="absolute inset-0 text-gray-600 select-none">
        {text.split("").map((ch, i) => (
          <span key={i} className="inline-block ">{ch}</span>
        ))}
      </div>

      {/* Neon letters layer */}
      <div className="relative">
        {text.split("").map((ch, i) => (
          <span
            key={i}
            className={`neon-logo-2 inline-block transition-opacity duration-500 ${turnedOnLetters.includes(i) ? "opacity-100" : "opacity-0"
              }`}
          >
            <span >{ch}</span>
          </span>
        ))}
      </div>
    </div>
  );
}


function SceneStart() {
  const menuItems = ["Singleplayer", "Local Co-Op", "Multiplayer", "Leaderboard", "Credits"];
  const [activeIndex, setActiveIndex] = useState(0);
  const [logoVisible, setLogoVisible] = useState(false);
  const [turnedOnItems, setTurnedOnItems] = useState([]);

  // Sequential reveal (byline → logo → menu items)
  useEffect(() => {
    const timers = [];

    timers.push(setTimeout(() => setLogoVisible(true), 300));

    // Step 3: reveal menu items one by one
    menuItems.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setTurnedOnItems((prev) => [...prev, i]);
        }, 1120 + i * 250) // start after logo, staggered
      );
    });

    return () => timers.forEach(clearTimeout);
  }, []);

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
        const selectSound = new Audio("/audio/jazzysnap.mp3");
        selectSound.play();
        console.log("Selected:", menuItems[activeIndex]);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, menuItems.length]);

  const handleSelect = (index) => {
    const selectSound = new Audio("/audio/jazzsnap.mp3");
    selectSound.play();
    console.log("Clicked:", menuItems[index]);
  };

  return (
    <div className="relative h-full min-h-screen w-full bg-[#1a1a1b] flex flex-col items-center justify-center overflow-x-hidden overflow-y-auto" >
      {/* Backgrounds */}
      <div
        className="fixed top-0 bottom-0 h-full inset-0 opacity-30 pointer-events-none select-none"
        style={{ backgroundImage: "url('/images/brick.svg')" }}
      />
      <div className="theme-bg-curtain relative h-full -z-10 pointer-events-none select-none" />

      {/* Background music */}
      <div>
        <audio
          src="/audio/relaxing-jazz-saxophone.mp3"
          loop
          autoPlay
          controls
          aria-hidden="true"
          aria-label="Background jazz music."
          className="sr-only"
        >
          <p className="sr-only">Background jazz saxophone instrumental, no lyrics.</p>
        </audio>
      </div>

      {/* Logo + Byline */}
      <div className="relative">
        <div className="text-center -mt-12 opacity-90">
          <span
            className={`
               relative font-bold font-sacramento
              text-[clamp(0.5rem,2vw,4rem)]
              transition-opacity duration-700
              ${logoVisible ? "  neon" : "text-[#4a4a4a] "}
            `}
          >
            <NeonLogo text="By Aurelian Spodarec" />
          </span>
          <h1
            className={`
               relative font-bold
              text-[clamp(2rem,5vw,5rem)]
              transition-opacity duration-700
              ${logoVisible ? "opacity-100 scale-100  neon" : "text-[#4a4a4a] opacity-50  scale-95"}
            `}
          >
            <NeonLogo text="JazzTacToe" />
          </h1>
        </div>

        {/* Menu */}
        <nav className="flex flex-col mt-10">
          {menuItems.map((text, index) => (
            <MenuButton
              key={text}
              text={text}
              turnedOn={turnedOnItems.includes(index)}
              isActive={index === activeIndex}
              onMouseEnter={() => setActiveIndex(index)}
              onSelect={() => handleSelect(index)}
            />
          ))}
        </nav>

        <div className="text-gray-200 mt-20 text-center">
          Anyone say jazz? TicTacToe just got funky ;)
        </div>
      </div>
    </div>
  );
}
function Page() {
  return (
    <SceneStart />
  );
}

export default Page
