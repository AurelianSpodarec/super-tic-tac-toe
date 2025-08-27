import { sceneManager } from "@/game-engine/SceneManager";
import Logo from "./_components/Logo";
import { MenuButton } from "./_components/MenuButton";
import Overlay from "./_components/Overlay";

function SceneMenu() {
  return (
    <div className="h-full w-full theme-4 overflow-auto" style={{ backgroundImage: "url('/images/brick.svg')" }}>
      <div className="h-full w-full z-10 relative">
        <div className="text-center pt-20">
          <Logo />
          <nav className="flex flex-col space-y-6">
            <MenuButton label="Single Player" onClick={() => sceneManager.push("game")} />
            <MenuButton label="Local Co-Op" onClick={() => sceneManager.push("test")} />
            <MenuButton label="Multiplayer" onClick={() => sceneManager.push("game")} />
            <MenuButton label="Leaderboard" onClick={() => sceneManager.push("leaderboard")} />
            <MenuButton label="Settings" onClick={() => sceneManager.push("settings")} />
          </nav>
        </div>
      </div>
      <Overlay />
    </div>
  );
}

export default SceneMenu
