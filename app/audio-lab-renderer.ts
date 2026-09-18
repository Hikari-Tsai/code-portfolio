/** A silent, synthesized signal illustration, not microphone input or an FFT meter. */
export function createAudioLabRenderer(canvas: HTMLCanvasElement, onPaused: (paused: boolean) => void) {
  const context = canvas.getContext("2d");
  if (!context) return null;
  const ctx = context;
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let paused = motion.matches;
  let visible = false;
  let disposed = false;
  let frame = 0;
  let previous = 0;
  let time = 0;
  let width = 0;
  let height = 0;
  let tone = .45;
  let level = .6;

  function draw() {
    if (!width || !height) return;
    const left = 22, right = width - 22, span = right - left;
    const center = height * .28, amplitude = height * .17;
    const base = height - 27, spectrumTop = height * .62;
    const pulse = .72 + .22 * Math.sin(time * 2.4);
    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#ffffff09";
    ctx.beginPath();
    for (let column = 0; column <= 12; column++) {
      const x = left + span * column / 12;
      ctx.moveTo(x, 30); ctx.lineTo(x, base);
    }
    for (let row = 0; row <= 8; row++) {
      const y = 30 + (base - 30) * row / 8;
      ctx.moveTo(left, y); ctx.lineTo(right, y);
    }
    ctx.stroke();
    ctx.strokeStyle = "#ff895b28";
    ctx.beginPath(); ctx.moveTo(left, center); ctx.lineTo(right, center); ctx.stroke();
    ctx.font = "8px ui-monospace, monospace";
    ctx.fillStyle = "#8c817b";
    ctx.fillText("01 / WAVEFORM", left, 17);
    ctx.fillText("02 / SPECTRUM · SIMULATED", left, spectrumTop - 14);
    ctx.textAlign = "right";
    ctx.fillText("TIME →", right, 17);
    ctx.textAlign = "left";

    const cycles = 3 + tone * 6;
    const trace = (offset: number, alpha: number, lineWidth: number) => {
      ctx.beginPath();
      for (let i = 0; i <= 240; i++) {
        const position = i / 240;
        const phase = position * Math.PI * 2 * cycles - time * 2.8 + offset;
        const signal = Math.sin(phase) + .28 * Math.sin(phase * 2 + time * .3) + .12 * Math.sin(phase * 3);
        const envelope = .55 + .45 * Math.sin(position * Math.PI);
        const y = center + signal * amplitude * level * pulse * envelope;
        if (i === 0) ctx.moveTo(left, y); else ctx.lineTo(left + position * span, y);
      }
      ctx.strokeStyle = `rgba(255,137,91,${alpha})`;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    };
    trace(.18, .1, 1);
    trace(0, .09, 8);
    trace(0, .9, 1.5);

    const gradient = ctx.createLinearGradient(0, spectrumTop, 0, base);
    gradient.addColorStop(0, "#ffbb87");
    gradient.addColorStop(.4, "#ef8356");
    gradient.addColorStop(1, "#ff895b18");
    const count = 52, step = span / count;
    for (let bar = 0; bar < count; bar++) {
      const frequency = (bar + .5) / count;
      let energy = .035;
      for (let harmonic = 1; harmonic <= 5; harmonic++) {
        const peak = (.07 + tone * .065) * harmonic;
        const distance = (frequency - peak) / (.025 + harmonic * .004);
        energy += Math.exp(-distance * distance) / Math.pow(harmonic, .75);
      }
      const sway = .85 + .15 * Math.sin(time * 2.4 + frequency * 6);
      const barHeight = Math.min(1, energy * level * pulse * sway) * (base - spectrumTop);
      const x = left + bar * step;
      ctx.fillStyle = gradient;
      ctx.fillRect(x, base - barHeight, Math.max(1, step - 3), barHeight);
      ctx.fillStyle = "#ffb389a0";
      ctx.fillRect(x, base - barHeight, Math.max(1, step - 3), 1);
    }
    ctx.fillStyle = "#716b68";
    ctx.fillText("LOW", left, height - 9);
    ctx.textAlign = "center"; ctx.fillText("MID", width / 2, height - 9);
    ctx.textAlign = "right"; ctx.fillText("HIGH", right, height - 9);
    ctx.textAlign = "left";
  }

  function canRun() { return !disposed && !paused && visible && !document.hidden; }
  function tick(now: number) {
    frame = 0;
    if (!canRun()) return;
    if (!previous || now - previous >= 1000 / 30) {
      time += previous ? Math.min((now - previous) / 1000, .08) : 0;
      previous = now;
      draw();
    }
    frame = requestAnimationFrame(tick);
  }
  function sync() {
    cancelAnimationFrame(frame);
    frame = 0;
    previous = 0;
    canvas.dataset.running = String(canRun());
    if (canRun()) frame = requestAnimationFrame(tick);
  }
  function resize() {
    const rect = canvas.getBoundingClientRect();
    width = rect.width; height = rect.height;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    draw();
  }
  function setPaused(value: boolean) {
    paused = value;
    onPaused(paused);
    sync();
  }
  function preferenceChanged() { setPaused(motion.matches); }
  function pointerMoved(event: PointerEvent) {
    const rect = canvas.getBoundingClientRect();
    tone = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    level = .25 + .65 * (1 - Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height)));
    if (!canRun()) draw();
  }
  function keyChanged(event: KeyboardEvent) {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
    event.preventDefault();
    if (event.key === "ArrowLeft") tone = Math.max(0, tone - .08);
    if (event.key === "ArrowRight") tone = Math.min(1, tone + .08);
    if (event.key === "ArrowUp") level = Math.min(.9, level + .08);
    if (event.key === "ArrowDown") level = Math.max(.25, level - .08);
    if (!canRun()) draw();
  }

  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
  const sizeObserver = new ResizeObserver(resize);
  observer.observe(canvas);
  sizeObserver.observe(canvas);
  document.addEventListener("visibilitychange", sync);
  motion.addEventListener("change", preferenceChanged);
  canvas.addEventListener("pointermove", pointerMoved, { passive: true });
  canvas.addEventListener("keydown", keyChanged);
  resize();
  const initialState = requestAnimationFrame(() => onPaused(paused));

  return {
    togglePaused() { setPaused(!paused); },
    dispose() {
      disposed = true;
      cancelAnimationFrame(initialState);
      cancelAnimationFrame(frame);
      observer.disconnect();
      sizeObserver.disconnect();
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", preferenceChanged);
      canvas.removeEventListener("pointermove", pointerMoved);
      canvas.removeEventListener("keydown", keyChanged);
    },
  };
}
