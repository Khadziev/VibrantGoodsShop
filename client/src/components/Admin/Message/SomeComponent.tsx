import React, { useEffect } from 'react';
import { useGetMessagesQuery } from '../../../apiServices/api/apiMessage';
import BackButton from '../../../UI/BackButton/BackButton';

const SomeComponent: React.FC = () => {
  const { data: messages, refetch } = useGetMessagesQuery();

  useEffect(() => {
    const intervalId = setInterval(refetch, 5000);
    return () => clearInterval(intervalId);
  }, [refetch]);

  return (
    <>
      <div className="fixed top-0 left-0 mt-12">
        <BackButton/>
      </div>
      <div className="space-y-4 mt-5 pt-16 mx-5">
        {messages?.map((message, index) => (
          <div key={index} className="border border-blue-300 rounded-lg p-4 bg-blue-100 shadow-lg">
            <div className="font-bold text-xl mb-2">Сообщение {index + 1}</div>
            <p className="text-gray-700 text-base">{message.body}</p>
            <p className="text-gray-400 text-sm">Отправлено: {new Date(message.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default SomeComponent;
