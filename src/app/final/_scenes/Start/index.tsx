'use client'

import React from "react";

import NeonLogo from "./_components/NeonLogo";
import Tagline from "./_components/Tagline";
import { MenuButton, MenuList } from "./_components/Menu";

import { useMenuController, MenuItem } from "../../_engine/useMenuController";

const dataMenu: MenuItem[] = [
  { text: "Singleplayer", scene: "GameModes" },
  { text: "Local Co-Op", scene: "Game" },
  { text: "Multiplayer", scene: "GameModes" },
  { text: "Leaderboard", scene: "Home" },
  { text: "Credits", scene: "Home" },
];

function SceneStart() {
  const { items, setActive, select } = useMenuController(dataMenu, "vertical");

  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center overflow-x-hidden overflow-y-auto">
      <div className="relative text-center opacity-90">

        <span className={`relative font-bold font-sacramento text-[clamp(0.5rem,2vw,4rem)] transition-opacity duration-700 ${true ? "neon" : "text-[#4a4a4a]"}`}>
          <NeonLogo text="By Aurelian Spodarec" />
        </span>
        <h1 className={`relative font-bold text-[clamp(2rem,5vw,5rem)] transition duration-700 font-neontubes ${true ? "opacity-100 scale-100 neon" : "text-[#4a4a4a] opacity-50"}`}>
          <NeonLogo text="JazzTacToe" />
        </h1>

        <MenuList
          items={items}
          direction="vertical"
          renderItem={(item, index) => (
            <MenuButton
              item={item}
              onClick={() => select(index)}
              onHover={() => setActive(index)}
            />
          )}
        />

        <Tagline />
      </div>
    </div>
  );
}

export default SceneStart
