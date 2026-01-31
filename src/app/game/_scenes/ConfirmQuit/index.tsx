'use client';

import FocusNavigator from "../../_engine/FocusNavigator";
import type { MenuItem } from "../../_engine/FocusNavigator/useFocusNavigator";
import useScene from "../../_engine/SceneManager/useScene";
import { useMultiplayerStore } from "../../_engine/Multiplayer";
import { sceneRegistry, type SceneMeta } from "../../_engine/settings";
import InputHints from "../../_components/InputHints";
import { CONSOLE_HINTS_SELECT_BACK } from "../../_components/consoleHintPresets";

function getBaseSceneEntry(stack: ReturnType<typeof useScene>["stack"]) {
  for (let i = stack.length - 1; i >= 0; i--) {
    const meta = sceneRegistry[stack[i].name] as SceneMeta;
    if (meta.presentation !== "modal") return stack[i];
  }
  return stack[0];
}

export default function SceneConfirmQuit() {
  const { stack, pop, reset } = useScene();

  const baseScene = getBaseSceneEntry(stack);
  const isOnlineGame = baseScene.name === "Game" && baseScene.params?.vs === "online";

  const leave = useMultiplayerStore((s) => s.leave);

  const menu: MenuItem[] = [
    {
      text: "Return",
      action: pop,
    },
    {
      text: "Quit Game",
      action: () => {
        if (isOnlineGame) leave();
        reset("Home");
      },
    },
  ];

  return (
    <section className="h-full w-full flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-xl text-center">
          <h2 className="font-neontubes text-4xl text-gray-100">Quit game?</h2>
          <p className="mt-3 text-sm text-gray-300">
            Return to Home.
            {isOnlineGame ? <span className="text-gray-400"> You will disconnect.</span> : null}
          </p>

          <div className="mt-10">
            <FocusNavigator
              data={menu}
              columns={1}
              columnsMobile={1}
              direction="vertical"
              className="w-full max-w-[420px] mx-auto flex flex-col gap-2"
              renderItem={(item, _index, state) => {
                const isQuit = item.text === "Quit Game";
                const isActive = item.active;

                return (
                  <button
                    type="button"
                    onClick={state.onClick}
                    onMouseEnter={state.onHover}
                    className="w-full px-2 py-2 text-left"
                    aria-current={isActive ? "true" : undefined}
                  >
                    <div className="flex items-center justify-center gap-3">
                      <span className={`w-4 text-center ${isActive ? "text-gray-100" : "text-transparent"}`}>
                        ▶
                      </span>
                      <span
                        className={`text-2xl tracking-wide ${
                          isActive
                            ? isQuit
                              ? "text-[#ef476f]"
                              : "text-gray-100"
                            : "text-gray-500"
                        }`}
                      >
                        {item.text}
                      </span>
                    </div>
                  </button>
                );
              }}
            />
          </div>
        </div>
      </div>

      <div className="pb-6">
        <InputHints
          variant="system"
          hints={CONSOLE_HINTS_SELECT_BACK}
          className="opacity-80"
        />
      </div>
    </section>
  );
}
