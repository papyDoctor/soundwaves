/*
 * The pressure field on the mesh, in WebGL2: one static position buffer, one
 * static triangle index buffer, one value buffer refilled every frame, and a
 * 256x1 colour-map texture. Optional wireframe of the triangles.
 */
import { lut } from "../sim/colormap.js";

const VS = `#version 300 es
in vec2 pos; in float val;
uniform mat3 xf; uniform vec2 range;
out float t;
void main() {
  vec3 p = xf * vec3(pos, 1.0);
  gl_Position = vec4(p.xy, 0.0, 1.0);
  t = (val - range.x) / max(range.y - range.x, 1e-30);
}`;
const FS = `#version 300 es
precision mediump float;
in float t; uniform sampler2D map; uniform float alpha;
out vec4 color;
void main() { color = texture(map, vec2(clamp(t, 0.0, 1.0), 0.5)); color.a = alpha; }`;
const WIRE_FS = `#version 300 es
precision mediump float;
in float t; out vec4 color;
void main() { color = vec4(0.6, 0.65, 0.75, 0.35); }`;

export class FieldRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    const gl = canvas.getContext("webgl2", { antialias: false, alpha: true, premultipliedAlpha: false });
    if (!gl) throw new Error("WebGL2 is not available");
    this.gl = gl;
    this.prog = this.#program(VS, FS);
    this.wireProg = this.#program(VS, WIRE_FS);
    this.vao = gl.createVertexArray();
    this.posBuf = gl.createBuffer(); this.valBuf = gl.createBuffer(); this.idxBuf = gl.createBuffer(); this.wireBuf = gl.createBuffer();
    this.tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.tex);
    for (const p of [gl.TEXTURE_MIN_FILTER, gl.TEXTURE_MAG_FILTER]) gl.texParameteri(gl.TEXTURE_2D, p, gl.LINEAR);
    for (const p of [gl.TEXTURE_WRAP_S, gl.TEXTURE_WRAP_T]) gl.texParameteri(gl.TEXTURE_2D, p, gl.CLAMP_TO_EDGE);
    this.setColormap("rwb");
    this.nodes = 0; this.indices = 0; this.wireIndices = 0;
    this.hasField = false;
    this.wireframe = false;
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  }

  #program(vs, fs) {
    const gl = this.gl;
    const compile = (type, src) => {
      const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
      return s;
    };
    const p = gl.createProgram();
    gl.attachShader(p, compile(gl.VERTEX_SHADER, vs)); gl.attachShader(p, compile(gl.FRAGMENT_SHADER, fs));
    gl.bindAttribLocation(p, 0, "pos"); gl.bindAttribLocation(p, 1, "val");
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p));
    return p;
  }

  setColormap(name) {
    const gl = this.gl;
    gl.bindTexture(gl.TEXTURE_2D, this.tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 256, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, lut(name));
  }

  /** xy: Float32Array(2n), tri: Uint32Array(3t). */
  setMesh(xy, tri) {
    const gl = this.gl;
    this.nodes = xy.length / 2; this.indices = tri.length;
    gl.bindVertexArray(this.vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.posBuf);
    gl.bufferData(gl.ARRAY_BUFFER, xy, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.valBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.nodes), gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(1); gl.vertexAttribPointer(1, 1, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.idxBuf);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, tri, gl.STATIC_DRAW);
    gl.bindVertexArray(null);
    this.hasField = false;
    // Unique edges for the wireframe (only worth it under a few hundred thousand).
    this.wireIndices = 0;
    if (tri.length <= 900000) {
      const seen = new Set(), out = [];
      for (let i = 0; i < tri.length; i += 3) {
        for (let k = 0; k < 3; k++) {
          const a = tri[i + k], b = tri[i + (k + 1) % 3];
          const key = a < b ? a * 4294967296 + b : b * 4294967296 + a;
          if (!seen.has(key)) { seen.add(key); out.push(a, b); }
        }
      }
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.wireBuf);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(out), gl.STATIC_DRAW);
      this.wireIndices = out.length;
    }
  }

  clearMesh() { this.nodes = 0; this.indices = 0; this.wireIndices = 0; this.hasField = false; }

  setField(values) {
    if (values.length !== this.nodes) return;
    const gl = this.gl;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.valBuf);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, values);
    this.hasField = true;
  }

  /**
   * Draw with the camera's clip transform and the value range [lo, hi].
   * `mirrors`: affine 2x3 scene transforms whose images are drawn as ghosts.
   */
  draw(camera, range, { meshOnly = false, mirrors = [] } = {}) {
    const gl = this.gl, canvas = this.canvas;
    const dpr = window.devicePixelRatio || 1;
    const w = Math.round(camera.width * dpr), h = Math.round(camera.height * dpr);
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
    gl.viewport(0, 0, w, h);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    if (!this.indices) return;
    gl.bindVertexArray(this.vao);
    // Scene -> clip as a column-major mat3, optionally after a mirror.
    const [a, b, c, d] = camera.clip();
    const xfOf = (m) => (m
      ? new Float32Array([a * m[0], b * m[1], 0, a * m[2], b * m[3], 0, a * m[4] + c, b * m[5] + d, 1])
      : new Float32Array([a, 0, 0, 0, b, 0, c, d, 1]));
    // The mirror images are as real as the half that is meshed: same opacity.
    const passes = [[null, 1.0], ...mirrors.map((m) => [m, 1.0])];
    if (this.hasField && !meshOnly) {
      gl.useProgram(this.prog);
      gl.uniform2f(gl.getUniformLocation(this.prog, "range"), range[0], range[1]);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, this.tex);
      gl.uniform1i(gl.getUniformLocation(this.prog, "map"), 0);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.idxBuf);
      for (const [m, alpha] of passes) {
        gl.uniformMatrix3fv(gl.getUniformLocation(this.prog, "xf"), false, xfOf(m));
        gl.uniform1f(gl.getUniformLocation(this.prog, "alpha"), alpha);
        gl.drawElements(gl.TRIANGLES, this.indices, gl.UNSIGNED_INT, 0);
      }
    }
    if ((this.wireframe || meshOnly || !this.hasField) && this.wireIndices) {
      gl.useProgram(this.wireProg);
      gl.uniformMatrix3fv(gl.getUniformLocation(this.wireProg, "xf"), false, xfOf(null));
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.wireBuf);
      gl.drawElements(gl.LINES, this.wireIndices, gl.UNSIGNED_INT, 0);
    }
    gl.bindVertexArray(null);
  }
}
