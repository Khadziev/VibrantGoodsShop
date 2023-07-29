import React, { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppDispatch, useAppSelector } from '../../app/providers/store';
import LoginForm from '../Auth/LoginForm';
import { logout } from '../../apiServices/auth/authActions';
import { setToken } from '../../apiServices/auth/authSlice';
import Button from '../../UI/Button/Button';
import Text from '../../UI/Text/Text';

const Header: React.FC = memo(() => {
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
      <nav className="flex items-center justify-between flex-wrap bg-transparent p-6">
        {user && (
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <Link to="/" className="font-semibold text-xl tracking-tight">
              <Text text='VibrantGoods' color='black'/>
            </Link>
          </div>
        )}
        <div>
          {user && (
            <Button text="Выйти" color='black' onClick={handleLogout} />
          )}
        </div>
      </nav>
      {showLoginForm && <LoginForm />}
    </div>
  );
});

export default Header;
