package store

import (
	"context"
	"errors"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgconn"
)

func isUniqueViolation(err error) bool {
	var pgErr *pgconn.PgError
	return errors.As(err, &pgErr) && pgErr.Code == "23505"
}

func (s *Store) ListProjects(ctx context.Context, account int64) ([]Project, error) {
	rows, err := s.pool.Query(ctx, `
		select id, account_id, name, version, updated_at, octet_length(text)
		from project where account_id = $1 order by lower(name)`, account)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	out := []Project{}
	for rows.Next() {
		var p Project
		if err := rows.Scan(&p.ID, &p.Account, &p.Name, &p.Version, &p.Updated, &p.Bytes); err != nil {
			return nil, err
		}
		out = append(out, p)
	}
	return out, rows.Err()
}

func (s *Store) GetProject(ctx context.Context, account, id int64) (Project, error) {
	var p Project
	err := s.pool.QueryRow(ctx, `
		select id, account_id, name, text, version, updated_at, octet_length(text)
		from project where account_id = $1 and id = $2`, account, id).
		Scan(&p.ID, &p.Account, &p.Name, &p.Text, &p.Version, &p.Updated, &p.Bytes)
	if errors.Is(err, pgx.ErrNoRows) {
		return Project{}, ErrNotFound
	}
	return p, err
}

func (s *Store) CreateProject(ctx context.Context, account int64, name, text string) (Project, error) {
	var p Project
	err := s.pool.QueryRow(ctx, `
		insert into project (account_id, name, text) values ($1, $2, $3)
		returning id, account_id, name, text, version, updated_at, octet_length(text)`, account, name, text).
		Scan(&p.ID, &p.Account, &p.Name, &p.Text, &p.Version, &p.Updated, &p.Bytes)
	if isUniqueViolation(err) {
		return Project{}, ErrConflict
	}
	return p, err
}

func (s *Store) UpdateProject(ctx context.Context, account, id int64, name, text string, ifVersion int64) (Project, error) {
	var p Project
	err := s.pool.QueryRow(ctx, `
		update project set name = $3, text = $4, version = version + 1, updated_at = now()
		where account_id = $1 and id = $2 and ($5 = 0 or version = $5)
		returning id, account_id, name, text, version, updated_at, octet_length(text)`, account, id, name, text, ifVersion).
		Scan(&p.ID, &p.Account, &p.Name, &p.Text, &p.Version, &p.Updated, &p.Bytes)
	if isUniqueViolation(err) {
		return Project{}, ErrConflict
	}
	if errors.Is(err, pgx.ErrNoRows) {
		// Either no such project, or the version moved: tell them apart.
		var exists bool
		if e := s.pool.QueryRow(ctx, `select exists (select 1 from project where account_id = $1 and id = $2)`, account, id).Scan(&exists); e != nil {
			return Project{}, e
		}
		if exists {
			return Project{}, ErrConflict
		}
		return Project{}, ErrNotFound
	}
	return p, err
}

func (s *Store) DeleteProject(ctx context.Context, account, id int64) error {
	tag, err := s.pool.Exec(ctx, `delete from project where account_id = $1 and id = $2`, account, id)
	if err != nil {
		return err
	}
	if tag.RowsAffected() == 0 {
		return ErrNotFound
	}
	return nil
}

func (s *Store) CreateShare(ctx context.Context, id, name, text string, editKeyHash []byte) error {
	_, err := s.pool.Exec(ctx, `insert into share (id, name, text, edit_key_hash) values ($1, $2, $3, $4)`, id, name, text, editKeyHash)
	return err
}

func (s *Store) GetShare(ctx context.Context, id string) (Share, error) {
	var sh Share
	err := s.pool.QueryRow(ctx, `
		update share set accessed_at = now() where id = $1
		returning id, name, text, created_at`, id).Scan(&sh.ID, &sh.Name, &sh.Text, &sh.Created)
	if errors.Is(err, pgx.ErrNoRows) {
		return Share{}, ErrNotFound
	}
	return sh, err
}

func (s *Store) UpdateShare(ctx context.Context, id, name, text string, editKeyHash []byte) error {
	tag, err := s.pool.Exec(ctx, `update share set name = $2, text = $3, accessed_at = now() where id = $1 and edit_key_hash = $4`, id, name, text, editKeyHash)
	if err != nil {
		return err
	}
	if tag.RowsAffected() == 0 {
		return ErrNotFound
	}
	return nil
}
