'use client';

import { useEffect, useRef } from 'react';

const VERT = `
attribute vec2 a_position;
attribute vec2 a_uv;
varying vec2 v_uv;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
  v_uv = a_uv;
}
`;

const FRAG = `
precision highp float;
varying vec2 v_uv;
uniform float u_time;
uniform float u_mouse_y;
uniform vec2 u_resolution;

// Cosine based palette for the spectrum (Yellow, Green, Cyan, Blue, Magenta)
vec3 palette( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d ) {
    return a + b*cos( 6.28318*(c*t+d) );
}

void main() {
  vec2 uv = v_uv;
  
  // Deep black background
  vec3 bg = vec3(0.03, 0.03, 0.03);
  
  // Distance from current pixel to the horizontal band
  // u_mouse_y is in [0, 1] range, where 1 is top and 0 is bottom in GL
  float dist = abs(uv.y - u_mouse_y);
  
  // The band is a bit wavy/liquid
  float wave = sin(uv.x * 5.0 + u_time) * 0.02;
  dist = abs(uv.y - (u_mouse_y + wave));

  // Soft glowing horizontal band
  // thickness of the band
  float bandWidth = 0.12;
  float band = smoothstep(bandWidth, 0.0, dist);
  
  // Make the edge of the band sharper like a glass refraction edge
  float edge = smoothstep(bandWidth, bandWidth - 0.02, dist) - smoothstep(bandWidth - 0.05, 0.0, dist);

  // Spectral color mapping horizontally across the screen
  vec3 spectrum = palette(uv.x + u_time * 0.1, 
                          vec3(0.5, 0.5, 0.5), 
                          vec3(0.5, 0.5, 0.5), 
                          vec3(1.0, 1.0, 1.0), 
                          vec3(0.0, 0.33, 0.67));
                          
  // Enhance saturation and brightness of the spectrum
  spectrum = mix(spectrum, vec3(1.0), 0.2); // brighten slightly
  
  // Combine: background + glass edge + spectral fill
  vec3 col = bg;
  col = mix(col, spectrum, band * 0.85);
  
  // Add a bright white/cyan glass edge highlight
  col += vec3(0.8, 0.9, 1.0) * edge * 0.5;

  gl_FragColor = vec4(col, 1.0);
}
`;

function compileShader(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(s));
  }
  return s;
}

function createProgram(gl: WebGLRenderingContext) {
  const prog = gl.createProgram()!;
  gl.attachShader(prog, compileShader(gl, gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, compileShader(gl, gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  return prog;
}

export function HolographicWall() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetY = useRef(0.5); // 0.5 is middle
  const currentY = useRef(0.5);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { antialias: false, alpha: false });
    if (!gl) return;

    const prog = createProgram(gl);
    gl.useProgram(prog);

    const verts = new Float32Array([
      -1, -1,  0, 0,
       1, -1,  1, 0,
      -1,  1,  0, 1,
       1,  1,  1, 1,
    ]);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(prog, 'a_position');
    const aUV = gl.getAttribLocation(prog, 'a_uv');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 16, 0);
    gl.enableVertexAttribArray(aUV);
    gl.vertexAttribPointer(aUV, 2, gl.FLOAT, false, 16, 8);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uMouseY = gl.getUniformLocation(prog, 'u_mouse_y');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const start = performance.now();

    const render = (now: number) => {
      const t = (now - start) / 1000;

      // Spring physics for smooth band movement
      currentY.current += (targetY.current - currentY.current) * 0.08;

      gl.uniform1f(uTime, t);
      // WebGL Y is inverted (0 is bottom, 1 is top), so we do 1 - currentY
      gl.uniform1f(uMouseY, 1.0 - currentY.current);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);

    const onMouseMove = (e: MouseEvent) => {
      // Calculate mouse Y relative to the viewport height (0 to 1)
      targetY.current = e.clientY / window.innerHeight;
    };
    
    // Auto-drift when idle (like a scanner moving up and down)
    let idleTimer: NodeJS.Timeout;
    let isIdle = true;
    let driftT = 0;
    
    const drift = setInterval(() => {
      if (!isIdle) return;
      driftT += 0.01;
      targetY.current = 0.5 + Math.sin(driftT) * 0.4;
    }, 16);

    const handleInteraction = (e: MouseEvent) => {
      isIdle = false;
      onMouseMove(e);
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => { isIdle = true; }, 3000);
    };

    window.addEventListener('mousemove', handleInteraction);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', handleInteraction);
      clearInterval(drift);
      clearTimeout(idleTimer);
      ro.disconnect();
      gl.deleteProgram(prog);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}
