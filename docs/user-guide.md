# SoundWaves user guide

SoundWaves simulates sound in a 2D scene you draw: a room, a duct, a horn, a
loudspeaker. It solves the acoustic wave equation by finite elements, in your
browser, and shows the pressure field as it propagates. This guide covers the
whole interface and the scene format. For how it computes and how to build
it, see the [README](../README.md).

Try it at <https://sw.papydoctor.eu>. Nothing to install, no account needed.

## 1. Two minutes to a first wave

1. Open the site. The room example is loaded: a 6 × 4 m room seen from above.
2. Press **▶ Run**. The scene is meshed (a few hundred milliseconds), then the
   pulse spreads from the source `s1`, reflects on the walls, leaks through the
   open door and is damped by the absorbing panel.
3. Open the **Probes** tab at the bottom: the pressure against time at `p1` and `p2`.
4. In the **Scene** tree on the left, click `s1` and change `f0` in the
   Inspector on the right; Run again. Only the assembly is redone, the mesh is kept.
5. **Open** (top bar) lists the other examples: two rooms and a door, a duct
   with an absorbing lining, a Helmholtz resonator, a slit, a dipole, a tube, a
   horn, a loudspeaker box.

## 2. The window

Panels can be dragged, docked and resized; **Reset layout** puts them back.

| Panel | What it is for |
|---|---|
| **Scene** (left) | Everything in the scene, grouped: media, materials, walls, regions, sources, probes, simulation, view. Click to select, the Inspector shows the item. |
| **Viewport** (centre) | The drawing and the field. Drag to pan, wheel to zoom, **F** to frame. Tools on the left edge. |
| **Scene text** (centre tab) | The scene as text. **Apply** (Ctrl/Cmd+Enter) makes the text the scene; the text is regenerated whenever the scene changes elsewhere. |
| **Inspector** (right) | The selected item's properties. Every field writes to the scene at once. |
| **Output** (bottom) | Mesh statistics, time step, warnings, errors with a link to the line of the text. |
| **Probes** (bottom tab) | **Signals**: pressure against time at the point probes. **Pattern**: the radiation diagram of a probe ring. |

Top bar: the open scene, **Open**, **Save**, ↓ (download), **Share**, **Mesh**,
**▶ Run / ❚❚ Pause** (Space in the viewport), **Reset** (back to t = 0), the
clock, the **speed** (simulation steps per displayed frame; `max` runs as fast
as it can), the mesh size and the stepping rate, and **Sign in**.

## 3. Drawing

Tools, with their keys (the viewport must have the focus):

| Key | Tool | How |
|---|---|---|
| V | Select | Click selects; drag moves a wall, a vertex of the selected wall, a source, a probe, a region seed or a ring; **Delete** removes; Esc deselects. Dragging on empty space pans. |
| P | Polyline | Click each point; **Enter** ends an open wall, **C** or clicking the first point closes it; Esc cancels. |
| L | Line | Two clicks. |
| R | Rect | Two opposite corners. |
| C | Circle | The centre, then a point on the circle. |
| A | Arc | The centre, a start point (sets the radius and start angle), then the end angle, counter-clockwise. |
| G | Region seed | One click inside an enclosed area that must be simulated. |
| S | Source | One click: a point source. |
| B | Probe | One click. |
| O | Probe ring | The centre, then a point at the radius: 36 probes for a radiation pattern. |

Points snap to the grid: the step is set in the `grid` box at the top left of
the viewport (saved with the scene), `snap` turns it off. The status line
shows the snapped coordinates, and a crosshair shows where a click will land.

Other keys: **F** frame the scene, **W** mesh wireframe, **H** grid, **K**
lock the colour scale, **Ctrl/Cmd+Z** undo, **Ctrl/Cmd+Shift+Z** redo,
**Ctrl/Cmd+S** save.

Every wall needs a material (the Inspector's card, per segment for a
polyline), and every enclosed area you want simulated needs a **region seed**:
areas without one (the inside of a pillar, the outside) are left out. A wall
drawn inside the air is a thin wall, a baffle; a wall touching nothing at one
end just stops there.

## 4. The scene text

The whole scene is a small text, `.sw`, which the text panel shows and the
↓ button downloads. Rules: one statement per line; `#` starts a comment; an
indented line continues the statement above (unless it starts with a
statement keyword); options are `key=value`; inside a point list, `@name`
switches the material of the segments that follow.

