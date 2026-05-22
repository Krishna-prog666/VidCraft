import { useState, useEffect } from 'react';
import api from '../../utils/api';

const statusBadge = (s) => {
  const map = { 'Pending': 'badge-pending', 'In Progress': 'badge-progress', 'Completed': 'badge-completed', 'Cancelled': 'badge-cancelled' };
  return <span className={`badge ${map[s] || ''}`}>{s}</span>;
};

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [seeding, setSeeding] = useState(false);

  useEffect(() => {
    api.get('/admin/dashboard').then(r => setData(r.data));
  }, []);

  const seedServices = async () => {
    setSeeding(true);
    try {
      const r = await api.post('/admin/seed-services');
      alert(r.data.message);
    } catch (e) { alert('Error seeding'); }
    setSeeding(false);
  };

  if (!data) return <div className="spinner" />;
  const { stats, recentBookings } = data;

  const statCards = [
    { label: 'Total Users', value: stats.totalUsers, icon: '👥', color: '#3498db' },
    { label: 'Services', value: stats.totalServices, icon: '🎬', color: '#e41e26' },
    { label: 'Total Bookings', value: stats.totalBookings, icon: '📋', color: '#f39c12' },
    { label: 'Unread Messages', value: stats.unreadMessages, icon: '✉️', color: '#9b59b6' },
    { label: 'Pending', value: stats.pendingBookings, icon: '⏳', color: '#e67e22' },
    { label: 'In Progress', value: stats.inProgressBookings, icon: '🔄', color: '#3498db' },
    { label: 'Completed', value: stats.completedBookings, icon: '✅', color: '#27ae60' },
    { label: 'Total Messages', value: stats.totalMessages, icon: '💬', color: '#e41e26' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 900 }}>📊 Dashboard</h1>
          <p style={{ color: '#888', marginTop: 4 }}>Overview of your platform</p>
        </div>
        <button onClick={seedServices} disabled={seeding} className="btn btn-primary btn-sm">
          {seeding ? 'Seeding...' : '🌱 Seed Sample Services'}
        </button>
      </div>

      <div className="grid-4" style={{ marginBottom: 32 }}>
        {statCards.map(s => (
          <div key={s.label} className="card" style={{ padding: '20px 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ color: '#888', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>{s.label}</div>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, color: s.color }}>{s.value}</div>
              </div>
              <span style={{ fontSize: '1.8rem' }}>{s.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: 0 }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <h3 style={{ fontWeight: 700 }}>Recent Bookings</h3>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Client</th><th>Project</th><th>Service</th><th>Status</th><th>Date</th></tr>
            </thead>
            <tbody>
              {recentBookings.map(b => (
                <tr key={b._id}>
                  <td><div style={{ fontWeight: 600 }}>{b.user?.name}</div><div style={{ color: '#888', fontSize: '0.8rem' }}>{b.user?.email}</div></td>
                  <td>{b.projectName}</td>
                  <td>{b.service?.title}</td>
                  <td>{statusBadge(b.status)}</td>
                  <td style={{ color: '#888', fontSize: '0.85rem' }}>{new Date(b.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {recentBookings.length === 0 && (
                <tr><td colSpan={5} style={{ textAlign: 'center', color: '#888', padding: '40px' }}>No bookings yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
