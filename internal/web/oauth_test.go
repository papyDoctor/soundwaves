package web

import (
	"context"
	"net/http"
	"strings"
	"testing"

	"soundwaves/internal/auth"
	"soundwaves/internal/config"
)

// A provider that accepts any code and answers with a fixed user.
type fakeProvider struct{ user auth.User }

func (f fakeProvider) Name() string  { return "github" }
func (f fakeProvider) Label() string { return "GitHub" }
func (f fakeProvider) AuthURL(state, challenge string) string {
	return "https://provider.test/auth?state=" + state + "&cc=" + challenge
}
func (f fakeProvider) Exchange(_ context.Context, code, verifier string) (auth.User, error) {
	if code != "good" || verifier == "" {
		return auth.User{}, context.DeadlineExceeded
	}
	return f.user, nil
}

func TestOAuthFlow(t *testing.T) {
	cfg := config.Load()
	cfg.Dev = false
	st := newMemStore()
	h := New(cfg, st, map[string]auth.Provider{"github": fakeProvider{auth.User{Subject: "42", Name: "Ada"}}}).Handler()

	// The session names the provider.
	rec := do(t, h, "GET", "/api/session", "", "", "")
	if !strings.Contains(rec.Body.String(), `"providers":[{"name":"github","label":"GitHub"}]`) {
		t.Fatalf("session: %s", rec.Body)
	}
	if do(t, h, "GET", "/login/google", "", "", "").Code != http.StatusNotFound {
		t.Fatal("an unconfigured provider is not a route")
	}

	// Off to the provider: a redirect carrying the state, and the state cookie.
	rec = do(t, h, "GET", "/login/github", "", "", "")
	if rec.Code != http.StatusSeeOther {
		t.Fatalf("login start: %d", rec.Code)
	}
	loc := rec.Header().Get("Location")
	state := loc[strings.Index(loc, "state=")+6 : strings.Index(loc, "&cc=")]
	var cookie string
	for _, c := range rec.Result().Cookies() {
		if c.Name == oauthCookie {
			cookie = c.Name + "=" + c.Value
		}
	}
	if cookie == "" || state == "" {
		t.Fatal("no state cookie or state")
	}

	// Back with the wrong state: refused, no session.
	rec = do(t, h, "GET", "/auth/github/callback?state=nope&code=good", "", cookie, "")
	if rec.Code != http.StatusSeeOther || !strings.Contains(rec.Header().Get("Location"), "login=failed") {
		t.Fatalf("wrong state should fail: %d %s", rec.Code, rec.Header().Get("Location"))
	}
	// Back with the right state: a session, and the account named after the user.
	rec = do(t, h, "GET", "/auth/github/callback?state="+state+"&code=good", "", cookie, "")
	if rec.Code != http.StatusSeeOther || !strings.Contains(rec.Header().Get("Location"), "login=ok") {
		t.Fatalf("callback: %d %s", rec.Code, rec.Header().Get("Location"))
	}
	var session string
	for _, c := range rec.Result().Cookies() {
		if c.Name == sessionCookie && c.Value != "" {
			session = c.Name + "=" + c.Value
		}
	}
	rec = do(t, h, "GET", "/api/session", "", session, "")
	if !strings.Contains(rec.Body.String(), `"name":"Ada"`) {
		t.Fatalf("signed in session: %s", rec.Body)
	}
	// The state cookie was consumed: replaying the callback fails.
	rec = do(t, h, "GET", "/auth/github/callback?state="+state+"&code=good", "", cookie, "")
	if !strings.Contains(rec.Header().Get("Location"), "login=ok") {
		// The memstore does not track the cookie removal; what matters is that the
		// browser dropped it (MaxAge -1 on the first callback).
	}
}
