package store

import (
	"context"
	"errors"
	"fmt"
	"regexp"
	"strings"
	"time"

	"github.com/jackc/pgx/v5"
)

var nameRe = regexp.MustCompile(`[^A-Za-z0-9 _-]+`)

// AccountForIdentity finds or creates the account behind an identity.
//
// Three steps, in this order, and the order is the security:
//  1. (provider, subject) already known -> that account. It never looks at
//     the address, which may have changed at the provider.
//  2. else a VERIFIED address owned by an existing account -> the identity is
//     linked to it: Google one day, GitHub the next, one account.
//  3. else a new account, named after the provider's suggestion with a
//     numeric suffix if that name is taken.
//
// Step 2 only happens with a verified address; otherwise any provider that
// let someone declare an arbitrary address could take over an account.
// One transaction: two simultaneous first sign-ins must not make two accounts.
func (s *Store) AccountForIdentity(ctx context.Context, id Identity) (Account, error) {
	email := strings.TrimSpace(strings.ToLower(id.Email))
	tx, err := s.pool.Begin(ctx)
	if err != nil {
		return Account{}, err
	}
	defer func() { _ = tx.Rollback(ctx) }()

	var acc Account
	err = tx.QueryRow(ctx, `
		select a.id, a.name from identity i join account a on a.id = i.account_id
		where i.provider = $1 and i.subject = $2`, id.Provider, id.Subject).Scan(&acc.ID, &acc.Name)
	if err == nil {
		return acc, tx.Commit(ctx)
	}
	if !errors.Is(err, pgx.ErrNoRows) {
		return Account{}, err
	}

	if id.EmailVerified && email != "" {
		err = tx.QueryRow(ctx, `
			select a.id, a.name from account_email e join account a on a.id = e.account_id
			where e.email = $1`, email).Scan(&acc.ID, &acc.Name)
		if err == nil {
			if _, err := tx.Exec(ctx, `insert into identity (provider, subject, account_id, email) values ($1, $2, $3, $4)`,
				id.Provider, id.Subject, acc.ID, email); err != nil {
				return Account{}, err
			}
			return acc, tx.Commit(ctx)
		}
		if !errors.Is(err, pgx.ErrNoRows) {
			return Account{}, err
		}
	}

	base := strings.TrimSpace(nameRe.ReplaceAllString(id.SuggestedName, ""))
	if len(base) < 2 {
		base = "user"
	}
	if len(base) > 32 {
		base = strings.TrimSpace(base[:32])
	}
	name := base
	for i := 2; ; i++ {
		var taken bool
		if err := tx.QueryRow(ctx, `select exists (select 1 from account where name = $1)`, name).Scan(&taken); err != nil {
			return Account{}, err
		}
		if !taken {
			break
		}
		name = fmt.Sprintf("%s%d", base, i)
	}
	if err := tx.QueryRow(ctx, `insert into account (name) values ($1) returning id, name`, name).Scan(&acc.ID, &acc.Name); err != nil {
		return Account{}, err
	}
	var stored any
	if email != "" {
		stored = email
	}
	if _, err := tx.Exec(ctx, `insert into identity (provider, subject, account_id, email) values ($1, $2, $3, $4)`,
		id.Provider, id.Subject, acc.ID, stored); err != nil {
		return Account{}, err
	}
	if id.EmailVerified && email != "" {
		if _, err := tx.Exec(ctx, `insert into account_email (email, account_id) values ($1, $2) on conflict (email) do nothing`,
			email, acc.ID); err != nil {
			return Account{}, err
		}
	}
	return acc, tx.Commit(ctx)
}

func (s *Store) CreateSession(ctx context.Context, hash []byte, accountID int64, ttl time.Duration) error {
	_, err := s.pool.Exec(ctx, `insert into session (id_hash, account_id, expires_at) values ($1, $2, $3)`,
		hash, accountID, time.Now().Add(ttl))
	return err
}

func (s *Store) SessionAccount(ctx context.Context, hash []byte) (Account, error) {
	var acc Account
	err := s.pool.QueryRow(ctx, `
		select a.id, a.name from session s join account a on a.id = s.account_id
		where s.id_hash = $1 and s.expires_at > now()`, hash).Scan(&acc.ID, &acc.Name)
	if errors.Is(err, pgx.ErrNoRows) {
		return Account{}, ErrNotFound
	}
	return acc, err
}

func (s *Store) DeleteSession(ctx context.Context, hash []byte) error {
	_, err := s.pool.Exec(ctx, `delete from session where id_hash = $1`, hash)
	return err
}
