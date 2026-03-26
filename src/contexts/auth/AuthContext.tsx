import { createContext } from 'react'

export interface AuthContextData {
  logado: boolean
  login: (email: string, password: string) => boolean
  logout: () => void
}

export const AuthContext = createContext<AuthContextData | null>(null)
