# SoundWaves

[![tests](https://github.com/papyDoctor/soundwaves/actions/workflows/ci.yml/badge.svg)](https://github.com/papyDoctor/soundwaves/actions/workflows/ci.yml)
[![live](https://img.shields.io/badge/live-sw.papydoctor.eu-4fa3ff)](https://sw.papydoctor.eu)
[![license: MIT](https://img.shields.io/badge/license-MIT-3ec281)](LICENSE)
[![Rust → wasm](https://img.shields.io/badge/engine-Rust%20%E2%86%92%20WebAssembly-dea584)](engine/)
[![Go](https://img.shields.io/badge/server-Go-00add8)](cmd/soundwaves/)
[![no npm](https://img.shields.io/badge/web%20app-plain%20ES%20modules%2C%20no%20npm-e2b93d)](internal/web/app/)

Sound in a scene you draw, simulated in your browser. Draw walls, pick their
materials, add a source and probes, press Run, and watch the pressure field
propagate; put probes on a ring and read the radiation diagram. The wave
equation is solved by finite elements in Rust compiled to WebAssembly; the
interface is a one-window workshop with dockable panels; every scene is also a
small text file you can write by hand.

**Try it: <https://sw.papydoctor.eu>** — nothing to install, no account needed.
**Read the [user guide](docs/user-guide.md)** for the interface, the tools, the
scene format and the physics settings.

Version 1 is two-dimensional, in two flavours: **planar** (walls extruded out
of the screen: rooms, ducts, screens) and **axisymmetric** (a body of
revolution around a horizontal axis: tubes, horns, loudspeakers). Walls can be
rigid, absorbing (by coefficient or impedance), open, mirror lines, or moving
pistons; thin baffles and symmetric half-scenes are supported. Examples in
[`examples/`](examples/) cover each case.

## A scene, in text

```
soundwaves 1
units m
mode planar
medium air c=343 rho=1.2
material rigid rigid
material panel absorb alpha=0.6
material door open
polyline room closed material=rigid
    0 0   6 0   6 1 @panel   6 3 @door   6 3.9 @rigid   6 4   0 4
rect pillar 2.5 1.5 0.5 0.5
region air 1 1 medium=air
source s1 point 1 2 signal=ricker f0=600 amp=1
probe p1 5 2
sim fmax=2000 npl=10 duration=0.03
```

The viewport, the inspector and the text panel edit the same scene: whatever
you draw is written, whatever you write is drawn. The [guide](docs/user-guide.md#4-the-scene-text)
lists every statement and option.

## Running it yourself

```sh
make dev          # http://localhost:8081, static mode — needs Go only
make dev-db       # same, with share links, accounts and projects on the local Postgres
```

The web app is plain ES modules, no npm and no build step; the wasm engine is
committed, so Go is the only requirement to run. To work on the engine:

```sh
make wasm         # rebuild the engine (Rust + wasm-pack)
make test-wasm    # Rust tests, native: mesh quality, room modes, energy, plane waves, reflection, 1/r
make test-app     # JS tests: the scene format, the examples (meshed and run)
make test         # Go tests: the API on an in-memory store
make test-db      # the Postgres store, on a throwaway database
make smoke        # drive the running app in headless Chromium: mesh, run, screenshot
```

Layout:

- `engine/` — the Rust crate: mesher (spade), P1 assembly, explicit leapfrog time stepping.
- `internal/web/app/` — the web app: one HTML page, ES modules served as is, two vendored libraries (dockview, CodeMirror, see `vendor/VENDOR.md`).
- `cmd/soundwaves`, `internal/` — the Go server: the app, shared links, accounts, projects.
- `examples/` — scene files and the menu's `index.json`, served and embedded.
- `perso/` — your own scenes, git-ignored: `make dev` lists them under Open › perso.
- `deploy/` — systemd unit, nginx site, install and release scripts.
- `tools/smoke.mjs` — the headless-browser harness used by `make smoke`.

## How it computes

P1 triangles on a constrained Delaunay mesh (spade), element size
`c / (fmax · npl)`. Lumped mass and lumped boundary damping make the leapfrog
fully explicit: one sparse product per step, a few hundred steps per second
for 150 000 nodes. Rigid walls are the natural condition; absorbing and open
walls are Robin terms with the normalized impedance `zeta` (open: 1, absorb:
`(1+R)/(1-R)` with `R = √(1-alpha)`); a symmetry line is a rigid wall;
pistons are Neumann loads from the signal's acceleration. Axisymmetric
integrals carry the radius exactly and the axis edge is recognised
automatically. Thin walls split the mesh nodes along them. Frequency-domain
and eigenmode solvers are the natural next step: the matrices are already
assembled on one shared sparse pattern.

The engine's tests check the physics against theory: the first axial mode of
a rectangular room, energy conservation with rigid walls, the speed and
amplitude of a plane wave in a tube, the reflection coefficient of impedance
and open ends, the 1/r decay of a point source, a sealed baffle, a symmetric
half-room against the full room, the faces of a piston.

## Saving

Three ways, none of which needs the others: the ↓ button downloads the scene
as a `.sw` file; **Save** without an account keeps it by name in the browser;
**Share** puts it on the server behind an anonymous link anyone can open, that
its author's browser can update. An account (Google or GitHub) adds a project
list that follows you across devices.

## Server

Without `SW_DATABASE_URL` the binary serves the app and nothing else: scenes
are downloaded and opened as files. With it, shared links, accounts and
projects live in Postgres (migrations embedded, applied at start-up). Sign-in
is by Google (OpenID Connect) or GitHub (OAuth 2.0 with PKCE), whichever has a
client id in the environment; the same verified address joins the two into
one account. `SW_DEV=true` adds a development sign-in by name. `SW_APP_DIR`
and `SW_EXAMPLES_DIR` serve the app and the examples from disk instead of the
embedded copies. `deploy/env.example` lists every variable.

### Deployment

One machine with nginx, certbot and systemd, Postgres on the local socket, the
service as its own user behind nginx on 127.0.0.1:8090. Once:

```sh
export SW_HOST=root@host                                  # the machine; never written in the repository
SW_DOMAIN=waves.example.org ./deploy/setup.sh             # user, dirs, database, env file, nginx, certificate
ssh $SW_HOST vi /etc/soundwaves/env                       # the OAuth client ids and secrets
```

then, for every release, `make deploy`: tests, static Linux build, upload,
migrations, restart, health check. The OAuth applications take
`https://<domain>/auth/google/callback` and `https://<domain>/auth/github/callback`
as redirect URLs.

## License

MIT, see [LICENSE](LICENSE). The vendored libraries and the dependencies are
MIT or Apache-2.0, see `internal/web/app/vendor/VENDOR.md`.
