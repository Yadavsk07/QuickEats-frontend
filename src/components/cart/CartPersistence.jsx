import { useEffect, useRef } from "react";
import useAuthStore from "../../app/store";
import useCartStore from "../../app/cart.store";
import { getCartStorageKey, loadCartFromStorage, saveCartToStorage } from "../../utils/cartStorage";

/**
 * Syncs cart with localStorage: per-user when logged in, "guest" when logged out.
 * On auth change: save current cart to previous key, load cart for new user/guest.
 * Ensures cart survives refresh and login/logout.
 */
export default function CartPersistence() {
  const prevUserRef = useRef(undefined);
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    const prevUser = prevUserRef.current;
    prevUserRef.current = user;

    const oldKey = getCartStorageKey(prevUser);
    const newKey = getCartStorageKey(user);

    if (oldKey !== newKey) {
      const currentItems = useCartStore.getState().items;
      saveCartToStorage(oldKey, currentItems);
      const loaded = loadCartFromStorage(newKey);
      useCartStore.getState().setItems(loaded);
    }
  }, [user]);

  useEffect(() => {
    const key = getCartStorageKey(useAuthStore.getState().user);
    const loaded = loadCartFromStorage(key);
    if (loaded.length > 0) {
      useCartStore.getState().setItems(loaded);
    }
    prevUserRef.current = useAuthStore.getState().user;
  }, []);

  return null;
}
