import { useContext } from "react";
import { NavigationContext } from ".";

function useScene() {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error("useScene must be used inside <SceneManager>");
  return ctx;
}

export default useScene
