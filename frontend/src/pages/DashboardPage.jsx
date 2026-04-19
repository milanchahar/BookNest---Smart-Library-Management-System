import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import LoanCard from '../components/LoanCard';

const DashboardPage = () => {
  const { user } = useAuth();
  const [loans, setLoans] = useState([]);
  const [fines, setFines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  const fetchData = async () => {
    try {
      const [loansRes, finesRes] = await Promise.all([
        api.get('/loans/my'),
        api.get('/fines/my')
      ]);
      setLoans(loansRes.data);
      setFines(finesRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleReturn = async (loanId) => {
    try {
      const res = await api.post(`/loans/return/${loanId}`);
      if (res.data.fine > 0) {
        setMessage({ type: 'warning', text: `Book returned! A fine of ₹${res.data.fine} has been added to your account.` });
      } else {
        setMessage({ type: 'success', text: 'Book returned successfully!' });
      }
      fetchData();
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to return book' });
    }
    setTimeout(() => setMessage(null), 5000);
  };

  const handlePayFine = async (fineId) => {
    try {
      await api.post(`/fines/pay/${fineId}`);
      setMessage({ type: 'success', text: 'Fine paid successfully!' });
      fetchData();
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to pay fine' });
    }
    setTimeout(() => setMessage(null), 5000);
  };

  if (loading) return <div className="container">Loading Dashboard...</div>;

  return (
    <div className="container">
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Welcome, {user?.name}</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Manage your borrowings and pending fines.</p>
      </div>

      {message && (
        <div style={{ 
          background: message.type === 'success' ? '#dcfce7' : (message.type === 'warning' ? '#fef3c7' : '#fee2e2'), 
          color: message.type === 'success' ? '#166534' : (message.type === 'warning' ? '#92400e' : '#991b1b'),
          padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem'
        }}>
          {message.text}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '2rem' }}>
        <section>
          <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            My Active Loans <span>({loans.length})</span>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {loans.length > 0 ? (
              loans.map(loan => (
                <LoanCard key={loan.loan_id} loan={loan} onReturn={handleReturn} />
              ))
            ) : (
              <div className="glass flex-center" style={{ padding: '3rem', borderRadius: 'var(--radius-md)', color: 'var(--text-secondary)' }}>
                You have no active book loans.
              </div>
            )}
          </div>
        </section>

        <section>
          <h2 style={{ marginBottom: '1.5rem' }}>Pending Fines</h2>
          <div className="glass" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            {fines.filter(f => f.status === 'pending').length > 0 ? (
               fines.filter(f => f.status === 'pending').map(fine => (
                 <div key={fine.fine_id} style={{ padding: '1.25rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                   <div>
                     <p style={{ fontWeight: '600', color: 'var(--danger)' }}>₹{fine.amount}</p>
                     <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>For: {fine.title}</p>
                   </div>
                   <button onClick={() => handlePayFine(fine.fine_id)} className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>Pay Now</button>
                 </div>
               ))
            ) : (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                No pending fines! Keep it up.
              </div>
            )}
          </div>
          
          {fines.filter(f => f.status === 'paid').length > 0 && (
             <div style={{ marginTop: '2rem' }}>
               <h4 style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Past Payments</h4>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                 {fines.filter(f => f.status === 'paid').slice(0, 3).map(fine => (
                   <div key={fine.fine_id} style={{ fontSize: '0.875rem', display: 'flex', justifyContent: 'space-between', opacity: 0.7 }}>
                     <span>{fine.title}</span>
                     <span>₹{fine.amount}</span>
                   </div>
                 ))}
               </div>
             </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
