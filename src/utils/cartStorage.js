const CART_PREFIX = "foodapp_cart_";

export function getCartStorageKey(user) {
  return user?.id || user?._id ? `${CART_PREFIX}${user.id || user._id}` : `${CART_PREFIX}guest`;
}

export function loadCartFromStorage(key) {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCartToStorage(key, items) {
  if (typeof window === "undefined") return;
  try {
    const safe = Array.isArray(items) ? items : [];
    localStorage.setItem(key, JSON.stringify(safe));
  } catch {
    // ignore
  }
}
