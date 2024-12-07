import React, { useEffect, useState } from 'react';
import { DialogOverlay, DialogContent, Button, FileInput } from './style';
import { TextInput } from '../TextInput/TextInput';
import { useTasks } from '@app/contexts/TaskProvider/TaskProvider';
import { Text } from '../Text/Text';
import { $fontFamily, $fontSizes } from '@app/constants/fontTypes';

interface DialogCreateTaskProps {
  isOpen: boolean;
  onClose: () => void;
  taskToEdit?: {
    id: string;
    title: string;
    description: string;
    dueData: string;
    priority: string;
    status: string;
  };
}

type Variant = 'input' | 'select';

interface userInputProps {
  label: string;
  type?: 'text' | 'email' | 'password' | 'date';
  variant: Variant;
  inputprops: {
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
  options?: { value: string; label: string }[];
}

interface userSelectProps {
  label: string;
  type?: 'select';
  variant: Variant;
  inputprops: {
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
  options?: { id: number; value: string; label: string }[];
}

export const DialogCreateTask = ({
  isOpen,
  onClose,
  taskToEdit,
}: DialogCreateTaskProps) => {
  const { addTask, editTask } = useTasks();

  const [newTask, setNewTask] = useState({
    id: '',
    title: '',
    description: '',
    dueData: '',
    dueDate: '',
    priority: '',
    status: '',
    attachment: null as File | null,
  });

  useEffect(() => {
    if (taskToEdit) {
      setNewTask({
        id: taskToEdit.id,
        title: taskToEdit.title,
        description: taskToEdit.description,
        dueData: '',
        dueDate: '',
        priority: '',
        status: '',
        attachment: null,
      });
    }
  }, [taskToEdit]);

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = event.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setNewTask((prevTask) => ({
      ...prevTask,
      attachment: file,
    }));
  };

  const handleSave = async () => {
    if (!newTask.title || !newTask.description) {
      alert('Por favor, preencha o título e a descrição.');
      return;
    }

    try {
      if (newTask.id) {
        await editTask(
          newTask.id,
          newTask.title,
          newTask.description,
          newTask.dueDate,
          newTask.priority,
          newTask.status,
        );
      } else {
        await addTask(
          newTask.title,
          newTask.description,
          newTask.dueDate,
          newTask.priority,
          newTask.status,
          newTask.attachment ? newTask.attachment.name : '',
        );
      }
      onClose();
    } catch (error) {
      console.error('Erro ao salvar a tarefa:', error);
    }
  };

  if (!isOpen) return null;

  const userInput: userInputProps[] = [
    {
      label: 'Título:',
      type: 'text',
      variant: 'input',
      inputprops: {
        name: 'title',
        value: newTask.title,
        onChange: handleInputChange,
      },
    },
    {
      label: 'Descrição:',
      type: 'text',
      variant: 'input',
      inputprops: {
        name: 'description',
        value: newTask.description,
        onChange: handleInputChange,
      },
    },
    {
      label: 'Data de Vencimento:',
      type: 'date',
      variant: 'input',
      inputprops: {
        name: 'dueDate',
        value: newTask.dueDate,
        onChange: handleInputChange,
      },
    },
  ];

  const userSelect: userSelectProps[] = [
    {
      label: 'Prioridade:',
      variant: 'select',
      inputprops: {
        name: 'priority',
        value: newTask.priority,
        onChange: handleInputChange,
      },
      options: [
        { id: 0, value: '', label: 'Selecione a prioridade' },
        { id: 1, value: 'Baixa', label: 'Baixa' },
        { id: 2, value: 'Média', label: 'Média' },
        { id: 3, value: 'Alta', label: 'Alta' },
      ],
    },
    {
      label: 'Status:',
      variant: 'select',
      inputprops: {
        name: 'status',
        value: newTask.status,
        onChange: handleInputChange,
      },
      options: [
        { id: 4, value: '', label: 'Selecione o status' },
        { id: 5, value: 'Pendente', label: 'Pendente' },
        { id: 6, value: 'Em andamento', label: 'Em andamento' },
        { id: 7, value: 'Concluído', label: 'Concluído' },
      ],
    },
  ];

  return (
    <DialogOverlay onClick={onClose}>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        {userInput.map(({ label, type, inputprops }: userInputProps) => (
          <TextInput
            key={label}
            label={label}
            inputprops={inputprops}
            type={type}
          />
        ))}
        {userSelect.map(({ label, inputprops, options }: userSelectProps) => (
          <div key={label} style={{ marginBottom: '6px', marginTop: '2px' }}>
            <Text preset="paragraphLarge" semiBold margin="0 0 4px">
              {label}
            </Text>
            <select
              name={inputprops.name}
              value={inputprops.value}
              onChange={(event) =>
                handleInputChange(
                  event as React.ChangeEvent<
                    HTMLInputElement | HTMLSelectElement
                  >,
                )
              }
              style={{
                padding: '18px 10px',
                width: '100%',
                borderRadius: 12,
                fontFamily: $fontFamily.regular[0],
                fontWeight: $fontFamily.regular[1],
                ...$fontSizes.paragraphMedium,
              }}
            >
              {options &&
                options.map((option, id) => (
                  <option key={id} value={option.value}>
                    {option.label}
                  </option>
                ))}
            </select>
          </div>
        ))}
        <FileInput type="file" name="attachment" onChange={handleFileChange} />
        <div>
          <Button onClick={handleSave}>Salvar</Button>
          <Button onClick={onClose} variant="cancel">
            Cancelar
          </Button>
        </div>
      </DialogContent>
    </DialogOverlay>
  );
};
