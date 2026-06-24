import React from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
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
          
          <form className="space-y-[var(--spacing-md)]">
            <div className="space-y-[var(--spacing-base)]">
              <label className="block font-['Work_Sans'] font-semibold text-sm text-[var(--color-on-surface)]" htmlFor="email">Correo Electrónico</label>
              <div className="relative">
                <input 
                  className="w-full px-[var(--spacing-sm)] py-[var(--spacing-sm)] bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-md focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] font-['Work_Sans'] text-base text-[var(--color-on-surface)] transition-colors placeholder:text-[var(--color-outline-variant)]" 
                  id="email" 
                  name="email" 
                  placeholder="fan@mexico.com" 
                  type="email"
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
                />
              </div>
            </div>
            
            <div className="flex items-center gap-[var(--spacing-xs)]">
              <input className="w-4 h-4 rounded text-[var(--color-primary)] border-[var(--color-outline-variant)] focus:ring-[var(--color-primary)]" id="remember" type="checkbox"/>
              <label className="font-['Work_Sans'] text-base text-[var(--color-on-surface-variant)]" htmlFor="remember">Recordarme</label>
            </div>
            
            <button 
              className="w-full py-[var(--spacing-sm)] bg-[var(--color-primary-container)] text-[var(--color-on-primary)] font-['Montserrat'] font-bold text-xl rounded-md shadow-md hover:bg-[var(--color-primary-fixed-variant)] hover:shadow-lg transition-all active:scale-[0.98] uppercase tracking-wide cursor-pointer" 
              type="button"
            >
              Iniciar Sesión
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
          
          <div className="pt-[var(--spacing-lg)] text-center">
            <p className="font-['Work_Sans'] font-medium text-xs text-[var(--color-outline-variant)]">
              Al iniciar sesión, aceptas nuestros Términos de Servicio y Reglas de Apuestas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
