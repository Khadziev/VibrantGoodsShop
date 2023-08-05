import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import UserProfileForm from './UserProfileForm';
import UserProfileData from './UserProfileData';
import BackButton from '../../../UI/BackButton/BackButton';
import { loadUser, updateUser, deleteUser } from '../../../apiServices/auth/authActions';
import { AppDispatch, useAppSelector } from '../../../app/providers/store';
import { useNavigate } from 'react-router-dom';


const UserProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, error } = useAppSelector((state) => state.auth);
  const [newName, setNewName] = useState("");
  const [newLogin, setNewLogin] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      console.log("User ID: ", userId);
      dispatch(loadUser(userId))
        .then(unwrapResult)
        .catch((rejectedValueOrSerializedError) => console.log(rejectedValueOrSerializedError));
    } else {
      console.log("Пользователь или идентификатор пользователя недоступен");
    }
  }, [dispatch]);


  const handleUpdateUser = () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      console.log("Обновление пользователя с идентификатором: ", userId);
      const dataToUpdate = { name: newName, login: newLogin };
      dispatch(updateUser({ userId, dataToUpdate }))
        .then(unwrapResult)
        .catch((rejectedValueOrSerializedError) => console.log(rejectedValueOrSerializedError));
    } else {
      console.log("Пользователь или идентификатор пользователя недоступен");
    }
  };

  const handleDeleteUser = () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      console.log("Удаление пользователя с идентификатором: ", userId);
      dispatch(deleteUser(userId))
        .then(unwrapResult)
        .then(() => {
          localStorage.setItem('userDeleteSuccess', 'Ваш профиль успешно удален');
          navigate('/login');
        })
        .catch((rejectedValueOrSerializedError) => console.log(rejectedValueOrSerializedError));
    } else {
      console.log("Пользователь или идентификатор пользователя недоступен");
    }
  };



  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Нет пользовательских данных</div>;
  }

  return (
    <>
      <BackButton/>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
        <div className="bg-white rounded-lg shadow-lg w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
          <div className="p-4 border-b">
            <h2 className="text-2xl font-semibold">Ваш профиль</h2>
            <p className="text-sm text-gray-500">Управляйте своим профилем</p>
          </div>
          <UserProfileData user={user} />
          <UserProfileForm
            newName={newName}
            newLogin={newLogin}
            newPassword={newPassword}
            setNewName={setNewName}
            setNewLogin={setNewLogin}
            setNewPassword={setNewPassword}
            handleUpdateUser={handleUpdateUser}
            handleDeleteUser={handleDeleteUser}
          />
        </div>
      </div>
    </>
  );
};

export default UserProfile;
