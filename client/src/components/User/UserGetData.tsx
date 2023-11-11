import React from "react";
import { useFetchAllProductsQuery } from "../../apiServices/api/userApi";
import ProductItem from "../Data/ProductItem";
import DiscountedProducts from "../Discounted/DiscountedProducts";
import { sliderContent } from "../../mock/Slider";
import { Link } from "react-router-dom";
import Slider from "../../widgets/carousel/Slider";
import Loading from "../../UI/Loading/Loading";
import { DataAttributesApi } from "../../apiServices/model/ProductTypes";
import { brandContent } from "../../mock/brand";

import BrandList from "../brands/BrandList";
import Category from "../category/Category";
import Banner from "../banners";

const UserGetData: React.FC = () => {
  const { data, isLoading } = useFetchAllProductsQuery(null);

  if (isLoading || !data) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="pt-15">
      <div className="border border-black">
        <Slider items={sliderContent} />
      </div>
      <div className="border border-black mt-12 h-[390px]">
        <DiscountedProducts />
      </div>
      <div className="flex flex-wrap justify-center mt-20">
        {data.slice(0, 6).map((item: DataAttributesApi) => (
          <div key={item._id} className="mx-20 mb-5">
            <ProductItem item={item} />
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-5 w-full">
        <Link to="/data/all" className="px-6 py-2 text-white bg-blue-500 rounded">
          Посмотреть все
        </Link>
      </div>
      <div>
        <Category />
      </div>
      <div>
        <Banner />
      </div>
      <div className="mt-20">
        <BrandList brands={brandContent} />
      </div>
    </div>
  );
};

export default UserGetData;
