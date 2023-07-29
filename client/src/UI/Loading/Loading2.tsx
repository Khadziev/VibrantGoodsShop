import React from 'react';

const Loading2: React.FC = () => {
  return (
    <div className="w-full h-2 bg-gray-300 relative overflow-hidden">
      <div className="h-full w-full bg-blue-600 absolute animate-slide"></div>
    </div>
  );
};

export default Loading2;
