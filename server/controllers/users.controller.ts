import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import User from '../model/User.model';
import { OAuth2Client } from 'google-auth-library';
import crypto from 'crypto';

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
      if (!login || !password) return res.status(400).json({ error: 'login и password обязательны' });

      const saltRounds = Number(process.env.BCRYPT_ROUNDS) || 10;
      const hash = await bcrypt.hash(password, saltRounds);

      // don't allow client to set role
      const user = await User.create({
        login: login,
        password: hash,
        name: name,
        role: 'user',
      });

      const userObj = user.toObject();
      delete (userObj as any).password;
      res.json(userObj);
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

      const token = createToken(candidate._id.toString(), candidate.login);

      res.json({ token, name: candidate.name, role: candidate.role, userId: candidate._id.toString() });
    } catch (error: any) {
      res.status(500).json({ error: 'Ошибка при входе: ' + error.toString() });
    }
  },

  updateUser: async (req: Request, res: Response) => {
    const userId = req.params.id;
    const dataToUpdate = req.body;

    try {
      const requesterId = (req as any).userId;
      const requester = (req as any).user;

      if (requesterId !== userId && requester?.role !== 'admin') {
        return res.status(403).json({ message: 'Нет прав на изменение пользователя' });
      }

      delete dataToUpdate.role;
      delete dataToUpdate.password;

      const user = await User.findByIdAndUpdate(userId, dataToUpdate, { new: true }).select('-password');
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
      const requesterId = (req as any).userId;
      const requester = (req as any).user;

      if (requesterId !== userId && requester?.role !== 'admin') {
        return res.status(403).json({ message: 'Нет прав на удаление пользователя' });
      }

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


  googleAuthRedirect: async (req: Request, res: Response) => {
    try {
      const clientId = process.env.GOOGLE_CLIENT_ID;
      const redirectUri = `${process.env.SERVER_URL || `http://localhost:${process.env.PORT || 5000}`}/api/auth/google/callback`;

      if (!clientId) return res.status(500).json({ message: 'GOOGLE_CLIENT_ID not configured' });

      const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        response_type: 'code',
        scope: 'openid email profile',
        access_type: 'offline',
        prompt: 'consent',
      });

      const url = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
      res.redirect(url);
    } catch (err: any) {
      console.error('Google redirect error', err);
      res.status(500).json({ message: 'Ошибка перенаправления на Google' });
    }
  },


  googleAuthCallback: async (req: Request, res: Response) => {
    try {
      const code = req.query.code as string;
      if (!code) return res.status(400).json({ message: 'Code not provided' });

      const clientId = process.env.GOOGLE_CLIENT_ID as string;
      const clientSecret = process.env.GOOGLE_CLIENT_SECRET as string;
      const redirectUri = `${process.env.SERVER_URL || `http://localhost:${process.env.PORT || 5000}`}/api/auth/google/callback`;

      if (!clientId || !clientSecret) return res.status(500).json({ message: 'Google OAuth not configured' });

      const client = new OAuth2Client(clientId, clientSecret, redirectUri);
      const tokenResponse = await client.getToken(code);
      const tokens = tokenResponse.tokens;

      const idToken = tokens.id_token;
      if (!idToken) return res.status(400).json({ message: 'No id_token returned from Google' });

      const ticket = await client.verifyIdToken({ idToken, audience: clientId });
      const payload = ticket.getPayload();
      const email = payload?.email;
      const name = payload?.name || 'Google User';

      if (!email) return res.status(400).json({ message: 'Google account has no email' });

      let user = await User.findOne({ login: email });
      if (!user) {
        const saltRounds = Number(process.env.BCRYPT_ROUNDS) || 10;
        const randomPass = crypto.randomBytes(16).toString('hex');
        const hash = await bcrypt.hash(randomPass, saltRounds);

        user = await User.create({ login: email, name: name, password: hash, role: 'user' });
      }

      const token = createToken(user._id.toString(), user.login);

      const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
      const redirectTo = `${clientUrl}/login?token=${encodeURIComponent(token)}&userId=${user._id.toString()}&name=${encodeURIComponent(
        user.name
      )}&role=${encodeURIComponent(user.role)}`;

      res.redirect(redirectTo);
    } catch (err: any) {
      console.error('Google callback error', err);
      res.status(500).json({ message: 'Ошибка Google callback', detail: err?.message });
    }
  },


};
