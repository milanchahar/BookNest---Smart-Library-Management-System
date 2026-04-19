import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';

// Placeholder pages for Segment 4 (will be fully implemented in Segment 5)
const LoginPage = () => <div className="container"><h1>Login Page</h1><p>Implementation coming in Segment 5</p></div>;
const RegisterPage = () => <div className="container"><h1>Register Page</h1><p>Implementation coming in Segment 5</p></div>;
const DashboardPage = () => <div className="container"><h1>Dashboard</h1><p>Implementation coming in Segment 5</p></div>;
const BooksPage = () => <div className="container"><h1>Books Collection</h1><p>Implementation coming in Segment 5</p></div>;
const AdminPage = () => <div className="container"><h1>Admin Panel</h1><p>Implementation coming in Segment 5</p></div>;

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="flex-center" style={{ height: '100vh' }}>Loading...</div>;
  
  if (!user) return <Navigate to="/login" />;
  
  if (adminOnly && user.role !== 'admin') return <Navigate to="/" />;
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-wrapper">
          <Navbar />
          <main>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              <Route path="/" element={
                 <ProtectedRoute>
                   <DashboardPage />
                 </ProtectedRoute>
              } />
              
              <Route path="/dashboard" element={
                 <ProtectedRoute>
                   <DashboardPage />
                 </ProtectedRoute>
              } />
              
              <Route path="/books" element={
                 <ProtectedRoute>
                   <BooksPage />
                 </ProtectedRoute>
              } />
              
              <Route path="/admin" element={
                 <ProtectedRoute adminOnly={true}>
                   <AdminPage />
                 </ProtectedRoute>
              } />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
