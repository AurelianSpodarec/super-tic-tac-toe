'use client'

import NeonText from "./NeonText";

function Logo() {
  return (
    <div className="container mx-auto px-4 animate-fade-in text-center text-[clamp(2rem,5vw,5rem)] mb-14 font-neontubess font-monoton">
      <NeonText text={`JazzTacToe`} />
    </div>
  );
}

export default Logo;
