import { Button } from "./Button";
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe("Button component", () => {
    it("deve renderizar o conteúdo corretamente", () => {
        render(<Button> Click me!</Button>);
        expect(screen.getByText('Click me!')).toBeInTheDocument();
    })
    
    it("deve aplicar a classe de variante danger quando o prop for passada", () => {
        render(<Button variante="danger">Excluir</Button>);
        const button = screen.getByRole('button');
        expect(button.className).toContain('danger');
    })

    it("deve ter o atributo type submit quando passado", () => {
        render(<Button type= "submit"> Enviar</Button>);
        expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
    })
});