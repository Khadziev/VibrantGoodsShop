import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Slide } from '../../redux/model/types';



interface SliderProps {
  items: Slide[];
}

const Slider: React.FC<SliderProps> = ({ items }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide(currentSlide === items.length - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? items.length - 1 : currentSlide - 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentSlide, items.length]);

  return (
    <div id="default-carousel" className="relative w-full h-[70vh] bg-[#FFFFFF]" data-carousel="slide">
      <div className="relative h-full overflow-hidden rounded-lg">
        {items.map((item, index) => (
          <div key={index} className={`absolute top-0 left-0 duration-700 ease-in-out w-full h-full flex items-center justify-center transition-transform transform
           ${index === currentSlide ? 'translate-x-0 opacity-100' : index < currentSlide ? '-translate-x-full opacity-50' : 'translate-x-full opacity-50'}`}
          data-carousel-item>
            <NavLink to={item.url}>
              <img src={item.bgImg} className="max-w-full max-h-full object-contain" />
              <div className="absolute inset-0  bg-[#fff7f7] bg-opacity-30 flex flex-col justify-end pb-10">
                <div className=" bg-[#422e8a] bg-opacity-50 rounded p-3 text-center w-1/2 mx-auto">
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                </div>
              </div>
            </NavLink>
          </div>
        ))}
      </div>
      <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
        {items.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-white dark:bg-gray-800' : 'bg-gray-300 dark:bg-gray-600'}`}
            aria-current={index === currentSlide ? 'true' : 'false'}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setCurrentSlide(index)}
          ></button>
        ))}
      </div>

      <button
        type="button"
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={prevSlide}
      ></button>
      <button
        type="button"
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={nextSlide}
      ></button>
    </div>
  );
};

export default Slider;
