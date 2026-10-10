/*
 * Colour maps as 256-entry RGBA lookup tables, for the WebGL texture and the
 * legend. Pure.
 */
const ANCHORS = {
  // Diverging: blue (negative) - near-black (zero) - red (positive). Zero is
  // dark so the quiet field disappears into the background.
  rwb: [[40, 90, 220], [12, 14, 18], [230, 60, 40]],
  // Diverging on white, for screenshots.
  bwr: [[40, 90, 220], [240, 240, 240], [220, 40, 40]],
  viridis: [[68, 1, 84], [59, 82, 139], [33, 145, 140], [94, 201, 98], [253, 231, 37]],
  gray: [[0, 0, 0], [255, 255, 255]],
};

export const COLORMAPS = Object.keys(ANCHORS);

export function lut(name) {
  const anchors = ANCHORS[name] || ANCHORS.rwb;
  const out = new Uint8Array(256 * 4);
  for (let i = 0; i < 256; i++) {
    const t = i / 255 * (anchors.length - 1);
    const k = Math.min(Math.floor(t), anchors.length - 2), f = t - k;
    for (let c = 0; c < 3; c++) out[i * 4 + c] = Math.round(anchors[k][c] * (1 - f) + anchors[k + 1][c] * f);
    out[i * 4 + 3] = 255;
  }
  return out;
}

/** CSS gradient of a map, for the legend. */
export function cssGradient(name) {
  const anchors = ANCHORS[name] || ANCHORS.rwb;
  return `linear-gradient(to top, ${anchors.map((c) => `rgb(${c.join(",")})`).join(", ")})`;
}
