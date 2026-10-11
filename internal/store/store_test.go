package store

import (
	"context"
	"errors"
	"os"
	"testing"
	"time"
)

// The Postgres store, on a real database: SW_TEST_DATABASE_URL names it (see
// `make test-db`). Without it the test skips, and the invariants the database
// is supposed to hold are checked by nobody — so run it before a release.
func TestPostgresStore(t *testing.T) {
	url := os.Getenv("SW_TEST_DATABASE_URL")
	if url == "" {
		t.Skip("SW_TEST_DATABASE_URL not set")
	}
	ctx := context.Background()
	st, err := Open(ctx, url)
	if err != nil {
		t.Fatal(err)
	}
	defer st.Close()
	if err := st.Migrate(ctx); err != nil {
		t.Fatal(err)
	}
	if _, err := st.pool.Exec(ctx, `truncate project, session, identity, account, share restart identity cascade`); err != nil {
		t.Fatal(err)
	}

	alice, err := st.AccountForIdentity(ctx, Identity{Provider: "dev", Subject: "alice", SuggestedName: "alice"})
	if err != nil {
		t.Fatal(err)
	}
	again, _ := st.AccountForIdentity(ctx, Identity{Provider: "dev", Subject: "alice", SuggestedName: "alice"})
	if again.ID != alice.ID {
		t.Fatal("the same identity must give the same account")
	}
	other, _ := st.AccountForIdentity(ctx, Identity{Provider: "google", Subject: "123", SuggestedName: "alice", Email: "A@x.org", EmailVerified: true})
	if other.ID == alice.ID || other.Name != "alice2" {
		t.Fatalf("a taken name gets a suffix: %+v", other)
	}
	// Another provider with the same VERIFIED address joins that account; unverified does not.
	linked, _ := st.AccountForIdentity(ctx, Identity{Provider: "github", Subject: "77", SuggestedName: "al", Email: "a@x.org", EmailVerified: true})
	if linked.ID != other.ID {
		t.Fatalf("verified address must link: %+v vs %+v", linked, other)
	}
	stranger, _ := st.AccountForIdentity(ctx, Identity{Provider: "github", Subject: "78", SuggestedName: "al", Email: "a@x.org", EmailVerified: false})
	if stranger.ID == other.ID {
		t.Fatal("an unverified address must not link")
	}

	hash := []byte("0123456789abcdef0123456789abcdef")
	if err := st.CreateSession(ctx, hash, alice.ID, time.Hour); err != nil {
		t.Fatal(err)
	}
	if acc, err := st.SessionAccount(ctx, hash); err != nil || acc.ID != alice.ID {
		t.Fatalf("session: %v %+v", err, acc)
	}
	expired := []byte("fedcba9876543210fedcba9876543210")
	_ = st.CreateSession(ctx, expired, alice.ID, -time.Minute)
	if _, err := st.SessionAccount(ctx, expired); !errors.Is(err, ErrNotFound) {
		t.Fatal("an expired session must not resolve")
	}
	if err := st.PurgeExpired(ctx); err != nil {
		t.Fatal(err)
	}
	_ = st.DeleteSession(ctx, hash)
	if _, err := st.SessionAccount(ctx, hash); !errors.Is(err, ErrNotFound) {
		t.Fatal("a deleted session must not resolve")
	}

	p, err := st.CreateProject(ctx, alice.ID, "room", "soundwaves 1\n")
	if err != nil || p.Version != 1 || p.Bytes != 13 {
		t.Fatalf("create: %v %+v", err, p)
	}
	if _, err := st.CreateProject(ctx, alice.ID, "room", ""); !errors.Is(err, ErrConflict) {
		t.Fatal("a duplicate name must conflict")
	}
	if _, err := st.CreateProject(ctx, other.ID, "room", ""); err != nil {
		t.Fatal("another account may use the same name")
	}
	if _, err := st.UpdateProject(ctx, alice.ID, p.ID, "room", "v2", 5); !errors.Is(err, ErrConflict) {
		t.Fatal("a stale version must conflict")
	}
	if _, err := st.UpdateProject(ctx, other.ID, p.ID, "room", "v2", 0); !errors.Is(err, ErrNotFound) {
		t.Fatal("another account must not see the project")
	}
	p2, err := st.UpdateProject(ctx, alice.ID, p.ID, "room2", "v2", 1)
	if err != nil || p2.Version != 2 || p2.Text != "v2" {
		t.Fatalf("update: %v %+v", err, p2)
	}
	list, _ := st.ListProjects(ctx, alice.ID)
	if len(list) != 1 || list[0].Name != "room2" || list[0].Text != "" {
		t.Fatalf("list: %+v", list)
	}
	got, _ := st.GetProject(ctx, alice.ID, p.ID)
	if got.Text != "v2" {
		t.Fatalf("get: %+v", got)
	}
	if err := st.DeleteProject(ctx, alice.ID, p.ID); err != nil {
		t.Fatal(err)
	}
	if err := st.DeleteProject(ctx, alice.ID, p.ID); !errors.Is(err, ErrNotFound) {
		t.Fatal("deleting twice must say not found")
	}

	// Anonymous shares.
	if err := st.CreateShare(ctx, "abcdefghijkl", "s", "text", []byte("k")); err != nil {
		t.Fatal(err)
	}
	if sh, err := st.GetShare(ctx, "abcdefghijkl"); err != nil || sh.Text != "text" {
		t.Fatalf("get share: %v %+v", err, sh)
	}
	if err := st.UpdateShare(ctx, "abcdefghijkl", "s", "v2", []byte("wrong")); !errors.Is(err, ErrNotFound) {
		t.Fatal("a wrong key must not update")
	}
	if err := st.UpdateShare(ctx, "abcdefghijkl", "s", "v2", []byte("k")); err != nil {
		t.Fatal(err)
	}
	if _, err := st.GetShare(ctx, "nope"); !errors.Is(err, ErrNotFound) {
		t.Fatal("unknown share must be not found")
	}
}
