import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/services').then(r => { setServices(r.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <div style={{ paddingTop: 100, paddingBottom: 100 }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ marginBottom: 60, maxWidth: 650 }}>
          <div style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--red)', marginBottom: 16 }}>OUR EXPERTISE</div>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: 20, lineHeight: 1.1, letterSpacing: '-0.02em' }}>Elite Post-Production Services</h1>
          <p style={{ color: 'var(--gray)', fontSize: '1.1rem', lineHeight: 1.6 }}>From viral short-form content to cinematic wedding films, we apply Hollywood-grade color science and precision editing to every frame.</p>
        </div>

        {/* Services Grid */}
        <div className="grid-3" style={{ marginBottom: 80 }}>
          {loading ? <div className="spinner" style={{ gridColumn: '1 / -1' }} /> : (
            services.map(s => (
              <div key={s._id} className="card" style={{ display: 'flex', flexDirection: 'column', padding: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                  <div style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.65rem', background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: 4, letterSpacing: '0.1em', color: '#ccc' }}>
                    {(s.category || 'SERVICE').toUpperCase()}
                  </div>
                  <div style={{ opacity: 0.5, fontSize: '1.2rem' }}>{s.icon || '⚡'}</div>
                </div>
                
                <h3 style={{ fontWeight: 800, fontSize: '1.5rem', marginBottom: 12, lineHeight: 1.3 }}>{s.title}</h3>
                <p style={{ color: '#aaa', fontSize: '0.9rem', lineHeight: 1.6, flex: 1, marginBottom: 24 }}>{s.description}</p>
                
                <ul style={{ listStyle: 'none', marginBottom: 32 }}>
                  {s.features.map(f => (
                    <li key={f} style={{ color: '#ccc', fontSize: '0.8rem', padding: '6px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ color: '#888', fontSize: '0.7rem' }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                
                <div style={{ marginTop: 'auto' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginBottom: 16 }}>₹{s.price}</div>
                  <Link to={`/book/${s._id}`} className="btn btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', fontSize: '0.9rem' }}>Book Now</Link>
                </div>
              </div>
            ))
          )}
          {!loading && services.length === 0 && (
            <div style={{ textAlign: 'center', color: '#888', padding: '60px 0', gridColumn: '1 / -1' }}>
              <p>No services available yet.</p>
            </div>
          )}
        </div>

        {/* Custom Quote Banner */}
        <div className="card" style={{ padding: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(135deg, #18181b 0%, #111112 100%)', border: '1px solid rgba(255,255,255,0.05)', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 12 }}>Need a Custom Quote?</h2>
            <p style={{ color: 'var(--gray)', fontSize: '1rem' }}>Speak with our lead editor about your specific production requirements.</p>
          </div>
          <button className="btn" style={{ background: '#fff', color: '#000', padding: '16px 32px', fontWeight: 700 }}>Schedule a Consultation</button>
        </div>

      </div>
    </div>
  );
}
