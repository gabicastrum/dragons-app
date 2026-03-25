import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Header } from './Header'

const mockLogout = vi.fn()

vi.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    logout: mockLogout,
    logado: true,
  }),
}))

describe('Header Component', () => {
  it('deve renderizar o título do app', () => {
    render(<Header />)
    expect(screen.getByText('Dragons App')).toBeInTheDocument()
  })

  it('deve conter um link para a home', () => {
    render(<Header />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/dragoes')
  })
})
