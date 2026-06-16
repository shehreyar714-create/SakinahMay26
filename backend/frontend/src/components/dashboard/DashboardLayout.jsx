import DashboardSidebar from './DashboardSidebar';
import DashboardTopbar from './DashboardTopbar';
import '../../css/Dashboard.css';

function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <DashboardSidebar />

      <div className="dashboard-main">
        <DashboardTopbar />

        <div className="dashboard-content">{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;
