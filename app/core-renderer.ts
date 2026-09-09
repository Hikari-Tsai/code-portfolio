type Callbacks = { ready: (paused: boolean) => void; error: () => void };
type Point = [number, number, number];
type Color = [number, number, number, number];

const vertex = `
attribute vec3 position;
attribute vec4 color;
uniform vec2 resolution;
uniform vec2 pointer;
varying vec4 tint;
void main(){
 float yaw=.40+pointer.x*.16, pitch=-.16+pointer.y*.09;
 vec3 p=position;
 p.xz=mat2(cos(yaw),-sin(yaw),sin(yaw),cos(yaw))*p.xz;
 p.yz=mat2(cos(pitch),-sin(pitch),sin(pitch),cos(pitch))*p.yz;
 float depth=7.-p.z;
 gl_Position=vec4(p.x*2.65/(resolution.x/resolution.y),p.y*2.65,1.02*depth-.202,depth);
 tint=color;
}`;
const fragment = `precision mediump float; varying vec4 tint; void main(){gl_FragColor=tint;}`;

// A composed, silent demo phrase — not live model output or audio analysis.
const tracks = [
  { y: 1.24, z: -.45, color: [1, .48, .23], notes: [[0,2,1],[1.5,4,.7],[2.5,5,.7],[3.5,7,1.4],[5.5,5,.7],[6.5,4,1],[8,2,1.5],[10,4,.7],[11,7,1],[12.5,9,1],[14,7,1.5]] },
  { y: 0, z: 0, color: [1, .86, .66], notes: [[0,1,3.5],[0,4,3.5],[0,7,3.5],[4,0,3.5],[4,4,3.5],[4,7,3.5],[8,2,3.5],[8,5,3.5],[8,9,3.5],[12,0,3.5],[12,4,3.5],[12,7,3.5]] },
  { y: -1.24, z: .45, color: [.85, .29, .13], notes: [[0,2,1.5],[2,2,1],[4,0,1.5],[6,0,1],[8,5,1.5],[10,5,1],[12,0,1.5],[14,2,1.5]] },
];

