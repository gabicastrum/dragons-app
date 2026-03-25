import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Input } from './Input'

describe('Input Component', () => {
  it('deve renderizar o label quando a prop for fornecida', () => {
    render(<Input label="E-mail" />)
    expect(screen.getByText('E-mail')).toBeInTheDocument()
  })

  it('deve atualizar o valor ao digitar (chamando onChange)', () => {
    const handleChange = vi.fn()
    render(<Input label="Senha" onChange={handleChange} />)

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'dragao123' } })

    expect(handleChange).toHaveBeenCalled()
  })

  it('deve exibir o placeholder corretamente', () => {
    render(<Input placeholder="Digite seu nome" />)
    expect(screen.getByPlaceholderText('Digite seu nome')).toBeInTheDocument()
  })
})
