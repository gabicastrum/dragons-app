import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { AuthProvider } from './AuthProvider'
import { useAuth } from '../../hooks/useAuth'

const TestComponent = () => {
  const { logado, login, logout } = useAuth()

  return (
    <div>
      <span data-testid="status">{logado ? 'logado' : 'deslogado'}</span>

      <button onClick={() => login('admin@dragoes.com', 'SenhaForte@123')}>
        Fazer Login
      </button>

      <button onClick={() => login('errado@teste.com', '123')}>
        Login Errado
      </button>

      <button onClick={logout}>Sair</button>
    </div>
  )
}

describe('AuthProvider', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('deve iniciar deslogado se o localStorage estiver vazio', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )
    expect(screen.getByTestId('status')).toHaveTextContent('deslogado')
  })

  it('deve iniciar logado se houver usuário no localStorage', () => {
    localStorage.setItem(
      '@DragonApp:user',
      JSON.stringify({ email: 'admin@dragoes.com' })
    )

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )
    expect(screen.getByTestId('status')).toHaveTextContent('logado')
  })

  it('deve realizar login com sucesso e salvar no localStorage', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    fireEvent.click(screen.getByText('Fazer Login'))

    expect(screen.getByTestId('status')).toHaveTextContent('logado')
    expect(localStorage.getItem('@DragonApp:user')).toContain(
      'admin@dragoes.com'
    )
  })

  it('não deve realizar login com credenciais inválidas', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    fireEvent.click(screen.getByText('Login Errado'))

    expect(screen.getByTestId('status')).toHaveTextContent('deslogado')
    expect(localStorage.getItem('@DragonApp:user')).toBeNull()
  })

  it('deve limpar o estado e o localStorage ao fazer logout', () => {
    localStorage.setItem(
      '@DragonApp:user',
      JSON.stringify({ email: 'admin@dragoes.com' })
    )

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    fireEvent.click(screen.getByText('Sair'))

    expect(screen.getByTestId('status')).toHaveTextContent('deslogado')
    expect(localStorage.getItem('@DragonApp:user')).toBeNull()
  })
  it('deve lançar erro ao usar useAuth fora do Provider', () => {
    const ComponenteProblematico = () => {
      useAuth()
      return null
    }

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => render(<ComponenteProblematico />)).toThrow(
      'O useAuth deve ser usado dentro do AuthProvider.'
    )

    consoleSpy.mockRestore()
  })
})
