import { create } from "zustand";

// Use sessionStorage so each browser tab has its own auth (admin in one tab, customer in another).
// Namespaced keys avoid collisions with other apps on the same origin.
const AUTH_KEYS = { token: "foodapp_auth_token", user: "foodapp_auth_user" };
const AUTH_STORAGE = typeof window !== "undefined" ? sessionStorage : null;
const OLD_KEYS = { token: "token", user: "user" };

// One-time migration: copy old keys to new namespaced keys so existing sessions keep working.
const migrateAuthKeys = () => {
  if (!AUTH_STORAGE) return;
  const oldToken = AUTH_STORAGE.getItem(OLD_KEYS.token);
  const oldUser = AUTH_STORAGE.getItem(OLD_KEYS.user);
  if (oldToken && !AUTH_STORAGE.getItem(AUTH_KEYS.token)) {
    AUTH_STORAGE.setItem(AUTH_KEYS.token, oldToken);
    AUTH_STORAGE.removeItem(OLD_KEYS.token);
  }
  if (oldUser && !AUTH_STORAGE.getItem(AUTH_KEYS.user)) {
    AUTH_STORAGE.setItem(AUTH_KEYS.user, oldUser);
    AUTH_STORAGE.removeItem(OLD_KEYS.user);
  }
};

const getStoredUser = () => {
  if (!AUTH_STORAGE) return null;
  migrateAuthKeys();
  try {
    const u = AUTH_STORAGE.getItem(AUTH_KEYS.user);
    return u ? JSON.parse(u) : null;
  } catch {
    return null;
  }
};

const getStoredToken = () => {
  if (!AUTH_STORAGE) return null;
  migrateAuthKeys();
  return AUTH_STORAGE.getItem(AUTH_KEYS.token) ?? null;
};

const useAuthStore = create((set, get) => {
  // Re-hydrate from this tab's sessionStorage when the tab gains focus,
  // so each tab always shows its own session (no mixing with other tabs).
  if (typeof window !== "undefined") {
    window.addEventListener("focus", () => {
      const token = getStoredToken();
      const user = getStoredUser();
      const prev = get();
      if (prev.token !== token || JSON.stringify(prev.user) !== JSON.stringify(user)) {
        set({
          token,
          user,
          isAuthenticated: !!token,
          isAdmin: user?.role === "admin"
        });
      }
    });
  }

  return {
    user: getStoredUser(),
    token: getStoredToken(),
    isAuthenticated: !!getStoredToken(),
    isAdmin: getStoredUser()?.role === "admin",

    login: (user, token) => {
      if (AUTH_STORAGE) {
        AUTH_STORAGE.setItem(AUTH_KEYS.token, token);
        AUTH_STORAGE.setItem(AUTH_KEYS.user, JSON.stringify(user));
      }
      set({ user, token, isAuthenticated: true, isAdmin: user?.role === "admin" });
    },

    logout: () => {
      if (AUTH_STORAGE) {
        AUTH_STORAGE.removeItem(AUTH_KEYS.token);
        AUTH_STORAGE.removeItem(AUTH_KEYS.user);
      }
      set({ user: null, token: null, isAuthenticated: false, isAdmin: false });
    },

    setUser: (user) => {
      if (AUTH_STORAGE) AUTH_STORAGE.setItem(AUTH_KEYS.user, JSON.stringify(user));
      set({ user, isAdmin: user?.role === "admin" });
    }
  };
});

export default useAuthStore;
export { AUTH_KEYS };
