// Web Audio API Synthesizer for premium, ultra-lightweight UI sound design.
// Real-time dynamic audio synthesis avoids loading heavy audio assets over the network.

let audioCtx: AudioContext | null = null;
let isMuted = true; // Muted by default to follow modern web practices

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

  // High frequency transient
  osc.type = "sine";
  osc.frequency.setValueAtTime(1400, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.04);

  // Extremely fast volume envelope decay to prevent clipping / click artifact
  gain.gain.setValueAtTime(0.015, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.04);
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
  osc.frequency.setValueAtTime(800, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.08);

  gain.gain.setValueAtTime(0.03, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.08);
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
  osc.frequency.setValueAtTime(120, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.22);

  gain.gain.setValueAtTime(0.0001, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.02, ctx.currentTime + 0.06);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.22);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.22);
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
    gain.gain.linearRampToValueAtTime(0.025, noteTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.22);

    osc.start(noteTime);
    osc.stop(noteTime + 0.25);
  });
}
