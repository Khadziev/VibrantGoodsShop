import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import { login } from '../../redux/auth/authActions';
import { setToken } from '../../redux/auth/authSlice';
import { UserRole } from '../../redux/types/types';

const LoginForm = () => {
  const [loginValue, setLoginValue] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loginValue.length < 1 || loginValue.trim() !== loginValue) {
      setError('Неверный логин или пароль');
      return;
    }

    try {
      const response = await dispatch(
        login({
          login: loginValue,
          password,
          role: UserRole.USER,
        })
      );

      const token = response.payload.token;

      dispatch(setToken(token));

      localStorage.setItem('userRole', UserRole.USER);
      localStorage.setItem('userName', response.payload.name);

      setError(null);

      navigate('/');
    } catch (error) {
      setError(`неправильный логин: ${(error as Error).message.toString()}`);
    }
  };

  const handleRegisterClick = () => {
    navigate('/registration');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="max-w-sm bg-white border border-gray-300 rounded p-6 shadow-xl transform hover:scale-105 transition-transform duration-300"
      >
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <input
          type="text"
          placeholder="Login"
          value={loginValue}
          onChange={(e) => setLoginValue(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Войти
        </button>
        <p
          className="mt-2 text-blue-500 hover:underline cursor-pointer"
          onClick={handleRegisterClick}
        >
          Зарегистрироваться
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
