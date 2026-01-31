'use client'

import FocusNavigator from "../../_engine/FocusNavigator";
import { MenuItem } from "../../_engine/FocusNavigator/useFocusNavigator";
import InputHints from "../../_components/InputHints";
import { CONSOLE_HINTS_SELECT_NAVIGATE_BACK } from "../../_components/consoleHintPresets";

type VsMode = "ai" | "local";

const comingSoon = (name: string) => () => {
  window.alert(`${name} is coming soon.`);
};

const dataMenuBase: MenuItem[] = [
  {
    text: "Classic 3x3",
    scene: "Game",
    thumbnail: "https://tictactoefree.com/img/classic.png",
    description: "The classic 3x3 game for 2 players. Aim to align three Xs or Os horizontally, vertically, or diagonally.",
    params: { mode: "classic" },
  },
  // {
  //   text: "Gomoku",
  //   scene: "Game",
  //   thumbnail: "https://tictactoefree.com/img/gomoku.png",
  //   description: "A 15x15 or 19x19 board game. Players aim to align five chips in a row, requiring long-term planning and defense."
  // },
  {
    text: "Ultimate",
    thumbnail: "https://tictactoefree.com/img/ultimate-full.png",
    description: "Nine small 3x3 boards form a big 3x3 field. Moves dictate the next sector, combining strategy on multiple boards.",
    action: comingSoon("Ultimate"),
  },
  {
    text: "3D",
    thumbnail: "https://tictactoefree.com/img/3d-tictactoe.png",
    description: "A 3x3x3 cube where rows can span multiple levels. Requires spatial thinking and multidimensional strategies.",
    action: comingSoon("3D"),
  },
  // {
  //   text: "Larger Board",
  //   scene: "Game",
  //   thumbnail: "https://tictactoefree.com/img/larger.png",
  //   description: "4x4 or 5x5 boards. Objectives vary (4 or 5 in a row), with complex strategies and multiple winning threats."
  // },
  {
    text: "Misere",
    scene: "Game",
    thumbnail: "https://tictactoefree.com/img/prevent.png",
    description: "Also called Concession mode. Players aim to avoid winning; the one forced to align three symbols loses.",
    params: { mode: "misere" },
  },
  {
    text: "Wild",
    thumbnail: "https://tictactoefree.com/img/wild.png",
    description: "Players can place either X or O each turn. Winning requires careful symbol choice and blocking the opponent.",
    action: comingSoon("Wild"),
  },
  {
    text: "Pyramid",
    thumbnail: "https://tictactoefree.com/img/pyramid.png",
    description: "3D pyramid-shaped board. Align symbols across multiple levels while blocking your opponent.",
    action: comingSoon("Pyramid"),
  },
  // {
  //   text: "Dara",
  //   scene: "Game",
  //   thumbnail: "https://tictactoefree.com/img/dara.png",
  //   description: "Traditional African strategy game. Place and move pieces to create rows and block opponents."
  // }
];

function SceneGameModes({ vs = "local" }: { vs?: VsMode }) {
  const dataMenu: MenuItem[] = dataMenuBase.map(item => ({
    ...item,
    params: {
      ...(item.params ?? {}),
      vs,
    },
  }));

  return (
    <div className="h-full py-20 flex flex-col text-center items-center align-middle justify-center mx-auto max-w-[700px]">

      <FocusNavigator
        data={dataMenu}
        columns={3}
        rows={2}
        columnsMobile={1}
        direction="horizontal"
        className="flex"
        onSelect={(item) => console.log("Selected:", item.text)}
        renderItem={(item, index, state) => {
          const isActive = item.active;
          const text = item.text;
          const isTurnedOn = true;

          return (
            <button
              type="button"
              className={`
                w-full
                aspect-square
                flex flex-col items-center justify-center
                bg-[#1b1b1b] rounded-xl shadow-md
                transition-transform duration-300
                border-2
                ${isActive && isTurnedOn ? "scale-105 shadow-xl border-2 border-[#ef476f]" : "border-transparent hover:scale-105 hover:shadow-lg"}
                outline-none
              `}
              onClick={state.onClick}
              onMouseEnter={state.onHover}
              aria-current={isActive ? "true" : undefined}
              aria-label={`${text}${isActive ? " (active)" : ""}`}
            >
              <div className="w-4/5 h-4/5 rounded-lg overflow-hidden mb-2">
                <img
                  src={item.thumbnail}
                  alt={text}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className={`text-center font-neontubes text-[clamp(0.8rem,2vw,1.2rem)] ${isTurnedOn ? "text-[#ef476f]" : "text-gray-500"}`}>
                {text}
              </span>
            </button>

          );
        }}
      />

      <div className="mt-20">
        <InputHints
          variant="system"
          hints={CONSOLE_HINTS_SELECT_NAVIGATE_BACK}
        />
      </div>

    </div>
  );
}

export default SceneGameModes
