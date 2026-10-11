// Package config reads the configuration from the environment.
//
// Nothing is hard-coded and nothing has a "secret" default: a missing secret
// is a start-up error, never a fallback that works in development and leaves
// production open.
package config

import (
	"os"
	"strconv"
	"strings"
)

type Config struct {
	Addr    string // listen address
	BaseURL string // public root, for absolute links

	// Postgres connection URL. Empty: the server runs in STATIC mode — it
	// serves the app and nothing else, no accounts, no saved projects.
	DatabaseURL string

	// The web app on disk, for development: edit the JavaScript without
	// restarting Go. Empty: the copy embedded in the binary, as in production.
	AppDir string
	// Same for the example scenes (the repository's examples/ directory).
	ExamplesDir string
	// A directory of personal scenes, listed in the Open dialog as "perso",
	// never embedded: development only, and git-ignored.
	PersoDir string

	// Development mode: offers the "dev" sign-in that creates a local account
	// from a typed name, with no identity provider. Off in production.
	Dev bool

	// Quotas, enforced server side. A client does not bound itself.
	MaxProjects     int
	MaxProjectBytes int

	// Identity providers. One without an id is simply not offered.
	GoogleClientID     string
	GoogleClientSecret string
	GitHubClientID     string
	GitHubClientSecret string
}

func Load() *Config {
	return &Config{
		Addr:            env("SW_ADDR", ":8080"),
		BaseURL:         strings.TrimRight(env("SW_BASE_URL", "http://localhost:8080"), "/"),
		DatabaseURL:     os.Getenv("SW_DATABASE_URL"),
		AppDir:          os.Getenv("SW_APP_DIR"),
		ExamplesDir:     os.Getenv("SW_EXAMPLES_DIR"),
		PersoDir:        os.Getenv("SW_PERSO_DIR"),
		Dev:             envBool("SW_DEV", true),
		MaxProjects:     envInt("SW_MAX_PROJECTS", 200),
		MaxProjectBytes: envInt("SW_MAX_PROJECT_BYTES", 1<<20),

		GoogleClientID:     os.Getenv("SW_GOOGLE_CLIENT_ID"),
		GoogleClientSecret: os.Getenv("SW_GOOGLE_CLIENT_SECRET"),
		GitHubClientID:     os.Getenv("SW_GITHUB_CLIENT_ID"),
		GitHubClientSecret: os.Getenv("SW_GITHUB_CLIENT_SECRET"),
	}
}

func env(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}

func envBool(key string, fallback bool) bool {
	v := os.Getenv(key)
	if v == "" {
		return fallback
	}
	b, err := strconv.ParseBool(v)
	if err != nil {
		return fallback
	}
	return b
}

func envInt(key string, fallback int) int {
	v := os.Getenv(key)
	if v == "" {
		return fallback
	}
	n, err := strconv.Atoi(v)
	if err != nil {
		return fallback
	}
	return n
}
