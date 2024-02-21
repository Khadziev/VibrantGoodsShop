import React from "react";
import { Link } from "react-router-dom";
import Text from "@/UI/Text/Text";
import { ICategory } from "./model/model";

interface Props {
  item: ICategory;
  isFirstItem: boolean;
}

const CategoryLgBox: React.FC<Props> = React.memo(({ item, isFirstItem }) => {
  return (
    <div
      key={item.title}
      className={`flex justify-around items-center rounded-md shadow-lg overflow-hidden`}
      style={item.styles as React.CSSProperties}
    >
      <div className="mx-[0.5rem]">
        <h3 className="text-xl 2xl:text-2xl font-[500]" style={{ color: "var(--digital-text-color)" }}>
          {item.name}
        </h3>

        <p className="text-sm mt-2">{item.description}</p>

        {isFirstItem && (
          <Link to={item.href} className="py-2 px- sm:py-3 lg:py-2 xl:py-3 sm:px-6 rounded-lg bg-palette-primary/90 border border-palette-danger hover:bg-palette-primary/100 transition-all duration-300 shadow-lg 2xl:mt-4 mr-2  ltr:mr-auto sm:mr-14 ltr:sm:ml-14 ltr:sm:mr-0  inline-block  text-palette-side text-[12px] rtl:sm:text-sm">
            <Text text="перейти" color="blue" size="xl" isBlinking={true} />
          </Link>
        )}
      </div>
      <img
        src={item.imgSrc}
        alt={item.name}
        width={item.imgWidth}
        height={item.imgHeight}
        className="drop-shadow-lg hover:scale-95 transition-transform duration-300 "
      />
    </div>
  );
});

export default CategoryLgBox;
