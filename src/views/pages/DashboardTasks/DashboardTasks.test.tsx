import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { DashboardTasks } from './DashboardTasks';
import { TaskProvider } from '@app/contexts/TaskProvider/TaskProvider';
import { AuthProvider } from '@app/contexts/AuthProvider/AuthProvider';

vi.mock('@views/components/DialogCreateTask/DialogCreateTask', () => ({
  DialogCreateTask: ({
    isOpen,
    onClose,
    taskToEdit,
  }: {
    isOpen: boolean;
    onClose: () => void;
    taskToEdit: {
      id: string;
      title: string;
      description: string;
      dueData: string;
      priority: string;
      status: string;
    } | null;
  }) => (
    <div data-testid="dialog-create-task">
      {isOpen && (
        <>
          <p>{taskToEdit ? 'Editing Task' : 'Creating New Task'}</p>
          <button onClick={onClose}>Close</button>
        </>
      )}
    </div>
  ),
}));

vi.mock('@views/components/SideBar/SiderBar', () => ({
  SideBar: () => <div data-testid="sidebar">Sidebar</div>,
}));

vi.mock('@views/components/TasksList/TasksList', () => ({
  TaskList: ({
    onEditTask,
  }: {
    onEditTask: (task: {
      id: string;
      title: string;
      description: string;
      dueData: string;
      priority: string;
      status: string;
    }) => void;
  }) => (
    <div data-testid="task-list">
      <button
        onClick={() =>
          onEditTask({
            id: '1',
            title: 'Test Task',
            description: 'Test Description',
            dueData: '2024-12-31',
            priority: 'High',
            status: 'Pending',
          })
        }
      >
        Edit Task
      </button>
    </div>
  ),
}));

describe('DashboardTasks', () => {
  it('should render the main elements correctly', () => {
    render(
      <AuthProvider>
        <TaskProvider>
          <DashboardTasks />
        </TaskProvider>
      </AuthProvider>,
    );

    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('task-list')).toBeInTheDocument();
    expect(screen.getByTestId('new-task')).toBeInTheDocument();
  });

  it("should open the task creation modal when the 'newTask' button is clicked", async () => {
    render(
      <AuthProvider>
        <TaskProvider>
          <DashboardTasks />
        </TaskProvider>
      </AuthProvider>,
    );

    const newTaskButton = screen.getByTestId('new-task');
    fireEvent.click(newTaskButton);

    await waitFor(() => {
      expect(screen.getByTestId('dialog-create-task')).toBeInTheDocument();
      expect(screen.getByText('Creating New Task')).toBeInTheDocument();
    });
  });

  it("should open the task editing modal when the 'Edit Task' button is clicked", async () => {
    render(
      <AuthProvider>
        <TaskProvider>
          <DashboardTasks />
        </TaskProvider>
      </AuthProvider>,
    );

    const editTaskButton = screen.getByText('Edit Task');
    fireEvent.click(editTaskButton);

    await waitFor(() => {
      expect(screen.getByTestId('dialog-create-task')).toBeInTheDocument();
      expect(screen.getByText('Editing Task')).toBeInTheDocument();
    });
  });

  it("should close the modal when the 'Close' button is clicked", async () => {
    render(
      <AuthProvider>
        <TaskProvider>
          <DashboardTasks />
        </TaskProvider>
      </AuthProvider>,
    );

    const newTaskButton = screen.getByTestId('new-task');
    fireEvent.click(newTaskButton);

    await waitFor(() => {
      const closeButton = screen.getByText('Close');
      fireEvent.click(closeButton);

      expect(
        screen.queryByTestId('dialog-create-task'),
      ).not.toBeInTheDocument();
    });
  });
});
