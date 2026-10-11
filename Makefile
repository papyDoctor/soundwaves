# SoundWaves — a browser-based FEM acoustic wave simulator.
#
#   make dev        serve the web app from disk on :8081, static mode (no database);
#                   scenes dropped in perso/ (git-ignored) appear under Open
#   make dev-db     same, with accounts and saved projects on the local Postgres
#                   (ADDR=:9000 picks another port; 8080 is papyDeck's)
#   make test-db    the Postgres store tests, on a throwaway database
#   make wasm       build the Rust engine into internal/web/app/wasm/ (release)
#   make wasm-dev   same, debug build: fast to compile, readable panics
#   make test       Go tests
#   make test-app   pure JS modules, under Node's built-in test runner (no npm)
#   make test-wasm  Rust engine tests, native (fast, no browser)
#   make smoke      open the app in headless Chromium, mesh, run, screenshot (needs `make dev` running)
#   make deploy     build a static Linux binary and install it on the server (deploy/deploy.sh)
#
# The wasm output is COMMITTED: `make dev` needs Go only, not Rust.

BUILD    := build
BIN      := $(BUILD)/soundwaves
# papyDeck's server already sits on 8080 on the development machine.
ADDR     ?= :8081
APP      := internal/web/app
WASM_OUT := $(APP)/wasm

.PHONY: all build run dev dev-db wasm wasm-dev test test-app test-wasm test-db smoke deploy vet fmt clean

all: build

build:
	@mkdir -p $(BUILD)
	go build -o $(BIN) ./cmd/soundwaves

run:
	go run ./cmd/soundwaves

# SW_APP_DIR: the web app is served from disk, so editing JavaScript needs no
# Go restart — reload the page. In production it is the copy embedded in the binary.
dev:
	SW_ADDR=$(ADDR) SW_APP_DIR=$(APP) SW_EXAMPLES_DIR=examples SW_PERSO_DIR=perso go run ./cmd/soundwaves

# The full loop without Docker: the machine's Postgres (Postgres.app, brew) and
# the "dev" sign-in. Same binary and same schema as production.
DEV_DB ?= soundwaves_dev
DEV_DB_URL ?= postgres://$(USER)@localhost:5432/$(DEV_DB)?sslmode=disable
dev-db:
	@createdb $(DEV_DB) 2>/dev/null || true
	SW_ADDR=$(ADDR) SW_DATABASE_URL="$(DEV_DB_URL)" SW_APP_DIR=$(APP) SW_EXAMPLES_DIR=examples SW_PERSO_DIR=perso go run ./cmd/soundwaves

# --no-pack: no package.json, this is not an npm package. --target web: a plain
# ES module with a default `init()` that fetches engine_bg.wasm next to it.
wasm:
	wasm-pack build engine --release --target web --out-dir ../$(WASM_OUT) --out-name engine --no-typescript --no-pack
	@rm -f $(WASM_OUT)/.gitignore

wasm-dev:
	wasm-pack build engine --dev --target web --out-dir ../$(WASM_OUT) --out-name engine --no-typescript --no-pack
	@rm -f $(WASM_OUT)/.gitignore

test:
	go test ./...

test-app:
	node --test '$(APP)/test/*.test.mjs'

test-wasm:
	cargo test --manifest-path engine/Cargo.toml

# The store tests need a real Postgres: a throwaway database, truncated by the
# test. -count=1: the database is new each time, a cached result would lie.
TEST_DB ?= soundwaves_test
test-db:
	@createdb $(TEST_DB) 2>/dev/null || true
	SW_TEST_DATABASE_URL="postgres://$(USER)@localhost:5432/$(TEST_DB)?sslmode=disable" go test ./internal/store/ -count=1 -run TestPostgres -v

# The smoke run drives the page through window.sw, the test surface main.js
# exposes on purpose. SW_URL overrides the address.
SW_URL ?= http://127.0.0.1:8081/
smoke:
	SHOT=$(BUILD)/smoke.png node tools/smoke.mjs $(SW_URL) 5 \
	  "(async()=>{await sw.actions.toggleRun(); await new Promise(r=>setTimeout(r,3000)); return JSON.stringify({running: sw.state.sim.running, time: sw.state.sim.time, rate: Math.round(sw.state.sim.rate), nodes: sw.state.sim.mesh && sw.state.sim.mesh.xy.length/2, probes: sw.state.probes.length})})()"

# SW_HOST=user@host names the machine; it is not written anywhere in the repository.
deploy:
	./deploy/deploy.sh

vet:
	go vet ./...
	cargo clippy --manifest-path engine/Cargo.toml

fmt:
	gofmt -w ./cmd ./internal
	cargo fmt --manifest-path engine/Cargo.toml

clean:
	rm -rf $(BUILD) engine/target
