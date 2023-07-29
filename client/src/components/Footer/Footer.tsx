import React from 'react';
import { Link } from 'react-router-dom';




const Footer: React.FC = () => {
  return (
    <footer className="relative py-20 flex flex-col items-center bg-transparent overflow-hidden md:py-40">
      <div className="relative z-[1] container m-auto px-6 md:px-12">
        <div className="m-auto md:w-10/12 lg:w-8/12 xl:w-6/12">
          <div className="flex flex-wrap items-center justify-between md:flex-nowrap">
            <div className="w-full space-x-12 flex justify-center text-black-300 sm:w-7/12 md:justify-start">
              <ul className="list-disc list-inside space-y-8">
                <li><Link to="/#" className="hover:text-sky-400 transition">Главная</Link></li>
                <li><Link to="/#" className="hover:text-sky-400 transition">О нас</Link></li>
                <li><Link to="/#" className="hover:text-sky-400 transition">Руководство</Link></li>
                <li><Link to="/#" className="hover:text-sky-400 transition">Блоки</Link></li>
                <li><Link to="/#" className="hover:text-sky-400 transition">Контакты</Link></li>
                <li><Link to="/#" className="hover:text-sky-400 transition">Условия использования</Link></li>
              </ul>

              <ul role="list" className="space-y-8">
                <li>
                  <Link to="/#" className="flex items-center space-x-3 hover:text-sky-400 transition">
                    <svg xmlns="/#" fill="currentColor" className="w-5" viewBox="0 0 16 16">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                    <span>Github</span>
                  </Link>
                </li>

              </ul>
            </div>
            <div className="w-10/12 m-auto  mt-16 space-y-6 text-center sm:text-left sm:w-5/12 sm:mt-auto">
              <span className="block text-black-300"></span>
              <span className="block text-black-300">Tailus Blocks &copy; 2023</span>
              <span className="flex justify-between text-black">
                <Link to="/#" className="font-semibold">Условия использования </Link>
                <Link to="/#" className="font-semibold"> Политика конфиденциальности</Link>
              </span>
              <span className="block text-black-300">Нужна помощь? <Link to="/#" className="font-semibold text-black"> Свяжитесь с нами</Link></span>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute h-full inset-0 flex items-center">
        <div aria-hidden="true" className="bg-layers bg-scale w-56 h-56 m-auto blur-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full md:w-[30rem] md:h-[30rem] md:blur-3xl"></div>
      </div>
      <div aria-hidden="true" className="absolute inset-0 w-full h-full bg-transparent opacity-80"></div>
    </footer>
  );
};

export default Footer;
