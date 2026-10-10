/*
 * The camera: a continuous zoom and a free offset, in CSS pixels. Scene y
 * points up, screen y points down. The point of the scene under the cursor
 * never moves during a zoom. Pure.
 */
export class Camera {
  constructor() {
    this.cx = 0; this.cy = 0;   // scene point at the centre of the canvas
    this.scale = 100;           // pixels per scene unit
    this.width = 1; this.height = 1;
  }
  resize(width, height) { this.width = Math.max(1, width); this.height = Math.max(1, height); }
  toScreen(x, y) { return [(x - this.cx) * this.scale + this.width / 2, this.height / 2 - (y - this.cy) * this.scale]; }
  toScene(sx, sy) { return [(sx - this.width / 2) / this.scale + this.cx, (this.height / 2 - sy) / this.scale + this.cy]; }
  zoomAt(sx, sy, factor) {
    const [x, y] = this.toScene(sx, sy);
    this.scale = Math.min(Math.max(this.scale * factor, 1e-3), 1e7);
    const [x2, y2] = this.toScene(sx, sy);
    this.cx += x - x2; this.cy += y - y2;
  }
  pan(dx, dy) { this.cx -= dx / this.scale; this.cy += dy / this.scale; }
  /** Frame a bounding box [xmin, ymin, xmax, ymax] with a margin (fraction). */
  fit(bbox, margin = 0.08) {
    if (!bbox) return;
    const w = Math.max(bbox[2] - bbox[0], 1e-9), h = Math.max(bbox[3] - bbox[1], 1e-9);
    this.scale = Math.min(this.width / w, this.height / h) * (1 - 2 * margin);
    this.cx = (bbox[0] + bbox[2]) / 2; this.cy = (bbox[1] + bbox[3]) / 2;
  }
  /** Clip-space transform for the shader: x' = x*a + c, y' = y*b + d. */
  clip() {
    const a = 2 * this.scale / this.width, b = 2 * this.scale / this.height;
    return [a, b, -a * this.cx, -b * this.cy];
  }
  /** A pleasant grid step for the current zoom: 1, 2, 5 x 10^n, about 60 px apart. */
  gridStep() {
    const target = 60 / this.scale;
    const p = Math.pow(10, Math.floor(Math.log10(target)));
    for (const m of [1, 2, 5, 10]) if (m * p >= target) return m * p;
    return 10 * p;
  }
}
