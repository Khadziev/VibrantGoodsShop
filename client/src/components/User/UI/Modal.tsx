import React, { useState } from 'react';

export const Modal: React.FC<{ product: any; onClose: () => void }> = ({ product, onClose }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-black bg-opacity-50" onClick={onClose}>
      <div className="bg-white p-4 rounded-lg max-w-md mx-auto h-[500px] overflow-y-auto mt-20">
        <span
          className="absolute top-0 right-0 m-4 text-gray-500 cursor-pointer hover:text-gray-700 transition-colors duration-200"
          onClick={onClose}
        >
          &times;
        </span>
        {product && (
          <div>
            <div>
              <h2 className='font-medium text-xl '>{product.name}</h2>
              <span className='text-xs'>{product.category}</span>
            </div>
            <p className='flex justify-end px-6'>
              <p className='font-medium text-2xl text-red-800 ml-2'>Price: ${product.price}</p>
            </p>
            <div className="flex flex-col max-h-64 overflow-y-auto mb-4 rounded-lg scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              <figure className='flex justify-center items-center px-6 relative'>
                <img src={product.imageURL} alt={product.name} className='h-40 max-w-xs rounded-lg'/>
              </figure>
            </div>
            <p className='font-light text-sm'>{product.description}</p>

            {/* Дополнительные детали продукта */}
            {product.additionalDetails && (
              <div className="mt-4">
                <h2 className="text-lg font-semibold">Additional Details:</h2>
                <ul className="list-disc list-inside">
                  {product.additionalDetails.map((detail: string) => (
                    <li key={detail} className="text-gray-800">
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
