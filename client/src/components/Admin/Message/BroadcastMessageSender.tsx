import React, { useState } from 'react';
import { useBroadcastMessageMutation } from '../../../apiServices/api/apiMessage';

const BroadcastMessageSender: React.FC = () => {
  const [broadcastMessage, { isLoading }] = useBroadcastMessageMutation();

  const [message, setMessage] = useState({
    body: '',
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await broadcastMessage(message);
    setMessage({ body: '' });
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage({ ...message, [event.target.name]: event.target.value });
  };

  return (
    <form className="w-full max-w-lg mx-auto mt-5" onSubmit={handleSubmit}>
      <div className="mb-6">
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center" // добавлен text-center
          name="body"
          value={message.body}
          onChange={handleChange}
          placeholder="...текст"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          disabled={isLoading}
        >
          отправить
        </button>
      </div>
    </form>
  );
};

export default BroadcastMessageSender;
