import React from 'react';
import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <div className="relative min-h-[calc(100vh-140px)] flex items-center justify-center p-4">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[var(--color-primary-fixed-dim)]/20 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-[var(--color-secondary-fixed)]/30 rounded-full blur-3xl opacity-50"></div>
      </div>

      <main className="w-full max-w-[1120px] bg-[var(--color-surface-container-lowest)] rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] flex flex-col md:flex-row overflow-hidden border border-[var(--color-outline-variant)]/20 relative z-10">
        {/* Left Panel: Brand Imagery (Hidden on mobile) */}
        <div className="hidden md:flex md:w-[45%] lg:w-1/2 relative bg-[var(--color-primary)] items-center justify-center p-12 overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCQ10vg7icgf6lpCYx4hjGz2CC4h1fjI2H-Wni3PbMf1qQkIFxHJNvWshNFivMvLchPkAzdyuu3xzSCvbSGOTzEvnVrSyoaXKxeaPDRkW8q__tsfyL9obPdxtAPVH3e0ZrI5Xk-xfBNbcwruzgB0gWInNdc2utlHCykRuWmdLxvHhNV__5OFbaxRHAAUTat80ncvbVj35xNHd9zBAOa49o4n6s_bLvWI_z1088asSiX9W1Cp7cKA5prnsbAD2ljpSqAvjtP2iTkKI4u')" }}
          ></div>
          
          {/* Tactile Mesh Overlay */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "12px 12px" }}
          ></div>
          
          {/* Brand Content */}
          <div className="relative z-10 text-center max-w-sm">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-[var(--color-surface-container-lowest)] rounded-full flex items-center justify-center shadow-lg">
                <span className="material-symbols-outlined text-[40px] text-[var(--color-primary-container)]">sports_soccer</span>
              </div>
            </div>
            <h1 className="font-['Montserrat'] font-extrabold text-5xl text-[var(--color-on-primary)] uppercase tracking-tighter mb-4 drop-shadow-md">
              TRI QUINIELA
            </h1>
            <div className="h-1 w-16 bg-[var(--color-secondary)] mx-auto mb-6 rounded-full"></div>
            <p className="font-['Work_Sans'] text-lg text-[var(--color-primary-fixed)] leading-relaxed drop-shadow-sm">
              La plataforma oficial de predicciones. Apoya al equipo, reta a tus amigos y predice la gloria.
            </p>
          </div>
        </div>

        {/* Right Panel: Registration Form */}
        <div className="w-full md:w-[55%] lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-[var(--color-surface-container-lowest)] relative">
          {/* Mobile Brand Header */}
          <div className="md:hidden flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-[var(--color-primary)] rounded-full flex items-center justify-center shadow-md mb-4">
              <span className="material-symbols-outlined text-[32px] text-[var(--color-on-primary)]">sports_soccer</span>
            </div>
            <h1 className="font-['Montserrat'] font-bold text-2xl text-[var(--color-primary)] uppercase tracking-tighter text-center">
              TRI QUINIELA
            </h1>
          </div>
          
          {/* Form Header */}
          <div className="mb-8 text-center md:text-left">
            <h2 className="font-['Montserrat'] font-bold text-3xl text-[var(--color-on-surface)] mb-2">Crear Cuenta</h2>
            <p className="font-['Work_Sans'] text-base text-[var(--color-on-surface-variant)]">Regístrate para empezar a hacer tus predicciones y escalar en la tabla.</p>
          </div>
          
          <form className="space-y-5">
            {/* Full Name Input */}
            <div>
              <label className="block font-['Work_Sans'] font-semibold text-sm text-[var(--color-on-surface-variant)] mb-1.5" htmlFor="fullName">Nombre Completo</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-[var(--color-outline)] text-[20px]">person</span>
                </div>
                <input 
                  className="w-full pl-11 pr-4 py-3.5 rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface)] text-[var(--color-on-surface)] focus:bg-[var(--color-surface-container-lowest)] focus:outline-none focus:border-[var(--color-primary-container)] focus:ring-2 focus:ring-[var(--color-primary-container)]/20 transition-all duration-200 font-['Work_Sans'] text-base placeholder:text-[var(--color-outline-variant)]" 
                  id="fullName" 
                  placeholder="Juan Perez" 
                  type="text"
                />
              </div>
            </div>
            
            {/* Email Input */}
            <div>
              <label className="block font-['Work_Sans'] font-semibold text-sm text-[var(--color-on-surface-variant)] mb-1.5" htmlFor="email">Correo Electrónico</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-[var(--color-outline)] text-[20px]">mail</span>
                </div>
                <input 
                  className="w-full pl-11 pr-4 py-3.5 rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface)] text-[var(--color-on-surface)] focus:bg-[var(--color-surface-container-lowest)] focus:outline-none focus:border-[var(--color-primary-container)] focus:ring-2 focus:ring-[var(--color-primary-container)]/20 transition-all duration-200 font-['Work_Sans'] text-base placeholder:text-[var(--color-outline-variant)]" 
                  id="email" 
                  placeholder="fan@mexico.com" 
                  type="email"
                />
              </div>
            </div>
            
            {/* Password Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Password */}
              <div>
                <label className="block font-['Work_Sans'] font-semibold text-sm text-[var(--color-on-surface-variant)] mb-1.5" htmlFor="password">Contraseña</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-[var(--color-outline)] text-[20px]">lock</span>
                  </div>
                  <input 
                    className="w-full pl-11 pr-10 py-3.5 rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface)] text-[var(--color-on-surface)] focus:bg-[var(--color-surface-container-lowest)] focus:outline-none focus:border-[var(--color-primary-container)] focus:ring-2 focus:ring-[var(--color-primary-container)]/20 transition-all duration-200 font-['Work_Sans'] text-base placeholder:text-[var(--color-outline-variant)]" 
                    id="password" 
                    placeholder="••••••••" 
                    type="password"
                  />
                  <button aria-label="Toggle password visibility" className="absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--color-outline)] hover:text-[var(--color-primary-container)] transition-colors" type="button">
                    <span className="material-symbols-outlined text-[20px]">visibility_off</span>
                  </button>
                </div>
              </div>
              
              {/* Confirm Password */}
              <div>
                <label className="block font-['Work_Sans'] font-semibold text-sm text-[var(--color-on-surface-variant)] mb-1.5" htmlFor="confirmPassword">Confirmar Contraseña</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-[var(--color-outline)] text-[20px]">lock_reset</span>
                  </div>
                  <input 
                    className="w-full pl-11 pr-10 py-3.5 rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface)] text-[var(--color-on-surface)] focus:bg-[var(--color-surface-container-lowest)] focus:outline-none focus:border-[var(--color-primary-container)] focus:ring-2 focus:ring-[var(--color-primary-container)]/20 transition-all duration-200 font-['Work_Sans'] text-base placeholder:text-[var(--color-outline-variant)]" 
                    id="confirmPassword" 
                    placeholder="••••••••" 
                    type="password"
                  />
                  <button aria-label="Toggle confirm password visibility" className="absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--color-outline)] hover:text-[var(--color-primary-container)] transition-colors" type="button">
                    <span className="material-symbols-outlined text-[20px]">visibility_off</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Terms Checkbox */}
            <div className="flex items-start pt-2">
              <div className="flex items-center h-5 mt-0.5">
                <input 
                  className="w-5 h-5 rounded border-[var(--color-outline-variant)] text-[var(--color-primary-container)] focus:ring-[var(--color-primary-container)] focus:ring-offset-[var(--color-surface-container-lowest)] bg-[var(--color-surface)] cursor-pointer transition-colors" 
                  id="terms" 
                  type="checkbox"
                />
              </div>
              <div className="ml-3 text-sm">
                <label className="font-['Work_Sans'] text-sm text-[var(--color-on-surface-variant)] cursor-pointer leading-relaxed block" htmlFor="terms">
                  Acepto los <a className="text-[var(--color-primary-container)] hover:text-[var(--color-primary)] font-bold hover:underline transition-colors" href="#">Términos de Servicio</a>, <a className="text-[var(--color-primary-container)] hover:text-[var(--color-primary)] font-bold hover:underline transition-colors" href="#">Reglas de Apuestas</a>, y la <a className="text-[var(--color-primary-container)] hover:text-[var(--color-primary)] font-bold hover:underline transition-colors" href="#">Política de Privacidad</a>.
                </label>
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="pt-4">
              <button 
                className="w-full py-4 bg-[var(--color-primary-container)] hover:bg-[var(--color-primary)] text-[var(--color-on-primary)] font-['Montserrat'] font-bold text-xl rounded-lg uppercase tracking-wide transition-all duration-200 shadow-[0_4px_12px_rgba(1,104,71,0.2)] hover:shadow-[0_6px_16px_rgba(1,104,71,0.3)] transform active:scale-[0.98] flex justify-center items-center gap-2 cursor-pointer" 
                type="button"
              >
                <span>Crear Cuenta</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </div>
          </form>
          
          {/* Login Link */}
          <div className="mt-8 text-center border-t border-[var(--color-outline-variant)]/30 pt-6">
            <p className="font-['Work_Sans'] text-base text-[var(--color-on-surface-variant)]">
              ¿Ya tienes una cuenta? 
              <Link to="/" className="text-[var(--color-secondary)] hover:text-[var(--color-secondary-container)] font-['Work_Sans'] font-semibold text-sm hover:underline transition-colors ml-1 inline-flex items-center gap-1">
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
