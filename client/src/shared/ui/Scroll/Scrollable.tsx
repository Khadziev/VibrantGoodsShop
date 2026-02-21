import React, { ReactNode } from 'react';

interface ScrollableProps {
  children: ReactNode;
}

const Scrollable: React.FC<ScrollableProps> = ({ children }) => {
  return <div className="w-full h-full overflow-y-scroll animate-fade-in">{children}</div>;
};

export default Scrollable;
