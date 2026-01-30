import Peer, { DataConnection, PeerError } from "peerjs";

import type { MultiplayerMessage } from "./types";

const CONNECTION_TIMEOUT_MS = 10000;

/** Maps PeerJS error types to user-friendly messages */
export function formatPeerError(err: unknown): string {
  if (!err) return "Connection failed.";

  const peerErr = err as PeerError<string>;
  const type = peerErr.type;

  switch (type) {
    case "peer-unavailable":
      return "Lobby not found. The host may have closed it.";
    case "server-error":
      return "Connection server error. Please try again.";
    case "network":
      return "Network error. Check your internet connection.";
    case "disconnected":
      return "Disconnected from server.";
    case "socket-error":
    case "socket-closed":
      return "Connection lost. Please try again.";
    default:
      break;
  }

  const msg = peerErr.message ?? String(err);
  if (msg.toLowerCase().includes("internal server error")) {
    return "Connection server error. Please try again.";
  }
  if (msg.toLowerCase().includes("could not connect")) {
    return "Lobby not found. The host may have closed it.";
  }

  return "Failed to connect. Please try again.";
}

type OnMessage = (msg: MultiplayerMessage) => void;
type OnStatus = (status: "open" | "connected" | "disconnected" | "error", error?: unknown) => void;

export class PeerService {
  private peer: Peer | null = null;
  private conn: DataConnection | null = null;
  private pendingMessages: MultiplayerMessage[] = [];

  private onMessage: OnMessage;
  private onStatus: OnStatus;

  constructor(onMessage: OnMessage, onStatus: OnStatus) {
    this.onMessage = onMessage;
    this.onStatus = onStatus;
  }

  /** Allow updating callbacks (useful if store recreates them). */
  updateCallbacks(onMessage: OnMessage, onStatus: OnStatus) {
    this.onMessage = onMessage;
    this.onStatus = onStatus;
  }

  async createHost(): Promise<{ peerId: string }> {
    this.destroy();

    const peer = new Peer();
    this.peer = peer;

    return await new Promise((resolve, reject) => {
      peer.on("open", (id) => {
        this.onStatus("open");
        resolve({ peerId: id });
      });

      peer.on("connection", (conn) => {
        // Accept only a single connection for now.
        if (this.conn) {
          conn.close();
          return;
        }

        this.attachConnection(conn);
      });

      peer.on("error", (err) => {
        this.onStatus("error", err);
        reject(err);
      });
    });
  }

  async connectToHost(hostPeerId: string): Promise<void> {
    this.destroy();

    this.peer = new Peer();

    return await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.destroy();
        reject(new Error("Connection timed out. The host may be unavailable."));
      }, CONNECTION_TIMEOUT_MS);

      const cleanup = () => clearTimeout(timeout);

      this.peer!.on("error", (err) => {
        cleanup();
        this.onStatus("error", err);
        reject(err);
      });

      // Wait for peer to connect to signaling server before attempting host connection
      this.peer!.on("open", () => {
        const conn = this.peer!.connect(hostPeerId, { reliable: true });

        conn.on("open", () => {
          cleanup();
          this.attachConnection(conn);
          resolve();
        });

        conn.on("error", (err) => {
          cleanup();
          this.onStatus("error", err);
          reject(err);
        });
      });
    });
  }

  send(msg: MultiplayerMessage) {
    if (!this.conn) return;

    if (!this.conn.open) {
      // Queue message to send once connection opens
      this.pendingMessages.push(msg);
      return;
    }

    this.conn.send(msg);
  }

  isConnected(): boolean {
    return Boolean(this.conn?.open);
  }

  destroy() {
    this.pendingMessages = [];

    try {
      this.conn?.close();
    } catch {
      // ignore
    }
    this.conn = null;

    try {
      this.peer?.destroy();
    } catch {
      // ignore
    }
    this.peer = null;
  }

  private attachConnection(conn: DataConnection) {
    this.conn = conn;

    conn.on("data", (data) => {
      this.onMessage(data as MultiplayerMessage);
    });

    conn.on("close", () => {
      this.onStatus("disconnected");
    });

    conn.on("error", (err) => {
      this.onStatus("error", err);
    });

    this.onStatus("connected");

    // Flush any messages that were queued before connection opened
    this.flushPending();
  }

  private flushPending() {
    if (!this.conn?.open) return;
    for (const msg of this.pendingMessages) {
      this.conn.send(msg);
    }
    this.pendingMessages = [];
  }
}
