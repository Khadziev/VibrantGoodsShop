import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-white">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
};

export default Loading;
