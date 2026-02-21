import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome, AiOutlineMessage } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { MdDashboard } from 'react-icons/md';
import { RiSettings4Line } from 'react-icons/ri';
import { useGetCartByUserIdQuery } from '@/entities/cart/api/apiCart';
import { useAppSelector } from '@/app/providers/store';

const CenteredMenu = () => {
  const userId = useAppSelector((state) => state.auth.userId);
  const { data: cartData } = useGetCartByUserIdQuery(userId || '', { skip: !userId });

  const cartItemsCount = cartData?.items.length || 0;
  //const { id } = useParams<{ id: string }>();

  const allMenus = [
    { name: 'Домой', link: '/', icon: AiOutlineHome },
    { name: 'Все товары', link: '/data/all', icon: MdDashboard },
    { name: 'Акции и скидки', link: '/message', icon: AiOutlineMessage },
    { name: 'Корзина', link: '/cart', icon: FiShoppingCart, count: cartItemsCount },
    { name: 'Профиль', link: `/users/${userId}`, icon: RiSettings4Line }, // исправленный путь
  ];

  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  return (
    <div className="flex justify-center items-center">
      <div className="flex items-center gap-2 font-medium bg-[rgb(var(--color-bg-tertiary))] rounded-full p-1">
        {allMenus.map((menu, i) => (
          <Link
            to={menu.link}
            key={i}
            className={`
              flex flex-col items-center justify-center
              px-4 py-2 rounded-full transition-all duration-200
              group relative
              ${
          hoveredMenu === menu.name
            ? 'bg-[rgb(var(--color-primary))] text-white shadow-sm'
            : 'text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-text-base))] hover:bg-white'
          }
            `}
            onMouseEnter={() => setHoveredMenu(menu.name)}
            onMouseLeave={() => setHoveredMenu(null)}
          >
            <div
              className={`text-lg transition-colors ${hoveredMenu === menu.name ? 'text-white' : 'text-[rgb(var(--color-text-secondary))]'}`}
            >
              {React.createElement(menu.icon, { size: 20 })}
            </div>
            <span
              className={`
                mt-1 text-xs font-medium transition-colors hidden sm:block
                ${hoveredMenu === menu.name ? 'text-white' : 'text-[rgb(var(--color-text-secondary))]'}
              `}
            >
              {menu.name}
            </span>
            {menu.name === 'Корзина' && cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[rgb(var(--color-primary))] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold">
                {cartItemsCount}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CenteredMenu;
