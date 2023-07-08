import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { UserAttributes } from '../model/User.model';

const authenticateUser = async (login: string, password: string): Promise<string> => {
  try {
   
    const user: UserAttributes | null = await User.findOne({ login });

    if (!user) {
      throw new Error('Неверный логин');
    }

    const validPassword: boolean = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new Error('Неверный пароль');
    }
   
    const payload = {
    //   id: user._id,
      login: user.login,
      role: user.role,
    };

    const token: string = jwt.sign(payload, process.env.SECRET_JWT_KEY!);

    return token;
  } catch (error: any) {
    throw new Error('Ошибка аутентификации: ' + error.message);
  }
};
