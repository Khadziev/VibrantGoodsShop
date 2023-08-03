"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageController = void 0;
const Message_model_1 = __importDefault(require("../model/Message.model"));
exports.messageController = {
    getAllMessages: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const messages = yield Message_model_1.default.find().sort({ createdAt: -1 });
            res.json(messages);
        }
        catch (error) {
            res.status(500).json({ error: 'Ошибка при получении сообщений: ' + error.toString() });
        }
    }),
    deleteAllMessages: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield Message_model_1.default.deleteMany(); // это удалит все сообщения
            res.status(200).json({ message: 'Все сообщения были успешно удалены' });
        }
        catch (error) {
            res.status(500).json({ error: 'Ошибка при удалении сообщений: ' + error.toString() });
        }
    }),
    broadcastMessage: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { from, body } = req.body;
            const message = yield Message_model_1.default.create({
                // from,
                body,
            });
            res.json(message);
        }
        catch (error) {
            res.status(500).json({ error: 'Ошибка при отправке сообщения: ' + error.toString() });
        }
    }),
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
