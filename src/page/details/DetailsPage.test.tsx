import { screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import DetailsPage from './DetailsPage'
import { buscarDragaoPorId } from '../../services/dragonService'
import { renderWithProviders } from '../../test/utils/CustomRender'

const mockNavigate = vi.fn()
let mockUseParams: { id: string | undefined } = { id: '122' }

vi.mock('../../services/dragonService', () => ({
  buscarDragaoPorId: vi.fn(),
}))

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>()
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => mockUseParams,
  }
})

const mockBuscarDragaoPorId = vi.mocked(buscarDragaoPorId)

const DRAGAO_MOCK = {
  id: '122',
  name: 'Arcanor',
  type: 'Gelo',
  createdAt: '2025-10-15T10:53:46.694Z',
  histories: [
    'Tem escamas com aparência de cristais de gelo',
    'Nasceu nas montanhas de gelo',
  ],
}

const TEXTO_CARREGANDO = /buscando detalhes/i
const TEXTO_NAO_ENCONTRADO = /dragão não encontrado/i
const TEXTO_ERRO_CARREGAMENTO = /erro ao carregar dragão/i
const TEXTO_SEM_HISTORIAS = 'Este dragão ainda não possui histórias.'
const BOTAO_VOLTAR_LISTA = /voltar para a lista/i
const ICON_BOTAO_VOLTAR = /←/i

describe('DetailsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUseParams = { id: '122' }
  })

  it('deve exibir loading enquanto busca o dragão', () => {
    mockBuscarDragaoPorId.mockReturnValue(new Promise(() => {}))

    renderWithProviders(<DetailsPage />)

    expect(screen.getByText(TEXTO_CARREGANDO)).toBeInTheDocument()
  })

  it('deve exibir mensagem quando dragão não for encontrado', async () => {
    mockBuscarDragaoPorId.mockResolvedValue(null as any)

    renderWithProviders(<DetailsPage />)

    expect(
      await screen.findByText(TEXTO_NAO_ENCONTRADO)
    ).toBeInTheDocument()
  })

  it('deve exibir os detalhes do dragão após carregar', async () => {
    mockBuscarDragaoPorId.mockResolvedValue(DRAGAO_MOCK)

    renderWithProviders(<DetailsPage />)

    await waitFor(() => {
      expect(screen.getByText(DRAGAO_MOCK.name)).toBeInTheDocument()
      expect(screen.getByText(DRAGAO_MOCK.type)).toBeInTheDocument()
    })
  })

  it('deve exibir as histórias do dragão', async () => {
    mockBuscarDragaoPorId.mockResolvedValue(DRAGAO_MOCK)

    renderWithProviders(<DetailsPage />)

    await waitFor(() => {
      expect(
        screen.getByText('Tem escamas com aparência de cristais de gelo')
      ).toBeInTheDocument()
      expect(
        screen.getByText('Nasceu nas montanhas de gelo')
      ).toBeInTheDocument()
    })
  })

  it('deve exibir mensagem quando dragão não tiver histórias', async () => {
    mockBuscarDragaoPorId.mockResolvedValue({ ...DRAGAO_MOCK, histories: [] })

    renderWithProviders(<DetailsPage />)

    await waitFor(() => {
      expect(screen.getByText(TEXTO_SEM_HISTORIAS)).toBeInTheDocument()
    })
  })

  it('deve exibir a data formatada em pt-BR', async () => {
    mockBuscarDragaoPorId.mockResolvedValue(DRAGAO_MOCK)

    renderWithProviders(<DetailsPage />)

    const dataFormatada = new Date(DRAGAO_MOCK.createdAt).toLocaleString(
      'pt-BR'
    )

    await waitFor(() => {
      expect(screen.getByText(dataFormatada)).toBeInTheDocument()
    })
  })

  it('deve chamar buscarDragaoPorId com o id correto', async () => {
    mockBuscarDragaoPorId.mockResolvedValue(DRAGAO_MOCK)

    renderWithProviders(<DetailsPage />)

    await waitFor(() => {
      expect(mockBuscarDragaoPorId).toHaveBeenCalledWith('122')
    })
  })

  it('deve navegar para lista de dragões ao clicar no botão de voltar', async () => {
    mockBuscarDragaoPorId.mockResolvedValue(DRAGAO_MOCK)

    renderWithProviders(<DetailsPage />)

    await waitFor(() => {
      expect(screen.getByText(DRAGAO_MOCK.name)).toBeInTheDocument()
    })

    const botaoVoltar = screen.getAllByRole('button')[0]
    botaoVoltar.click()

    expect(mockNavigate).toHaveBeenCalledWith('/dragoes')
  })

  it('não deve chamar API se id não existir', async () => {
    mockUseParams = { id: undefined }

    renderWithProviders(<DetailsPage />)

    await new Promise((r) => setTimeout(r, 0))

    expect(mockBuscarDragaoPorId).not.toHaveBeenCalled()
  })

  it('deve exibir erro quando a API falhar', async () => {
    mockBuscarDragaoPorId.mockRejectedValue(new Error('erro'))

    renderWithProviders(<DetailsPage />)

    expect(
      await screen.findByRole('heading', { name: TEXTO_ERRO_CARREGAMENTO })
    ).toBeInTheDocument()
  })

  it('deve tratar história quando vier como string', async () => {
    mockBuscarDragaoPorId.mockResolvedValueOnce({
      ...DRAGAO_MOCK,
      histories: 'História única',
    })

    renderWithProviders(<DetailsPage />)

    expect(await screen.findByText(DRAGAO_MOCK.name)).toBeInTheDocument()

    expect(screen.getByText('História única')).toBeInTheDocument()
  })

  it('deve tratar quando histórias forem null', async () => {
    mockBuscarDragaoPorId.mockResolvedValueOnce({
      ...DRAGAO_MOCK,
      histories: null as any,
    })

    renderWithProviders(<DetailsPage />)

    expect(await screen.findByText(DRAGAO_MOCK.name)).toBeInTheDocument()

    expect(screen.getByText(TEXTO_SEM_HISTORIAS)).toBeInTheDocument()
  })

  it('deve navegar para a lista ao clicar no botão da tela de não encontrado', async () => {
    mockBuscarDragaoPorId.mockResolvedValue(null as any)

    renderWithProviders(<DetailsPage />)

    const botaoVoltar = await screen.findByRole('button', {
      name: BOTAO_VOLTAR_LISTA,
    })
    botaoVoltar.click()

    expect(mockNavigate).toHaveBeenCalledWith('/dragoes')
  })

  it('deve navegar para a lista ao clicar no botão da tela de erro da API', async () => {
    mockBuscarDragaoPorId.mockRejectedValue(new Error('Falha na rede'))

    renderWithProviders(<DetailsPage />)

    const botaoVoltar = await screen.findByRole('button', {
      name: BOTAO_VOLTAR_LISTA,
    })
    botaoVoltar.click()

    expect(mockNavigate).toHaveBeenCalledWith('/dragoes')
  })

  it('deve navegar ao clicar no botão de seta na tela de detalhes', async () => {
    mockBuscarDragaoPorId.mockResolvedValue(DRAGAO_MOCK)

    renderWithProviders(<DetailsPage />)

    const botaoSeta = await screen.findByRole('button', { name: ICON_BOTAO_VOLTAR })
    botaoSeta.click()

    expect(mockNavigate).toHaveBeenCalledWith('/dragoes')
  })
})
