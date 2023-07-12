import React, { useEffect } from 'react';
import User from './Pages/userPage/User';
import { useAppSelector } from '../redux/store';
import Admin from './Pages/adminPage/Admin';
import { UserRole } from '../redux/types/types';


const MainPage = () => {
  const userRole = useAppSelector((state) => state.auth.role) || localStorage.getItem('userRole');
  const userName = useAppSelector((state) => state.auth.user?.name) || localStorage.getItem('userName')


  useEffect(() => {
    if (userRole && userName) {
      console.log('Роль пользователя:', userRole);
      console.log('Имя пользователя:', userName);
      localStorage.setItem('userRole', userRole);

    }
  }, [userRole, userName]);

  if (userRole === UserRole.ADMIN) {
    return <Admin />;
  } else if (userRole === UserRole.USER) {
    return <User />;
  }

  return <h1>Добро пожаловать!</h1>;
};

export default MainPage;
