'use client'

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

// ==========================
// 1. DATA
// ==========================
export const modes = [
  { id: "ticTacToe", label: "Tic Tac Toe" },
  { id: "ultimateTicTacToe", label: "Ultimate TicTacToe" },
  { id: "challenges", label: "Challenges" }
];

export const playStyles = [
  { id: "singlePlayer", label: "Single Player", type: "submenu", modeIds: ["ticTacToe", "ultimateTicTacToe", "challenges"] },
  { id: "coOp", label: "Co-Op", type: "submenu", modeIds: ["ticTacToe", "ultimateTicTacToe"] },
  { id: "multiplayer", label: "Multiplayer", type: "lobbyEntry" } // now jumps to lobby
];

export const menuExtras = [
  { id: "settings", label: "Settings", type: "submenu", options: ["Audio", "Sound"] },
  { id: "language", label: "Language 🌐", type: "submenu", options: ["EN", "ES", "PL", "IT"] },
  { id: "leaderboard", label: "Leaderboard", type: "action"},
  { id: "themes", label: "Themes", type: "action" },
];

// ==========================
// 2. TYPES
// ==========================
type Screen =
  | { type: "menu" }
  | { type: "submenu"; submenuId: string; options?: string[] }
  | { type: "lobby" }
  | { type: "game"; modeId: string };

type Direction = "leftToCenter" | "bottomToTop";

// ==========================
// 3. HELPERS
// ==========================
const getAnimation = (direction: Direction, index: number) => {
  if (direction === "leftToCenter") return { initial: { opacity: 0, x: -120 - index * 10 }, animate: { opacity: 1, x: 0 } };
  if (direction === "bottomToTop") return { initial: { opacity: 0, y: 120 + index * 10 }, animate: { opacity: 1, y: 0 } };
  return { initial: {}, animate: {} };
};

// ==========================
// 4. MENU ITEM WRAPPER
// ==========================
interface MenuItemWrapperProps {
  index: number;
  direction?: Direction;
  children: React.ReactNode;
}

function MenuItemWrapper({ index, direction = "leftToCenter", children }: MenuItemWrapperProps) {
  const anim = getAnimation(direction, index);
  return (
    <motion.div
      initial={anim.initial}
      animate={anim.animate}
      transition={{ delay: index * 0.05, type: "spring", stiffness: 300, damping: 25 }}
    >
      {children}
    </motion.div>
  );
}

// ==========================
// 5. MENU ITEM COMPONENTS
// ==========================
function ActionItem({ item, onClick }: { item: any; onClick: (item: any) => void }) {
  return (
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
  );
}

function SettingsItem({ item }: { item: string }) {
  return (
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
  );
}

// ==========================
// 6. MENU ITEMS
// ==========================
interface MenuItemsProps {
  items: any[];
  onClick: (item: any) => void;
  direction?: Direction;
  type?: "default" | "settings" | "language";
}

function MenuItems({ items, onClick, direction = "leftToCenter", type = "default" }: MenuItemsProps) {
  return (
    <>
      {items.map((item, i) => (
        <MenuItemWrapper key={item.id || item} index={i} direction={direction}>
          {type === "settings" ? <SettingsItem item={item} /> : <ActionItem item={item} onClick={onClick} />}
        </MenuItemWrapper>
      ))}
    </>
  );
}

// ==========================
// 7. SCREENS
// ==========================
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
  if (submenu && submenu.modeIds) items = submenu.modeIds.map(id => modes.find(m => m.id === id)).filter(Boolean);
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

