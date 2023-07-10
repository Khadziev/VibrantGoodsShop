import { useAppSelector } from '../../redux/store';
import UserGetData from './UserGetData';

const User = () => {
  const userName = useAppSelector((state) => state.auth.user?.name) || localStorage.getItem('userName');

  return (
    <div >
      <div><h1>Добро пожаловать, пользователь {userName}!</h1></div>
      <div >
        <UserGetData/>
      </div>
    </div>

  );
};

export default User;
