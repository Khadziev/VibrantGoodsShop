import React from 'react';
import { DataAttributesApi } from '@/entities/product/model/model';
import { NavLink } from 'react-router-dom';

interface ProductItemProps {
  item: DataAttributesApi;
}

const ProductItemHome: React.FC<ProductItemProps> = ({ item }) => {
  const purchases = Math.floor(Math.random() * 20 + 1);

  return (
    <div className="w-full max-w-xs mx-auto">
      <NavLink
        to={`/data/${item._id}`}
        className="block bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
      >
        <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
          <img
            src={item.imageURL[0]}
            alt={item.name}
            className="w-full h-full object-contain p-4"
          />
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg text-gray-800 truncate">{item.name}</h3>
          <div className="mt-1">
            <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
              {item.category}
            </span>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-xl font-bold text-green-600">${item.price}</div>
            <div className="text-xs text-gray-500">
              {purchases} куплен{purchases > 1 ? 'о' : ''}
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default ProductItemHome;
