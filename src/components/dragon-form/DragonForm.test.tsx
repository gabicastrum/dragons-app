import { screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { DragonForm } from './DragonForm'
import { renderWithProviders } from '../../test/utils/CustomRender'

const mockNavigate = vi.fn()
const mockSubmit = vi.fn()

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>()
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

const PLACEHOLDER_NOME = 'Ex: Fúria da Noite'
const PLACEHOLDER_TIPO = 'Ex: Fogo, Gelo, etc'
const PLACEHOLDER_HISTORIA = 'Ex: Nasceu na Ilha de Berk'

const BOTAO_SALVAR = /salvar dragão/i
const BOTAO_ADICIONAR = /\+ adicionar/i

const NOME_DRAGAO = 'Banguela'
const TIPO_DRAGAO = 'Fogo'
const HISTORIA = 'Nasceu na Ilha de Berk'

const MENSAGEM_ERRO_VALIDACAO = 'Nome e tipo são obrigatórios.'
const MENSAGEM_ERRO_SERVICO = 'Erro ao salvar o dragão. Tente novamente.'

const renderForm = () =>
  renderWithProviders(<DragonForm titulo="Teste" onSubmit={mockSubmit} />)

describe('DragonForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deve renderizar os campos do formulário', () => {
    renderForm()

    expect(screen.getByPlaceholderText(PLACEHOLDER_NOME)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(PLACEHOLDER_TIPO)).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText(PLACEHOLDER_HISTORIA)
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: BOTAO_SALVAR })
    ).toBeInTheDocument()
  })

  it('deve atualizar os inputs quando o usuário digitar', () => {
    renderForm()

    const campoNome = screen.getByPlaceholderText(PLACEHOLDER_NOME)
    const campoTipo = screen.getByPlaceholderText(PLACEHOLDER_TIPO)

    fireEvent.change(campoNome, { target: { value: NOME_DRAGAO } })
    fireEvent.change(campoTipo, { target: { value: TIPO_DRAGAO } })

    expect(campoNome).toHaveValue(NOME_DRAGAO)
    expect(campoTipo).toHaveValue(TIPO_DRAGAO)
  })

  it('deve adicionar uma história', () => {
    renderForm()

    const campoHistoria = screen.getByPlaceholderText(PLACEHOLDER_HISTORIA)

    fireEvent.change(campoHistoria, { target: { value: HISTORIA } })
    fireEvent.click(screen.getByRole('button', { name: BOTAO_ADICIONAR }))

    expect(screen.getByText(HISTORIA)).toBeInTheDocument()
  })

  it('deve remover uma história', () => {
    renderForm()

    const campoHistoria = screen.getByPlaceholderText(PLACEHOLDER_HISTORIA)

    fireEvent.change(campoHistoria, { target: { value: HISTORIA } })
    fireEvent.click(screen.getByRole('button', { name: BOTAO_ADICIONAR }))

    fireEvent.click(screen.getByLabelText('Remover história'))

    expect(screen.queryByText(HISTORIA)).not.toBeInTheDocument()
  })

  it('deve mostrar erro se nome ou tipo não forem preenchidos', () => {
    renderForm()

    fireEvent.click(screen.getByRole('button', { name: BOTAO_SALVAR }))

    expect(screen.getByText(MENSAGEM_ERRO_VALIDACAO)).toBeInTheDocument()
  })

  it('deve chamar onSubmit com os dados corretos ao salvar', async () => {
    mockSubmit.mockResolvedValue(true)
    renderForm()

    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDER_NOME), {
      target: { value: NOME_DRAGAO },
    })
    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDER_TIPO), {
      target: { value: TIPO_DRAGAO },
    })
    fireEvent.click(screen.getByRole('button', { name: BOTAO_SALVAR }))

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith(
        expect.objectContaining({ name: NOME_DRAGAO, type: TIPO_DRAGAO })
      )
    })
  })

  it('deve mostrar erro quando o serviço falhar', async () => {
    mockSubmit.mockRejectedValue(new Error())
    renderForm()

    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDER_NOME), {
      target: { value: NOME_DRAGAO },
    })
    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDER_TIPO), {
      target: { value: TIPO_DRAGAO },
    })
    fireEvent.click(screen.getByRole('button', { name: BOTAO_SALVAR }))

    await waitFor(() => {
      expect(screen.getByText(MENSAGEM_ERRO_SERVICO)).toBeInTheDocument()
    })
  })

  it('deve navegar para lista de dragões ao clicar no botão de voltar', () => {
    renderForm()

    fireEvent.click(screen.getAllByRole('button')[0])

    expect(mockNavigate).toHaveBeenCalledWith('/dragoes')
  })

  it('deve adicionar uma história ao pressionar a tecla Enter', () => {
    renderForm()

    const campoHistoria = screen.getByPlaceholderText(PLACEHOLDER_HISTORIA)

    fireEvent.change(campoHistoria, { target: { value: 'História via Enter' } })
    fireEvent.keyDown(campoHistoria, {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
    })

    expect(screen.getByText('História via Enter')).toBeInTheDocument()
    expect(campoHistoria).toHaveValue('')
  })

  it('não deve adicionar uma história se o campo estiver apenas com espaços', () => {
    renderForm()

    const campoHistoria = screen.getByPlaceholderText(PLACEHOLDER_HISTORIA)

    fireEvent.change(campoHistoria, { target: { value: '   ' } })
    fireEvent.click(screen.getByRole('button', { name: BOTAO_ADICIONAR }))

    const lista = screen.queryByRole('list')
    expect(lista).not.toBeInTheDocument()
  })

  it('deve carregar com dados iniciais quando fornecidos', () => {
    const dadosIniciais = {
      id: '1',
      name: 'Dragão Antigo',
      type: 'Fogo',
      createdAt: new Date().toISOString(),
      histories: ['História 1'],
    }

    renderWithProviders(
      <DragonForm
        titulo="Editar"
        onSubmit={mockSubmit}
        initialData={dadosIniciais}
      />
    )

    expect(screen.getByDisplayValue('Dragão Antigo')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Fogo')).toBeInTheDocument()
    expect(screen.getByText('História 1')).toBeInTheDocument()
  })
})
