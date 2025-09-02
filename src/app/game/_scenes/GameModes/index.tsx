'use client'

import FocusNavigator from "../../_engine/FocusNavigator";
import { MenuItem } from "../../_engine/FocusNavigator/useFocusNavigator";
const dataMenu: MenuItem[] = [
  { text: "TicTacToe", scene: "Game" }, // classic 3x3 game
  { text: "SuperTicTacToe", scene: "Game" }, // larger grid variant (4x4, 5x5, etc.)
  { text: "TicTacKu", scene: "Game" }, // puzzle/strategy variant
  { text: "Ultimate TicTacToe", scene: "Game" }, // 3x3 of 3x3 boards
  { text: "Speed Challenge", scene: "Game" }, // press X as fast as possible in Ultimate TicTacToe
  { text: "Cognitive Challenge", scene: "Game" }, // memory/attention variant
];


function SceneGameModes() {

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <h1 className="neon relative font-bold text-yellow-400 neon-logo text-[clamp(1rem,3.5vw,3rem)] text-center">
        Choose your game Mode
      </h1>

      <FocusNavigator
        data={dataMenu}
        columns={3}
        rows={2}
        columnsMobile={1}
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
