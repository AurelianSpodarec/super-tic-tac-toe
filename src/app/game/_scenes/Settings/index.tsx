'use client'

import { useEffect, useState } from "react";

import { AudioManager } from "../../_engine/AudioManager";
import { avatarPresets, getAvatarUrl, getPlayerProfile, savePlayerProfile } from "../../_engine/playerProfile";
import { readJson, writeJson } from "../../_engine/storage";

type AudioPrefs = {
  ambientVolume: number;
  sfxVolume: number;
};

const STORAGE_KEY = "jazztactoe.audio.v1";

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

function SceneSettings() {
  const [ambientVolume, setAmbientVolume] = useState(AudioManager.settings.ambientVolume);
  const [sfxVolume, setSfxVolume] = useState(AudioManager.settings.sfxVolume);

  const profile = getPlayerProfile();
  const [displayName, setDisplayName] = useState(profile.displayName);
  const [avatarId, setAvatarId] = useState(profile.avatarId);

  useEffect(() => {
    const prefs = readJson<AudioPrefs>(STORAGE_KEY);
    if (!prefs) return;

    const amb = clamp01(prefs.ambientVolume);
    const sfx = clamp01(prefs.sfxVolume);

    setAmbientVolume(amb);
    setSfxVolume(sfx);
    AudioManager.setAmbientVolume(amb);
    AudioManager.setSFXVolume(sfx);
  }, []);

  useEffect(() => {
    AudioManager.setAmbientVolume(ambientVolume);
    AudioManager.setSFXVolume(sfxVolume);
    writeJson(STORAGE_KEY, { ambientVolume, sfxVolume });
  }, [ambientVolume, sfxVolume]);

  useEffect(() => {
    savePlayerProfile({
      displayName: displayName.trim() || "Player",
      avatarId,
    });
  }, [avatarId, displayName]);

  return (
    <section className="h-full w-full flex flex-col items-center py-20 px-6">
      <div className="w-full max-w-xl">
        <h1 className="font-bold text-2xl mb-8">Settings</h1>

        <div className="space-y-6">
          <div className="rounded-lg border border-white/10 bg-black/30 p-4">
            <div className="font-semibold mb-3">Profile</div>

            <label className="block">
              <div className="text-xs text-gray-400 mb-2">Display name</div>
              <input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2"
              />
            </label>

            <div className="mt-4">
              <div className="text-xs text-gray-400 mb-2">Avatar</div>
              <div className="flex items-center gap-3 flex-wrap">
                {avatarPresets.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => setAvatarId(a.id)}
                    className={`flex items-center gap-2 rounded-lg border px-3 py-2 bg-white/5 hover:bg-white/10 ${avatarId === a.id ? "border-[#ef476f]" : "border-white/10"}`}
                  >
                    <img src={a.url} alt={a.label} className="h-8 w-8 rounded-full" />
                    <span className="text-sm text-gray-200">{a.label}</span>
                  </button>
                ))}
              </div>

              <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
                <span>Preview:</span>
                <img src={getAvatarUrl(avatarId)} alt="Selected avatar" className="h-6 w-6 rounded-full" />
                <span className="text-gray-300">{displayName.trim() || "Player"}</span>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/30 p-4">
            <div className="flex items-center justify-between gap-4">
              <label className="font-semibold" htmlFor="ambient">Ambient volume</label>
              <span className="text-sm text-gray-300">{Math.round(ambientVolume * 100)}%</span>
            </div>
            <input
              id="ambient"
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={ambientVolume}
              onChange={(e) => setAmbientVolume(Number(e.target.value))}
              className="w-full mt-3"
            />
          </div>

          <div className="rounded-lg border border-white/10 bg-black/30 p-4">
            <div className="flex items-center justify-between gap-4">
              <label className="font-semibold" htmlFor="sfx">SFX volume</label>
              <span className="text-sm text-gray-300">{Math.round(sfxVolume * 100)}%</span>
            </div>
            <input
              id="sfx"
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={sfxVolume}
              onChange={(e) => setSfxVolume(Number(e.target.value))}
              className="w-full mt-3"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SceneSettings;
