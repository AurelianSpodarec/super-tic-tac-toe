// 'use client'

// import NeonSign from "./neon";
// import React, { useEffect, useRef } from "react";

// function MenuItem({ children, onClick }) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className="
//       neon-btn
//       font-neontubes
//       "
//     >
//       {children}
//     </button>
//   );
// }


// function Menu() {
//   const handleClick = (action) => {
//     console.log(`Clicked ${action}`);
//   };

//   return (
//     <div className="flex flex-col items-center text-center space-y-4">
//       <MenuItem onClick={() => handleClick('Single Player')}>Single Player</MenuItem>
//       <MenuItem onClick={() => handleClick('Local Co-Op')}>Local Co-Op</MenuItem>
//       <MenuItem onClick={() => handleClick('Multiplayer')}>Multiplayer</MenuItem>
//       <MenuItem onClick={() => handleClick('Settings')}>Settings</MenuItem>
//       <MenuItem onClick={() => handleClick('Quit')}>Quit</MenuItem>
//     </div>
//   );
// }
// // bg-[#181a1e] 



// function Page() {
//   return (
//     <div className="flex flex-col items-center justify-center w-full h-full">
//       <header className="w-full flex justify-between p-6">
//         <button type="button">
//           {/* <svg
//             xmlns='http://www.w3.org/2000/svg'
//             fill='currentColor'
//             className='w-8 h-8'
//             viewBox='0 0 256 256'
//           >
//             <path d='M208 68h-76V32a12 12 0 0 0-20.49-8.48l-96 96a12 12 0 0 0 0 17l96 96A12 12 0 0 0 132 224v-36h76a20 20 0 0 0 20-20V88a20 20 0 0 0-20-20m-4 96h-84a12 12 0 0 0-12 12v19l-67-67 67-67v19a12 12 0 0 0 12 12h84Z'></path>
//           </svg> */}
//           <svg width="200" height="80" viewBox="0 0 200 80">
//             <defs>
//               <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
//                 <feGaussianBlur stdDeviation="3" result="blur" />
//                 <feMerge>
//                   <feMergeNode in="blur" />
//                   <feMergeNode in="SourceGraphic" />
//                 </feMerge>
//               </filter>
//             </defs>

//             <path
//               d="M20 40 L160 40 M140 20 L160 40 L140 60"
//               stroke="#00eaff"
//               strokeWidth="8"
//               fill="none"
//               filter="url(#neonGlow)"
//               className="neon-arrow"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>

//           <span className="sr-only">Back</span>
//         </button>
//         <button type="button">
//           <svg
//             xmlns='http://www.w3.org/2000/svg'
//             fill='currentColor'
//             className='w-8 h-8'
//             data-slot='icon'
//             viewBox='0 0 20 20'
//           >
//             <path
//               fillRule='evenodd'
//               d='M7.84 1.804A1 1 0 0 1 8.82 1h2.36a1 1 0 0 1 .98.804l.331 1.652a7 7 0 0 1 1.929 1.115l1.598-.54a1 1 0 0 1 1.186.447l1.18 2.044a1 1 0 0 1-.205 1.251l-1.267 1.113a7 7 0 0 1 0 2.228l1.267 1.113a1 1 0 0 1 .206 1.25l-1.18 2.045a1 1 0 0 1-1.187.447l-1.598-.54a7 7 0 0 1-1.929 1.115l-.33 1.652a1 1 0 0 1-.98.804H8.82a1 1 0 0 1-.98-.804l-.331-1.652a7 7 0 0 1-1.929-1.115l-1.598.54a1 1 0 0 1-1.186-.447l-1.18-2.044a1 1 0 0 1 .205-1.251l1.267-1.114a7 7 0 0 1 0-2.227L1.821 7.773a1 1 0 0 1-.206-1.25l1.18-2.045a1 1 0 0 1 1.187-.447l1.598.54a7 7 0 0 1 1.93-1.115zM10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6'
//               clipRule='evenodd'
//             ></path>
//           </svg>
//           <span className="sr-only">Settings</span>
//         </button>
//       </header>
//       <div className="w-full text-center h-full">
//         <div className="mb-10 text-center flex justify-center">
//           <NeonSign />

