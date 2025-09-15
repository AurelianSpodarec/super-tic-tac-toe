'use client'

import React, { useEffect, useState } from "react";
import { MenuItem } from "../../_engine/FocusNavigator/useFocusNavigator";
import FocusNavigator from "../../_engine/FocusNavigator";

import NeonText from "./_components/NeonText";
import Tagline from "./_components/Tagline";
import MenuButton from "./_components/MenuButton";

// --- Menu data ---
const dataMenu: MenuItem[] = [
  { text: "Singleplayer", scene: "GameModes" },
  { text: "Multiplayer", scene: "GameModes" },
  { text: "Leaderboard", scene: "Home" },
  { text: "Language", scene: "GameModes" },
  { text: "Credits", scene: "Home" },
];

// --- Animation sequence JSON ---
const animationSequence = [
  { key: "logo", delay: 0, class: "duration-700" },
  { key: "menuButtons", after: "logo", delay: 700, stagger: 200, count: dataMenu.length, class: "duration-200" },
  { key: "tagline", after: "menuButtons", delay: 250, class: "duration-700" },
  { key: "madeBy", after: "tagline", delay: 500, class: "duration-700" },
];

// --- extract numeric duration from Tailwind class ---
function getDurationFromClass(className?: string) {
  if (!className) return 0;
  const match = className.match(/duration-(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

// --- Hook to handle animation sequence ---
function useAnimationSequence(sequence: typeof animationSequence) {
  const [state, setState] = useState<Record<string, boolean | number>>({});

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    const stepEndTimes: Record<string, number> = {};

    function getStepEndTime(step: typeof animationSequence[number]): number {
      const duration = getDurationFromClass(step.class);
      if (step.stagger && step.count) {
        return (step.count - 1) * (step.stagger ?? 0) + duration;
      }
      return duration;
    }

    sequence.forEach((step) => {
      let startDelay = step.delay ?? 0;

      if (step.after) {
        const prevEnd = stepEndTimes[step.after] ?? 0;
        startDelay += prevEnd;
      }

      // compute absolute end time
      stepEndTimes[step.key] = startDelay + getStepEndTime(step);

      const duration = getDurationFromClass(step.class);

      if (step.stagger && step.count) {
        for (let i = 0; i < step.count; i++) {
          timers.push(
            setTimeout(() => {
              setState(prev => ({ ...prev, [step.key]: i }));
            }, startDelay + i * (step.stagger ?? 0))
          );
        }
      } else {
        timers.push(
          setTimeout(() => {
            setState(prev => ({ ...prev, [step.key]: true }));
          }, startDelay)
        );
      }
    });

    return () => timers.forEach(t => clearTimeout(t));
  }, [sequence]);

  return state;
}

// --- SceneStart component ---
function SceneStart() {
  const animationState = useAnimationSequence(animationSequence);

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
                state={item}
                index={index}
                // duration={getDurationFromClass(menuConfig?.class)}
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
