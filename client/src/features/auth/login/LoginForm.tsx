import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/app/providers/store';
import { login } from '@/shared/api/auth/authActions';
import { setToken } from '@/shared/api/auth/authSlice';
import { Button, Input, Alert, Container, Card } from '@/shared/ui';
import { FiUser, FiLock } from 'react-icons/fi';

import styles from '../styles.module.css';
import { UserRole } from '@/features/auth/model/model';

const LoginForm = () => {
  const [loginValue, setLoginValue] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
          userId: '',
        })
      );

      const token = response.payload.token;

      dispatch(setToken(token));

      localStorage.setItem('userRole', UserRole.USER);
      localStorage.setItem('userName', response.payload.name);
      localStorage.setItem('userId', response.payload.userId);

      setError(null);

      navigate('/');
    } catch (error) {
      setError(`Неверный логин или пароль`);
    }
  };

  const handleRegisterClick = () => {
    navigate('/registration');
  };
  const spans = Array.from({ length: 300 }, (_, index) => (
    <span key={index} className={styles.square}></span>
  ));

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <Container maxWidth="sm">
        <Card variant="elevated" padding="lg" className="bg-white/95 backdrop-blur-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 tracking-wide">ВОЙТИ</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="error" onClose={() => setError(null)}>
                {error}
              </Alert>
            )}

            <div className="space-y-4">
              <Input
                type="text"
                id="login"
                label="Ваш логин"
                placeholder="Введите логин"
                value={loginValue}
                onChange={(e) => setLoginValue(e.target.value)}
                leftIcon={<FiUser />}
                fullWidth
                required
              />

              <Input
                type="password"
                id="password"
                label="Ваш пароль"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<FiLock />}
                fullWidth
                required
              />
            </div>

            <div className="pt-4 flex flex-col space-y-4">
              <Button type="submit" variant="primary" size="lg" fullWidth>
                Войти
              </Button>
              <p
                onClick={handleRegisterClick}
                className="text-center text-gray-600 hover:text-indigo-600 cursor-pointer font-medium transition-colors"
              >
                Зарегистрироваться
              </p>
            </div>
          </form>
        </Card>
      </Container>
    </section>
  );
};

export default LoginForm;
