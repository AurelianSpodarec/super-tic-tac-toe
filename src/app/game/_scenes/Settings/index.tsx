'use client'

import { useEffect, useState } from "react";
import { AudioManager } from "../../_engine/AudioManager";

type AudioPrefs = {
  ambientVolume: number;
  sfxVolume: number;
};

const STORAGE_KEY = "jazztactoe.audio.v1";

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

function readPrefs(): AudioPrefs | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AudioPrefs;
  } catch {
    return null;
  }
}

function writePrefs(prefs: AudioPrefs) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
}

function SceneSettings() {
  const [ambientVolume, setAmbientVolume] = useState(AudioManager.settings.ambientVolume);
  const [sfxVolume, setSfxVolume] = useState(AudioManager.settings.sfxVolume);

  useEffect(() => {
    const prefs = readPrefs();
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
    writePrefs({ ambientVolume, sfxVolume });
  }, [ambientVolume]);

  useEffect(() => {
    AudioManager.setSFXVolume(sfxVolume);
    writePrefs({ ambientVolume, sfxVolume });
  }, [sfxVolume]);

  return (
    <section className="h-full w-full flex flex-col items-center py-20 px-6">
      <div className="w-full max-w-xl">
        <h1 className="font-bold text-2xl mb-8">Settings</h1>

        <div className="space-y-6">
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

export default SceneSettings
