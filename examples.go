// Package soundwaves is the module root; it only carries the example scenes,
// embedded here because go:embed cannot reach above a package's directory
// and the examples belong at the root of the repository, not under the web app.
package soundwaves

import "embed"

// Examples holds examples/*.sw and examples/index.json.
//
//go:embed examples/*.sw examples/index.json
var Examples embed.FS
