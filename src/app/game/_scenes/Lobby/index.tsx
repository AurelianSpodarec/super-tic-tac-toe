'use client'

import { useEffect, useMemo, useRef, useState } from "react";

import useScene from "../../_engine/SceneManager/useScene";
import { useMultiplayerStore } from "../../_engine/Multiplayer";

import LobbyRoom from "./_components/LobbyRoom";

type Flow = "create" | "join";

const avatars = {
  host: "https://i.imgur.com/cTzL0ai.png",
  guest: "https://i.imgur.com/Osx2CgE.png",
};

function getJoinCodeFromURL(): string | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  return params.get("join");
}

export default function SceneLobby({ flow }: { flow?: Flow }) {
  const { reset, push } = useScene();

  const status = useMultiplayerStore((s) => s.status);
  const error = useMultiplayerStore((s) => s.error);
  const role = useMultiplayerStore((s) => s.role);
  const lobby = useMultiplayerStore((s) => s.lobby);
  const chat = useMultiplayerStore((s) => s.chat);
  const pendingGameStart = useMultiplayerStore((s) => s.pendingGameStart);

  const createLobby = useMultiplayerStore((s) => s.createLobby);
  const joinLobby = useMultiplayerStore((s) => s.joinLobby);
  const setReady = useMultiplayerStore((s) => s.setReady);
  const selectMode = useMultiplayerStore((s) => s.selectMode);
  const startGame = useMultiplayerStore((s) => s.startGame);
  const sendChat = useMultiplayerStore((s) => s.sendChat);
  const consumePendingGameStart = useMultiplayerStore((s) => s.consumePendingGameStart);
  const leave = useMultiplayerStore((s) => s.leave);

  const [name, setName] = useState("Player");
  const [inviteCode, setInviteCode] = useState("");
  const [urlJoinCode, setUrlJoinCode] = useState<string | null>(null);

  // Check URL for ?join= param on mount
  useEffect(() => {
    const code = getJoinCodeFromURL();
    if (code) {
      setUrlJoinCode(code);
      setInviteCode(code);
      // Clear the URL param so refreshing doesn't re-trigger
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  // Derive effective flow: URL join code overrides prop
  const effectiveFlow: Flow | null = useMemo(() => {
    if (urlJoinCode) return "join";
    if (flow === "create" || flow === "join") return flow;
    return null;
  }, [flow, urlJoinCode]);

  const pushedGameRef = useRef(false);
  useEffect(() => {
    if (!pendingGameStart) {
      pushedGameRef.current = false;
      return;
    }

    if (pushedGameRef.current) return;
    pushedGameRef.current = true;

    consumePendingGameStart();
    push("Game", { vs: "online", mode: lobby.selectedMode });
  }, [consumePendingGameStart, lobby.selectedMode, pendingGameStart, push]);

  if (role) {
    return (
      <LobbyRoom
        role={role}
        status={status}
        lobby={lobby}
        messages={chat}
        onSelectMode={selectMode}
        onToggleReady={setReady}
        onStart={startGame}
        onSendChat={sendChat}
        onLeave={() => {
          leave();
          reset("Online");
        }}
      />
    );
  }

  if (!effectiveFlow) {
    return (
      <div className="h-full py-28 flex flex-col items-center justify-center text-center mx-auto max-w-[700px] px-6">
        <h2 className="font-neontubes text-3xl text-[#ef476f] mb-2">Lobby</h2>
        <p className="text-gray-400">Go back and choose Create or Join.</p>
      </div>
    );
  }

  const isCreate = effectiveFlow === "create";

  return (
    <div className="h-full py-28 flex flex-col items-center justify-center text-center mx-auto max-w-[700px] px-6">
      <h2 className="font-neontubes text-4xl text-[#ef476f] mb-2">{isCreate ? "Create Lobby" : "Join Lobby"}</h2>
      <p className="text-gray-300 mb-10">
        {isCreate ? "You will host the lobby." : "Enter an invite code from a friend."}
      </p>

      <div className="w-full max-w-[420px] space-y-4">
        <label className="block text-left">
          <div className="text-xs text-gray-400 mb-2">Display name</div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2"
          />
        </label>

        {!isCreate ? (
          <label className="block text-left">
            <div className="text-xs text-gray-400 mb-2">Invite code</div>
            <input
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-mono"
            />
          </label>
        ) : null}

        <button
          type="button"
          onClick={async () => {
            if (isCreate) {
              await createLobby({ name: name.trim() || "Host", avatar: avatars.host });
            } else {
              await joinLobby({ inviteCode: inviteCode.trim(), name: name.trim() || "Guest", avatar: avatars.guest });
            }
          }}
          className="w-full px-4 py-3 rounded-xl border border-[#ef476f]/60 bg-[#ef476f]/20 hover:bg-[#ef476f]/25"
        >
          {isCreate ? "Create" : "Join"}
        </button>

        {error ? <div className="text-sm text-red-400">{error}</div> : null}
        <div className="text-xs text-gray-500">Status: {status}</div>
      </div>
    </div>
  );
}
