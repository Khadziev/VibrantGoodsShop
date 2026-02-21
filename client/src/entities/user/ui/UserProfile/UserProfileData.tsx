import { FC } from 'react';

interface User {
  name: string;
  login: string;
}

interface UserProfileDataProps {
  user: User;
}

const UserProfileData: FC<UserProfileDataProps> = ({ user }) => (
  <div className="mb-6 space-y-3">
    <div className="text-center">
      <div className="border border-gray-300 rounded-lg p-3 mb-2 bg-white shadow-sm">
        <p className="text-gray-700 font-medium">Имя:</p>
        <p className="text-gray-900 font-semibold text-lg">{user.name}</p>
      </div>
      <div className="border border-gray-300 rounded-lg p-3 bg-white shadow-sm">
        <p className="text-gray-700 font-medium">Логин:</p>
        <p className="text-gray-900 font-semibold text-lg">{user.login}</p>
      </div>
    </div>
  </div>
);

export default UserProfileData;
