import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden. Intenta de nuevo.');
      return;
    }
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    // API call to backend would happen here with the token from URL
    setError('');
    setSuccess(true);
    
    // Redirect after 3 seconds
    setTimeout(() => {
      navigate('/login');
    }, 3000);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 animate-fade-in">
      <div className="max-w-md w-full bg-[var(--color-surface-container-lowest)] p-8 rounded-[var(--radius-xl)] shadow-lg border border-[var(--color-surface-variant)]">
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[var(--color-tertiary-container)] rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🛡️</span>
          </div>
          <h2 className="text-3xl font-extrabold font-['Montserrat'] text-[var(--color-on-surface)]">
            Nueva Contraseña
          </h2>
          <p className="text-[var(--color-on-surface-variant)] mt-2 font-medium">
            Crea una contraseña segura que no olvides esta vez.
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-[var(--color-error-container)] text-[var(--color-on-error-container)] p-4 rounded-[var(--radius-md)] text-sm font-semibold text-center">
            {error}
          </div>
        )}

        {success ? (
          <div className="text-center space-y-4 animate-fade-in">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-xl font-bold text-[var(--color-primary)]">¡Contraseña actualizada!</h3>
            <p className="text-[var(--color-on-surface-variant)] font-medium">
              Redirigiendo al inicio de sesión...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="pass" className="block text-sm font-semibold text-[var(--color-on-surface)] mb-2">
                Nueva Contraseña
              </label>
              <input
                id="pass"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-[var(--color-surface)] border-2 border-[var(--color-outline-variant)] focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>
            
            <div>
              <label htmlFor="confirm" className="block text-sm font-semibold text-[var(--color-on-surface)] mb-2">
                Confirmar Contraseña
              </label>
              <input
                id="confirm"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-[var(--color-surface)] border-2 border-[var(--color-outline-variant)] focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-4 bg-[var(--color-primary)] text-[var(--color-on-primary)] rounded-[var(--radius-full)] font-bold text-lg hover:bg-[var(--color-primary-container)] hover:text-[var(--color-on-primary-container)] transition-all duration-300 transform hover:scale-[1.02] shadow-md"
            >
              Guardar Contraseña
            </button>
          </form>
        )}

      </div>
    </div>
  );
};

export default ResetPassword;
