import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppDispatch, useAppSelector } from '../../redux/store';
import LoginForm from '../Auth/LoginForm';
import { logout } from '../../redux/auth/authActions';
import { setToken } from '../../redux/auth/authSlice';

const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useAppSelector((state) => state.auth.token);
  const location = useLocation();
  const navigate = useNavigate();
  const [showLoginForm] = useState(false);

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      navigate('/login', { replace: true });
    } catch (error) {
      console.log('Ошибка при разлогинивании:', error);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken && location.pathname !== '/registration') {
      navigate('/login', { replace: true });
    } else {
      dispatch(setToken(storedToken));
    }
  }, [dispatch, location.pathname, navigate]);



  return (
    <div>
      <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-6">
        {user && (
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <Link to="/" className="font-semibold text-xl tracking-tight">
              VibrantGoods
            </Link>
          </div>
        )}
        <div>
          {user && (
            <button
              onClick={handleLogout}
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0"
            >
              Выйти
            </button>
          )}
        </div>
      </nav>
      {showLoginForm && <LoginForm />}
    </div>
  );
};

export default Header;
