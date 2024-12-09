import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi, Mock } from 'vitest';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { Login } from './Login';
import { useAuth } from '@app/contexts/AuthProvider/AuthProvider';

vi.mock('@app/contexts/AuthProvider/AuthProvider', () => ({
  useAuth: vi.fn(),
}));

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useNavigate: vi.fn(),
  };
});

describe('Login Component', () => {
  const mockLogin = vi.fn();
  const mockRegister = vi.fn();

  beforeEach(() => {
    (useAuth as Mock).mockReturnValue({
      login: mockLogin,
      register: mockRegister,
    });
  });

  it('renders login form by default', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );

    expect(screen.getByText(/Bem-vindo de volta!/i)).toBeInTheDocument();
    expect(screen.getByText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Ainda não possuo uma conta/i }),
    ).toBeInTheDocument();
  });

  it('switches to register form when "Ainda não possuo uma conta" is clicked', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );

    fireEvent.click(
      screen.getByRole('button', { name: /Ainda não possuo uma conta/i }),
    );

    expect(screen.getByText(/Cadastre-se/i)).toBeInTheDocument();
    expect(screen.getByText(/Nome/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Registrar/i }),
    ).toBeInTheDocument();
  });

  it('calls login function on form submission when in login mode', async () => {
    const mockNavigate = vi.fn();
    const mockLogin = vi.fn().mockResolvedValue({});

    (useAuth as Mock).mockReturnValue({
      login: mockLogin,
      register: vi.fn(),
    });

    vi.fn().mockReturnValue(mockNavigate);
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );

    const emailInput = screen.getByPlaceholderText(
      /Digite seu e-mail/i,
    ) as HTMLInputElement;
    fireEvent.change(emailInput, {
      target: { value: 'adrianogsallesf@gmail.com' },
    });

    const passwordInput = screen.getByPlaceholderText(
      /Digite sua senha/i,
    ) as HTMLInputElement;
    fireEvent.change(passwordInput, { target: { value: 'Aa@1234' } });

    const form = screen.getByRole('button', { name: /Login/i });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(
        'adrianogsallesf@gmail.com',
        'Aa@1234',
      );
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('Verify if e-mail typed is fine', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );

    const emailInput = screen.getByPlaceholderText(
      /Digite seu e-mail/i,
    ) as HTMLLIElement;
    fireEvent.change(emailInput, {
      target: { value: 'adrianogsallesf@gmail.com' },
    });
    expect(emailInput.value).toBe('adrianogsallesf@gmail.com');
  });

  it('Verify if password typed is fine', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );

    const passwordInput = screen.getByPlaceholderText(
      /Digite sua senha/i,
    ) as HTMLLIElement;

    fireEvent.change(passwordInput, {
      target: { value: 'Password12!' },
    });

    expect(passwordInput.value).toBe('Password12!');
  });
});
