import React, { useState } from 'react';
import { useAppSelector } from '@/app/providers/store';
import AddProductForm from '@/features/admin-product-management/product/AddProductForm';
import GetProductsAdmin from '@/features/admin-product-management/product/GetProductsAdmin';
import { useGetDataQuery } from '@/shared/api/adminApi';
import BroadcastMessageSender from '@/features/broadcast-message/Message/BroadcastMessageSender';

const AdminHome: React.FC = () => {
  const userName =
    useAppSelector((state) => state.auth.user?.name) || localStorage.getItem('userName');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProductListVisible, setIsProductListVisible] = useState(false);
  const [isBroadcastOpen, setIsBroadcastOpen] = useState(false);

  const { refetch } = useGetDataQuery();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleShowProductList = () => {
    setIsProductListVisible(!isProductListVisible);
    refetch();
  };

  const handleOpenBroadcast = () => {
    setIsBroadcastOpen((prevState) => !prevState);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 rounded-3xl p-8 mb-16 text-white shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Панель управления</h1>
              <p className="text-indigo-100 mt-2">Добро пожаловать, {userName}!</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-3">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div className="text-right">
                <p className="font-medium">Администратор</p>
                <p className="text-sm text-indigo-200">Активен</p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div
            onClick={handleOpenModal}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-indigo-200"
          >
            <div className="flex items-center">
              <div className="bg-indigo-100 p-3 rounded-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-bold text-gray-800">Добавить данные</h3>
                <p className="text-gray-600">Добавить новые продукты</p>
              </div>
            </div>
          </div>

          <div
            onClick={handleShowProductList}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-cyan-200"
          >
            <div className="flex items-center">
              <div className="bg-cyan-100 p-3 rounded-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-cyan-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-bold text-gray-800">Список данных</h3>
                <p className="text-gray-600">Управление продуктами</p>
              </div>
            </div>
          </div>

          <div
            onClick={handleOpenBroadcast}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-purple-200"
          >
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-bold text-gray-800">Отправить сообщение</h3>
                <p className="text-gray-600">Рассылка пользователям</p>
              </div>
            </div>
          </div>
        </div>
        {isBroadcastOpen && (
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8 animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Рассылка сообщений</h2>
              <button
                onClick={() => setIsBroadcastOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <BroadcastMessageSender />
          </div>
        )}

        {isProductListVisible && (
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Управление продуктами</h2>
              <button
                onClick={() => setIsProductListVisible(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <GetProductsAdmin />
          </div>
        )}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800">Добавить новый продукт</h2>
                  <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <AddProductForm onCancel={handleCloseModal} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
