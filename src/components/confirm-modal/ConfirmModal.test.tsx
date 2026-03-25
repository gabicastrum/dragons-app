import { screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ConfirmModal } from './ConfirmModal'
import { renderWithProviders } from '../../test/utils/CustomRender'

const MENSAGEM_CONFIRMACAO = 'Tem certeza que deseja excluir este dragão?'

describe('ConfirmModal', () => {
  const onConfirmMock = vi.fn()
  const onCancelMock = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deve renderizar a mensagem recebida por props', () => {
    renderWithProviders(
      <ConfirmModal
        mensagem={MENSAGEM_CONFIRMACAO}
        onConfirm={onConfirmMock}
        onCancel={onCancelMock}
      />
    )

    expect(screen.getByText(MENSAGEM_CONFIRMACAO)).toBeInTheDocument()
  })

  it('deve renderizar os botões de Cancelar e Excluir', () => {
    renderWithProviders(
      <ConfirmModal
        mensagem={MENSAGEM_CONFIRMACAO}
        onConfirm={onConfirmMock}
        onCancel={onCancelMock}
      />
    )

    expect(
      screen.getByRole('button', { name: /cancelar/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /excluir/i })).toBeInTheDocument()
  })

  it('deve chamar onConfirm ao clicar em Excluir', () => {
    renderWithProviders(
      <ConfirmModal
        mensagem={MENSAGEM_CONFIRMACAO}
        onConfirm={onConfirmMock}
        onCancel={onCancelMock}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: /excluir/i }))

    expect(onConfirmMock).toHaveBeenCalledTimes(1)
    expect(onCancelMock).not.toHaveBeenCalled()
  })

  it('deve chamar onCancel ao clicar em Cancelar', () => {
    renderWithProviders(
      <ConfirmModal
        mensagem={MENSAGEM_CONFIRMACAO}
        onConfirm={onConfirmMock}
        onCancel={onCancelMock}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: /cancelar/i }))

    expect(onCancelMock).toHaveBeenCalledTimes(1)
    expect(onConfirmMock).not.toHaveBeenCalled()
  })
})
