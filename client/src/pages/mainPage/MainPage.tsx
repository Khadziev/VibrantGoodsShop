import { useEffect } from 'react';
import User from '../userPage/User';
import { useAppSelector } from '../../app/providers/store';
import Admin from '../adminPage/Admin';
import { UserRole } from '../../apiServices/model/types';


const MainPage = () => {
  const userRole = useAppSelector((state) => state.auth.role) || localStorage.getItem('userRole');
  const userName = useAppSelector((state) => state.auth.user?.name) || localStorage.getItem('userName')


  useEffect(() => {
    if (userRole && userName) {
      // console.log('Роль пользователя:', userRole);
      // console.log('Имя пользователя:', userName);
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
