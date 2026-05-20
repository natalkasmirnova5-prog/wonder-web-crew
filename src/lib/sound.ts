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

/* ───────────────── Per-video kid tunes ─────────────────
 * A small library of gentle, cheerful melodies. Each video gets a stable
 * tune chosen by id hash, so different videos play different music.
 * Started on video play, stopped on pause/end. Honours per-tune muting.
 */

type Tune = { notes: Array<[number, number]>; beat: number; type: OscillatorType; vol: number };

const TUNES: Tune[] = [
  // 0 — Twinkle-style lullaby in C
  { type: "triangle", beat: 0.45, vol: 0.14, notes: [
    [523,1],[523,1],[784,1],[784,1],[880,1],[880,1],[784,2],
    [698,1],[698,1],[659,1],[659,1],[587,1],[587,1],[523,2],
  ]},
  // 1 — Bouncy waltz in G
  { type: "triangle", beat: 0.38, vol: 0.13, notes: [
    [392,1],[494,1],[587,1],[494,1],[440,1],[523,1],[659,1],[523,1],
    [392,1],[494,1],[587,2],[659,1],[587,1],[494,1],[392,2],
  ]},
  // 2 — Skipping tune in F
  { type: "sine", beat: 0.34, vol: 0.15, notes: [
    [349,1],[440,1],[523,1],[698,1],[523,1],[440,1],[349,2],
    [392,1],[494,1],[587,1],[698,1],[587,1],[494,1],[392,2],
  ]},
  // 3 — Gentle music-box in D
  { type: "triangle", beat: 0.5, vol: 0.12, notes: [
    [587,1],[740,1],[880,1],[740,1],[659,1],[587,2],
    [494,1],[587,1],[740,1],[587,1],[494,1],[440,2],
    [587,1],[740,1],[880,2],[988,1],[880,1],[740,2],
  ]},
  // 4 — Playful march in A
  { type: "square", beat: 0.3, vol: 0.09, notes: [
    [440,1],[440,1],[554,1],[659,1],[554,1],[440,2],
    [494,1],[494,1],[587,1],[740,1],[587,1],[494,2],
    [440,1],[554,1],[659,1],[554,1],[440,2],[330,2],
  ]},
  // 5 — Dreamy lullaby in E
  { type: "sine", beat: 0.55, vol: 0.13, notes: [
    [330,1],[415,1],[494,1],[659,2],[494,1],[415,1],[330,2],
    [370,1],[440,1],[554,1],[659,2],[554,1],[440,1],[370,2],
  ]},
];

type ActiveTune = { gain: GainNode; timer: number | null; on: boolean; muted: boolean; volume: number; idx: number; nodes: OscillatorNode[] };
const activeTunes = new Map<string, ActiveTune>();

function hashId(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return h;
}

function scheduleTuneNote(ac: AudioContext, gain: GainNode, type: OscillatorType, freq: number, when: number, dur: number, vol: number) {
  const o = ac.createOscillator();
  const g = ac.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, when);
  g.gain.setValueAtTime(0.0001, when);
  g.gain.exponentialRampToValueAtTime(vol, when + 0.04);
  g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
  o.connect(g).connect(gain);
  o.start(when);
  o.stop(when + dur + 0.05);
  return o;
}

function loopTune(id: string) {
  const ac = getCtx();
  const state = activeTunes.get(id);
  if (!ac || !state || !state.on) return;
  const tune = TUNES[state.idx];
  let t = ac.currentTime + 0.05;
  let total = 0;
  for (const [f, beats] of tune.notes) {
    const d = beats * tune.beat;
    const node = scheduleTuneNote(ac, state.gain, tune.type, f, t, d * 0.9, tune.vol);
    node.onended = () => {
      state.nodes = state.nodes.filter((n) => n !== node);
    };
    state.nodes.push(node);
    t += d;
    total += d;
  }
  state.timer = window.setTimeout(() => loopTune(id), total * 1000);
}

export function startVideoTune(id: string, muted = false, volume = 1) {
  const ac = getCtx();
  if (!ac) return;
  let state = activeTunes.get(id);
  if (state?.on) return;
  if (!state) {
    const gain = ac.createGain();
    gain.gain.value = muted ? 0 : volume;
    gain.connect(ac.destination);
    state = { gain, timer: null, on: false, muted, volume, idx: hashId(id) % TUNES.length, nodes: [] };
    activeTunes.set(id, state);
  }
  state.muted = muted;
  state.volume = volume;
  state.gain.gain.value = muted ? 0 : volume;
  state.on = true;
  loopTune(id);
}

export function stopVideoTune(id: string) {
  const state = activeTunes.get(id);
  if (!state) return;
  state.on = false;
  if (state.timer) {
    clearTimeout(state.timer);
    state.timer = null;
  }
  state.gain.gain.value = 0;
  state.nodes.forEach((node) => {
    try {
      node.stop();
    } catch {
      // Already stopped.
    }
  });
  state.nodes = [];
}

export function setVideoTuneMuted(id: string, m: boolean) {
  const state = activeTunes.get(id);
  if (!state) return;
  state.muted = m;
  state.gain.gain.value = m ? 0 : state.volume;
}

export function setVideoTuneVolume(id: string, v: number) {
  const state = activeTunes.get(id);
  if (!state) return;
  state.volume = v;
  if (!state.muted) state.gain.gain.value = v;
}
