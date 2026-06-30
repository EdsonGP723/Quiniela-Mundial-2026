import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Suspense } from 'react'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Predictions from './pages/Predictions';
import PredictionDetail from './pages/PredictionDetail';
import Standings from './pages/Standings';
import Earnings from './pages/Earnings';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Profile from './pages/Profile';
import Rules from './pages/Rules';

import { useAuth, AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Layout structure following Azteca Arena design
const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const isAuthenticated = !!user;

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-on-background)] font-['Work_Sans']">
      <header className="bg-[var(--color-primary-container)] p-4 shadow-md sticky top-0 z-50">
        <nav className="flex flex-wrap justify-between items-center max-w-7xl mx-auto gap-4">
          <div className="flex items-center gap-2">
            {/* Mock Logo */}
            <Link to={isAuthenticated ? "/dashboard" : "/"} className="w-8 h-8 rounded bg-[var(--color-secondary)] flex items-center justify-center cursor-pointer">
              <span className="text-[var(--color-on-secondary)] font-bold font-['Montserrat']">Q</span>
            </Link>
            <Link to={isAuthenticated ? "/dashboard" : "/"} className="font-['Montserrat'] font-extrabold text-xl tracking-tight text-[var(--color-on-primary-container)]">
              QUINIELA TRICOLOR
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-4 font-semibold text-sm text-[var(--color-on-primary-container)]">
            {!isAuthenticated ? (
              <>
                <Link to="/" className="hover:text-[var(--color-primary-fixed)] transition-colors">Inicio</Link>
                <Link to="/rules" className="hover:text-[var(--color-primary-fixed)] transition-colors">Reglas</Link>
                <Link to="/login" className="hover:text-[var(--color-primary-fixed)] transition-colors">Iniciar Sesión</Link>
                <Link to="/register" className="hover:text-[var(--color-primary-fixed)] transition-colors">Crear Cuenta</Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="hover:text-[var(--color-primary-fixed)] transition-colors">Dashboard</Link>
                <Link to="/predictions" className="hover:text-[var(--color-primary-fixed)] transition-colors">Predicciones</Link>
                <Link to="/standings" className="hover:text-[var(--color-primary-fixed)] transition-colors">Posiciones</Link>
                <Link to="/earnings" className="hover:text-[var(--color-primary-fixed)] transition-colors">Ganancias</Link>
                <Link to="/rules" className="hover:text-[var(--color-primary-fixed)] transition-colors">Reglas</Link>
                
                {/* User Dropdown / Profile area */}
                <div className="ml-4 flex items-center gap-3 border-l border-[var(--color-primary-fixed)]/30 pl-4">
                  <Link to="/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    {user?.avatar ? (
                      <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-full border border-[var(--color-primary-fixed)] object-cover" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[var(--color-secondary)] flex items-center justify-center text-[var(--color-on-secondary)] text-xs font-bold">
                        {user?.username?.substring(0,2).toUpperCase() || 'U'}
                      </div>
                    )}
                    <div className="flex flex-col hidden sm:flex">
                      <span className="text-xs font-bold text-[var(--color-primary-fixed)] leading-tight">{user?.username}</span>
                      <span className="text-[10px] text-[var(--color-on-primary-container)]/80 leading-tight">{user?.points || 0} pts</span>
                    </div>
                  </Link>
                  <button onClick={logout} className="hover:text-[var(--color-error-container)] transition-colors cursor-pointer text-xs uppercase ml-2 bg-[var(--color-error-container)]/10 px-2 py-1 rounded">
                    Salir
                  </button>
                </div>
              </>
            )}
          </div>
        </nav>
      </header>
      
      <main className="max-w-7xl mx-auto p-4 md:p-[var(--spacing-margin-desktop)]">
        {children}
      </main>
      
      <footer className="bg-[var(--color-inverse-surface)] text-[var(--color-inverse-on-surface)] p-8 mt-12">
        <div className="max-w-7xl mx-auto text-center text-sm font-medium opacity-80">
          &copy; {new Date().getFullYear()} Quiniela Tricolor - Azteca Arena Design
        </div>
      </footer>
    </div>
  );
}

// Placeholders for screens (To be implemented later)

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Suspense fallback={<div className="flex justify-center p-20 text-[var(--color-primary)] font-bold">Cargando...</div>}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/rules" element={<Rules />} />

              {/* Protected Routes */}
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/predictions" element={<ProtectedRoute><Predictions /></ProtectedRoute>} />
              <Route path="/predictions/:id" element={<ProtectedRoute><PredictionDetail /></ProtectedRoute>} />
              <Route path="/standings" element={<ProtectedRoute><Standings /></ProtectedRoute>} />
              <Route path="/earnings" element={<ProtectedRoute><Earnings /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            </Routes>
          </Suspense>
        </Layout>
      </AuthProvider>
    </Router>
  )
}

export default App
