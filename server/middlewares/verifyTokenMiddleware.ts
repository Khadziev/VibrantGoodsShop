import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import User from '../model/User.model';

export const verifyTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Токен не предоставлен' });

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ message: 'Неверный формат токена' });

    const token = parts[1];
    const secret = process.env.SECRET_JWT_KEY as Secret;
    if (!secret) return res.status(500).json({ message: 'Не настроен SECRET_JWT_KEY' });

    const decoded = jwt.verify(token, secret) as { id: string; login: string; role?: string };

    if (!decoded?.id) return res.status(401).json({ message: 'Неверный токен' });

    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ message: 'Пользователь не найден' });

    (req as any).userId = decoded.id;
    (req as any).user = user;

    next();
  } catch (err: any) {
    return res.status(401).json({ message: 'Ошибка аутентификации', detail: err?.message });
  }
};
