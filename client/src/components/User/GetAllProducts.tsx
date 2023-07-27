import React, { useState } from 'react';
import { useFetchAllProductsQuery } from '../../redux/api/userApi';
import SortingFields from './SortingFields';
import SearchBar from './SearchBar';
import { DataAttributesApi } from '../../redux/model/types';
import { useProductData } from './useProductData';
import ProductItem from './ProductItem';

const GetAllProducts: React.FC = () => {
  const { data, isLoading, isError } = useFetchAllProductsQuery(null);

  const { selectedField, setSelectedField, searchQuery, setSearchQuery, sortedData } =
    useProductData(data || []);

  if (isLoading || !data) {
    return <div>Загрузка...</div>;
  }

  if (isError) {
    return <div>Ошибка при загрузке данных</div>;
  }

  return (
    <div>
      <div className="mt-10" > <SortingFields selectedField={selectedField} onFieldChange={setSelectedField} /></div>
      <div className="mt-10">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>
      {sortedData.length > 0 ? (
        sortedData.map((item: DataAttributesApi) => (
          <ProductItem key={item._id} item={item} />
        ))
      ) : (
        <div>Такого товара нету</div>
      )}
    </div>
  );
};

export default GetAllProducts;
