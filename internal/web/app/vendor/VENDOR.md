# Vendored libraries

Two libraries, each precompiled into a single ES module, committed here and
served as is. No npm in this repository: the bundles were built once with
esbuild from the published packages (the same recipe as the papyDeck
workshop they come from), and the version is in the file name. The server
sends them as immutable for a year: updating a library means a new file name
and a new `import`, never a replacement under the same name.

| File | Contents | License |
|---|---|---|
| `dockview-core-8.3.1.min.mjs` | dockview-core 8.3.1, the styled UMD build (it injects its layout CSS on import) | MIT, (c) Mathew Short |
| `codemirror-20260923.min.mjs` | @codemirror/{state, view, language, commands, search, autocomplete, lint, legacy-modes} and @lezer/highlight, bundled on 2026-09-23 | MIT, (c) Marijn Haverbeke and contributors |

Both licenses allow this redistribution provided the copyright notice and
the permission notice are kept. Minification strips the headers, so here they
are, once, for both:

> MIT License
>
> Copyright (c) 2022 Mathew Short (dockview)
> Copyright (c) 2018-2026 Marijn Haverbeke, Adrian Heine and others (CodeMirror, Lezer)
>
> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in
> all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
> THE SOFTWARE.

The Rust engine depends on spade (MIT or Apache-2.0), serde and wasm-bindgen
(MIT or Apache-2.0); the server on pgx (MIT), go-oidc (Apache-2.0) and
golang.org/x/oauth2 (BSD-3-Clause), fetched at build time, not vendored.

## Rebuilding

```sh
npm i dockview-core@8.3.1 @codemirror/state @codemirror/view @codemirror/language \
      @codemirror/commands @codemirror/search @codemirror/autocomplete @codemirror/lint \
      @codemirror/legacy-modes @lezer/highlight esbuild
# an entry file re-exporting exactly the symbols src/editor/cm.js imports, then:
npx esbuild cm.entry.js --bundle --format=esm --minify --target=es2022 --outfile=codemirror-$(date +%Y%m%d).min.mjs
npx esbuild dv.entry.js --bundle --format=esm --minify --target=es2022 --outfile=dockview-core-8.3.1.min.mjs
```
