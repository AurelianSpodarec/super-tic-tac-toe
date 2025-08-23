'use client'

function MenuItem({ children, onClick }) {
  return (
    <>
     <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter
            id="chalk"
            height="2"
            width="1.6"
            colorInterpolationFilters="sRGB"
            y="-0.5"
            x="-0.3"
          >
            <feTurbulence
              baseFrequency="50"
              seed="115"
              result="result1"
              numOctaves="1"
              type="turbulence"
            />
            <feOffset result="result2" dx="-5" dy="-5" />
            <feDisplacementMap
              scale="1.5"
              yChannelSelector="G"
              in2="result1"
              xChannelSelector="R"
              in="SourceGraphic"
            />
            <feGaussianBlur stdDeviation="0.1" />
          </filter>
        </defs>
      </svg>
    <button
      type="button"
      className="px-12 py-4 rounded bg-gray-300/70 text-black text-5xl hover:bg-red-300 transition"
      onClick={onClick}
       style={{
          fontFamily: "'Decapoers', cursive",
          border: "4px solid rgba(255,255,255,0.2)",
          borderRadius: "6px",
          display: "inline-block",
          filter: "url(#chalk)"
        }}
      >
      {children}
    </button>
      </>
  );
}

function Menu() {
  const handleClick = (action) => {
    console.log(`Clicked ${action}`);
    // Here you could add routing or other logic
  };

  return (
    <div className="flex flex-col items-center text-center space-y-2">
      <MenuItem onClick={() => handleClick('Single Player')}>Single Player</MenuItem>
      <MenuItem onClick={() => handleClick('Local Co-Op')}>Local Co-Op</MenuItem>
      <MenuItem onClick={() => handleClick('Multiplayer')}>Multiplayer</MenuItem>
      <MenuItem onClick={() => handleClick('Settings')}>Settings</MenuItem>
      <MenuItem onClick={() => handleClick('Quit')}>Quit</MenuItem>
    </div>
  );
}

function Page() {
  return (
    <div
      className="flex items-center justify-center h-full w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/chalk-board-v1.jpg')" }}
    >

     
      {/* // "url('https://assets.grok.com/users/0edd0c0d-f3a0-494b-9d5d-f366b8b153a6/generated/fad0a09a-5567-4ea0-8728-3f25284245af/image.jpg')"
          // "url('https://assets.grok.com/users/0edd0c0d-f3a0-494b-9d5d-f366b8b153a6/generated/3e176138-14cc-4f40-9c8c-111f813484c8/image.jpg')"
          // "url('https://as1.ftcdn.net/jpg/16/12/45/92/1000_F_1612459291_scanmYlGvMYl61mDByYR3EeKZXC6FR9Z.jpg')"
          // "url('https://assets.grok.com/users/0edd0c0d-f3a0-494b-9d5d-f366b8b153a6/generated/132f88a5-02e1-4d72-a050-d9c7ffb06245/image.jpg')"
          // "url('https://assets.grok.com/users/0edd0c0d-f3a0-494b-9d5d-f366b8b153a6/generated/67ad27bf-1b86-4378-829e-5c2504dbd9f0/image.jpg')"
          // "url('https://assets.grok.com/users/0edd0c0d-f3a0-494b-9d5d-f366b8b153a6/generated/54c7f298-dfd0-4d4b-9772-abafed67621b/image.jpg')"
          // "url('	https://img.freepik.com/free-photo/old-black-backg…per-blackboard-chalkboard-concrete_1258-82890.jpg')"
          // "url('https://cdn.pixabay.com/photo/2018/09/22/11/34/business-3695073_1280.jpg')"
          // "url('https://assets.grok.com/users/0edd0c0d-f3a0-494b-9d5d-f366b8b153a6/generated/db21df79-3528-4399-8127-684f016a9b3b/image.jpg')" */}

      <div>
        <div className="mb-10">
          <h1 className="text-gray-300 text-9xl font-bold">Tic Tac Toe</h1>
        </div>
        <Menu />
      </div>

    </div>
  );
}

export default Page;
