import React, { useState } from 'react';
import { useBroadcastMessageMutation } from '../../../apiServices/api/apiMessage';

const BroadcastMessageSender: React.FC = () => {
  const [broadcastMessage, { isLoading }] = useBroadcastMessageMutation();

  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('body', message);
    if (selectedFile) {
      formData.append('image', selectedFile);
    }

    await broadcastMessage(formData);
    setMessage('');
    setSelectedFile(null);
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <form className="w-full max-w-lg mx-auto mt-5" onSubmit={handleSubmit}>
      <div className="mb-6">
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center"
          name="body"
          value={message}
          onChange={handleChange}
          placeholder="...текст"
        />
        <input
          type="file"
          onChange={handleFileChange}
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