```
soundwaves 1
units m                          # m, cm or mm: the unit of every coordinate
mode planar                      # planar | axisym
medium air c=343 rho=1.2         # speed of sound (m/s), density (kg/m³)
material rigid rigid
material panel absorb alpha=0.6
material felt impedance zeta=3.5
material door open
material mirror symmetry
material drive piston signal=burst f0=1500 amp=0.01 cycles=3 sides=plate
polyline room closed material=rigid     # closed: the last point joins the first
    0 0   6 0   6 1 @panel   6 3 @door   6 3.9 @rigid   6 4   0 4
line baffle 3 0 3 2.5 material=rigid     # x1 y1 x2 y2
rect pillar 2.5 1.5 0.5 0.5              # x y width height
circle column 4.5 3 0.3 material=felt    # cx cy radius
arc lip 1 2 0.8 -40 40                   # cx cy radius start_angle end_angle (degrees, counter-clockwise)
region air 1 1 medium=air                # a point inside the area to simulate
source s1 point 1 2 signal=ricker f0=600 amp=1 radius=0
probe p1 5 2
ring pat 1 2 2.5 n=36 a0=0 a1=360
sim fmax=2000 npl=10 duration=0.03 cfl=0.9 angle=28 max_nodes=500000
view center=3,2 scale=120 colormap=rwb gain=auto grid=0.05 snap=on
```

Names: walls, regions, sources, probes and rings share one set of ids; media
and materials share another (`air` can be both a medium and a region). The
Inspector's **Delete** and the Delete key remove items; the text panel's
**Revert** throws away unapplied edits.

## 5. Materials: what a wall does to the wave

| Kind | Meaning | Parameters |
|---|---|---|
| `rigid` | A hard wall: total reflection. | — |
| `absorb` | An absorbing wall, by energy absorption coefficient at normal incidence. | `alpha` 0 to 1 |
| `impedance` | An absorbing wall, by normalized specific impedance Z/(ρc). 1 is perfectly matched, large is nearly rigid. | `zeta` > 0 |
| `open` | Lets the wave out, as if the scene continued (a first-order absorbing boundary; some reflection remains at grazing incidence). | — |
| `symmetry` | A mirror line. Draw half (or a quarter) of a symmetric scene; the physics is exact because a mirror is the same natural condition as a rigid wall for the pressure. The viewport draws the mirror image. A source on the line counts once in the half, twice in the whole. | — |
| `piston` | A moving wall: every segment with this material pushes the fluid with the signal as inward normal velocity (m/s). | the signal, `sides` |

`absorb` is converted to `zeta = (1+R)/(1-R)` with `R = √(1-alpha)`; the
Inspector shows the resulting reflection coefficient.

A piston on an outer wall has one face. Drawn inside the air (a thin wall),
`sides` says which faces move: `both` (default) is a breathing membrane,
`plate` a rigid plate that pushes on its left and pulls on its right (a dipole:
a loudspeaker cone without a box), `left` or `right` moves one face only, the
other staying rigid (a driver whose back is in a cavity you do not model).
Left is on the left of the segment's drawing direction; the viewport ticks the
moving faces. A piston segment lying on the axis of revolution has no area and
is ignored with a warning.

## 6. Sources and signals

A **point source** injects a volume flow at a point (a monopole). A `radius`
spreads it over nearby nodes; on the axis of revolution it is at least one
element. A **piston** is a material (above).

Signals, with their options:

| Type | Shape | Options |
|---|---|---|
| `gauss` | A Gaussian pulse of width 1/(π f0), centred at `t0` (default: 4 widths). Broadband, not zero-mean: a closed room keeps a static offset. | `f0`, `amp`, `t0` |
| `ricker` | A zero-mean pulse (the second derivative of a Gaussian), peak at `f0`. The best pulse for rooms. | `f0`, `amp`, `t0` |
| `burst` | `cycles` periods of a sine under a smooth window. | `f0`, `amp`, `cycles`, `t0` |
| `sine` | A continuous sine, with a two-period ramp-in. For steady-state patterns. | `f0`, `amp`, `t0` |

`f0` is the signal's frequency; **`fmax` is the simulation's resolution** (next
section) and must cover the signal's content: about 1.5 × f0 for a sine or
burst, 2.5 × f0 for a pulse. Too low, the high components travel at the wrong
speed and trail oscillations behind the front; too high only costs time.

## 7. Simulation settings

