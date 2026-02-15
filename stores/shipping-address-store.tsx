import {
  createShippingAddress,
  deleteShippingAddress,
  getShippingAddresses,
  updateShippingAddress,
} from "@/service/shipping-address.service";
import {
  ShippingAddress,
  ShippingAddressFormSchemaType,
} from "@/types/shipping-address.type";
import { createStore } from "zustand";

export type ShippingAddressState = {
  addresses: ShippingAddress[];
  selectedAddress: ShippingAddress | null;
};

export type ShippingAddressActions = {
  setSelected: (id: string) => void;
  getPrimary: () => ShippingAddress | null;
  load: (userId: string) => Promise<void>;
  add: (addr: ShippingAddressFormSchemaType) => Promise<void>;
  update: (id: string, addr: ShippingAddressFormSchemaType) => Promise<void>;
  delete: (id: string) => Promise<void>;
  reset: () => void;
};

export type ShippingAddressStore = ShippingAddressState &
  ShippingAddressActions;

export const defaultInitState: ShippingAddressState = {
  addresses: [],
  selectedAddress: null,
};

export const createShippingAddressStore = (
  initState: ShippingAddressState = defaultInitState,
) => {
  return createStore<ShippingAddressStore>()((set, get) => ({
    ...initState,

    // set to be selected address
    setSelected: (id: string) => {
      const selected = get().addresses.find((a) => a.id === id);

      if (selected) set({ selectedAddress: selected });
    },

    // get single primary address
    getPrimary: () => {
      const primary = get().addresses.find((a) => a.is_primary === true);
      return primary ?? null;
    },

    // load from userId, RLS activated so no need for userId
    load: async () => {
      const { data: addrs } = await getShippingAddresses();
      set({ addresses: addrs });
    },

    // add
    add: async (addr) => {
      const { data: res } = await createShippingAddress(addr);

      if (addr.is_primary) {
        const { data: refreshed } = await getShippingAddresses();
        set({ addresses: refreshed });
      } else {
        set((state) => ({
          addresses: [res, ...state.addresses],
        }));
      }
    },

    // update
    update: async (id, addr) => {
      const { data: res } = await updateShippingAddress(id, addr);
      if (addr.is_primary) {
        const { data: refreshed } = await getShippingAddresses();
        set({ addresses: refreshed });
      } else {
        set((state) => ({
          addresses: state.addresses.map((a) => (a.id === id ? res : a)),
        }));
      }
    },

    // delete
    delete: async (id) => {
      await deleteShippingAddress(id);

      set({
        addresses: get().addresses.filter((a) => a.id !== id),
      });
    },

    // clear
    reset: () => set(defaultInitState),
  }));
};
