import { create } from "zustand";
import useAuthStore from "./store";
import { getCartStorageKey, loadCartFromStorage, saveCartToStorage } from "../utils/cartStorage";

function persistCart(items) {
  try {
    const user = useAuthStore.getState().user;
    const key = getCartStorageKey(user);
    saveCartToStorage(key, items);
  } catch {
    // ignore
  }
}

const useCartStore = create((set, get) => ({
  items: [],

  setItems: (items) => {
    const safe = Array.isArray(items) ? items : [];
    set({ items: safe });
  },

  addItem: (item, instructions = "") => {
    const items = get().items;
    const exists = items.find((i) => i._id === item._id);
    let next;
    if (exists) {
      next = items.map((i) =>
        i._id === item._id ? { ...i, qty: i.qty + 1 } : i
      );
    } else {
      next = [...items, { ...item, qty: 1, instructions }];
    }
    set({ items: next });
    persistCart(next);
  },

  updateItemQty: (id, qty, instructions) => {
    const items = get().items;
    const item = items.find((i) => i._id === id);
    if (!item) return;
    if (qty <= 0) {
      const next = items.filter((i) => i._id !== id);
      set({ items: next });
      persistCart(next);
      return;
    }
    const next = items.map((i) =>
      i._id === id ? { ...i, qty, instructions: instructions ?? i.instructions } : i
    );
    set({ items: next });
    persistCart(next);
  },

  updateInstructions: (id, instructions) => {
    const next = get().items.map((i) =>
      i._id === id ? { ...i, instructions } : i
    );
    set({ items: next });
    persistCart(next);
  },

  removeItem: (id) => {
    const next = get().items.filter((i) => i._id !== id);
    set({ items: next });
    persistCart(next);
  },

  clearCart: () => {
    set({ items: [] });
    persistCart([]);
  }
}));

export default useCartStore;
