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
      {/* <button
        type="button"
        onMouseEnter={playSound}
        onMouseDown={() => { playSound(); onClick?.(); }}
        className="rounded-lg px-8 py-4 text-md cursor-pointer
          border border-[#ffed00]/70 
          shadow-[inset_0_0_10px_#fcc1ea,inset_0_0_10px_#fcc1ea,0_0_10px_#fcc1ea,0_0_10px_#fcc1ea]
           text-[#ff99e0] text-shadow font-semibold block text-center mx-auto
           
           "
      >
        {children || label}
      </button> */}
      <div className="flex  items-center justify-center text-lg">
        <span className="absolute mx-auto flex border bg-gradient-to-r blur-xl from-[#ffce99] via-[#ffff99] to-[#a8ff99] bg-clip-text box-content font-extrabold text-transparent select-none">
          {children || label}
        </span>
        <h1
          className=" top-0 h-auto justify-center flex bg-gradient-to-r items-center from-[#ffce99] via-[#ffff99] to-[#a8ff99] bg-clip-text font-extrabold text-transparent select-auto">
          {children || label}
        </h1>
      </div>
    </>
  );
}
