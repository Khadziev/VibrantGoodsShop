import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppDispatch, useAppSelector } from "@/app/providers/store";
import BackButton from "@/shared/ui/BackButton/BackButton";
import { loadUser, updateUser, deleteUser } from "@/shared/api/auth/authActions";

interface FormData {
  name: string;
  login: string;
  password: string;
}

const UserProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, error } = useAppSelector((state) => state.auth);
  const [formData, setFormData] = useState<FormData>({ name: "", login: "", password: "" });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      dispatch(loadUser(userId))
        .then(unwrapResult)
        .then((loadedUser) => {
          setFormData({ name: loadedUser.name || "", login: loadedUser.login || "", password: "" });
        })
        .catch((err) => {
          console.error("Ошибка загрузки пользователя:", err);
          toast.error(err.message || "Не удалось загрузить данные пользователя");
        })
        .finally(() => setLoading(false));
    } else {
      toast.error("Пользователь не авторизован");
      navigate("/login");
    }
  }, [dispatch, navigate, userId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateUser = () => {
    if (!userId) {
      toast.error("Пользователь не авторизован");
      return;
    }

    const { name, login } = formData;
    const updatePayload = { name, login };
    // if (password) updatePayload.password = password;

    dispatch(updateUser({ userId, dataToUpdate: updatePayload }))
      .then(unwrapResult)
      .then(() => {
        toast.success("Профиль успешно обновлен!");
        if (userId) {
          dispatch(loadUser(userId));
        }
      })
      .catch((err) => {
        console.error("Ошибка обновления пользователя:", err);
        toast.error(err.message || "Не удалось обновить профиль");
      });
  };

  const handleDeleteUser = () => {
    if (!userId) {
      toast.error("Пользователь не авторизован");
      return;
    }

    if (!window.confirm("Вы уверены, что хотите удалить свой профиль? Это действие необратимо.")) {
      return;
    }

    dispatch(deleteUser(userId))
      .then(unwrapResult)
      .then(() => {
        localStorage.setItem("userDeleteSuccess", "Ваш профиль успешно удален");
        toast.success("Профиль успешно удален");
        navigate("/login");
      })
      .catch((err) => {
        console.error("Ошибка удаления пользователя:", err);
        toast.error(err.message || "Не удалось удалить профиль");
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-100">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 animate-ping opacity-30 absolute"></div>
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-white animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-100">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl max-w-md w-full mx-4 border border-white/20">
          <div className="p-8 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Ошибка</h3>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-100">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl max-w-md w-full mx-4 border border-white/20">
          <div className="p-8 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Нет данных</h3>
            <p className="text-gray-600">Данные пользователя недоступны</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 py-12 via-blue-50 to-cyan-100">
      <BackButton />
      <div className="pt-14 max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden border border-white/20">
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/[0.05]"></div>
            <div className="relative z-10">
              <h1 className="text-3xl md:text-4xl font-bold">Личный кабинет</h1>
              <p className="text-blue-100 mt-2">Управление вашим профилем</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
            {/* Левая колонка - информация о пользователе */}
            <div className="lg:col-span-1">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white text-4xl font-bold mb-4 shadow-lg">
                      {user.name.charAt(0)}
                    </div>
                    <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-green-500 border-4 border-white"></div>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
                  <p className="text-gray-600 mt-1">@{user.login}</p>

                  <div className="mt-6 w-full space-y-4">
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-100">
                      <p className="text-xs text-blue-600 font-medium">ID Пользователя</p>
                      <p className="font-medium text-gray-800">{userId}</p>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
                      <p className="text-xs text-green-600 font-medium">Статус</p>
                      <p className="font-medium text-gray-800">Активный</p>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-4 rounded-xl border border-purple-100">
                      <p className="text-xs text-purple-600 font-medium">Дата регистрации</p>
                      <p className="font-medium text-gray-800">15.03.2023</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Правая колонка - настройки профиля */}
            <div className="lg:col-span-2">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Настройки профиля</h3>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Имя</label>
                      <div className="relative">
                        <input
                          className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white/80"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Введите ваше имя"
                        />
                        <div className="absolute left-4 top-3.5 text-gray-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Логин</label>
                      <div className="relative">
                        <input
                          className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white/80"
                          type="text"
                          name="login"
                          value={formData.login}
                          onChange={handleInputChange}
                          placeholder="Введите новый логин"
                        />
                        <div className="absolute left-4 top-3.5 text-gray-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Новый пароль</label>
                    <div className="relative">
                      <input
                        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white/80"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Оставьте пустым, чтобы не менять"
                      />
                      <div className="absolute left-4 top-3.5 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                      className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl"
                      onClick={handleUpdateUser}
                    >
                      Сохранить изменения
                    </button>

                    <button
                      className="flex-1 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-lg hover:shadow-xl"
                      onClick={handleDeleteUser}
                    >
                      Удалить профиль
                    </button>
                  </div>
                </div>
              </div>

              {/* Статистика и информация */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Дополнительная информация</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-xl border border-blue-100">
                    <p className="text-sm text-blue-600 font-medium">Последний вход</p>
                    <p className="font-bold text-gray-800 text-lg">Сегодня</p>
                    <p className="text-xs text-gray-600">14:30</p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-xl border border-green-100">
                    <p className="text-sm text-green-600 font-medium">Всего сессий</p>
                    <p className="font-bold text-gray-800 text-lg">42</p>
                    <p className="text-xs text-gray-600">Активных: 3</p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-5 rounded-xl border border-purple-100">
                    <p className="text-sm text-purple-600 font-medium">Роль</p>
                    <p className="font-bold text-gray-800 text-lg">Пользователь</p>
                    <p className="text-xs text-gray-600">Базовый доступ</p>
                  </div>

                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-xl border border-amber-100">
                    <p className="text-sm text-amber-600 font-medium">Статус</p>
                    <p className="font-bold text-gray-800 text-lg">Активный</p>
                    <p className="text-xs text-gray-600">Подтвержден</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;