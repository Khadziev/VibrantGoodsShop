import React, { memo } from 'react';
import { useFetchAllProductsQuery } from '../../apiServices/api/userApi';
import SortingFields from '../DataControls/SortingFields';
import SearchBar from '../DataControls/SearchBar';
import { DataAttributesApi } from '../../apiServices/model/types';
import { useProductData } from '../User/useProductData';
import ProductItem from './ProductItem';
import BackButton from '../../UI/BackButton/BackButton';
import Loading2 from '../../UI/Loading/Loading2';
import Text from '../../UI/Text/Text';


function shuffleArray (array: Array<DataAttributesApi>) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const GetAllProducts: React.FC = memo(() => {
  const { data, isLoading, isError } = useFetchAllProductsQuery(null);

  const { selectedField, setSelectedField, searchQuery, setSearchQuery, sortedData } =
    useProductData(data || []);


  const shuffledData = [...sortedData];
  shuffleArray(shuffledData);

  if (isLoading || !data) {
    return <div><Loading2/></div>;
  }

  if (isError) {
    return <div>Ошибка при загрузке данных</div>;
  }

  return (
    <>
      <div><BackButton/></div>
      <div className='mt-10'>
        <SortingFields selectedField={selectedField} onFieldChange={setSelectedField} />
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>
      {shuffledData.length > 0 ? (
        <div className='flex justify-center mt-10'>
          <div className='grid grid-cols-4 gap-4'>
            {shuffledData.map((item: DataAttributesApi) => (
              <ProductItem key={item._id} item={item} />
            ))}
          </div>
        </div>
      ) : (
        <div><Text text='Такого товара нету' align='center' /></div>
      )}
    </>
  );
});

export default GetAllProducts;
