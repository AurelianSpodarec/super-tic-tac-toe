// "use client"

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

function SceneMenu() {
  return (
    <div className="h-full w-full theme-scene-menu" style={{ backgroundImage: "url('/images/brick.svg')" }}>

      <div className="relative h-full w-full z-10 flex flex-col items-center pt-24">
        <Logo />
        <nav className="flex flex-col space-y-6 mb-10">
          <MenuButton label="Single Player" />
          <MenuButton label="Local Co-Op" />
          <MenuButton label="Multiplayer" />
          <MenuButton label="Leaderboard" />
          <MenuButton label="Settings" />
        </nav>
        <span className="text-gray-200 text-xs">Made by Aurelian Spodarec 🎷🎵</span>
      </div>
      <Overlay />
    </div>
  )
}

export default function App() {
  return (
    <div className="h-full w-full">
      <SceneMenu />
    </div>
  )
}