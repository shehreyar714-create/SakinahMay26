import DashboardLayout from '../components/dashboard/DashboardLayout';
import { useAuth } from '../hooks/useAuth';

function Dashboard() {
  const { user } = useAuth();

  const isAdmin = user?.role === 'ADMIN';
  const isSuperAdmin = user?.role === 'SUPERADMIN';

  return (
    <DashboardLayout>
      <div className="dashboard-home">
        {/* Welcome Section */}
        <div className="dashboard-welcome-card">
          <div>
            <h1 className="dashboard-title">
              Assalamu Alaikum, {user?.firstName || 'User'}
            </h1>

            <p className="dashboard-subtitle">
              Welcome to the Sakinah Management Portal
            </p>
          </div>

          <div className="dashboard-role-badge">
            {isSuperAdmin ? 'SUPERADMIN' : 'ADMIN'}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="dashboard-stats-grid">
          <div className="dashboard-stat-card">
            <h3>Total Mosques</h3>
            <span>142</span>
          </div>

          <div className="dashboard-stat-card">
            <h3>Pending Approvals</h3>
            <span>18</span>
          </div>

          <div className="dashboard-stat-card">
            <h3>Events</h3>
            <span>12</span>
          </div>

          <div className="dashboard-stat-card">
            <h3>Announcements</h3>
            <span>34</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-section">
          <h2>Quick Actions</h2>

          <div className="dashboard-actions-grid">
            <button className="dashboard-action-btn">Add Announcement</button>

            <button className="dashboard-action-btn">Create Event</button>

            <button className="dashboard-action-btn">
              Update Prayer Times
            </button>

            {isSuperAdmin && (
              <button className="dashboard-action-btn">Approve Mosques</button>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="dashboard-content-grid">
          <div className="dashboard-panel">
            <h2>Recent Mosque Registrations</h2>

            <ul className="dashboard-list">
              <li>Masjid Al Noor</li>
              <li>Masjid Rahmah</li>
              <li>Masjid Bilal</li>
              <li>Masjid Furqan</li>
            </ul>
          </div>

          <div className="dashboard-panel">
            <h2>Latest Announcements</h2>

            <ul className="dashboard-list">
              <li>Ramadan Preparation Meeting</li>
              <li>Community Iftar Registration</li>
              <li>Volunteer Recruitment</li>
              <li>Weekend Quran Program</li>
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
