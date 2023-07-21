
import UserGetData from '../../User/UserGetData';

const User = () => {
//  const userName = useAppSelector((state) => state.auth.user?.name) || localStorage.getItem('userName');

  return (
    <div className="mt-10">
      {/* <div><h1>Добро пожаловать, пользователь {userName}!</h1></div> */}
      <UserGetData/>
    </div>
  );
};

export default User;
