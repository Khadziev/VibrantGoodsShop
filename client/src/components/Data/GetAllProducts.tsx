import React, { memo } from 'react';
import { useFetchAllProductsQuery } from '../../apiServices/api/userApi';
import SortingFields from '../DataControls/SortingFields';
import SearchBar from '../DataControls/SearchBar';
import { useProductData } from '../User/useProductData';
import ProductItem from './ProductItem';
import BackButton from '../../UI/BackButton/BackButton';
import Text from '../../UI/Text/Text';
import { DataAttributesApi } from '../../apiServices/model/ProductTypes';

function shuffleArray (array: Array<DataAttributesApi>) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const GetAllProducts: React.FC = memo(() => {
  const { data, isError } = useFetchAllProductsQuery(null);

  const { selectedField, setSelectedField, searchQuery, setSearchQuery, sortedData } =
    useProductData(data || []);

  const shuffledData = [...sortedData];
  shuffleArray(shuffledData);


  if (isError) return <div>Ошибка при загрузке данных</div>;

  return (
    <>
      <div><BackButton/></div>
      <div className="pt-32">

        <div >
          <div className='mb-4 '>
            <SortingFields selectedField={selectedField} onFieldChange={setSelectedField} />
          </div>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
        {shuffledData.length > 0 ? (
          <div className='flex justify-center mt-10 '>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
              {shuffledData.map((item: DataAttributesApi) => (
                <ProductItem key={item._id} item={item} />
              ))}
            </div>
          </div>
        ) : (
          <div><Text text='Такого товара нету' align='center' /></div>
        )}
      </div>
    </>
  );
});

export default GetAllProducts;
