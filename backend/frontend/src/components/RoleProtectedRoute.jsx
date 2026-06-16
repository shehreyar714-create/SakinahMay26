import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function RoleProtectedRoute({ children, allowedRoles = [] }) {
  const { user, loading, isLoggedIn } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          color: '#E6BB51',
          fontSize: '18px',
        }}
      >
        Loading...
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const role = user?.role;

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
