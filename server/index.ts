import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';


import usersRoute from './routes/users.route';
import dataRoute from './routes/data.route'

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(express.json());

app.use('/api', usersRoute);
app.use('/api', dataRoute)

mongoose
  .connect(process.env.MONGO as string, {})
  .then(() => {
    app.listen(process.env.PORT as string, () => console.log('Connected...'));
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
