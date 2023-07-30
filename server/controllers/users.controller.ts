import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import User from '../model/User.model';

const createToken = (userId: string, login: string) => {
  const payload = {
    id: userId,
    login: login,
  };

  const secretKey = process.env.SECRET_JWT_KEY as Secret;
  if (!secretKey) {
    throw new Error('Отсутствует ключ для JWT');
  }

  const token = jwt.sign(payload, secretKey, {
    expiresIn: '24h',
  });

  return token;
};

export const usersController = {
  getAllUsers: async (req: Request, res: Response) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error: any) {
      res.status(500).json({ error: 'Ошибка при получении пользователей' });
    }
  },
  getUserById: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: 'Пользователь не найден' });
      }
      const userResponse = { ...user.toObject(), password: undefined };
      res.json(userResponse);
    } catch (error: any) {
      res.status(500).json({ error: 'Ошибка при получении пользователя' });
    }
  },
  
  registerUser: async (req: Request, res: Response) => {
    try {
      const { login, password, name } = req.body;

      const saltRounds = Number(process.env.BCRYPT_ROUNDS);
      const hash = await bcrypt.hash(password, saltRounds);

      const user = await User.create({
        login: login,
        password: hash,
        name: name,
        role: "user",
      });
      res.json(user);
    } catch (error: any) {
      res.status(400).json({ error: 'Ошибка при регистрации: ' + error.toString() });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { login, password } = req.body;

      const candidate = await User.findOne({ login });

      if (!candidate) {
        return res.status(401).json('Неверный логин');
      }

      const valid = await bcrypt.compare(password, candidate.password);

      if (!valid) {
        return res.status(401).json('Неверный пароль');
      }

      const token = createToken(candidate._id, candidate.login);

      res.json({ token, name: candidate.name, role: candidate.role, userId: candidate._id });
    } catch (error: any) { 
      res.status(500).json({ error: 'Ошибка при входе: ' + error.toString() });
    }
  },

  updateUser: async (req: Request, res: Response) => {
    const userId = req.params.id;
    const dataToUpdate = req.body;
  
    try {
      const user = await User.findByIdAndUpdate(userId, dataToUpdate, { new: true }); 
      if (user) {
        res.json(user);
      } else {
        res.status(404).send('Пользователь не найден');
      }
    } catch (error: any) {
      console.log("Ошибка при обновлении пользователя: ", error); 
      res.status(500).json({ error: 'Произошла ошибка при обновлении пользователя: ' + error.toString() });
    }
  },
  
  deleteUser: async (req: Request, res: Response) => {
    const userId = req.params.id;
  
    try {
      const user = await User.findByIdAndDelete(userId);
      if (user) {
        res.json({ message: 'Пользователь успешно удален' });
      } else {
        res.status(404).send('Пользователь не найден');
      }
    } catch (error: any) {
      console.log("Ошибка при удалении пользователя: ", error); 
      res.status(500).json({ error: 'Произошла ошибка при удалении пользователя: ' + error.toString() });
    }
  },
  

};
