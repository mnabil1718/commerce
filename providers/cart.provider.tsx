"use client";

import { useStore } from "zustand";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { CartItem, CartStore, createCartStore } from "@/stores/cart-store";
import { useAuthStore } from "./auth.provider";

export type CartStoreApi = ReturnType<typeof createCartStore>;

export const CartStoreContext = createContext<CartStoreApi | undefined>(
  undefined,
);

export type CartStoreProviderProps = {
  children: React.ReactNode;
  initialItems?: CartItem[];
};

export const CartStoreProvider = ({
  children,
  initialItems = [],
}: CartStoreProviderProps) => {
  const [store] = useState(() =>
    createCartStore({ items: initialItems, isLoaded: false, isSyncing: false }),
  );
  const user = useAuthStore((state) => state.user);
  const prevUserRef = useRef<string | null>(null);
  const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle login/logout
  useEffect(() => {
    const currentUserId = user?.id ?? null;
    const prevUserId = prevUserRef.current;

    // User just logged in
    if (currentUserId && !prevUserId) {
      store.getState().load(currentUserId);
    }

    // User just logged out
    if (!currentUserId && prevUserId) {
      // Clear localStorage cart
      store.getState().reset();
      localStorage.removeItem("cart:storage");
    }

    prevUserRef.current = currentUserId;
  }, [user, store]);

  // Auto-sync cart changes to DB when logged in (debounced)
  useEffect(() => {
    if (!user?.id) return;

    const unsubscribe = store.subscribe(() => {
      // Clear existing timeout
      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current);
      }

      // Debounce sync to avoid too many DB calls
      syncTimeoutRef.current = setTimeout(() => {
        store.getState().sync(user.id);
      }, 500); // 500ms debounce
    });

    return () => {
      unsubscribe();
      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current);
      }
    };
  }, [user, store]);

  return (
    <CartStoreContext.Provider value={store}>
      {children}
    </CartStoreContext.Provider>
  );
};

export const useCartStore = <T,>(selector: (store: CartStore) => T): T => {
  const cartStoreContext = useContext(CartStoreContext);
  if (!cartStoreContext) {
    throw new Error(`useCartStore must be used within CartStoreProvider`);
  }

  return useStore(cartStoreContext, selector);
};
