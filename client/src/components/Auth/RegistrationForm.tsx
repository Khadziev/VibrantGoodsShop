import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { register } from '../../redux/auth/authActions';
import { UserRole } from '../../redux/types/types';


const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(UserRole.USER);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector((state) => state.auth.loading);
  const error = useAppSelector((state) => state.auth.error);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(register({ name, login, password, role: role }));
      navigate('/login', { replace: true });
    } catch (error) {
      console.log('Ошибка при регистрации:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="max-w-sm bg-white border border-gray-300 rounded p-6 shadow-lg">
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <input
          type="checkbox"
          checked={role === UserRole.ADMIN}
          onChange={(e) => setRole(e.target.checked ? UserRole.ADMIN : UserRole.USER)}
          className="mb-4"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Регистрация
        </button>
        <button className="mt-2 text-blue-500 hover:underline focus:outline-none">
          Уже есть аккаунт? Войти
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
