import React, { ReactNode } from 'react';
import './BackgroundImage.css'; // Импорт CSS файла

interface BackgroundImageProps {
  children: ReactNode;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({ children }) => {
  return (
    <div className="background-image">
      {children}
    </div>
  );
};

export default BackgroundImage;