/** Framework-free WebGL geometry renderer, shared with the standalone preview. */
export function createCoreRenderer(canvas: HTMLCanvasElement, callbacks: Callbacks) {
  const gl = canvas.getContext("webgl", { alpha: true, antialias: true, powerPreference: "low-power" });
  if (!gl) { callbacks.error(); return null; }
  const shaders: WebGLShader[] = [];
  const program = gl.createProgram();
  if (!program) { callbacks.error(); return null; }
  try {
    for (const [type, source] of [[gl.VERTEX_SHADER, vertex], [gl.FRAGMENT_SHADER, fragment]] as const) {
      const shader = gl.createShader(type);
      if (!shader) throw new Error("Shader allocation failed");
      shaders.push(shader); gl.shaderSource(shader, source); gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) || "Shader compilation failed");
      gl.attachShader(program, shader);
    }
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) || "Shader linking failed");
  } catch (error) {
    console.error("Music matrix:", error);
    shaders.forEach(s => gl.deleteShader(s)); gl.deleteProgram(program); callbacks.error(); return null;
  }
  const buffer = gl.createBuffer();
  if (!buffer) { shaders.forEach(s => gl.deleteShader(s)); gl.deleteProgram(program); callbacks.error(); return null; }
  gl.useProgram(program); gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  const position = gl.getAttribLocation(program, "position"), color = gl.getAttribLocation(program, "color");
  gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 3, gl.FLOAT, false, 28, 0);
  gl.enableVertexAttribArray(color); gl.vertexAttribPointer(color, 4, gl.FLOAT, false, 28, 12);
  const resolution = gl.getUniformLocation(program, "resolution"), view = gl.getUniformLocation(program, "pointer");
  gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.enable(gl.DEPTH_TEST); gl.clearColor(0, 0, 0, 0);

  const vertices: number[] = [];
  const point = (p: Point, c: Color) => vertices.push(...p, ...c);
  const quad = (a: Point, b: Point, c: Point, d: Point, tint: Color) => {
    for (const p of [a,b,c,a,c,d]) point(p, tint);
  };
  const face = (x: number, y: number, z: number, w: number, h: number, c: Color) =>
    quad([x,y,z],[x+w,y,z],[x+w,y+h,z],[x,y+h,z],c);
  const box = (x: number, y: number, z: number, w: number, h: number, c: Color) => {
    face(x,y,z+.09,w,h,c);
    quad([x,y+h,z],[x+w,y+h,z],[x+w,y+h,z+.09],[x,y+h,z+.09],[c[0]*.68,c[1]*.68,c[2]*.68,c[3]]);
    quad([x+w,y,z],[x+w,y+h,z],[x+w,y+h,z+.09],[x+w,y,z+.09],[c[0]*.4,c[1]*.4,c[2]*.4,c[3]]);
  };
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  let paused = motion.matches, visible = true, frame = 0, elapsed = 3.2, last = 0, frames = 0, dirty = true, started = false, focus = -1;
  const target = [0,0], pointer = [0,0];
  const resize = () => {
    const rect = canvas.getBoundingClientRect(), ratio = Math.min(devicePixelRatio, 1.5);
    canvas.width = Math.max(1, Math.round(rect.width*ratio)); canvas.height = Math.max(1, Math.round(rect.height*ratio));
    gl.viewport(0,0,canvas.width,canvas.height); dirty = true;
  };
  const sizes = new ResizeObserver(resize); sizes.observe(canvas); resize();
  const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; dirty = true; }); visibility.observe(canvas);
  const move = (event: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    target[0] = ((event.clientX-rect.left)/rect.width-.5)*2;
    target[1] = ((event.clientY-rect.top)/rect.height-.5)*2;
    dirty = true;
  };
  const leave = () => { target[0]=0; target[1]=0; dirty=true; };
  canvas.addEventListener("pointermove",move); canvas.addEventListener("pointerleave",leave);
  const preference = () => { paused=motion.matches; dirty=true; callbacks.ready(paused); };
  motion.addEventListener("change",preference);
  const contextLost = (event: Event) => { event.preventDefault(); cancelAnimationFrame(frame); canvas.classList.remove("ready"); callbacks.error(); };
  canvas.addEventListener("webglcontextlost",contextLost);

  const draw = (now: number) => {
    const delta = Math.min((now-last)/1000,.05); last=now;
    if (visible && !document.hidden && (!paused || dirty)) {
      if (!paused) elapsed += delta;
      if (!paused && !motion.matches) {
        pointer[0]+=(target[0]-pointer[0])*.08; pointer[1]+=(target[1]-pointer[1])*.08;
      }
      const beat = (elapsed*1.6)%16, playhead = -2.4+beat*.3;
      vertices.length = 0;
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      tracks.forEach((track, index) => {
        const { y, z } = track, strength = focus < 0 || focus === index ? 1 : .2;
        const base: Color = [track.color[0],track.color[1],track.color[2],strength];
        face(-2.48,y-.49,z,4.96,.98,[.09,.10,.12,.42*strength]);
        for (let step=0;step<=16;step++) face(-2.4+step*.3,y-.43,z+.003,.006,.86,[.6,.58,.54,(step%4===0?.3:.09)*strength]);
        for (let pitch=0;pitch<12;pitch++) face(-2.4,y-.42+pitch*.075,z+.005,4.8,.004,[.5,.51,.54,.13*strength]);
        face(-2.49,y-.44,z+.015,.025,.88,[...track.color, .8*strength] as Color);
        for (const [start, pitch, duration] of track.notes) {
          const active = beat >= start && beat < start+duration;
          const distance = start-beat;
          const appearance = distance > 4 ? .12 : distance > 0 ? .25+.6*(1-distance/4) : .48;
          const alpha = (active ? 1 : appearance)*strength;
          const x = -2.4+start*.3, noteY = y-.38+pitch*.075, width = duration*.3-.035;
          if (active) face(x-.035,noteY-.035,z+.025,width+.07,.13,[base[0],base[1],base[2],.18*strength]);
          box(x,noteY,z+.035,width,.055,[active?1:base[0],active?Math.min(1,base[1]+.3):base[1],active?Math.min(1,base[2]+.3):base[2],alpha]);
        }
        face(playhead-.008,y-.48,z+.15,.016,.96,[1,.91,.76,.85*strength]);
        face(playhead-.045,y-.48,z+.14,.09,.96,[1,.65,.36,.09*strength]);
      });
      gl.uniform2f(resolution,canvas.width,canvas.height); gl.uniform2f(view,pointer[0],pointer[1]);
      gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertices),gl.DYNAMIC_DRAW);
      gl.drawArrays(gl.TRIANGLES,0,vertices.length/7); dirty=false;
      canvas.dataset.frame=String(++frames); canvas.dataset.beat=beat.toFixed(2);
      if (!started) { started=true; canvas.classList.add("ready"); callbacks.ready(paused); }
    }
    frame=requestAnimationFrame(draw);
  };
  frame=requestAnimationFrame(draw);
  return {
    setPaused(value: boolean) { paused=value; dirty=true; },
    setFocus(index: number) { focus=index; dirty=true; canvas.dataset.track=index<0?"all":String(index); },
    dispose() {
      cancelAnimationFrame(frame); sizes.disconnect(); visibility.disconnect();
      motion.removeEventListener("change",preference); canvas.removeEventListener("pointermove",move); canvas.removeEventListener("pointerleave",leave); canvas.removeEventListener("webglcontextlost",contextLost);
      gl.deleteBuffer(buffer); shaders.forEach(s=>gl.deleteShader(s)); gl.deleteProgram(program);
    },
  };
}
