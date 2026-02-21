/* eslint-disable @typescript-eslint/no-unused-vars */

import { NavLink } from 'react-router-dom';
import {
  AiOutlineLaptop,
  AiOutlineSkin,
  AiOutlineTrophy,
  AiOutlineHome,
  AiOutlineRocket,
  AiOutlineEdit,
} from 'react-icons/ai'; // Установите: npm install react-icons

const Sidebars = () => {
  const categories = [
    { name: 'Электроника', path: '/data/all', icon: <AiOutlineLaptop size={20} />, active: true },
    { name: 'Мода и одежда', path: '#', icon: <AiOutlineSkin size={20} />, active: false },
    { name: 'Красота и спорт', path: '#', icon: <AiOutlineTrophy size={20} />, active: false },
    { name: 'Все для дома', path: '#', icon: <AiOutlineHome size={20} />, active: false },
    { name: 'Игрушки', path: '#', icon: <AiOutlineRocket size={20} />, active: false },
    { name: 'Канцелярия', path: '#', icon: <AiOutlineEdit size={20} />, active: false },
  ];

  return (
    <aside className="h-full w-full md:w-72 bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
      <div>
        <h2 className="text-xl font-bold text-white mb-6 tracking-wide flex items-center gap-2">
          <span className="w-2 h-8 bg-violet-500 rounded-full"></span>
          Каталог
        </h2>

        <ul className="space-y-2">
          {categories.map((cat, index) => (
            <li key={index}>
              <NavLink
                to={cat.path}
                className={() => `
                  group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300
                  ${
            cat.active
              ? 'bg-white/10 text-white shadow-inner'
              : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }
                  ${!cat.active && 'opacity-70 hover:opacity-100 cursor-not-allowed'}
                `}
                onClick={(e) => !cat.active && e.preventDefault()}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`transition-colors ${cat.active ? 'text-violet-400' : 'text-gray-500 group-hover:text-white'}`}
                  >
                    {cat.icon}
                  </span>
                  <span className="font-medium text-sm">{cat.name}</span>
                </div>

                {/* Индикатор "Скоро" вместо текста */}
                {!cat.active && (
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-red-500 transition-colors"
                    title="Скоро в продаже"
                  ></span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Нижняя плашка (Промо) */}
      <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-violet-600/20 to-blue-600/20 border border-violet-500/30">
        <p className="text-xs text-violet-200 font-medium mb-1">Скидка дня</p>
        <p className="text-sm text-white font-bold">Наушники -20%</p>
      </div>
    </aside>
  );
};

export default Sidebars;
