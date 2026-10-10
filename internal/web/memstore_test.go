package web

import (
	"context"
	"sync"
	"time"

	"soundwaves/internal/store"
)

// memStore: the Storage interface over maps, so the API is tested without a
// database. The Postgres store has its own tests behind SW_TEST_DATABASE_URL.
type memStore struct {
	mu       sync.Mutex
	accounts map[int64]store.Account
	ids      map[string]int64 // provider/subject -> account
	sessions map[string]sess
	projects map[int64]store.Project
	next     int64
}

type sess struct {
	account int64
	expires time.Time
}

func newMemStore() *memStore {
	return &memStore{accounts: map[int64]store.Account{}, ids: map[string]int64{}, sessions: map[string]sess{}, projects: map[int64]store.Project{}}
}

func (m *memStore) AccountForIdentity(_ context.Context, id store.Identity) (store.Account, error) {
	m.mu.Lock()
	defer m.mu.Unlock()
	if a, ok := m.ids[id.Provider+"/"+id.Subject]; ok {
		return m.accounts[a], nil
	}
	m.next++
	acc := store.Account{ID: m.next, Name: id.SuggestedName}
	m.accounts[acc.ID] = acc
	m.ids[id.Provider+"/"+id.Subject] = acc.ID
	return acc, nil
}

func (m *memStore) CreateSession(_ context.Context, hash []byte, account int64, ttl time.Duration) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	m.sessions[string(hash)] = sess{account, time.Now().Add(ttl)}
	return nil
}

func (m *memStore) SessionAccount(_ context.Context, hash []byte) (store.Account, error) {
	m.mu.Lock()
	defer m.mu.Unlock()
	s, ok := m.sessions[string(hash)]
	if !ok || s.expires.Before(time.Now()) {
		return store.Account{}, store.ErrNotFound
	}
	return m.accounts[s.account], nil
}

func (m *memStore) DeleteSession(_ context.Context, hash []byte) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	delete(m.sessions, string(hash))
	return nil
}

func (m *memStore) ListProjects(_ context.Context, account int64) ([]store.Project, error) {
	m.mu.Lock()
	defer m.mu.Unlock()
	out := []store.Project{}
	for _, p := range m.projects {
		if p.Account == account {
			p.Text = ""
			out = append(out, p)
		}
	}
	return out, nil
}

func (m *memStore) GetProject(_ context.Context, account, id int64) (store.Project, error) {
	m.mu.Lock()
	defer m.mu.Unlock()
	p, ok := m.projects[id]
	if !ok || p.Account != account {
		return store.Project{}, store.ErrNotFound
	}
	return p, nil
}

func (m *memStore) CreateProject(_ context.Context, account int64, name, text string) (store.Project, error) {
	m.mu.Lock()
	defer m.mu.Unlock()
	for _, p := range m.projects {
		if p.Account == account && p.Name == name {
			return store.Project{}, store.ErrConflict
		}
	}
	m.next++
	p := store.Project{ID: m.next, Account: account, Name: name, Text: text, Version: 1, Updated: time.Now(), Bytes: len(text)}
	m.projects[p.ID] = p
	return p, nil
}

func (m *memStore) UpdateProject(_ context.Context, account, id int64, name, text string, ifVersion int64) (store.Project, error) {
	m.mu.Lock()
	defer m.mu.Unlock()
	p, ok := m.projects[id]
	if !ok || p.Account != account {
		return store.Project{}, store.ErrNotFound
	}
	if ifVersion != 0 && ifVersion != p.Version {
		return store.Project{}, store.ErrConflict
	}
	for _, q := range m.projects {
		if q.Account == account && q.Name == name && q.ID != id {
			return store.Project{}, store.ErrConflict
		}
	}
	p.Name, p.Text, p.Version, p.Updated, p.Bytes = name, text, p.Version+1, time.Now(), len(text)
	m.projects[id] = p
	return p, nil
}

func (m *memStore) DeleteProject(_ context.Context, account, id int64) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	p, ok := m.projects[id]
	if !ok || p.Account != account {
		return store.ErrNotFound
	}
	delete(m.projects, id)
	return nil
}
