// Diwali Sound & Music System
// Plays high-fidelity studio Diwali festive tracks (/audio/bed.mp3) with sound effects

class DiwaliSoundManager {
  constructor() {
    this.musicAudio = null;
    this.ambienceAudio = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.soundEffects = {};
  }

  init() {
    if (typeof window === 'undefined') return;

    if (!this.musicAudio) {
      this.musicAudio = new Audio('/audio/bed.mp3');
      this.musicAudio.loop = true;
      this.musicAudio.volume = 0.55;
    }

    if (!this.ambienceAudio) {
      this.ambienceAudio = new Audio('/audio/ambience.mp3');
      this.ambienceAudio.loop = true;
      this.ambienceAudio.volume = 0.25;
    }

    // Preload quick sound effects
    const effects = [
      ['bell', '/audio/begin-bell.mp3'],
      ['strike', '/audio/match-strike.mp3'],
      ['flame', '/audio/flame-catch.mp3'],
      ['burst', '/audio/burst.mp3'],
      ['peony', '/audio/burst_peony.mp3'],
      ['lantern', '/audio/lantern-riser.mp3'],
      ['intro', '/audio/m-intro.mp3'],
      ['wish', '/audio/m-wish.mp3']
    ];

    effects.forEach(([key, src]) => {
      try {
        const a = new Audio(src);
        a.volume = 0.5;
        this.soundEffects[key] = a;
      } catch (e) {
        // ignore
      }
    });
  }

  playEffect(name, volume = 0.5) {
    if (this.isMuted) return;
    try {
      this.init();
      const sound = this.soundEffects[name];
      if (sound) {
        // Clone for overlapping sounds (e.g. rapid firework clicks)
        const clone = sound.cloneNode();
        clone.volume = volume;
        clone.play().catch(() => {});
      }
    } catch (e) {
      // ignore
    }
  }

  playSong() {
    this.init();
    if (this.isMuted) return;
    try {
      if (this.musicAudio) {
        this.musicAudio.play().then(() => {
          this.isPlaying = true;
        }).catch(() => {});
      }
      if (this.ambienceAudio) {
        this.ambienceAudio.play().catch(() => {});
      }
    } catch (e) {
      console.warn("Error playing song:", e);
    }
  }

  pauseSong() {
    if (this.musicAudio) {
      this.musicAudio.pause();
    }
    if (this.ambienceAudio) {
      this.ambienceAudio.pause();
    }
    this.isPlaying = false;
  }

  toggleMute() {
    this.init();
    if (this.isPlaying && !this.isMuted) {
      this.pauseSong();
      this.isMuted = true;
      return false; // muted
    } else {
      this.isMuted = false;
      this.playSong();
      return true; // playing
    }
  }

  toggle() {
    return this.toggleMute();
  }

  playBell(freq) {
    this.playEffect('bell', 0.5);
  }

  playFireworkBurst() {
    const ef = Math.random() > 0.5 ? 'burst' : 'peony';
    this.playEffect(ef, 0.45);
  }

  playDiyaLightingSequence() {
    this.playEffect('strike', 0.6);
    setTimeout(() => {
      this.playEffect('flame', 0.8);
      this.playEffect('bell', 0.4);
    }, 450);
  }
}

export const soundManager = new DiwaliSoundManager();
export const festiveAudio = soundManager;
