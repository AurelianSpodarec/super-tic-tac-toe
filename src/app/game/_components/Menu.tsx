'use client'

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

// ----------------- DATA -----------------
const modes = [
  { id: "ticTacToe", label: "Tic Tac Toe" },
  { id: "ultimateTicTacToe", label: "Ultimate Tic Tac Toe" },
  { id: "challenges", label: "Challenges" }
];

const playStyles = [
  { id: "singlePlayer", label: "Single Player", type: "submenu", modeIds: ["ticTacToe", "ultimateTicTacToe", "challenges"] },
  { id: "coOp", label: "Co-Op", type: "submenu", modeIds: ["ticTacToe", "ultimateTicTacToe"] },
  { id: "multiplayer", label: "Multiplayer", type: "submenu", modeIds: ["ticTacToe", "ultimateTicTacToe", "challenges"] }
];

const menuExtras = [
  { id: "themes", label: "Themes", type: "action" },
  { id: "info", label: "Game Rules", type: "action" }
];

// ----------------- TYPES -----------------
type Screen =
  | { type: "menu" }
  | { type: "submenu"; submenuId: string }
  | { type: "game"; modeId: string };

// ----------------- MENU ITEMS COMPONENT -----------------
function MenuItems({ items, onClick, direction = "leftToCenter" }: { items: any[], onClick: (item: any) => void, direction?: "leftToCenter" | "bottomToTop" }) {
  return (
    <>
      {items.map((item, i) => {
        let initial = { opacity: 0, x: 0, y: 0 };
        let animate = { opacity: 1, x: 0, y: 0 };

        if (direction === "leftToCenter") {
          initial.x = -120 - i * 10; // asymmetric left offset
          animate.x = 0;
        } else if (direction === "bottomToTop") {
          initial.y = 120 + i * 10; // asymmetric bottom offset
          animate.y = 0;
        }

        return (
          <motion.button
            key={item.id}
            initial={initial}
            animate={animate}
            transition={{ delay: i * 0.05, type: "spring", stiffness: 300, damping: 25 }}
            onClick={() => onClick(item)}
            style={{
              display: "block",
              width: "100%",
              padding: 12,
              marginBottom: 8,
              cursor: "pointer",
              fontWeight: "bold",
              textAlign: "left"
            }}
          >
            {item.label}
          </motion.button>
        );
      })}
    </>
  );
}

// ----------------- MAIN MENU -----------------
function MainMenu({ onSelect }: { onSelect: (item: any) => void }) {
  const items = [...playStyles, ...menuExtras];
  return <MenuItems items={items} onClick={onSelect} direction="leftToCenter" />;
}

// ----------------- SUBMENU -----------------
function SubMenu({ submenuId, onBack, onSelect }: { submenuId: string; onBack: () => void; onSelect: (mode: any) => void }) {
  const submenu = playStyles.find(p => p.id === submenuId);
  const items = submenu ? submenu.modeIds.map(id => modes.find(m => m.id === id)) : [];

  return (
    <div className="p-4">
      <motion.button
        onClick={onBack}
        style={{ marginBottom: 12, cursor: "pointer", fontWeight: "bold" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0 }}
      >
        ← Back
      </motion.button>
      <MenuItems items={items} onClick={onSelect} direction="bottomToTop" />
    </div>
  );
}

// ----------------- GAME SCREEN -----------------
function GameScreen({ modeId, onExit }: { modeId: string; onExit: () => void }) {
  const mode = modes.find(m => m.id === modeId);

  return (
    <div className="p-4">
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {mode?.label || "Game"}
      </motion.h1>
      <motion.button
        onClick={onExit}
        style={{ marginTop: 24, padding: 12, cursor: "pointer" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        Exit Game
      </motion.button>
    </div>
  );
}

// ----------------- MAIN MENU MANAGER -----------------
export default function Menu() {
  const [currentScreen, setCurrentScreen] = useState<Screen>({ type: "menu" });
  const [prevScreenType, setPrevScreenType] = useState<string>("menu"); // track previous screen type

  const handleMenuSelect = (item: any) => {
    if (item.type === "submenu") {
      setPrevScreenType(currentScreen.type);
      setCurrentScreen({ type: "submenu", submenuId: item.id });
    } else if (item.type === "action") {
      alert(`${item.label} clicked`);
    }
  };

  const handleModeSelect = (mode: any) => {
    setPrevScreenType(currentScreen.type);
    setCurrentScreen({ type: "game", modeId: mode.id });
  };

  const handleBackToMenu = () => {
    setPrevScreenType(currentScreen.type);
    setCurrentScreen({ type: "menu" });
  };

  // Only fade entire screen when switching between menu and game
  const isScreenFade = prevScreenType === "game" || currentScreen.type === "game";

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        {currentScreen.type === "menu" && (
          <motion.div
            key="menu-screen"
            initial={isScreenFade ? { opacity: 0 } : {}}
            animate={{ opacity: 1 }}
            exit={isScreenFade ? { opacity: 0 } : {}}
            transition={{ duration: 0.15 }}
            style={{ position: "absolute", width: "100%", height: "100%" }}
          >
            <MainMenu onSelect={handleMenuSelect} />
          </motion.div>
        )}

        {currentScreen.type === "submenu" && (
          <motion.div
            key={`submenu-${currentScreen.submenuId}`}
            initial={isScreenFade ? { opacity: 0 } : {}}
            animate={{ opacity: 1 }}
            exit={isScreenFade ? { opacity: 0 } : {}}
            transition={{ duration: 0.15 }}
            style={{ position: "absolute", width: "100%", height: "100%" }}
          >
            <SubMenu
              submenuId={currentScreen.submenuId}
              onBack={handleBackToMenu}
              onSelect={handleModeSelect}
            />
          </motion.div>
        )}

        {currentScreen.type === "game" && (
          <motion.div
            key={`game-${currentScreen.modeId}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{ position: "absolute", width: "100%", height: "100%" }}
          >
            <GameScreen modeId={currentScreen.modeId} onExit={handleBackToMenu} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
