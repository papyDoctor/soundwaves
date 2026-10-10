// Command soundwaves serves the SoundWaves web app and keeps its users'
// projects.
//
// One static binary: deploying is copying a file. The migrations are embedded
// and applied at start-up, so the schema cannot drift from the code. Without
// SW_DATABASE_URL the server runs in static mode: it serves the app, the
// simulation runs entirely in the browser, and scenes are saved as files.
package main

import (
	"context"
	"errors"
	"flag"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"soundwaves/internal/auth"
	"soundwaves/internal/config"
	"soundwaves/internal/store"
	"soundwaves/internal/web"
)

// buildProviders builds only the configured ones. Google's OIDC discovery
// happens here, at start-up: a bad configuration must show now, not at the
// first sign-in.
func buildProviders(cfg *config.Config) (map[string]auth.Provider, error) {
	out := map[string]auth.Provider{}
	if cfg.GoogleClientID != "" {
		ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
		defer cancel()
		g, err := auth.NewGoogle(ctx, cfg.GoogleClientID, cfg.GoogleClientSecret, cfg.BaseURL+"/auth/google/callback")
		if err != nil {
			return nil, err
		}
		out["google"] = g
	}
	if cfg.GitHubClientID != "" {
		out["github"] = auth.NewGitHub(cfg.GitHubClientID, cfg.GitHubClientSecret, cfg.BaseURL+"/auth/github/callback")
	}
	for name := range out {
		slog.Info("identity provider", "name", name)
	}
	return out, nil
}

func main() {
	migrateOnly := flag.Bool("migrate", false, "apply the migrations and exit")
	flag.Parse()
	slog.SetDefault(slog.New(slog.NewTextHandler(os.Stderr, &slog.HandlerOptions{Level: slog.LevelInfo})))
	if err := run(*migrateOnly); err != nil {
		slog.Error("stopped", "err", err)
		os.Exit(1)
	}
}

func run(migrateOnly bool) error {
	cfg := config.Load()
	var storage store.Storage
	if cfg.DatabaseURL != "" {
		ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
		defer cancel()
		st, err := store.Open(ctx, cfg.DatabaseURL)
		if err != nil {
			return err
		}
		defer st.Close()
		if err := st.Migrate(ctx); err != nil {
			return err
		}
		if migrateOnly {
			slog.Info("migrations up to date")
			return nil
		}
		storage = st
		go func() {
			for {
				c, cancel := context.WithTimeout(context.Background(), 30*time.Second)
				if err := st.PurgeExpired(c); err != nil {
					slog.Warn("purge", "err", err)
				}
				cancel()
				time.Sleep(time.Hour)
			}
		}()
	} else {
		slog.Info("no SW_DATABASE_URL: static mode, no accounts, no saved projects")
	}

	providers, err := buildProviders(cfg)
	if err != nil {
		return err
	}
	if storage != nil && len(providers) == 0 && !cfg.Dev {
		slog.Warn("no identity provider and no dev sign-in: nobody can sign in")
	}

	srv := &http.Server{
		Addr:              cfg.Addr,
		Handler:           web.New(cfg, storage, providers).Handler(),
		ReadHeaderTimeout: 10 * time.Second,
		WriteTimeout:      60 * time.Second,
		IdleTimeout:       120 * time.Second,
	}
	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt, syscall.SIGTERM)
	go func() {
		slog.Info("listening", "addr", cfg.Addr, "dev", cfg.Dev, "storage", storage != nil)
		if err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			slog.Error("server", "err", err)
			stop <- syscall.SIGTERM
		}
	}()
	<-stop
	shutdown, cancel := context.WithTimeout(context.Background(), 20*time.Second)
	defer cancel()
	return srv.Shutdown(shutdown)
}
