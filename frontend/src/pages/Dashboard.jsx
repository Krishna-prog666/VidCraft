import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const statusBadge = (s) => {
  const map = { 'Pending': 'badge-pending', 'In Progress': 'badge-progress', 'Completed': 'badge-completed', 'Cancelled': 'badge-cancelled' };
  return <span className={`badge ${map[s] || ''}`}>{s.toUpperCase()}</span>;
};

export default function Dashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/bookings/my').then(r => { setBookings(r.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const stats = [
    { label: 'Total Bookings', value: bookings.length < 10 ? `0${bookings.length}` : bookings.length, icon: '📱' },
    { label: 'Pending', value: bookings.filter(b => b.status === 'Pending').length < 10 ? `0${bookings.filter(b => b.status === 'Pending').length}` : bookings.filter(b => b.status === 'Pending').length, icon: '📋' },
    { label: 'In Progress', value: bookings.filter(b => b.status === 'In Progress').length < 10 ? `0${bookings.filter(b => b.status === 'In Progress').length}` : bookings.filter(b => b.status === 'In Progress').length, icon: '📈' },
    { label: 'Completed', value: bookings.filter(b => b.status === 'Completed').length < 10 ? `0${bookings.filter(b => b.status === 'Completed').length}` : bookings.filter(b => b.status === 'Completed').length, icon: '✅' },
  ];

  return (
    <div style={{ paddingTop: 100, paddingBottom: 100 }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--red)', marginBottom: 12 }}>CLIENT DASHBOARD</div>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: 16 }}>Welcome back, {user?.name || 'User'}!</h1>
          <p style={{ color: 'var(--gray)', fontSize: '1.1rem', maxWidth: 600, lineHeight: 1.6 }}>Monitor your creative production pipeline and manage active projects from your elite command center.</p>
        </div>

        {/* Stats */}
        <div className="grid-4" style={{ marginBottom: 40 }}>
          {stats.map((s, i) => (
            <div key={s.label} className="card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.75rem', color: '#888', letterSpacing: '0.05em' }}>{s.label}</div>
                <div style={{ opacity: 0.5, filter: 'grayscale(1)' }}>{s.icon}</div>
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--white)' }}>{s.value}</div>
              <div style={{ marginTop: 24, height: 2, background: 'rgba(255,255,255,0.05)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', background: 'var(--red)', width: `${(i+1)*20}%`, boxShadow: '0 0 10px var(--red)' }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Bookings */}
        <div className="card" style={{ padding: '32px 0 0 0', marginBottom: 40 }}>
          <div style={{ padding: '0 32px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 8 }}>My Bookings</h2>
              <p style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>Manage your high-fidelity video production orders.</p>
            </div>
            <Link to="/book" className="btn btn-primary btn-sm" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>+ New Booking</Link>
          </div>

          <div className="table-wrap" style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.04)', borderRadius: 0 }}>
            <table>
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Service Type</th>
                  <th>Status</th>
                  <th>Timecode</th>
                  <th style={{ textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? <tr><td colSpan="5" style={{ textAlign: 'center', padding: 40 }}><div className="spinner"></div></td></tr> : 
                 bookings.length === 0 ? (
                  <tr><td colSpan="5" style={{ textAlign: 'center', padding: 40, color: 'var(--gray)' }}>No active projects found.</td></tr>
                 ) : 
                 bookings.map(b => (
                  <tr key={b._id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ width: 44, height: 32, background: 'linear-gradient(135deg, rgba(255,45,70,0.2), transparent)', border: '1px solid rgba(255,45,70,0.3)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>🎬</div>
                        <span style={{ fontWeight: 600 }}>{b.projectName}</span>
                      </div>
                    </td>
                    <td style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.8rem', letterSpacing: '0.05em' }}>{(b.service?.title || 'CUSTOM PROJECT').toUpperCase()}</td>
                    <td>{statusBadge(b.status)}</td>
                    <td style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.8rem', color: '#888' }}>{new Date(b.createdAt).toISOString().substr(11, 8)}</td>
                    <td style={{ textAlign: 'right' }}><button style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', padding: '6px 10px', borderRadius: 4, color: '#fff', cursor: 'pointer' }}>↗</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ padding: '20px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
            <div style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.75rem', color: '#888', letterSpacing: '0.1em' }}>SHOWING {bookings.length} OF {bookings.length} PROJECTS</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ width: 32, height: 32, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{'<'}</button>
              <button style={{ width: 32, height: 32, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{'>'}</button>
            </div>
          </div>
        </div>

        {/* Bottom Cards */}
        <div className="grid-2">
          {/* Recent Messages */}
          <div className="card" style={{ padding: 0 }}>
            <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Recent Messages</h3>
              <span style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.7rem', color: 'var(--red)', letterSpacing: '0.1em', background: 'rgba(255,45,70,0.1)', padding: '4px 8px', borderRadius: 4 }}>02 NEW</span>
            </div>
            <div style={{ padding: '0' }}>
              <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(255,255,255,0.02)', display: 'flex', gap: 16, borderLeft: '3px solid var(--red)' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#222', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Elena" alt="Elena" style={{ width: '100%', height: '100%' }}/></div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <div><span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Elena Rossi</span> <span style={{ color: '#888', fontSize: '0.75rem' }}>(Head Editor)</span></div>
                    <span style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.7rem', color: '#888' }}>10M AGO</span>
                  </div>
                  <p style={{ color: '#aaa', fontSize: '0.85rem', lineHeight: 1.5 }}>The LUT application for the first sequence is ready for your review. Let's discuss the...</p>
                </div>
              </div>
              <div style={{ padding: '24px 32px', display: 'flex', gap: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#222', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus" alt="Marcus" style={{ width: '100%', height: '100%' }}/></div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <div><span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Marcus Chen</span> <span style={{ color: '#888', fontSize: '0.75rem' }}>(VFX)</span></div>
                    <span style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.7rem', color: '#888' }}>2H AGO</span>
                  </div>
                  <p style={{ color: '#aaa', fontSize: '0.85rem', lineHeight: 1.5 }}>Rendering of the motion graphics overlay is at 80%. Expected completion in 15...</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pro Support */}
          <div className="card">
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 12 }}>Pro Support</h3>
            <p style={{ color: 'var(--gray)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: 32 }}>Need a custom workflow or immediate technical assistance?</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', background: 'rgba(255,255,255,0.02)', padding: '16px' }}>🎧 Contact Specialist</button>
              <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', background: 'rgba(255,255,255,0.02)', padding: '16px' }}>📄 Service Guide</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
