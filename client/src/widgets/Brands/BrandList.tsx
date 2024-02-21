import React from "react";
import "./BrandList.css";
import SectionTitle from "../../UI/SectionTitle/SectionTitle";
import { useGetAllBrandQuery } from "@/apiServices/api/apiBrand";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BrandListProps {}

const BrandList: React.FC<BrandListProps> = () => {
  const { data: brands = [], isLoading, isError } = useGetAllBrandQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching brands</div>;

  return (
    <div className="brand-container">
      <SectionTitle title="Популярные бренды" />
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
