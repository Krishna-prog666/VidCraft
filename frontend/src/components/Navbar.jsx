import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const loc = useLocation();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0 24px'
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', height: 70 }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src="/favicon.jpg" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
          <span style={{ color: '#fff', fontWeight: 900, fontSize: '1.3rem', letterSpacing: '-0.5px' }}>
            Vid<span style={{ color: '#e41e26' }}>Craft</span>
          </span>
        </Link>

        <div style={{ flex: 1 }} />

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {navLinks.map(l => (
            <Link key={l.to} to={l.to} style={{
              color: loc.pathname === l.to ? '#e41e26' : '#ccc',
              textDecoration: 'none', padding: '8px 16px', borderRadius: 8,
              fontWeight: 500, fontSize: '0.9rem', transition: 'color 0.2s'
            }}>{l.label}</Link>
          ))}

          {user ? (
            <>
              {user.role === 'admin' && (
                <Link to="/admin" className="btn btn-outline btn-sm">Admin Panel</Link>
              )}
              <Link to="/dashboard" className="btn btn-outline btn-sm">My Dashboard</Link>
              <button onClick={logout} className="btn btn-primary btn-sm">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
