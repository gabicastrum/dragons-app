import { screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import LoginPage from "./LoginPage";
import { renderWithProviders } from "../../test/utils/CustomRender";

const mockLogin = vi.fn();
const mockNavigate = vi.fn();

vi.mock("../../hooks/useAuth", () => ({
  useAuth: () => ({
    login: mockLogin
  })
}));

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const PLACEHOLDER_EMAIL = "exemplo@dragao.com";
const PLACEHOLDER_SENHA = "senha";
const TEXTO_BOTAO_ENTRAR = /entrar/i;

const EMAIL_VALIDO = "admin@dragoes.com";
const SENHA_VALIDA = "SenhaForte@123";
const EMAIL_INVALIDO = "gabriela@gmail.com";
const SENHA_INVALIDA = "SenhaFraca@123";

const MENSAGEM_ERRO_LOGIN = "Usuário ou senha inválidos";
const ROTA_DRAGOES = "/dragoes";

describe("LoginPage", () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("deve renderizar os campos de login", () => {
    renderWithProviders(<LoginPage />);

    expect(screen.getByPlaceholderText(PLACEHOLDER_EMAIL)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(PLACEHOLDER_SENHA)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: TEXTO_BOTAO_ENTRAR })).toBeInTheDocument();
  });

  it("deve atualizar os inputs quando o usuário digitar", () => {
    renderWithProviders(<LoginPage />);

    const campoEmail = screen.getByPlaceholderText(PLACEHOLDER_EMAIL);
    const campoSenha = screen.getByPlaceholderText(PLACEHOLDER_SENHA);

    fireEvent.change(campoEmail, { target: { value: EMAIL_VALIDO } });
    fireEvent.change(campoSenha, { target: { value: SENHA_VALIDA } });

    expect(campoEmail).toHaveValue(EMAIL_VALIDO);
    expect(campoSenha).toHaveValue(SENHA_VALIDA);
  });

  it("deve chamar login com email e senha", () => {
    mockLogin.mockReturnValue(true);

    renderWithProviders(<LoginPage />);

    const campoEmail = screen.getByPlaceholderText(PLACEHOLDER_EMAIL);
    const campoSenha = screen.getByPlaceholderText(PLACEHOLDER_SENHA);

    fireEvent.change(campoEmail, { target: { value: EMAIL_VALIDO } });
    fireEvent.change(campoSenha, { target: { value: SENHA_VALIDA } });

    fireEvent.click(screen.getByRole("button", { name: TEXTO_BOTAO_ENTRAR }));

    expect(mockLogin).toHaveBeenCalledWith(EMAIL_VALIDO, SENHA_VALIDA);
  });

  it("deve navegar para a página de dragões quando login for sucesso", () => {
    mockLogin.mockReturnValue(true);

    renderWithProviders(<LoginPage />);

    const campoEmail = screen.getByPlaceholderText(PLACEHOLDER_EMAIL);
    const campoSenha = screen.getByPlaceholderText(PLACEHOLDER_SENHA);

    fireEvent.change(campoEmail, { target: { value: EMAIL_VALIDO } });
    fireEvent.change(campoSenha, { target: { value: SENHA_VALIDA } });

    fireEvent.click(screen.getByRole("button", { name: TEXTO_BOTAO_ENTRAR }));

    expect(mockNavigate).toHaveBeenCalledWith(ROTA_DRAGOES);
  });

it("deve exibir mensagem de erro quando login falhar", () => {
  vi.useFakeTimers();
  mockLogin.mockReturnValue(false);

  renderWithProviders(<LoginPage />);

  const campoEmail = screen.getByPlaceholderText(PLACEHOLDER_EMAIL);
  const campoSenha = screen.getByPlaceholderText(PLACEHOLDER_SENHA);

  fireEvent.change(campoEmail, { target: { value: EMAIL_INVALIDO } });
  fireEvent.change(campoSenha, { target: { value: SENHA_INVALIDA } });

  fireEvent.click(screen.getByRole("button", { name: TEXTO_BOTAO_ENTRAR }));

  expect(screen.getByText(MENSAGEM_ERRO_LOGIN)).toBeInTheDocument();

  act(() => {
    vi.advanceTimersByTime(1500);
  });

  expect(screen.queryByText(MENSAGEM_ERRO_LOGIN)).not.toBeInTheDocument();
});

});