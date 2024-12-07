import { Sidebar } from './styles';
import { Text } from '../Text/Text';
import { Link, useNavigate } from 'react-router-dom';
import { ButtonGeneral } from '../ButtonGeneral/ButtonGeneral';
import { useAuth } from '@app/contexts/AuthProvider/AuthProvider';
import { useEffect, useState } from 'react';
import { getUserRole } from '@app/config/fireBaseRoles';

export const SideBar = () => {
  const { user, logout } = useAuth();
  const [role, setRole] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      const fetchRole = async () => {
        const userRole = user.email ? await getUserRole(user.email) : null;
        setRole(userRole);
      };

      fetchRole();
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Erro ao deslogar o usuário:', error);
    }
  };

  return (
    <Sidebar>
      <Text preset="headingLarge" margin="0 0 40px">
        SLC todo
      </Text>

      {role === null ? (
        <div>Carregando...</div>
      ) : (
        <nav>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {role === 'limited' && (
              <>
                <Link to="/dashboard">Dashboard</Link>
                <span style={{ color: 'gray', cursor: 'not-allowed' }}>
                  Register (Você não tem autorização)
                </span>
              </>
            )}
            {role === 'unlimited' && (
              <>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </div>
          <ButtonGeneral title="Logout" onClick={handleLogout} padding="18px" />
        </nav>
      )}
    </Sidebar>
  );
};
