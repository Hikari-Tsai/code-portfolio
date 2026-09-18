"use client";

import { useEffect, useRef, useState } from "react";
import { createAudioLabRenderer } from "./audio-lab-renderer";

export default function AudioLab() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const renderer = useRef<ReturnType<typeof createAudioLabRenderer>>(null);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    renderer.current = createAudioLabRenderer(canvas.current!, (value) => {
      setPaused(value);
      setReady(true);
    });
    return () => renderer.current?.dispose();
  }, []);

  return (
    <figure className="audio-lab" aria-label="Audio Signal Lab 音訊視覺化">
      <div className="audio-lab-header"><span><i /> AUDIO SIGNAL LAB</span><small>DSP / 02</small></div>
      <canvas ref={canvas} tabIndex={0} role="img" aria-label="互動音訊波形與頻譜，使用方向鍵調整頻率與強度" aria-describedby="audio-lab-hint">
        音訊訊號的波形與頻譜示意圖；不播放聲音、不使用麥克風。
      </canvas>
      <p className="audio-lab-hint" id="audio-lab-hint">移動游標或使用方向鍵 · 調整頻率／強度</p>
      <figcaption>
        <span>模擬訊號 · 無聲<small>SYNTHESIZED SIGNAL / NO AUDIO INPUT</small></span>
        <button type="button" disabled={!ready} aria-label={paused ? "播放音訊動畫" : "暫停音訊動畫"} aria-pressed={paused} onClick={() => renderer.current?.togglePaused()}>
          {paused ? "播放 ▷" : "暫停 Ⅱ"}
        </button>
      </figcaption>
    </figure>
  );
}
