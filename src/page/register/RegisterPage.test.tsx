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

const BOTAO_CADASTRAR = /salvar dragão/i;

const NOME_DRAGAO = "Banguela";
const TIPO_DRAGAO = "Fogo";

describe("RegisterPage", () => {

  beforeEach(() => {
    vi.clearAllMocks();
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
  
  it("deve chamar cadastrarDragao ao submeter", async () => {
    mockCadastrarDragao.mockResolvedValue(true);
    renderWithProviders(<RegisterPage />);

    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDER_NOME), { target: { value: NOME_DRAGAO } });
    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDER_TIPO), { target: { value: TIPO_DRAGAO } });
    fireEvent.click(screen.getByRole("button", { name: BOTAO_CADASTRAR }));

    await waitFor(() => {
     expect(mockCadastrarDragao).toHaveBeenCalled();
   });
});

});