import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="glass" style={{ position: 'sticky', top: 0, zIndex: 100, marginBottom: '2rem' }}>
      <div className="container" style={{ height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '40px', height: '40px', background: 'var(--primary)', borderRadius: '10px' }} className="flex-center">
            <span style={{ color: 'white', fontWeight: 'bold' }}>BN</span>
          </div>
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)', fontFamily: 'Outfit' }}>BookNest</span>
        </Link>

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <Link to="/books" style={{ textDecoration: 'none', color: 'var(--text-primary)', fontWeight: '500' }}>Explore</Link>
            <Link to="/dashboard" style={{ textDecoration: 'none', color: 'var(--text-primary)', fontWeight: '500' }}>My Library</Link>
            {user.role === 'admin' && (
              <Link to="/admin" style={{ textDecoration: 'none', color: 'var(--primary)', fontWeight: '600' }}>Admin</Link>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingLeft: '1rem', borderLeft: '1px solid var(--border)' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.875rem', fontWeight: '600' }}>{user.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'capitalize' }}>{user.role}</div>
              </div>
              <button onClick={handleLogout} className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Logout</button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/login" className="btn" style={{ color: 'var(--text-primary)' }}>Login</Link>
            <Link to="/register" className="btn btn-primary">Join Now</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
