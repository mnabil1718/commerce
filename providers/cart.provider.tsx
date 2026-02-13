"use client";

import { useStore } from "zustand";
import { createContext, useContext, useState } from "react";
import { CartItem, CartStore, createCartStore } from "@/stores/cart-store";

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
  const [store] = useState(() => createCartStore({ items: initialItems }));

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
