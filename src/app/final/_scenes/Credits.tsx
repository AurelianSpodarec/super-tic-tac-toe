function SceneCredits() {


  // CREDITS
  // Producer: Aurelian Spodarec

  // Lead Programmer: Aurelian Spodarec

  // Designer: Aurelian Spodarec

  // Story Telling: Aurelian Spodarec 

  // [on the side have moodboard inspiration]

  // Programmer: 
  // ChatGPT
  // Codepen Nomeil
  // Codepen Wusdl

  // Sound
  // Ambient Effect 1: Jon
  // Ambient Effect 2: Luigi Silvion
  // Ambient Effect 3: Wodk

  // Button Hover: 
  // Select Enter: 



  // Cast
  // Novice AI Graphic... is kind of a desing graphic right but its made by someen else and should be under a desing most likely no
  // Mafia Boss: 
  // Woman 1
  // man 1 etc 

  // [on the side have image of the avatars]

  // Fun Facts

  // Special Thanks

  // Copyright
  return (
    <section id="credits" className=" bg-[#1a1a1b] py-20 space-y-8 h-full w-full flex flex-col text-center items-center">

      <h1 className="font-bold text-2xl mb-10">CREDITS</h1>

      <section id="created-by">
        <h2 className="font-bold">Created by</h2>
        <p>Aurelian Spodarec</p>
      </section>

      <section id="roles">
        <h2 className="font-bold">Game Design, Programming, Art, Animation</h2>
        <p>Aurelian Spodarec</p>
      </section>

      <section id="audio">
        <h2 className="font-bold">Audio</h2>
        <ul className="text-left">
          <li>Ambient Sound (Start Screen) – Adam (freesound.org)</li>
          <li>Ambient Sound (Gameplay) – PixelBay</li>
        </ul>
      </section>

      <section id="special-thanks">
        <h2 className="font-bold">Special Thanks</h2>
        <p>All Playtesters and the indie dev community</p>
      </section>

      <section id="fun-facts">
        <h2 className="font-bold">Fun Facts</h2>
        <ul className="text-left">
          <li>Originally planned as a chalkboard game, then reimagined with a Las Vegas neon theme.</li>
          <li>Inspired by a cocktail bar font, later pivoted to a jazz theme.</li>
          <li>Started in 2020 with just a dozen lines of code and abandoned, end of August 2025 picked it up again</li>
          <li>Created to showcase animation skills and visual flair.</li>
          <li>I spent more time perfecting the start screen than the entire game combined.</li>
        </ul>
      </section>

      <footer id="legal">
        <p>&copy; 2025 Aurelian Spodarec. All Rights Reserved.</p>
        <p>Built with TypeScript... on a chair half alseep.</p>
      </footer>

    </section>
  )
}

export default SceneCredits
