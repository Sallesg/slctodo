import { TaskProvider } from '@app/contexts/TaskProvider/TaskProvider';
import { useState } from 'react';
import {
  Container,
  Header,
  MainContent,
  NewTaskButton,
  TaskGrid,
} from './style';
import { SideBar } from '@views/components/SideBar/SiderBar';
import { Icon } from '@views/components/Icon/Icon';
import { DialogCreateTask } from '@views/components/DialogCreateTask/DialogCreateTask';
import { TaskList } from '@views/components/TasksList/TasksList';

export const DashboardTasks = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<{
    id: string;
    title: string;
    description: string;
    priority: string;
    status: string;
  } | null>(null);

  const handleCreateTask = () => {
    setTaskToEdit(null);
    setIsDialogOpen(!isDialogOpen);
  };

  const handleEditTask = (task: {
    id: string;
    title: string;
    description: string;
    priority?: string;
    status?: string;
  }) => {
    setTaskToEdit({
      ...task,
      priority: task.priority ?? '',
      status: task.status ?? '',
    });
    setIsDialogOpen(true);
  };

  return (
    <TaskProvider>
      <Container>
        <SideBar />
        <MainContent>
          <Header>
            <NewTaskButton onClick={handleCreateTask}>
              <Icon name="newTask" />
            </NewTaskButton>
          </Header>

          <TaskGrid>
            {isDialogOpen && (
              <DialogCreateTask
                isOpen={isDialogOpen}
                onClose={handleCreateTask}
                taskToEdit={taskToEdit ?? undefined}
              />
            )}
            <TaskList onEditTask={handleEditTask} />
          </TaskGrid>
        </MainContent>
      </Container>
    </TaskProvider>
  );
};
