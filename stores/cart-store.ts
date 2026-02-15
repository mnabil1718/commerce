import { loadCart, saveCart } from "@/service/cart.service";
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
    isLoaded: boolean;
    isSyncing: boolean;
}

function mergeCarts(locals: CartItem[], items: CartItem[]): CartItem[] {
  const map = new Map<number, CartItem>();

  // 1. Put DB items in the map first
  for (const i of items) {
    map.set(i.product_id, { ...i });
  }

  // 2. Merge locals
  for (const l of locals) {
    const v = map.get(l.product_id);
    if (!v) {
        map.set(l.product_id, { ...l });
    } else {
        // If the item exists in both, we don't ADD (which causes doubling).
        // We take the local quantity IF it's higher (user just added more as guest),
        // or just stick with the DB quantity.
        v.qty = Math.max(v.qty, l.qty); 
    }
  }

  return Array.from(map.values());
}

export type CartActions = {
  find: (productId: number) => CartItem | undefined;
  addItem: (product: Product, qty: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  reset: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  getSubtotal: (productId: number) => number;
  sync: (userId: string) => Promise<void>;
  load: (userId: string) => Promise<void>;
}

export type CartStore = CartState & CartActions;

export const defaultInitState: CartState = {
  items: [],
  isLoaded: false,
  isSyncing: false,
};

export const createCartStore = (
  initState: CartState = defaultInitState,
) => {
  return createStore<CartStore>()(
    persist(
      (set, get) => ({
        ...initState,

        // find if cart contains product id
        find: (productId) => {
          return get().items.find((item) => item.product_id === productId);
        },

        // add cart item
        addItem: (product, qty) => {
            const items = get().items;
            const found = items.find((i) => i.product_id === product.id);
            if (found) return;
            
          set({ items: [...get().items, { ...product, product_id: product.id, qty: qty }] });
        },

        // remove cart item
        removeItem: (productId) => {
          set({ items: get().items.filter((item) => item.product_id !== productId) });
        },

        // update qty
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

        // clear
        reset: () => set(defaultInitState),

        // get cart total price
        getTotalPrice: () => get().items.reduce((total, item) => total + item.price * item.qty, 0),

        // get cart total items
        getTotalItems: () => get().items.reduce((total, item) => total + item.qty, 0),

        // get CartItem total: qty * price
        getSubtotal: (productId: number) => {
          const item = get().items.find((i) => i.product_id === productId);
          return item ? item.qty * item.price : 0;
        },

        // load store from DB
        load: async (userId) => {
          if (get().isLoaded) return; //prevent double load

          const locals = get().items;
          const items = await loadCart(userId);
          const merged = mergeCarts(locals, items);
          set({ items: merged, isLoaded: true });

          await saveCart(userId, merged);
        },


        // sync store to DB
        sync: async (userId) => {
          if (get().isSyncing) return; // prevent concurrent sync
          
          const items = get().items;
          await saveCart(userId, items);
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
