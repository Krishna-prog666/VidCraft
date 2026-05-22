import { useState, useEffect } from 'react';
import api from '../../utils/api';

const blank = { title: '', description: '', category: 'Basic Edit', price: '', duration: '', features: '', icon: '🎬', isActive: true };
const categories = ['Basic Edit', 'Color Grading', 'Motion Graphics', 'VFX', 'Short Film', 'YouTube Edit', 'Wedding Film', 'Corporate'];

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const load = () => api.get('/services').then(r => setServices(r.data));
  useEffect(() => { load(); }, []);

  const set = field => e => setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const payload = { ...form, features: form.features.split('\n').filter(Boolean), price: Number(form.price) };
    try {
      if (editing) await api.put(`/services/${editing}`, payload);
      else await api.post('/services', payload);
      setForm(blank); setEditing(null); setShowForm(false);
      load();
    } catch (err) { alert(err.response?.data?.message || 'Error'); }
    setLoading(false);
  };

  const startEdit = s => {
    setForm({ ...s, features: s.features.join('\n') });
    setEditing(s._id); setShowForm(true);
  };

  const handleDelete = async id => {
    if (!confirm('Delete this service?')) return;
    await api.delete(`/services/${id}`);
    load();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 900 }}>🎬 Services</h1>
        <button onClick={() => { setForm(blank); setEditing(null); setShowForm(!showForm); }} className="btn btn-primary btn-sm">
          {showForm ? '✕ Cancel' : '+ Add Service'}
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: 32 }}>
          <h3 style={{ fontWeight: 700, marginBottom: 20 }}>{editing ? 'Edit Service' : 'New Service'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid-2">
              <div className="form-group">
                <label>Title *</label>
                <input className="form-control" value={form.title} onChange={set('title')} required placeholder="Service title" />
              </div>
              <div className="form-group">
                <label>Category *</label>
                <select className="form-control" value={form.category} onChange={set('category')}>
                  {categories.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Description *</label>
              <textarea className="form-control" rows={3} value={form.description} onChange={set('description')} required style={{ resize: 'vertical' }} />
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label>Price (INR) *</label>
                <input type="number" className="form-control" value={form.price} onChange={set('price')} required />
              </div>
              <div className="form-group">
                <label>Duration *</label>
                <input className="form-control" value={form.duration} onChange={set('duration')} placeholder="e.g. 3-5 days" required />
              </div>
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label>Icon (emoji)</label>
                <input className="form-control" value={form.icon} onChange={set('icon')} />
              </div>
            </div>
            <div className="form-group">
              <label>Features (one per line)</label>
              <textarea className="form-control" rows={4} value={form.features} onChange={set('features')} placeholder="Feature 1&#10;Feature 2&#10;Feature 3" style={{ resize: 'vertical' }} />
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Saving...' : editing ? 'Update Service' : 'Create Service'}</button>
              <button type="button" className="btn btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="card" style={{ padding: 0 }}>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Service</th><th>Category</th><th>Price</th><th>Duration</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {services.map(s => (
                <tr key={s._id}>
                  <td><div style={{ fontWeight: 600 }}>{s.icon} {s.title}</div></td>
                  <td><span style={{ background: 'rgba(228,30,38,0.1)', color: '#e41e26', padding: '3px 10px', borderRadius: 12, fontSize: '0.8rem' }}>{s.category}</span></td>
                  <td style={{ color: '#e41e26', fontWeight: 700 }}>₹{s.price}</td>
                  <td style={{ color: '#888' }}>{s.duration}</td>
                  <td><span className={`badge ${s.isActive ? 'badge-completed' : 'badge-cancelled'}`}>{s.isActive ? 'Active' : 'Inactive'}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => startEdit(s)} className="btn btn-outline btn-sm">Edit</button>
                      <button onClick={() => handleDelete(s._id)} className="btn btn-danger btn-sm">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {services.length === 0 && <tr><td colSpan={6} style={{ textAlign: 'center', color: '#888', padding: '40px' }}>No services yet. Add one above.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
