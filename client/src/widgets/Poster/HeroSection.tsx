/* eslint-disable @typescript-eslint/no-unused-vars */

import Poster from './Banner/Poster';
import Sidebars from './Sidebar/Sidebars';

const HeroSection = () => {
  return (
    <div className="w-full bg-[rgb(var(--color-bg))] py-16 px-4 md:px-8">
      <div className="max-w-[1440px] mx-auto">
        {/* СЕТКА:
            На мобильном: одна колонка.
            На десктопе: Сайдбар (300px) + Постер (остальное место).
        */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Левая колонка */}
          <div className="h-full">
            <Sidebars />
          </div>

          {/* Правая колонка */}
          <div className="h-full">
            <Poster />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
