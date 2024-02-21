import React from "react";
import { Link } from "react-router-dom";

interface Props {
  imgSrc: string;
  bgc: string;
  categoryTitle: string;
  href: string;
}
const CategorySmBox: React.FC<Props> = ({
  imgSrc,
  bgc,
  categoryTitle,
  href,
}) => {

  return (
    <Link to={`${href}`}>
      <div>
        <div
          className={`flex items-center justify-center w-[60px] h-[60px] rounded-full bg-palette-${bgc}`}
        >
          <img
            src={`/src/images/category-icon/${imgSrc}`}
            alt={categoryTitle}
            width={45}
            height={45}
            className="drop-shadow-lg"
          />
        </div>
        <h3 className="text-sm md:text-base font-bold mt-2">
          {categoryTitle}

        </h3>
      </div>

    </Link>
  );
};

export default CategorySmBox;