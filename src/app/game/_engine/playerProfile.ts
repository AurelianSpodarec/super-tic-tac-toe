import { readJson, writeJson } from "./storage";

export type AvatarId = "aurel" | "guest";

export type AvatarPreset = {
  id: AvatarId;
  label: string;
  url: string;
};

export const avatarPresets: AvatarPreset[] = [
  {
    id: "aurel",
    label: "Aurel",
    url: "https://i.imgur.com/cTzL0ai.png",
  },
  {
    id: "guest",
    label: "Guest",
    url: "https://i.imgur.com/Osx2CgE.png",
  },
];

export type PlayerProfile = {
  displayName: string;
  avatarId: AvatarId;
};

const STORAGE_KEY = "jazztactoe.profile.v1";

export function getDefaultProfile(): PlayerProfile {
  return {
    displayName: "Player",
    avatarId: "aurel",
  };
}

export function getPlayerProfile(): PlayerProfile {
  const raw = readJson<unknown>(STORAGE_KEY);
  const fallback = getDefaultProfile();

  if (!raw || typeof raw !== "object") return fallback;

  const obj = raw as Partial<PlayerProfile>;
  const displayName = typeof obj.displayName === "string" && obj.displayName.trim() ? obj.displayName : fallback.displayName;

  const avatarId = obj.avatarId;
  const avatarOk = avatarPresets.some((a) => a.id === avatarId);

  return {
    displayName,
    avatarId: avatarOk ? (avatarId as AvatarId) : fallback.avatarId,
  };
}

export function savePlayerProfile(profile: PlayerProfile) {
  writeJson(STORAGE_KEY, profile);
}

export function getAvatarUrl(avatarId: AvatarId): string {
  return avatarPresets.find((a) => a.id === avatarId)?.url ?? avatarPresets[0].url;
}
