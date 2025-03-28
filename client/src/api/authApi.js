import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../context/UserContext.jsx';
import Cookies from 'js-cookie'; // Импортираме библиотеката за работа с cookies


const baseUrl = 'http://localhost:3030/users';

export const useLogin = () => {
    const { setUser } = useContext(UserContext);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const login = async (email, password) => {
        try {
            const response = await fetch(`${baseUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) throw new Error('Login failed');

            const data = await response.json();
            const token = data.accessToken;
            const username = data.username;

            // Set the token and username in cookies
            Cookies.set('authToken', token, { expires: 7, path: '/', secure: window.location.protocol === 'https:', sameSite: 'Strict' });
            Cookies.set('username', username, { expires: 7, path: '/', secure: window.location.protocol === 'https:', sameSite: 'Strict' });

            // Set the user context state
            setUser({ token, username });

            // Navigate to home or dashboard after successful login
            navigate('/');
        } catch (error) {
            setError(error.message);
            console.error(error);
        }
    };

    return { login, error };
};

// Logout hook
export const useLogout = () => {
    const { setUser } = useContext(UserContext);

    const logout = async () => {
        try {
            const response = await fetch(`${baseUrl}/logout`, {
                method: 'GET',
                headers: {
                    'X-Authorization': Cookies.get('authToken'), // Use token from cookies
                },
            });

            if (response.status === 204) {
                // Delete token and username from cookies
                Cookies.remove('authToken', { path: '/' });
                Cookies.remove('username', { path: '/' });
                setUser(null); // Reset user context state
            }
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return { logout };
};





// Register hook
export const useRegister = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const register = async (email, password, confirmPassword, username) => {
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Invalid email format');
            return;
        }

        try {
            const response = await fetch(`${baseUrl}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, username }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed');
            }

            navigate('/login');
        } catch (error) {
            setError(error.message);
            console.error(error);
        }
    };

    return { register, error };
};

