import React, { useState, useEffect } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHome } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useGetCartByUserIdQuery } from "../../apiServices/api/apiCart";
import { useAppSelector } from "../../app/providers/store";

const Sidebar = () => {
  const userId = useAppSelector((state) => state.auth.userId);
  const { data: cartData } = useGetCartByUserIdQuery(userId || '');


  const cartItemsCount = cartData?.items.length || 0;
  const menus = [
    // { name: "панель приборов", link: "#", icon: MdOutlineDashboard },
    { name: "пользователь", link: "#", icon: AiOutlineUser },
    { name: "главная", link: "/", icon: AiOutlineHome },
    { name: "аналитика", link: "#", icon: TbReportAnalytics, margin: true },
    //{ name: "Файловый менеджер", link: "#", icon: FiFolder },
    { name: "корзина", link: "/cart", icon: FiShoppingCart },
    //{ name: "сохранено", link: "#", icon: AiOutlineHeart, margin: true },
    //{ name: "настройки", link: "#", icon: RiSettings4Line },
    //{ name: "о сайте", link: "#", icon: HiCubeTransparent },
  ];

  const [open, setOpen] = useState(() => {
    const storedState = localStorage.getItem("sidebarOpen");
    return storedState ? JSON.parse(storedState) : true;
  });

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(open));
  }, [open, cartItemsCount]);

  return (
    <>
      <section className="flex gap-6">
        <div
          className={`bg-blue-500 p-6 ${open ? "w-96" : "w-16"} duration-500 text-gray-100 px-4 sticky top-0`}

        >
          <div className="py-3 flex justify-end">
            <HiMenuAlt3 size={26} className="cursor-pointer" onClick={() => setOpen(!open)} />
          </div>

          <div className="mt-4 flex flex-col gap-4 relative">
            {menus?.map((menu, i) => (
              <Link
                to={menu?.link}
                key={i}
                className={` ${
                  menu?.margin && "mt-5"
                } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
              >
                {menu?.name === 'корзина' ? (
                  <div className='relative'>
                    {React.createElement(menu?.icon, { size: "20" })}
                    {cartItemsCount > 0 && (
                      <span className='absolute top-0 right-0 bg-red-500 rounded-full text-white text-xs w-4 h-4 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2'>
                        {cartItemsCount}
                      </span>
                    )}
                  </div>
                ) : (
                  <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                )}
                <h2
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  {menu?.name}
                </h2>
                <h2
                  className={`${
                    open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                >
                  {menu?.name}
                </h2>
              </Link>
            ))}

          </div>
        </div>
      </section>
    </>
  );
};

export default Sidebar;
