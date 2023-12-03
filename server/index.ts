import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

import usersRoute from './routes/users.route';
import dataRoute from './routes/data.route';
import userCart from './routes/cart.route';
import reviewRoute from './routes/review.route';
import payProduct from './routes/pay.routes'
import messageRoute from './routes/message.route'

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());


const baseApiUrl = '/api';
app.use(baseApiUrl, usersRoute);
app.use(baseApiUrl, dataRoute);
app.use(baseApiUrl, userCart);
app.use(baseApiUrl, reviewRoute)
app.use(baseApiUrl, payProduct)
app.use(baseApiUrl, messageRoute)

app.use('/uploads', express.static('uploads'));

const clientDistPath = path.resolve(__dirname, "..", "..", "client", "dist");

app.use(express.static(clientDistPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(clientDistPath, "index.html"));
});

fs.readdir(clientDistPath, (err, files) => {
    if (err) {
        console.error(`Ошибка при чтении директории ${clientDistPath}:`, err);
    } else {
        console.log(`Файлы в директории ${clientDistPath}:`, files);
    }
});


mongoose
  .connect(process.env.MONGO as string, {})
  .then(() => {
    app.listen(process.env.PORT as string, () => console.log('Сервер запущен...'));
  })
  .catch((error) => {
    console.error('Ошибка подключения к MongoDB:', error);
  });



  