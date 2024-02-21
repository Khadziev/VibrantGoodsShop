import React, { useState } from "react";
import { useFetchDiscountedProductsQuery } from "@/apiServices/api/userApi";
import { NavLink } from "react-router-dom";
import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";
import Text from "@/UI/Text/Text";
import Loading2 from "@/UI/Loading/Loading2";
import SectionTitle from "@/UI/SectionTitle/SectionTitle";
import discount from "@/images/discount-icon/discount.webp";
import Frame from "@/UI/Frame/Frame";


const DiscountedProducts: React.FC = () => {
  const { data: products, isLoading, error } = useFetchDiscountedProductsQuery(null);
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading || !products) {
    if (error) console.error(error);
    return <Loading2 />;
  }

  const itemsPerPage = 5;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prevPage) => (prevPage % totalPages) + 1);
  };

  const previousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <Frame >
      <SectionTitle title="действует скидка" />
      <div className="flex items-center justify-center">
        <button onClick={previousPage} className="mx-2">
          <AiOutlineCaretLeft size={40} />
        </button>
        <div className="overflow-hidden flex space-x-2 items-center justify-center flex-grow">
          {currentProducts.map((product) => (
            <div
              key={product._id}
              className="flex-none border border-white rounded px-2 bg-gray-800 text-white text-center w-60 h-80"
            >
              <img src={discount} className="text-red-500 text-xl w-10 h-10" alt="Discount" />

              <NavLink to={`/data/${product._id}`}>
                <img src={product.imageURL[0]} alt={product.name} className="w-36 h-36 mx-auto" />
              </NavLink>
              <Text text={product.name} align="center" />
              <Text text={`${product.price} $`} align="center" />
              <Text
                text={`новая цена : ${product.price * (1 - product.discount / 100)} $`}
                color="green"
                align="center"
              />
              <Text text={`Скидка: ${product.discount}%`} align="center" isBlinking color="green" />
            </div>
          ))}
        </div>
        <button onClick={nextPage} className="mx-2">
          <AiOutlineCaretRight size={40} />
        </button>
      </div>
    </Frame>
  );
};

export default DiscountedProducts;
