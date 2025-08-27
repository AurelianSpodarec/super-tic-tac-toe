"use client"

import ActionBar from "./_components/ActionBar"
import Logo from "./_components/Logo"
import { MenuButton } from "./_components/MenuButton"
import Overlay from "./_components/Overlay"

// //////////////////////////////////////////////////////////
// // Imports
// //////////////////////////////////////////////////////////
// import React, { createContext, useContext, useState, useEffect } from "react"
// import { AnimatePresence, motion } from "motion/react"
// import Logo from "./_components/Logo"
// import { MenuButton } from "./_components/MenuButton"
// import Overlay from "./_components/Overlay"

// //////////////////////////////////////////////////////////
// // Navigation Context
// //////////////////////////////////////////////////////////
// type ScreenKey = "menu" | "game" | "settings"

// const NavigationContext = createContext<{
//   current: ScreenKey
//   navigate: (key: ScreenKey) => void
// }>({
//   current: "menu",
//   navigate: () => { },
// })

// function NavigationProvider({ children }: { children: React.ReactNode }) {
//   const [current, setCurrent] = useState<ScreenKey>("menu")
//   const navigate = (key: ScreenKey) => setCurrent(key)
//   return (
//     <NavigationContext.Provider value={{ current, navigate }}>
//       {children}
//     </NavigationContext.Provider>
//   )
// }

// export function useNavigation() {
//   return useContext(NavigationContext)
// }

// //////////////////////////////////////////////////////////
// // Screen Lifecycle Hook
// //////////////////////////////////////////////////////////
// type LifecycleFn = () => void
// const lifecycleRegistry: Record<string, { onEnter?: LifecycleFn; onExit?: LifecycleFn }> = {}

// export function useScreenLifecycle(
//   screenKey: string,
//   { onEnter, onExit }: { onEnter?: LifecycleFn; onExit?: LifecycleFn }
// ) {
//   useEffect(() => {
//     lifecycleRegistry[screenKey] = { onEnter, onExit }
//     return () => {
//       delete lifecycleRegistry[screenKey]
//     }
//   }, [screenKey, onEnter, onExit])
// }

// //////////////////////////////////////////////////////////
// // Overlay System (Optional Global Effects)
// //////////////////////////////////////////////////////////
// type OverlayEffect = {
//   id: string
//   component: React.FC<{ entering: boolean }>
// }
// const overlayRegistry: OverlayEffect[] = []

// export function registerOverlay(effect: OverlayEffect) {
//   overlayRegistry.push(effect)
// }

// function OverlayLayer({ entering }: { entering: boolean }) {
//   return (
//     <AnimatePresence mode="wait">
//       {overlayRegistry.map((overlay) => {
//         const Comp = overlay.component
//         return <Comp key={overlay.id} entering={entering} />
//       })}
//     </AnimatePresence>
//   )
// }

// //////////////////////////////////////////////////////////
// // Example Overlay: Fade Curtain
// //////////////////////////////////////////////////////////
// function FadeCurtain({ entering }: { entering: boolean }) {
//   return (
//     <motion.div
//       initial={{ opacity: entering ? 1 : 0 }}
//       animate={{ opacity: entering ? 0 : 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.3 }}
//       style={{
//         position: "absolute",
//         inset: 0,
//         background: "black",
//         pointerEvents: "none",
//         zIndex: 999,
//       }}
//     />
//   )
// }
// registerOverlay({ id: "fadeCurtain", component: FadeCurtain })

// //////////////////////////////////////////////////////////
// // Backgrounds
// //////////////////////////////////////////////////////////
// const BACKGROUNDS: Record<string, React.CSSProperties & { classes?: string }> = {
//   menuGroup: {
//     backgroundImage: "url('/images/brick.svg')",
//     backgroundPosition: "center",
//     classes: "theme-4",
//   },
//   game: {
//     backgroundImage: "url('/images/bollywood.jpg')",
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//   },
// };

// // Also need to add an overlay for menuroup, something the game might or might not have

// function BackgroundLayer({ backgroundKey }: { backgroundKey: string }) {
//   const { classes, ...style } = BACKGROUNDS[backgroundKey] as any;

