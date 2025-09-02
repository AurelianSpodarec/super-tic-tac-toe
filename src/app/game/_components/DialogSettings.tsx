'use client'

function DialogSettings() {
  return (
    <aside className="fixed w-[800px] h-[500px] bg-black z-20 left-0 right-0 top-1/2 border border-amber-400 rounded">
      <span>Settings</span>
      <div>
        <ul>
          <button>Audio</button>
          <button>Language</button>
          <button>Theme</button> {/* Mouse, Cursor, Trail */}
        </ul>
      </div>
      <section>
        SFX
        Music

        Pl, Eng, IT etc... SAVE


      </section>
    </aside>
  )
}

export default DialogSettings
