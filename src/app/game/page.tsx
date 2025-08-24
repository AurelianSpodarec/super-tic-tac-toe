'use client'

import NeonSign from "./neon";
import React, { useEffect, useRef } from "react";

function MenuItem({ children, onClick }) {
  return (
    // <button
    //   type="button"
    //   onClick={onClick}
    //   className="
    //     relative z-10 px-12 py-4 text-4xl font-bold text-cyan-400
    //     rounded-xl bg-black border-2 border-cyan-400
    //     before:absolute before:inset-0 before:rounded-xl
    //     before:border-2 before:border-cyan-400
    //     before:shadow-[0_0_5px_#0ff,0_0_10px_#0ff,0_0_20px_#0ff,0_0_40px_#0ff]
    //     before:pointer-events-none
    //     hover:before:shadow-[0_0_10px_#0ff,0_0_20px_#0ff,0_0_40px_#0ff,0_0_80px_#0ff]
    //     transition-all duration-300 ease-in-out
    //   "
    //   style={{
    //     fontFamily: "'Decapoers', cursive",
    //     filter: "url(#chalk)"
    //   }}
    // >
    //   {children}
    // </button>
      <button
      type="button"
      onClick={onClick}
      className="
      neon-btn
      "
      style={{
        fontFamily: "'Decapoers', cursive",
        filter: "url(#chalk)"
      }}
    >
      {children}
    </button>
  );
}

const NeonButton = ({ text, onClick }) => {
  const btnRef = useRef(null);

  useEffect(() => {
    const btn = btnRef.current;
    let flickerInterval;

    const randomGlow = () => {
      const intensity = 6 + Math.random() * 6; // base glow 6-12px
      const spread = 12 + Math.random() * 12;  // spread 12-24px
      const opacity = 0.6 + Math.random() * 0.4; // 0.6-1 opacity
      const glowColor = `rgba(0, 230, 255, ${opacity})`;

      btn.style.boxShadow = `
        0 0 ${intensity}px ${glowColor},
        0 0 ${spread}px ${glowColor},
        0 0 ${spread * 2}px ${glowColor},
        0 0 ${spread * 3}px rgba(0, 200, 255, 0.35)
      `;
      btn.style.textShadow = `
        0 0 ${intensity}px ${glowColor},
        0 0 ${spread}px ${glowColor},
        0 0 ${spread * 2}px ${glowColor},
        0 0 ${spread * 3}px rgba(0, 200, 255, 0.35)
      `;
    };

    // subtle flicker loop
    flickerInterval = setInterval(randomGlow, 150);

    return () => clearInterval(flickerInterval);
  }, []);

  return (
    <button className="neon-btn-js" ref={btnRef} onClick={onClick}>
      {text}
    </button>
  );
};

function Menu() {
  const handleClick = (action) => {
    console.log(`Clicked ${action}`);
  };

  return (
    <div className="flex flex-col items-center text-center space-y-4">
      <MenuItem onClick={() => handleClick('Single Player')}>Single Player</MenuItem>
      <MenuItem onClick={() => handleClick('Local Co-Op')}>Local Co-Op</MenuItem>
      <MenuItem onClick={() => handleClick('Multiplayer')}>Multiplayer</MenuItem>
      <MenuItem onClick={() => handleClick('Settings')}>Settings</MenuItem>
      <MenuItem onClick={() => handleClick('Quit')}>Quit</MenuItem>
    </div>
  );
}

function Page() {
  return (
    <div className="flex flex-col items-center justify-center w-full bg-[#181a1e] h-full">
      <header className="w-full flex justify-between p-6">
        <button type="button">
          {/* <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            className='w-8 h-8'
            viewBox='0 0 256 256'
          >
            <path d='M208 68h-76V32a12 12 0 0 0-20.49-8.48l-96 96a12 12 0 0 0 0 17l96 96A12 12 0 0 0 132 224v-36h76a20 20 0 0 0 20-20V88a20 20 0 0 0-20-20m-4 96h-84a12 12 0 0 0-12 12v19l-67-67 67-67v19a12 12 0 0 0 12 12h84Z'></path>
          </svg> */}
          <svg width="200" height="80" viewBox="0 0 200 80">
  <defs>
    <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <path
    d="M20 40 L160 40 M140 20 L160 40 L140 60"
    stroke="#00eaff"
    strokeWidth="8"
    fill="none"
    filter="url(#neonGlow)"
    className="neon-arrow"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>

          <span className="sr-only">Back</span>
        </button>
        <button type="button">
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            className='w-8 h-8'
            data-slot='icon'
            viewBox='0 0 20 20'
          >
            <path
              fillRule='evenodd'
              d='M7.84 1.804A1 1 0 0 1 8.82 1h2.36a1 1 0 0 1 .98.804l.331 1.652a7 7 0 0 1 1.929 1.115l1.598-.54a1 1 0 0 1 1.186.447l1.18 2.044a1 1 0 0 1-.205 1.251l-1.267 1.113a7 7 0 0 1 0 2.228l1.267 1.113a1 1 0 0 1 .206 1.25l-1.18 2.045a1 1 0 0 1-1.187.447l-1.598-.54a7 7 0 0 1-1.929 1.115l-.33 1.652a1 1 0 0 1-.98.804H8.82a1 1 0 0 1-.98-.804l-.331-1.652a7 7 0 0 1-1.929-1.115l-1.598.54a1 1 0 0 1-1.186-.447l-1.18-2.044a1 1 0 0 1 .205-1.251l1.267-1.114a7 7 0 0 1 0-2.227L1.821 7.773a1 1 0 0 1-.206-1.25l1.18-2.045a1 1 0 0 1 1.187-.447l1.598.54a7 7 0 0 1 1.93-1.115zM10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6'
              clipRule='evenodd'
            ></path>
          </svg>
          <span className="sr-only">Settings</span>
        </button>
      </header>
      <div className="w-full text-center h-full">
        <div className="mb-10 ">
          <NeonSign />

          {/* <h1 className="text-gray-300 text-8xl font-bold">Tic Tac Toe</h1> */}
        </div>
        <Menu />
        <NeonButton text="Button" />
      </div>

    </div>
  );
}

export default Page;
