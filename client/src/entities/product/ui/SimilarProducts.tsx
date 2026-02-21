import React, { memo } from 'react';
import { useFetchSimilarProductsQuery } from '@/shared/api/userApi';
import ProductItem from './ProductItem';
import Text from '@/shared/ui/Text/Text';
import Loading from '@/shared/ui/Loading/Loading';

interface SimilarProductsProps {
  productId: string;
}

const SimilarProducts: React.FC<SimilarProductsProps> = memo(({ productId }) => {
  const {
    data: similarProducts,
    isLoading,
    isError,
    isFetching,
  } = useFetchSimilarProductsQuery(productId, {
    skip: !productId,
  });

  if (isLoading || isFetching) {
    return (
      <div className="py-4">
        <Loading />
      </div>
    );
  }

  if (isError || !similarProducts || similarProducts.length === 0) {
    return null;
  }

  const displayProducts = similarProducts.slice(0, 4);

  return (
    <>
      <div className="p-4 bg-gray-50">
        <div className="mb-4 font-semibold">
          <Text text="Возможно, вам понравится" size="lg" align="center" color="black" />
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {displayProducts.map((product) => (
            <div key={product._id} className="flex-shrink-0">
              <ProductItem item={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
});

export default SimilarProducts;
