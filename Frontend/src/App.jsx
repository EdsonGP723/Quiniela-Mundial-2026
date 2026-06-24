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

// Mock authentication state (To be replaced with Context/State)
const isAuthenticated = false;

// Layout structure following Azteca Arena design
const Layout = ({ children }) => (
  <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-on-background)] font-['Work_Sans']">
    <header className="bg-[var(--color-primary-container)] p-4 shadow-md sticky top-0 z-50">
      <nav className="flex flex-wrap justify-between items-center max-w-7xl mx-auto gap-4">
        <div className="flex items-center gap-2">
          {/* Mock Logo */}
          <div className="w-8 h-8 rounded bg-[var(--color-secondary)] flex items-center justify-center">
            <span className="text-[var(--color-on-secondary)] font-bold font-['Montserrat']">Q</span>
          </div>
          <h1 className="font-['Montserrat'] font-extrabold text-xl tracking-tight text-[var(--color-on-primary-container)]">
            QUINIELA TRICOLOR
          </h1>
        </div>
        <div className="flex flex-wrap gap-4 font-semibold text-sm text-[var(--color-on-primary-container)]">
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
              <Link to="/profile" className="hover:text-[var(--color-primary-fixed)] transition-colors">Mi Perfil</Link>
              <button className="hover:text-[var(--color-error-container)] transition-colors ml-4">Cerrar Sesión</button>
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
)

// Placeholders for screens (To be implemented later)

function App() {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<div className="flex justify-center p-20 text-[var(--color-primary)] font-bold">Cargando...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/predictions" element={<Predictions />} />
            <Route path="/predictions/:id" element={<PredictionDetail />} />
            <Route path="/standings" element={<Standings />} />
            <Route path="/earnings" element={<Earnings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/rules" element={<Rules />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  )
}

export default App
