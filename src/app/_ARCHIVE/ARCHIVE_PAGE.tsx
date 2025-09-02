
// import { useEffect, useRef, useState, useCallback } from "react";


// function Cog() {
//   const pathRef = useRef<SVGPathElement>(null);

//   useEffect(() => {
//     const path = pathRef.current;
//     if (!path) return;

//     const length = path.getTotalLength();
//     path.style.strokeDasharray = length;
//     path.style.strokeDashoffset = length;

//     // Animate
//     path.style.transition = "stroke-dashoffset 2s ease-in-out";
//     requestAnimationFrame(() => {
//       path.style.strokeDashoffset = "0";
//     });
//   }, []);

//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 256 256"
//       width="150"
//       height="150"
//     >
//       <defs>
//         <filter id="glow">
//           <feGaussianBlur stdDeviation="4" result="coloredBlur" />
//           <feMerge>
//             <feMergeNode in="coloredBlur" />
//             <feMergeNode in="SourceGraphic" />
//           </feMerge>
//         </filter>
//       </defs>

//       <path
//         ref={pathRef}
//         d="M128 82a46 46 0 1 0 46 46 46.06 46.06 0 0 0-46-46m0 80a34 34 0 1 1 34-34 34 34 0 0 1-34 34m108-54.4a6 6 0 0 0-2.92-4l-30.44-17.38..."
//         stroke="#ff005d"
//         strokeWidth="3"
//         fill="transparent"
//         filter="url(#glow)"
//       />
//     </svg>
//   );
// }




// function LanguageButton() {
//   return (
//     <div>

//     </div>
//   )
// }




// const languages = [
//   { "code": "en", "name": "English" },
//   { "code": "en-GB", "name": "English (UK)" },
//   { "code": "es", "name": "Español" },
//   { "code": "zh", "name": "中文" },
//   { "code": "it", "name": "Italiano" },
//   { "code": "fr", "name": "Français" },
//   { "code": "de", "name": "Deutsch" },
//   { "code": "pl", "name": "Polski" },
//   { "code": "ja", "name": "日本語" },
//   { "code": "ru", "name": "Русский" },
//   { "code": "pt", "name": "Português" },
//   { "code": "ar", "name": "العربية" },
//   { "code": "ko", "name": "한국어" }
// ]


// function SettingsLanguages() {
//   return (
//     <div className="grid grid-cols-4 gap-4">
//       {languages.map((item) => (
//         <button type="button" key={item.code} className="cursor-pointer border rounded text-center py-4">
//           {item.name}
//         </button>
//       ))}
//     </div>
//   );
// }


// function SettingsAudio() {
//   return (
//     <section className="space-y-4 mb-10">

//       <div className="flex flex-col text-center">
//         <label className="text-lg">Music Volume</label>
//         <input type="range" />
//       </div>

//       <div className="flex flex-col text-center">
//         <label className="text-lg">SFX Volume</label>
//         <input type="range" />
//       </div>

//     </section>
//   )
// }

// function MultiplayerLobby() {
//   return (
//     <div>

//     </div>
//   )
// }


// function MenuScene({ children }) {
//   return (
//     <div className="h-full w-full theme-4 overflow-auto">
//       {children}
//       <Overlay />
//     </div>
//   )
// }

// function GameScene() {
//   return (
//     <div>

//     </div>
//   )
// }




// const scenes = [
//   { key: "start", component: <SceneStart /> },
//   { key: "settings", component: <SceneSettings /> },
//   { key: "gameModes", component: <SceneGameModes /> },
//   { key: "modeTicTacToe", component: <SceneModeTicTacToe /> }
// ];

// const scenes: Scene[] = [
//   {
//     key: "start",
//     component: <SceneStart />,
//     audioKey: "menu",
//     backgroundKey: "menu",
//     transitionDuration: 1000,
//     onEnter: () => console.log("Entered Start"),
//     onExit: () => console.log("Exiting Start"),
//   },
//   {
//     key: "gameModes",
//     component: <SceneGameModes />,
//     audioKey: "gameMenu",
//     backgroundKey: "gameMenu",
//     transitionDuration: 800,
//   },
//   {
//     key: "modeTicTacToe",
//     component: <SceneModeTicTacToe />,
//     audioKey: "tictactoe",
//     backgroundKey: "tictactoe",
//     transitionDuration: 1200,
//   },
// ];


// export default function Page() {
//   const audioRef = useRef(null);

//   // Handler to start audio on first click
//   useEffect(() => {
//     const handleUserInteraction = () => {
//       if (audioRef.current) {
//         audioRef.current.play().catch(err => console.log("Play blocked:", err));
//       }
//       // Remove the listener after first interaction
//       window.removeEventListener("click", handleUserInteraction);
//       window.removeEventListener("touchstart", handleUserInteraction);
//     };

//     window.addEventListener("click", handleUserInteraction);
//     window.addEventListener("touchstart", handleUserInteraction);

//     return () => {
//       window.removeEventListener("click", handleUserInteraction);
//       window.removeEventListener("touchstart", handleUserInteraction);
//     };
//   }, []);

//   return (
//     <GameProvider initialScene="start" scenes={scenes}>
//       <MenuScene>

//         <div className="h-full w-full z-10 relative">
//           <ActionBar />
//           <div className="flex flex-col items-center pt-30 h-full w-full">
//             <SceneRenderer />
//           </div>
//         </div>

//       </MenuScene>
//     </GameProvider>
//   )
// }