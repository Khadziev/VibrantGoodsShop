import { FC, ChangeEvent } from 'react';

interface UserProfileFormProps {
  newName: string;
  newLogin: string;
  newPassword: string;
  setNewName: (name: string) => void;
  setNewLogin: (login: string) => void;
  setNewPassword: (password: string) => void;
  handleUpdateUser: () => void;
  handleDeleteUser: () => void;
}



const UserProfileForm: FC<UserProfileFormProps> = ({
  newName,
  newLogin,
  newPassword,
  setNewName,
  setNewLogin,
  setNewPassword,
  handleUpdateUser,
  handleDeleteUser,
}) => {
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewLogin(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  return (
    <div className="p-4">
      <div className="flex flex-wrap mb-6">
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3" value={newName} onChange={handleNameChange} placeholder="изменить имя" />
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3" value={newLogin} onChange={handleLoginChange} placeholder="новый логин" />
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={newPassword} onChange={handlePasswordChange} placeholder="новый пароль" />
      </div>
      <div className="flex justify-between">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleUpdateUser}>изменить</button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleDeleteUser}>удалить профиль</button>
      </div>
    </div>
  );
};

export default UserProfileForm;
