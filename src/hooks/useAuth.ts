import { useContext } from 'react'
import { AuthContext } from '../contexts/auth/AuthContext'

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('O useAuth deve ser usado dentro do AuthProvider.')
  }

  return context
}
