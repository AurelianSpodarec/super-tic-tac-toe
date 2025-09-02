import React from "react";

interface BackgroundImageProps {
  src: string;
  backgroundSize?: string;
  opacity?: number;
}

function BackgroundImage({ src, backgroundSize, opacity = 0.3, }: BackgroundImageProps) {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full pointer-events-none select-none"
      style={{
        backgroundImage: `url(${src})`,
        opacity,
        ...(backgroundSize ? { backgroundSize } : {}),
      }}
    />
  );
}

export default BackgroundImage
