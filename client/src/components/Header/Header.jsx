import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { UserContext } from '../../context/UserContext.jsx';

export default function Header() {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const username = localStorage.getItem('username'); 
    if (token && username) {
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
        <Link to="/">ArtShare</Link>
      </h1>
      <nav>
        {user ? (
          <>
            <span>Welcome, {user.username}</span>
            <Link to="/create">Create</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/favorite">Favorite</Link>
            <Link to="/about">About</Link>
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
