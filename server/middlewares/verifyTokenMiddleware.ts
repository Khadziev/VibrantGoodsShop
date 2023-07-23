import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import User, { UserAttributes } from '../model/User.model';

export const verifyTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new Error('Токен не предоставлен');
    }

    const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY as Secret) as {
      id: string;
      login: string;
      role: string;
    };

    const user = await User.findOne({ _id: decoded.id });

    if (!user) {
      throw new Error('Пользователь не найден');
    }

    (req as any).userId = decoded.id; 
    (req as any).user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Ошибка аутентификации' });
  }
};
