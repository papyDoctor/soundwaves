package web

import (
	"crypto/rand"
	"crypto/sha256"
	"crypto/subtle"
	"encoding/base64"
	"log/slog"
	"net/http"
	"strings"
	"time"

	"soundwaves/internal/auth"
	"soundwaves/internal/store"
)

// The state and the PKCE verifier travel in this cookie between the way out
// and the way back. Short: ten minutes are enough to sign in, and a cookie
// that lingers is a replay opportunity.
const (
	oauthCookie = "sw_oauth"
	oauthTTL    = 10 * time.Minute
)

func randomURLSafe(n int) (string, error) {
	b := make([]byte, n)
	if _, err := rand.Read(b); err != nil {
		return "", err
	}
	return base64.RawURLEncoding.EncodeToString(b), nil
}

// S256, never "plain": only the digest of the verifier leaves on the way out.
func pkceChallenge(verifier string) string {
	sum := sha256.Sum256([]byte(verifier))
	return base64.RawURLEncoding.EncodeToString(sum[:])
}

func (s *Server) secureCookies() bool { return strings.HasPrefix(s.cfg.BaseURL, "https://") }

// providerList feeds the buttons, in a fixed order.
func (s *Server) providerList() []providerJSON {
	out := []providerJSON{}
	for _, name := range []string{"google", "github"} {
		if p, ok := s.providers[name]; ok {
			out = append(out, providerJSON{Name: p.Name(), Label: p.Label()})
		}
	}
	return out
}

// GET /login/{provider}: off to the provider, with a state and a PKCE challenge.
func (s *Server) loginStart(w http.ResponseWriter, r *http.Request) {
	p, ok := s.providers[r.PathValue("provider")]
	if !ok {
		http.NotFound(w, r)
		return
	}
	state, err := randomURLSafe(32)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	verifier, err := randomURLSafe(64)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	http.SetCookie(w, &http.Cookie{
		Name: oauthCookie, Value: state + "." + verifier, Path: "/",
		// Lax, not Strict: the provider's return is a top-level navigation
		// from another site; in Strict the cookie would not come along.
		SameSite: http.SameSiteLaxMode, HttpOnly: true, Secure: s.secureCookies(),
		MaxAge: int(oauthTTL.Seconds()),
	})
	http.Redirect(w, r, p.AuthURL(state, pkceChallenge(verifier)), http.StatusSeeOther)
}

// GET /auth/{provider}/callback: back from the provider.
func (s *Server) loginCallback(w http.ResponseWriter, r *http.Request) {
	p, ok := s.providers[r.PathValue("provider")]
	if !ok {
		http.NotFound(w, r)
		return
	}
	refuse := func(reason string) {
		// The detail goes to the log, never to the screen: a precise message
		// mostly informs whoever is probing.
		slog.Warn("sign-in refused", "provider", p.Name(), "reason", reason)
		http.Redirect(w, r, "/?login=failed", http.StatusSeeOther)
	}
	// The cookie is consumed whatever happens: a state used twice is a replay.
	c, err := r.Cookie(oauthCookie)
	http.SetCookie(w, &http.Cookie{Name: oauthCookie, Value: "", Path: "/", MaxAge: -1, HttpOnly: true, Secure: s.secureCookies(), SameSite: http.SameSiteLaxMode})
	if err != nil || c.Value == "" {
		refuse("no state cookie")
		return
	}
	parts := strings.SplitN(c.Value, ".", 2)
	if len(parts) != 2 {
		refuse("malformed state cookie")
		return
	}
	state, verifier := parts[0], parts[1]
	// Constant time: a state compares like a secret.
	if subtle.ConstantTimeCompare([]byte(state), []byte(r.URL.Query().Get("state"))) != 1 {
		refuse("state mismatch")
		return
	}
	if e := r.URL.Query().Get("error"); e != "" {
		refuse("provider refused: " + e)
		return
	}
	code := r.URL.Query().Get("code")
	if code == "" {
		refuse("no code")
		return
	}
	u, err := p.Exchange(r.Context(), code, verifier)
	if err != nil {
		refuse(err.Error())
		return
	}
	if u.Subject == "" {
		refuse("provider without a stable identifier")
		return
	}
	acc, err := s.store.AccountForIdentity(r.Context(), store.Identity{
		Provider: p.Name(), Subject: u.Subject, Email: u.Email, EmailVerified: u.EmailVerified, SuggestedName: u.Name,
	})
	if err != nil {
		s.fail(w, r, err)
		return
	}
	if err := s.setSession(w, r, acc.ID); err != nil {
		s.fail(w, r, err)
		return
	}
	slog.Info("sign-in", "provider", p.Name(), "account", acc.ID)
	http.Redirect(w, r, "/?login=ok", http.StatusSeeOther)
}

// Providers is the map the server is built with: name -> provider.
type Providers = map[string]auth.Provider
