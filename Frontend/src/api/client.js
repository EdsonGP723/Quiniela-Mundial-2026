const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = {
    get: async (endpoint, auth = true) => request('GET', endpoint, null, auth),
    post: async (endpoint, body, auth = true) => request('POST', endpoint, body, auth),
    put: async (endpoint, body, auth = true) => request('PUT', endpoint, body, auth),
    patch: async (endpoint, body, auth = true) => request('PATCH', endpoint, body, auth),
    delete: async (endpoint, auth = true) => request('DELETE', endpoint, null, auth),
};

async function request(method, endpoint, body = null, auth = true) {
    const headers = {
        'Content-Type': 'application/json',
    };

    if (auth) {
        const token = localStorage.getItem('accessToken');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }

    const config = {
        method,
        headers,
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    try {
        let response = await fetch(`${API_URL}${endpoint}`, config);

        // Auto-refresh token si recibimos un 401 Unauthorized
        if (response.status === 401 && auth) {
            const refreshed = await refreshToken();
            if (refreshed) {
                // Si el refresh fue exitoso, reintentar la petición original
                headers['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
                response = await fetch(`${API_URL}${endpoint}`, { ...config, headers });
            } else {
                // Si el refresh falló, forzar logout (se manejará en el contexto usualmente, pero aquí limpiamos tokens)
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
                throw new Error('Sesión expirada');
            }
        }

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw { status: response.status, data: errorData };
        }

        // Para peticiones 204 No Content
        if (response.status === 204) {
            return null;
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}

async function refreshToken() {
    const refresh = localStorage.getItem('refreshToken');
    if (!refresh) return false;

    try {
        const response = await fetch(`${API_URL}/users/auth/refresh/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('accessToken', data.access);
            // El backend podría o no retornar un nuevo refresh token
            if (data.refresh) {
                localStorage.setItem('refreshToken', data.refresh);
            }
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
}

export default api;
