import { screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import DetailsPage from './DetailsPage'
import { buscarDragaoPorId } from '../../services/dragonService'
import { renderWithProviders } from '../../test/utils/CustomRender'

const mockNavigate = vi.fn()

vi.mock('../../services/dragonService', () => ({
  buscarDragaoPorId: vi.fn(),
}))

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>()
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ id: '122' }),
  }
})

const mockBuscarDragaoPorId = buscarDragaoPorId as unknown as ReturnType<
  typeof vi.fn
>

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

const TEXTO_CARREGANDO = 'Carregando dragão...'
const TEXTO_NAO_ENCONTRADO = 'Dragão não encontrado.'
const TEXTO_SEM_HISTORIAS = 'Este dragão ainda não possui histórias.'

describe('DetailsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deve exibir loading enquanto busca o dragão', () => {
    mockBuscarDragaoPorId.mockReturnValue(new Promise(() => {}))

    renderWithProviders(<DetailsPage />)

    expect(screen.getByText(TEXTO_CARREGANDO)).toBeInTheDocument()
  })

  it('deve exibir mensagem quando dragão não for encontrado', async () => {
    mockBuscarDragaoPorId.mockResolvedValue(null)

    renderWithProviders(<DetailsPage />)

    await waitFor(() => {
      expect(screen.getByText(TEXTO_NAO_ENCONTRADO)).toBeInTheDocument()
    })
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
})
