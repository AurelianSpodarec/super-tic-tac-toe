'use client'

import { MenuItem } from "../../_engine/FocusNavigator/useFocusNavigator";
import FocusNavigator from "../../_engine/FocusNavigator";

import MenuButton from "./_components/MenuButton";
import NeonText from "./_components/NeonText";
import Tagline from "./_components/Tagline";
import { useTimelineAnimationState } from "./_components/useTimelineAnimationState";

// --- Menu data ---
const dataMenu: MenuItem[] = [
  { text: "Singleplayer", scene: "GameModes", params: { vs: "ai" } },
  { text: "shared screen", scene: "GameModes", params: { vs: "local" } },
  { text: "Online multiplayer", scene: "Online" },
  { text: "Leaderboard", scene: "Leaderboard" },
  { text: "Settings", scene: "Settings" },
  { text: "Credits", scene: "Credits" },
];

// --- Animation sequence JSON ---
const animationSequence = [
  { key: "logo", delay: 0, class: "duration-700" },
  { key: "menuButtons", after: "logo", delay: 700, stagger: 200, count: dataMenu.length, class: "duration-200" },
  { key: "tagline", after: "menuButtons", delay: 250, class: "duration-700" },
  { key: "madeBy", after: "tagline", delay: 500, class: "duration-700" },
];


function SceneStart() {
  const animationState = useTimelineAnimationState(animationSequence);

  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center overflow-x-hidden overflow-y-auto pt-32">
      <div className="relative text-center opacity-90 h-full font-bold">

        <span className={`font-sacramento text-[clamp(0.5rem,2vw,4rem)] ${animationState.madeBy ? `neon opacity-100` : "text-[#4a4a4a] opacity-50"}`}>
          <NeonText text="By Aurelian Spodarec" animate={!!animationState.madeBy} />
        </span>

        <h1 className={`text-[clamp(2rem,5vw,5rem)] font-neontubes ${animationState.logo
          ? `opacity-100 scale-100 neon ${animationSequence.find(s => s.key === "logo")?.class}`
          : "text-[#4a4a4a] opacity-50 scale-90"
          }`}
        >
          <NeonText text="JazzTacToe" animate={!!animationState.logo} />
        </h1>

        <FocusNavigator
          data={dataMenu}
          columns={1}
          columnsMobile={1}
          direction="vertical"
          className="mt-5"
          renderItem={(item, index, state) => {
            // const menuConfig = animationSequence.find((s) => s.key === "menuButtons");
            return (
              <MenuButton
                item={item}
                state={{ active: item.active ?? false }} // now matches MenuButtonState
                onClick={state.onClick}
                onHover={state.onHover}
                isTurnedOn={
                  typeof animationState.menuButtons === "number"
                    ? index <= animationState.menuButtons
                    : false
                }
              />

            );
          }}
        />

        <Tagline className={`duration-500 ${animationState.tagline ? `opacity-100` : "opacity-0"}`} />
      </div>
    </div>
  );
}

export default SceneStart;
