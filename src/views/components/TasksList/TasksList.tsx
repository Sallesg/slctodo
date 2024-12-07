import { useTasks } from '@app/contexts/TaskProvider/TaskProvider';
import { Actions, TaskCard, TaskHeader } from './style';
import { Icon } from '../Icon/Icon';
import { Text } from '../Text/Text';
import { useEffect, useState } from 'react';

interface TaskListProps {
  onEditTask: (task: {
    id: string;
    title: string;
    description: string;
    dueData?: string;
    priority?: string;
    status?: string;
  }) => void;
}

export const TaskList = ({ onEditTask }: TaskListProps) => {
  const { tasks, deleteTask } = useTasks();
  const [columns, setColumns] = useState<number>(3);

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 600) {
        setColumns(1);
      } else if (width < 900) {
        setColumns(2);
      } else {
        setColumns(3);
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, minmax(300px, 1fr))`,
        gap: '16px',
      }}
    >
      {tasks.map((task) => (
        <TaskCard key={task.id}>
          <Text preset="paragraphLarge">{task.title ?? 'titulo'}</Text>
          <Text
            preset="paragraphSmall"
            style={{
              whiteSpace: 'normal',
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
            }}
          >
            {task.description}
          </Text>
          <Text preset="paragraphSmall">
            {`Data de vencimento: ${task.dueData}`}
          </Text>
          <Text preset="paragraphSmall">
            {task.priority ? `Prioridade: ${task.priority}` : ''}
          </Text>
          <Text preset="paragraphSmall">
            {task.status ? `Status: ${task.status}` : ''}
          </Text>
          <TaskHeader>
            <Actions>
              <Icon
                name="editIcon"
                onClick={() =>
                  onEditTask({
                    id: task.id,
                    title: task.title,
                    description: task.description,
                    dueData: task.dueData,
                    priority: task.priority,
                    status: task.status,
                  })
                }
              />
              <Icon name="trashIcon" onClick={() => deleteTask(task.id)} />
            </Actions>
          </TaskHeader>
        </TaskCard>
      ))}
    </div>
  );
};
