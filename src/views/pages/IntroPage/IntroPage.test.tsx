import { render, screen, fireEvent } from '@testing-library/react';
import { IntroPage } from './IntroPage';
import { vi } from 'vitest';
import { BrowserRouter, useNavigate } from 'react-router-dom';

// Mockando o 'react-router-dom' e incluindo o BrowserRouter
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'), // Mantém as importações reais
  useNavigate: vi.fn(), // Mock do useNavigate
  BrowserRouter: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ), // Mock do BrowserRouter
}));

describe('IntroPage', () => {
  it('renders the correct texts and button', () => {
    render(
      <BrowserRouter>
        <IntroPage />
      </BrowserRouter>,
    );

    // Verificando se o texto de título está sendo renderizado
    expect(
      screen.getByText(/Não esqueça de planejar o seu dia/i),
    ).toBeInTheDocument();

    // Verificando se o texto secundário está sendo renderizado
    expect(
      screen.getByText(/Planeje o seu dia de uma forma simples e eficiente/i),
    ).toBeInTheDocument();

    // Verificando se o botão "Comece agora!" está sendo renderizado
    const button = screen.getByText(/Comece agora!/i);
    expect(button).toBeInTheDocument();
  });

  it('navigates to "/login" when the "Comece agora!" button is clicked', () => {
    const mockNavigate = vi.fn();
    // Mockando o uso do useNavigate
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    render(
      <BrowserRouter>
        <IntroPage />
      </BrowserRouter>,
    );

    // Simulando o clique no botão
    fireEvent.click(screen.getByText(/Comece agora!/i));

    // Verificando se o navigate foi chamado com o caminho correto
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('renders the image correctly', () => {
    render(
      <BrowserRouter>
        <IntroPage />
      </BrowserRouter>,
    );

    // Verificando se a imagem está sendo renderizada com o src e alt corretos
    const image = screen.getByAltText(
      /Ilustração de uma folha com uma lista de tarefas/i,
    );
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      'src',
      expect.stringContaining('todoImage.png'),
    );
  });
});
