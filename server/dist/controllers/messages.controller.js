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
            yield Message_model_1.default.deleteMany();
            res.status(200).json({ message: 'Все сообщения были успешно удалены' });
        }
        catch (error) {
            res.status(500).json({ error: 'Ошибка при удалении сообщений: ' + error.toString() });
        }
    }),
    broadcastMessage: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { body } = req.body;
            const image = req.file ? req.file.path : null;
            const message = yield Message_model_1.default.create({
                body,
                image,
            });
            res.json(message);
        }
        catch (error) {
            res.status(500).json({ error: 'Ошибка при отправке сообщения: ' + error.toString() });
        }
    }),
};
