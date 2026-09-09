type Callbacks = { ready: (paused: boolean) => void; error: () => void };

const vertex = `attribute vec2 position; void main(){gl_Position=vec4(position,0.,1.);}`;
const fragment = `
precision highp float;
uniform vec2 resolution;
uniform vec2 pointer;
uniform float time;
const float PI=3.14159265;
mat2 rotation(float a){return mat2(cos(a),-sin(a),sin(a),cos(a));}
vec3 model(vec3 p){
 p.xz=rotation(time*.24+pointer.x)*p.xz;
 p.yz=rotation(.35+pointer.y)*p.yz;
 return p;
}
float ring(vec3 p,float radius){return length(vec2(length(p.xz)-radius,p.y))-.014;}
float scene(vec3 p){
 p=model(p);
 float d=length(p)-.78;
 vec3 q=p; q.yz=rotation(.65)*q.yz; d=min(d,ring(q,1.18));
 q=p; q.xy=rotation(1.2)*q.xy; q.yz=rotation(-.5)*q.yz; d=min(d,ring(q,1.34));
 return d;
}
vec3 normal(vec3 p){vec2 e=vec2(.001,0.);return normalize(vec3(scene(p+e.xyy)-scene(p-e.xyy),scene(p+e.yxy)-scene(p-e.yxy),scene(p+e.yyx)-scene(p-e.yyx)));}
void main(){
 vec2 uv=(gl_FragCoord.xy-.5*resolution)/min(resolution.x,resolution.y);
 vec3 ro=vec3(0.,0.,4.9),rd=normalize(vec3(uv,-1.5));
 vec3 color=vec3(.027,.031,.039);
 float halo=exp(-8.*dot(uv,uv));color+=vec3(.07,.025,.01)*halo;
 float t=0.;bool hit=false;
 for(int i=0;i<100;i++){float d=scene(ro+rd*t);if(d<.0015){hit=true;break;}if(t>7.)break;t+=d*.85;}
 if(hit){
  vec3 p=ro+rd*t,n=normal(p),q=model(p);
  vec3 light=normalize(vec3(-2.,3.,4.));
  float diffuse=max(dot(n,light),0.);
  float rim=pow(1.-max(dot(n,-rd),0.),2.);
  float spec=pow(max(dot(reflect(-light,n),-rd),0.),40.);
  if(length(q)<.85){
   vec2 grid=vec2(atan(q.z,q.x)/(2.*PI)+.5,acos(clamp(q.y/.78,-1.,1.))/PI)*vec2(28.,18.);
   vec2 cell=abs(fract(grid)-.5);
   float lines=1.-smoothstep(.018,.065,min(cell.x,cell.y));
   float nodes=1.-smoothstep(.04,.12,length(cell));
   float pulse=.65+.35*sin(grid.x*.55+grid.y*.7-time*1.8);
   color=vec3(.026,.038,.048)*(.4+diffuse)+vec3(1.,.36,.12)*(lines*.45+nodes*pulse*.9+rim*.65)+vec3(.5,.7,.8)*spec*.3;
  }else{
   color=vec3(.65,.21,.065)*(.6+diffuse)+vec3(1.,.7,.43)*(spec+rim*.6);
  }
 }
 gl_FragColor=vec4(color,1.);
}`;

/** Shared by React and the standalone preview; no framework or network dependency. */
export function createCoreRenderer(canvas: HTMLCanvasElement, callbacks: Callbacks) {
  const gl = canvas.getContext("webgl", { alpha: false, antialias: false, powerPreference: "low-power" });
  if (!gl) { callbacks.error(); return null; }
  const shaders: WebGLShader[] = [];
  const program = gl.createProgram()!;
  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type)!;
    shaders.push(shader);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) || "Shader compilation failed");
    gl.attachShader(program, shader);
  };
  try {
    compile(gl.VERTEX_SHADER, vertex); compile(gl.FRAGMENT_SHADER, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) || "Shader linking failed");
  } catch (error) {
    console.error("3D core:", error); shaders.forEach(s => gl.deleteShader(s)); gl.deleteProgram(program); callbacks.error(); return null;
  }
  gl.useProgram(program);
  const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program,"position");
  gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
  const uniforms = ["resolution","time","pointer"].map(key => gl.getUniformLocation(program,key));
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  let paused = motion.matches, visible = true, frame = 0, elapsed = .4, last = 0, frames = 0, dirty = true, started = false;
  const target = [0,0], pointer = [0,0];
  const resize = () => {
    const rect = canvas.getBoundingClientRect(), ratio = Math.min(devicePixelRatio,1.5);
    canvas.width = Math.max(1,Math.round(rect.width*ratio)); canvas.height = Math.max(1,Math.round(rect.height*ratio));
    gl.viewport(0,0,canvas.width,canvas.height); dirty = true;
  };
  const sizes = new ResizeObserver(resize); sizes.observe(canvas); resize();
  const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; dirty = true; }); visibility.observe(canvas);
  const move = (event: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    target[0] = ((event.clientX-rect.left)/rect.width-.5)*2;
    target[1] = ((event.clientY-rect.top)/rect.height-.5)*1.3;
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
      if (!paused) { elapsed+=delta; pointer[0]+=(target[0]-pointer[0])*.08; pointer[1]+=(target[1]-pointer[1])*.08; }
      gl.uniform2f(uniforms[0],canvas.width,canvas.height); gl.uniform1f(uniforms[1],elapsed); gl.uniform2f(uniforms[2],pointer[0],pointer[1]);
      gl.drawArrays(gl.TRIANGLES,0,6); dirty=false;
      canvas.dataset.frame=String(++frames);
      if (!started) { started=true; canvas.classList.add("ready"); callbacks.ready(paused); }
    }
    frame=requestAnimationFrame(draw);
  };
  frame=requestAnimationFrame(draw);
  return {
    setPaused(value: boolean) { paused=value; dirty=true; },
    dispose() {
      cancelAnimationFrame(frame); sizes.disconnect(); visibility.disconnect();
      motion.removeEventListener("change",preference); canvas.removeEventListener("pointermove",move); canvas.removeEventListener("pointerleave",leave); canvas.removeEventListener("webglcontextlost",contextLost);
      gl.deleteBuffer(buffer); shaders.forEach(s=>gl.deleteShader(s)); gl.deleteProgram(program);
    },
  };
}
