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
