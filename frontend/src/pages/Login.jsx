import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const user = await login(form.email, form.password);
      navigate(user.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Connection failed: Access Denied');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#050505', backgroundImage: 'radial-gradient(circle at 50% 50%, #110000 0%, #050505 100%)', position: 'relative' }}>
      
      {/* Top Bar */}
      <div style={{ position: 'absolute', top: 32, right: 40, display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ padding: '6px 14px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.75rem', fontFamily: '"Space Mono", monospace', letterSpacing: '0.05em', color: '#888' }}>
          SYSTEM STATUS
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#10b981' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981' }}></span> ONLINE
          </span>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '0 20px' }}>
        
        {/* Logo Section */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 12 }}>VidCraft</h1>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
            <div style={{ height: 1, width: 40, background: 'linear-gradient(90deg, transparent, rgba(255,45,70,0.5))' }}></div>
            <span style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.8rem', letterSpacing: '0.2em', color: '#888' }}>ELITE CINEMA ENGINE</span>
            <div style={{ height: 1, width: 40, background: 'linear-gradient(-90deg, transparent, rgba(255,45,70,0.5))' }}></div>
          </div>
        </div>

        {/* Login Form Container */}
        <div style={{ width: '100%', maxWidth: 460, background: '#111', border: '1px solid rgba(255,255,255,0.03)', borderRadius: 8, padding: '40px', position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
          
          {/* Top Badge */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', background: 'rgba(255,45,70,0.05)', border: '1px solid rgba(255,45,70,0.2)', borderRadius: 4, color: 'var(--red)', fontSize: '0.75rem', fontFamily: '"Space Mono", monospace', letterSpacing: '0.1em' }}>
              🔒 INITIALIZING_SESSION
            </div>
          </div>

          {error && <div className="alert alert-error" style={{ fontSize: '0.85rem' }}>{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: 24 }}>
              <label style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.75rem', color: '#888', letterSpacing: '0.05em' }}>OPERATOR ID</label>
              <input type="email" className="form-control" placeholder="username@vidcraft.studio"
                value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required 
                style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.08)' }} />
            </div>
            
            <div className="form-group" style={{ marginBottom: 32 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <label style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.75rem', color: '#888', letterSpacing: '0.05em', margin: 0 }}>AUTHORIZATION KEY</label>
                <Link to="#" style={{ color: '#cc1e32', fontSize: '0.7rem', textDecoration: 'none', fontFamily: '"Space Mono", monospace', letterSpacing: '0.05em' }}>RECOVERY</Link>
              </div>
              <input type="password" className="form-control" placeholder="••••••••••••"
                value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required 
                style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.08)' }} />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', padding: '16px', fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              {loading ? 'AUTHENTICATING...' : 'ESTABLISH CONNECTION'}
            </button>
          </form>

          <p style={{ textAlign: 'center', color: '#666', marginTop: 32, fontSize: '0.85rem' }}>
            Unauthorized? <Link to="/register" style={{ color: 'var(--white)', textDecoration: 'none', fontWeight: 500 }}>Request Access</Link>
          </p>
        </div>

      </div>

      {/* Footer Text */}
      <div style={{ position: 'absolute', bottom: 32, width: '100%', padding: '0 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: '"Space Mono", monospace', fontSize: '0.65rem', color: '#444', letterSpacing: '0.1em' }}>
        <div>© 2024 VIDCRAFT TECHNOLOGIES. ALL RIGHTS RESERVED.</div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <span>V_CRT_ENTRY_4.2</span>
          <span style={{ color: 'var(--red)' }}>•</span>
          <span>SHA_512_SECURED</span>
          <span style={{ color: 'var(--red)' }}>•</span>
          <span>NODE: OBSD_PRD_01</span>
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e=>e.target.style.color='#888'} onMouseLeave={e=>e.target.style.color='#444'}>PROTOCOL</span>
          <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e=>e.target.style.color='#888'} onMouseLeave={e=>e.target.style.color='#444'}>LEGAL</span>
          <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e=>e.target.style.color='#888'} onMouseLeave={e=>e.target.style.color='#444'}>UPLINK</span>
        </div>
      </div>
      
    </div>
  );
}
