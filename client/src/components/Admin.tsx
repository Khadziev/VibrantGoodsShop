import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector, AppDispatch } from '../redux/store';
import { addData } from '../redux/authSlice';

const Admin = () => {
  const userName = useAppSelector((state) => state.auth.user?.name) || localStorage.getItem('userName');
  const [title, setTitle] = useState('');
  const dispatch: AppDispatch = useDispatch();

  const handleAddData = () => {
    dispatch(addData({ title }));
    setTitle('');
  };

  return (
    <div>
      <h1>Добро пожаловать, администратор {userName}!</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Введите заголовок"
      />
      <button onClick={handleAddData}>Добавить заголовок</button>
    </div>
  );
};

export default Admin;
