/* eslint-disable @typescript-eslint/no-unused-vars */

import bannerImg from '@/shared/assets/images/homes/shop.jpg'; // Убедитесь, что путь верный
import { Button } from '@/shared/ui';
import { AiOutlineArrowRight, AiFillThunderbolt } from 'react-icons/ai';

const Banner = () => (
  <section className="relative w-full h-[500px] md:h-[550px] rounded-3xl overflow-hidden shadow-2xl group isolate animate-fade-in">
    {/* 1. ФОНОВОЕ ИЗОБРАЖЕНИЕ С ЗУМОМ */}
    <div
      className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] ease-out group-hover:scale-110"
      style={{ backgroundImage: `url(${bannerImg})` }}
    >
      {/* SVG неоновый декор */}
      <svg
        className="absolute top-10 left-10 w-32 h-32 opacity-30 animate-pulse"
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="#00f0ff"
          strokeWidth="6"
          fill="none"
          filter="url(#glow)"
        />
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </div>

    {/* 2. ЗАТЕМНЕНИЕ (Глубокий черный градиент) */}
    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-blue-900/80 to-transparent z-10"></div>

    {/* 3. ТЕКСТУРА ШУМА (Добавляет "киношности") */}
    <div
      className="absolute inset-0 opacity-[0.07] z-10 pointer-events-none"
      style={{
        backgroundImage: `url('https://www.transparenttextures.com/patterns/stardust.png')`,
      }}
    ></div>

    {/* 4. БЕГУЩАЯ СТРОКА НА ЗАДНЕМ ПЛАНЕ (Декор) */}
    <div className="absolute top-10 left-0 w-full overflow-hidden opacity-20 z-10 pointer-events-none select-none">
      <div className="whitespace-nowrap animate-marquee text-[120px] font-black text-blue-400 neon-text leading-none">
        SALE SALE SALE SALE SALE SALE SALE SALE
      </div>
    </div>

    {/* 5. КОНТЕНТ */}
    <div className="relative z-20 h-full flex flex-col justify-center px-8 md:px-16 max-w-7xl mx-auto animate-fade-in">
      <div className="flex flex-col items-start max-w-2xl">
        {/* Бейдж */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/30 border border-orange-500/70 text-orange-300 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md shadow-neon">
          <AiFillThunderbolt />
          Ограниченное предложение
        </div>

        {/* Заголовок */}
        <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-4 drop-shadow-neon animate-slide-in">
          СЕЗОННАЯ <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500 neon-text">
            РАСПРОДАЖА
          </span>
        </h2>

        {/* Описание скидки (Контраст тонкого и жирного) */}
        <div className="flex items-baseline gap-4 mb-8">
          <span className="text-white/80 text-xl md:text-2xl font-light animate-fade-in">
            Скидки до
          </span>
          <span className="text-6xl md:text-8xl font-black text-pink-400 tracking-tighter drop-shadow-neon animate-fade-in">
            50%
          </span>
        </div>

        {/* Кнопка */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button
            variant="primary"
            size="lg"
            className="relative overflow-hidden bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-black text-lg hover:scale-105 transition-transform flex items-center gap-2 group/btn shadow-neon border-2 border-white/10 animate-fade-in"
            onClick={() => (window.location.href = '/discount')}
          >
            <span className="relative z-10">Перейти к покупкам</span>
            <AiOutlineArrowRight className="relative z-10 transition-transform group-hover/btn:translate-x-1" />
            {/* Блик на кнопке */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200/40 to-transparent -translate-x-full group-hover/btn:animate-shimmer" />
          </Button>

          <p className="text-blue-300 text-xs sm:max-w-[150px] leading-tight flex items-center animate-fade-in">
            *Предложение действует до конца месяца на выбранные товары
          </p>
        </div>
      </div>
    </div>

    {/* 6. ДЕКОРАТИВНЫЕ СВЕЧЕНИЯ (Аккуратные) */}
    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-600/30 rounded-full blur-[120px] pointer-events-none z-10 translate-x-1/3 translate-y-1/3 animate-pulse"></div>
  </section>
);

export default Banner;
