// ─── Auth Service ─────────────────────────────────────────────────────────────
import request, { saveUser, clearSession, markSession } from './api';

/** POST /auth/register */
export async function registerUser({ full_name, email, password }) {
  const data = await request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ full_name, email, password }),
  });
  markSession();                          // mark that a session cookie was set
  if (data?.user) saveUser(data.user);
  return data;
}

/** POST /auth/login — tokens set as HttpOnly cookies, returns { user } */
export async function loginUser({ email, password }) {
  const data = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  markSession();                          // mark that a session cookie was set
  if (data?.user) saveUser(data.user);
  return data;
}

/** GET /auth/profile */
export async function getProfile() {
  return request('/auth/profile');
}

/** POST /auth/logout */
export async function logoutUser() {
  try {
    await request('/auth/logout', { method: 'POST' });
  } catch {
    // Clear locally even if server call fails
  } finally {
    clearSession();
  }
}
