// Package auth talks to the identity providers.
//
// Two only, Google and GitHub, written by hand rather than through a
// multi-provider library: with two, the abstraction would cost more than it
// brings, and the libraries impose their own session handling, which would
// fight the `session` table already in place.
//
// The HARD part is borrowed: verifying a signed identity token, following
// the JWKS key rotation, checking issuer, audience and expiry. That is not
// written by hand.
package auth

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strconv"
	"strings"

	"github.com/coreos/go-oidc/v3/oidc"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/github"
)

// User: the strict minimum kept from a provider.
type User struct {
	Subject       string // STABLE identifier, never the address
	Email         string
	EmailVerified bool
	Name          string // a suggested display name
}

type Provider interface {
	Name() string  // "google" | "github"
	Label() string // for the button
	AuthURL(state, challenge string) string
	Exchange(ctx context.Context, code, verifier string) (User, error)
}

// ---------------------------------------------------------------------------
// Google: full OpenID Connect
// ---------------------------------------------------------------------------

type Google struct {
	oauth    *oauth2.Config
	verifier *oidc.IDTokenVerifier
}

func NewGoogle(ctx context.Context, clientID, secret, redirect string) (*Google, error) {
	// Discovery reads Google's OIDC document: endpoints and the keys' URL.
	// Done once at start-up: a configuration failure must show there, not at
	// the first sign-in.
	p, err := oidc.NewProvider(ctx, "https://accounts.google.com")
	if err != nil {
		return nil, fmt.Errorf("google OIDC discovery: %w", err)
	}
	return &Google{
		oauth: &oauth2.Config{
			ClientID: clientID, ClientSecret: secret, Endpoint: p.Endpoint(), RedirectURL: redirect,
			// Minimal scopes: enough to identify and suggest a name.
			Scopes: []string{oidc.ScopeOpenID, "email", "profile"},
		},
		verifier: p.Verifier(&oidc.Config{ClientID: clientID}),
	}, nil
}

func (g *Google) Name() string  { return "google" }
func (g *Google) Label() string { return "Google" }

func (g *Google) AuthURL(state, challenge string) string {
	return g.oauth.AuthCodeURL(state, oauth2.SetAuthURLParam("code_challenge", challenge), oauth2.SetAuthURLParam("code_challenge_method", "S256"))
}

func (g *Google) Exchange(ctx context.Context, code, verifier string) (User, error) {
	tok, err := g.oauth.Exchange(ctx, code, oauth2.SetAuthURLParam("code_verifier", verifier))
	if err != nil {
		return User{}, fmt.Errorf("code exchange: %w", err)
	}
	raw, ok := tok.Extra("id_token").(string)
	if !ok {
		return User{}, fmt.Errorf("no identity token in the response")
	}
	// THIS is where everything is decided: signature, issuer, audience,
	// expiry. A token decoded without verification is only a claim by the caller.
	idt, err := g.verifier.Verify(ctx, raw)
	if err != nil {
		return User{}, fmt.Errorf("invalid identity token: %w", err)
	}
	var c struct {
		Email    string `json:"email"`
		Verified bool   `json:"email_verified"`
		Name     string `json:"name"`
	}
	if err := idt.Claims(&c); err != nil {
		return User{}, err
	}
	return User{Subject: idt.Subject, Email: c.Email, EmailVerified: c.Verified, Name: c.Name}, nil
}

// ---------------------------------------------------------------------------
// GitHub: OAuth 2.0 without OpenID Connect
// ---------------------------------------------------------------------------

type GitHub struct {
	oauth *oauth2.Config
}

func NewGitHub(clientID, secret, redirect string) *GitHub {
	return &GitHub{oauth: &oauth2.Config{
		ClientID: clientID, ClientSecret: secret, Endpoint: github.Endpoint, RedirectURL: redirect,
		Scopes: []string{"read:user", "user:email"},
	}}
}

func (g *GitHub) Name() string  { return "github" }
func (g *GitHub) Label() string { return "GitHub" }

func (g *GitHub) AuthURL(state, challenge string) string {
	return g.oauth.AuthCodeURL(state, oauth2.SetAuthURLParam("code_challenge", challenge), oauth2.SetAuthURLParam("code_challenge_method", "S256"))
}

func (g *GitHub) Exchange(ctx context.Context, code, verifier string) (User, error) {
	tok, err := g.oauth.Exchange(ctx, code, oauth2.SetAuthURLParam("code_verifier", verifier))
	if err != nil {
		return User{}, fmt.Errorf("code exchange: %w", err)
	}
	client := g.oauth.Client(ctx, tok)
	var prof struct {
		ID    int64  `json:"id"`
		Login string `json:"login"`
		Name  string `json:"name"`
	}
	if err := getJSON(ctx, client, "https://api.github.com/user", &prof); err != nil {
		return User{}, err
	}
	if prof.ID == 0 {
		return User{}, fmt.Errorf("GitHub profile without an id")
	}
	name := prof.Name
	if name == "" {
		name = prof.Login
	}
	u := User{Subject: strconv.FormatInt(prof.ID, 10), Name: name}
	// The profile's address may be hidden or unverified: only the primary
	// VERIFIED one counts, and it lives on another endpoint.
	var emails []struct {
		Email    string `json:"email"`
		Primary  bool   `json:"primary"`
		Verified bool   `json:"verified"`
	}
	if err := getJSON(ctx, client, "https://api.github.com/user/emails", &emails); err != nil {
		return u, nil // not blocking: an account without an address is usable
	}
	for _, e := range emails {
		if e.Primary && e.Verified {
			u.Email, u.EmailVerified = e.Email, true
			break
		}
	}
	return u, nil
}

func getJSON(ctx context.Context, c *http.Client, url string, out any) error {
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
	if err != nil {
		return err
	}
	req.Header.Set("Accept", "application/vnd.github+json")
	resp, err := c.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	if resp.StatusCode/100 != 2 {
		detail, _ := io.ReadAll(io.LimitReader(resp.Body, 512))
		return fmt.Errorf("%s: %s: %s", url, resp.Status, strings.TrimSpace(string(detail)))
	}
	return json.NewDecoder(io.LimitReader(resp.Body, 1<<20)).Decode(out)
}
