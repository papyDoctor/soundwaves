package web

import (
	"context"
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
	"errors"
	"log/slog"
	"net/http"
	"regexp"
	"strings"
	"time"

	"soundwaves/internal/store"
)

const (
	sessionTTL    = 30 * 24 * time.Hour
	sessionCookie = "sw_session"
)

var nameRe = regexp.MustCompile(`^[A-Za-z0-9 _-]{2,32}$`)

// Tokens never reach the database in clear: a leak must not let anyone sign in.
func hashToken(s string) []byte {
	sum := sha256.Sum256([]byte(s))
	return sum[:]
}

func randomToken() (string, error) {
	b := make([]byte, 32)
	if _, err := rand.Read(b); err != nil {
		return "", err
	}
	return base64.RawURLEncoding.EncodeToString(b), nil
}

type ctxKey int

const accountKey ctxKey = 1

func accountFrom(ctx context.Context) *store.Account {
	a, _ := ctx.Value(accountKey).(*store.Account)
	return a
}

// withAccount attaches the session's account to the request, if any. It
// demands nothing: requireAccount is what refuses.
func (s *Server) withAccount(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if s.store != nil {
			if c, err := r.Cookie(sessionCookie); err == nil && c.Value != "" {
				acc, err := s.store.SessionAccount(r.Context(), hashToken(c.Value))
				if err == nil {
					r = r.WithContext(context.WithValue(r.Context(), accountKey, &acc))
				} else if !errors.Is(err, store.ErrNotFound) {
					slog.Error("session lookup", "err", err)
				}
			}
		}
		next.ServeHTTP(w, r)
	})
}

func (s *Server) setSession(w http.ResponseWriter, r *http.Request, accountID int64) error {
	raw, err := randomToken()
	if err != nil {
		return err
	}
	if err := s.store.CreateSession(r.Context(), hashToken(raw), accountID, sessionTTL); err != nil {
		return err
	}
	http.SetCookie(w, &http.Cookie{
		Name: sessionCookie, Value: raw, Path: "/",
		// Lax, not Strict: Lax still blocks cross-site POSTs, which stands in
		// for CSRF protection on the JSON API.
		SameSite: http.SameSiteLaxMode, HttpOnly: true,
		Secure:  strings.HasPrefix(s.cfg.BaseURL, "https://"),
		Expires: time.Now().Add(sessionTTL),
	})
	return nil
}

// requireAccount refuses in JSON rather than redirecting: the caller is code.
func (s *Server) requireAccount(w http.ResponseWriter, r *http.Request) *store.Account {
	if s.store == nil {
		apiFail(w, http.StatusNotImplemented, "this server keeps no projects", "")
		return nil
	}
	acc := accountFrom(r.Context())
	if acc == nil {
		apiFail(w, http.StatusUnauthorized, "not signed in", "")
		return nil
	}
	return acc
}

type sessionJSON struct {
	Account *accountJSON `json:"account"`
	Dev     bool         `json:"dev"`
	// Whether this server stores projects at all.
	Storage bool `json:"storage"`
	// The sign-in buttons: a provider that is not configured is not offered.
	Providers []providerJSON `json:"providers"`
}

type providerJSON struct {
	Name  string `json:"name"`
	Label string `json:"label"`
}

type accountJSON struct {
	ID   int64  `json:"id"`
	Name string `json:"name"`
}

// GET /api/session: what the app needs to know before drawing anything.
func (s *Server) sessionGet(w http.ResponseWriter, r *http.Request) {
	out := sessionJSON{Dev: s.cfg.Dev && s.store != nil, Storage: s.store != nil, Providers: s.providerList()}
	if acc := accountFrom(r.Context()); acc != nil {
		out.Account = &accountJSON{ID: acc.ID, Name: acc.Name}
	}
	writeJSON(w, http.StatusOK, out)
}

// POST /api/dev-login {name}: the development sign-in. The typed name is the
// subject: two names, two accounts — enough to test what another user sees.
// Only registered when SW_DEV is true; production never has the route.
func (s *Server) devLogin(w http.ResponseWriter, r *http.Request) {
	var in struct {
		Name string `json:"name"`
	}
	if err := readJSON(r, &in); err != nil {
		apiFail(w, http.StatusBadRequest, "bad request", err.Error())
		return
	}
	name := strings.TrimSpace(in.Name)
	if name == "" {
		name = "dev"
	}
	if !nameRe.MatchString(name) {
		apiFail(w, http.StatusBadRequest, "2 to 32 characters: letters, digits, space, hyphen or underscore", "")
		return
	}
	acc, err := s.store.AccountForIdentity(r.Context(), store.Identity{Provider: "dev", Subject: name, SuggestedName: name})
	if err != nil {
		s.fail(w, r, err)
		return
	}
	if err := s.setSession(w, r, acc.ID); err != nil {
		s.fail(w, r, err)
		return
	}
	slog.Info("dev sign-in", "account", acc.ID, "name", acc.Name)
	writeJSON(w, http.StatusOK, sessionJSON{Account: &accountJSON{ID: acc.ID, Name: acc.Name}, Dev: s.cfg.Dev, Storage: true, Providers: s.providerList()})
}

func (s *Server) logout(w http.ResponseWriter, r *http.Request) {
	if c, err := r.Cookie(sessionCookie); err == nil && c.Value != "" {
		_ = s.store.DeleteSession(r.Context(), hashToken(c.Value))
	}
	http.SetCookie(w, &http.Cookie{Name: sessionCookie, Value: "", Path: "/", MaxAge: -1, HttpOnly: true, SameSite: http.SameSiteLaxMode})
	w.WriteHeader(http.StatusNoContent)
}
