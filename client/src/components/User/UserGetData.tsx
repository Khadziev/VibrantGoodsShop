import React, { lazy, Suspense } from "react";
import { useFetchAllProductsQuery } from "@/apiServices/api/userApi";
import Loading from "@/UI/Loading/Loading";
import { sliderContent } from "@/mock/Slider";
import { Link } from "react-router-dom";
import Slider from "@/widgets/carousel/Slider";
import Frame from "@/UI/Frame/Frame";
import Sidebars from "@/components/Poster/Sidebar/Sidebars";
import Poster from "../Poster/Banner/Poster";

const DiscountedProducts = lazy(() => import("../Discounted/DiscountedProducts"));
const Banners = lazy(() => import("@/components/Poster/Banner/Banners"));
const Category = lazy(() => import("../Category/Category"));
const Banner = lazy(() => import("../banners"));
const ProductItem = lazy(() => import("../Data/ProductItem"));

const UserGetData: React.FC = () => {
  const { data, isLoading } = useFetchAllProductsQuery(null);

  if (isLoading || !data) {
    return <Loading />;
  }

  return (
    <div className="pt-15">
      <div className="flex ">
        <Sidebars />
        <Poster />
      </div>
      <div>
        <Slider items={sliderContent} />
      </div>
      <Suspense fallback={<Loading />}>
        <div>
          <DiscountedProducts />
        </div>
        <div>
          <Banners />
        </div>
        <Frame>
          <div className="flex flex-wrap justify-center mt-20">
            {data.slice(0, 6).map((item, index) => (
              <div key={index} className="mx-20 mb-5">
                <ProductItem item={item} />
              </div>
            ))}
          </div>
        </Frame>
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
      </Suspense>
    </div>
  );
};

export default UserGetData;
