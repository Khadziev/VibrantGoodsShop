import React from 'react';
import { DataAttributesApi } from '../../redux/types/types';

interface ProductItemProps {
  item: DataAttributesApi;
  onOpenModal: (item: DataAttributesApi) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ item, onOpenModal }) => {
  return (
    <div className="fondo2 cursor-pointer w-56 h-60 rounded-lg relative border" onClick={() => onOpenModal(item)}>
      <figure className="relative mb-2 w-full h-4/5">
        <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5 flex justify-center items-center">
          {item.category}
        </span>
        <img src={item.imageURL} alt={`imageURL ${item.title}`} className="w-full h-full object-cover rounded-lg transform transition duration-500 hover:scale-110" />
      </figure>
      <p className="flex justify-between px-1">
        <span className="text-sm font-light">{item.name}</span>
        <span className="text-lg font-medium">${item.price}</span>
      </p>
    </div>
  );
};

export default ProductItem;
