import React, { memo, useState } from "react";
import { NavLink } from "react-router-dom";
import DiscountIcon from "@/images/discount-icon/discount.webp";
import AddToCartComponent from "../Basket/AddToCartComponent";
import { DataAttributesApi } from "@/components/Admin/product/model/model";

interface ProductItemProps {
  item: DataAttributesApi;
}

const ProductItem: React.FC<ProductItemProps> = memo(({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="fondo2 cursor-pointer w-56 h-60 rounded-lg relative border"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <figure className="relative mb-2 w-full h-4/5">
        <NavLink to={`/data/${item._id}`}>
          <img
            src={item.imageURL[0]}
            alt={`imageURL ${item.title}`}
            className="w-full h-full object-cover rounded-lg transform transition duration-500 hover:scale-110"
          />
        </NavLink>
        {item.discount > 0 && (
          <div className="absolute top-0 left-0 p-2">
            <img
              src={DiscountIcon}
              alt="Discount Icon"
              className="text-red-500"
              style={{ width: "30px", height: "30px" }}
            />
          </div>
        )}

        {isHovered && (
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 text-customColorTextBase">
            <AddToCartComponent product={item} />
          </div>
        )}
      </figure>
      <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5 flex justify-center items-center">
        {item.category}
      </span>
      <p className="flex justify-between px-1">
        <span className="text-sm font-light text-customColorTextBase">{item.name}</span>
        <span className="text-lg font-medium text-customColorPrimary">${item.price}</span>
      </p>
    </div>
  );
});

export default ProductItem;
