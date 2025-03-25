import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { UserContext } from '../../context/UserContext.jsx';

export default function Header() {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Retrieve username along with token if available
      const username = localStorage.getItem('username');
      setUser({ token, username });
    }
    setLoading(false);
  }, [setUser]);

  if (loading) {
    return null; 
  }

  console.log(user);
  

  return (
    <header>
      <h1>
        <Link to="/">RecMes</Link>
      </h1>
      <nav>
        {user ? (
          <>
            <span>Welcome, {user.username}</span>
            <Link to="/games">Users</Link>
            <div id="user">
              <Link to="/logout">Logout</Link>
            </div>
          </>
        ) : (
          <div id="guest">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
      </nav>
    </header>
  );
}
