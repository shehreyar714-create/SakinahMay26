import { useAuth } from '../../hooks/useAuth';

function DashboardTopbar() {
  const { user } = useAuth();

  return (
    <header className="dashboard-topbar">
      <div>
        <h1 className="dashboard-page-title">السلام عليكم</h1>

        <p className="dashboard-page-subtitle">
          Welcome back, {user?.firstName || 'User'}
        </p>
      </div>

      <div className="dashboard-topbar-right">
        <button className="dashboard-notification-btn">🔔</button>

        <div className="dashboard-user-card">
          <div className="dashboard-avatar">
            {(user?.firstName || 'U').charAt(0).toUpperCase()}
          </div>

          <div>
            <h4>
              {user?.firstName} {user?.lastName}
            </h4>

            <span>{user?.role}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default DashboardTopbar;
