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
          await BroadcastMessage.deleteMany(); // это удалит все сообщения
          res.status(200).json({ message: 'Все сообщения были успешно удалены' });
      } catch (error: any) {
          res.status(500).json({ error: 'Ошибка при удалении сообщений: ' + error.toString() });
      }
  },
    

  broadcastMessage: async (req: Request, res: Response) => {
    try {
      const { from, body } = req.body;

      const message = await BroadcastMessage.create({
        // from,
        body,
      });

      res.json(message);
    } catch (error: any) {
      res.status(500).json({ error: 'Ошибка при отправке сообщения: ' + error.toString() });
    }
  },
};



// на будущее если будет нужно вывести сообщение только один раз

// import { Request, Response } from 'express';
// import BroadcastMessage from '../model/Message.model';
// import User from '../model/User.model';

// declare module 'express-serve-static-core' {
//   export interface Request {
//     user?: any; 
//   }
// }


// export const messageController = {


//   getAllMessages: async (req: Request, res: Response) => {
//     try {
//         const userId = req.user._id;
//         const messages = await BroadcastMessage.find({userId: userId, viewed: false}).sort({ createdAt: -1 }); 
//         await BroadcastMessage.updateMany({userId: userId}, {$set: {viewed: true}}); 
//         res.json(messages);
//     } catch (error: any) {
//         res.status(500).json({ error: 'Ошибка при получении сообщений: ' + error.toString() });
//     }
// },


// broadcastMessage: async (req: Request, res: Response) => {
//     try {
//         const { body } = req.body;
//         const users = await User.find({}); 
//         for (let user of users) {
//             await BroadcastMessage.create({
//                 userId: user._id,
//                 body,
//                 viewed: false
//             });
//         }

//         res.json({message: "Message broadcasted successfully"});
//     } catch (error: any) {
//         res.status(500).json({ error: 'Ошибка при отправке сообщения: ' + error.toString() });
//     }
// },
// };