import React, { useState } from 'react';

const Profile = () => {
  const [username, setUsername] = useState('JuanPerez99');
  const [email, setEmail] = useState('juan@ejemplo.com');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    // Simulate API call to save profile
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 animate-fade-in">
      <h2 className="text-4xl font-extrabold font-['Montserrat'] text-[var(--color-on-background)] mb-8 border-b border-[var(--color-surface-variant)] pb-4">
        Mi Perfil
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Avatar Section */}
        <div className="col-span-1 flex flex-col items-center space-y-4">
          <div className="w-40 h-40 rounded-full bg-[var(--color-primary-container)] border-4 border-[var(--color-surface)] shadow-xl flex items-center justify-center overflow-hidden">
            <span className="text-6xl text-[var(--color-on-primary-container)]">👤</span>
          </div>
          <button className="px-4 py-2 bg-[var(--color-surface-variant)] text-[var(--color-on-surface)] rounded-full text-sm font-semibold hover:bg-[var(--color-outline-variant)] transition-colors">
            Cambiar Foto
          </button>
        </div>

        {/* Info Section */}
        <div className="col-span-1 md:col-span-2 bg-[var(--color-surface-container-lowest)] p-8 rounded-[var(--radius-xl)] shadow-sm border border-[var(--color-surface-variant)]">
          <form onSubmit={handleSave} className="space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-[var(--color-on-surface)] mb-2">
                  Nombre de Usuario (Público)
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-outline-variant)] focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                />
                <p className="text-xs text-[var(--color-on-surface-variant)] mt-1">
                  Así te verán en la tabla de posiciones.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[var(--color-on-surface)] mb-2">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-[var(--color-surface-variant)] border border-[var(--color-outline-variant)] text-[var(--color-on-surface-variant)] opacity-70 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-[var(--color-surface-variant)]">
              <h3 className="text-lg font-bold mb-4 font-['Montserrat']">Cambiar Contraseña</h3>
              <div className="space-y-4">
                <input
                  type="password"
                  placeholder="Contraseña actual"
                  className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-outline-variant)] focus:border-[var(--color-primary)] focus:outline-none"
                />
                <input
                  type="password"
                  placeholder="Nueva contraseña"
                  className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-outline-variant)] focus:border-[var(--color-primary)] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-6">
              {saved ? (
                <span className="text-[var(--color-primary)] font-bold animate-pulse">¡Cambios guardados! ✅</span>
              ) : (
                <span className="text-transparent">Placeholder</span>
              )}
              
              <button
                type="submit"
                className="px-8 py-3 bg-[var(--color-primary)] text-[var(--color-on-primary)] rounded-[var(--radius-full)] font-bold hover:bg-[var(--color-primary-container)] hover:text-[var(--color-on-primary-container)] transition-all shadow-md transform hover:scale-105"
              >
                Guardar Cambios
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
