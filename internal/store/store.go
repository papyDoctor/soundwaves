package store

import (
	"context"
	"embed"
	"fmt"
	"log/slog"
	"sort"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

//go:embed all:migrations
var migrations embed.FS

type Store struct {
	pool *pgxpool.Pool
}

var _ Storage = (*Store)(nil)

func Open(ctx context.Context, url string) (*Store, error) {
	cfg, err := pgxpool.ParseConfig(url)
	if err != nil {
		return nil, fmt.Errorf("invalid database url: %w", err)
	}
	// Short but not zero: an unreachable database must say so at start-up,
	// not to the first user.
	cfg.ConnConfig.ConnectTimeout = 5 * time.Second
	pool, err := pgxpool.NewWithConfig(ctx, cfg)
	if err != nil {
		return nil, err
	}
	if err := pool.Ping(ctx); err != nil {
		pool.Close()
		return nil, fmt.Errorf("database unreachable: %w", err)
	}
	return &Store{pool: pool}, nil
}

func (s *Store) Close() { s.pool.Close() }

// Migrate applies the files of migrations/ in name order, each once. They are
// EMBEDDED in the binary: deploying is copying a file, and the schema cannot
// drift from the code that uses it.
func (s *Store) Migrate(ctx context.Context) error {
	_, err := s.pool.Exec(ctx, `
		create table if not exists schema_migration (
			name       text primary key,
			applied_at timestamptz not null default now()
		)`)
	if err != nil {
		return err
	}
	entries, err := migrations.ReadDir("migrations")
	if err != nil {
		return err
	}
	names := make([]string, 0, len(entries))
	for _, e := range entries {
		if !e.IsDir() {
			names = append(names, e.Name())
		}
	}
	sort.Strings(names)
	for _, name := range names {
		var seen bool
		if err := s.pool.QueryRow(ctx, `select exists (select 1 from schema_migration where name = $1)`, name).Scan(&seen); err != nil {
			return err
		}
		if seen {
			continue
		}
		sqlText, err := migrations.ReadFile("migrations/" + name)
		if err != nil {
			return err
		}
		// The migration and its record in one transaction: a crash between
		// the two would replay it at the next start.
		tx, err := s.pool.Begin(ctx)
		if err != nil {
			return err
		}
		if _, err := tx.Exec(ctx, string(sqlText)); err != nil {
			_ = tx.Rollback(ctx)
			return fmt.Errorf("migration %s: %w", name, err)
		}
		if _, err := tx.Exec(ctx, `insert into schema_migration (name) values ($1)`, name); err != nil {
			_ = tx.Rollback(ctx)
			return err
		}
		if err := tx.Commit(ctx); err != nil {
			return err
		}
		slog.Info("migration applied", "name", name)
	}
	return nil
}

// PurgeExpired drops the sessions past their expiry, and the shared scenes
// nobody opened for a year.
func (s *Store) PurgeExpired(ctx context.Context) error {
	if _, err := s.pool.Exec(ctx, `delete from session where expires_at < now()`); err != nil {
		return err
	}
	_, err := s.pool.Exec(ctx, `delete from share where accessed_at < now() - interval '365 days'`)
	return err
}
