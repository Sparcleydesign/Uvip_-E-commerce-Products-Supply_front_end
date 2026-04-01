// ─── Centralised API Client ───────────────────────────────────────────────────
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

// Auth routes handle their own errors — never intercept their 401s
const AUTH_ENDPOINTS = ['/auth/login', '/auth/register', '/auth/refresh', '/auth/logout', '/auth/profile'];

/**
 * Core fetch wrapper — sends HttpOnly cookies automatically,
 * throws structured errors. Does NOT auto-redirect on 401 —
 * the dashboard layout route guard handles unauthenticated redirects.
 */
async function request(endpoint, options = {}, _retry = true) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    credentials: 'include',   // sends uvip_access / uvip_refresh cookies
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  // Silent refresh only for protected non-auth routes mid-session
  const isAuthEndpoint = AUTH_ENDPOINTS.some((e) => endpoint.startsWith(e));
  if (res.status === 401 && _retry && !isAuthEndpoint) {
    const refreshed = await tryRefresh();
    if (refreshed) return request(endpoint, options, false);
    // Refresh failed — throw so callers can handle (e.g. dashboard redirects)
    throw new Error('Session expired. Please log in again.');
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg = data?.message || `Request failed with status ${res.status}`;
    throw new Error(Array.isArray(msg) ? msg.join(', ') : msg);
  }

  return data;
}

async function tryRefresh() {
  try {
    const res = await fetch(`${BASE_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
    return res.ok;
  } catch {
    return false;
  }
}

// ─── Session flag (non-sensitive — just tells us whether to call getProfile) ──
export function markSession()  {
  if (typeof window !== 'undefined') localStorage.setItem('uvip_session', '1');
}
export function clearSession() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('uvip_session');
    localStorage.removeItem('uvip_user');
  }
}
export function hasSession() {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('uvip_session') === '1';
}

export function saveUser(user) {
  if (typeof window !== 'undefined')
    localStorage.setItem('uvip_user', JSON.stringify(user));
}
export function getStoredUser() {
  try { return JSON.parse(localStorage.getItem('uvip_user') || 'null'); }
  catch { return null; }
}
export function clearUser() { clearSession(); }

export { request };
export default request;
