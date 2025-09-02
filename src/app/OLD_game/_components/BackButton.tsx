"use client";

import { useSceneManager } from "@/core/SceneManager/SceneManagerProvider";

interface Props {
  overrideScene?: string;   // optional scene key to go back to
  children?: React.ReactNode;
}

function BackButton({ overrideScene, children }: Props) {
  const { back, currentScene } = useSceneManager();

  if (currentScene === "start") return null;

  const handleClick = () => {
    back(overrideScene); // if overrideScene is undefined, it goes to previous scene
  };

  return (
    <button
      onClick={handleClick}
      className=""
    >
      <span className="sr-only">Go Back To Previous Scene</span>
      {children || (
        <div>
          <svg className="fill-white text-white w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M20 13.5a4.505 4.505 0 0 1-4.5 4.5H12a1 1 0 0 1 0-2h3.5a2.5 2.5 0 0 0 0-5H7.414l1.293 1.293a1 1 0 1 1-1.414 1.414l-3-3a1 1 0 0 1 0-1.416l3-3a1 1 0 0 1 1.414 1.416L7.414 9H15.5a4.505 4.505 0 0 1 4.5 4.5"
            />
          </svg>
        </div>
      )}
    </button>
  );
}

export default BackButton
