# SoundWaves

A browser-based acoustic wave simulator. Draw walls (or describe them in a
small text format), pick materials, sources and probes, then watch the
pressure field propagate. The wave equation is solved by finite elements
(P1 triangles) in Rust compiled to WebAssembly; the interface is a one-window
workshop with dockable panels, in the style of the papyDeck workshop.

Version 1 is two-dimensional: a **planar** mode (walls extruded out of the
screen) and an **axisymmetric** mode (a horizontal axis of revolution, the
profile drawn above it: tubes, horns, loudspeakers). Full 3D is a later goal.

```sh
make dev          # http://localhost:8081, static mode — needs Go only (ADDR=:9000 for another port)
make dev-db       # same, with accounts and saved projects on the local Postgres
make wasm         # rebuild the engine (Rust + wasm-pack); the output is committed
make test         # Go tests (the API, on an in-memory store)
make test-db      # the Postgres store, on a throwaway database
make test-app     # JS unit tests (node --test)
make test-wasm    # Rust tests, native: mesh quality, room modes, energy, plane waves, reflection, 1/r
make smoke        # drive the running app in headless Chromium: mesh, run, screenshot
```

## The scene text

A scene is a small text file, `.sw`: one statement per line, `#` comments, an
indented line continues the one above, `key=value` options, and `@material`
inside a point list switches the material of the segments that follow. The
viewport, the inspector and the text panel all edit the same scene; the text
is regenerated from it, so everything drawn is also written.

```
soundwaves 1
units m
mode planar                      # or axisym: x along the axis, y the radius, drawn above y = 0
medium air c=343 rho=1.2
material rigid rigid
material panel absorb alpha=0.6  # or: impedance zeta=3.5, open, symmetry
material drive piston signal=sine f0=300 amp=0.01   # a moving wall, velocity in m/s
polyline room closed material=rigid
    0 0   6 0   6 1 @panel   6 3   0 4
rect pillar 2.5 1.5 0.5 0.5 material=drive
circle column 4.5 3 0.3 material=panel
region air 1 1 medium=air        # a seed inside every area to simulate
source s1 point 1 2 signal=ricker f0=600 amp=1
probe p1 5 2
ring pat 1 2 2.5 n=36            # 36 probes on a circle: the Pattern tab plots the radiation diagram
sim fmax=2000 npl=10 duration=0.03 cfl=0.9 angle=28
view center=3,2 scale=120 colormap=rwb gain=auto
```

Walls: `polyline`, `line`, `rect`, `circle`, `arc cx cy r a0 a1`. A wall drawn
inside a region is a thin baffle. A wall of material kind `symmetry` is a
mirror line: draw half (or a quarter) of a symmetric scene, the viewport shows
the mirror image, and the physics is exact since a mirror is the same natural
condition as a rigid wall for the pressure. Sources: a `point` monopole, or any wall segment given a
`piston` material, which moves with the material's signal (`gauss`, `ricker`,
`burst cycles=n`, `sine`). A piston drawn inside the air is a thin moving
wall; `sides=both` (default) is a breathing membrane, `sides=plate` a rigid
plate pushing on its left and pulling on its right (dipole), `sides=left` or
`right` moves one face only, the other staying rigid. Left is on the left of
the drawing direction; the viewport ticks the moving faces.

Probes record the pressure against time (Signals tab). A `ring` places n
probes on a circle of a given centre and radius (`a0`/`a1` limit the angles;
in axisymmetric mode only the half above the axis exists); the Pattern tab of
the Probes panel plots the peak or RMS pressure against the angle, linear or
in dB: the radiation diagram.

## How it computes

P1 triangles on a constrained Delaunay mesh (spade), element size
`c / (fmax · npl)`. Lumped mass and lumped boundary damping make the leapfrog
fully explicit: one sparse product per step, at a few hundred steps per second
for 150 000 nodes. Rigid walls are natural; absorbing and open walls are Robin
terms with the normalized impedance `zeta` (open: 1, absorb: `(1+R)/(1-R)` with
`R = sqrt(1-alpha)`). Axisymmetric integrals carry the radius exactly; the axis
edge is recognised automatically. Frequency-domain and eigenmode solvers are
the next step: the matrices are already assembled on one shared pattern.

## Saving

Three ways, none of which needs the others:

- **Files**: the ↓ button downloads the scene as `.sw`, Open reads one back.
- **This browser**: Save without an account keeps the scene by name in the
  browser's storage; Open lists them. Handy, not a vault.
- **A link**: Share puts the scene on the server behind an anonymous address
  (`/?s=…`) anyone can open; the browser that made it keeps the key and can
  update it with Share again. Links unopened for a year are dropped.

An account (Google or GitHub) adds a project list that follows you across
devices, with conflict detection between tabs.

## Server

Without `SW_DATABASE_URL` the binary serves the app and nothing else: scenes
are downloaded and opened as files, nothing else is offered. With it, shared
links, accounts and projects live in Postgres (migrations embedded, applied
at start-up). Sign-in is by Google
(OpenID Connect) or GitHub (OAuth 2.0 with PKCE), whichever has a client id in
the environment; the same verified address joins the two into one account.
`SW_DEV=true` adds the development sign-in by name. `SW_APP_DIR` serves the app
from disk instead of the embedded copy.

### Deployment

One machine with nginx, certbot and systemd, Postgres on the local socket, the
service as its own user behind nginx on 127.0.0.1:8090. Once:

```sh
SW_DOMAIN=waves.example.org ./deploy/setup.sh root@host   # user, dirs, database, env file, nginx, certificate
ssh root@host vi /etc/soundwaves/env                      # the OAuth client ids and secrets
```

then, for every release:

```sh
make deploy          # tests, static Linux build, upload, migrations, restart, health check
```

The OAuth applications take `https://<domain>/auth/google/callback` and
`https://<domain>/auth/github/callback` as redirect URLs. `deploy/env.example`
lists every variable.

Layout:

- `engine/` — the Rust crate: mesher (spade), P1 assembly, explicit leapfrog time stepping.
- `internal/web/app/` — the web app: one HTML page, ES modules served as is, two vendored libraries (dockview, CodeMirror). No npm, no build step.
- `cmd/soundwaves`, `internal/web` — the Go server. For now it only serves the app; accounts and saved projects come later.
- `examples/` — scene files (`.sw`).
