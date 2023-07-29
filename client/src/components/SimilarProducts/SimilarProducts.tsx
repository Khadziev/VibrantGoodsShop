import React, { memo } from 'react';
import ProductItem from '../Data/ProductItem';
import { useFetchSimilarProductsQuery } from '../../apiServices/api/userApi';
import Text from '../../UI/Text/Text';
import HorizontalLine from '../../UI/HorizontalLine/HorizontalLine';


const SimilarProducts: React.FC<{ productId: string }> = memo(({ productId }) => {
  const { data: similarProducts, isLoading, isError } = useFetchSimilarProductsQuery(productId);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !similarProducts) return <div>Error occurred</div>;

  const displayProducts = similarProducts.slice(0, 4);

  return (
    <>
      <HorizontalLine/>
      <div className="p-4">
        <Text text='возможно вам понравится' size='lg' align='center'/>
        <div className="flex flex-wrap justify-center items-center">
          {displayProducts.map((product) => (
            <div className="m-4">
              <ProductItem key={product._id} item={product} />
            </div>
          ))}
        </div>
      </div>
      <HorizontalLine/>
    </>
  );
});

export default SimilarProducts;
