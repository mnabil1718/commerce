import { Profile } from '@/types/user.type';
import { JwtPayload } from '@supabase/supabase-js'
import { createStore } from 'zustand/vanilla'

export type AuthState = {
  user: JwtPayload | null;
  profile: Profile | null;
}

export type AuthActions = {
  setAuth: (user: JwtPayload | null, profile: Profile | null) => void
  clearAuth: () => void
}

export type AuthStore = AuthState & AuthActions

export const defaultInitState: AuthState = {
  user: null,
  profile: null,
}

export const createAuthStore = (
  initState: AuthState = defaultInitState,
) => {
  return createStore<AuthStore>()((set) => ({
    ...initState,
    setAuth: (user, profile) => set({ user, profile }),
    clearAuth: () => set({ user: null, profile: null }),
  }))
}