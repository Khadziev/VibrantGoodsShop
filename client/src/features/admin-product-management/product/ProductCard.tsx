/* eslint-disable no-unused-vars */
import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsPencil } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import { DataAttributesApi } from '@/entities/product/model/model';

export const ProductCard: React.FC<{
  product: DataAttributesApi;
  onDelete: (id: string) => void;
  onEdit: (product: DataAttributesApi) => void;
}> = ({ product, onDelete, onEdit }) => {
  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 border border-blue-500/30 rounded-2xl shadow-2xl hover:shadow-neon transition-all duration-300 p-4 w-full max-w-xs m-6 group animate-fade-in">
      <NavLink to={`/data/${product._id}`} className="block">
        <img
          src={product.imageURL[0]}
          alt={product.name}
          className="object-cover w-full h-44 md:h-60 rounded-xl border-4 border-blue-500/20 group-hover:scale-105 transition-transform duration-300 shadow-lg"
        />
      </NavLink>
      <div className="pt-4 pb-2 px-2">
        <h5 className="mb-2 text-xl font-extrabold text-white neon-text drop-shadow-neon">
          {product.name}
        </h5>
        <p className="mb-1 text-blue-300 text-sm">
          Категория: <span className="font-semibold text-purple-300">{product.category}</span>
        </p>
      </div>
      {/* Цена и рейтинг */}
      <div className="flex items-center justify-between px-2 pb-2">
        <span className="text-lg font-bold text-pink-400 drop-shadow-neon">
          {product.price ? `${product.price} ₽` : 'Цена по запросу'}
        </span>
        <span className="flex items-center gap-1">
          {/* Рейтинг (пример) */}
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="text-yellow-400">
            <path
              d="M12 17.3l6.18 3.7-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73L6.82 21z"
              fill="currentColor"
            />
          </svg>
          <span className="text-white font-semibold">{product.rating || 4.8}</span>
        </span>
      </div>
      {/* Кнопки действий */}
      <div className="flex justify-end gap-2 pt-2">
        <button
          onClick={() => onEdit(product)}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:scale-110 transition-transform border border-white/10"
          title="Редактировать"
        >
          <BsPencil className="text-lg" />
        </button>
        <button
          onClick={() => onDelete(product._id || '')}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg hover:scale-110 transition-transform border border-white/10"
          title="Удалить"
        >
          <AiOutlineDelete className="text-lg" />
        </button>
      </div>
    </div>
  );
};
