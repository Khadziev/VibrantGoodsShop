import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetCartByUserIdQuery } from "../../apiServices/api/apiCart";
import { useAppSelector } from "../../app/providers/store";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { AiOutlineHome, AiOutlineMessage } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { UserRole } from "../../apiServices/model/types";

const Sidebar = () => {
  const userId = useAppSelector((state) => state.auth.userId);
  const userRole = useAppSelector((state) => state.auth.role) || localStorage.getItem("userRole");
  const { data: cartData } = useGetCartByUserIdQuery(userId || "");

  const cartItemsCount = cartData?.items.length || 0;
  const allMenus = [
    { name: "домой", link: "/", icon: AiOutlineHome, margin: true },
    { name: "все товары", link: "/data/all", icon: MdOutlineDashboard, margin: true },
    { name: "акции и скидки", link: "/message", icon: AiOutlineMessage, margin: true },
    { name: "корзина", link: "/cart", icon: FiShoppingCart, margin: true, count: cartItemsCount },
    { name: "настройки профиля", link: "/users/:id", icon: RiSettings4Line, margin: true },
  ];

  const [open, setOpen] = useState(() => {
    const storedState = localStorage.getItem("sidebarOpen");
    return storedState ? JSON.parse(storedState) : false;
  });

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(open));
  }, [open]);
  // console.log(userRole);

  const menus =
    userRole === UserRole.ADMIN
      ? allMenus.filter(
        (menu) => menu.name !== "корзина" && menu.name !== "настройки профиля" && menu.name !== "все товары"
      )
      : allMenus;

  return (
    <>
      <div className="flex gap-6 relative z-50 mt-10">
        <HiMenuAlt3
          size={26}
          className="cursor-pointer absolute mt-9 left-4 z-50 text-white"
          onClick={() => setOpen(!open)}
        />
        <div
          className={`bg-[#0E182F] bg-opacity-50 ${
            open ? "w-full h-21" : "w-16 h-21"
          } duration-500 text-gray-100 px-4 sticky top-20 left-0 right-0 z-40 overflow-hidden`}
        >
          <div className="py-3 flex justify-start items-center ml-8">
            <div className="flex justify-around flex-grow">
              {menus?.map((menu, i) => (
                <Link
                  to={menu?.link}
                  key={i}
                  className={` ${
                    menu?.margin && "mt-1"
                  } group flex flex-col items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md relative`}
                >
                  <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                  <h2
                    style={{
                      transitionDelay: `${i + 3}00ms`,
                    }}
                    className={`whitespace-pre duration-500 ${!open ? "opacity-0" : ""} group-hover:opacity-100`}
                  >
                    {menu?.name}
                  </h2>
                  {menu?.count > 0 && (
                    <div className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {menu?.count}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
