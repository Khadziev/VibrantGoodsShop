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
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4" onClick={simulateLoading}>
        Запустить загрузку
      </button>

      {(loading || success) && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg text-center">
            {loading && (
              <div className="bg-yellow-500 text-white px-4 py-2 rounded animate-pulse">
                Загрузка...
              </div>
            )}

            {success && (
              <div className="bg-green-500 text-white px-4 py-2 rounded animate-bounce">
                Успешно!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessNotification;
