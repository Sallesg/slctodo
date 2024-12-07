import { createContext, useContext, useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
} from 'firebase/firestore';
import { useAuth } from '../AuthProvider/AuthProvider';
import { db } from '@app/config/firebaseDb';

interface Task {
  id: string;
  title: string;
  description: string;
  dueData?: string;
  priority?: string;
  status?: string;
}

interface TaskContextProps {
  tasks: Task[];
  addTask: (
    title: string,
    description: string,
    dueData: string,
    priority: string,
    status: string,
    dueDate: string,
  ) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  editTask: (
    id: string,
    title: string,
    description: string,
    dueData: string,
    priority: string,
    status: string,
  ) => Promise<void>;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchTasks = async () => {
      try {
        const q = query(
          collection(db, 'tasks'),
          where('userId', '==', user.uid),
        );
        const querySnapshot = await getDocs(q);
        const userTasks = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          createdAt: doc.data().createdAt,
          dueDate: doc.data().dueDate || '',
          priority: doc.data().priority || '',
          status: doc.data().status || '',
        })) as Task[];

        setTasks(userTasks);
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
      }
    };

    fetchTasks();
  }, [user]);

  const addTask = async (
    title: string,
    description: string,
    priority: string,
    status: string,
    dueDate: string,
  ) => {
    if (!user) return;

    const newTask = {
      title,
      description,
      userId: user.uid,
      dueDate: dueDate || '',
      priority: priority || '',
      status: status || '',
    };

    try {
      const docRef = await addDoc(collection(db, 'tasks'), newTask);
      console.log('Tarefa salva com ID:', docRef.id);
      setTasks((prevTasks) => [...prevTasks, { id: docRef.id, ...newTask }]);
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'tasks', id));
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
    }
  };

  const editTask = async (
    id: string,
    title: string,
    description: string,
    dueDate: string,
    priority: string,
    status: string,
  ) => {
    console.log('Editando tarefa no Firebase:', id, title, description); // Log para verificar valores

    try {
      const taskDoc = doc(db, 'tasks', id);
      await updateDoc(taskDoc, {
        title,
        description,
        dueDate,
        priority,
        status,
        updatedAt: new Date(),
      });

      console.log('Tarefa atualizada no Firebase');
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id
            ? { ...task, title, description, priority, dueDate, status }
            : task,
        ),
      );
    } catch (error) {
      console.error('Erro ao editar tarefa:', error);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, editTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
