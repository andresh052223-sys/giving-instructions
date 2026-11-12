// Web Audio API synthesizer for zero-dependency game sound effects

class SoundEffectsManager {
  private ctx: AudioContext | null = null;
  private muted = false;

  private getContext(): AudioContext | null {
    if (this.muted || typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.muted = muted;
  }

  public isMuted(): boolean {
    return this.muted;
  }

  private playTone(
    freq: number,
    duration: number,
    type: OscillatorType = 'sine',
    delay = 0,
    gainPeak = 0.14
  ) {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(gainPeak, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  public playStartMission() {
    this.playTone(440, 0.12, 'triangle', 0, 0.14);
    this.playTone(554.37, 0.12, 'triangle', 0.09, 0.14);
    this.playTone(659.25, 0.22, 'triangle', 0.18, 0.16);
  }

  public playCorrect() {
    this.playTone(523.25, 0.12, 'triangle', 0, 0.16); // C5
    this.playTone(659.25, 0.14, 'triangle', 0.08, 0.16); // E5
    this.playTone(783.99, 0.24, 'sine', 0.16, 0.18); // G5
  }

  public playMoveStep() {
    // Light rhythmic footsteps as the explorer moves along the map
    this.playTone(240, 0.06, 'sine', 0.05, 0.07);
    this.playTone(300, 0.06, 'sine', 0.22, 0.07);
    this.playTone(340, 0.07, 'sine', 0.38, 0.07);
  }

  public playWrong() {
    this.playTone(260, 0.18, 'sawtooth', 0, 0.11);
    this.playTone(195, 0.28, 'sawtooth', 0.14, 0.12);
    this.playTone(145, 0.36, 'triangle', 0.28, 0.13);
  }

  public playVictory() {
    const notes = [
      { f: 523.25, d: 0.14, t: 0 },
      { f: 659.25, d: 0.14, t: 0.11 },
      { f: 783.99, d: 0.14, t: 0.22 },
      { f: 1046.5, d: 0.38, t: 0.34 },
      { f: 783.99, d: 0.14, t: 0.56 },
      { f: 1046.5, d: 0.52, t: 0.7 },
    ];
    notes.forEach((n) => {
      this.playTone(n.f, n.d, 'triangle', n.t, 0.16);
    });
  }
}

export const soundFX = new SoundEffectsManager();
