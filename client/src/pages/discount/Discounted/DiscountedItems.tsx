import { useState, useRef, useEffect } from 'react';
import { AiOutlineFire, AiOutlineCaretRight } from 'react-icons/ai';
import { useFetchDiscountedProductsQuery } from '@/shared/api/userApi';
import Loading from '@/shared/ui/Loading/Loading';
import Text from '@/shared/ui/Text/Text';
import { NavLink } from 'react-router-dom';

const DiscountedItems = () => {
  const { data: products, isLoading, error } = useFetchDiscountedProductsQuery(null);
  const scrollContainerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDraggingTrack, setIsDraggingTrack] = useState(false);

  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const maxScrollLeft = el.scrollWidth - el.clientWidth;

    const progress = (el.scrollLeft / maxScrollLeft) * 100;
    setScrollProgress(progress);
  };

  const handleTrackClickOrDrag = (e) => {
    const track = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - track.left;
    const percentage = clickX / track.width;

    const el = scrollContainerRef.current;
    if (!el) return;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;

    el.scrollTo({
      left: maxScrollLeft * percentage,
      behavior: 'smooth',
    });
  };

  const handleMouseDown = (e) => {
    setIsDraggingTrack(true);
    handleTrackClickOrDrag(e);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDraggingTrack) return;

      const trackElement = document.getElementById('custom-scroll-track');
      if (trackElement) {
        const rect = trackElement.getBoundingClientRect();

        let clientX = e.clientX;
        if (clientX < rect.left) clientX = rect.left;
        if (clientX > rect.right) clientX = rect.right;

        handleTrackClickOrDrag({
          currentTarget: trackElement,
          clientX: clientX,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDraggingTrack(false);
    };

    if (isDraggingTrack) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingTrack]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU').format(Math.round(price));
  };
  if (isLoading || !products) {
    if (error) console.error(error);
    return <Loading />;
  }

  return (
    <div className="w-full py-12 px-4 bg-gray-50 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto mb-8 flex items-center gap-3 px-4 md:px-0">
        <div className="p-2.5 bg-rose-100 rounded-2xl text-rose-600 shadow-sm">
          <AiOutlineFire size={26} />
        </div>
        <div>
          <Text
            text="Горячие скидки"
            className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight"
          />
          <p className="text-gray-500 text-sm mt-1">Успейте купить по лучшей цене</p>
        </div>
      </div>

      <div className="relative w-full max-w-[1400px] mx-auto">
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-4 md:gap-6 overflow-x-auto pb-8 pt-4 px-4 md:px-8
                     scrollbar-hide scroll-smooth snap-x snap-mandatory touch-pan-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="shrink-0 w-0 md:w-4 lg:w-8" />

          {products.map((item) => {
            const newPrice = item.price * (1 - item.discount / 100);
            return (
              <NavLink
                to={`/data/${item._id}`}
                key={item._id}
                className="group relative flex flex-col shrink-0 w-[260px] sm:w-[280px] md:w-[320px] snap-start
                               bg-white rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1
                               transition-all duration-500 ease-out overflow-hidden border border-gray-100/50"
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src={item.imageURL[0]}
                    alt={item.name}
                    className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  />
                  {item.discount > 0 && (
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-rose-600 text-sm font-extrabold px-3 py-1.5 rounded-full shadow-sm z-10 flex items-center gap-1">
                      <AiOutlineFire size={14} />-{item.discount}%
                    </div>
                  )}
                </div>

                <div className="p-5 flex flex-col flex-grow bg-gradient-to-b from-white to-gray-50/30">
                  <h3 className="text-gray-800 font-semibold text-base leading-snug mb-3 line-clamp-2 group-hover:text-rose-600 transition-colors">
                    {item.name}
                  </h3>

                  <div className="mt-auto flex items-end justify-between">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-400 line-through mb-0.5">
                        {formatPrice(item.price)} ₽
                      </span>
                      <span className="text-2xl font-black text-gray-900 tracking-tight flex gap-1 items-baseline">
                        {formatPrice(newPrice)}{' '}
                        <span className="text-sm font-medium text-gray-500">₽</span>
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center group-hover:bg-rose-500 group-hover:text-white transition-all duration-300 scale-90 group-hover:scale-100 shadow-sm">
                      <AiOutlineCaretRight size={18} />
                    </div>
                  </div>
                </div>
              </NavLink>
            );
          })}

          <div className="shrink-0 w-4 md:w-8 lg:w-12" />
        </div>

        <div className="max-w-md mx-auto mt-2 px-4 flex items-center justify-center">
          <div
            id="custom-scroll-track"
            onMouseDown={handleMouseDown}
            className={`relative w-full h-1.5 bg-gray-200 rounded-full overflow-hidden cursor-pointer transition-all duration-300 ${isDraggingTrack ? 'h-2.5' : 'hover:h-2.5'}`}
          >
            <div
              className={`absolute top-0 left-0 h-full bg-rose-500 rounded-full transition-all duration-150 ease-out ${isDraggingTrack ? 'bg-rose-600' : ''}`}
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountedItems;
