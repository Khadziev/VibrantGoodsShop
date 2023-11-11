import React from "react";

interface Props {
  value: number;
  type: string;
  isDanger: boolean;
}
const DateTimeDisplay: React.FC<Props> = ({ value, type, isDanger }) => {
  const formattedValue = new Intl.NumberFormat("en-EN").format(value);

  return (
    <div
      className={`flex flex-col items-center mx-[2px] sm:mx-3 py-2 text-[11px] sm:text-sm md:text-base w-14 sm:w-20 backdrop-filter backdrop-blur-[8px] bg-palette-fill/50 shadow-lg rounded-lg border-2 border-palette-secondary ${
        isDanger ? "text-rose-600" : "text-black"
      }`}
    >
      <p>{formattedValue}</p>
      <span>{type}</span>
    </div>
  );
};

export default DateTimeDisplay;
