// Web Audio API Synthesizer for premium, ultra-lightweight UI sound design.
// Real-time dynamic audio synthesis avoids loading heavy audio assets over the network.

let audioCtx: AudioContext | null = null;
let isMuted = true; // Muted by default to follow modern web practices

if (typeof window !== "undefined") {
  const stored = window.localStorage.getItem("portfolio-sounds-enabled");
  isMuted = stored !== "true";
}

// Initialize audio context on demand (browsers require user interaction first)
function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  return audioCtx;
}

// Check mute state from localStorage
export function initSoundState(): boolean {
  if (typeof window === "undefined") return true;
  const stored = localStorage.getItem("portfolio-sounds-enabled");
  if (stored === "true") {
    isMuted = false;
  } else {
    isMuted = true;
  }
  return isMuted;
}

export function setMuteState(mute: boolean) {
  isMuted = mute;
  localStorage.setItem("portfolio-sounds-enabled", (!mute).toString());
}

export function getMuteState(): boolean {
  return isMuted;
}

// Unlock audio context (browsers put context in 'suspended' state initially)
function unlockAudioContext(ctx: AudioContext) {
  if (ctx.state === "suspended") {
    ctx.resume();
  }
}

// Play a soft tick sound (optimized for item hovers)
export function playHoverSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  unlockAudioContext(ctx);

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  // Soft micro-tick for hover affordance
  osc.type = "sine";
  osc.frequency.setValueAtTime(960, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(560, ctx.currentTime + 0.035);

  gain.gain.setValueAtTime(0.01, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.035);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.035);
}

// Play a futuristic slide click sound (optimized for menu selection / button clicks)
export function playClickSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  unlockAudioContext(ctx);

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.type = "triangle";
  osc.frequency.setValueAtTime(640, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.07);

  gain.gain.setValueAtTime(0.022, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.07);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.07);
}

// Play a low sweep sound (optimized for panel opens)
export function playWhooshSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  unlockAudioContext(ctx);

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.type = "sine";
  osc.frequency.setValueAtTime(140, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + 0.18);

  gain.gain.setValueAtTime(0.0001, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.016, ctx.currentTime + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.18);
}

// Play a short synth chime sequence (optimized for success states like copy / send)
export function playSuccessChime() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  unlockAudioContext(ctx);

  const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 major arpeggio
  const startTime = ctx.currentTime;

  notes.forEach((freq, index) => {
    const noteTime = startTime + index * 0.06;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, noteTime);

    gain.gain.setValueAtTime(0, noteTime);
    gain.gain.linearRampToValueAtTime(0.02, noteTime + 0.018);
    gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.2);

    osc.start(noteTime);
    osc.stop(noteTime + 0.22);
  });
}
