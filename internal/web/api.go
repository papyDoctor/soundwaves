package web

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"regexp"
	"strconv"
	"strings"
	"time"

	"soundwaves/internal/store"
)

var projectNameRe = regexp.MustCompile(`^[A-Za-z0-9][A-Za-z0-9 ._-]{0,63}$`)

func writeJSON(w http.ResponseWriter, code int, v any) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(code)
	_ = json.NewEncoder(w).Encode(v)
}

// Refusals are JSON too: {error, detail}. The app shows `error` as is.
func apiFail(w http.ResponseWriter, code int, msg, detail string) {
	writeJSON(w, code, map[string]string{"error": msg, "detail": detail})
}

func readJSON(r *http.Request, v any) error {
	body, err := io.ReadAll(http.MaxBytesReader(nil, r.Body, 2<<20))
	if err != nil {
		return err
	}
	return json.Unmarshal(body, v)
}

type projectJSON struct {
	ID      int64     `json:"id"`
	Name    string    `json:"name"`
	Text    string    `json:"text,omitempty"`
	Version int64     `json:"version"`
	Updated time.Time `json:"updated"`
	Bytes   int       `json:"bytes"`
}

func toJSON(p store.Project) projectJSON {
	return projectJSON{ID: p.ID, Name: p.Name, Text: p.Text, Version: p.Version, Updated: p.Updated, Bytes: p.Bytes}
}

func etagOf(p store.Project) string { return fmt.Sprintf(`"v%d"`, p.Version) }

// The version a client says it has, from If-Match ("v12"); 0 when absent.
func ifMatchVersion(r *http.Request) (int64, error) {
	h := strings.TrimSpace(r.Header.Get("If-Match"))
	if h == "" || h == "*" {
		return 0, nil
	}
	h = strings.Trim(h, `"`)
	if !strings.HasPrefix(h, "v") {
		return 0, errors.New("If-Match must be the project's ETag")
	}
	return strconv.ParseInt(h[1:], 10, 64)
}

func (s *Server) projectsList(w http.ResponseWriter, r *http.Request) {
	acc := s.requireAccount(w, r)
	if acc == nil {
		return
	}
	list, err := s.store.ListProjects(r.Context(), acc.ID)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	out := make([]projectJSON, 0, len(list))
	for _, p := range list {
		out = append(out, toJSON(p))
	}
	writeJSON(w, http.StatusOK, out)
}

type projectIn struct {
	Name string `json:"name"`
	Text string `json:"text"`
}

// One validation for both create and update.
func (s *Server) checkProject(in projectIn) string {
	if !projectNameRe.MatchString(in.Name) {
		return "name: 1 to 64 characters, letters, digits, space, dot, hyphen or underscore, starting with a letter or digit"
	}
	if len(in.Text) > s.cfg.MaxProjectBytes {
		return fmt.Sprintf("the scene text is larger than %d bytes", s.cfg.MaxProjectBytes)
	}
	return ""
}

func (s *Server) projectCreate(w http.ResponseWriter, r *http.Request) {
	acc := s.requireAccount(w, r)
	if acc == nil {
		return
	}
	var in projectIn
	if err := readJSON(r, &in); err != nil {
		apiFail(w, http.StatusBadRequest, "bad request", err.Error())
		return
	}
	if msg := s.checkProject(in); msg != "" {
		apiFail(w, http.StatusBadRequest, msg, "")
		return
	}
	existing, err := s.store.ListProjects(r.Context(), acc.ID)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	if len(existing) >= s.cfg.MaxProjects {
		apiFail(w, http.StatusForbidden, fmt.Sprintf("you already have %d projects, the most this server keeps", len(existing)), "")
		return
	}
	p, err := s.store.CreateProject(r.Context(), acc.ID, in.Name, in.Text)
	if errors.Is(err, store.ErrConflict) {
		apiFail(w, http.StatusConflict, fmt.Sprintf("you already have a project named '%s'", in.Name), "")
		return
	}
	if err != nil {
		s.fail(w, r, err)
		return
	}
	w.Header().Set("ETag", etagOf(p))
	writeJSON(w, http.StatusCreated, toJSON(p))
}

func projectID(r *http.Request) (int64, bool) {
	id, err := strconv.ParseInt(r.PathValue("id"), 10, 64)
	return id, err == nil && id > 0
}

func (s *Server) projectGet(w http.ResponseWriter, r *http.Request) {
	acc := s.requireAccount(w, r)
	if acc == nil {
		return
	}
	id, ok := projectID(r)
	if !ok {
		apiFail(w, http.StatusNotFound, "no such project", "")
		return
	}
	p, err := s.store.GetProject(r.Context(), acc.ID, id)
	if errors.Is(err, store.ErrNotFound) {
		apiFail(w, http.StatusNotFound, "no such project", "")
		return
	}
	if err != nil {
		s.fail(w, r, err)
		return
	}
	w.Header().Set("ETag", etagOf(p))
	writeJSON(w, http.StatusOK, toJSON(p))
}

