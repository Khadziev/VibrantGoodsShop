import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Анимированный спиннер */}
      <div className="relative">
        {/* Внешнее кольцо */}
        <div className="w-20 h-20 border-4 border-blue-200 rounded-full"></div>

        {/* Внутреннее анимированное кольцо */}
        <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-blue-500 border-r-blue-500 rounded-full animate-spin"></div>

        {/* Центральный элемент */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-500 rounded-full animate-pulse"></div>
      </div>

      {/* Текст загрузки */}
      <div className="absolute bottom-1/4 text-center">
        <p className="text-lg font-medium text-gray-600">Загрузка...</p>
        <div className="mt-2 flex justify-center space-x-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