//   return (
//     <motion.div
//       key={backgroundKey}
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.3 }}
//       className={classes || ""}
//       style={{
//         position: "absolute",
//         inset: 0,
//         ...style,
//       }}
//     />
//   );
// }


// //////////////////////////////////////////////////////////
// // Screens
// //////////////////////////////////////////////////////////
// function MenuScreen() {
//   const { navigate } = useNavigation()
//   useScreenLifecycle("menu", {
//     onEnter: () => console.log("Menu entered"),
//     onExit: () => console.log("Menu exited"),
//   })
//   return (
//     <div className="p-10">
//       <div className="z-10 relative">
//       <Logo />
//       <nav className="flex flex-col space-y-6">
//         <MenuButton label="Single Player" onClick={() => navigate("game")} />
//         {/* <MenuButton label="Local Co-Op" onClick={() => navigate("test")} /> */}
//         {/* <MenuButton label="Multiplayer" onClick={() => navigate("game")} /> */}
//         {/* <MenuButton label="Leaderboard" onClick={() => navigate("leaderboard")} /> */}
//         <MenuButton label="Settings" onClick={() => navigate("settings")} />
//       </nav>
//       </div>

//       <Overlay />
//     </div>
//   )
// }

// function GameScreen() {
//   const { navigate } = useNavigation()
//   useScreenLifecycle("game", {
//     onEnter: () => console.log("Game entered"),
//     onExit: () => console.log("Game exited"),
//   })
//   return (
//     <div style={{ padding: 40 }}>
//       <h1>Game</h1>
//       <button onClick={() => navigate("menu")}>Back to Menu</button>
//     </div>
//   )
// }

// function SettingsScreen() {
//   const { navigate } = useNavigation()
//   useScreenLifecycle("settings", {
//     onEnter: () => console.log("Settings entered"),
//     onExit: () => console.log("Settings exited"),
//   })
//   return (
//     <div style={{ padding: 40 }}>
//       <h1>Settings</h1>
//       <button onClick={() => navigate("menu")}>Back</button>
//     </div>
//   )
// }

// //////////////////////////////////////////////////////////
// // Screen Registry
// //////////////////////////////////////////////////////////
// const SCREENS: Record<
//   ScreenKey,
//   { component: React.FC; backgroundKey: string }
// > = {
//   menu: { component: MenuScreen, backgroundKey: "menuGroup" },
//   settings: { component: SettingsScreen, backgroundKey: "menuGroup" },
//   game: { component: GameScreen, backgroundKey: "game" },
// }

// //////////////////////////////////////////////////////////
// // Transition Wrapper
// //////////////////////////////////////////////////////////

// function TransitionWrapper({
//   children,
//   screenKey,
//   skipFade,
// }: {
//   children: React.ReactNode
//   screenKey: string
//   skipFade?: boolean
// }) {
//   return (
//     <motion.div
//       key={screenKey}
//       initial={skipFade ? false : { opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       transition={{ duration: 0.3 }}
//       style={{
//         position: "absolute",
//         inset: 0,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       {children}
//     </motion.div>
//   )
// }


// //////////////////////////////////////////////////////////
// // SceneRenderer
// //////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////
// // SceneRenderer
// //////////////////////////////////////////////////////////
// function SceneRenderer() {
//   const { current } = useNavigation()
//   const { component: Component, backgroundKey } = SCREENS[current]
//   const [hasMounted, setHasMounted] = useState(false)
//   const [prevScreen, setPrevScreen] = useState<ScreenKey | null>(null)

//   useEffect(() => {
//     // Mark first mount
//     setHasMounted(true)
//   }, [])

//   useEffect(() => {
//     setPrevScreen(current)
//   }, [current])

//   // Determine if we should animate this screen
//   const skipInitialFade =
//     !hasMounted && current === "menu" // first load on MenuScreen

//   return (
//     <div
//       style={{
//         position: "relative",
//         width: "100vw",
//         height: "100vh",
//         overflow: "hidden",
//       }}
//     >
//       {/* Background */}
//       <AnimatePresence mode="wait">
//         <BackgroundLayer
//           key={backgroundKey}
//           backgroundKey={backgroundKey}
//           skipFade={skipInitialFade}
//         />
//       </AnimatePresence>

//       {/* Overlays */}
//       <OverlayLayer entering={!skipInitialFade} />

