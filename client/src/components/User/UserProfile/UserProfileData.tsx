import { FC } from "react";

interface User {
  name: string;
  login: string;
}

interface UserProfileDataProps {
  user: User;
}

const UserProfileData: FC<UserProfileDataProps> = ({ user }) => (
  <div className="mb-4">
    <div className="text-gray-600 font-semibold mb-2">Имя</div>
    <div className="text-gray-800">{user.name}</div>
    <div className="text-gray-600 font-semibold mt-4 mb-2">Логин</div>
    <div className="text-gray-800">{user.login}</div>
  </div>
);

export default UserProfileData;
