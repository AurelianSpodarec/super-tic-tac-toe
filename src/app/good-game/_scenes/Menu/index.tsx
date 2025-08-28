import Logo from "../../_components/Logo";
import { MenuButton } from "./_components/MenuButton";
import { useSceneManager } from "../../_engine/SceneManager";

function SceneMenu() {
  const { pushScene } = useSceneManager();
  return (
    <div className="flex flex-col items-center pt-24">
      <Logo />
      <nav className="flex flex-col mb-10">
        <MenuButton label="Single Player" isActive={true} onClick={() => pushScene("gameModes")} />
        <MenuButton label="Local Co-Op" />
        <MenuButton label="Multiplayer" />
        <MenuButton label="Leaderboard" onClick={() => pushScene("leaderboard")} />
      </nav>
    </div>
  );
}

export default SceneMenu