func (s *Server) projectPut(w http.ResponseWriter, r *http.Request) {
	acc := s.requireAccount(w, r)
	if acc == nil {
		return
	}
	id, ok := projectID(r)
	if !ok {
		apiFail(w, http.StatusNotFound, "no such project", "")
		return
	}
	var in projectIn
	if err := readJSON(r, &in); err != nil {
		apiFail(w, http.StatusBadRequest, "bad request", err.Error())
		return
	}
	if msg := s.checkProject(in); msg != "" {
		apiFail(w, http.StatusBadRequest, msg, "")
		return
	}
	version, err := ifMatchVersion(r)
	if err != nil {
		apiFail(w, http.StatusBadRequest, err.Error(), "")
		return
	}
	p, err := s.store.UpdateProject(r.Context(), acc.ID, id, in.Name, in.Text, version)
	switch {
	case errors.Is(err, store.ErrNotFound):
		apiFail(w, http.StatusNotFound, "no such project", "")
		return
	case errors.Is(err, store.ErrConflict):
		apiFail(w, http.StatusPreconditionFailed, "the project changed since you opened it, or that name is taken", "")
		return
	case err != nil:
		s.fail(w, r, err)
		return
	}
	w.Header().Set("ETag", etagOf(p))
	writeJSON(w, http.StatusOK, toJSON(p))
}

func (s *Server) projectDelete(w http.ResponseWriter, r *http.Request) {
	acc := s.requireAccount(w, r)
	if acc == nil {
		return
	}
	id, ok := projectID(r)
	if !ok {
		apiFail(w, http.StatusNotFound, "no such project", "")
		return
	}
	err := s.store.DeleteProject(r.Context(), acc.ID, id)
	if errors.Is(err, store.ErrNotFound) {
		apiFail(w, http.StatusNotFound, "no such project", "")
		return
	}
	if err != nil {
		s.fail(w, r, err)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

// ---------------------------------------------------------------------------
// Anonymous shares: no account needed.
// ---------------------------------------------------------------------------

type shareIn struct {
	Name string `json:"name"`
	Text string `json:"text"`
	Key  string `json:"key,omitempty"`
}

type shareJSON struct {
	ID      string    `json:"id"`
	Name    string    `json:"name"`
	Text    string    `json:"text,omitempty"`
	Key     string    `json:"key,omitempty"`
	Created time.Time `json:"created"`
}

// POST /api/share {name, text}: a new link, and the key to update it later.
func (s *Server) shareCreate(w http.ResponseWriter, r *http.Request) {
	var in shareIn
	if err := readJSON(r, &in); err != nil {
		apiFail(w, http.StatusBadRequest, "bad request", err.Error())
		return
	}
	if in.Name == "" {
		in.Name = "scene"
	}
	if msg := s.checkProject(projectIn{Name: in.Name, Text: in.Text}); msg != "" {
		apiFail(w, http.StatusBadRequest, msg, "")
		return
	}
	id, err := randomToken()
	if err != nil {
		s.fail(w, r, err)
		return
	}
	id = id[:12]
	key, err := randomToken()
	if err != nil {
		s.fail(w, r, err)
		return
	}
	if err := s.store.CreateShare(r.Context(), id, in.Name, in.Text, hashToken(key)); err != nil {
		s.fail(w, r, err)
		return
	}
	writeJSON(w, http.StatusCreated, shareJSON{ID: id, Name: in.Name, Key: key, Created: time.Now()})
}

var shareIDRe = regexp.MustCompile(`^[A-Za-z0-9_-]{12}$`)

// GET /api/share/{id}: the scene behind a link.
func (s *Server) shareGet(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	if !shareIDRe.MatchString(id) {
		apiFail(w, http.StatusNotFound, "no such shared scene", "")
		return
	}
	sh, err := s.store.GetShare(r.Context(), id)
	if errors.Is(err, store.ErrNotFound) {
		apiFail(w, http.StatusNotFound, "no such shared scene", "")
		return
	}
	if err != nil {
		s.fail(w, r, err)
		return
	}
	writeJSON(w, http.StatusOK, shareJSON{ID: sh.ID, Name: sh.Name, Text: sh.Text, Created: sh.Created})
}

// PUT /api/share/{id} {name, text, key}: update, for the browser that holds the key.
func (s *Server) sharePut(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	var in shareIn
	if err := readJSON(r, &in); err != nil || !shareIDRe.MatchString(id) {
		apiFail(w, http.StatusBadRequest, "bad request", "")
		return
	}
	if in.Name == "" {
		in.Name = "scene"
	}
	if msg := s.checkProject(projectIn{Name: in.Name, Text: in.Text}); msg != "" {
		apiFail(w, http.StatusBadRequest, msg, "")
		return
	}
	err := s.store.UpdateShare(r.Context(), id, in.Name, in.Text, hashToken(in.Key))
	if errors.Is(err, store.ErrNotFound) {
		apiFail(w, http.StatusForbidden, "this link cannot be updated from here: share it again to get a new one", "")
		return
	}
	if err != nil {
		s.fail(w, r, err)
		return
	}
	writeJSON(w, http.StatusOK, shareJSON{ID: id, Name: in.Name, Created: time.Now()})
}
