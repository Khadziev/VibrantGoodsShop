import React, { useEffect } from 'react';
import { useGetMessagesQuery } from '../../../apiServices/api/apiMessage';
import BackButton from '../../../UI/BackButton/BackButton';
import Text from '../../../UI/Text/Text';

const SomeComponent: React.FC = () => {
  const { data: messages, refetch } = useGetMessagesQuery();

  useEffect(() => {
    const intervalId = setInterval(refetch, 3600000);
    return () => clearInterval(intervalId);
  }, [refetch]);


  return (
    <>
      <div>
        <BackButton/>
      </div>

      <div className="space-y-4 mt-5 pt-16 mx-5">
        <Text text='Акции и скидки' align='center' size='xl'></Text>
        {messages?.map((message, index) => (
          <div key={index} className="border border-blue-300 rounded-lg p-4 bg-blue-100 shadow-lg text-center">
            <div className="font-bold text-xl mb-2">Уведомление {index + 1}</div>
            <img src={`/${message.image}`} alt="broadcast" className="h-500 w-100 mx-auto"/>
            <p className="text-gray-700 text-base">{message.body}</p>
            <p className="text-gray-400 text-sm">Отправлено: {new Date(message.createdAt).toLocaleString()}</p>
            <p className="text-gray-500 text-sm mt-2">Администрация магазина</p>
          </div>
        ))}
      </div>

    </>
  );
};

export default SomeComponent;
