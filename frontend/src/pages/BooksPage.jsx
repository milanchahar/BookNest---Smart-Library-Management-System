import { useState, useEffect } from 'react';
import api from '../services/api';
import BookCard from '../components/BookCard';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState(null);

  const fetchBooks = async (query = '') => {
    try {
      const endpoint = query ? `/books/search?q=${query}` : '/books';
      const res = await api.get(endpoint);
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBooks(search);
  };

  const issueBook = async (bookId) => {
    try {
      await api.post('/loans/issue', { bookId });
      setMessage({ type: 'success', text: 'Book issued successfully! Check your dashboard.' });
      fetchBooks(search); // Refresh availability
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to issue book' });
    }
    // Clear message after 5 seconds
    setTimeout(() => setMessage(null), 5000);
  };

  return (
    <div className="container">
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Library Collection</h1>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem', maxWidth: '600px' }}>
          <input 
            type="text" 
            placeholder="Search by title, author or category..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1 }}
          />
          <button type="submit" className="btn btn-primary">Search</button>
        </form>
      </div>

      {message && (
        <div style={{ 
          background: message.type === 'success' ? '#dcfce7' : '#fee2e2', 
          color: message.type === 'success' ? '#166534' : '#991b1b',
          padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem'
        }}>
          {message.text}
        </div>
      )}

      {loading ? (
        <p>Loading books...</p>
      ) : (
        <div className="grid-auto">
          {books.length > 0 ? (
            books.map(book => (
              <BookCard key={book.book_id} book={book} onIssue={issueBook} />
            ))
          ) : (
            <p>No books found matching your criteria.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BooksPage;
