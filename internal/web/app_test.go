package web

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"soundwaves/internal/config"
)

// The embedded app serves its page at the root and refuses directory listings.
func TestAppRoutes(t *testing.T) {
	h := New(config.Load(), nil, nil).Handler()
	for _, tc := range []struct {
		path string
		code int
	}{
		{"/", http.StatusOK},
		{"/src/main.js", http.StatusOK},
		{"/examples/room.sw", http.StatusOK},
		{"/examples/index.json", http.StatusOK},
		{"/examples/nope.sw", http.StatusNotFound},
		{"/src/", http.StatusNotFound},
		{"/nope.js", http.StatusNotFound},
	} {
		rec := httptest.NewRecorder()
		h.ServeHTTP(rec, httptest.NewRequest("GET", tc.path, nil))
		if rec.Code != tc.code {
			t.Errorf("%s: got %d, want %d", tc.path, rec.Code, tc.code)
		}
	}
}
