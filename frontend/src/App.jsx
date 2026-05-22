import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminServices from './pages/admin/AdminServices';
import AdminBookings from './pages/admin/AdminBookings';
import AdminMessages from './pages/admin/AdminMessages';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && user.role !== 'admin') return <Navigate to="/dashboard" replace />;
  return children;
};

const AdminLayout = ({ children }) => (
  <ProtectedRoute adminOnly>
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar />
      <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>{children}</div>
    </div>
  </ProtectedRoute>
);

const AdminSidebar = () => {
  const { logout } = useAuth();
  const links = [
    { to: '/admin', label: '📊 Dashboard' },
    { to: '/admin/services', label: '🎬 Services' },
    { to: '/admin/bookings', label: '📋 Bookings' },
    { to: '/admin/messages', label: '✉️ Messages' },
  ];
  return (
    <div style={{ width: 240, background: '#111', borderRight: '1px solid rgba(255,255,255,0.06)', padding: '24px 0', position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '0 24px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ color: '#e41e26', fontWeight: 900, fontSize: '1.4rem' }}>VidCraft</div>
        <div style={{ color: '#888', fontSize: '0.8rem', marginTop: 4 }}>Admin Panel</div>
      </div>
      <nav style={{ flex: 1, padding: '16px 0' }}>
        {links.map(l => (
          <a key={l.to} href={l.to} style={{ display: 'block', padding: '12px 24px', color: '#ccc', textDecoration: 'none', fontSize: '0.9rem', transition: 'all 0.2s' }}
            onMouseEnter={e => e.target.style.color = '#e41e26'}
            onMouseLeave={e => e.target.style.color = '#ccc'}
          >{l.label}</a>
        ))}
      </nav>
      <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <button onClick={logout} className="btn btn-danger" style={{ width: '100%', justifyContent: 'center' }}>Logout</button>
      </div>
    </div>
  );
};

export default function App() {
  const { user } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
        <Route path="/admin/services" element={<AdminLayout><AdminServices /></AdminLayout>} />
        <Route path="/admin/bookings" element={<AdminLayout><AdminBookings /></AdminLayout>} />
        <Route path="/admin/messages" element={<AdminLayout><AdminMessages /></AdminLayout>} />

        {/* Public + User Routes */}
        <Route path="*" element={
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={user ? <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} /> : <Login />} />
              <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
              <Route path="/book/:serviceId?" element={<ProtectedRoute><Booking /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            </Routes>
            <Footer />
          </>
        } />
      </Routes>
    </BrowserRouter>
  );
}
