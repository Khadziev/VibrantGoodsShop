import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path'

import usersRoute from './routes/users.route';
import dataRoute from './routes/data.route';
import userCart from './routes/cart.route';


const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(express.json());



const baseApiUrl = '/api';

app.use(baseApiUrl, usersRoute);
app.use(baseApiUrl, dataRoute);
app.use(baseApiUrl, userCart);

app.use(express.static(path.resolve(__dirname, "client", "dist")));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

mongoose
  .connect(process.env.MONGO as string, {})
  .then(() => {
    app.listen(process.env.PORT as string, () => console.log('Сервер запущен...'));
  })
  .catch((error) => {
    console.error('Ошибка подключения к MongoDB:', error);
  });
