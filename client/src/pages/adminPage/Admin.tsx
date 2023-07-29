import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import AddProductForm from '../../components/Admin/AddProductForm';
import { useAppSelector, AppDispatch } from '../../app/providers/store';
import { getData } from '../../apiServices/api/adminApi';
import GetProductsAdmin from '../../components/Admin/GetProductsAdmin';

const Admin: React.FC = () => {
  const userName = useAppSelector((state) => state.auth.user?.name) || localStorage.getItem('userName');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProductListVisible, setIsProductListVisible] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleShowProductList = () => {
    setIsProductListVisible(!isProductListVisible);
  };

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="my-4 text-center">Добро пожаловать, администратор {userName}!</h1>
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
      </div>
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
