import { useState } from 'react';

const SuccessNotification = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const simulateLoading = () => {
    setLoading(true);
    setSuccess(false);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <button
        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
        onClick={simulateLoading}
      >
        Запустить загрузку
      </button>

      {(loading || success) && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl shadow-2xl text-center transform transition-all duration-300 scale-95 animate-scaleIn">
            {loading && (
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-blue-200 rounded-full animate-spin mb-3"></div>
                <span className="text-lg font-medium text-gray-700">Загрузка...</span>
              </div>
            )}

            {success && (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <svg
                    className="w-8 h-8 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <span className="text-xl font-semibold text-green-600">Успешно!</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessNotification;
