import { useSceneManager } from "../SceneManager/SceneManagerProvider";

const gameModes = [
  {
    name: "TicTacToe",
    image: "https://i.imgur.com/36LVn1E.png",
    modeId: "modeTicTacToe"
  },
  {
    name: "Super TicTacToe",
    image: "https://i.imgur.com/DlWB4Ua.png",
    modeId: "modeSuperTicTacToe"
  }
]

function SceneGameModes() {
  const { pushScene } = useSceneManager();
  return (
    <div>
      <h2 className="text-center text-4xl mb-6">Choose Game Mode</h2>
      <div className="container max-w-[700px]">
        <div className="grid grid-cols-2">
          {gameModes.map((item) => {
            return (
              <button type="button" onClick={() => pushScene(item.modeId)} className="border border-gray-700 bg-black/80 rounded-md p-4 cursor-pointer">
                <img src={item.image} className="object-fit w-full h-full" />
                <div className=" text-center">
                  <span className="text-2xl">{item.name}</span>
                  {/* <span>Game Rules</span> */}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SceneGameModes
