'use client'

import React from "react";
import { MenuItem } from "../../_engine/useMenuController";
import MenuList from "../../_components/Menu";

import NeonText from "./_components/NeonText";
import Tagline from "./_components/Tagline";
import MenuButton from "./_components/MenuButton";

const dataMenu: MenuItem[] = [
  { text: "Singleplayer", scene: "GameModes" },
  { text: "Local Co-Op", scene: "Game" },
  { text: "Multiplayer", scene: "GameModes" },
  { text: "Leaderboard", scene: "Home" },
  { text: "Credits", scene: "Home" },
];

function SceneStart() {

  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center overflow-x-hidden overflow-y-auto pt-22">
      <div className="relative text-center opacity-90 h-full">

        <div className="transition-opacity duration-700 font-bold">
          <span className={`font-sacramento text-[clamp(0.5rem,2vw,4rem)] ${true ? "neon" : "text-[#4a4a4a]"}`}>
            <NeonText text="By Aurelian Spodarec" />
          </span>
          <h1 className={`text-[clamp(2rem,5vw,5rem)] font-neontubes ${true ? "opacity-100 scale-100 neon" : "text-[#4a4a4a] opacity-50"}`}>
            <NeonText text="JazzTacToe" />
          </h1>
        </div>

        <MenuList
          data={dataMenu}
          direction="vertical"
          className="mt-5"
          onSelect={(item) => console.log("Selected:", item.text)}
          renderItem={(item, index, state) => (
            <MenuButton
              item={item}
              state={item}
              onClick={state.onClick}
              onHover={state.onHover}
            />
          )}
        />

        <Tagline />
      </div>
    </div>
  );
}

export default SceneStart
