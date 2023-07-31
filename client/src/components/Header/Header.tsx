import React, { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppDispatch, useAppSelector } from '../../app/providers/store';


import { setToken, clearUserData } from '../../apiServices/auth/authSlice';
import Button from '../../UI/Button/Button';
import Text from '../../UI/Text/Text';

const Header: React.FC = memo(() => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useAppSelector((state) => state.auth.user);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(clearUserData());
    navigate('/login', { replace: true });
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken && location.pathname !== '/registration') {
      navigate('/login', { replace: true });
    }
    else if(storedToken) {
      dispatch(setToken(storedToken));
    }
  }, [dispatch, location.pathname, navigate]);

  return (
    <div>
      <nav className="flex items-center justify-between flex-wrap bg-transparent p-6">
        {user && (
          <>
            <div className="flex items-center flex-shrink-0 text-white mr-6">
              <Link to="/" className="font-semibold text-xl tracking-tight">
                <Text text='VibrantGoods' color='black'/>
              </Link>
            </div>
            <div>
              <Button text="Выйти" color='black' onClick={handleLogout} />
            </div>
          </>
        )}
      </nav>

    </div>
  );
});

export default Header;
