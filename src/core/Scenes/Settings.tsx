
function SceneSettings() {
  return (
    <div className="flex flex-col justify-center">

      <div className="flex justify-center mb-[50px] z-10">
        <span className="text-4xl font-bold text-center py-4 px-3 rounded bg-black/50 backdrop-blur mb-2">Settings</span>
      </div>

      <div className="bg-black/80 rounded-lg dotted w-[750px] neon flick h-[600px] mx-auto">
        <header className="text-center">
          <nav className="space-x-4">
            <button>Audio</button>
            <button className="text-orange-300">Language</button>
            <button>Theme</button>
          </nav>
        </header>
        <section className="w-full h-full px-4 py-8">

          {/* <SettingsAudio /> */}
          {/* <SettingsLanguages /> */}
        </section>
      </div>
    </div>
  )
}

export default SceneSettings
