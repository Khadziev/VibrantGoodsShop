import React from "react";
import "./BrandList.css";
import SectionTitle from "../../UI/SectionTitle/SectionTitle";

interface Brand {
  id: number;
  name: string;
  imgSrc: string;
}

interface BrandListProps {
  brands: Brand[];
}

const BrandList: React.FC<BrandListProps> = ({ brands }) => {
  return (
    <div className="brand-container">
      <SectionTitle title="Популярные бренды" />
      <div className="brand-items">
        {brands.map((brand) => (
          <div key={brand.id} className="brand-item">
            <img src={brand.imgSrc} alt={brand.name} className="brand-image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandList;
