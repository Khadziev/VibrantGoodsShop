import { FC } from 'react';

interface User {
  name: string;
  login: string;
}

interface UserProfileDataProps {
  user: User;
}

const UserProfileData: FC<UserProfileDataProps> = ({ user }) => (
  <div className="p-4 border-t border-b grid grid-cols-2 gap-4">
    <h3 className="font-semibold text-gray-600">имя</h3>
    <p className="text-gray-900">{user.name}</p>
    <h3 className="font-semibold text-gray-600">логин</h3>
    <p className="text-gray-900">{user.login}</p>
  </div>
);

export default UserProfileData;
