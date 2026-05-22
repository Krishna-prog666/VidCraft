import { useState, useEffect } from 'react';
import api from '../../utils/api';

const statusBadge = (s) => {
  const map = { 'Pending': 'badge-pending', 'In Progress': 'badge-progress', 'Completed': 'badge-completed', 'Cancelled': 'badge-cancelled' };
  return <span className={`badge ${map[s] || ''}`}>{s}</span>;
};

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);
  const [notes, setNotes] = useState('');
  const [newStatus, setNewStatus] = useState('');

  const load = () => api.get('/bookings/all').then(r => { setBookings(r.data); setLoading(false); });
  useEffect(() => { load(); }, []);

  const updateStatus = async id => {
    await api.put(`/bookings/${id}/status`, { status: newStatus, adminNotes: notes });
    setSelected(null); load();
  };

  const del = async id => {
    if (!confirm('Delete this booking?')) return;
    await api.delete(`/bookings/${id}`);
    load();
  };

  const statuses = ['All', 'Pending', 'In Progress', 'Completed', 'Cancelled'];
  const filtered = filter === 'All' ? bookings : bookings.filter(b => b.status === filter);

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: 16 }}>📋 Bookings</h1>
        <div style={{ display: 'flex', gap: 8 }}>
          {statuses.map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`btn btn-sm ${filter === s ? 'btn-primary' : 'btn-outline'}`}>{s}
              {s !== 'All' && <span style={{ marginLeft: 6, background: 'rgba(255,255,255,0.2)', borderRadius: 10, padding: '1px 6px', fontSize: '0.75rem' }}>
                {bookings.filter(b => b.status === s).length}
              </span>}
            </button>
          ))}
        </div>
      </div>

      {/* Update Modal */}
      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
            <div className="card" style={{ width: 480, maxWidth: '90vw' }}>
            <h3 style={{ fontWeight: 700, marginBottom: 20 }}>Update Booking Status</h3>
            <div className="form-group">
              <label>Status</label>
              <select className="form-control" value={newStatus} onChange={e => setNewStatus(e.target.value)}>
                {['Pending', 'In Progress', 'Completed', 'Cancelled'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Admin Notes</label>
              <textarea className="form-control" rows={3} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Notes for the client..." style={{ resize: 'vertical' }} />
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => updateStatus(selected)} className="btn btn-primary">Update</button>
              <button onClick={() => setSelected(null)} className="btn btn-outline">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {loading ? <div className="spinner" /> : (
        <div className="card" style={{ padding: 0 }}>
          <div className="table-wrap">
            <table>
              <thead>
                <th>Client</th><th>Project</th><th>Service</th><th>Budget</th><th>Deadline</th><th>Status</th><th>File</th><th>Actions</th>
              </thead>
              <tbody>
                {filtered.map(b => (
                  <tr key={b._id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{b.user?.name}</div>
                      <div style={{ color: '#888', fontSize: '0.8rem' }}>{b.user?.email}</div>
                      {b.user?.phone && <div style={{ color: '#888', fontSize: '0.8rem' }}>{b.user.phone}</div>}
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{b.projectName}</div>
                      <div style={{ color: '#888', fontSize: '0.8rem' }}>{b.description.slice(0, 40)}...</div>
                    </td>
                    <td>{b.service?.title}</td>
                    <td style={{ color: '#e41e26', fontWeight: 700 }}>₹{b.budget}</td>
                    <td>{new Date(b.deadline).toLocaleDateString()}</td>
                    <td>{statusBadge(b.status)}</td>
                    <td>{b.fileUrl ? <a href={b.fileUrl} target="_blank" rel="noopener noreferrer" download>Download</a> : '—'}</td>
                    <td>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button onClick={() => { setSelected(b._id); setNewStatus(b.status); setNotes(b.adminNotes || ''); }} className="btn btn-outline btn-sm">Edit</button>
                        <button onClick={() => del(b._id)} className="btn btn-danger btn-sm">Del</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && <tr><td colSpan={8} style={{ textAlign: 'center', color: '#888', padding: '40px' }}>No bookings found</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
