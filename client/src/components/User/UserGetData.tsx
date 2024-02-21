import React, { lazy, Suspense } from "react";
import { useFetchAllProductsQuery } from "@/apiServices/api/userApi";
import Loading from "@/UI/Loading/Loading";
import { Link } from "react-router-dom";
import Slider from "@/widgets/carousel/Slider";
import Frame from "@/UI/Frame/Frame";
import Sidebars from "@/widgets/Poster/Sidebar/Sidebars";
import Poster from "../../widgets/Poster/Banner/Poster";
import Banner from "@/widgets/banners";
import BrandList from "@/widgets/Brands/BrandList";
import ProductItemHome from "@/components/Data/ProductItemHome/ProductItemHome";
const DiscountedItems = lazy(() => import ("../Discounted/DiscountedItems"));
const Banners = lazy(() => import("@/widgets/Poster/Banner/Banners"));
const Category = lazy(() => import("../Category/Category"));


const UserGetData: React.FC = () => {
  const { data, isLoading } = useFetchAllProductsQuery(null);

  if (isLoading || !data) {
    return <Loading />;
  }

  return (
    <div className="pt-15">
      <div className=" pt-12 ">
        <Slider />
      </div>
      <div className="flex pt-4 ">
        <Sidebars />
        <Poster />
      </div>
      <Suspense fallback={<Loading />}>
        <div>
          <DiscountedItems/>
        </div>
        <div>
          <Banners />
        </div>
        <Frame>
          <div className="flex ">
            {data.slice(0, 4).map((item, index) => (
              <div key={index}>
                <ProductItemHome item={item} />
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
      <div>
        <BrandList/>
      </div>
    </div>
  );
};

export default UserGetData;

