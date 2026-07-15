// Lightweight WebAudio blips — no assets required.
let actx = null

export function beep(type, muted) {
  if (muted) return
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)()
    const seq =
      type === 'good'
        ? [
            [660, 0],
            [880, 0.09],
          ]
        : type === 'bad'
          ? [
              [200, 0],
              [150, 0.12],
            ]
          : [[520, 0]]
    seq.forEach(([f, t]) => {
      const o = actx.createOscillator()
      const g = actx.createGain()
      o.type = type === 'bad' ? 'sawtooth' : 'sine'
      o.frequency.value = f
      o.connect(g)
      g.connect(actx.destination)
      const start = actx.currentTime + t
      g.gain.setValueAtTime(0.0001, start)
      g.gain.exponentialRampToValueAtTime(0.18, start + 0.02)
      g.gain.exponentialRampToValueAtTime(0.0001, start + 0.18)
      o.start(start)
      o.stop(start + 0.2)
    })
  } catch {
    /* audio unavailable — ignore */
  }
}
