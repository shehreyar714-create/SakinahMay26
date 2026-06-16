import AdminSidebar from '../../components/admin/AdminSidebar';
import { useAuth } from '../../hooks/useAuth';
import '../../css/MosquesPage.css';

function MosquesPage() {
  const { user } = useAuth();

  const mosques = [
    {
      id: 1,
      name: 'Masjid Al Noor',
      city: 'Bhopal',
      status: 'Approved',
      imam: 'Maulana Ahmad',
    },
    {
      id: 2,
      name: 'Jamia Masjid',
      city: 'Chennai',
      status: 'Pending',
      imam: 'Maulana Yusuf',
    },
  ];

  return (
    <div className="dashboard-layout">
      <AdminSidebar />

      <div className="mosques-page">
        <div className="page-header">
          <h1>Mosque Management</h1>

          <p>
            {user?.role === 'SUPERADMIN'
              ? 'Manage all mosques in the Sakinah network'
              : 'Manage your mosque information'}
          </p>
        </div>

        <div className="mosque-card-container">
          {mosques.map((mosque) => (
            <div key={mosque.id} className="mosque-card">
              <h3>{mosque.name}</h3>

              <p>
                <strong>City:</strong> {mosque.city}
              </p>

              <p>
                <strong>Imam:</strong> {mosque.imam}
              </p>

              <p>
                <strong>Status:</strong> {mosque.status}
              </p>

              <div className="mosque-actions">
                <button>Edit</button>

                {user?.role === 'SUPERADMIN' && (
                  <>
                    <button>Approve</button>
                    <button>Reject</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MosquesPage;
