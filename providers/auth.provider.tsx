"use client";

import { createClient } from "@/lib/supabase/client";
import { AuthStore, createAuthStore } from "@/stores/user-store";
import { createContext, useContext, useEffect, useState } from "react";
import { useStore } from "zustand";

export type AuthStoreApi = ReturnType<typeof createAuthStore>;

export const AuthStoreContext = createContext<AuthStoreApi | undefined>(
  undefined,
);

export type AuthStoreProviderProps = {
  children: React.ReactNode;
};

export const AuthStoreProvider = ({ children }: AuthStoreProviderProps) => {
  const [store] = useState(() => createAuthStore());
  const supabase = createClient();

  useEffect(() => {
    // This function fetches both the Auth User and the Public Profile
    const initializeAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // Fetch custom profile data from your public.profiles table
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        store.getState().setAuth(user, profile);
      }
    };

    initializeAuth();

    // Listen for sign-in/sign-out events to update Zustand automatically
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
        store.getState().setAuth(session.user as any, profile);
      } else if (event === "SIGNED_OUT") {
        store.getState().clearAuth();
      }
    });

    return () => subscription.unsubscribe();
  }, [store, supabase]);

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
