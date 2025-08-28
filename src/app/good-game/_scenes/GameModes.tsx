import { useSceneManager } from "../_engine/SceneManager";

const dataGameModes = [
  {
    name: "TicTacToe",
    image: "/images/tic-tac-toe.svg",
    modeId: "modeTicTacToe"
  },
  // {
  //   name: "Super TicTacToe",
  //   image: "https://i.imgur.com/DlWB4Ua.png",
  //   modeId: "modeSuperTicTacToe"
  // }
]

function SceneGameModes() {
  const { pushScene } = useSceneManager();
  return (
    <div className="flex flex-col items-center justify-center h-full w-full text-white gap-4">

      <h1 className="text-5xl">Game Modes</h1>
      <div className="max-w-[700px] flex">
        {dataGameModes.map((item) => {
          return (
            <button type="button" onClick={() => pushScene(item.modeId)} className="flex flex-col w-[300px] rounded bg-[#ffac99] p-4">
              <img src={item.image} className="w-full h-full" />
              <span className="text-black">{item.name}</span>
            </button>
          )
        })}
      </div>

    </div>
  );
}

export default SceneGameModes
