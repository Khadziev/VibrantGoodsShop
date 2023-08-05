import { Request, Response } from 'express';
import BroadcastMessage from '../model/Message.model';

export const messageController = {
  getAllMessages: async (req: Request, res: Response) => {
    try {
      const messages = await BroadcastMessage.find().sort({ createdAt: -1 }); 
      res.json(messages);
    } catch (error: any) {
      res.status(500).json({ error: 'Ошибка при получении сообщений: ' + error.toString() });
    }
  },

  deleteAllMessages: async (req: Request, res: Response) => {
    try {
      await BroadcastMessage.deleteMany();
      res.status(200).json({ message: 'Все сообщения были успешно удалены' });
    } catch (error: any) {
      res.status(500).json({ error: 'Ошибка при удалении сообщений: ' + error.toString() });
    }
  },

  broadcastMessage: async (req: Request, res: Response) => {
    try {
      const { body } = req.body;
      const image = req.file ? req.file.path : null;

      const message = await BroadcastMessage.create({
        body,
        image,
      });

      res.json(message);
    } catch (error: any) {
      res.status(500).json({ error: 'Ошибка при отправке сообщения: ' + error.toString() });
    }
  },
};
