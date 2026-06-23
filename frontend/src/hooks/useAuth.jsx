/**
 * useAuth.jsx
 * Central auth hook — reads/writes the admin:session localStorage key.
 * All components should use this instead of reading localStorage directly.
 */

const SESSION_KEY = 'admin:session';

/** Read the current session object from storage. Returns {} if not logged in. */
export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || '{}');
  } catch {
    return {};
  }
}

/** Check whether there is a valid active session. */
export function isLoggedIn() {
  const session = getSession();
  return Boolean(session.id && session.role);
}

/** Returns true when the logged-in user has the Admin role. */
export function isAdmin() {
  return getSession().role === 'Admin';
}

/** Returns true when the logged-in user has the Doctor role. */
export function isDoctor() {
  return getSession().role === 'Doctor';
}

/** Persist a user object returned by the backend as the active session. */
export function setSession(user) {
  const session = { id: user.adminId, role: user.role, dbId: user.id };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

/** Clear the session (logout). */
export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

/**
 * React hook that returns the current session and a logout function.
 * Components that need to re-render on session changes can use this.
 */
import { useState, useCallback } from 'react';

export default function useAuth() {
  const [session, setSessionState] = useState(getSession);

  const login = useCallback((user) => {
    setSession(user);
    setSessionState(getSession());
  }, []);

  const logoutUser = useCallback(() => {
    logout();
    setSessionState({});
  }, []);

  return {
    session,
    isLoggedIn: Boolean(session.id && session.role),
    isAdmin: session.role === 'Admin',
    isDoctor: session.role === 'Doctor',
    login,
    logout: logoutUser,
  };
}
