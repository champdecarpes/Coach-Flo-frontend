// src/components/Auth/RequireAuth.tsx
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/app/hooks';

interface RequireAuthProps {
  children?: React.ReactNode;
}

export default function RequireAuth({ children } : RequireAuthProps) {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

