import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here would be the API call to Django backend to send recovery email
    console.log('Recovery email sent to:', email);
    setSubmitted(true);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 animate-fade-in">
      <div className="max-w-md w-full bg-[var(--color-surface-container-lowest)] p-8 rounded-[var(--radius-xl)] shadow-lg border border-[var(--color-surface-variant)]">
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[var(--color-primary-container)] rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🔑</span>
          </div>
          <h2 className="text-3xl font-extrabold font-['Montserrat'] text-[var(--color-on-surface)]">
            Recuperar Contraseña
          </h2>
          <p className="text-[var(--color-on-surface-variant)] mt-2 font-medium">
            Ingresa tu correo y te enviaremos un enlace para restablecer tu acceso.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[var(--color-on-surface)] mb-2">
                Correo Electrónico
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-[var(--color-surface)] border-2 border-[var(--color-outline-variant)] focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                placeholder="ejemplo@correo.com"
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-4 bg-[var(--color-primary)] text-[var(--color-on-primary)] rounded-[var(--radius-full)] font-bold text-lg hover:bg-[var(--color-primary-container)] hover:text-[var(--color-on-primary-container)] transition-all duration-300 transform hover:scale-[1.02] shadow-md"
            >
              Enviar Enlace
            </button>
          </form>
        ) : (
          <div className="text-center space-y-6 animate-fade-in">
            <div className="bg-[var(--color-secondary-fixed)] text-[var(--color-on-secondary-fixed)] p-4 rounded-[var(--radius-md)] font-medium">
              ¡Revisa tu bandeja de entrada! Hemos enviado las instrucciones a <strong>{email}</strong>.
            </div>
            <button
              onClick={() => setSubmitted(false)}
              className="text-[var(--color-primary)] font-semibold hover:underline"
            >
              ¿No lo recibiste? Intenta de nuevo
            </button>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link to="/login" className="text-[var(--color-outline)] font-semibold hover:text-[var(--color-primary)] transition-colors">
            &larr; Volver a Iniciar Sesión
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;
