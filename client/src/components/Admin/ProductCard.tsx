import React, { useState } from "react";
import { DataAttributes } from "../../redux/types/types";
import { AiOutlineDelete } from 'react-icons/ai';
import { BsPencil } from 'react-icons/bs';

export const ProductCard: React.FC<{ product: DataAttributes, onDelete: (id: string) => void, onEdit: (product: DataAttributes) => void }> = ({ product, onDelete, onEdit }) => {
  const options = { timeZone: 'Europe/Moscow', hour12: false };
  //const createdAt = new Intl.DateTimeFormat('ru-RU', options).format(new Date(product.createdAt));
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  }

  return (
    <a href="#" className="relative bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <div className="relative">
        <img src={product.imageURL} alt={product.name} className="object-cover w-full h-40 md:h-60 rounded-t-lg" />
      </div>
      <div className="p-4">
        <h5 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{product.name}</h5>
        <p className="mb-3 text-gray-700 dark:text-gray-400">Цена: {product.price}</p>
        {product.description && (
          <div>
            {showFullDescription ? (
              <>
                <p className="mb-3 text-gray-700 dark:text-gray-400">{product.description}</p>
                <button
                  onClick={toggleDescription}
                  className="text-blue-500 font-semibold transition-colors duration-300 ease-in-out"
                >
                  Свернуть
                </button>
              </>
            ) : (
              <>
                <p className="mb-3 text-gray-700 dark:text-gray-400">{product.description.substring(0, 60)}...</p>
                <button
                  onClick={toggleDescription}
                  className="text-blue-500 font-semibold transition-colors duration-300 ease-in-out"
                >
                  Подробнее
                </button>
              </>
            )}
          </div>
        )}
        {/* <p className="mb-1 text-gray-700 dark:text-gray-400">Заголовок: {product.title}</p> */}
        <p className="mb-1 text-gray-700 dark:text-gray-400">Категория: {product.category}</p>
      </div>
      {/* <div className="absolute bottom-2 left-2 text-gray-700 dark:text-gray-400">{createdAt}</div> */}
      <div className="flex justify-end p-4">
        <button
          onClick={() => onDelete(product._id || '')}
          className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300 ease-in-out mr-2"
        >
          <span className="flex items-center">
            <AiOutlineDelete className="mr-1 text-base" />
          </span>
        </button>
        <button
          onClick={() => onEdit(product)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300 ease-in-out"
        >
          <span className="flex items-center">
            <BsPencil className="mr-1 text-base" />
          </span>
        </button>
      </div>
    </a>
  );
};
