import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: '#111', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '60px 0 30px' }}>
      <div className="container">
        <div className="grid-4" style={{ marginBottom: 48 }}>
          <div>
            <div style={{ color: '#fff', fontWeight: 900, fontSize: '1.4rem', marginBottom: 12 }}>
              Vid<span style={{ color: '#e41e26' }}>Craft</span>
            </div>
            <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.7 }}>Professional video editing services to bring your vision to life.</p>
          </div>
          <div>
            <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: 16, fontSize: '0.95rem' }}>Services</h4>
            {['Basic Edit', 'Color Grading', 'Motion Graphics', 'VFX', 'Wedding Films'].map(s => (
              <div key={s} style={{ marginBottom: 8 }}>
                <Link to="/services" style={{ color: '#888', textDecoration: 'none', fontSize: '0.9rem' }}>{s}</Link>
              </div>
            ))}
          </div>
          <div>
            <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: 16, fontSize: '0.95rem' }}>Quick Links</h4>
            {[['/', 'Home'], ['/services', 'Services'], ['/contact', 'Contact'], ['/register', 'Get Started']].map(([to, l]) => (
              <div key={to} style={{ marginBottom: 8 }}>
                <Link to={to} style={{ color: '#888', textDecoration: 'none', fontSize: '0.9rem' }}>{l}</Link>
              </div>
            ))}
          </div>
          <div>
            <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: 16, fontSize: '0.95rem' }}>Contact</h4>
            <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.8 }}>📧 admin@vidcraft.com<br />📞 +1 (555) 123-4567<br />📍 Los Angeles, CA</p>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ color: '#555', fontSize: '0.85rem' }}>© 2024 VidCraft. All rights reserved.</p>
          <p style={{ color: '#555', fontSize: '0.85rem' }}>Built with ❤️ using MERN Stack</p>
        </div>
      </div>
    </footer>
  );
}
