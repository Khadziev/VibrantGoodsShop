import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import UserProfileForm from "./UserProfileForm";
import UserProfileData from "./UserProfileData";
import BackButton from "@/UI/BackButton/BackButton";
import { loadUser, updateUser, deleteUser } from "@/apiServices/auth/authActions";
import { AppDispatch, useAppSelector } from "@/app/providers/store";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, error } = useAppSelector((state) => state.auth);
  const [newName, setNewName] = useState("");
  const [newLogin, setNewLogin] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
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
    const userId = localStorage.getItem("userId");
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
    const userId = localStorage.getItem("userId");
    if (userId) {
      console.log("Удаление пользователя с идентификатором: ", userId);
      dispatch(deleteUser(userId))
        .then(unwrapResult)
        .then(() => {
          localStorage.setItem("userDeleteSuccess", "Ваш профиль успешно удален");
          navigate("/login");
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
      <BackButton />
      <div className="min-h-screen pt-14">
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
          <h5 className="text-3xl font-semibold mb-4 text-gray-800 text-center">Ваш профиль</h5>

          <UserProfileData user={user} />

          <div className="mt-8 bg-transparent rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Настройки профиля</h3>
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
      </div>
    </>
  );

};

export default UserProfile;
