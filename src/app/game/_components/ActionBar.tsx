import NeonCog from "./NeonCog"
import BackButton from "./BackButton"

function ActionBar() {
  return (
    <header className="absolute top-0 left-0 right-0 w-full py-3 px-4 z-20">
      <div className="flex justify-between">
        <div>
          <BackButton />
        </div>
        <div className="space-x-2">
          <button>Language</button>
          <button>Sound</button>
          {/* <button type="button" className="cursor-pointer">
            <NeonCog strokeSpeed={2500} flickerSpeed={400} />
            <span className="sr-only">Settings</span>
          </button> */}
        </div>
      </div>
    </header>
  )
}

export default ActionBar