//       {/* Screen */}
//       <AnimatePresence mode="wait">
//         <TransitionWrapper
//           screenKey={current}
//           skipFade={skipInitialFade}
//         >
//           <Component />
//         </TransitionWrapper>
//       </AnimatePresence>
//     </div>
//   )
// }


// //////////////////////////////////////////////////////////
// // App Entry
// //////////////////////////////////////////////////////////
// export default function App() {
//   return (
//     <NavigationProvider>
//       <SceneRenderer />
//     </NavigationProvider>
//   )
// }

















import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

// ------------------------
// Scene Manager Types
// ------------------------
export interface Scene {
  key: string;
  component: ReactNode;
  backgroundKey?: string;
  onEnter?: () => void;
  onExit?: () => void;
}

interface SceneManagerContextType {
  stack: string[];
  currentScene: string | null;
  getScene: (key: string) => Scene | undefined;
  switchScene: (key: string) => void;
  pushScene: (key: string) => void;
  popScene: () => void;
  back: (overrideKey?: string) => void;
}

const SceneManagerContext = createContext<SceneManagerContextType | null>(null);
export const useSceneManager = () => {
  const ctx = useContext(SceneManagerContext);
  if (!ctx) throw new Error("useSceneManager must be used inside SceneManagerProvider");
  return ctx;
};

// ------------------------
// Scene Manager Provider
// ------------------------
interface Props {
  initialScene: string;
  scenes: Scene[];
  children: ReactNode;
}

export function SceneManagerProvider({ initialScene, scenes, children }: Props) {
  const [stack, setStack] = useState<string[]>([initialScene]);

  const getScene = (key: string) => scenes.find((s) => s.key === key);

  const switchScene = (key: string) => {
    const oldKey = stack[stack.length - 1];
    getScene(oldKey)?.onExit?.();
    getScene(key)?.onEnter?.();
    setStack([key]);
  };

  const pushScene = (key: string) => {
    getScene(key)?.onEnter?.();
    setStack((prev) => [...prev, key]);
  };

  const popScene = () => {
    if (stack.length <= 1) return;
    const oldKey = stack[stack.length - 1];
    getScene(oldKey)?.onExit?.();
    setStack((prev) => prev.slice(0, -1));
  };

  const back = (overrideKey?: string) => {
    if (overrideKey) {
      const oldKey = stack[stack.length - 1];
      getScene(oldKey)?.onExit?.();
      getScene(overrideKey)?.onEnter?.();
      setStack([overrideKey]);
    } else {
      popScene();
    }
  };

  const currentScene = stack[stack.length - 1] || null;

  return (
    <SceneManagerContext.Provider
      value={{ stack, getScene, switchScene, pushScene, popScene, back, currentScene }}
    >
      {children}
    </SceneManagerContext.Provider>
  );
}

// ------------------------
// Original Background Components
// ------------------------
function BackgroundVariantOne({ children }: any) {
  return (
    <div
      className="h-full w-full theme-scene-menu"
      style={{ backgroundImage: "url('/images/brick.svg')" }}
    >
      <audio />
      <div className="relative h-full w-full z-10 flex flex-col items-center">{children}</div>
      <Overlay />
    </div>
  );
}

function BackgroundVariantTwo({ children }: any) {
  return (
    <div
      className="h-full w-full bg-cover bg-no-repeat"
      style={{ backgroundImage: "url('/images/bollywood.jpg')" }}
    >
      <audio />
      <div className="relative h-full w-full z-10 flex flex-col items-center">{children}</div>
      <Overlay />
    </div>
  );
}


// ------------------------
// Background Renderer with Fade
// ------------------------
const backgroundMap: Record<string, React.ComponentType<{ children: ReactNode }>> = {
  variantOne: BackgroundVariantOne,
  variantTwo: BackgroundVariantTwo
};

