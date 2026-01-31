'use client'

import FocusNavigator from "../../_engine/FocusNavigator";
import type { MenuItem } from "../../_engine/FocusNavigator/useFocusNavigator";

const menu: MenuItem[] = [
  { text: "Create Lobby", scene: "Lobby", params: { flow: "create" } },
  { text: "Join Lobby", scene: "Lobby", params: { flow: "join" } },
];

export default function SceneOnline() {
  return (
    <div className="h-full py-28 flex flex-col items-center justify-center text-center mx-auto max-w-[700px]">
      <h2 className="font-neontubes text-4xl text-[#ef476f] mb-2">Online multiplayer</h2>
      <p className="text-gray-300 mb-10">Create a private lobby and invite a friend.</p>

      <FocusNavigator
        data={menu}
        columns={1}
        columnsMobile={1}
        direction="vertical"
        className="w-full max-w-[420px] flex flex-col gap-4"
        renderItem={(item, _index, state) => (
          <button
            type="button"
            onClick={state.onClick}
            onMouseEnter={state.onHover}
            className={`w-full rounded-xl border px-6 py-4 text-left transition ${item.active ? "border-[#ef476f] bg-[#ef476f]/10" : "border-white/10 bg-white/5 hover:bg-white/10"}`}
          >
            <div className="font-bold text-lg">{item.text}</div>
            <div className="text-sm text-gray-400">
              {item.text === "Create Lobby" ? "You host and share an invite code." : "Enter a friend's invite code."}
            </div>
          </button>
        )}
      />

      <p className="text-xs text-gray-500 mt-8">Tip: if you want a public game list later, we’ll need a small lobby server.</p>
    </div>
  );
}
