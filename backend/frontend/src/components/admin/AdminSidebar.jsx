import { NavLink } from 'react-router-dom';
import {
  FaMosque,
  FaUsers,
  FaBullhorn,
  FaCalendarAlt,
  FaCog,
  FaChartBar,
  FaHistory,
  FaHome,
} from 'react-icons/fa';

import '../../css/AdminSidebar.css';
import { useAuth } from '../../hooks/useAuth';

function AdminSidebar() {
  const { user } = useAuth();

  const role = user?.role;

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <h2>Sakinah</h2>
        <span>{role}</span>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard">
          <FaHome />
          Dashboard
        </NavLink>

        <NavLink to="/dashboard/mosques">
          <FaMosque />
          Mosques
        </NavLink>

        <NavLink to="/dashboard/announcements">
          <FaBullhorn />
          Announcements
        </NavLink>

        <NavLink to="/dashboard/events">
          <FaCalendarAlt />
          Events
        </NavLink>

        {role === 'SUPERADMIN' && (
          <>
            <NavLink to="/dashboard/admins">
              <FaUsers />
              Admins
            </NavLink>

            <NavLink to="/dashboard/analytics">
              <FaChartBar />
              Analytics
            </NavLink>

            <NavLink to="/dashboard/audit">
              <FaHistory />
              Audit Logs
            </NavLink>

            <NavLink to="/dashboard/settings">
              <FaCog />
              Settings
            </NavLink>
          </>
        )}
      </nav>
    </aside>
  );
}

export default AdminSidebar;
