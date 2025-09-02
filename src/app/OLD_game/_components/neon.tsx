import React, { useEffect, useRef } from "react";
const NeonSign = () => {
  const words = [["T", "I", "C"], ["T", "A", "C"], ["T", "O", "E"]];
  const lettersRef = useRef(words.map(word => word.map(() => null)));
  const flickerTimers = useRef([]);
  const cycleTimers = useRef([]);
  const isPowerOut = useRef(false);

  // Helpers to manage classes
  const setOn = (el) => {
    el.classList.remove("off", "flicker", "lightFlicker", "halo");
    el.classList.add("on", "lit");
  };

  const setOff = (el, withHalo = true) => {
    el.classList.remove("on", "flicker", "lit", "lightFlicker");
    if (withHalo) {
      el.classList.add("halo");
      setTimeout(() => el.classList.remove("halo"), 300 + Math.random() * 200);
    }
    el.classList.add("off");
  };

  const flickerOnce = (el, duration) => {
    el.classList.add("flicker");
    setTimeout(() => el.classList.remove("flicker"), duration);
  };

  const smallFlicker = (el, duration) => {
    el.classList.add("lightFlicker");
    setTimeout(() => el.classList.remove("lightFlicker"), duration);
  };

  // Sequential letter animation for startup
  const turnOnSequence = () => {
    clearTimers();
    isPowerOut.current = false;

    const allLetters = lettersRef.current.flat();
    allLetters.forEach(l => setOff(l, false));

    const indices = allLetters.map((_, i) => i);
    let delay = 200;

    indices.forEach(() => {
      const r = Math.floor(Math.random() * indices.length);
      const idx = indices.splice(r, 1)[0];
      const el = allLetters[idx];
      const willFlicker = Math.random() < 0.5;

      setTimeout(() => {
        if (willFlicker) {
          flickerOnce(el, 80 + Math.random() * 150);
          setTimeout(() => setOn(el), 100 + Math.random() * 250);
        } else {
          setOn(el);
        }
      }, delay);

      delay += 100 + Math.random() * 200;
    });

    setTimeout(() => startFlickerCycle(), delay + 300);
  };

  // Ongoing flicker cycle
  const startFlickerCycle = () => {
    if (isPowerOut.current) return;

    const allLetters = lettersRef.current.flat();

    const scheduleNext = () => {
      if (isPowerOut.current) return;
      const wait = 250 + Math.random() * 1000;
      const timer = setTimeout(() => {
        if (Math.random() < 0.35) {
          allLetters.forEach(l => setOn(l));
        } else {
          randomFlicker();
        }
        scheduleNext();
      }, wait);
      flickerTimers.current.push(timer);
    };

    scheduleNext();

    const cycleDuration = 4000 + Math.random() * 5000;
    const cycleTimer = setTimeout(() => {
      if (Math.random() < 0.4) {
        doPowerOut(600 + Math.random() * 1500);
      } else {
        startFlickerCycle();
      }
    }, cycleDuration);
    cycleTimers.current.push(cycleTimer);
  };

  const randomFlicker = () => {
    if (isPowerOut.current) return;

    const allLetters = lettersRef.current.flat();
    const candidates = allLetters.filter(l => l.classList.contains("on"));
    if (!candidates.length) return;

    const target = candidates[Math.floor(Math.random() * candidates.length)];
    const action = Math.random();

    if (action < 0.4) {
      for (let i = 0; i < 3; i++) {
        setTimeout(() => smallFlicker(target, 40 + Math.random() * 100), i * 80);
      }
    } else if (action < 0.7) {
      setOff(target);
      setTimeout(() => {
        if (!isPowerOut.current) setOn(target);
      }, 100 + Math.random() * 300);
    } else if (action < 0.95) {
      setOff(target);
      setTimeout(() => {
        if (!isPowerOut.current) {
          flickerOnce(target, 80 + Math.random() * 120);
          setTimeout(() => setOn(target), 100 + Math.random() * 200);
        }
      }, 200 + Math.random() * 1000);
    } else {
      doPowerOut(500 + Math.random() * 1000);
    }
  };

  const doPowerOut = (duration) => {
    if (isPowerOut.current) return;
    isPowerOut.current = true;
    clearTimers();

    lettersRef.current.flat().forEach((l, i) => {
      setTimeout(() => setOff(l), i * 30);
    });

    setTimeout(() => {
      isPowerOut.current = false;
      turnOnSequence();
    }, duration);
  };

  const clearTimers = () => {
    flickerTimers.current.forEach(t => clearTimeout(t));
    cycleTimers.current.forEach(t => clearTimeout(t));
    flickerTimers.current = [];
    cycleTimers.current = [];
  };

  useEffect(() => {
    turnOnSequence();
    return clearTimers;
  }, []);

  // Optional helper to flicker a full word (like in response to a game move)
  const flashWord = (wordIndex) => {
    lettersRef.current[wordIndex].forEach(letter => {
      smallFlicker(letter, 150 + Math.random() * 100);
    });
  };

  return (
    <div className="mx-auto text-center flex mx-auto font-neontubes text-4xl">
      {words.map((word, i) => (
        <div className="sign" key={i} aria-label={word.join('')}>
          {word.map((letter, j) => (
            <span
              key={j}
              className="letter opacity-0"
              ref={el => lettersRef.current[i][j] = el}
            >
              {letter}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default NeonSign;
