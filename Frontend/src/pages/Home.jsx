import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center animate-fade-in">
      
      {/* Hero Section */}
      <div className="max-w-4xl space-y-8">
        
        {/* Decorative Badge */}
        <div className="inline-block animate-bounce-slow">
          <span className="bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)] text-sm font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
            Mundial 2026
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold font-['Montserrat'] tracking-tight text-[var(--color-on-background)] leading-tight">
          La mejor quiniela <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]">
            para jugar con amigos
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-[var(--color-on-surface-variant)] max-w-2xl mx-auto font-medium">
          Demuestra cuánto sabes de fútbol. Pronostica los resultados, compite en la tabla de posiciones global y demuestra quién es el verdadero experto del Mundial.
        </p>
        
        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Link 
            to="/register" 
            className="px-8 py-4 bg-[var(--color-primary)] text-[var(--color-on-primary)] rounded-[var(--radius-full)] font-bold text-lg hover:bg-[var(--color-primary-container)] hover:text-[var(--color-on-primary-container)] transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
          >
            <span>Crear Cuenta Gratis</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
          <Link 
            to="/login" 
            className="px-8 py-4 bg-[var(--color-surface)] border-2 border-[var(--color-outline-variant)] text-[var(--color-on-surface)] rounded-[var(--radius-full)] font-bold text-lg hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all duration-300 flex items-center justify-center"
          >
            Iniciar Sesión
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-6xl w-full text-left">
        
        <div className="bg-[var(--color-surface-container-lowest)] p-8 rounded-[var(--radius-xl)] shadow-sm hover:shadow-md transition-shadow border border-[var(--color-surface-variant)] group">
          <div className="w-12 h-12 bg-[var(--color-primary-container)] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <span className="text-2xl">🏆</span>
          </div>
          <h3 className="text-xl font-bold font-['Montserrat'] mb-3">Compite globalmente</h3>
          <p className="text-[var(--color-on-surface-variant)]">Nuestra tabla de posiciones se actualiza en tiempo real con cada gol del mundial.</p>
        </div>

        <div className="bg-[var(--color-surface-container-lowest)] p-8 rounded-[var(--radius-xl)] shadow-sm hover:shadow-md transition-shadow border border-[var(--color-surface-variant)] group">
          <div className="w-12 h-12 bg-[var(--color-secondary-container)] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <span className="text-2xl">⚽</span>
          </div>
          <h3 className="text-xl font-bold font-['Montserrat'] mb-3">Fácil de usar</h3>
          <p className="text-[var(--color-on-surface-variant)]">Una interfaz intuitiva y rápida, perfecta para hacer tus predicciones desde el celular mientras ves el partido.</p>
        </div>

        <div className="bg-[var(--color-surface-container-lowest)] p-8 rounded-[var(--radius-xl)] shadow-sm hover:shadow-md transition-shadow border border-[var(--color-surface-variant)] group">
          <div className="w-12 h-12 bg-[#fffbff] border border-[var(--color-outline-variant)] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <span className="text-2xl">🔒</span>
          </div>
          <h3 className="text-xl font-bold font-['Montserrat'] mb-3">100% Seguro</h3>
          <p className="text-[var(--color-on-surface-variant)]">Tus predicciones están seguras. El acceso es público pero tú controlas tu perfil de jugador.</p>
        </div>

      </div>
    </div>
  );
};

export default Home;
