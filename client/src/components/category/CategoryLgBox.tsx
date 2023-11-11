
import React from "react";
import { Link } from "react-router-dom";


interface Props {
  name: string;
  title: string;
  description: string;
  styles: {
    backgroundColor: string;
    flexDirection: string;
    paddingInline: string;
    paddingBlock: string;
    textAlign?: string;
    gridRow: string;
    gridColumn: string;
  };
  href: string;
  imgSrc: string;
  imgWidth: number;
  imgHeight: number;
}
const CategoryLgBox: React.FC<Props> = ({
  name,
  title,
  description,
  styles,
  href,
  imgSrc,
  imgWidth,
  imgHeight,
}) => {


  return (
    <div
      key={title}
      className={`flex justify-around items-center rounded-md shadow-lg overflow-hidden`}
      style={styles as React.CSSProperties}
    >
      <div className="mx-[0.5rem]">
        <h3 className="text-xl 2xl:text-2xl font-[500]">{name}</h3>
        <p className="text-sm mt-2">{description}</p>

        <Link to={href}>

        </Link>
      </div>
      <img
        src={imgSrc}
        alt={name}
        width={imgWidth}
        height={imgHeight}
        className="drop-shadow-lg hover:scale-95 transition-transform duration-300 "
      />
    </div>
  );
};

export default CategoryLgBox;
