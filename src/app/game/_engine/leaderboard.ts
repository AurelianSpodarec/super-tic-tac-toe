import { readJson, removeKey, writeJson } from "./storage";

export type LeaderboardResult = {
  id: string;
  createdAt: string; // ISO
  mode: string;
  vs: "ai" | "local";
  winner: string | "draw";
  durationSeconds: number;
};

const STORAGE_KEY = "jazztactoe.leaderboard.v1";

export function getLeaderboard(): LeaderboardResult[] {
  const parsed = readJson<unknown>(STORAGE_KEY);
  if (!Array.isArray(parsed)) return [];
  return parsed as LeaderboardResult[];
}

export function saveLeaderboard(results: LeaderboardResult[]) {
  writeJson(STORAGE_KEY, results);
}

export function addLeaderboardResult(result: LeaderboardResult) {
  const prev = getLeaderboard();
  saveLeaderboard([result, ...prev].slice(0, 200));
}

export function clearLeaderboard() {
  removeKey(STORAGE_KEY);
}

export function createId() {
  // Good enough for local storage use.
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
