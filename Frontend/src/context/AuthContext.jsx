import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/client';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Inicializar el estado de autenticación al cargar
        const token = localStorage.getItem('accessToken');
        if (token) {
            fetchProfile();
        } else {
            setLoading(false);
        }
    }, []);

    const fetchProfile = async () => {
        try {
            const data = await api.get('/users/profile/');
            setUser(data);
        } catch (error) {
            console.error('Error fetching profile', error);
            // Si el token es inválido (y el auto-refresh falló), limpiamos
            logout();
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            // El backend usa username en vez de email para JWT obtain por defecto,
            // pero si tu config acepta ambos, usamos el campo adecuado.
            // Asumiremos username/password o email según el backend.
            // Revisando Backend: usa username. Asumiremos que mandamos username=email para simplificar si el login usa email.
            // NOTA: Si el backend requiere 'username', mandaremos email como username.
            const response = await api.post('/users/auth/login/', { username: email, password }, false);
            
            localStorage.setItem('accessToken', response.access);
            localStorage.setItem('refreshToken', response.refresh);
            
            await fetchProfile();
            return { success: true };
        } catch (error) {
            console.error('Login error', error);
            return { success: false, error: error.data || 'Error al iniciar sesión' };
        }
    };

    const register = async (userData) => {
        try {
            await api.post('/users/auth/register/', userData, false);
            // Después del registro, auto login
            return await login(userData.username, userData.password);
        } catch (error) {
            console.error('Register error', error);
            return { success: false, error: error.data || 'Error al registrarse' };
        }
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
