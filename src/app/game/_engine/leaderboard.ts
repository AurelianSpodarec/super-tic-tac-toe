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
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed as LeaderboardResult[];
  } catch {
    return [];
  }
}

export function saveLeaderboard(results: LeaderboardResult[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
}

export function addLeaderboardResult(result: LeaderboardResult) {
  const prev = getLeaderboard();
  saveLeaderboard([result, ...prev].slice(0, 200));
}

export function clearLeaderboard() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export function createId() {
  // Good enough for local storage use.
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
