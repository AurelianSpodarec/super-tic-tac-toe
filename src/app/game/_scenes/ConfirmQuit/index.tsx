'use client';

import useScene from "../../_engine/SceneManager/useScene";
import { useMultiplayerStore } from "../../_engine/Multiplayer";

function getBaseSceneEntry(stack: ReturnType<typeof useScene>["stack"]) {
  return stack.length > 1 ? stack[stack.length - 2] : stack[stack.length - 1];
}

export default function SceneConfirmQuit() {
  const { stack, pop, reset } = useScene();

  const baseScene = getBaseSceneEntry(stack);
  const isOnlineGame = baseScene.name === "Game" && baseScene.params?.vs === "online";

  const leave = useMultiplayerStore((s) => s.leave);

  return (
    <section className="w-full px-4 py-6">
      <div className="rounded-lg border border-white/10 bg-black/30 p-5">
        <div className="text-sm text-gray-200">
          This will end the current match and return to Home.
          {isOnlineGame ? <span className="text-gray-400"> (You will disconnect.)</span> : null}
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-end">
          <button
            type="button"
            onClick={() => pop()}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/10"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => {
              if (isOnlineGame) leave();
              reset("Home");
            }}
            className="rounded-xl border border-[#ef476f]/60 bg-[#ef476f]/20 px-4 py-3 font-semibold text-[#ef476f] hover:bg-[#ef476f]/25"
          >
            Quit to Home
          </button>
        </div>
      </div>
    </section>
  );
}
