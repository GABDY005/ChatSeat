import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ 
  requiredRole, 
  redirectPath = '/login' 
}) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }
  
  const userRole = sessionStorage.getItem('userRole');
  
  if (userRole === 'admin') {
    return <Outlet />;
  }
  
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return <Outlet />;
}