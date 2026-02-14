"use client";

import { createContext, useContext, useState } from "react";
import { useStore } from "zustand";
import {
  createShippingAddressStore,
  ShippingAddressStore,
} from "@/stores/shipping-address-store";
import { ShippingAddress } from "@/types/shipping-address.type";

export type ShippingAddressStoreApi = ReturnType<
  typeof createShippingAddressStore
>;
export const ShippingAddressContext = createContext<
  ShippingAddressStoreApi | undefined
>(undefined);

export const ShippingAddressStoreProvider = ({
  children,
  initialAddresses,
}: {
  children: React.ReactNode;
  initialAddresses: ShippingAddress[];
}) => {
  // Initialize store with server data
  const [store] = useState(() =>
    createShippingAddressStore({ addresses: initialAddresses }),
  );

  return (
    <ShippingAddressContext.Provider value={store}>
      {children}
    </ShippingAddressContext.Provider>
  );
};

export const useShippingAddressStore = <T,>(
  selector: (store: ShippingAddressStore) => T,
): T => {
  const context = useContext(ShippingAddressContext);
  if (!context)
    throw new Error(
      "useShippingAddressStore must be used within ShippingAddressStoreProvider",
    );
  return useStore(context, selector);
};
