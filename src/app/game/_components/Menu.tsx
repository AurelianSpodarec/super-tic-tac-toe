'use client'

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

// ----------------- DATA -----------------
export const modes = [
  { id: "ticTacToe", label: "Tic Tac Toe" },
  { id: "ultimateTicTacToe", label: "Ultimate Tic TacToe" },
  { id: "challenges", label: "Challenges" }
];

export const playStyles = [
  { id: "singlePlayer", label: "Single Player", type: "submenu", modeIds: ["ticTacToe", "ultimateTicTacToe", "challenges"] },
  { id: "coOp", label: "Co-Op", type: "submenu", modeIds: ["ticTacToe", "ultimateTicTacToe"] },
  { id: "multiplayer", label: "Multiplayer", type: "submenu", modeIds: ["ticTacToe", "ultimateTicTacToe", "challenges"] }
];

export const menuExtras = [
  {
    id: "settings",
    label: "Settings",
    type: "submenu",
    options: ["Audio", "Sound"]
  },
  {
    id: "language",
    label: "Language 🌐",
    type: "submenu",
    options: ["EN", "ES", "PL", "IT"]
  },
  { id: "leaderboard", label: "Leaderboard", type: "action"},
  { id: "themes", label: "Themes", type: "action" },
];

// ----------------- TYPES -----------------
type Screen =
  | { type: "menu" }
  | { type: "submenu"; submenuId: string; options?: string[] }
  | { type: "game"; modeId: string };

type Direction = "leftToCenter" | "bottomToTop";

// ----------------- HELPERS -----------------
const getAnimation = (direction: Direction, index: number) => {
  if (direction === "leftToCenter") {
    return { initial: { opacity: 0, x: -120 - index * 10 }, animate: { opacity: 1, x: 0 } };
  } else if (direction === "bottomToTop") {
    return { initial: { opacity: 0, y: 120 + index * 10 }, animate: { opacity: 1, y: 0 } };
  }
  return { initial: {}, animate: {} };
};

// ----------------- MENU ITEMS -----------------
function MenuItems({
  items,
  onClick,
  direction = "leftToCenter",
  type = "default"
}: { items: any[]; onClick: (item: any) => void; direction?: Direction; type?: "default" | "settings" | "language" }) {
  return (
    <>
      {items.map((item, i) => {
        const anim = getAnimation(direction, i);

        return (
          <motion.div
            key={item.id || item}
            initial={anim.initial}
            animate={anim.animate}
            transition={{ delay: i * 0.05, type: "spring", stiffness: 300, damping: 25 }}
          >
            {type === "settings" ? (
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: "block", fontWeight: "bold", marginBottom: 4 }}>{item}</label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  defaultValue={50}
                  style={{ width: "100%" }}
                  onChange={(e) => console.log(`${item} set to ${e.target.value}`)}
                />
              </div>
            ) : (
              <button
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
                {item.label || item}
              </button>
            )}
          </motion.div>
        );
      })}
    </>
  );
}

// ----------------- SCREENS -----------------
function MainMenu({ onSelect }: { onSelect: (item: any) => void }) {
  const items = [...playStyles, ...menuExtras];
  return <MenuItems items={items} onClick={onSelect} direction="leftToCenter" />;
}

function SubMenuScreen({
  submenuId,
  options,
  onBack,
  onSelect
}: {
  submenuId: string;
  options?: string[];
  onBack: () => void;
  onSelect: (item: any) => void;
}) {
  let items: any[] = [];
  let type: "default" | "settings" | "language" = "default";

  const submenu = playStyles.find(p => p.id === submenuId);
  if (submenu) items = submenu.modeIds.map(id => modes.find(m => m.id === id)).filter(Boolean);
  else if (options) {
    items = options;
    type = submenuId === "settings" ? "settings" : "language";
  }

  return (
    <div className="p-4">
      <motion.button
        onClick={onBack}
        style={{ marginBottom: 12, cursor: "pointer", fontWeight: "bold" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        ← Back
      </motion.button>
      <MenuItems items={items} onClick={onSelect} direction="bottomToTop" type={type} />
    </div>
  );
}

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

// ----------------- MAIN MANAGER -----------------
export default function MenuManager() {
  const [currentScreen, setCurrentScreen] = useState<Screen>({ type: "menu" });
  const [prevScreenType, setPrevScreenType] = useState<string>("menu");

  const handleMenuSelect = (item: any) => {
    if (item.type === "submenu") {
      setPrevScreenType(currentScreen.type);
      setCurrentScreen({ type: "submenu", submenuId: item.id, options: item.options });
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
            <SubMenuScreen
              submenuId={currentScreen.submenuId}
              options={currentScreen.options}
              onBack={handleBackToMenu}
              onSelect={(item) => {
                if (typeof item === "string") console.log(`${item} selected`);
                else handleModeSelect(item);
              }}
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
