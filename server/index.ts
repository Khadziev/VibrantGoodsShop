import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import usersRoute from './routes/users.route';
import dataRoute from './routes/data.route';
import userCart from './routes/cart.route';
import reviewRoute from './routes/review.route';
import payProduct from './routes/pay.routes'
import messageRoute from './routes/message.route'
import cotegoryRoute from './routes/categoryRoutes.route'
import sliderRoute from './routes/slider.route'
import brandRoute from './routes/brand.route'

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);


const baseApiUrl = '/api';
app.use(baseApiUrl, usersRoute);
app.use(baseApiUrl, dataRoute);
app.use(baseApiUrl, userCart);
app.use(baseApiUrl, reviewRoute)
app.use(baseApiUrl, payProduct)
app.use(baseApiUrl, messageRoute)
app.use(baseApiUrl, cotegoryRoute)
app.use(baseApiUrl, sliderRoute)
app.use(baseApiUrl, brandRoute)

app.use('/uploads', express.static('uploads'));
const clientDistPath = path.resolve(__dirname, '..', '..', 'client', 'dist');

if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
} else {
  console.log('Client dist not found — running API only');
}


mongoose
  .connect(process.env.MONGO as string, {})
  .then(() => {
    const port = Number(process.env.PORT) || 5000;
    app.listen(port, () => console.log(`Сервер запущен на порту ${port}...`));
  })
  .catch((error) => {
    console.error('Ошибка подключения к MongoDB:', error);
  });


const requiredEnv = ['MONGO', 'SECRET_JWT_KEY'];
for (const v of requiredEnv) {
  if (!process.env[v]) {
    console.warn(`Warning: env var ${v} is not set`);
  }
}


app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});



