import { useEffect, useRef, useState } from "react";
import NeonLogo from "../_components/NeonLogo";
import MenuButton from "../_components/MenuButton";

function SceneStart() {
  const menuItems = [
    { text: "Singleplayer", scene: "GameModes" },
    { text: "Local Co-Op", scene: "Game" },
    { text: "Multiplayer", scene: "GameModes" },
    { text: "Leaderboard", scene: "Home" },
    { text: "Credits", scene: "Home" }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [logoVisible, setLogoVisible] = useState(false);
  const [turnedOnItems, setTurnedOnItems] = useState([]);

  const ambientAudioRef = useRef(null);

  useEffect(() => {
    const handleClick = () => {
      if (ambientAudioRef.current) {
        ambientAudioRef.current.play().catch((err) => {
          console.error("Failed to play audio:", err);
        });
      }
      // Optional: remove listener after first click so it only plays once automatically
      window.removeEventListener("click", handleClick);
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  const ambientAudioReff = useRef(null);

  useEffect(() => {
    const handleClick = () => {
      if (ambientAudioReff.current) {
        ambientAudioReff.current.play().catch((err) => {
          console.error("Failed to play audio:", err);
        });
      }
      // Optional: remove listener after first click so it only plays once automatically
      window.removeEventListener("click", handleClick);
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);


  // Sequential reveal (byline → logo → menu items)
  useEffect(() => {
    const timers = [];

    timers.push(setTimeout(() => setLogoVisible(true), 300));

    // Step 3: reveal menu items one by one
    menuItems.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setTurnedOnItems((prev) => [...prev, i]);
        }, 1120 + i * 250) // start after logo, staggered
      );
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "ArrowUp") {
        setActiveIndex((prev) => (prev - 1 + menuItems.length) % menuItems.length);
      } else if (e.key === "ArrowDown") {
        setActiveIndex((prev) => (prev + 1) % menuItems.length);
      } else if (e.key === "Tab") {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % menuItems.length);
      } else if (e.key === "Enter") {
        const selectSound = new Audio("/audio/jazzysnap.mp3");
        selectSound.play();
        console.log("Selected:", menuItems[activeIndex]);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, menuItems.length]);

  const handleSelect = (index: number) => {
    const selectSound = new Audio("/audio/jazzsnap.mp3");
    selectSound.play();
    console.log("Clicked:", menuItems[index]);
  };

  return (
    <div>
      <div className="relative h-full w-full flex flex-col items-center justify-center overflow-x-hidden overflow-y-auto pt-22" >

        <div className="relative">
          <div className="text-center opacity-90">
            <span
              className={`
               relative font-bold font-sacramento
              text-[clamp(0.5rem,2vw,4rem)]
              transition-opacity duration-700
              ${logoVisible ? "  neon" : "text-[#4a4a4a] "}
            `}
            >
              <NeonLogo text="By Aurelian Spodarec" />
            </span>
            <h1
              className={`
              relative font-bold
              text-[clamp(2rem,5vw,5rem)]
              transition duration-700 font-neontubes
              ${logoVisible ? "opacity-100 scale-100  neon" : "text-[#4a4a4a] opacity-50"}
            `}
            >
              <NeonLogo text="JazzTacToe" />
            </h1>
          </div>

          <nav className="flex flex-col mt-10">
            {menuItems.map((item, index) => (
              <MenuButton
                key={item.text}
                text={item.text}
                turnedOn={turnedOnItems.includes(index)}
                isActive={index === activeIndex}
                onMouseEnter={() => setActiveIndex(index)}
                targetScene={item.scene as "Home" | "Game" | "GameModes"}
                onSelect={() => {
                  const selectSound = new Audio("/audio/jazzsnap.mp3");
                  selectSound.play();
                  // navigate to the correct scene
                  if (item.scene) push(item.scene as "Home" | "Game" | "GameModes");
                }}
              />
            ))}
          </nav>

          <div className="text-gray-200 mt-20 text-center font-neontubes">
            Anyone say jazz? TicTacToe just got funky ;)
          </div>
        </div>

      </div>
    </div>
  );
}

export default SceneStart



{/* <div>
          <audio
            src="/audio/relaxing-jazz-saxophone.mp3"
            loop
            ref={ambientAudioRef}
            autoPlay
            controls
            aria-hidden="true"
            aria-label="Background jazz music."
            className="sr-only"
          >
            <p className="sr-only">Background jazz saxophone instrumental, no lyrics.</p>
          </audio>
          <audio
            src="/audio/electric-zap.mp3"
            ref={ambientAudioReff}
            autoPlay
            controls
            aria-hidden="true"
            aria-label="Background jazz music."
            className="sr-only"
          >
            <p className="sr-only">Background jazz saxophone instrumental, no lyrics.</p>
          </audio>
        </div> */}