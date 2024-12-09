import { useEffect, useState } from 'react';
import { Text } from '@views/components/Text/Text';

import { getUsersData } from '@app/config/firebaseTask';
import { Table } from '@views/components/UserDataTable/UserDataTable';
import { SideBar } from '@views/components/SideBar/SiderBar';

export const UserRegister = () => {
  interface User {
    name: string;
    id: string;
    email: string;
    taskCount?: number;
    tasks: {
      id: string;
      title: string;
      description: string;
      createdAt: string;
    }[];
  }

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsersData = async () => {
      const data = await getUsersData();
      setUsers(
        data.map((user: User) => ({
          ...user,
          taskCount: user.tasks.length,
        })),
      );
    };

    fetchUsersData();
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <SideBar />

      <div style={{ flex: 1, padding: '20px' }}>
        <Text preset="headingLarge" bold margin="0 0 20px">
          Usuários Cadastrados
        </Text>

        <Table
          headers={['Name', 'Id', 'Email', 'Qtd Tarefas']}
          rows={users.map((user) => ({
            name: user.name,
            id: user.id,
            email: user.email,
            taskCount: 3,
          }))}
        />
      </div>
    </div>
  );
};
