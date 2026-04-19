import { useState, useEffect } from 'react';
import api from '../services/api';

const AdminPage = () => {
  const [newBook, setNewBook] = useState({
    title: '', author: '', isbn: '', category: 'Technology', is_rare: false, copiesCount: 1
  });
  const [activeLoans, setActiveLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  const fetchData = async () => {
    try {
      const res = await api.get('/loans/all');
      setActiveLoans(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      await api.post('/books', newBook);
      setMessage({ type: 'success', text: 'Book added successfully!' });
      setNewBook({ title: '', author: '', isbn: '', category: 'Technology', is_rare: false, copiesCount: 1 });
      fetchData();
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to add book' });
    }
  };

  if (loading) return <div className="container">Loading Admin Panel...</div>;

  return (
    <div className="container">
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Admin Control Center</h1>

      {message && (
        <div style={{ 
          background: message.type === 'success' ? '#dcfce7' : '#fee2e2', 
          color: message.type === 'success' ? '#166534' : '#991b1b',
          padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem'
        }}>
          {message.text}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 2fr)', gap: '3rem' }}>
        <section className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>Add New Book</h2>
          <form onSubmit={handleAddBook}>
            <div className="form-group">
              <label>Title</label>
              <input type="text" value={newBook.title} onChange={(e) => setNewBook({...newBook, title: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Author</label>
              <input type="text" value={newBook.author} onChange={(e) => setNewBook({...newBook, author: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>ISBN</label>
              <input type="text" value={newBook.isbn} onChange={(e) => setNewBook({...newBook, isbn: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Category</label>
              <input type="text" value={newBook.category} onChange={(e) => setNewBook({...newBook, category: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Number of Copies</label>
              <input type="number" min="1" value={newBook.copiesCount} onChange={(e) => setNewBook({...newBook, copiesCount: e.target.value})} required />
            </div>
            <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="checkbox" checked={newBook.is_rare} onChange={(e) => setNewBook({...newBook, is_rare: e.target.checked})} style={{ width: 'auto' }} />
              <label style={{ margin: 0 }}>Mark as Rare Book (₹50/day fine)</label>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Register Book</button>
          </form>
        </section>

        <section>
          <h2 style={{ marginBottom: '1.5rem' }}>Global Active Loans</h2>
          <div className="glass" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(99, 102, 241, 0.05)' }}>
                  <th style={{ padding: '1rem' }}>User</th>
                  <th style={{ padding: '1rem' }}>Book</th>
                  <th style={{ padding: '1rem' }}>Due Date</th>
                </tr>
              </thead>
              <tbody>
                {activeLoans.length > 0 ? (
                  activeLoans.map(loan => (
                    <tr key={loan.loan_id} style={{ borderTop: '1px solid var(--border)' }}>
                      <td style={{ padding: '1rem' }}>{loan.user_name}</td>
                      <td style={{ padding: '1rem' }}>{loan.book_title}</td>
                      <td style={{ padding: '1rem' }}>{new Date(loan.due_date).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>No active loans found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminPage;
