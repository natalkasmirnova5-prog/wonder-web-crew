let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = (window.AudioContext || (window as any).webkitAudioContext) as
      | typeof AudioContext
      | undefined;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

/** Cheerful two-note pop click — kid-friendly. */
export function playClick() {
  const ac = getCtx();
  if (!ac) return;
  const now = ac.currentTime;
  const notes = [880, 1320]; // A5 -> E6
  notes.forEach((freq, i) => {
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.type = "triangle";
    o.frequency.setValueAtTime(freq, now + i * 0.06);
    g.gain.setValueAtTime(0.0001, now + i * 0.06);
    g.gain.exponentialRampToValueAtTime(0.18, now + i * 0.06 + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.06 + 0.12);
    o.connect(g).connect(ac.destination);
    o.start(now + i * 0.06);
    o.stop(now + i * 0.06 + 0.14);
  });
}

/* ───────────────── Background music (gentle kid-friendly loop) ───────────────── */

let musicTimer: number | null = null;
let musicGain: GainNode | null = null;
let musicOn = false;
let musicMuted = false;

// Cheerful C-major melody (Hz, beats)
const MELODY: Array<[number, number]> = [
  [523, 1], [659, 1], [784, 1], [659, 1],
  [587, 1], [698, 1], [880, 1], [698, 1],
  [523, 1], [659, 1], [784, 2],
  [880, 1], [784, 1], [659, 1], [523, 2],
];
const BEAT = 0.42; // seconds per beat — gentle waltz

function scheduleNote(ac: AudioContext, freq: number, when: number, dur: number) {
  if (!musicGain) return;
  const o = ac.createOscillator();
  const g = ac.createGain();
  o.type = "triangle";
  o.frequency.setValueAtTime(freq, when);
  g.gain.setValueAtTime(0.0001, when);
  g.gain.exponentialRampToValueAtTime(0.18, when + 0.04);
  g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
  o.connect(g).connect(musicGain);
  o.start(when);
  o.stop(when + dur + 0.05);
}

function loopOnce() {
  const ac = getCtx();
  if (!ac || !musicOn) return;
  let t = ac.currentTime + 0.05;
  let total = 0;
  for (const [f, beats] of MELODY) {
    const d = beats * BEAT;
    scheduleNote(ac, f, t, d * 0.9);
    t += d;
    total += d;
  }
  musicTimer = window.setTimeout(loopOnce, total * 1000);
}

export function startMusic() {
  if (musicOn) return;
  const ac = getCtx();
  if (!ac) return;
  if (!musicGain) {
    musicGain = ac.createGain();
    musicGain.gain.value = musicMuted ? 0 : 0.12;
    musicGain.connect(ac.destination);
  }
  musicOn = true;
  loopOnce();
}

export function stopMusic() {
  musicOn = false;
  if (musicTimer) {
    clearTimeout(musicTimer);
    musicTimer = null;
  }
}

export function setMusicMuted(m: boolean) {
  musicMuted = m;
  if (musicGain) musicGain.gain.value = m ? 0 : 0.12;
}

export function isMusicMuted() {
  return musicMuted;
}

/** Temporarily duck the music (e.g. while a video plays). */
export function duckMusic(duck: boolean) {
  if (!musicGain) return;
  musicGain.gain.value = duck || musicMuted ? 0 : 0.12;
}
