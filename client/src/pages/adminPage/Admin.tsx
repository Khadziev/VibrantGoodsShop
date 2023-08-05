import React, { useState } from 'react';
import { useAppSelector } from '../../app/providers/store';
import AddProductForm from '../../components/Admin/AddProductForm';
import GetProductsAdmin from '../../components/Admin/GetProductsAdmin';
import { useGetDataQuery } from '../../apiServices/api/adminApi';
import BroadcastMessageSender from '../../components/Admin/Message/BroadcastMessageSender';

const Admin: React.FC = () => {
  const userName = useAppSelector((state) => state.auth.user?.name) || localStorage.getItem('userName');
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
    setIsBroadcastOpen(prevState => !prevState); // Toggle the state
  };

  return (
    <div className="flex flex-col items-center" style={{ maxHeight: 'calc(100vh - размерФутера)', overflowY: 'auto' }}>
      <h1 className="my-4 text-center">Вы вошли как администратор {userName}!</h1>
      <div className="flex space-x-4">
        <button
          onClick={handleOpenModal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Добавить данные
        </button>
        <button
          onClick={handleShowProductList}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Список данных
        </button>
        <button
          onClick={handleOpenBroadcast}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Отправить сообщение
        </button>
      </div>
      {isBroadcastOpen && (
        <div className="mt-4 flex flex-col">
          <BroadcastMessageSender />
        </div>
      )}
      {isProductListVisible && (
        <div className="mt-4 mb-4 w-full">
          <GetProductsAdmin />
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6">
            <AddProductForm onCancel={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
