import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function DashboardSidebar() {
  const { user } = useAuth();

  const isSuperAdmin = user?.role === 'SUPERADMIN';

  return (
    <aside className="dashboard-sidebar">
      <div className="dashboard-logo">
        <div className="dashboard-logo-icon">🕌</div>

        <div>
          <h2>Sakinah</h2>
          <span>Management Portal</span>
        </div>
      </div>

      <nav className="dashboard-nav">
        <NavLink to="/dashboard" end>
          🏠 Dashboard
        </NavLink>

        <NavLink to="/dashboard/mosques">🕌 Mosques</NavLink>

        <NavLink to="/dashboard/prayers">🕋 Prayer Times</NavLink>

        <NavLink to="/dashboard/announcements">📢 Announcements</NavLink>

        <NavLink to="/dashboard/events">📅 Events</NavLink>

        <NavLink to="/dashboard/volunteers">👥 Volunteers</NavLink>

        <NavLink to="/dashboard/analytics">📊 Analytics</NavLink>

        {isSuperAdmin && (
          <>
            <div className="dashboard-nav-divider">SUPER ADMIN</div>

            <NavLink to="/dashboard/approvals">✅ Approvals</NavLink>

            <NavLink to="/dashboard/users">👤 Users</NavLink>

            <NavLink to="/dashboard/roles">🔐 Roles</NavLink>

            <NavLink to="/dashboard/platform">🌐 Platform Analytics</NavLink>

            <NavLink to="/dashboard/settings">⚙ Settings</NavLink>
          </>
        )}
      </nav>
    </aside>
  );
}

export default DashboardSidebar;
