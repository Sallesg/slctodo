import { getUserRole } from '@app/config/fireBaseRoles';
import { useAuth } from '@app/contexts/AuthProvider/AuthProvider';
import { useState, useEffect } from 'react';

interface RouteGuardReturn {
  isAuthorized: boolean;
  isLoading: boolean;
}

export const useProtectedRoute = (allowedRoles: string[]): RouteGuardReturn => {
  const { user } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      if (user) {
        const role = user.email ? await getUserRole(user.email) : '';
        setIsAuthorized(allowedRoles.includes(role || ''));
      } else {
        setIsAuthorized(false);
      }
      setIsLoading(false);
    };

    fetchRole();
  }, [user, allowedRoles]);

  return { isAuthorized, isLoading };
};
