import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useGetAllSidebarQuery } from '@/shared/api/apiSlider';
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './index.css';

const Slider: React.FC = () => {
  const { data: items = [], isLoading, isError } = useGetAllSidebarQuery();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const SLIDE_DURATION = 6000; // 6 секунд на слайд

  useEffect(() => {
    if (items.length === 0) return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    }, SLIDE_DURATION);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [items.length]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 700); // Задержка для анимации
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === 0 ? items.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 700);
  };

  // Обработка загрузки и ошибок
  if (isLoading) return <div className="w-full h-[600px] bg-gray-100 animate-pulse rounded-2xl" />;
  if (isError || items.length === 0) return null;

  const activeItem = items[currentSlide];

  return (
    <div className="relative w-full mt-6 group">
      {/* Основной контейнер с фиксированной высотой */}
      <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-3xl bg-gray-900 shadow-2xl">
        {/* --- ФОНОВЫЕ ИЗОБРАЖЕНИЯ (Смена через Opacity) --- */}
        {items.map((item, index) => (
          <div
            key={item._id || index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out
              ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}
            `}
          >
            {/* Картинка с зум-эффектом при активе */}
            <img
              src={item.bgImg}
              alt={item.title}
              className={`w-full h-full object-cover transition-transform duration-[10000ms] ease-linear
                ${index === currentSlide ? 'scale-110' : 'scale-100'}
              `}
            />

            {/* Градиентный слой для читаемости текста */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          </div>
        ))}

        {/* --- КОНТЕНТ СЛАЙДА --- */}
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-2xl overflow-hidden">
              {/* Анимация текста: ключ key заставляет React пересоздать элемент и запустить анимацию заново */}
              <div key={currentSlide} className="space-y-6">
                {/* Заголовок */}
                <h2
                  className="text-4xl md:text-6xl font-black text-white leading-tight animate-slide-up opacity-0"
                  style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}
                >
                  {activeItem.title}
                </h2>

                {/* Описание */}
                <p
                  className="text-lg text-gray-200 md:text-xl font-light opacity-0 animate-slide-up"
                  style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
                >
                  {activeItem.description}
                </p>

                {/* Кнопка */}
                <div
                  className="pt-4 opacity-0 animate-slide-up"
                  style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}
                >
                  <NavLink
                    to={activeItem.url || '/'}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-full font-bold transition-transform hover:scale-105 hover:bg-gray-100 active:scale-95"
                  >
                    Подробнее
                    <FaArrowRight size={14} />
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- НАВИГАЦИЯ (Стрелки) --- */}
        <div className="absolute bottom-8 right-8 z-30 flex gap-4">
          <button
            onClick={handlePrev}
            className="w-14 h-14 rounded-full border border-white/30 bg-black/20 text-white flex items-center justify-center backdrop-blur-md hover:bg-white hover:text-black transition-all"
          >
            <FaChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            className="w-14 h-14 rounded-full border border-white/30 bg-black/20 text-white flex items-center justify-center backdrop-blur-md hover:bg-white hover:text-black transition-all"
          >
            <FaChevronRight size={20} />
          </button>
        </div>

        {/* --- ПРОГРЕСС БАР (Линия времени) --- */}
        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gray-800/50 z-30">
          {/* Мы используем key, чтобы перезапускать анимацию полоски при смене слайда */}
          <div
            key={currentSlide}
            className="h-full bg-white origin-left animate-progress"
            style={{ animationDuration: `${SLIDE_DURATION}ms` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Slider;
