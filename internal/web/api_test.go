package web

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"soundwaves/internal/config"
)

func testServer(t *testing.T) (http.Handler, *memStore) {
	t.Helper()
	cfg := config.Load()
	cfg.Dev = true
	cfg.MaxProjects = 3
	st := newMemStore()
	return New(cfg, st, nil).Handler(), st
}

// do sends a request with an optional JSON body, cookie and If-Match.
func do(t *testing.T, h http.Handler, method, path, body, cookie, ifMatch string) *httptest.ResponseRecorder {
	t.Helper()
	req := httptest.NewRequest(method, path, strings.NewReader(body))
	if body != "" {
		req.Header.Set("Content-Type", "application/json")
	}
	if cookie != "" {
		req.Header.Set("Cookie", cookie)
	}
	if ifMatch != "" {
		req.Header.Set("If-Match", ifMatch)
	}
	rec := httptest.NewRecorder()
	h.ServeHTTP(rec, req)
	return rec
}

func signIn(t *testing.T, h http.Handler, name string) string {
	t.Helper()
	rec := do(t, h, "POST", "/api/dev-login", `{"name":"`+name+`"}`, "", "")
	if rec.Code != http.StatusOK {
		t.Fatalf("dev-login: %d %s", rec.Code, rec.Body)
	}
	for _, c := range rec.Result().Cookies() {
		if c.Name == sessionCookie {
			return c.Name + "=" + c.Value
		}
	}
	t.Fatal("no session cookie")
	return ""
}

func TestSessionAndDevLogin(t *testing.T) {
	h, _ := testServer(t)
	rec := do(t, h, "GET", "/api/session", "", "", "")
	if rec.Code != http.StatusOK || !strings.Contains(rec.Body.String(), `"account":null`) {
		t.Fatalf("anonymous session: %d %s", rec.Code, rec.Body)
	}
	if do(t, h, "GET", "/api/projects", "", "", "").Code != http.StatusUnauthorized {
		t.Fatal("anonymous listing should be 401")
	}
	if do(t, h, "POST", "/api/dev-login", `{"name":"!"}`, "", "").Code != http.StatusBadRequest {
		t.Fatal("a bad name should be refused")
	}
	c := signIn(t, h, "alice")
	rec = do(t, h, "GET", "/api/session", "", c, "")
	var got sessionJSON
	_ = json.Unmarshal(rec.Body.Bytes(), &got)
	if got.Account == nil || got.Account.Name != "alice" || !got.Storage {
		t.Fatalf("session: %s", rec.Body)
	}
	if do(t, h, "POST", "/api/logout", "", c, "").Code != http.StatusNoContent {
		t.Fatal("logout")
	}
	if do(t, h, "GET", "/api/projects", "", c, "").Code != http.StatusUnauthorized {
		t.Fatal("the session should be gone after logout")
	}
}

