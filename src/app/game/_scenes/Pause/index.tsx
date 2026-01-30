'use client';

import useScene from "../../_engine/SceneManager/useScene";
import { useMultiplayerStore } from "../../_engine/Multiplayer";
import { sceneRegistry, type SceneMeta } from "../../_engine/settings";

function getBaseSceneEntry(stack: ReturnType<typeof useScene>["stack"]) {
  for (let i = stack.length - 1; i >= 0; i--) {
    const meta = sceneRegistry[stack[i].name] as SceneMeta;
    if (meta.presentation !== "modal") return stack[i];
  }
  return stack[0];
}

export default function ScenePause() {
  const { stack, pop, push, replaceBelowTop } = useScene();

  const baseScene = getBaseSceneEntry(stack);
  const isOnlineGame = baseScene.name === "Game" && baseScene.params?.vs === "online";

  const role = useMultiplayerStore((s) => s.role);
  const resetRound = useMultiplayerStore((s) => s.resetRound);

  const canRestart = !isOnlineGame || role === "host";

  return (
    <section className="w-full px-4 py-6">
      <div className="rounded-lg border border-white/10 bg-black/30 p-4">
        <div className="text-sm text-gray-300">
          {isOnlineGame ? (
            <>Online match · {role === "host" ? "Host" : "Guest"}</>
          ) : (
            <>Local match</>
          )}
        </div>

        <div className="mt-4 grid gap-3">
          <button
            type="button"
            onClick={() => pop()}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left hover:bg-white/10"
          >
            <div className="font-semibold">Resume</div>
            <div className="text-xs text-gray-400">Continue the current round.</div>
          </button>

          <button
            type="button"
            disabled={!canRestart}
            onClick={() => {
              if (!canRestart) return;

              if (isOnlineGame) {
                resetRound();
                pop();
                return;
              }

              // Force-remount the base Game scene so local state resets cleanly.
              replaceBelowTop("Game", {
                ...(baseScene.params ?? {}),
                __key: Date.now(),
              });
              pop();
            }}
            className={`w-full rounded-xl border px-4 py-3 text-left ${
              canRestart
                ? "border-white/10 bg-white/5 hover:bg-white/10"
                : "border-white/5 bg-white/5 opacity-50 cursor-not-allowed"
            }`}
          >
            <div className="font-semibold">Restart round</div>
            <div className="text-xs text-gray-400">
              {isOnlineGame && role !== "host" ? "Only the host can restart." : "Start over (scores keep)."}
            </div>
          </button>

          <button
            type="button"
            onClick={() => push("ConfirmQuit")}
            className="w-full rounded-xl border border-[#ef476f]/50 bg-[#ef476f]/10 px-4 py-3 text-left hover:bg-[#ef476f]/15"
          >
            <div className="font-semibold text-[#ef476f]">Quit game</div>
            <div className="text-xs text-gray-300">Return to Home.</div>
          </button>
        </div>
      </div>
    </section>
  );
}
