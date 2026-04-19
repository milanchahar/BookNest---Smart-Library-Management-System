import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student'
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container flex-center" style={{ minHeight: 'calc(100vh - 150px)' }}>
      <div className="glass" style={{ padding: '2.5rem', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: '450px', boxShadow: 'var(--shadow-lg)' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Create Account</h1>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2rem' }}>Join the BookNest community</p>
        
        {error && <div style={{ background: '#fee2e2', color: '#991b1b', padding: '0.75rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@university.edu" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="••••••••" />
          </div>
          <div className="form-group">
            <label>Membership Role</label>
            <select 
              name="role" 
              value={formData.role} 
              onChange={handleChange}
              style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', outline: 'none' }}
            >
              <option value="student">Student (Max 3 books, 14 days)</option>
              <option value="faculty">Faculty (Max 10 books, 90 days)</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.75rem', marginTop: '1rem' }}>
            Get Started
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
