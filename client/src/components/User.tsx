import { useAppSelector } from '../redux/store';

const User = () => {
  const userName = useAppSelector((state) => state.auth.user?.name) || localStorage.getItem('userName');

  return <h1>Добро пожаловать, пользователь {userName}!</h1>;
};

export default User;
