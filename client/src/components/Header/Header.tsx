import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch, useAppSelector } from '../../redux/store';
import { logout, setToken } from '../../redux/authSlice';

const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useAppSelector((state) => state.auth.token);
  const navigate = useNavigate();

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
    if (storedToken) {
      dispatch(setToken(storedToken));
    }
  }, [dispatch]);

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
          {user ? (
            <button
              onClick={handleLogout}
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0"
            >
              Выйти
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0"
              >
                Войти
              </Link>
              <Link
                to="/registration"
                className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0 ml-2"
              >
                Зарегистрироваться
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
