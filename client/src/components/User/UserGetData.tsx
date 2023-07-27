import React from 'react';
import { useFetchAllProductsQuery } from '../../redux/api/userApi';
import { DataAttributesApi } from '../../redux/model/types';
import Loading from '../CommonComponents/Loading';
import ProductItem from './ProductItem';
import AddToCartComponent from '../Basket/AddToCartComponent';
import Slider from '../carousel/Slider';
import DiscountedProducts from '../Discounted/DiscountedProducts';
import { sliderContent } from '../../mock/Slider'
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';


const UserGetData: React.FC = () => {
  const { data, isLoading } = useFetchAllProductsQuery(null);

  if (isLoading || !data) {
    return <div><Loading/></div>;
  }

  return (
    <>
      <Navigation/>
      <div className="border border-black">
        <Slider items={sliderContent} />
      </div>
      <div className="border border-black mt-12 h-[390px]">
        <DiscountedProducts/>
      </div>

      <div className="flex flex-wrap justify-center mt-10">
        {data.slice(0, 6).map((item: DataAttributesApi) => (
          <div key={item._id} className="mx-20 mb-5">
            <ProductItem item={item}/>
            <AddToCartComponent product={item} />
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-5 w-full">
        <Link to="/data/all" className="px-6 py-2 text-white bg-blue-500 rounded">Посмотреть все</Link>
      </div>
    </>
  );
};

export default UserGetData;
