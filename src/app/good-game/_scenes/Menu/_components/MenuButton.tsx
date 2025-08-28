'use client'

import { useRef } from "react";
import NeonText from "../../../_components/NeonText";

interface Props {
  label: string;
  children?: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
}

// TODO: When hover over a letter, play the electric sound, and have a 80% chance to re-change the color of the neon logo

export function MenuButton({ label, children, onClick, isActive }: Props) {
  // const audioRef = useRef<HTMLAudioElement | null>(null);

  // const playSound = () => {
  //   if (audioRef.current) {
  //     audioRef.current.currentTime = 0;
  //     audioRef.current.play();
  //   }
  // };

  return (
    <>
      {/* <audio ref={audioRef} src="/audio/electric-zap.mp3" preload="auto" /> */}
      <button
        type="button"
        onClick={onClick}
        className="
          flex items-center justify-center
          text-[clamp(1.5rem,2.5vw,2rem)]
          px-[clamp(1.5rem,4vw,3rem)]
          py-[clamp(0.75rem,2vw,1.5rem)]
          custom-cursor
          animate-fade-in-delay opacity-0
        ">
        <span className={`absolute mx-auto flex border pointer-none ${isActive ? "blur-xl pure-glow" : "opacity-0"}  bg-gradient-to-r from-[#b699ff] via-[#ff99e4] to-[#ff99c9] bg-clip-text box-content font-extrabold text-transparent select-none`}>
          {children || label}
        </span>
        <span
          className="custom-cursor top-0 h-auto justify-center flex bg-gradient-to-r items-center from-[#b699ff] via-[#ff99e4] to-[#ff99c9] bg-clip-text font-extrabold text-transparent select-none pointer-none">
          {/* <NeonText text={ */}
          {children || label}
          {/* }/> */}
        </span>
      </button>
    </>
  );
}



// THis gives this truned off neon bulb that can be turned on on load

// THIS IS TEXT OFF:
{/* <div className="flex  items-center justify-center text-lg">
  <h1
    className=" top-0 h-auto justify-center flex bg-gradient-to-r items-center  select-auto">
    {children || label}
  </h1>
</div> */}


// THIS IS TEXT ON:
{/* <div className="flex  items-center justify-center text-lg">
        <span className="absolute mx-auto flex border bg-gradient-to-r blur-xl from-[#ffce99] via-[#ffff99] to-[#a8ff99] bg-clip-text box-content font-extrabold text-transparent select-none">
          {children || label}
        </span>
        <h1
          className=" top-0 h-auto justify-center flex bg-gradient-to-r items-center from-[#ffce99] via-[#ffff99] to-[#a8ff99] bg-clip-text font-extrabold text-transparent select-auto">
          {children || label}
        </h1>
      </div> */}


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
{/* shadow-[inset_0_0_5px_#ff99e4,inset_0_0_5px_#ff99e4,0_0_5px_#ff99e4,0_0_5px_#ff99e4] */ }
{/* border-[1px] border-[#ff99e4] rounded   */ }