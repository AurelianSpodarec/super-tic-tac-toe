'use client'

import { useMemo, useState } from "react";

export default function InviteCode({ code }: { code: string }) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const inviteUrl = useMemo(() => {
    if (typeof window === "undefined") return code;
    return `${window.location.origin}/game?join=${encodeURIComponent(code)}`;
  }, [code]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setCopiedLink(true);
      window.setTimeout(() => setCopiedLink(false), 1200);
    } catch {
      // ignore
    }
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(true);
      window.setTimeout(() => setCopiedCode(false), 1200);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="text-left min-w-0 flex-1">
          <div className="text-xs text-gray-400">Invite link</div>
          <div className="font-mono text-sm tracking-wide select-all truncate">{inviteUrl}</div>
        </div>
        <button
          type="button"
          onClick={copyLink}
          className="px-3 py-2 rounded-lg border border-[#ef476f]/40 bg-[#ef476f]/20 hover:bg-[#ef476f]/25 text-sm shrink-0"
        >
          {copiedLink ? "Copied!" : "Copy Link"}
        </button>
      </div>

      <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
        <div className="text-left">
          <div className="text-xs text-gray-400">Or share code</div>
          <div className="font-mono text-base tracking-wide select-all">{code}</div>
        </div>
        <button
          type="button"
          onClick={copyCode}
          className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/10 hover:bg-white/15 text-xs shrink-0"
        >
          {copiedCode ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}
