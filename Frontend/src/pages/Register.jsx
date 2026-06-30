import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register: registerUser, user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setIsLoading(true);

    const payload = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      first_name: formData.firstName,
      last_name: formData.lastName
    };

    const result = await registerUser(payload);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      let errorMsg = 'Error al registrarse';
      if (typeof result.error === 'object') {
        const errors = Object.values(result.error).flat();
        if (errors.length > 0) errorMsg = errors[0];
      } else {
        errorMsg = result.error;
      }
      setError(errorMsg);
      setIsLoading(false);
    }
  };

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
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCQ10vg7icgf6lpCYx4hjGz2CC4h1fjI2H-Wni3PbMf1qQkIFxHJNvWshNFivMvLchPkAzdyuu3xzSCvbSGOTzEvnVrSyoaXKxeaPDRkW8q__tsfyL9obPdxtAPVH3e0ZrI5Xk-xfBNbcwruzgB0gWInNdc2utlHCykRuWmdLxvHhNV__5OFbaxRHAAUTat80ncvbVj35xNHd9zBAOa49o4n6s_bLvWI_z1088asSiX9W1Cp7cKA5prnsbAD2ljpSqAvjtP2iTkKI4u')" }}
          ></div>
          <div 
            className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "12px 12px" }}
          ></div>
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
          
          {/* Form Header */}
          <div className="mb-8 text-center md:text-left">
            <h2 className="font-['Montserrat'] font-bold text-3xl text-[var(--color-on-surface)] mb-2">Crear Cuenta</h2>
            <p className="font-['Work_Sans'] text-base text-[var(--color-on-surface-variant)]">Regístrate para empezar a hacer tus predicciones y escalar en la tabla.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-[var(--color-error-container)] text-[var(--color-on-error-container)] p-3 rounded text-sm font-semibold border border-[var(--color-error)]">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block font-['Work_Sans'] font-semibold text-sm text-[var(--color-on-surface-variant)] mb-1.5" htmlFor="firstName">Nombre</label>
                <input 
                  className="w-full px-4 py-3.5 rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface)] focus:border-[var(--color-primary-container)] focus:ring-2 focus:ring-[var(--color-primary-container)]/20 text-base" 
                  id="firstName" name="firstName" placeholder="Juan" type="text"
                  value={formData.firstName} onChange={handleChange} required
                />
              </div>
              <div>
                <label className="block font-['Work_Sans'] font-semibold text-sm text-[var(--color-on-surface-variant)] mb-1.5" htmlFor="lastName">Apellido</label>
                <input 
                  className="w-full px-4 py-3.5 rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface)] focus:border-[var(--color-primary-container)] focus:ring-2 focus:ring-[var(--color-primary-container)]/20 text-base" 
                  id="lastName" name="lastName" placeholder="Perez" type="text"
                  value={formData.lastName} onChange={handleChange} required
                />
              </div>
            </div>

            <div>
              <label className="block font-['Work_Sans'] font-semibold text-sm text-[var(--color-on-surface-variant)] mb-1.5" htmlFor="username">Nombre de Usuario</label>
              <input 
                className="w-full px-4 py-3.5 rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface)] focus:border-[var(--color-primary-container)] focus:ring-2 focus:ring-[var(--color-primary-container)]/20 text-base" 
                id="username" name="username" placeholder="juanperez99" type="text"
                value={formData.username} onChange={handleChange} required
              />
            </div>
            
            <div>
              <label className="block font-['Work_Sans'] font-semibold text-sm text-[var(--color-on-surface-variant)] mb-1.5" htmlFor="email">Correo Electrónico</label>
              <input 
                className="w-full px-4 py-3.5 rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface)] focus:border-[var(--color-primary-container)] focus:ring-2 focus:ring-[var(--color-primary-container)]/20 text-base" 
                id="email" name="email" placeholder="fan@mexico.com" type="email"
                value={formData.email} onChange={handleChange} required
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block font-['Work_Sans'] font-semibold text-sm text-[var(--color-on-surface-variant)] mb-1.5" htmlFor="password">Contraseña</label>
                <input 
                  className="w-full px-4 py-3.5 rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface)] focus:border-[var(--color-primary-container)] focus:ring-2 focus:ring-[var(--color-primary-container)]/20 text-base" 
                  id="password" name="password" placeholder="••••••••" type="password"
                  value={formData.password} onChange={handleChange} required
                />
              </div>
              
              <div>
                <label className="block font-['Work_Sans'] font-semibold text-sm text-[var(--color-on-surface-variant)] mb-1.5" htmlFor="confirmPassword">Confirmar</label>
                <input 
                  className="w-full px-4 py-3.5 rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface)] focus:border-[var(--color-primary-container)] focus:ring-2 focus:ring-[var(--color-primary-container)]/20 text-base" 
                  id="confirmPassword" name="confirmPassword" placeholder="••••••••" type="password"
                  value={formData.confirmPassword} onChange={handleChange} required
                />
              </div>
            </div>
            
            <div className="pt-4">
              <button 
                className={`w-full py-4 bg-[var(--color-primary-container)] text-[var(--color-on-primary)] font-['Montserrat'] font-bold text-xl rounded-lg uppercase tracking-wide transition-all duration-200 shadow-[0_4px_12px_rgba(1,104,71,0.2)] hover:shadow-[0_6px_16px_rgba(1,104,71,0.3)] transform flex justify-center items-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'active:scale-[0.98] cursor-pointer'}`}
                type="submit"
                disabled={isLoading}
              >
                <span>{isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}</span>
                {!isLoading && <span className="material-symbols-outlined text-[20px]">arrow_forward</span>}
              </button>
            </div>
          </form>
          
          <div className="mt-8 text-center border-t border-[var(--color-outline-variant)]/30 pt-6">
            <p className="font-['Work_Sans'] text-base text-[var(--color-on-surface-variant)]">
              ¿Ya tienes una cuenta? 
              <Link to="/login" className="text-[var(--color-secondary)] hover:text-[var(--color-secondary-container)] font-['Work_Sans'] font-semibold text-sm hover:underline transition-colors ml-1 inline-flex items-center gap-1">
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
