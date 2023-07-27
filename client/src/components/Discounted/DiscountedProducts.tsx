import React, { useRef, useState } from 'react';
import { MdOutlineDiscount } from 'react-icons/md'; // Импортируем иконку
import { useFetchDiscountedProductsQuery } from '../../redux/api/userApi';
import { BiSolidLeftArrowSquare, BiSolidRightArrowSquare } from 'react-icons/bi'

const DiscountedProducts: React.FC = () => {
  const { data: products, isLoading, error } = useFetchDiscountedProductsQuery(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading || !products) {
    console.error(error);
    return <p>Loading...</p>;
  }

  const itemsPerPage = 5;
  const totalPages = Math.ceil(products.length / itemsPerPage);


  const nextPage = () => {
    setCurrentPage(prevPage => prevPage % totalPages + 1);
  }

  const previousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <>
      <div className="text-center"><h2 className="animate-blinking text-4xl font-cinzel">действует скидка</h2></div>
      <div style={{ backgroundColor: 'white', color: 'black', display: 'flex', justifyContent: 'center' }}>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button onClick={previousPage}><BiSolidLeftArrowSquare/></button>
          <div
            ref={scrollContainerRef}
            style={{
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'row',
              gap: '10px',
              flex: '1 1 0%',
              scrollBehavior: 'smooth',
            }}
          >
            {currentProducts.map(product => (
              <div
                key={product._id}
                style={{
                  flex: '0 0 auto',
                  border: '1px solid white',
                  borderRadius: '5px',
                  padding: '10px',
                  backgroundColor: '#333',
                  color: 'white',
                  textAlign: 'center',
                  width: '220px',
                  height: '320px'
                }}
              >
                <MdOutlineDiscount style={{ fontSize: '24px', color: 'red' }} />
                <img src={product.imageURL[0]} alt={product.name} style={{ width: '150px', height: '150px', margin: 'auto' }} />
                <h3>{product.name}</h3>
                <p style={{ textDecoration: 'line-through' }}>{product.price}</p>
                <p style={{ color: 'green' }}>новая цена : {product.price * (1 - product.discount / 100)}</p>
                <p>(Скидка: {product.discount}%)</p>
              </div>
            ))}

          </div>
          <button onClick={nextPage}><BiSolidRightArrowSquare/></button>
        </div>
      </div>
    </>
  );
};

export default DiscountedProducts;
