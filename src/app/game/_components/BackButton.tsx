"use client";

import { useSceneManager } from "@/core/SceneManager/SceneManagerProvider";


interface Props {
  overrideScene?: string;   // optional scene key to go back to
  children?: React.ReactNode;
}

export function SmartBackButton({ overrideScene, children }: Props) {
  const { back } = useSceneManager();

  const handleClick = () => {
    back(overrideScene); // if overrideScene is undefined, it goes to previous scene
  };

  return (
    <button
      onClick={handleClick}
      className="rounded-lg px-6 py-3 bg-pink-500 text-white hover:bg-pink-600"
    >
      {children || "Back"}
    </button>
  );
}
