import { Scene } from "../_engine/SceneManager";
import SceneGameModes from "./GameModes";
import SceneLeaderboard from "./Leaderboard";
import SceneMenu from "./Menu";
import SceneModeTicTacToe from "./TicTacToe";

const scenes: Scene[] = [
  { key: "menu", component: <SceneMenu />, backgroundKey: "variantOne" },
  { key: "leaderboard", component: <SceneLeaderboard />, backgroundKey: "variantOne" },
  { key: "gameModes", component: <SceneGameModes />, backgroundKey: "variantOne" },
  { key: "modeTicTacToe", component: <SceneModeTicTacToe />, backgroundKey: "variantTwo" }, // AI or co-op?
  // { key: "modeSuperTicTacToe", component: <SceneModeSuperTicTacToe />, backgroundKey: "variantTwo" }
];

export default scenes