// ---- Lobby Screen ----
function LobbyScreen({ lobbies, onBack, onJoin, onCreate }: {
  lobbies: { id: string; name: string }[];
  onBack: () => void;
  onJoin: (lobbyId: string) => void;
  onCreate: () => void;
}) {
  return (
    <div className="p-4">
      <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        Multiplayer Lobbies
      </motion.h2>
      <motion.button
        onClick={onBack}
        style={{ margin: "12px 0", cursor: "pointer", fontWeight: "bold" }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        ← Back
      </motion.button>
      <div>
        {lobbies.map((lobby, i) => (
          <MenuItemWrapper key={lobby.id} index={i}>
            <button
              onClick={() => onJoin(lobby.id)}
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
              {lobby.name}
            </button>
          </MenuItemWrapper>
        ))}
      </div>
      <motion.button
        onClick={onCreate}
        style={{ marginTop: 16, padding: 12, cursor: "pointer" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        + Create New Lobby
      </motion.button>
    </div>
  );
}

// ---- Modal for creating lobby ----
function CreateLobbyModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: (name: string, maxPlayers: number) => void }) {
  const [name, setName] = useState("");
  const [maxPlayers, setMaxPlayers] = useState(4);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <motion.div
        className="bg-white p-6 rounded-lg w-80"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <h3 className="font-bold mb-4">Create Lobby</h3>
        <input
          placeholder="Lobby Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full mb-3"
        />
        <input
          type="number"
          value={maxPlayers}
          onChange={(e) => setMaxPlayers(Number(e.target.value))}
          min={2}
          max={10}
          className="border p-2 w-full mb-3"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 bg-gray-300 rounded">Cancel</button>
          <button
            onClick={() => { onSubmit(name, maxPlayers); onClose(); }}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Create
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ---- Game ----
function GameScreen({ modeId, onExit }: { modeId: string; onExit: () => void }) {
  const mode = modes.find(m => m.id === modeId);
  return (
    <div className="p-4">
      <motion.h1 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
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

// ==========================
// 8. MAIN MENU MANAGER
// ==========================
export default function MenuManager() {
  const [currentScreen, setCurrentScreen] = useState<Screen>({ type: "menu" });
  const [prevScreenType, setPrevScreenType] = useState<string>("menu");

  // pretend API state
  const [lobbies, setLobbies] = useState<{ id: string; name: string }[]>([
    { id: "l1", name: "Lobby 1 (2/4 players)" },
    { id: "l2", name: "Lobby 2 (1/4 players)" },
  ]);
  const [showModal, setShowModal] = useState(false);

  const goToScreen = (screen: Screen) => {
    setPrevScreenType(currentScreen.type);
    setCurrentScreen(screen);
  };

  const handleMenuSelect = (item: any) => {
    if (item.type === "submenu") {
      goToScreen({ type: "submenu", submenuId: item.id, options: item.options });
    } else if (item.type === "lobbyEntry") {
      goToScreen({ type: "lobby" });
    } else if (item.type === "action") {
      alert(`${item.label} clicked`);
    }
  };

  const handleModeSelect = (mode: any) => goToScreen({ type: "game", modeId: mode.id });
  const handleBackToMenu = () => goToScreen({ type: "menu" });
  const handleLobbyBack = () => goToScreen({ type: "menu" });
  const handleJoinLobby = (lobbyId: string) => {
    // fake join
    goToScreen({ type: "game", modeId: "ticTacToe" });
  };
  const handleCreateLobby = (name: string, maxPlayers: number) => {
    setLobbies([...lobbies, { id: Date.now().toString(), name: `${name} (0/${maxPlayers} players)` }]);
  };

  const isScreenFade = prevScreenType === "game" || currentScreen.type === "game";
  const commonStyle = { position: "absolute", width: "100%", height: "100%" };

  const renderScreen = () => {
    switch (currentScreen.type) {
      case "menu":
        return <MainMenu onSelect={handleMenuSelect} />;
      case "submenu":
        return (
          <SubMenuScreen
            submenuId={currentScreen.submenuId}
            options={currentScreen.options}
            onBack={handleBackToMenu}
            onSelect={(item) =>
              typeof item === "string" ? console.log(`${item} selected`) : handleModeSelect(item)
            }
          />
        );
      case "lobby":
        return (
          <LobbyScreen
            lobbies={lobbies}
            onBack={handleLobbyBack}
            onJoin={handleJoinLobby}
            onCreate={() => setShowModal(true)}
          />
        );
      case "game":
        return <GameScreen modeId={currentScreen.modeId} onExit={handleBackToMenu} />;
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={JSON.stringify(currentScreen)}
          initial={isScreenFade ? { opacity: 0 } : {}}
          animate={{ opacity: 1 }}
          exit={isScreenFade ? { opacity: 0 } : {}}
          transition={{ duration: 0.15 }}
          style={commonStyle}
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
      {showModal && <CreateLobbyModal onClose={() => setShowModal(false)} onSubmit={handleCreateLobby} />}
    </div>
  );
}
