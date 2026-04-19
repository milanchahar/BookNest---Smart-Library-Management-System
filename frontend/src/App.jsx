import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import BooksPage from './pages/BooksPage';
import AdminPage from './pages/AdminPage';

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
