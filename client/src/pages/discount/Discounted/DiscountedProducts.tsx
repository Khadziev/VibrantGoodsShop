import React, { useState } from 'react';
import { useFetchDiscountedProductsQuery } from '@/shared/api/userApi';
import { NavLink } from 'react-router-dom';
import { AiOutlineCaretLeft, AiOutlineCaretRight } from 'react-icons/ai';
import Text from '@/shared/ui/Text/Text';
import Loading from '@/shared/ui/Loading/Loading';

import discountIcon from '@/shared/assets/images/discount-icon/discount.webp';

const DiscountedProducts: React.FC = () => {
  const { data: products, isLoading, error } = useFetchDiscountedProductsQuery(null);
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading || !products) {
    if (error) console.error(error);
    return <Loading />;
  }

  if (products.length === 0) {
    return (
      <div>
        <Text text="Действует скидка" />
        <div className="flex justify-center items-center h-40">
          <Text text="На данный момент скидок нет" color="white" />
        </div>
      </div>
    );
  }

  const itemsPerPage = 5;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev % totalPages) + 1);
  };

  const previousPage = () => {
    setCurrentPage((prev) => ((prev - 2 + totalPages) % totalPages) + 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <Text text="Действует скидка" />
      <div className="relative flex items-center justify-center py-6">
        <button
          onClick={previousPage}
          className="absolute left-4 z-10 bg-white bg-opacity-30 hover:bg-opacity-50 text-white rounded-full p-3 shadow-lg transition-all backdrop-blur-sm"
          aria-label="Предыдущая страница"
        >
          <AiOutlineCaretLeft size={28} />
        </button>

        <div className="overflow-hidden w-full max-w-6xl px-16">
          <div className="flex space-x-6 justify-center transition-transform duration-300 ease-in-out">
            {currentProducts.map((product) => (
              <div
                key={product._id}
                className="flex-none w-56 bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700 rounded-xl shadow-lg p-4 flex flex-col items-center hover:shadow-xl transition-shadow relative"
              >
                <div className="absolute -top-3 -right-3 z-10">
                  <img
                    src={discountIcon}
                    alt="Скидка"
                    className="w-10 h-10 object-contain drop-shadow-lg"
                  />
                </div>

                <NavLink to={`/data/${product._id}`} className="w-full">
                  <img
                    src={product.imageURL[0]}
                    alt={product.name}
                    className="w-40 h-40 object-cover rounded-lg mx-auto border border-gray-600 transition-transform hover:scale-105"
                  />
                </NavLink>

                <div className="mt-4 text-center w-full">
                  <Text
                    text={product.name}
                    align="center"
                    color="white"
                    className="font-semibold text-sm truncate max-w-full"
                  />
                  <div className="mt-2 space-y-1">
                    <Text
                      text={`${product.price} $`}
                      align="center"
                      color="gray"
                      className="line-through text-xs"
                    />
                    <Text
                      text={`${(product.price * (1 - product.discount / 100)).toFixed(2)} $`}
                      align="center"
                      color="green"
                      className="font-bold text-sm"
                    />
                  </div>
                  <Text
                    text={`Скидка: ${product.discount}%`}
                    align="center"
                    color="green"
                    isBlinking
                    className="mt-1 font-bold text-xs"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={nextPage}
          className="absolute right-4 z-10 bg-white bg-opacity-30 hover:bg-opacity-50 text-white rounded-full p-3 shadow-lg transition-all backdrop-blur-sm"
          aria-label="Следующая страница"
        >
          <AiOutlineCaretRight size={28} />
        </button>
      </div>

      <div className="flex justify-center space-x-2 mt-4">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`
              w-3 h-3 rounded-full transition-all
              ${currentPage === i + 1 ? 'bg-blue-600 scale-125' : 'bg-gray-500 hover:bg-gray-400'}
            `}
            aria-label={`Перейти к странице ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default DiscountedProducts;
