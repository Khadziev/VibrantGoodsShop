/* eslint-disable no-unused-vars */
import { FC } from 'react';

interface FormData {
  name: string;
  login: string;
  password: string;
}

interface UserProfileFormProps {
  formData: FormData;
  onInputChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onDelete: () => void;
}

const UserProfileForm: FC<UserProfileFormProps> = ({
  formData,
  onInputChange,
  onSave,
  onDelete,
}) => {
  return (
    <div className="p-2">
      <div className="space-y-4">
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          type="text"
          name="name"
          value={formData.name}
          onChange={onInputChange}
          placeholder="Изменить имя"
        />
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          type="text"
          name="login"
          value={formData.login}
          onChange={onInputChange}
          placeholder="Новый логин"
        />
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          type="password"
          name="password"
          value={formData.password}
          onChange={onInputChange}
          placeholder="Новый пароль (оставьте пустым, чтобы не менять)"
        />
      </div>
      <div className="flex justify-between mt-6 space-x-4">
        <button
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={onSave}
        >
          Сохранить
        </button>
        <button
          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-red-500"
          onClick={onDelete}
        >
          Удалить Профиль
        </button>
      </div>
    </div>
  );
};

export default UserProfileForm;
