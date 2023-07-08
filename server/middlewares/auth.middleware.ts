import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user: { id: string; login: string }; 
}

const authenticateToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json('Нет доступа (no authorization header)');
    }

    const [type, token] = authorization.split(' ');

    if (type !== 'Bearer') {
      return res.status(401).json('Неверный тип токена');
    }

    const secretKey = process.env.SECRET_JWT_KEY as Secret;
    if (!secretKey) {
      return res.status(500).json({ error: 'Отсутствует ключ для JWT' });
    }

    req.user = jwt.verify(token, secretKey) as { id: string; login: string }; 
    next();
  } catch (error: unknown) {
    return res.status(401).json('Ошибка авторизации: ' + (error as Error).toString()); 
  }
};

export default authenticateToken;
