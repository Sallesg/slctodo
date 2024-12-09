import { render, screen, fireEvent } from '@testing-library/react';
import { IntroPage } from './IntroPage';
import { vi } from 'vitest';
import { BrowserRouter, useNavigate } from 'react-router-dom';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  BrowserRouter: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe('IntroPage', () => {
  it('renders the correct texts and button', () => {
    render(
      <BrowserRouter>
        <IntroPage />
      </BrowserRouter>,
    );

    expect(
      screen.getByText(/Não esqueça de planejar o seu dia/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Planeje o seu dia de uma forma simples e eficiente/i),
    ).toBeInTheDocument();

    const button = screen.getByText(/Comece agora!/i);
    expect(button).toBeInTheDocument();
  });

  it('navigates to "/login" when the "Comece agora!" button is clicked', () => {
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    render(
      <BrowserRouter>
        <IntroPage />
      </BrowserRouter>,
    );

    fireEvent.click(screen.getByText(/Comece agora!/i));

    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('renders the image correctly', () => {
    render(
      <BrowserRouter>
        <IntroPage />
      </BrowserRouter>,
    );

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
