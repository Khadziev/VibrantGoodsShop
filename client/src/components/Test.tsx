// Test.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector, AppDispatch } from '../redux/store';
import { UserRole, addData, setRole } from '../redux/authSlice';

const Test = () => {
  const userRole = useAppSelector((state) => state.auth.role) || localStorage.getItem('userRole');
  const userName = useAppSelector((state) => state.auth.user?.name) || localStorage.getItem('userName');
  const [title, setTitle] = useState('');
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (userRole && userName) {
      console.log('Роль пользователя:', userRole);
      console.log('Имя пользователя:', userName);
      localStorage.setItem('userRole', userRole); 
    }
  }, [userRole, userName]);

  useEffect(() => {
    if (userRole) {
      dispatch(setRole(userRole as UserRole)); 
    }
  }, [dispatch, userRole]);

  const handleAddData = () => {
    dispatch(addData({ title }));
    setTitle('');
  };

  if (userRole === UserRole.ADMIN) {
    return (
      <div>
        <h1>Добро пожаловать, администратор {userName}!</h1>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Введите заголовок"
        />
        <button onClick={handleAddData}>Добавить заголовок</button>
      </div>
    );
  } else if (userRole === UserRole.USER) {
    return <h1>Добро пожаловать, пользователь {userName}!</h1>;
  }

  return <h1>Добро пожаловать!</h1>;
};

export default Test;
