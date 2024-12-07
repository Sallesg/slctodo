import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
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
  // const mockNavigate = vi.fn();

  beforeEach(() => {
    (useAuth as vi.Mock).mockReturnValue({
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
    expect(screen.getByText(/Senha/i)).toBeInTheDocument();
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

    // Mockando o contexto
    (useAuth as vi.Mock).mockReturnValue({
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

    // Simulando o envio do formulário
    const form = screen.getByRole('button', { name: /Login/i });
    fireEvent.submit(form);

    // Esperando a função login ser chamada e verificar o redirecionamento
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(
        'adrianogsallesf@gmail.com',
        'Aa@1234',
      );
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  // it('calls register function on form submission when in register mode', async () => {
  //   render(
  //     <BrowserRouter>
  //       <Login />
  //     </BrowserRouter>,
  //   );

  //   fireEvent.click(
  //     screen.getByRole('button', { name: /Ainda não possuo uma conta/i }),
  //   );
  //   fireEvent.change(screen.getByPlaceholderText(/Nome/i), {
  //     target: { value: 'User Name' },
  //   });
  //   fireEvent.change(screen.getByPlaceholderText(/Digite seu e-mail/i), {
  //     target: { value: 'test@example.com' },
  //   });
  //   fireEvent.change(screen.getByPlaceholderText(/Digite sua senha/i), {
  //     target: { value: 'password123' },
  //   });
  //   fireEvent.submit(screen.getByRole('button', { name: /Registrar/i }));

  //   expect(mockRegister).toHaveBeenCalledWith(
  //     'test@example.com',
  //     'password123',
  //   );
  //   expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  // });

  it('Verify if e-mail typed is fine', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );

    const emailInput = screen.getByPlaceholderText(
      /Digite seu e-mail/i,
    ) as HTMLLIElement;
    console.log(emailInput);
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

  // it('displays error message if email or password is invalid', async () => {
  //   render(
  //     <BrowserRouter>
  //       <Login />
  //     </BrowserRouter>,
  //   );

  //   const emailInput = screen.getByPlaceholderText(/Digite seu e-mail/i);
  //   const passwordInput = screen.getByPlaceholderText(/Digite sua senha/i);
  //   const submitButton = screen.getByRole('button', { name: /Login/i });

  //   // Email inválido
  //   fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
  //   expect(
  //     screen.getByText(/Por favor, insira um e-mail válido./i),
  //   ).toBeInTheDocument();

  //   // Email válido e senha vazia
  //   fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  //   fireEvent.change(passwordInput, { target: { value: '' } });
  //   fireEvent.submit(submitButton);
  //   expect(
  //     screen.getByText(/O campo senha é obrigatório./i),
  //   ).toBeInTheDocument();

  //   // Senha com menos de 6 caracteres
  //   fireEvent.change(passwordInput, { target: { value: '123' } });
  //   fireEvent.submit(submitButton);
  //   expect(
  //     screen.getByText(/A senha deve ter pelo menos 6 caracteres./i),
  //   ).toBeInTheDocument();

  //   // Senha sem letra maiúscula
  //   fireEvent.change(passwordInput, { target: { value: 'abc123!' } });
  //   fireEvent.submit(submitButton);
  //   expect(
  //     screen.getByText(/A senha deve conter pelo menos uma letra maiúscula./i),
  //   ).toBeInTheDocument();

  //   // Senha sem letra minúscula
  //   fireEvent.change(passwordInput, { target: { value: 'ABC123!' } });
  //   fireEvent.submit(submitButton);
  //   expect(
  //     screen.getByText(/A senha deve conter pelo menos uma letra minúscula./i),
  //   ).toBeInTheDocument();

  //   // Senha sem número
  //   fireEvent.change(passwordInput, { target: { value: 'Abcdef!' } });
  //   fireEvent.submit(submitButton);
  //   expect(
  //     screen.getByText(/A senha deve conter pelo menos um número./i),
  //   ).toBeInTheDocument();

  //   // Senha sem caractere especial
  //   fireEvent.change(passwordInput, { target: { value: 'Abc1234' } });
  //   fireEvent.submit(submitButton);
  //   expect(
  //     screen.getByText(
  //       /A senha deve conter pelo menos um caractere especial./i,
  //     ),
  //   ).toBeInTheDocument();
  // });
});
