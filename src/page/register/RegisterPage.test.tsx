import { screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import RegisterPage from "./RegisterPage";
import { cadastrarDragao } from "../../services/dragonService";
import { renderWithProviders } from "../../test/utils/CustomRender";


const mockNavigate = vi.fn();

vi.mock("../../services/dragonService", () => ({
  cadastrarDragao: vi.fn()
}));

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockCadastrarDragao = cadastrarDragao as unknown as ReturnType<typeof vi.fn>;
const PLACEHOLDER_NOME = "Ex: Fúria da Noite";
const PLACEHOLDER_TIPO = "Ex: Fogo, Gelo, etc";
const PLACEHOLDER_HISTORIA = "Ex: Nasceu na Ilha de Berk";

const BOTAO_CADASTRAR = /cadastrar dragão/i;
const BOTAO_ADICIONAR = /\+ adicionar/i;

const NOME_DRAGAO = "Banguela";
const TIPO_DRAGAO = "Fogo";
const HISTORIA = "Nasceu na Ilha de Berk";

const MENSAGEM_ERRO_VALIDACAO = "Nome e tipo são obrigatórios.";
const MENSAGEM_ERRO_SERVICO = "Erro ao cadastrar o dragão. Tente novamente.";

describe("RegisterPage", () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve renderizar os campos do formulário", () => {
    renderWithProviders(<RegisterPage />);

    expect(screen.getByPlaceholderText(PLACEHOLDER_NOME)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(PLACEHOLDER_TIPO)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(PLACEHOLDER_HISTORIA)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: BOTAO_CADASTRAR })).toBeInTheDocument();
  });

  it("deve atualizar os inputs quando o usuário digitar", () => {
    renderWithProviders(<RegisterPage />);

    const campoNome = screen.getByPlaceholderText(PLACEHOLDER_NOME);
    const campoTipo = screen.getByPlaceholderText(PLACEHOLDER_TIPO);

    fireEvent.change(campoNome, { target: { value: NOME_DRAGAO } });
    fireEvent.change(campoTipo, { target: { value: TIPO_DRAGAO } });

    expect(campoNome).toHaveValue(NOME_DRAGAO);
    expect(campoTipo).toHaveValue(TIPO_DRAGAO);
  });

  it("deve adicionar uma história", () => {
    renderWithProviders(<RegisterPage />);

    const campoHistoria = screen.getByPlaceholderText(PLACEHOLDER_HISTORIA);

    fireEvent.change(campoHistoria, { target: { value: HISTORIA } });
    fireEvent.click(screen.getByRole("button", { name: BOTAO_ADICIONAR }));

    expect(screen.getByText(HISTORIA)).toBeInTheDocument();
  });

  it("deve remover uma história", () => {
    renderWithProviders(<RegisterPage />);

    const campoHistoria = screen.getByPlaceholderText(PLACEHOLDER_HISTORIA);

    fireEvent.change(campoHistoria, { target: { value: HISTORIA } });
    fireEvent.click(screen.getByRole("button", { name: BOTAO_ADICIONAR }));

    const botaoRemover = screen.getByLabelText("Remover história");

    fireEvent.click(botaoRemover);

    expect(screen.queryByText(HISTORIA)).not.toBeInTheDocument();
  });

  it("deve mostrar erro se nome ou tipo não forem preenchidos", () => {
    renderWithProviders(<RegisterPage />);

    fireEvent.click(screen.getByRole("button", { name: BOTAO_CADASTRAR }));

    expect(screen.getByText(MENSAGEM_ERRO_VALIDACAO)).toBeInTheDocument();
  });

  it("deve cadastrar dragão com sucesso", async () => {
    mockCadastrarDragao.mockResolvedValue(true);

    renderWithProviders(<RegisterPage />);

    const campoNome = screen.getByPlaceholderText(PLACEHOLDER_NOME);
    const campoTipo = screen.getByPlaceholderText(PLACEHOLDER_TIPO);

    fireEvent.change(campoNome, { target: { value: NOME_DRAGAO } });
    fireEvent.change(campoTipo, { target: { value: TIPO_DRAGAO } });

    fireEvent.click(screen.getByRole("button", { name: BOTAO_CADASTRAR }));

    await waitFor(() => {
      expect(mockCadastrarDragao).toHaveBeenCalled();
    });

    expect(
      screen.getByText(`Dragão "${NOME_DRAGAO}" cadastrado com sucesso!`)
    ).toBeInTheDocument();
  });

  it("deve mostrar erro quando o serviço falhar", async () => {
    mockCadastrarDragao.mockRejectedValue(new Error());

    renderWithProviders(<RegisterPage />);

    const campoNome = screen.getByPlaceholderText(PLACEHOLDER_NOME);
    const campoTipo = screen.getByPlaceholderText(PLACEHOLDER_TIPO);

    fireEvent.change(campoNome, { target: { value: NOME_DRAGAO } });
    fireEvent.change(campoTipo, { target: { value: TIPO_DRAGAO } });

    fireEvent.click(screen.getByRole("button", { name: BOTAO_CADASTRAR }));

    await waitFor(() => {
      expect(
        screen.getByText(MENSAGEM_ERRO_SERVICO)
      ).toBeInTheDocument();
    });
  });

  it("deve navegar para lista de dragões ao clicar no botão de voltar", () => {
    renderWithProviders(<RegisterPage />);

    const botaoVoltar = screen.getAllByRole("button")[0];

    fireEvent.click(botaoVoltar);

    expect(mockNavigate).toHaveBeenCalledWith("/dragoes");
  });

});