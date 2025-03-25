import { useContext } from 'react';
import { UserContext } from '../context/UserContext.jsx';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const baseUrl = 'http://localhost:3030/users';

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
                setUser(null);
            }
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return { logout };
};

export const useLogin = () => {
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
            console.log(data);


            localStorage.setItem('authToken', token);
            localStorage.setItem('username', data.username);
            navigate('/');
            //window.location.reload();  
        } catch (error) {
            setError(error.message);
            console.error(error);
        }
    };

    return { login, error };
};

export const useRegister = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const register = async (email, password, confirmPassword, username) => {
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await fetch(`${baseUrl}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, username }),
            });

            if (!response.ok) throw new Error('Registration failed');

            const data = await response.json();
            console.log('Registration successful:', data);
            navigate('/login');
        } catch (error) {
            setError(error.message);
            console.error(error);
        }
    };

    return { register, error };
};