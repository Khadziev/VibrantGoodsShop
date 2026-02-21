import React from 'react';
import './BrandList.css';

import { useGetAllBrandQuery } from '@/shared/api/apiBrand';
import Text from '@/shared/ui/Text/Text';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BrandListProps {}

const BrandList: React.FC<BrandListProps> = () => {
  const { data: brands = [], isLoading, isError } = useGetAllBrandQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching brands</div>;

  return (
    <div className="brand-container">
      <Text text="Популярные бренды" />
      <div className="brand-items">
        {brands?.map((brand) => (
          <div key={brand.name} className="brand-item">
            <img src={brand.imgSrc} alt={brand.name} className="brand-image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandList;
