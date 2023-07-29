import React from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  color?: 'blue' | 'black' | 'white';
}

const Button: React.FC<ButtonProps> = ({ text, onClick, color = 'blue' }) => {
  let textColorClass = '';

  switch (color) {
  case 'blue':
    textColorClass = 'text-blue-500';
    break;
  case 'black':
    textColorClass = 'text-black';
    break;
  case 'white':
    textColorClass = 'text-white';
    break;
  default:
    textColorClass = 'text-blue-500';
    break;
  }

  return (
    <button
      onClick={onClick}
      className={`transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 inline-block text-sm px-4 py-2 leading-none border rounded ${textColorClass} border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0 font-cinzel`}
    >
      {text}
    </button>
  );
};

export default Button;
