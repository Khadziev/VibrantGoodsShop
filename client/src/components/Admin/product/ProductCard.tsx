import React from "react";
import { AiOutlineDelete } from 'react-icons/ai';
import { BsPencil } from 'react-icons/bs';
import { NavLink } from "react-router-dom";
import { DataAttributesApi } from "@/components/Admin/product/model/model";


export const ProductCard: React.FC<{ product: DataAttributesApi, onDelete: (id: string) => void, onEdit: (product: DataAttributesApi) => void }> = ({ product, onDelete, onEdit }) => {
  return (
    <>
      <div className="relative bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 p-4 w-80 h-70 m-10">
        <div className="relative">
          <NavLink to={`/data/${product._id}`}>
            <img src={product.imageURL[0]} alt={product.name} className="object-cover w-full h-40 md:h-60 rounded-t-lg" />
          </NavLink>
        </div>
        <div className="p-4">
          <h5 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{product.name}</h5>
          <p className="mb-1 text-gray-700 dark:text-gray-400">Категория: {product.category}</p>
        </div>
        <div className="flex justify-end p-4 space-x-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500 text-white">
            <button onClick={() => onDelete(product._id || '')}>
              <AiOutlineDelete className="text-base" />
            </button>
          </div>
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white">
            <button onClick={() => onEdit(product)}>
              <BsPencil className="text-base" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
