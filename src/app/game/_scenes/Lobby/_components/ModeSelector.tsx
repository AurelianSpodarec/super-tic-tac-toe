'use client'

import type { GameMode } from "@/app/game/_engine/Multiplayer";

export default function ModeSelector({
  mode,
  disabled,
  onChange,
}: {
  mode: GameMode;
  disabled: boolean;
  onChange: (mode: GameMode) => void;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs text-gray-400">Game mode</span>
      <select
        value={mode}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value as GameMode)}
        className="rounded-lg border border-white/10 bg-white/5 px-3 py-2"
      >
        <option value="classic">Classic</option>
        <option value="misere">Misere</option>
      </select>
    </label>
  );
}
