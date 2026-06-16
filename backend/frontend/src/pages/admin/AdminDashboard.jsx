import { useAuth } from '../../hooks/useAuth';
import {
  FaMosque,
  FaUsers,
  FaCalendarAlt,
  FaBullhorn,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
} from 'react-icons/fa';
import AdminSidebar from '../../components/admin/AdminSidebar';

import '../../css/AdminDashboard.css';

function AdminDashboard() {
  const { user } = useAuth();

  const role = user?.role || 'USER';

  return (
    <div className="dashboard-layout">
      <AdminSidebar />

      <div className="dashboard-main">{/* EXISTING DASHBOARD CONTENT */}</div>
    </div>
  );
}

export default AdminDashboard;