//           {/* <h1 className="text-gray-300 text-8xl font-bold">Tic Tac Toe</h1> */}
//         </div>
//         <Menu />
// <div className="unicorn">
//       <svg
//         width="800"
//         height="800"
//         viewBox="0 0 800 800"
//         preserveAspectRatio="xMinYMin"
//       >
//         <defs>
//           <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
//             <feGaussianBlur
//               in="SourceGraphic"
//               stdDeviation="10"
//               result="blurred"
//             ></feGaussianBlur>
//             <feMerge>
//               <feMergeNode in="blurred"></feMergeNode>
//               <feMergeNode in="blurred"></feMergeNode>
//               <feMergeNode in="blurred"></feMergeNode>
//             </feMerge>
//           </filter>
// 			<g id="unicorn">
// 				<g id="head" transform="translate(30, 55) rotate(17 400 335)">
// 				  <path
// 					id="head"
// 					d="M300,600
// 					  q-80,-220,75,-390
// 					  -25,-65,21,-117
// 					  10,-5,16,20
// 					  5,28,22,39
// 					  m147,20
// 					  q-2,10,3,20
// 					  0,3,108,71
// 					  5,25,25,28
// 					  18,18,14,40
// 					  -10,18,-60,40
// 					  -30,7,-65,-25
// 					  -35,-20,-55,-10
// 					  -40,35,-70,38
// 					  -25,5,-50,-5
// 					  -20,-11,-23,-30
// 					  m73,35
// 					  q75,150,125,175
// 					  m-77,-194
// 					  q30,10,86,17
// 					  m-4,-20
// 					  q1,20,17,32
// 					  25,13,43,5
// 					  33,-15,55,-37
// 					  6,-8,0,-15
// 					  m-65,-2
// 					  q-9,-6,-18,-8
// 					  0,-15,18,8
// 					  m-190, -230
// 					  q-1,-40,14,-95
// 					  30,0,35,85"
// 				  />
// 				  <path
// 					id="eye"
// 					d="M505,260
// 					  q-7,14,-20,16
// 					  -29,8,-33,-8
// 					  10,-15,30,-20
// 					  19,-5,23,9"
// 				  />
// 				  <path
// 					id="quiff"
// 					d="M489,148
// 					  q-3,4,-1,8
// 					  5,12,17,10
// 					  29,2,47,-24
// 					  4,-6,2,-13
// 					  m-40,-24
// 					  q-30,-12,-52,5
// 					  -30,25,-25,65
// 					  13,58,100,20
// 					  90,-38,95,-143
// 					  -37,40,-45,65
// 					  10,-28,0,-45"
// 				  />
// 				</g>
// 				<g id="horn" transform="translate(30, 55) rotate(17, 400, 335)">
//               <path
//                 d="M520,100
//                 q-7,30,10,35
//                 25,4,41,-32
//                 20,-50,40,-130
//                 13,-50,-16,0
//                 -50,80,-75,127"
//               />
//             </g>
// 				<g id="mane" transform="translate(30, 55) rotate(17, 400, 335)">
// 				  <path
// 					id="mane_00"
// 					d="M300,600
// 					  q50,-50,16,23
// 					  -18,40,16,11
// 					  55,-55,18,17
// 					  -6,14,-16,28
// 					  -70,85,-115,-20
// 					  -50,70,-110,35
// 					  -45,-30,20,-88
// 					  45,-80,80,-94
// 					  -47,35,-55,108
// 					  -10,40,-70,60
// 					  -35,-50,23,-110
// 					  -2,-50,33,-90
// 					  25,-50,55,-55
// 					  30,-5,5,18
// 					  -25,15,-50,35
// 					  -55,5,-85,60
// 					  -10,-75,68,-110
// 					  15,-40,60,-65
// 					  -60,15,-75,-45
// 					  -6,-38,45,-55
// 					  30,-5,45,15
// 					  -10,-35,40,-65
// 					  40,-85,118,-76"
// 				  />
// 				  <path
// 					id="mane_01"
// 					d="M325,204
// 					  q30,25,-15,30
// 					  -110,10,-83,82"
// 				  />
// 				  <path
// 					id="mane_02"
// 					d="M238,570
// 					  q-20,10,-45,55
// 					  -15,35,-37,50"
// 				  />
// 				  <path
// 					id="mane_03"
// 					d="M249,599
// 					  q-25,40,10,80
// 					  20,15,30,0"
// 				  />
// 				</g>
//           	</g>
//         </defs>
//         <use xlinkHref="#head" className="head_tube" />
//         <use xlinkHref="#head" className="head_glow" filter="url(#glow)" />
//         <use xlinkHref="#horn" className="horn_tube" />
//         <use xlinkHref="#horn" className="horn_glow" filter="url(#glow)" />
//         <use xlinkHref="#mane" className="mane_tube" />
//         <use xlinkHref="#mane" className="mane_glow" filter="url(#glow)" />
//       </svg>

