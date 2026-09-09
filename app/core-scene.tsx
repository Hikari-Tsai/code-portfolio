"use client";

import { useEffect, useRef, useState } from "react";
import { createCoreRenderer } from "./core-renderer";

export default function CoreScene() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const renderer = useRef<ReturnType<typeof createCoreRenderer>>(null);
  const [paused, setPaused] = useState(false);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("visible"); reveal.unobserve(entry.target); }
    }), { threshold: .08 });
    document.querySelectorAll(".manifesto,.experience-grid article,.credentials-layout,.project,.skill-grid article,.contact").forEach(el => {
      el.classList.add("reveal"); reveal.observe(el);
    });
    let statusFrame = 0;
    renderer.current = createCoreRenderer(canvas.current!, {
      ready(value) { setPaused(value); setStatus("ready"); },
      error() { statusFrame = requestAnimationFrame(() => setStatus("error")); },
    });
    return () => { renderer.current?.dispose(); reveal.disconnect(); cancelAnimationFrame(statusFrame); };
  }, []);

  return <div className="core-scene" data-status={status}>
    <canvas ref={canvas} aria-label="即時 3D 神經網路球體與雙軌道環，可移動游標旋轉視角" role="img" />
    <div className="scene-top"><span>FIG. 01 / NEURAL CORE</span><span className="crosshair">+</span></div>
    <div className="scene-message" role="status">{status === "loading" ? "正在啟動 3D…" : status === "error" ? "3D 無法啟動，請重新載入或使用支援 WebGL 的瀏覽器。" : ""}</div>
    <div className="scene-bottom">
      <span>AI × CODE × MUSIC<br /><small>{status === "ready" ? "MOVE TO EXPLORE" : "THREE FIELDS. ONE MIND."}</small></span>
      <button type="button" disabled={status !== "ready"} aria-pressed={paused} onClick={() => {
        renderer.current?.setPaused(!paused); setPaused(!paused);
      }}>{paused ? "播放動態 ▷" : "暫停動態 Ⅱ"}</button>
    </div>
  </div>;
}
