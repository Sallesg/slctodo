import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseDb';

export const getUsersData = async () => {
  try {
    const tasksRef = collection(db, 'tasks');
    const snapshot = await getDocs(tasksRef);

    const usersData: Record<
      string,
      {
        name: string;
        email: string;
        tasks: {
          id: string;
          title: string;
          description: string;
          dueDate: string;
          createdAt: string;
          priority?: string;
          status?: string;
        }[];
      }
    > = {};

    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      const userId = data.user;

      if (!usersData[userId]) {
        usersData[userId] = {
          name: userId,
          email: userId,
          tasks: [],
        };
      }

      usersData[userId].tasks.push({
        id: doc.id,
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        createdAt: data.createdAt,
        priority: data.priority,
        status: data.status,
      });
    });

    const usersList = Object.keys(usersData).map((userId) => {
      const user = usersData[userId];

      return {
        id: userId,
        name: user.name,
        email: user.email,
        tasks: user.tasks,
      };
    });

    return usersList;
  } catch (error) {
    console.error('Erro ao buscar dados dos usuários: ', error);
    return [];
  }
};
