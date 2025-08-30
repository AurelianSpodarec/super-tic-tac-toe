'use client'

import React, { useState, useEffect, useRef } from "react";
import UserItem from "./_components/UserItem";
import NeonGrid from "./_components/NeonGrid";
import { dataGameModes } from "./_components/dataGameModes";
import GameModeItem from "./_components/GameModeItem";
import NeonLogo from "./_components/NeonLogo";


function SceneGame() {
  return (
    <div className="relative h-full min-h-screen w-full bg-[#1a1a1b] flex flex-col items-center pt-24 overflow-x-hidden overflow-y-auto" >
      {/* Backgrounds */}
      <div
        className="fixed top-0 bottom-0 h-full inset-0 opacity-30 pointer-events-none select-none"
        style={{ backgroundImage: "url('/images/music-bg.jpg')" }}
      />
      <div className="theme-bg-curtain relative h-full -z-10 pointer-events-none select-none" />

      <div className="w-[700px] text-center z-10">
        <div className="mb-2">
          {/* COuntdown like chess for multiplayer 5:00 */}
          <span className="text-gray-50 text-lg">1:34</span>
        </div>
        <div className="mb-5 text-center text-[#ef476f] bg-[#ef476f]/30 backdrop-blur inline-block mx-auto py-1.5 px-3 font-bold rounded-lg">
          Aurelian's turn
        </div>
        <header className="flex justify-between relative">
          <UserItem name="Aurelian Spodarec" avatar="https://i.imgur.com/cTzL0ai.png" />
          <UserItem name="Novice AI" avatar="https://i.imgur.com/Osx2CgE.png" labelPosition="right" />
        </header>

        <section>
          <NeonGrid size={3} />
          <button className="text-white mt-14 text-3xl">Start</button>
        </section>
      </div>

    </div>
  )
}

