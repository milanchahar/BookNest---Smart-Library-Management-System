const LoanCard = ({ loan, onReturn }) => {
  const dueDate = new Date(loan.due_date);
  const isOverdue = new Date() > dueDate;

  return (
    <div className="glass" style={{ padding: '1.25rem', borderRadius: 'var(--radius-md)', borderLeft: `4px solid ${isOverdue ? 'var(--danger)' : 'var(--success)'}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <h4 style={{ marginBottom: '0.25rem' }}>{loan.book_title || loan.title}</h4>
        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem' }}>
          <p style={{ color: 'var(--text-secondary)' }}>
            Issued: {new Date(loan.issue_date).toLocaleDateString()}
          </p>
          <p style={{ color: isOverdue ? 'var(--danger)' : 'var(--text-secondary)', fontWeight: isOverdue ? '600' : '400' }}>
            Due: {dueDate.toLocaleDateString()} {isOverdue && '(Overdue)'}
          </p>
        </div>
      </div>
      <button 
        onClick={() => onReturn(loan.loan_id)} 
        className="btn" 
        style={{ border: '1px solid var(--border)', fontSize: '0.875rem' }}
      >
        Return Book
      </button>
    </div>
  );
};

export default LoanCard;