function BackgroundRenderer({ backgroundKey, children }: { backgroundKey?: string; children?: ReactNode }) {
  const [prevKey, setPrevKey] = useState<string | null>(null);
  const [currentKey, setCurrentKey] = useState(backgroundKey);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (backgroundKey && backgroundKey !== currentKey) {
      setPrevKey(currentKey);
      setCurrentKey(backgroundKey);
      setFade(true);

      const timer = setTimeout(() => {
        setPrevKey(null);
        setFade(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [backgroundKey]);

  const PrevBackground = prevKey ? backgroundMap[prevKey] : null;
  const CurrentBackground = currentKey ? backgroundMap[currentKey] : null;

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
      {PrevBackground && (
        <div className="absolute top-0 left-0 w-full h-full transition-opacity duration-500" style={{ opacity: fade ? 0 : 1 }}>
          <PrevBackground>{children}</PrevBackground>
        </div>
      )}
      {CurrentBackground && (
        <div className="absolute top-0 left-0 w-full h-full transition-opacity duration-500" style={{ opacity: fade ? 1 : 1 }}>
          <CurrentBackground>{children}</CurrentBackground>
        </div>
      )}
    </div>
  );
}

// ------------------------
// Scene Renderer
// ------------------------
function SceneRenderer() {
  const { currentScene, getScene } = useSceneManager();
  if (!currentScene) return null;

  const scene = getScene(currentScene);
  return (
    <div className="relative h-full w-full">
      <BackgroundRenderer backgroundKey={scene?.backgroundKey}>{scene?.component}</BackgroundRenderer>
    </div>
  );
}

// ------------------------
// Scenes
// ------------------------
function SceneMenu() {
  const { pushScene } = useSceneManager();
  return (
    <div className="flex flex-col items-center pt-24">
      <Logo />
      <nav className="flex flex-col mb-10">
        <MenuButton label="Single Player" isActive={true} onClick={() => pushScene("gameModes")} />
        <MenuButton label="Local Co-Op" />
        <MenuButton label="Multiplayer" />
        <MenuButton label="Leaderboard" onClick={() => pushScene("leaderboard")} />
        <MenuButton label="Settings" />
      </nav>
    </div>
  );
}


const dataGameModes = [
  {
    name: "TicTacToe",
    image: "/images/tic-tac-toe.svg",
    modeId: "modeTicTacToe"
  },
  // {
  //   name: "Super TicTacToe",
  //   image: "https://i.imgur.com/DlWB4Ua.png",
  //   modeId: "modeSuperTicTacToe"
  // }
]

function SceneGameModes() {
  const { pushScene } = useSceneManager();
  return (
    <div className="flex flex-col items-center justify-center h-full w-full text-white gap-4">

      <h1 className="text-5xl">Game Modes</h1>
      <div className="max-w-[700px] flex">
        {dataGameModes.map((item) => {
          return (
            <button type="button" onClick={() => pushScene(item.modeId)} className="flex flex-col w-[300px] rounded bg-[#ffac99] p-4">
              <img src={item.image} className="w-full h-full" />
              <span className="text-black">{item.name}</span>
            </button>
          )
        })}
      </div>

    </div>
  );
}

function SceneLeaderboard() {
  return (
    <div className="flex items-center justify-center h-full w-full text-white text-2xl pt-24">
      Leaderboard Scene
    </div>
  );
}

function SceneModeTicTacToe() {
  return (
    <div className="flex items-center justify-center h-full w-full text-white text-2xl pt-24">
      Tic Tac Toe Scene
    </div>
  );
}

function SceneModeSuperTicTacToe() {
  return (
    <div className="flex items-center justify-center h-full w-full text-white text-2xl pt-24">
      Super Tic Tac Toe Scene
    </div>
  );
}

// ------------------------
// Scene Config
// ------------------------
const scenes: Scene[] = [
  { key: "menu", component: <SceneMenu />, backgroundKey: "variantOne" },
  { key: "gameModes", component: <SceneGameModes />, backgroundKey: "variantOne" },
  { key: "leaderboard", component: <SceneLeaderboard />, backgroundKey: "variantTwo" },
  { key: "modeTicTacToe", component: <SceneModeTicTacToe />, backgroundKey: "variantTwo" },
  { key: "modeSuperTicTacToe", component: <SceneModeSuperTicTacToe />, backgroundKey: "variantTwo" }
];

// ------------------------
// App
// ------------------------
export default function App() {
  return (
    <SceneManagerProvider initialScene="menu" scenes={scenes}>
      <div className="relative h-screen w-screen">
        <SceneRenderer />
      </div>
    </SceneManagerProvider>
  );
}
