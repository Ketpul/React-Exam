import React, { useEffect } from 'react';
import { useLogout } from '../../api/authApi.js';
import { useNavigate } from 'react-router';

export default function Logout() {
  const { logout } = useLogout();
  const navigate = useNavigate();

  useEffect(() => {
    logout(); 
    navigate('/login'); 
  }, [logout, navigate]);

  return <></>;
}
