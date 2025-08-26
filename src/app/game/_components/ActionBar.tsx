
import { useSceneManager } from "@/core/SceneManager/SceneManagerProvider"
import NeonCog from "./NeonCog"
import { SmartBackButton } from "./BackButton"

function ActionBar() {
  const { back } = useSceneManager()

  return (
    <header className="absolute top-0 left-0 right-0 w-full py-3 px-4 z-20">
      <div className="flex justify-between">
        <div>
          {/* <button type="button" className="z-10 relative cursor-pointer" onClick={() => back()}>Back Button</button> */}
          <SmartBackButton />
        </div>
        <button type="button" className="cursor-pointer">
          <NeonCog strokeSpeed={2500} flickerSpeed={400} />
          <span className="sr-only">Settings</span>
        </button>
      </div>
    </header>
  )
}

export default ActionBar
