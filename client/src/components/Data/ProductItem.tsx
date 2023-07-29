import React, { memo } from 'react';
import { DataAttributesApi } from '../../apiServices/model/types';
import { NavLink } from 'react-router-dom';
import { MdOutlineDiscount } from 'react-icons/md';

interface ProductItemProps {
  item: DataAttributesApi;
}


const ProductItem: React.FC<ProductItemProps> = memo(({ item }) => {
  return (
    <div className="fondo2 cursor-pointer w-56 h-60 rounded-lg relative border" >
      <figure className="relative mb-2 w-full h-4/5">
        <NavLink to={`/data/${item._id}`}>
          <img src={item.imageURL[0]} alt={`imageURL ${item.title}`} className="w-full h-full object-cover rounded-lg transform transition duration-500 hover:scale-110" />
        </NavLink>
        {item.discount > 0 && (
          <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'white', borderRadius: '5px', padding: '2px' }}>
            <MdOutlineDiscount style={{ fontSize: '24px', color: 'red' }} />
            <span>Действует скидка</span>
          </div>
        )}
      </figure>
      <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5 flex justify-center items-center">
        {item.category}
      </span>
      <p className="flex justify-between px-1">
        <span className="text-sm font-light">{item.name}</span>
        <span className="text-lg font-medium">${item.price}</span>
      </p>
    </div>

  );
});

export default ProductItem;
