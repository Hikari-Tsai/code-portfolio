"use client";

import { useEffect, useRef, useState } from "react";
import { createCoreRenderer } from "./core-renderer";

export default function CoreScene() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const renderer = useRef<ReturnType<typeof createCoreRenderer>>(null);
  const [paused, setPaused] = useState(false);
  const [status, setStatus] = useState("loading");
  const [track, setTrack] = useState(-1);
  const tracks = ["旋律", "和弦", "低音"];

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

  return <div className="core-scene music-scene" data-status={status}>
    <canvas ref={canvas} aria-label="即時 3D 音符矩陣：旋律、和弦、低音三軌，游標移動可改變視角" role="img" />
    <div className="scene-top"><span>FIG. 01 / SYMBOLIC MUSIC</span><span className="scene-mode">3D PIANO ROLL</span></div>
    <div className="music-tracks" role="group" aria-label="聲部聚焦">
      {tracks.map((label, index) => <button key={label} type="button" aria-label={`聚焦${label}軌`} aria-pressed={track === index} disabled={status !== "ready"}
        onPointerEnter={() => renderer.current?.setFocus(index)}
        onPointerLeave={() => renderer.current?.setFocus(track)}
        onFocus={() => renderer.current?.setFocus(index)}
        onBlur={() => renderer.current?.setFocus(track)}
        onClick={() => { const next = track === index ? -1 : index; setTrack(next); renderer.current?.setFocus(next); }}>
        <i /><span>0{index+1}</span>{label}<small>{["MELODY", "HARMONY", "BASS"][index]}</small>
      </button>)}
    </div>
    <div className="scene-message" role="status">{status === "loading" ? "正在啟動 3D…" : status === "error" ? "3D 無法啟動，請重新載入或使用支援 WebGL 的瀏覽器。" : ""}</div>
    <div className="scene-bottom">
      <span>示意序列 · 無聲<br /><small>SYMBOLIC · EDITABLE · MULTI-TRACK</small></span>
      <button type="button" disabled={status !== "ready"} aria-pressed={paused} onClick={() => {
        renderer.current?.setPaused(!paused); setPaused(!paused);
      }}>{paused ? "播放動態 ▷" : "暫停動態 Ⅱ"}</button>
    </div>
  </div>;
}
