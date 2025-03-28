import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../context/UserContext.jsx';

const baseUrl = 'http://localhost:3030/users';

// Logout hook
export const useLogout = () => {
    const { setUser } = useContext(UserContext);

    const logout = async () => {
        try {
            const response = await fetch(`${baseUrl}/logout`, {
                method: 'GET',
                headers: {
                    'X-Authorization': localStorage.getItem('authToken'),
                },
            });

            if (response.status === 204) {
                localStorage.removeItem('authToken');
                localStorage.removeItem('username');
                setUser(null);
            }
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return { logout };
};

// Login hook
export const useLogin = () => {
    const { setUser } = useContext(UserContext);  // Use context to get setUser
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
            const username = data.username; // Получаваш username
        
            // Записваш username и token в localStorage
            localStorage.setItem('authToken', token);
            localStorage.setItem('username', username); // Записваш username в localStorage
            
            setUser({ token, username });
            navigate('/');
        } catch (error) {
            setError(error.message);
            console.error(error);
        }
    };
    
    

    return { login, error };
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

