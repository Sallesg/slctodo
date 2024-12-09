import { render, screen, waitFor } from '@testing-library/react';
import { useAuth } from '@app/contexts/AuthProvider/AuthProvider';
import { getUserRole } from '@app/config/fireBaseRoles';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { SideBar } from './SiderBar';

vi.mock('@app/contexts/AuthProvider/AuthProvider', () => ({
  useAuth: vi.fn(),
}));

vi.mock('@app/config/fireBaseRoles', () => ({
  getUserRole: vi.fn(),
}));

const navigateMock = vi.fn();

describe('SideBar', () => {
  beforeEach(() => {
    navigateMock.mockClear();
  });

  it('should show loading state while fetching role', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { email: 'test@example.com' },
      logout: vi.fn(),
    });
    (getUserRole as jest.Mock).mockResolvedValue(null);

    render(
      <MemoryRouter>
        <SideBar />
      </MemoryRouter>,
    );

    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

  it('should render the correct links and buttons for "limited" user', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { email: 'test@example.com' },
      logout: vi.fn(),
    });
    (getUserRole as jest.Mock).mockResolvedValue('limited');

    render(
      <MemoryRouter>
        <SideBar />
      </MemoryRouter>,
    );

    await waitFor(() =>
      expect(screen.queryByText('Carregando...')).not.toBeInTheDocument(),
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(
      screen.getByText('Register (Você não tem autorização)'),
    ).toBeInTheDocument();
    expect(screen.queryByText('Register')).not.toBeInTheDocument();
  });

  it('should render the correct links and buttons for "unlimited" user', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { email: 'test@example.com' },
      logout: vi.fn(),
    });
    (getUserRole as jest.Mock).mockResolvedValue('unlimited');

    render(
      <MemoryRouter>
        <SideBar />
      </MemoryRouter>,
    );

    await waitFor(() =>
      expect(screen.queryByText('Carregando...')).not.toBeInTheDocument(),
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });
});
