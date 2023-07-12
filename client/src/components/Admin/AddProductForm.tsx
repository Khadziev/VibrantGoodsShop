import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { addData, getData } from '../../redux/api/adminApi';
import { DataAttributes } from '../../redux/types/types';

interface AddProductFormProps {
  onSubmit: (formData: DataAttributes) => void;
  onCancel: () => void;
}


const AddProductForm: React.FC<AddProductFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<DataAttributes>({
    name: '',
    price: 0,
    description: '',
    title: '',
    category: '',
    imageURL: '',
  });

  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(addData({ data: formData })).unwrap();
      dispatch(getData());
      setFormData({
        name: '',
        price: 0,
        description: '',
        title: '',
        category: '',
        imageURL: '',
      });
      const formValues = { ...formData };
      onSubmit(formValues);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Ошибка при добавлении товара', error);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="w-64 mx-auto">
      <h2 className="text-lg font-bold mb-4">Добавить товар</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Название
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Цена
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
    Описание
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

      </div>

      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Заголовок
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Категория
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        >
          <option value="">Выберите категорию</option>
          <option value="Ноутбуки">Ноутбуки</option>
          <option value="Камеры">Камеры</option>
          <option value="Наушники">Наушники</option>
          <option value="Планшеты">Планшеты</option>
          <option value="Сотовые телефоны">Сотовые телефоны</option>
          <option value="Аксессуары">Аксессуары</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="imageURL" className="block text-sm font-medium text-gray-700">
          URL изображения
        </label>
        <input
          type="text"
          id="imageURL"
          name="imageURL"
          value={formData.imageURL}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Добавить
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Отмена
        </button>
      </div>
    </form>
  );
};

export default AddProductForm;
