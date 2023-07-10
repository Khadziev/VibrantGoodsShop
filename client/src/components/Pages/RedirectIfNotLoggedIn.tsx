import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/store';


const RedirectIfNotLoggedIn: React.FC = () => {
  const token = useAppSelector((state) => state.auth.token);
  const navigate = useNavigate();

  if (!token) {
    navigate('/login');
  }

  return null;
};

export default RedirectIfNotLoggedIn;
