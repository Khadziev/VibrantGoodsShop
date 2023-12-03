import React from 'react';

interface TextProps {
  text: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'blue' | 'green' | 'white' | 'black';
  align?: 'left' | 'center' | 'right';
  isBlinking?: boolean;
}

const Text: React.FC<TextProps> = ({ text, size = 'md', color, align = 'left', isBlinking = false }) => {
  let textSizeClass;
  let textColorClass = '';
  let textAlignClass;
  const textAnimationClass = isBlinking ? 'animate-blinking' : '';

  switch (size) {
  case 'sm':
    textSizeClass = 'text-sm';
    break;
  case 'lg':
    textSizeClass = 'text-lg';
    break;
  case 'xl':
    textSizeClass = 'text-xl';
    break;
  case 'md':
  default:
    textSizeClass = 'text-md';
    break;
  }

  switch (color) {
  case 'blue':
    textColorClass = 'text-blue-500';
    break;
  case 'green':
    textColorClass = 'text-green-500';
    break;
  case 'white':
    textColorClass = 'text-white';
    break;
  case 'black':
    textColorClass = 'text-black';
    break;
  default:
    break;
  }

  switch (align) {
  case 'center':
    textAlignClass = 'text-center';
    break;
  case 'right':
    textAlignClass = 'text-right';
    break;
  case 'left':
  default:
    textAlignClass = 'text-left';
    break;
  }
  const containerStyle = `${textSizeClass} ${textColorClass} ${textAlignClass} ${textAnimationClass} font-cinzel`;

  return (
    <div className={containerStyle}>
      <p>{text}</p>
    </div>
  );
};

export default Text;
