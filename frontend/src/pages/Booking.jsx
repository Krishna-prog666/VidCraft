import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../utils/api';

export default function Booking() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    service: serviceId || '',
    projectName: '', description: '', duration: '', budget: '', deadline: '', file: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    api.get('/services').then(r => setServices(r.data)).catch(()=>{});
  }, []);

  const handleChange = e => {
    const { name, value, files } = e.target;
    setForm(f => ({ ...f, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => { if (v) fd.append(k, v); });
      await api.post('/bookings', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setSuccess('🎉 Booking submitted successfully!');
      window.alert('🎉 Booking submitted successfully! We will get back to you shortly.'); // Added alert box
      setTimeout(() => navigate('/dashboard'), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit booking');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ paddingTop: 100, paddingBottom: 100 }}>
      <div className="container" style={{ maxWidth: 840 }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--red)', marginBottom: 16 }}>PRODUCTION REQUEST</div>
          <h1 style={{ fontSize: '4rem', fontWeight: 900, marginBottom: 20, letterSpacing: '-0.02em' }}>Start Your Craft.</h1>
          <p style={{ color: 'var(--gray)', fontSize: '1.1rem', lineHeight: 1.6, maxWidth: 640, marginInline: 'auto' }}>
            Provide the technical specifications of your project. Our elite post-production team will review your requirements and get back to you within 24 hours.
          </p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        {/* Form Card */}
        <div className="card" style={{ padding: '48px', marginBottom: 80 }}>
          <form onSubmit={handleSubmit}>
            
            <div className="grid-2" style={{ marginBottom: 24 }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>SELECT SERVICE</label>
                <select name="service" className="form-control" value={form.service} onChange={handleChange} required>
                  <option value="">Choose a service...</option>
                  {services.map(s => <option key={s._id} value={s._id}>{s.title}</option>)}
                </select>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>PROJECT NAME</label>
                <input name="projectName" className="form-control" placeholder="e.g. Urban Explorers Campaign" value={form.projectName} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 32 }}>
              <label>PROJECT DESCRIPTION</label>
              <textarea name="description" className="form-control" rows={4} placeholder="Briefly describe the vision, tone, and specific requirements..." value={form.description} onChange={handleChange} required style={{ resize: 'vertical' }} />
            </div>

            <div className="grid-3" style={{ marginBottom: 40 }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>VIDEO DURATION</label>
                <input name="duration" className="form-control" placeholder="MM:SS" value={form.duration} onChange={handleChange} required />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>BUDGET (INR)</label>
                <input name="budget" type="number" className="form-control" placeholder="₹ 50,000+" value={form.budget} onChange={handleChange} required min="1" />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>DEADLINE</label>
                <input name="deadline" type="date" className="form-control" value={form.deadline} onChange={handleChange} required min={new Date().toISOString().split('T')[0]} />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 40 }}>
              <label>ASSETS & REFERENCE FILES</label>
              <div style={{ border: '1px dashed rgba(255,255,255,0.15)', borderRadius: 8, padding: '40px', textAlign: 'center', background: 'rgba(0,0,0,0.2)', position: 'relative' }}>
                <input type="file" name="file" onChange={handleChange} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', zIndex: 2 }} />
                <div style={{ fontSize: '2rem', color: '#888', marginBottom: 12 }}>☁️</div>
                <div style={{ color: '#fff', fontWeight: 600, marginBottom: 8, fontSize: '0.95rem' }}>Drag and drop your storyboard or reference files</div>
                <div style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.75rem', color: '#666', marginBottom: 20 }}>Maximum file size: 500MB (PDF, JPG, MP4, MOV)</div>
                <button type="button" className="btn btn-outline btn-sm" style={{ pointerEvents: 'none' }}>Browse Files</button>
              </div>
              {form.file && <div style={{ marginTop: 12, fontSize: '0.85rem', color: '#10b981' }}>Selected: {form.file.name}</div>}
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', padding: '20px', fontSize: '1.2rem', fontWeight: 800 }}>
              {loading ? 'Submitting...' : 'Submit Booking'}
            </button>
            <div style={{ textAlign: 'center', marginTop: 24, fontFamily: '"Space Mono", monospace', fontSize: '0.7rem', color: '#666', letterSpacing: '0.05em' }}>
              🔒 Your project data is encrypted and secure.
            </div>
          </form>
        </div>

        {/* Bottom Banner */}
        <div style={{ borderRadius: 12, overflow: 'hidden', position: 'relative', background: 'linear-gradient(90deg, #110000 0%, #050505 100%)', border: '1px solid rgba(255,45,70,0.1)', height: 320 }}>
          <div style={{ position: 'absolute', left: 48, bottom: 48, zIndex: 2, maxWidth: 500 }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: 16, letterSpacing: '-0.02em', textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>Elite Infrastructure.</h2>
            <p style={{ color: '#ccc', fontSize: '1rem', lineHeight: 1.6, textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
              We utilize dual 4K monitoring and hardware-accelerated rendering to ensure your vision is realized with zero compromise on quality.
            </p>
          </div>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 50%, rgba(255,45,70,0.2) 0%, transparent 60%)', zIndex: 1 }} />
        </div>

      </div>
    </div>
  );
}
