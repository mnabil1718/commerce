"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useStore } from "zustand";
import {
  createShippingAddressStore,
  ShippingAddressStore,
} from "@/stores/shipping-address-store";
import { ShippingAddress } from "@/types/shipping-address.type";
import { createClient } from "@/lib/supabase/client";

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
    createShippingAddressStore({
      addresses: initialAddresses,
      selectedAddress: null,
    }),
  );

  useEffect(() => {
    const supabase = createClient();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        // Reset the store when user logs out
        store.getState().reset();
      } else if (event === "SIGNED_IN" && session?.user) {
        // Optionally reload addresses for new user
        store.getState().load(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [store]);

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
