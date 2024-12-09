import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '@views/pages/Login/Login';
import { DashboardTasks } from '@views/pages/DashboardTasks/DashboardTasks';
import { UserRegister } from '@views/pages/UserRegister/UserRegister';
import { IntroPage } from '@views/pages/IntroPage/IntroPage';
import { useProtectedRoute } from '@app/hooks/useProtectedRoute';

export const Router = () => {
  const dashboardGuard = useProtectedRoute(['unlimited', 'limited']);
  const registerGuard = useProtectedRoute(['unlimited']);

  if (dashboardGuard.isLoading || registerGuard.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<IntroPage />} />
      <Route path="/login" element={<Login />} />

      {dashboardGuard.isAuthorized ? (
        <Route path="/dashboard" element={<DashboardTasks />} />
      ) : (
        <Route path="/dashboard" element={<Navigate to="/login" />} />
      )}

      {registerGuard.isAuthorized ? (
        <Route path="/register" element={<UserRegister />} />
      ) : (
        <Route
          path="/register"
          element={
            <Navigate
              to="/dashboard"
              state={{
                message: 'Você não tem permissão para acessar esta página.',
              }}
            />
          }
        />
      )}
    </Routes>
  );
};
