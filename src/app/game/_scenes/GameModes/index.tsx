'use client'

import MenuList from "../../_components/Menu";
import { MenuItem, useMenuController } from "../../_engine/useMenuController";

const dataMenu: MenuItem[] = [
  { text: "TicTacToe", scene: "Game" },
  { text: "SuperTicTacToe", scene: "Home" },
];

function SceneGameModes() {

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <h1 className="neon relative font-bold text-yellow-400 neon-logo text-[clamp(1rem,3.5vw,3rem)] text-center">
        Choose your game Mode
      </h1>
      <MenuList
        data={dataMenu}
        direction="horizontal"
        className="mt-5"
        onSelect={(item) => console.log("Selected:", item.text)}
        renderItem={(item, index, state) => {
          const isActive = item.active;
          const text = item.text;
          const isTurnedOn = true;

          return (
            <button
              type="button"
              className={`
                font-neontubes
                text-[clamp(1.5rem,2.5vw,2rem)]
                outline-none transition-all duration-200
                ${isTurnedOn ? "text-[#ef476f]" : "text-[#4a4a4a] opacity-40"}
                ${isActive && isTurnedOn ? "active-item neon2 scale-105" : ""}
              `}
              onClick={state.onClick}
              onMouseEnter={state.onHover}
              aria-current={isActive ? "true" : undefined}
              aria-label={`${text}${isActive ? " (active)" : ""}`}
            >
              {text}
            </button>
          );
        }}

      />

    </div>
  );
}

export default SceneGameModes
