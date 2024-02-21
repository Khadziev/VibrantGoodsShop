import React, { useState } from "react";
import { Link } from "react-router-dom";

import { AiOutlineHome, AiOutlineMessage } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { useGetCartByUserIdQuery } from "@/apiServices/api/apiCart";
import { useAppSelector } from "@/app/providers/store";

const CenteredMenu = () => {
  const userId = useAppSelector((state) => state.auth.userId);
  const { data: cartData } = useGetCartByUserIdQuery(userId || "");

  const cartItemsCount = cartData?.items.length || 0;

  const allMenus = [
    { name: "домой", link: "/", icon: AiOutlineHome },
    { name: "все товары", link: "/data/all", icon: MdDashboard },
    { name: "акции и скидки", link: "/message", icon: AiOutlineMessage },
    { name: "корзина", link: "/cart", icon: FiShoppingCart, count: cartItemsCount },
    { name: "настройки профиля", link: "/users/:id", icon: RiSettings4Line },
  ];

  const [hoveredMenu, setHoveredMenu] = useState(null);

  return (
    <div className="flex justify-center items-center">
      <div className="flex items-center gap-3.5 font-medium">
        {allMenus.map((menu, i) => (
          <Link
            to={menu.link}
            key={i}
            className="group flex flex-col items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md relative menu-item"
            onMouseEnter={() => setHoveredMenu(menu.name)}
            onMouseLeave={() => setHoveredMenu(null)}
            style={{ transform: `scale(${hoveredMenu === menu.name ? 1.1 : 1})` }}
          >
            <div style={{ color: "white" }}>{React.createElement(menu.icon, { size: 20 })}</div>
            <h2 style={{ color: hoveredMenu === menu.name ? "white" : "transparent" }}>{menu.name}</h2>
            {menu.name === "корзина" && cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs">{cartItemsCount}</span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CenteredMenu;