//     </div>
//       </div>
//       {/* <div className="wrapper">
// </div> */}

//     </div>
//   );
// }

// export default Page;

// {/* <div className="logo"><svg width="800"
//     height="800"
//     viewBox="0 0 800 800"
//     preserveAspectRatio="xMinYMin">
//        <defs>
//       <filter id="glow2" x="-50%" y="-50%" width="200%" height="200%">
//       <feGaussianBlur
//         in="SourceGraphic"
//         stdDeviation="10"
//         result="blurred"
//       ></feGaussianBlur>
//       <feMerge>
//         <feMergeNode in="blurred"></feMergeNode>
//         <feMergeNode in="blurred"></feMergeNode>
//         <feMergeNode in="blurred"></feMergeNode>
//         <feMergeNode in="blurred"></feMergeNode>
//         <feMergeNode in="blurred"></feMergeNode>
//         <feMergeNode in="blurred"></feMergeNode>
//         <feMergeNode in="blurred"></feMergeNode>
//         <feMergeNode in="blurred"></feMergeNode>
//         <feMergeNode in="blurred"></feMergeNode>
//         <feMergeNode in="blurred"></feMergeNode>
//         <feMergeNode in="blurred"></feMergeNode>
//         <feMergeNode in="blurred"></feMergeNode>
//       </feMerge>
//       </filter>
//       <g id="csl-logo">
//         <path d="M168,35
//              l137,0
//              -148,338
//              82,176
//              242,-511
//              144,0
//              144,338
//              -143,335
//              -140,0
//              145,-338
//              -81,-170
//              -240,508
//              -146,0
//              -144,-340z" />
//       </g>
//     </defs>
//     <use xlinkHref="#csl-logo" className="csl-logo" />
//     <use xlinkHref="#csl-logo" filter="url(#glow2)" className="csl-logo_glow" />
//     </svg>
// </div> */}


// Settings: Theme, Audio

'use client'

import { useEffect, useRef, useState, useCallback } from "react";


const randomHue = () => Math.floor(Math.random() * 360);
const randomDur = () => (Math.random() * 4).toFixed(2);

