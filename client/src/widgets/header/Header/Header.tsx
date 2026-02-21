import React, { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppDispatch, useAppSelector } from '@/app/providers/store';
import { logout } from '@/shared/api/auth/authActions';
import { setToken } from '@/shared/api/auth/authSlice';
import Button from '@/shared/ui/Button/Button';
import CenteredMenu from '@/widgets/Sidebar/centeredmenu/CenteredMenu';

const Header: React.FC = memo(() => {
  const dispatch = useDispatch<AppDispatch>();
  const { token, user } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken && location.pathname !== '/registration') {
      navigate('/login', { replace: true });
    } else if (storedToken) {
      dispatch(setToken(storedToken));
    }
  }, [dispatch, location.pathname, navigate]);

  // Скрыть хедер на странице логина
  if (location.pathname === '/login') {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[rgb(var(--color-border))]">
      <nav className="max-w-[1440px] mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-[rgb(var(--color-primary))] flex items-center justify-center">
              <span className="text-white text-sm font-semibold">VG</span>
            </div>
            <span className="text-[rgb(var(--color-text-base))] text-lg font-semibold tracking-tight">
              VibrantGoods
            </span>
          </Link>
        </div>

        <div className="flex-1 flex justify-center">{token && <CenteredMenu />}</div>

        <div className="flex items-center space-x-3">
          {token ? (
            <>
              <div className="text-[rgb(var(--color-text-secondary))] text-sm hidden md:block">
                Привет,{' '}
                <span className="font-medium text-[rgb(var(--color-text-base))]">
                  {user?.name || 'Пользователь'}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="text-[rgb(var(--color-error))] border-[rgb(var(--color-error))] hover:bg-[rgba(var(--color-error),0.1)]"
              >
                Выйти
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button variant="primary" size="sm">
                Войти
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
});

export default Header;