| Setting | Meaning |
|---|---|
| `fmax` | The highest frequency resolved. The element size is `c / (fmax · npl)`: halving fmax divides the node count by four and the run time by eight. |
| `npl` | Nodes per wavelength at fmax: 10 is accurate, 8 is a fair trade, 6 is fast and visibly dispersive. |
| `duration` | Simulated time. A pulse crossing a 6 m room takes 17 ms; count a few crossings for reverberation, and for a sine wait a few crossings before reading a pattern. |
| `cfl` | Fraction of the stable time step (0.9). Lower it if the field blows up. |
| `angle` | The smallest triangle angle the mesher aims for (28°; up to 33). |
| `max_nodes` | The refinement budget. A mesh that hits it is coarser than asked: lower fmax or check the geometry. |

The Inspector's Simulation card estimates the element size and the node count
before meshing. For a feel: 150 000 nodes mesh in about a third of a second
and step a few hundred times per second on a laptop.

## 8. Probes and radiation patterns

A **probe** records the pressure at a point; the **Signals** tab plots every
point probe against time, and **CSV** downloads them all.

A **ring** places `n` probes on a circle (centre, radius, `a0`/`a1` to limit
the angles, 0° along +x, counter-clockwise). The **Pattern** tab plots, for
the chosen ring, one of:

- **peak**: the largest |p| seen at each angle — for pulses;
- **RMS**: over the last five periods of the source, the steady state — for a
  sine, once the wave has settled everywhere;
- **energy**: the integral of p² over the run — for pulses, as a relative measure.

Linear is normalized to the maximum; dB counts down from it (floor −40 dB,
10·log for energy). For a true far-field pattern the ring must be in the open
part of the scene, well away from the source compared with the wavelength and
the source size, with `open` walls around.

## 9. Axisymmetric mode

`mode axisym` turns the drawing into a body of revolution around the
**horizontal axis y = 0**: x runs along the axis, y is the radius, and only
y ≥ 0 exists. Draw the profile above the axis and let the walls come back to
the axis; the segment lying on it is recognised as the axis automatically (no
condition is needed there). The viewport mirrors the field below the axis for
the picture. Tubes, horns, loudspeakers, pistons closing a tube are this mode.

Rules: nothing below y = 0; a probe or source on the axis is fine; a piston
segment on the axis has no area; a ring keeps only its probes with y ≥ 0.

## 10. The picture

With `gain=auto` the colour range is the strongest level seen since the run
started (a robust one: the 99th percentile of the field, so a spike next to a
source does not darken everything else) and it stays there for the whole run;
Reset and Mesh start it over. A louder source therefore looks the same from
one run to the next: to compare amplitudes, fix the scale (⊜ or **K** freezes
the current range, or type a number in the View card's gain). The legend
gives the range.
Colour maps: `rwb` (blue negative, red positive, dark zero), `bwr`, `viridis`,
`gray`. **W** shows the mesh.

## 11. Saving and sharing

- **↓** downloads the scene as a `.sw` file; **Open** reads one back. This works everywhere, even offline.
- **Save** without an account keeps the scene by name in this browser; the top bar's list and Open show them. Clearing the site's data loses them.
- **Share** puts the scene on the server behind an anonymous link (`/?s=…`) that anyone can open. The browser that made it keeps the key: Share again (or Save) updates it; others open it read-only and save their own copy. Links unopened for a year are dropped.
- **Sign in** (Google or GitHub, when the server offers them) keeps a project list that follows you across devices, with conflict detection if two tabs save the same project.

## 12. When something goes wrong

Output tells you, with a link to the line of the text when an item is named:

| Message | Meaning |
|---|---|
| region 'air' leaks outside: the walls are not closed near (x, y) | The area around the seed is not enclosed: a gap between two walls near that point. Snapping helps. |
| source/probe '…' is outside the simulated regions | The point is not inside any seeded area (below the axis, inside a pillar, outside). |
| regions '…' and '…' share the same area | Two seeds in one enclosed area: one seed per area. |
| wall '…' has a zero-length segment | Two consecutive identical points (a double click). |
| refinement stopped at the vertex budget | fmax too high for the scene, or two walls almost touching that leave a sliver. |
| the field blew up | The time step is unstable: lower `cfl`. |
| the engine crashed: … | A bug; the message says where. Please report it with the scene text. |

Tips: start with a low fmax and a short duration, then raise them; use
`ricker` in closed rooms; a pattern needs `open` walls, a sine and patience.
