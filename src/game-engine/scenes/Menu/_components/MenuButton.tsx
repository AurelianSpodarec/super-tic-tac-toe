'use client'

import { useRef } from "react";

interface Props {
  label: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export function MenuButton({ label, children, onClick }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/electric-zap.mp3" preload="auto" />
      <button
        type="button"
        onMouseEnter={playSound}
        onMouseDown={() => { playSound(); onClick?.(); }}
        className="rounded-lg px-10 py-5 text-xl cursor-pointer
          border border-[#ffed00]/70
          shadow-[inset_0_0_10px_#ff99e0,inset_0_0_10px_#ff99e0,0_0_10px_#ff99e0,0_0_10px_#ff99e0]
          flicker neon text-[#ff99e0] font-semibold block text-center mx-auto"
      >
        {children || label}
      </button>
    </>
  );
}