function SceneGameModes() {
  return (
    <div className="relative h-full min-h-screen w-full bg-[#1a1a1b] flex flex-col items-center justify-center overflow-x-hidden overflow-y-auto" >
      {/* Backgrounds */}
      <div
        className="fixed top-0 bottom-0 h-full inset-0 opacity-30 pointer-events-none select-none"
        style={{ backgroundImage: "url('/images/brick.svg')" }}
      />
      <div className="theme-bg-curtain relative h-full -z-10 pointer-events-none select-none" />


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


function SceneStart() {
  const menuItems = ["Singleplayer", "Local Co-Op", "Multiplayer", "Leaderboard", "Credits"];
  const [activeIndex, setActiveIndex] = useState(0);
  const [logoVisible, setLogoVisible] = useState(false);
  const [turnedOnItems, setTurnedOnItems] = useState([]);

  const ambientAudioRef = useRef(null);

  useEffect(() => {
    const handleClick = () => {
      if (ambientAudioRef.current) {
        ambientAudioRef.current.play().catch((err) => {
          console.error("Failed to play audio:", err);
        });
      }
      // Optional: remove listener after first click so it only plays once automatically
      window.removeEventListener("click", handleClick);
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  const ambientAudioReff = useRef(null);

  useEffect(() => {
    const handleClick = () => {
      if (ambientAudioReff.current) {
        ambientAudioReff.current.play().catch((err) => {
          console.error("Failed to play audio:", err);
        });
      }
      // Optional: remove listener after first click so it only plays once automatically
      window.removeEventListener("click", handleClick);
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);


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
          ref={ambientAudioRef}
          autoPlay
          controls
          aria-hidden="true"
          aria-label="Background jazz music."
          className="sr-only"
        >
          <p className="sr-only">Background jazz saxophone instrumental, no lyrics.</p>
        </audio>
        <audio
          src="/audio/electric-zap.mp3"
          ref={ambientAudioReff}
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
              transition duration-700
              ${logoVisible ? "opacity-100 scale-100  neon" : "text-[#4a4a4a] opacity-50"}
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


function ActionBar() {
  return (
    <header className="text-white fill-white z-10 fixed top-0 w-full flex justify-between px-3 py-2">
      <button>
        <svg className="size-8 fill-gray-300" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
          <path
            d='M20 13.5a4.505 4.505 0 0 1-4.5 4.5H12a1 1 0 0 1 0-2h3.5a2.5 2.5 0 0 0 0-5H7.414l1.293 1.293a1 1 0 1 1-1.414 1.414l-3-3a1 1 0 0 1 0-1.416l3-3a1 1 0 0 1 1.414 1.416L7.414 9H15.5a4.505 4.505 0 0 1 4.5 4.5'
          ></path>
        </svg>
      </button>
      <button>
        <svg className="size-8 fill-gray-300" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>
          <g data-name='setting android app aplication phone'>
            <path d='M30.56 8.47a8 8 0 0 0-7-7 64.3 64.3 0 0 0-15.06 0 8 8 0 0 0-7 7 64.3 64.3 0 0 0 0 15.06 8 8 0 0 0 7 7 64.3 64.3 0 0 0 15.06 0 8 8 0 0 0 7-7 64.3 64.3 0 0 0 0-15.06m-2 14.83a6 6 0 0 1-5.28 5.28 63.7 63.7 0 0 1-14.6 0 6 6 0 0 1-5.26-5.28 63.7 63.7 0 0 1 0-14.6A6 6 0 0 1 8.7 3.42a63.7 63.7 0 0 1 14.6 0 6 6 0 0 1 5.28 5.28 63.7 63.7 0 0 1 0 14.6z'></path>
            <path d='m25.43 15.12-1.56-.3a7 7 0 0 0-.25-1l1.22-1a2 2 0 0 0 .27-2.82l-1.28-1.57A2 2 0 0 0 21 8.17l-1.2 1a7 7 0 0 0-.95-.44V7.14a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2l.06 1.57a9 9 0 0 0-1 .48l-1.26-1a2 2 0 0 0-2.8.37l-1.19 1.78a2 2 0 0 0 .34 2.8l1.27.94a8 8 0 0 0-.21 1l-1.54.38a2 2 0 0 0-1.46 2.43l.48 1.94A2 2 0 0 0 8 21.32l1.52-.41a6.7 6.7 0 0 0 .68.8l-.67 1.46a2 2 0 0 0 1 2.65l1.82.83a2 2 0 0 0 2.65-1l.66-1.44h1.03l.71 1.41a2 2 0 0 0 2.69.88l1.79-.9a2 2 0 0 0 .88-2.69L22 21.5a6 6 0 0 0 .63-.83l1.56.32a2 2 0 0 0 2.36-1.55l.41-2a2 2 0 0 0-1.53-2.32M24.61 19l-1.56-.33a2 2 0 0 0-2.05.83 6 6 0 0 1-.49.64 2 2 0 0 0-.27 2.2l.76 1.47-1.78.9-1-2.05a1 1 0 0 0-1.07-.54 6 6 0 0 1-.95.11 7 7 0 0 1-1-.07 1 1 0 0 0-1 .58l-1 2.09-1.85-.83.65-1.45a2 2 0 0 0-.36-2.19 6 6 0 0 1-.52-.63A2 2 0 0 0 9.06 19l-1.55.39L7 17.43l1.55-.38a2 2 0 0 0 1.49-1.65 5 5 0 0 1 .16-.79 2 2 0 0 0-.72-2.09l-1.26-1L9.47 10l1.26 1a2 2 0 0 0 2.21.14 5 5 0 0 1 .72-.36 2 2 0 0 0 1.2-1.87V7.32h2v1.59a2 2 0 0 0 1.26 1.82 6 6 0 0 1 .74.33 2 2 0 0 0 2.21-.23l1.22-1 1.28 1.54-1.23 1a2 2 0 0 0-.63 2.12 5.4 5.4 0 0 1 .19.79 2 2 0 0 0 1.56 1.58l1.56.33z'></path>
            <path d='M15.92 12a4 4 0 0 0 .08 8h.08a4 4 0 0 0-.16-8M18 16a2 2 0 1 1-2-2 2 2 0 0 1 2 2'></path>
          </g>
        </svg>
      </button>
    </header>
  )
}



function SceneCredits() {


  // CREDITS
  // Producer: Aurelian Spodarec

  // Lead Programmer: Aurelian Spodarec

  // Designer: Aurelian Spodarec

  // Story Telling: Aurelian Spodarec 

  // [on the side have moodboard inspiration]

  // Programmer: 
  // ChatGPT
  // Codepen Nomeil
  // Codepen Wusdl

  // Sound
  // Ambient Effect 1: Jon
  // Ambient Effect 2: Luigi Silvion
  // Ambient Effect 3: Wodk

  // Button Hover: 
  // Select Enter: 



  // Cast
  // Novice AI Graphic... is kind of a desing graphic right but its made by someen else and should be under a desing most likely no
  // Mafia Boss: 
  // Woman 1
  // man 1 etc 

  // [on the side have image of the avatars]

  // Fun Facts

  // Special Thanks

  // Copyright
  return (
    <section id="credits" className=" bg-[#1a1a1b] py-20 space-y-8 h-full w-full flex flex-col text-center items-center">

      <h1 className="font-bold text-2xl mb-10">CREDITS</h1>

      <section id="created-by">
        <h2 className="font-bold">Created by</h2>
        <p>Aurelian Spodarec</p>
      </section>

      <section id="roles">
        <h2 className="font-bold">Game Design, Programming, Art, Animation</h2>
        <p>Aurelian Spodarec</p>
      </section>

      <section id="audio">
        <h2 className="font-bold">Audio</h2>
        <ul className="text-left">
          <li>Ambient Sound (Start Screen) – Adam (freesound.org)</li>
          <li>Ambient Sound (Gameplay) – PixelBay</li>
        </ul>
      </section>

      <section id="special-thanks">
        <h2 className="font-bold">Special Thanks</h2>
        <p>All Playtesters and the indie dev community</p>
      </section>

      <section id="fun-facts">
        <h2 className="font-bold">Fun Facts</h2>
        <ul className="text-left">
          <li>Originally planned as a chalkboard game, then reimagined with a Las Vegas neon theme.</li>
          <li>Inspired by a cocktail bar font, later pivoted to a jazz theme.</li>
          <li>Started in 2020 with just a dozen lines of code and abandoned, end of August 2025 picked it up again</li>
          <li>Created to showcase animation skills and visual flair.</li>
          <li>I spent more time perfecting the start screen than the entire game combined.</li>
        </ul>
      </section>

      <footer id="legal">
        <p>&copy; 2025 Aurelian Spodarec. All Rights Reserved.</p>
        <p>Built with TypeScript... on a chair half alseep.</p>
      </footer>

    </section>
  )
}

function Page() {
  return (
    <>
      <div className="text-gray-50 h-full w-full">
        <ActionBar />
        {/* <ModalSettings /> */}

        <SceneStart />
        {/* <SceneGameModes /> */}
        {/* <SceneGame /> */}

        {/* <SceneCredits /> */}
      </div>
    </>
  );
}

export default Page
