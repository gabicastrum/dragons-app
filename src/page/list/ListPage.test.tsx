import { screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import ListPage from './ListPage'
import { type IDragon } from '../../interfaces/dragon'
import { renderWithProviders } from '../../test/utils/CustomRender'

const mocks = {
  navigate: vi.fn(),
  listarDragoes: vi.fn(),
  deletarDragao: vi.fn(),
}

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>()
  return {
    ...actual,
    useNavigate: () => mocks.navigate,
    useParams: () => ({ id: '1' }),
  }
})

vi.mock('../../services/dragonService', () => ({
  listarDragoes: () => mocks.listarDragoes(),
  deletarDragao: (id: string) => mocks.deletarDragao(id),
}))

vi.mock('../../components/header/Header', () => ({
  Header: () => <div data-testid="header">Header</div>,
}))

vi.mock('../../components/dragon-card/DragonCard', () => ({
  DragonCard: ({ dragon, onEdit, onDelete, onViewDetails }: any) => (
    <div data-testid="dragon-card">
      <span>{dragon.name}</span>
      <button onClick={() => onViewDetails(dragon.id)}>Detalhes</button>
      <button onClick={() => onEdit(dragon.id)}>Editar</button>
      <button
        data-testid="btn-excluir-card"
        onClick={() => onDelete(dragon.id)}
      >
        ✕
      </button>
    </div>
  ),
}))

const DRAGAO_ID = '1'
const DRAGAO_PRIMEIRO = 'Noberta'
const DRAGAO_SEGUNDO = 'Noberto'
const MENSAGEM_MODAL = 'Tem certeza que deseja deletar este dragão?'

describe('ListPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.listarDragoes.mockResolvedValue([
      { id: '1', name: 'Noberta' },
      { id: '2', name: 'Noberto' },
    ])
  })

  it('deve renderizar os dragões', async () => {
    const dragoesMock: IDragon[] = [
      { id: '1', name: DRAGAO_PRIMEIRO } as IDragon,
      { id: '2', name: DRAGAO_SEGUNDO } as IDragon,
    ]

    mocks.listarDragoes.mockResolvedValue(dragoesMock)

    renderWithProviders(<ListPage />)

    const cards = await screen.findAllByTestId('dragon-card')

    expect(cards).toHaveLength(2)
  })

  it('deve ordenar os dragões por nome', async () => {
    const dragoesMock: IDragon[] = [
      { id: '1', name: DRAGAO_PRIMEIRO } as IDragon,
      { id: '2', name: DRAGAO_SEGUNDO } as IDragon,
    ]

    mocks.listarDragoes.mockResolvedValue(dragoesMock)

    renderWithProviders(<ListPage />)

    const cards = await screen.findAllByTestId('dragon-card')

    expect(cards[0]).toHaveTextContent(DRAGAO_PRIMEIRO)
    expect(cards[1]).toHaveTextContent(DRAGAO_SEGUNDO)
  })

  it('deve exibir o ConfirmModal ao clicar em deletar', async () => {
    renderWithProviders(<ListPage />)

    await screen.findAllByTestId('dragon-card')

    fireEvent.click(screen.getAllByTestId('btn-excluir-card')[0])

    expect(screen.getByText(MENSAGEM_MODAL)).toBeInTheDocument()
  })

  it('deve fechar o modal ao clicar em Cancelar sem excluir', async () => {
    renderWithProviders(<ListPage />)

    await screen.findAllByTestId('dragon-card')

    fireEvent.click(screen.getAllByTestId('btn-excluir-card')[0])
    fireEvent.click(screen.getByRole('button', { name: /cancelar/i }))

    expect(screen.queryByText(MENSAGEM_MODAL)).not.toBeInTheDocument()
    expect(mocks.deletarDragao).not.toHaveBeenCalled()
  })

  it('deve chamar deletarDragao com o id correto ao confirmar', async () => {
    mocks.deletarDragao.mockResolvedValue(undefined)

    renderWithProviders(<ListPage />)

    await screen.findAllByTestId('dragon-card')

    fireEvent.click(screen.getAllByTestId('btn-excluir-card')[0])
    fireEvent.click(screen.getByRole('button', { name: /excluir/i }))

    await waitFor(() => {
      expect(mocks.deletarDragao).toHaveBeenCalledWith(DRAGAO_ID)
    })
  })

  it('deve exibir toast de sucesso após exclusão bem-sucedida', async () => {
    mocks.deletarDragao.mockResolvedValue(undefined)

    renderWithProviders(<ListPage />)

    await screen.findAllByTestId('dragon-card')

    fireEvent.click(screen.getAllByTestId('btn-excluir-card')[0])
    fireEvent.click(screen.getByRole('button', { name: /excluir/i }))

    await screen.findByText('Dragão deletado com sucesso!')
  })

  it('deve exibir toast de erro quando a exclusão falha', async () => {
    mocks.deletarDragao.mockRejectedValue(new Error('Erro na API'))

    renderWithProviders(<ListPage />)

    await screen.findAllByTestId('dragon-card')

    fireEvent.click(screen.getAllByTestId('btn-excluir-card')[0])
    fireEvent.click(screen.getByRole('button', { name: /excluir/i }))

    await screen.findByText('Erro ao deletar o dragão. Tente novamente.')
  })

  it('deve exibir estado de erro quando a listagem falhar', async () => {
    mocks.listarDragoes.mockRejectedValue(new Error('Erro ao buscar'))

    renderWithProviders(<ListPage />)

    expect(
      await screen.findByText(/erro ao carregar dragões/i)
    ).toBeInTheDocument()
  })

  it('deve exibir EmptyState quando não houver dragões', async () => {
    mocks.listarDragoes.mockResolvedValue([])

    renderWithProviders(<ListPage />)

    expect(await screen.findByRole('main')).toBeInTheDocument()
    const botaoCadastro = screen.getByRole('button')
    expect(botaoCadastro).toBeInTheDocument()
  })

  it('deve navegar para a tela de cadastro ao clicar no botão (Linha 104)', async () => {
    mocks.listarDragoes.mockResolvedValue([
      { id: '1', name: 'Dragão' } as IDragon,
    ])

    renderWithProviders(<ListPage />)

    const botao = await screen.findByText(/cadastre aqui o seu dragão/i)
    fireEvent.click(botao)

    await waitFor(() => {
      expect(mocks.navigate).toHaveBeenCalledWith('/cadastro')
    })
  })

  it('deve navegar para detalhes e edição (Linhas 25 e 29)', async () => {
    mocks.listarDragoes.mockResolvedValue([
      { id: '123', name: 'Fafnir' } as IDragon,
    ])
    renderWithProviders(<ListPage />)

    const btnDetalhes = await screen.findByText('Detalhes')
    fireEvent.click(btnDetalhes)

    await waitFor(() => {
      expect(mocks.navigate).toHaveBeenCalledWith('/dragoes/123')
    })

    const btnEditar = screen.getByText('Editar')
    fireEvent.click(btnEditar)

    await waitFor(() => {
      expect(mocks.navigate).toHaveBeenCalledWith('/dragoes/123/editar')
    })
  })

  it('deve navegar para a tela de cadastro ao clicar no botão do EmptyState quando a lista estiver vazia (Linha 112)', async () => {
    mocks.listarDragoes.mockResolvedValue([])

    renderWithProviders(<ListPage />)

    const botaoCadastroEmpty = await screen.findByRole('button')

    fireEvent.click(botaoCadastroEmpty)

    await waitFor(() => {
      expect(mocks.navigate).toHaveBeenCalledWith('/cadastro')
    })
  })
})
