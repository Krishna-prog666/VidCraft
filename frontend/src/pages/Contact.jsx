import { useState } from 'react';
import api from '../utils/api';

const info = [
  { icon: '📧', label: 'Email', value: 'prasadprasad72503@gmail.com'},
  { icon: '📞', label: 'Phone', value: '+91 8088375067'},
  { icon: '📍', label: 'Location', value: 'Banglore, Karnataka, India' },
  { icon: '⏰', label: 'Working Hours', value: 'Mon–Sun, 24/7' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      await api.post('/contacts', form);
      setSuccess('✅ Message sent! We will get back to you within 24 hours.');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message');
    } finally { setLoading(false); }
  };

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>Get In <span style={{ color: '#e41e26' }}>Touch</span></h1>
          <p>Have a question or ready to start your project? We'd love to hear from you.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'start' }}>
            {/* Info */}
            <div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 16 }}>Let's Talk About Your Project</h2>
              <p style={{ color: '#888', lineHeight: 1.8, marginBottom: 40 }}>Whether you have a specific project in mind or just want to explore possibilities, our team is here to help bring your vision to life.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 40 }}>
                {info.map(i => (
                  <div key={i.label} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 48, height: 48, background: 'rgba(228,30,38,0.1)', border: '1px solid rgba(228,30,38,0.2)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>{i.icon}</div>
                    <div>
                      <div style={{ color: '#888', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{i.label}</div>
                      <div style={{ fontWeight: 500 }}>{i.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="card">
              {error && <div className="alert alert-error">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}
              <form onSubmit={handleSubmit}>
                <div className="grid-2">
                  <div className="form-group">
                    <label>Your Name *</label>
                    <input name="name" className="form-control" placeholder="John Doe" value={form.name} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input name="email" type="email" className="form-control" placeholder="john@example.com" value={form.email} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Subject *</label>
                  <input name="subject" className="form-control" placeholder="e.g. Pricing inquiry" value={form.subject} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Message *</label>
                  <textarea name="message" className="form-control" rows={6} placeholder="Tell us about your project..." value={form.message} onChange={handleChange} required style={{ resize: 'vertical' }} />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
                  {loading ? 'Sending...' : '📨 Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
