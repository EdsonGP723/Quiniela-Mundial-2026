import React, { useState, useEffect } from 'react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, checkAuth } = useAuth();
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setUsername(user.username || '');
      setFirstName(user.first_name || '');
      setLastName(user.last_name || '');
    }
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await api.patch('/users/profile/', {
        username,
        first_name: firstName,
        last_name: lastName
      });
      // Refresh user context data
      await checkAuth();
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error(err);
      setError(err.data?.username?.[0] || 'Error al guardar el perfil');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 animate-fade-in">
      <h2 className="text-4xl font-extrabold font-['Montserrat'] text-[var(--color-on-background)] mb-8 border-b border-[var(--color-surface-variant)] pb-4">
        Mi Perfil
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Avatar Section */}
        <div className="col-span-1 flex flex-col items-center space-y-4">
          {user?.avatar ? (
            <img src={user.avatar} alt="Avatar" className="w-40 h-40 rounded-full border-4 border-[var(--color-surface)] shadow-xl object-cover" />
          ) : (
            <div className="w-40 h-40 rounded-full bg-[var(--color-primary-container)] border-4 border-[var(--color-surface)] shadow-xl flex items-center justify-center overflow-hidden">
              <span className="text-6xl text-[var(--color-on-primary-container)]">
                {user?.username ? user.username.substring(0, 2).toUpperCase() : '👤'}
              </span>
            </div>
          )}
          <div className="text-center">
            <p className="font-['Montserrat'] font-bold text-xl">{user?.points || 0} pts</p>
            <p className="text-xs text-[var(--color-on-surface-variant)] uppercase tracking-wider">Puntos Acumulados</p>
          </div>
        </div>

        {/* Info Section */}
        <div className="col-span-1 md:col-span-2 bg-[var(--color-surface-container-lowest)] p-8 rounded-[var(--radius-xl)] shadow-sm border border-[var(--color-surface-variant)]">
          {error && (
            <div className="bg-[var(--color-error-container)] text-[var(--color-on-error-container)] p-3 rounded text-sm font-semibold mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6">
            
            <div>
              <label className="block text-sm font-semibold text-[var(--color-on-surface)] mb-2">
                Nombre de Usuario (Público)
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-outline-variant)] focus:border-[var(--color-primary)] focus:outline-none transition-colors"
              />
              <p className="text-xs text-[var(--color-on-surface-variant)] mt-1">
                Así te verán en la tabla de posiciones.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-[var(--color-on-surface)] mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-outline-variant)] focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[var(--color-on-surface)] mb-2">
                  Apellidos
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-outline-variant)] focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-[var(--color-surface-variant)]">
              {saved ? (
                <span className="text-[var(--color-primary)] font-bold animate-pulse">¡Cambios guardados! ✅</span>
              ) : (
                <span className="text-transparent">Placeholder</span>
              )}
              
              <button
                type="submit"
                disabled={saving}
                className="px-8 py-3 bg-[var(--color-primary)] text-[var(--color-on-primary)] rounded-[var(--radius-full)] font-bold hover:bg-[var(--color-primary-container)] hover:text-[var(--color-on-primary-container)] transition-all shadow-md transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
              >
                {saving ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
