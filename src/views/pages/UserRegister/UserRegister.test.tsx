import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { UserRegister } from './UserRegister';
import { getUsersData } from '@app/config/firebaseTask';

vi.mock('@views/components/SideBar/SiderBar', () => ({
  SideBar: () => <div data-testid="sidebar">Sidebar</div>,
}));

vi.mock('@views/components/UserDataTable/UserDataTable', () => ({
  Table: ({
    headers,
    rows,
  }: {
    headers: string[];
    rows: { name: string; id: string; email: string; taskCount: number }[];
  }) => (
    <div data-testid="user-table">
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.name}</td>
              <td>{row.id}</td>
              <td>{row.email}</td>
              <td>{row.taskCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
}));

vi.mock('@app/config/firebaseTask', () => ({
  getUsersData: vi.fn().mockResolvedValue([
    {
      name: 'User 1',
      id: '1',
      email: 'user1@example.com',
      tasks: [
        {
          id: '1',
          title: 'Task 1',
          description: 'Task 1 Description',
          createdAt: '2024-01-01',
        },
      ],
    },
    {
      name: 'User 2',
      id: '2',
      email: 'user2@example.com',
      tasks: [
        {
          id: '2',
          title: 'Task 2',
          description: 'Task 2 Description',
          createdAt: '2024-01-02',
        },
        {
          id: '3',
          title: 'Task 3',
          description: 'Task 3 Description',
          createdAt: '2024-01-03',
        },
      ],
    },
  ]),
}));

describe('UserRegister', () => {
  it('should render the main elements correctly', () => {
    render(<UserRegister />);

    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByText('Usuários Cadastrados')).toBeInTheDocument();
  });

  it('should fetch and display user data in the table', async () => {
    render(<UserRegister />);

    await waitFor(() => {
      expect(getUsersData).toHaveBeenCalled();
      expect(screen.getByTestId('user-table')).toBeInTheDocument();
      expect(screen.getByText('User 1')).toBeInTheDocument();
      expect(screen.getByText('user1@example.com')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument();

      expect(screen.getByText('User 2')).toBeInTheDocument();
      expect(screen.getByText('user2@example.com')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
    });
  });
});
