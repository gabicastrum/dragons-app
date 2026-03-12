import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ListPage from "./ListPage";
import { type IDragon } from "../../interfaces/dragon";

const mockListarDragoes = vi.fn();

vi.mock("../../services/dragonService", () => ({
  listarDragoes: (...args: unknown[]) => mockListarDragoes(...args)
}));

vi.mock("../../components/header/Header", () => ({
  Header: () => <div data-testid="header">Header</div>
}));

vi.mock("../../components/dragon-card/DragonCard", () => ({
  DragonCard: ({ dragon }: { dragon: IDragon }) => (
    <div data-testid="dragon-card">{dragon.name}</div>
  )
}));

const DRAGAO_PRIMEIRO = "Noberta";
const DRAGAO_SEGUNDO = "Noberto";

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

    render(<ListPage />);

    const cards = await screen.findAllByTestId("dragon-card");

    expect(cards).toHaveLength(2);
  });

  it("deve ordenar os dragões por nome", async () => {

    const dragoesMock: IDragon[] = [
      { id: "1", name: DRAGAO_PRIMEIRO } as IDragon,
      { id: "2", name: DRAGAO_SEGUNDO } as IDragon
    ];

    mockListarDragoes.mockResolvedValue(dragoesMock);

    render(<ListPage />);

    const cards = await screen.findAllByTestId("dragon-card");

    expect(cards[0]).toHaveTextContent(DRAGAO_PRIMEIRO);
    expect(cards[1]).toHaveTextContent(DRAGAO_SEGUNDO);
  });

});