import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { LandingPage } from '../pages/LandingPage';
import { SolutionsPage } from '../pages/SolutionsPage';
import { SolutionDetail } from '../pages/solutions_sections/SolutionDetail';
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { ProfilePage } from '../pages/auth/ProfilePage';
import { Navigate } from 'react-router-dom';
import { authService } from '../services/auth.service';

// Koruyucu route bileşeni
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'solutions',
        element: <SolutionsPage />,
      },
      {
        path: 'solutions/:techType',
        element: <SolutionDetail />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);