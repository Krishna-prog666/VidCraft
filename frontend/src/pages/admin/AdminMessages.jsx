import { useState, useEffect } from 'react';
import api from '../../utils/api';

export default function AdminMessages() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState('');

  const load = () => api.get('/contacts').then(r => { setContacts(r.data); setLoading(false); });
  useEffect(() => { load(); }, []);

  const markRead = async (id, replyText = '') => {
    await api.put(`/contacts/${id}`, { reply: replyText });
    setSelected(null); load();
  };

  const del = async id => {
    if (!confirm('Delete this message?')) return;
    await api.delete(`/contacts/${id}`);
    load();
  };

  const unread = contacts.filter(c => !c.isRead).length;

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 900 }}>✉️ Messages {unread > 0 && <span style={{ background: '#e41e26', color: '#fff', borderRadius: 20, padding: '3px 10px', fontSize: '0.75rem', marginLeft: 10 }}>{unread} new</span>}</h1>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: 20 }}>
          <div className="card" style={{ width: 560, maxWidth: '100%', maxHeight: '80vh', overflow: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 20 }}>
              <h3 style={{ fontWeight: 700 }}>{selected.subject}</h3>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ color: '#888', fontSize: '0.85rem', marginBottom: 4 }}>From: <strong style={{ color: '#fff' }}>{selected.name}</strong> &lt;{selected.email}&gt;</div>
              <div style={{ color: '#888', fontSize: '0.85rem' }}>Date: {new Date(selected.createdAt).toLocaleString()}</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: 16, marginBottom: 20, lineHeight: 1.8, color: '#ddd' }}>
              {selected.message}
            </div>
            {selected.reply && (
              <div style={{ background: 'rgba(228,30,38,0.08)', border: '1px solid rgba(228,30,38,0.2)', borderRadius: 8, padding: 16, marginBottom: 20 }}>
                <div style={{ color: '#e41e26', fontWeight: 600, fontSize: '0.85rem', marginBottom: 8 }}>Your Reply:</div>
                <div style={{ color: '#ddd', lineHeight: 1.8 }}>{selected.reply}</div>
              </div>
            )}
            <div className="form-group">
              <label>Reply (optional)</label>
              <textarea className="form-control" rows={4} value={reply} onChange={e => setReply(e.target.value)} placeholder="Type your reply here..." style={{ resize: 'vertical' }} />
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => markRead(selected._id, reply)} className="btn btn-primary">Mark as Read {reply && '& Save Reply'}</button>
              <button onClick={() => setSelected(null)} className="btn btn-outline">Close</button>
            </div>
          </div>
        </div>
      )}

      {loading ? <div className="spinner" /> : (
        <div className="card" style={{ padding: 0 }}>
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Name</th><th>Email</th><th>Subject</th><th>Status</th><th>Date</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {contacts.map(c => (
                  <tr key={c._id} style={{ opacity: c.isRead ? 0.7 : 1 }}>
                    <td style={{ fontWeight: c.isRead ? 400 : 700 }}>{c.name}</td>
                    <td style={{ color: '#888' }}>{c.email}</td>
                    <td>{c.subject}</td>
                    <td><span className={`badge ${c.isRead ? 'badge-completed' : 'badge-pending'}`}>{c.isRead ? 'Read' : 'Unread'}</span></td>
                    <td style={{ color: '#888', fontSize: '0.85rem' }}>{new Date(c.createdAt).toLocaleDateString()}</td>
                    <td>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button onClick={() => { setSelected(c); setReply(c.reply || ''); }} className="btn btn-outline btn-sm">View</button>
                        <button onClick={() => del(c._id)} className="btn btn-danger btn-sm">Del</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {contacts.length === 0 && <tr><td colSpan={6} style={{ textAlign: 'center', color: '#888', padding: '40px' }}>No messages yet</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
