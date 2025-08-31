import { dataGameModes } from "../_components/dataGameModes"
import GameModeItem from "../_components/GameModeItem"

function SceneGameModes() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">

      <div className="text-center">
        <h1 className="neon relative font-bold text-yellow-400 neon-logo text-[clamp(1rem,3.5vw,3rem)]">
          Choose your game Mode
        </h1>
      </div>

      <div className="flex mx-auto justify-center space-x-4 max-w-[900px] mt-10">
        {dataGameModes.map((item) => {
          return (
            <GameModeItem item={item} />
          )
        })}
      </div>
    </div>
  )
}

export default SceneGameModes
