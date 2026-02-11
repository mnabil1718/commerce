import { User } from '@supabase/supabase-js'
import { createStore } from 'zustand/vanilla'

export type AuthState = {
  user: User | null;
}

export type AuthActions = {
  setAuth: (user: User | null) => void
  clearAuth: () => void
}

export type AuthStore = AuthState & AuthActions

export const defaultInitState: AuthState = {
  user: null,
}

export const createAuthStore = (
  initState: AuthState = defaultInitState,
) => {
  return createStore<AuthStore>()((set) => ({
    ...initState,
    setAuth: (user) => set({ user }),
    clearAuth: () => set({ user: null }),
  }))
}