function WebRoot() {
  return (
    <div className="webroot">

      <section className="hero">
        <h1>JazTacToe</h1>
        <p>Tic Tac Toe… but make it Jazzy! Outsmart, Outplay, Outstyle.</p>
        <button className="cta-button">Start the Jazz Tac Toe Now</button>
      </section>

      <section className="characters">
        <h2>Choose Your Character</h2>
        <p>Pick your favorite avatar and show off your style on the board!</p>
        <div className="avatar-preview">

          <span>😎</span>
          <span>🤖</span>
          <span>👻</span>
        </div>
      </section>

      <section className="game-modes">
        <h2>Game Modes</h2>
        <ul>
          <li>🎯 Classic Tic Tac Toe – simple, fun, timeless</li>
          <li>🕹 Multiplayer – challenge your friends online</li>
          <li>🤖 Player vs AI – test your skills against smart opponents</li>
          <li>⏱ Timed Mode – speed through for extra points!</li>
        </ul>
      </section>

      <section className="features">
        <h2>Why Play JazTacToe?</h2>
        <ul>
          <li>✨ Stylish animations & fun avatars</li>
          <li>🏆 Leaderboards & achievements</li>
          <li>🌐 Online multiplayer & AI challenges</li>
          <li>🎉 Daily challenges to keep it exciting</li>
        </ul>
      </section>

      <section className="testimonials">
        <h2>What AI Says</h2>
        <blockquote>"So addictive! I keep beating humans one after the other" – AI Rob</blockquote>
        <blockquote>"The avatars and animations make this Tic Tac Toe a blast!" – Jamie</blockquote>
      </section>

      <section className="faq">
        <h2>Frequently Asked Questions</h2>
        <ul>
          <li><strong>How do I play?</strong> Just pick a character, choose a mode, and start matching Xs and Os!</li>
          <li><strong>Can I play online?</strong> Yes! Challenge friends in multiplayer mode or play against AI.</li>
          <li><strong>Is it free?</strong> Absolutely! Fun for everyone.</li>
        </ul>
      </section>

      <section className="final-cta">
        <h2>Ready to Jazz Tac Toe?</h2>
        <button className="cta-button">Start the game!</button>
      </section>

    </div>
  );
}

export default WebRoot;
