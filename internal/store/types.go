// Package store is the Postgres layer: connection, migrations, queries. Its
// types are also what the web layer speaks, so a test can stand in for it
// with a map.
package store

import (
	"context"
	"errors"
	"time"
)

var (
	ErrNotFound = errors.New("not found")
	// ErrConflict: a name already taken, or a version that moved on.
	ErrConflict = errors.New("conflict")
)

type Account struct {
	ID   int64
	Name string
}

// Identity: what a provider says about someone.
type Identity struct {
	Provider string // "dev" | "google" | "github"
	Subject  string // the stable identifier at the provider
	Email    string
	// EmailVerified gates ALL linking by address: a provider that does not
	// attest it must never give access to an existing account.
	EmailVerified bool
	SuggestedName string
}

type Project struct {
	ID      int64
	Account int64
	Name    string
	// The scene text. Empty in listings.
	Text string
	// Bumped on every update: the ETag of the project.
	Version int64
	Updated time.Time
	Bytes   int
}

// Storage is what the web layer needs from a store.
type Storage interface {
	// The account behind an identity: known (provider, subject), else an
	// account owning the same verified address, else a new one.
	AccountForIdentity(ctx context.Context, id Identity) (Account, error)
	CreateSession(ctx context.Context, hash []byte, accountID int64, ttl time.Duration) error
	// ErrNotFound when the session does not exist or has expired.
	SessionAccount(ctx context.Context, hash []byte) (Account, error)
	DeleteSession(ctx context.Context, hash []byte) error

	ListProjects(ctx context.Context, account int64) ([]Project, error)
	GetProject(ctx context.Context, account, id int64) (Project, error)
	// ErrConflict when the account already has a project of that name.
	CreateProject(ctx context.Context, account int64, name, text string) (Project, error)
	// ifVersion > 0 demands that version; ErrConflict otherwise (or on a taken name).
	UpdateProject(ctx context.Context, account, id int64, name, text string, ifVersion int64) (Project, error)
	DeleteProject(ctx context.Context, account, id int64) error
}
