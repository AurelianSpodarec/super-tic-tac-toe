'use client'

import { useMenuController } from "../../_engine/useMenuController";
import { MenuList } from "../Start/_components/Menu";

const dataMenuGameModes = [
  { text: "TicTacToe", scene: "Game" },
  { text: "SuperTicTacToe", scene: "Home" },
];

function SceneGameModes() {
  const { items, setActive, select } = useMenuController(dataMenuGameModes);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <h1 className="neon relative font-bold text-yellow-400 neon-logo text-[clamp(1rem,3.5vw,3rem)] text-center">
        Choose your game Mode
      </h1>

      <MenuList
        items={items}
        direction="horizontal"
        renderItem={(item, index) => (
          <button
            onClick={() => select(index)}
            className={`
              ${item.turnedOn ? "text-[#ef476f]" : "text-[#4a4a4a] opacity-40"}
              ${item.active && item.turnedOn ? "active-item neon2 scale-105" : ""}
            `}
          >
            {item.text}
          </button>
        )}
      />
    </div>
  );
}

export default SceneGameModes