function NeonGlory({ text }) {
  const [letters, setLetters] = useState(() =>
    Array.from(text).map((ch, i) => ({
      id: i,
      ch,
      hue: randomHue(),
      dur: randomDur(),
      version: 0, // used to force remount
    }))
  );

  useEffect(() => {
    setLetters(
      Array.from(text).map((ch, i) => ({
        id: i,
        ch,
        hue: randomHue(),
        dur: randomDur(),
        version: 0,
      }))
    );
  }, [text]);

  const recolor = (i) =>
    setLetters((prev) =>
      prev.map((l, idx) =>
        idx === i
          ? { ...l, hue: randomHue(), dur: randomDur(), version: l.version + 1 }
          : l
      )
    );

  return (
    <h1 className="flicker neon">
      {letters.map((l, i) => (
        <span
          key={`${l.id}-${l.version}`} // <— key changes on click so React remounts
          onClick={(e) => {
            e.stopPropagation();
            recolor(i);
          }}
          style={{
            animation: `text-flicker-in-glow ${l.dur}s linear both`,
            color: `hsla(${l.hue}, 100%, 80%, 1)`,
            cursor: "pointer",
            display: "inline-block",
            whiteSpace: "pre",
          }}
        >
          {l.ch}
        </span>
      ))}
    </h1>
  );
}

function Cog() {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;

    // Animate
    path.style.transition = "stroke-dashoffset 2s ease-in-out";
    requestAnimationFrame(() => {
      path.style.strokeDashoffset = "0";
    });
  }, []);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width="150"
      height="150"
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        ref={pathRef}
        d="M128 82a46 46 0 1 0 46 46 46.06 46.06 0 0 0-46-46m0 80a34 34 0 1 1 34-34 34 34 0 0 1-34 34m108-54.4a6 6 0 0 0-2.92-4l-30.44-17.38..."
        stroke="#ff005d"
        strokeWidth="3"
        fill="transparent"
        filter="url(#glow)"
      />
    </svg>
  );
}



const NeonCog = ({ strokeSpeed = 2000, flickerSpeed = 300 }) => {
  const pathRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();

    // Prepare stroke dash
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;

    // Animate stroke drawing
    path.animate(
      [
        { strokeDashoffset: length, opacity: 0 },
        { strokeDashoffset: 0, opacity: 1 },
      ],
      {
        duration: strokeSpeed,
        easing: "ease-out",
        fill: "forwards",
      }
    );

    // Neon flicker effect
    path.animate(
      [
        { filter: "url(#neonGlow)", opacity: 0.8 },
        { filter: "url(#neonGlow)", opacity: 1 },
        { filter: "url(#neonGlow)", opacity: 0.9 },
        { filter: "url(#neonGlow)", opacity: 1 },
      ],
      {
        duration: flickerSpeed,
        iterations: 6,
      }
    );
  }, [strokeSpeed, flickerSpeed]);

  return (
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="32" height="32">
        <defs>
          <filter
            id="neonGlow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
            filterUnits="userSpaceOnUse"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur2" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          ref={pathRef}
          d="M128,82a46,46,0,1,0,46,46A46.06,46.06,0,0,0,128,82Zm0,80a34,34,0,1,1,34-34A34,34,0,0,1,128,162Zm108-54.4a6,6,0,0,0-2.92-4L202.64,86.22l-.42-.71L202.1,51.2A6,6,0,0,0,200,46.64a110.12,110.12,0,0,0-36.07-20.31,6,6,0,0,0-4.84.45L128.46,43.86h-1L96.91,26.76a6,6,0,0,0-4.86-.44A109.92,109.92,0,0,0,56,46.68a6,6,0,0,0-2.12,4.55l-.16,34.34c-.14.23-.28.47-.41.71L22.91,103.57A6,6,0,0,0,20,107.62a104.81,104.81,0,0,0,0,40.78,6,6,0,0,0,2.92,4l30.42,17.33.42.71.12,34.31A6,6,0,0,0,56,209.36a110.12,110.12,0,0,0,36.07,20.31,6,6,0,0,0,4.84-.45l30.61-17.08h1l30.56,17.1A6.09,6.09,0,0,0,162,230a5.83,5.83,0,0,0,1.93-.32,109.92,109.92,0,0,0,36-20.36,6,6,0,0,0,2.12-4.55l.16-34.34c.14-.23.28-.47.41-.71l30.42-17.29a6,6,0,0,0,2.92-4.05A104.81,104.81,0,0,0,236,107.6Zm-11.25,35.79L195.32,160.1a6.07,6.07,0,0,0-2.28,2.3c-.59,1-1.21,2.11-1.86,3.14a6,6,0,0,0-.91,3.16l-.16,33.21a98.15,98.15,0,0,1-27.52,15.53L133,200.88a6,6,0,0,0-2.93-.77h-.14c-1.24,0-2.5,0-3.74,0a6,6,0,0,0-3.07.76L93.45,217.43a98,98,0,0,1-27.56-15.49l-.12-33.17a6,6,0,0,0-.91-3.16c-.64-1-1.27-2.08-1.86-3.14a6,6,0,0,0-2.27-2.3L31.3,143.4a93,93,0,0,1,0-30.79L60.68,95.9A6.07,6.07,0,0,0,63,93.6c.59-1,1.21-2.11,1.86-3.14a6,6,0,0,0,.91-3.16l.16-33.21A98.15,98.15,0,0,1,93.41,38.56L123,55.12a5.81,5.81,0,0,0,3.07.76c1.24,0,2.5,0,3.74,0a6,6,0,0,0,3.07-.76l29.65-16.56a98,98,0,0,1,27.56,15.49l.12,33.17a6,6,0,0,0,.91,3.16c.64,1,1.27,2.08,1.86,3.14a6,6,0,0,0,2.27,2.3L224.7,112.6A93,93,0,0,1,224.73,143.39Z"
          stroke="cyan"
          strokeWidth="3"
          fill="none"
          filter="url(#neonGlow)"
        />
      </svg>
    </div>
  );
};


