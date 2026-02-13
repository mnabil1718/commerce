import { Product } from "@/types/product.type";
import { createStore } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";


export type CartItem = {
    product_id: number;
    image: string | null;
    stock: number;
    title: string;
    price: number;
    qty: number;
}

export type CartState = {
    items: CartItem[];
}

export type CartActions = {
  find: (productId: number) => CartItem | undefined;
  addItem: (product: Product, qty: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  getSubtotal: (productId: number) => number;
}

export type CartStore = CartState & CartActions;

export const defaultInitState: CartState = {
  items: [],
}

export const createCartStore = (
  initState: CartState = defaultInitState,
) => {
  return createStore<CartStore>()(
    persist(
      (set, get) => ({
        ...initState,
        find: (productId) => {
          return get().items.find((item) => item.product_id === productId);
        },
        addItem: (product, qty) => {
            const items = get().items;
            const found = items.find((i) => i.product_id === product.id);
            if (found) return;
            
          set({ items: [...get().items, { ...product, product_id: product.id, qty: qty }] });
        },
        removeItem: (productId) => {
          set({ items: get().items.filter((item) => item.product_id !== productId) });
        },
        updateQuantity: (productId, qty) => {
          if (qty <= 0) {
            get().removeItem(productId);
            return;
          }
          set({
            items: get().items.map((item) =>
              item.product_id === productId
                ? { ...item, qty: Math.min(qty, item.stock) }
                : item
            ),
          });
        },
        clearCart: () => set({ items: [] }),
        getTotalPrice: () => get().items.reduce((total, item) => total + item.price * item.qty, 0),
        getTotalItems: () => get().items.reduce((total, item) => total + item.qty, 0),
        getSubtotal: (productId: number) => {
          const item = get().items.find((i) => i.product_id === productId);
          return item ? item.qty * item.price : 0;
        }
      }),
      {
        name: "cart:storage",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({ items: state.items }), 
      }
    )
  );
}
