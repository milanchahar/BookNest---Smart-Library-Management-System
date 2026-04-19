const BookCard = ({ book, onIssue }) => {
  const isAvailable = book.available_copies > 0;

  return (
    <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', gap: '1rem', transition: 'all 0.3s ease' }}>
      <div style={{ position: 'relative' }}>
        <div style={{ width: '100%', height: '180px', background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           <span style={{ fontSize: '3rem' }}>📚</span>
        </div>
        <span className={`badge ${isAvailable ? 'badge-available' : 'badge-issued'}`} style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}>
          {isAvailable ? `${book.available_copies} Available` : 'Out of Stock'}
        </span>
        {book.is_rare === 1 && (
          <span className="badge" style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', background: '#fef3c7', color: '#92400e' }}>
            Rare ✨
          </span>
        )}
      </div>

      <div>
        <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '600', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {book.category}
        </div>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{book.title}</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>by {book.author}</p>
      </div>

      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
          ISBN: {book.isbn}
        </div>
        <button 
          onClick={() => onIssue(book.book_id)} 
          className="btn btn-primary"
          disabled={!isAvailable}
          style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', opacity: isAvailable ? 1 : 0.5 }}
        >
          Issue Book
        </button>
      </div>
    </div>
  );
};

export default BookCard;