function ActionBar() {
  return (
    <header className="absolute top-0 left-0 right-0 w-full py-3 px-4">
      <div className="flex justify-between">
        <div>
          {/* <span>Back Button</span> */}
        </div>
        <button type="button" className="cursor-pointer">
          <NeonCog strokeSpeed={2500} flickerSpeed={400} />
          <span className="sr-only">Settings</span>
        </button>
      </div>
    </header>
  )
}

function Logo() {
  return (
    <h1 className="text-8xl mb-20 font-monoton">
      <NeonGlory text="Tictactoe" />
      {/* Super Tictactoe */}
    </h1>
  )
}

function MenuButton({ label, children }: any) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  return (
    <>
      {/* Hidden audio element */}
      <audio ref={audioRef} src="/audio/electric-zap.mp3" preload="auto" />

      <button
        type="button"
        onMouseEnter={playSound}   // Hover start
        onMouseDown={playSound}    // Active (mouse down)
        onFocus={playSound}        // Tab focus
        onKeyDown={(e) => e.key === " " || e.key === "Enter" ? playSound() : null} // Keyboard "active"
        className="
          rounded-lg px-10 py-5 text-xl cursor-pointer
          border border-[#ffed00]/70
          shadow-[inset_0_0_10px_#ff99e0,inset_0_0_10px_#ff99e0,0_0_10px_#ff99e0,0_0_10px_#ff99e0,0_0_0_#ff99e0,0_0_0_#ff99e0]
          flicker neon
          block text-center mx-auto
          text-[#ff99e0]
          font-semibold
          w-auto display-inline
          [text-shadow:-0.2rem_-0.2rem_1rem_#fff,0.2rem_0.2rem_1rem_#fff,0_0_2rem_#ff99e0,0_0_4rem_#ff99e0,0_0_6rem_#ff99e0,0_0_8rem_#ff99e0,0_0_10rem_#ff99e0]
        "
      >
        {children || label}
      </button>
    </>
  );
}

function Menu() {
  return (
    <nav className="flex flex-col space-y-6">
      <MenuButton label="Single Player" />
      <MenuButton label="Local Co-Op" />
      <MenuButton label="Multiplayer" />
      <MenuButton label="Leaderboard" />
    </nav>
  )
}

function Overlay() {
  return <div className="circular-fade relative -z-10" />;
}



function LanguageButton() {
  return (
    <div>

    </div>
  )
}




const languages = [
  { "code": "en", "name": "English" },
  { "code": "en-GB", "name": "English (UK)" },
  { "code": "es", "name": "Español" },
  { "code": "zh", "name": "中文" },
  { "code": "it", "name": "Italiano" },
  { "code": "fr", "name": "Français" },
  { "code": "de", "name": "Deutsch" },
  { "code": "pl", "name": "Polski" },
  { "code": "ja", "name": "日本語" },
  { "code": "ru", "name": "Русский" },
  { "code": "pt", "name": "Português" },
  { "code": "ar", "name": "العربية" },
  { "code": "ko", "name": "한국어" }
]


function SettingsLanguages() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {languages.map((item) => (
        <button type="button" key={item.code} className="cursor-pointer border rounded text-center py-4">
          {item.name}
        </button>
      ))}
    </div>
  );
}


function SettingsAudio() {
  return (
    <section className="space-y-4 mb-10">

      <div className="flex flex-col text-center">
        <label className="text-lg">Music Volume</label>
        <input type="range" />
      </div>

      <div className="flex flex-col text-center">
        <label className="text-lg">SFX Volume</label>
        <input type="range" />
      </div>

    </section>
  )
}

function MultiplayerLobby() {
  return (
    <div>

    </div>
  )
}


const gameModes = [
  {
    name: "TicTacToe",
    image: "https://i.imgur.com/36LVn1E.png",
  },
  {
    name: "Super TicTacToe",
    image: "https://i.imgur.com/DlWB4Ua.png"
  }
]

function ScreenGameModes() {
  return (
    <div>
      <h2 className="text-center text-4xl mb-6">Choose Game Mode</h2>
      <div className="container max-w-[700px]">
        <div className="grid grid-cols-2">
          {gameModes.map((item) => {
            return (
              <div className="border border-gray-700 bg-black/80 rounded-md p-4 cursor-pointer">
                <img src={item.image} className="object-fit w-full h-full" />
                <div className=" text-center">
                  <span className="text-2xl">{item.name}</span>
                  {/* <span>Game Rules</span> */}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function ScreenSettings() {
  return (
    <div className="flex flex-col">
      <div className="flex justify-center mb-[50px] z-10">
        <span className="text-4xl font-bold text-center py-4 px-3 rounded bg-black/50 backdrop-blur mb-2">Settings</span>
      </div>
      <div className="bg-black/80 rounded-lg dotted w-[750px] neon flick h-[600px]">
        <header className="text-center">
          <nav className="space-x-4">
            <button>Audio</button>
            <button className="text-orange-300">Language</button>
            <button>Theme</button>
          </nav>
        </header>
        <section className="w-full h-full px-4 py-8">

          {/* <SettingsAudio /> */}
          {/* <SettingsLanguages /> */}
        </section>
      </div>
    </div>
  )
}

function ScreenMain() {
  return (
    <>
      <Logo />
      <Menu />
    </>
  )
}

function MenuBody() {
  return (
    <div className="h-full w-full theme-4 overflow-auto">
      <div className="h-full w-full z-10 relative">
        <ActionBar />
        <div className="flex flex-col items-center pt-30 h-full w-full">
          <ScreenMain />
          {/* <ScreenGameModes /> */}


          {/* <ScreenSettings /> */}
        </div>
      </div>
      <Overlay />
      <div className="bg-black/55 absolute top-0 right-0 left-0 bottom-0"></div>
    </div>
  )
}

function Page() {
  return (
    <div className="relative h-full w-full">
      <MenuBody />
    </div>
  );
}

export default Page
