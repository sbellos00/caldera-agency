// Client-side navigation state used to decide when the homepage intro preloader
// should play. `hydrated` starts false on every fresh document load (hard load or
// refresh) and is flipped true once the app has rendered on the client, so the
// homepage can tell a full page load apart from a client-side navigation.
let hydrated = false

export function markHydrated() {
  hydrated = true
}

export function hasHydrated() {
  return hydrated
}

// Key under which the current path is stored (in sessionStorage) so the next page
// can read where the user navigated from.
export const LAST_PATH_KEY = 'caldera:lastPath'

// Set after the homepage preloader plays once in a session. Persists across
// refreshes so the preloader only fires on the very first visit (or from flagship).
export const HOME_VISITED_KEY = 'caldera:homeVisited'
