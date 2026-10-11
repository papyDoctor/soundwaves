// Package web is the HTTP server: the app's files, the session, the JSON API.
package web

import (
	"log/slog"
	"mime"
	"net/http"

	"soundwaves/internal/auth"
	"soundwaves/internal/config"
	"soundwaves/internal/store"
)

type Server struct {
	cfg *config.Config
	// nil in static mode: no accounts, no saved projects.
	store     store.Storage
	providers map[string]auth.Provider
	mux       *http.ServeMux
}

func New(cfg *config.Config, st store.Storage, providers map[string]auth.Provider) *Server {
	// Go's table knows .wasm and .mjs, but an older system table could shadow
	// them; a module served as text/plain is refused by the browser.
	_ = mime.AddExtensionType(".mjs", "text/javascript")
	_ = mime.AddExtensionType(".wasm", "application/wasm")
	_ = mime.AddExtensionType(".sw", "text/plain; charset=utf-8")

	if providers == nil {
		providers = map[string]auth.Provider{}
	}
	s := &Server{cfg: cfg, store: st, providers: providers, mux: http.NewServeMux()}
	s.routes()
	return s
}

func (s *Server) routes() {
	s.mux.HandleFunc("GET /healthz", func(w http.ResponseWriter, _ *http.Request) { _, _ = w.Write([]byte("ok\n")) })
	s.mux.HandleFunc("GET /api/session", s.sessionGet)
	if s.store != nil {
		if s.cfg.Dev {
			s.mux.HandleFunc("POST /api/dev-login", s.devLogin)
		}
		s.mux.HandleFunc("GET /login/{provider}", s.loginStart)
		s.mux.HandleFunc("GET /auth/{provider}/callback", s.loginCallback)
		s.mux.HandleFunc("POST /api/logout", s.logout)
		s.mux.HandleFunc("POST /api/share", s.shareCreate)
		s.mux.HandleFunc("GET /api/share/{id}", s.shareGet)
		s.mux.HandleFunc("PUT /api/share/{id}", s.sharePut)
		s.mux.HandleFunc("GET /api/projects", s.projectsList)
		s.mux.HandleFunc("POST /api/projects", s.projectCreate)
		s.mux.HandleFunc("GET /api/projects/{id}", s.projectGet)
		s.mux.HandleFunc("PUT /api/projects/{id}", s.projectPut)
		s.mux.HandleFunc("DELETE /api/projects/{id}", s.projectDelete)
	}
	s.routesApp()
}

func (s *Server) Handler() http.Handler { return s.withAccount(s.mux) }

func (s *Server) fail(w http.ResponseWriter, r *http.Request, err error) {
	slog.Error("request failed", "method", r.Method, "path", r.URL.Path, "err", err)
	apiFail(w, http.StatusInternalServerError, "server error", "")
}
