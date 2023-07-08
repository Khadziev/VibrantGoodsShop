import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../model/User.model';

export const adminOnlyMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log('User:', (req as any).user); 
  console.log('Role:', (req as any).user?.role);

  if (!(req as any).user || (req as any).user.role !== UserRole.ADMIN) {
    console.log('Доступ запрещен'); 
    return res.status(403).json({ message: 'Доступ запрещен' });
  }
  next();
};
