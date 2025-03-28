import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

// Създаване на UserContext
export const UserContext = createContext();

// Компонент за предоставяне на контекста
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = Cookies.get('authToken');
        const username = Cookies.get('username');

        if (token && username) {
            setUser({ token, username });
        }
    }, []); // This runs only once when the component is mounted

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