func TestProjectsCRUD(t *testing.T) {
	h, _ := testServer(t)
	alice := signIn(t, h, "alice")
	bob := signIn(t, h, "bob")

	rec := do(t, h, "POST", "/api/projects", `{"name":"room","text":"soundwaves 1\n"}`, alice, "")
	if rec.Code != http.StatusCreated {
		t.Fatalf("create: %d %s", rec.Code, rec.Body)
	}
	var p projectJSON
	_ = json.Unmarshal(rec.Body.Bytes(), &p)
	if p.ID == 0 || p.Version != 1 || rec.Header().Get("ETag") != `"v1"` {
		t.Fatalf("created: %+v etag %q", p, rec.Header().Get("ETag"))
	}
	if do(t, h, "POST", "/api/projects", `{"name":"room","text":""}`, alice, "").Code != http.StatusConflict {
		t.Fatal("a duplicate name should be 409")
	}
	if do(t, h, "POST", "/api/projects", `{"name":"bad/name","text":""}`, alice, "").Code != http.StatusBadRequest {
		t.Fatal("a bad name should be 400")
	}
	id := strings.TrimRight(strings.SplitN(rec.Body.String(), `"id":`, 2)[1], "\n")
	id = id[:strings.IndexAny(id, ",}")]

	// Bob sees nothing of Alice's.
	if do(t, h, "GET", "/api/projects/"+id, "", bob, "").Code != http.StatusNotFound {
		t.Fatal("cross-account read should be 404")
	}
	if do(t, h, "PUT", "/api/projects/"+id, `{"name":"room","text":"x"}`, bob, "").Code != http.StatusNotFound {
		t.Fatal("cross-account write should be 404")
	}

	// A stale ETag is refused; the right one goes through and bumps the version.
	if do(t, h, "PUT", "/api/projects/"+id, `{"name":"room","text":"v2"}`, alice, `"v7"`).Code != http.StatusPreconditionFailed {
		t.Fatal("stale If-Match should be 412")
	}
	rec = do(t, h, "PUT", "/api/projects/"+id, `{"name":"room2","text":"v2"}`, alice, `"v1"`)
	if rec.Code != http.StatusOK || rec.Header().Get("ETag") != `"v2"` {
		t.Fatalf("update: %d %s", rec.Code, rec.Body)
	}
	rec = do(t, h, "GET", "/api/projects/"+id, "", alice, "")
	_ = json.Unmarshal(rec.Body.Bytes(), &p)
	if p.Name != "room2" || p.Text != "v2" || p.Version != 2 {
		t.Fatalf("read back: %+v", p)
	}

	// The listing carries no text; the quota holds.
	rec = do(t, h, "GET", "/api/projects", "", alice, "")
	if !strings.Contains(rec.Body.String(), `"room2"`) || strings.Contains(rec.Body.String(), `"text"`) {
		t.Fatalf("list: %s", rec.Body)
	}
	do(t, h, "POST", "/api/projects", `{"name":"b","text":""}`, alice, "")
	do(t, h, "POST", "/api/projects", `{"name":"c","text":""}`, alice, "")
	if do(t, h, "POST", "/api/projects", `{"name":"d","text":""}`, alice, "").Code != http.StatusForbidden {
		t.Fatal("the fourth project should hit the quota")
	}

	if do(t, h, "DELETE", "/api/projects/"+id, "", alice, "").Code != http.StatusNoContent {
		t.Fatal("delete")
	}
	if do(t, h, "GET", "/api/projects/"+id, "", alice, "").Code != http.StatusNotFound {
		t.Fatal("deleted project should be gone")
	}
}

// Static mode: the app is served, the API says there is no storage.
func TestStaticMode(t *testing.T) {
	cfg := config.Load()
	h := New(cfg, nil, nil).Handler()
	rec := do(t, h, "GET", "/api/session", "", "", "")
	if rec.Code != http.StatusOK || !strings.Contains(rec.Body.String(), `"storage":false`) {
		t.Fatalf("static session: %d %s", rec.Code, rec.Body)
	}
	if do(t, h, "GET", "/api/projects", "", "", "").Code != http.StatusNotFound {
		t.Fatal("no project routes in static mode")
	}
}

// Anyone can share a scene and open a link; only the key holder updates it.
func TestAnonymousShare(t *testing.T) {
	h, _ := testServer(t)
	rec := do(t, h, "POST", "/api/share", `{"name":"room","text":"soundwaves 1\n"}`, "", "")
	if rec.Code != http.StatusCreated {
		t.Fatalf("share: %d %s", rec.Code, rec.Body)
	}
	var sh shareJSON
	_ = json.Unmarshal(rec.Body.Bytes(), &sh)
	if len(sh.ID) != 12 || sh.Key == "" {
		t.Fatalf("share json: %+v", sh)
	}
	rec = do(t, h, "GET", "/api/share/"+sh.ID, "", "", "")
	if rec.Code != http.StatusOK || !strings.Contains(rec.Body.String(), `"text":"soundwaves 1\n"`) || strings.Contains(rec.Body.String(), `"key"`) {
		t.Fatalf("read: %d %s", rec.Code, rec.Body)
	}
	if do(t, h, "GET", "/api/share/nope", "", "", "").Code != http.StatusNotFound {
		t.Fatal("bad id should be 404")
	}
	if do(t, h, "PUT", "/api/share/"+sh.ID, `{"name":"room","text":"v2","key":"wrong"}`, "", "").Code != http.StatusForbidden {
		t.Fatal("wrong key should be 403")
	}
	if do(t, h, "PUT", "/api/share/"+sh.ID, `{"name":"room2","text":"v2","key":"`+sh.Key+`"}`, "", "").Code != http.StatusOK {
		t.Fatal("right key should update")
	}
	rec = do(t, h, "GET", "/api/share/"+sh.ID, "", "", "")
	if !strings.Contains(rec.Body.String(), `"name":"room2"`) {
		t.Fatalf("updated: %s", rec.Body)
	}
}
