package web

import (
	"embed"
	"io/fs"
	"log/slog"
	"net/http"
	"os"
	"strings"

	soundwaves "soundwaves"
)

/*
The web app: one HTML page, ES modules served as is, two vendored libraries
(dockview, CodeMirror) and the wasm engine, all precompiled and committed.
No npm: the folder is served like a static directory and ships with the binary.

Embedded so that deploying stays "copy one file". In development, SW_APP_DIR
serves the folder from disk instead, to edit JavaScript without restarting Go.
*/

//go:embed all:app
var appFS embed.FS

// appSources: the app's file system — the disk if AppDir is set and exists,
// the embedded copy otherwise.
func (s *Server) appSources() fs.FS {
	if d := s.cfg.AppDir; d != "" {
		if st, err := os.Stat(d); err == nil && st.IsDir() {
			slog.Info("app served from disk", "dir", d)
			return os.DirFS(d)
		}
		slog.Warn("SW_APP_DIR missing, serving the embedded app", "dir", d)
	}
	sub, err := fs.Sub(appFS, "app")
	if err != nil {
		panic(err) // compiled into the binary: cannot be missing
	}
	return sub
}

// examplesSources: the repository's examples/ on disk when SW_EXAMPLES_DIR is
// set, the embedded copy otherwise.
func (s *Server) examplesSources() fs.FS {
	if d := s.cfg.ExamplesDir; d != "" {
		if st, err := os.Stat(d); err == nil && st.IsDir() {
			return os.DirFS(d)
		}
		slog.Warn("SW_EXAMPLES_DIR missing, serving the embedded examples", "dir", d)
	}
	sub, err := fs.Sub(soundwaves.Examples, "examples")
	if err != nil {
		panic(err)
	}
	return sub
}

func (s *Server) routesApp() {
	fsys := s.appSources()
	files := http.FileServerFS(fsys)

	// The example scenes live at the root of the repository, not in the app.
	examples := http.StripPrefix("/examples/", http.FileServerFS(s.examplesSources()))
	s.mux.HandleFunc("GET /examples/{file}", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Cache-Control", "no-cache")
		examples.ServeHTTP(w, r)
	})

	s.mux.HandleFunc("GET /", func(w http.ResponseWriter, r *http.Request) {
		path := r.URL.Path
		if path == "/" {
			body, err := fs.ReadFile(fsys, "index.html")
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			w.Header().Set("Content-Type", "text/html; charset=utf-8")
			// The page names today's modules: never cache it.
			w.Header().Set("Cache-Control", "no-store")
			_, _ = w.Write(body)
			return
		}
		// No listing: a directory path is a 404, not an index.
		if strings.HasSuffix(path, "/") {
			http.NotFound(w, r)
			return
		}
		switch {
		case strings.HasPrefix(path, "/vendor/"):
			// The version is in the file name: a given name never changes, so
			// it can be kept for a year. Updating a library means a new name.
			w.Header().Set("Cache-Control", "public, max-age=31536000, immutable")
		default:
			// src/, styles/ and wasm/ change with every deployment: revalidate
			// on every visit. The embedded copy has no date, so the ETag serves.
			w.Header().Set("Cache-Control", "no-cache")
		}
		files.ServeHTTP(w, r)
	})
}
