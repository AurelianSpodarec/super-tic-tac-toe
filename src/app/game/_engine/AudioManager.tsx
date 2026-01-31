type AudioSettings = {
  ambientVolume: number;
  sfxVolume: number
};

class AudioManagerClass {
  public audioElements: Record<string, HTMLAudioElement> = {};
  private currentAmbient?: HTMLAudioElement;
  private currentAmbientSrc?: string;
  private unlocked = false;
  private queuedAmbientSrc?: string;
  private fadeDuration = 1000;
  public settings: AudioSettings = { ambientVolume: 1, sfxVolume: 1 };

  constructor() { }

  initUnlockListener() {
    if (typeof document === "undefined") return;
    const unlock = () => {
      this.unlocked = true;
      document.body.removeEventListener("click", unlock);
      document.body.removeEventListener("keydown", unlock);
      if (this.queuedAmbientSrc) this.playAmbient(this.queuedAmbientSrc);
    };
    document.body.addEventListener("click", unlock, { once: true });
    document.body.addEventListener("keydown", unlock, { once: true });
  }

  preload(src: string) {
    if (!this.audioElements[src]) {
      const audio = new Audio(src);
      audio.loop = true;
      audio.preload = "auto";
      audio.volume = 0;
      this.audioElements[src] = audio;
    }
  }

  async playAmbient(src: string) {
    if (!this.unlocked) {
      this.queuedAmbientSrc = src;
      return;
    }

    if (this.currentAmbientSrc === src && this.currentAmbient) return;

    const newAudio = this.audioElements[src];
    if (!newAudio) return;

    const oldAudio = this.currentAmbient;
    this.currentAmbient = newAudio;
    this.currentAmbientSrc = src;

    newAudio.currentTime = 0;
    newAudio.play().catch(() => { });

    await this.crossfade(oldAudio, newAudio, this.settings.ambientVolume);
  }

  private crossfade(oldAudio?: HTMLAudioElement, newAudio?: HTMLAudioElement, targetVolume = 1) {
    return new Promise<void>(resolve => {
      const step = 50;
      const steps = this.fadeDuration / step;
      let count = 0;
      const interval = setInterval(() => {
        count++;
        if (newAudio) newAudio.volume = Math.min((count / steps) * targetVolume, targetVolume);
        if (oldAudio) {
          oldAudio.volume = Math.max(oldAudio.volume - targetVolume / steps, 0);
          if (oldAudio.volume <= 0) oldAudio.pause();
        }
        if (count >= steps) {
          if (newAudio) newAudio.volume = targetVolume;
          clearInterval(interval);
          resolve();
        }
      }, step);
    });
  }

  stopAmbient() {
    // Ensure no ambient track will resume later due to the initial unlock queue.
    this.queuedAmbientSrc = undefined;

    if (this.currentAmbient) {
      this.currentAmbient.pause();
      this.currentAmbient.currentTime = 0;
      this.currentAmbient = undefined;
      this.currentAmbientSrc = undefined;
    }
  }

  playSFX(src: string) {
    if (!this.unlocked) return;
    const audio = new Audio(src);
    audio.volume = this.settings.sfxVolume;
    audio.play().catch(() => { });
  }

  setAmbientVolume(volume: number) {
    this.settings.ambientVolume = Math.min(Math.max(volume, 0), 1);
    if (this.currentAmbient) this.currentAmbient.volume = this.settings.ambientVolume;
  }

  setSFXVolume(volume: number) {
    this.settings.sfxVolume = Math.min(Math.max(volume, 0), 1);
  }
}

export const AudioManager = new AudioManagerClass();
