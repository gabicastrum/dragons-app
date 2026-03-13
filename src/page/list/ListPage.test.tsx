import { screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ListPage from "./ListPage";
import { type IDragon } from "../../interfaces/dragon";
import { renderWithProviders } from "../../test/utils/CustomRender";

const mockListarDragoes = vi.fn();
const mockDeletarDragao = vi.fn();


vi.mock("../../services/dragonService", () => ({
  listarDragoes: (...args: unknown[]) => mockListarDragoes(...args),
  deletarDragao: (...args: unknown[]) => mockDeletarDragao(...args),

}));

vi.mock("../../components/header/Header", () => ({
  Header: () => <div data-testid="header">Header</div>
}));

vi.mock("../../components/dragon-card/DragonCard", () => ({
  DragonCard: ({ dragon, onDelete }: { dragon: IDragon; onDelete: (id: string) => void }) => (
    <div data-testid="dragon-card">
      {dragon.name}
      <button data-testid="btn-excluir-card" onClick={() => onDelete(dragon.id)}>&#x2715;</button>
    </div>
  ),
}));

const DRAGAO_ID = "1";
const DRAGAO_PRIMEIRO = "Noberta";
const DRAGAO_SEGUNDO = "Noberto";
const MENSAGEM_MODAL = "Tem certeza que deseja deletar este dragão?";

describe("ListPage", () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve renderizar os dragões", async () => {

    const dragoesMock: IDragon[] = [
      { id: "1", name: DRAGAO_PRIMEIRO } as IDragon,
      { id: "2", name: DRAGAO_SEGUNDO } as IDragon
    ];

    mockListarDragoes.mockResolvedValue(dragoesMock);

    renderWithProviders(<ListPage />);

    const cards = await screen.findAllByTestId("dragon-card");

    expect(cards).toHaveLength(2);
  });

  it("deve ordenar os dragões por nome", async () => {

    const dragoesMock: IDragon[] = [
      { id: "1", name: DRAGAO_PRIMEIRO } as IDragon,
      { id: "2", name: DRAGAO_SEGUNDO } as IDragon
    ];

    mockListarDragoes.mockResolvedValue(dragoesMock);

    renderWithProviders(<ListPage />);

    const cards = await screen.findAllByTestId("dragon-card");

    expect(cards[0]).toHaveTextContent(DRAGAO_PRIMEIRO);
    expect(cards[1]).toHaveTextContent(DRAGAO_SEGUNDO);
  });
 
  it("deve exibir o ConfirmModal ao clicar em deletar", async () => {
    renderWithProviders(<ListPage />);
 
    await screen.findAllByTestId("dragon-card");
 
    fireEvent.click(screen.getAllByTestId("btn-excluir-card")[0]);
 
    expect(screen.getByText(MENSAGEM_MODAL)).toBeInTheDocument();
  });
 
  it("deve fechar o modal ao clicar em Cancelar sem excluir", async () => {
    renderWithProviders(<ListPage />);
 
    await screen.findAllByTestId("dragon-card");
 
    fireEvent.click(screen.getAllByTestId("btn-excluir-card")[0]);
    fireEvent.click(screen.getByRole("button", { name: /cancelar/i }));
 
    expect(screen.queryByText(MENSAGEM_MODAL)).not.toBeInTheDocument();
    expect(mockDeletarDragao).not.toHaveBeenCalled();
  });
 
  it("deve chamar deletarDragao com o id correto ao confirmar", async () => {
    mockDeletarDragao.mockResolvedValue(undefined);
 
    renderWithProviders(<ListPage />);
 
    await screen.findAllByTestId("dragon-card");
 
    fireEvent.click(screen.getAllByTestId("btn-excluir-card")[0]);
    fireEvent.click(screen.getByRole("button", { name: /excluir/i }));
 
    await waitFor(() => {
      expect(mockDeletarDragao).toHaveBeenCalledWith(DRAGAO_ID);
    });
  });
 
  it("deve exibir toast de sucesso após exclusão bem-sucedida", async () => {
    mockDeletarDragao.mockResolvedValue(undefined);
 
    renderWithProviders(<ListPage />);
 
    await screen.findAllByTestId("dragon-card");
 
    fireEvent.click(screen.getAllByTestId("btn-excluir-card")[0]);
    fireEvent.click(screen.getByRole("button", { name: /excluir/i }));
 
    await screen.findByText("Dragão deletado com sucesso!");
  });
 
  it("deve exibir toast de erro quando a exclusão falha", async () => {
    mockDeletarDragao.mockRejectedValue(new Error("Erro na API"));
 
    renderWithProviders(<ListPage />);
 
    await screen.findAllByTestId("dragon-card");
 
    fireEvent.click(screen.getAllByTestId("btn-excluir-card")[0]);
    fireEvent.click(screen.getByRole("button", { name: /excluir/i }));
 
    await screen.findByText("Erro ao deletar o dragão. Tente novamente.");
  });
});