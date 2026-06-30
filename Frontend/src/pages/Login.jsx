import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error?.detail || 'Credenciales inválidas o error en el servidor');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-140px)] -mx-4 md:-mx-[var(--spacing-margin-desktop)] -my-4 md:-my-[var(--spacing-margin-desktop)] rounded-xl overflow-hidden shadow-xl border border-[var(--color-outline-variant)]">
      {/* Hero Section (Left on Desktop, Top on Mobile) */}
      <div className="relative w-full md:w-1/2 min-h-[400px] md:min-h-auto flex flex-col justify-end bg-[var(--color-primary)] overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay" 
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBzzgP94nqUcVi3b2LpxQEh6AD64nAOwz1VOZy-1xrH4f0CoZHSUeYLMAd4exZY3GiJ0_2psnWdYt4NAt-WEUDcZKAwf7y7if527diHMLKjWA27Zd-7wmM-8a-3YCdSABXoP7211fKiOPxg6AVvZbyi26um7ufxroDbYkondbHLY78er3eVObbEbPK2nNaCwx8uovnD75fue5F_VPKmoDc8TYaK6eBRB_yT82aAlrMBPF_YjcburRAkrl-sEuRB4U_D-D5DIPuhiONX')" }}
        ></div>
        
        {/* Texture Overlay */}
        <div 
          className="absolute inset-0" 
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0V0zm10 10l10-10H0l10 10zm0 0L0 20h20L10 10z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E\")" }}
        ></div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)] via-[var(--color-primary)]/80 to-transparent"></div>
        
        {/* Content */}
        <div className="relative z-10 p-[var(--spacing-margin-mobile)] md:p-[var(--spacing-margin-desktop)] mb-[var(--spacing-lg)]">
          <h1 className="font-['Montserrat'] font-extrabold text-5xl md:text-6xl text-[var(--color-on-primary)] uppercase tracking-tighter mb-[var(--spacing-sm)] drop-shadow-md">
            TRI QUINIELA
          </h1>
          <p className="font-['Work_Sans'] text-lg text-[var(--color-primary-fixed)] mb-[var(--spacing-md)] max-w-md drop-shadow-sm">
            La plataforma oficial de predicciones para los verdaderos fans. Demuestra tus conocimientos y gana.
          </p>
          <div className="flex items-center gap-[var(--spacing-base)]">
            <span className="w-2 h-2 rounded-full bg-[var(--color-secondary)] animate-pulse"></span>
            <span className="font-['Work_Sans'] font-semibold text-sm text-[var(--color-on-primary)] uppercase">Torneo Activo</span>
          </div>
        </div>
      </div>

      {/* Login/Form Section (Right on Desktop, Bottom on Mobile) */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-[var(--spacing-margin-mobile)] md:p-[var(--spacing-margin-desktop)] bg-[var(--color-surface)]">
        <div className="w-full max-w-md space-y-[var(--spacing-lg)]">
          <div className="text-center md:text-left">
            <h2 className="font-['Montserrat'] font-bold text-3xl text-[var(--color-on-surface)] mb-[var(--spacing-xs)]">Bienvenido</h2>
            <p className="font-['Work_Sans'] text-base text-[var(--color-on-surface-variant)]">Inicia sesión para registrar tus quinielas y ver la tabla.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-[var(--spacing-md)]">
            
            {error && (
              <div className="bg-[var(--color-error-container)] text-[var(--color-on-error-container)] p-3 rounded text-sm font-semibold border border-[var(--color-error)]">
                {error}
              </div>
            )}

            <div className="space-y-[var(--spacing-base)]">
              <label className="block font-['Work_Sans'] font-semibold text-sm text-[var(--color-on-surface)]" htmlFor="email">Usuario o Correo</label>
              <div className="relative">
                <input 
                  className="w-full px-[var(--spacing-sm)] py-[var(--spacing-sm)] bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-md focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] font-['Work_Sans'] text-base text-[var(--color-on-surface)] transition-colors placeholder:text-[var(--color-outline-variant)]" 
                  id="email" 
                  name="email" 
                  placeholder="fan@mexico.com" 
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-[var(--spacing-base)]">
              <div className="flex justify-between items-center">
                <label className="block font-['Work_Sans'] font-semibold text-sm text-[var(--color-on-surface)]" htmlFor="password">Contraseña</label>
                <a className="font-['Work_Sans'] font-medium text-xs text-[var(--color-primary)] hover:underline transition-all" href="#">¿Olvidaste tu contraseña?</a>
              </div>
              <div className="relative">
                <input 
                  className="w-full px-[var(--spacing-sm)] py-[var(--spacing-sm)] bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-md focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] font-['Work_Sans'] text-base text-[var(--color-on-surface)] transition-colors placeholder:text-[var(--color-outline-variant)]" 
                  id="password" 
                  name="password" 
                  placeholder="••••••••" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <button 
              className={`w-full py-[var(--spacing-sm)] bg-[var(--color-primary-container)] text-[var(--color-on-primary)] font-['Montserrat'] font-bold text-xl rounded-md shadow-md transition-all uppercase tracking-wide ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[var(--color-primary-fixed-variant)] hover:shadow-lg active:scale-[0.98] cursor-pointer'}`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Iniciando...' : 'Iniciar Sesión'}
            </button>
          </form>
          
          <div className="relative flex py-[var(--spacing-sm)] items-center">
            <div className="flex-grow border-t border-[var(--color-outline-variant)]"></div>
            <span className="flex-shrink-0 mx-[var(--spacing-md)] font-['Work_Sans'] font-medium text-xs text-[var(--color-outline)]">O</span>
            <div className="flex-grow border-t border-[var(--color-outline-variant)]"></div>
          </div>
          
          <div className="text-center space-y-[var(--spacing-md)]">
            <p className="font-['Work_Sans'] text-base text-[var(--color-on-surface-variant)]">¿Aún no tienes cuenta?</p>
            <Link to="/register" className="block w-full py-[var(--spacing-sm)] bg-[var(--color-surface-container-lowest)] border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-['Montserrat'] font-bold text-xl rounded-md hover:bg-[var(--color-primary-fixed)]/10 transition-colors uppercase tracking-wide">
              Crear Cuenta
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
