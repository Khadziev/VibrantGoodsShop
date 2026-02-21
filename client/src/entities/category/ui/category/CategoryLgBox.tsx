import React from 'react';
import { Link } from 'react-router-dom';
import Text from '@/shared/ui/Text/Text';
import { ICategory } from './model/model';

interface Props {
  item: ICategory;
  isFirstItem: boolean;
}

const CategoryLgBox: React.FC<Props> = React.memo(({ item, isFirstItem }) => {
  const bgColor = item.styles?.backgroundColor || 'bg-gray-100';
  const textColor = item.styles?.color || 'text-gray-800';

  return (
    <div
      className={`
        flex flex-col md:flex-row items-center p-6 rounded-2xl shadow-xl overflow-hidden
        transition-transform duration-300 hover:shadow-2xl hover:-translate-y-1
        ${bgColor.includes('#') ? `bg-[${bgColor}]` : bgColor}
      `}
      style={item.styles as React.CSSProperties}
    >
      <div className="text-center md:text-left mb-4 md:mb-0 md:mr-4 md:ml-6 flex-1">
        <h3 className="text-xl md:text-2xl font-bold" style={{ color: textColor }}>
          {item.name}
        </h3>
        <p className="mt-2 text-gray-600 text-sm md:text-base">{item.description}</p>

        {isFirstItem && (
          <Link
            to={item.href}
            className={`
              mt-4 inline-block px-6 py-3 rounded-full font-semibold
              bg-gradient-to-r from-blue-500 to-indigo-600 text-white
              shadow-lg hover:shadow-xl transition-all duration-300
              hover:from-blue-600 hover:to-indigo-700
            `}
          >
            <Text text="Перейти" color="white" size="md" isBlinking={true} />
          </Link>
        )}
      </div>

      <div className="flex-shrink-0">
        <img
          src={item.imgSrc}
          alt={item.name}
          className="w-32 h-32 object-contain drop-shadow-lg hover:scale-105 transition-transform duration-300"
        />
      </div>
    </div>
  );
});

export default CategoryLgBox;
