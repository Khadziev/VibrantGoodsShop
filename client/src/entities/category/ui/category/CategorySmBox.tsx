import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  imgSrc: string;
  bgc: string;
  categoryTitle: string;
  href: string;
}

const CategorySmBox: React.FC<Props> = ({ imgSrc, bgc, categoryTitle, href }) => {
  const bgColorClass = `bg-${bgc}` || 'bg-gray-200';

  return (
    <Link
      to={href}
      className="flex flex-col items-center transition-transform duration-300 hover:scale-105"
    >
      <div
        className={`flex items-center justify-center w-16 h-16 rounded-full ${bgColorClass} shadow-md`}
      >
        <img
          src={`/src/images/category-icon/${imgSrc}`}
          alt={categoryTitle}
          className="w-10 h-10 object-contain drop-shadow-lg"
        />
      </div>
      <h3 className="text-sm md:text-base font-semibold mt-2 text-center text-gray-700">
        {categoryTitle}
      </h3>
    </Link>
  );
};

export default CategorySmBox;
