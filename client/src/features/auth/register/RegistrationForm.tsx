import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/providers/store';
import { register } from '@/shared/api/auth/authActions';
import { Button, Input, Alert, Container, Card } from '@/shared/ui';
import { FiUser, FiLock, FiUserPlus } from 'react-icons/fi';

import styles from '../styles.module.css';
import { UserRole } from '@/features/auth/model/model';

const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [role] = useState(UserRole.USER);

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
  const spans = Array.from({ length: 300 }, (_, index) => (
    <span key={index} className={styles.square}></span>
  ));

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-teal-500 p-4">
      <Container maxWidth="sm">
        <Card variant="elevated" padding="lg" className="bg-white/95 backdrop-blur-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 tracking-wide">РЕГИСТРАЦИЯ</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <Alert variant="error">{error}</Alert>}

            <div className="space-y-4">
              <Input
                type="text"
                id="name"
                label="Ваше имя"
                placeholder="Введите имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                leftIcon={<FiUserPlus />}
                fullWidth
                required
              />

              <Input
                type="text"
                id="login"
                label="Ваш логин"
                placeholder="Введите логин"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
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
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={loading}
                leftIcon={<FiUserPlus />}
              >
                Регистрация
              </Button>
            </div>
          </form>
        </Card>
      </Container>
    </section>
  );
};

export default RegistrationForm;
