import { FC } from "react";

interface User {
  name: string;
  login: string;
}

interface UserProfileDataProps {
  user: User;
}

const UserProfileData: FC<UserProfileDataProps> = ({ user }) => (
  <div className="mb-6">
    <div className="text-center">
      <div className="border rounded-lg border-gray-300 p-3 mb-3 text-gray-800 font-semibold text-lg">
        Имя: {user.name}
      </div>
      <div className="border rounded-lg border-gray-300 p-3 text-gray-800 font-semibold text-lg">
        Логин: {user.login}
      </div>
    </div>
  </div>
);

export default UserProfileData;
