"use client";

import { useStore } from "zustand";
import { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthStore, createAuthStore } from "@/stores/user-store";
import { createClient } from "@/lib/supabase/client";

export type AuthStoreApi = ReturnType<typeof createAuthStore>;

export const AuthStoreContext = createContext<AuthStoreApi | undefined>(
  undefined,
);

export type AuthStoreProviderProps = {
  children: React.ReactNode;
  user: User | null;
};

export const AuthStoreProvider = ({
  children,
  user,
}: AuthStoreProviderProps) => {
  const supabase = createClient();

  const [store] = useState(() => createAuthStore({ user }));

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        store.getState().setAuth(session.user);
      } else if (event === "SIGNED_OUT") {
        store.getState().clearAuth();
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase, store]);

  return (
    <AuthStoreContext.Provider value={store}>
      {children}
    </AuthStoreContext.Provider>
  );
};

export const useAuthStore = <T,>(selector: (store: AuthStore) => T): T => {
  const authStoreContext = useContext(AuthStoreContext);
  if (!authStoreContext) {
    throw new Error(`useAuthStore must be used within AuthStoreProvider`);
  }

  return useStore(authStoreContext, selector);
};
