import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Header } from './Header';

describe('Header Component', () => {
  it('deve renderizar o título do app', () => {
    render(<Header />);
    expect(screen.getByText('Dragões App')).toBeInTheDocument();
  });

  it('deve renderizar a imagem da logo com alt text correto', () => {
    render(<Header />);
    const logo = screen.getByAltText('Logo');
    expect(logo).toBeInTheDocument();
  });

  it('deve conter um link para a home', () => {
    render(<Header />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/');
  });
});